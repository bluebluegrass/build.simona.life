from __future__ import annotations

import argparse
import json
import random
import re
import sys
import time
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

import httpx
from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
RAW_DIR = DATA_DIR / "raw"
NL_PATH = DATA_DIR / "company_lists" / "nl_companies.json"
US_PATH = DATA_DIR / "company_lists" / "us_companies.json"
TARGET_TITLE_PATTERN = re.compile(r"\bdata (engineer|ingenieur)\b", re.IGNORECASE)
DESCRIPTION_LINK_HINTS = ("job", "jobdetail", "joboverview", "vacanc", "role", "position", "opening")
USER_AGENTS = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Scrape data-engineer postings from discovered careers pages.")
    parser.add_argument("--market", choices=("NL", "US", "all"), default="all")
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--offset", type=int, default=0)
    parser.add_argument(
        "--names-file",
        type=Path,
        default=None,
        help="Optional text file with one exact company name per line. Only matching companies are processed.",
    )
    parser.add_argument(
        "--include-unresolved",
        action="store_true",
        help="Include companies without careers URLs in the batch selection. They still yield zero postings.",
    )
    parser.add_argument(
        "--output-suffix",
        default=None,
        help="Optional suffix appended to raw output filenames, for example 'pilot1'.",
    )
    return parser.parse_args()


def load_companies(path: Path, market: str) -> list[dict]:
    if not path.exists():
        return []
    companies = json.loads(path.read_text())
    for company in companies:
        company["market"] = market
    return companies


def select_companies(
    companies: list[dict],
    offset: int,
    limit: int | None,
    include_unresolved: bool,
    selected_names: set[str] | None,
) -> list[dict]:
    eligible = [
        company
        for company in companies
        if (include_unresolved or company.get("careers_url"))
        and (selected_names is None or str(company.get("name", "")).strip() in selected_names)
    ]
    if offset:
        eligible = eligible[offset:]
    if limit is not None:
        eligible = eligible[:limit]
    return eligible


def load_selected_names(path: Path | None) -> set[str] | None:
    if path is None:
        return None
    lines = [line.strip() for line in path.read_text().splitlines()]
    selected = {line for line in lines if line and not line.startswith("#")}
    if not selected:
        raise ValueError(f"Names file is empty: {path}")
    return selected


def infer_remote_ok(text: str) -> bool:
    lowered = text.casefold()
    return any(term in lowered for term in ("remote", "hybrid", "thuiswerken", "werk op afstand"))


def normalize_salary_value(value: object) -> float | None:
    if value is None:
        return None
    text = str(value).strip()
    if not text:
        return None
    cleaned = re.sub(r"[^\d.,]", "", text)
    if cleaned.count(",") > 1 and "." not in cleaned:
        cleaned = cleaned.replace(",", "")
    cleaned = cleaned.replace(",", "")
    try:
        return float(cleaned)
    except ValueError:
        return None


def pick_salary_currency(*values: object) -> str | None:
    for value in values:
        text = str(value or "").strip()
        if text:
            return text
    return None


def throttle_for_domain(url: str) -> None:
    time.sleep(random.uniform(1.0, 2.0))


def detect_slug(url: str, token: str) -> str | None:
    parsed = urlparse(url)
    parts = [part for part in parsed.path.split("/") if part]
    if token in parts:
        index = parts.index(token)
        if index + 1 < len(parts):
            return parts[index + 1]
    if parts:
        return parts[-1]
    return None


def extract_page_heading(page) -> str:
    for selector in ("h1", "[data-ui='job-title']", "[data-testid='job-title']"):
        try:
            heading = page.locator(selector).first.inner_text(timeout=2_000).strip()
        except Exception:
            heading = ""
        if heading:
            return heading
    return ""


def custom_seed_urls(company: dict) -> list[str]:
    base_url = company["careers_url"]
    seeds = [base_url]
    if "tomtom.com/careers" in base_url.rstrip("/"):
        seeds.append(base_url.rstrip("/") + "/joboverview/")

    seen: set[str] = set()
    ordered: list[str] = []
    for seed in seeds:
        if seed not in seen:
            seen.add(seed)
            ordered.append(seed)
    return ordered


def greenhouse_jobs(client: httpx.Client, company: dict) -> list[dict]:
    slug = detect_slug(company["careers_url"], "boards")
    if not slug:
        parsed = urlparse(company["careers_url"])
        parts = [part for part in parsed.path.split("/") if part]
        if "greenhouse.io" in parsed.netloc and parts:
            slug = parts[0]
    if not slug:
        return []
    response = client.get(f"https://boards-api.greenhouse.io/v1/boards/{slug}/jobs?content=true", timeout=20.0)
    response.raise_for_status()
    payload = response.json()
    postings = []
    for job in payload.get("jobs", []):
        title = str(job.get("title", "")).strip()
        if not TARGET_TITLE_PATTERN.search(title):
            continue
        content = job.get("content") or ""
        location = (job.get("location") or {}).get("name") or company.get("city") or ""
        postings.append(
            {
                "job_id": str(job.get("id")),
                "title": title,
                "company": company["name"],
                "location": location,
                "country": company["market"],
                "posted_date": None,
                "salary_min": None,
                "salary_max": None,
                "salary_currency": None,
                "description_raw": content,
                "employment_type": None,
                "remote_ok": infer_remote_ok(content),
                "language": None,
                "lca_salary_max": company.get("lca_salary_max"),
            }
        )
    return postings


def lever_jobs(client: httpx.Client, company: dict) -> list[dict]:
    slug = detect_slug(company["careers_url"], "co")
    if not slug:
        slug = company["careers_url"].rstrip("/").split("/")[-1]
    response = client.get(f"https://api.lever.co/v0/postings/{slug}?mode=json", timeout=20.0)
    response.raise_for_status()
    postings = []
    for job in response.json():
        title = str(job.get("text", "")).strip()
        if not TARGET_TITLE_PATTERN.search(title):
            continue
        description = "".join(filter(None, [job.get("description"), job.get("descriptionPlain")]))
        categories = job.get("categories") or {}
        location = categories.get("location") or company.get("city") or ""
        postings.append(
            {
                "job_id": str(job.get("id") or job.get("hostedUrl") or title),
                "title": title,
                "company": company["name"],
                "location": location,
                "country": company["market"],
                "posted_date": None,
                "salary_min": None,
                "salary_max": None,
                "salary_currency": None,
                "description_raw": description,
                "employment_type": categories.get("commitment"),
                "remote_ok": infer_remote_ok(description + " " + location),
                "language": None,
                "lca_salary_max": company.get("lca_salary_max"),
            }
        )
    return postings


def smartrecruiters_jobs(client: httpx.Client, company: dict) -> list[dict]:
    slug = company["careers_url"].rstrip("/").split("/")[-1]
    response = client.get(f"https://api.smartrecruiters.com/v1/companies/{slug}/postings", timeout=20.0)
    response.raise_for_status()
    payload = response.json()
    postings = []
    for job in payload.get("content", []):
        title = str(job.get("name", "")).strip()
        if not TARGET_TITLE_PATTERN.search(title):
            continue
        description = str(job.get("jobAd", {}).get("sections", ""))
        location = str(job.get("location", {}).get("city") or company.get("city") or "")
        postings.append(
            {
                "job_id": str(job.get("id")),
                "title": title,
                "company": company["name"],
                "location": location,
                "country": company["market"],
                "posted_date": job.get("releasedDate"),
                "salary_min": normalize_salary_value(job.get("compensation", {}).get("min")),
                "salary_max": normalize_salary_value(job.get("compensation", {}).get("max")),
                "salary_currency": pick_salary_currency(job.get("compensation", {}).get("currency")),
                "description_raw": description,
                "employment_type": job.get("typeOfEmployment"),
                "remote_ok": infer_remote_ok(description + " " + location),
                "language": None,
                "lca_salary_max": company.get("lca_salary_max"),
            }
        )
    return postings


def booking_jobs(client: httpx.Client, company: dict) -> list[dict]:
    postings: list[dict] = []
    page_number = 1

    while True:
        response = client.get(
            "https://jobs.booking.com/api/jobs",
            params={
                "keywords": "data engineer",
                "page": str(page_number),
                "limit": "20",
                "internal": "false",
                "tags1": "Booking.com Company Hierarchy|Transport Company Hierarchy",
            },
            timeout=20.0,
        )
        response.raise_for_status()
        payload = response.json()
        jobs = payload.get("jobs", [])
        if not jobs:
            break

        for job in jobs:
            data = job.get("data") or {}
            title = str(data.get("title", "")).strip()
            if not TARGET_TITLE_PATTERN.search(title):
                continue

            location_parts = [str(data.get("city") or "").strip(), str(data.get("country") or "").strip()]
            location = ", ".join(part for part in location_parts if part)
            canonical_url = (
                data.get("meta_data", {}).get("canonical_url")
                or f"https://jobs.booking.com/booking/jobs/{data.get('slug')}?lang={data.get('language', 'en-us')}"
            )
            postings.append(
                {
                    "job_id": str(canonical_url),
                    "title": title,
                    "company": company["name"],
                    "location": location or company.get("city") or "",
                    "country": company["market"],
                    "posted_date": data.get("posted_date"),
                    "salary_min": None,
                    "salary_max": None,
                    "salary_currency": None,
                    "description_raw": str(data.get("description") or ""),
                    "employment_type": data.get("employment_type"),
                    "remote_ok": infer_remote_ok(str(data.get("description") or "") + " " + location),
                    "language": None,
                    "lca_salary_max": company.get("lca_salary_max"),
                }
            )

        if len(jobs) < 20:
            break
        page_number += 1

    return postings


def abnamro_jobs(company: dict) -> list[dict]:
    search_url = "https://www.werkenbijabnamro.nl/en/vacancies/search/data%20engineer#"
    postings: list[dict] = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(user_agent=random.choice(USER_AGENTS))
        try:
            page.set_default_timeout(20_000)
            page.goto(search_url, wait_until="domcontentloaded")
            page.wait_for_timeout(4_000)
            anchors = page.eval_on_selector_all(
                "a[href]",
                """elements => elements.map(el => ({
                    href: el.href,
                    text: (el.innerText || '').trim()
                }))""",
            )

            seen: set[str] = set()
            for anchor in anchors:
                href = anchor["href"]
                text = anchor["text"]
                if "/en/vacancy/" not in href:
                    continue
                if not TARGET_TITLE_PATTERN.search(text):
                    continue
                if href in seen:
                    continue
                seen.add(href)

                detail = browser.new_page(user_agent=random.choice(USER_AGENTS))
                try:
                    detail.set_default_timeout(20_000)
                    detail.goto(href, wait_until="domcontentloaded")
                    detail.wait_for_timeout(1_500)
                    body_html = detail.content()
                    title = extract_page_heading(detail) or text
                    if not TARGET_TITLE_PATTERN.search(title):
                        continue
                    postings.append(
                        {
                            "job_id": href,
                            "title": title,
                            "company": company["name"],
                            "location": company.get("city") or "",
                            "country": company["market"],
                            "posted_date": None,
                            "salary_min": None,
                            "salary_max": None,
                            "salary_currency": None,
                            "description_raw": body_html,
                            "employment_type": None,
                            "remote_ok": infer_remote_ok(body_html),
                            "language": None,
                            "lca_salary_max": company.get("lca_salary_max"),
                        }
                    )
                finally:
                    detail.close()
        finally:
            browser.close()
    return postings


def tomtom_jobs(company: dict) -> list[dict]:
    postings: list[dict] = []
    job_overview_url = "https://www.tomtom.com/careers/joboverview/"
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(user_agent=random.choice(USER_AGENTS))
        try:
            page.set_default_timeout(20_000)
            page.goto(job_overview_url, wait_until="domcontentloaded")
            page.wait_for_timeout(4_000)
            anchors = page.eval_on_selector_all(
                "a[href*='/careers/jobdetails/']",
                """elements => elements.map(el => ({
                    href: el.href,
                    text: (el.innerText || '').trim()
                }))""",
            )

            seen: set[str] = set()
            for anchor in anchors:
                href = anchor["href"]
                text = anchor["text"]
                if href in seen:
                    continue
                seen.add(href)
                if not TARGET_TITLE_PATTERN.search(text + " " + href):
                    continue

                detail = browser.new_page(user_agent=random.choice(USER_AGENTS))
                try:
                    detail.set_default_timeout(20_000)
                    detail.goto(href, wait_until="domcontentloaded")
                    detail.wait_for_timeout(1_500)
                    body_html = detail.content()
                    title = extract_page_heading(detail) or detail.title() or text
                    if not TARGET_TITLE_PATTERN.search(title + " " + text + " " + href):
                        continue
                    postings.append(
                        {
                            "job_id": href,
                            "title": title or text,
                            "company": company["name"],
                            "location": company.get("city") or "",
                            "country": company["market"],
                            "posted_date": None,
                            "salary_min": None,
                            "salary_max": None,
                            "salary_currency": None,
                            "description_raw": body_html,
                            "employment_type": None,
                            "remote_ok": infer_remote_ok(body_html),
                            "language": None,
                            "lca_salary_max": company.get("lca_salary_max"),
                        }
                    )
                finally:
                    detail.close()
        finally:
            browser.close()
    return postings


def scrape_with_playwright(company: dict) -> list[dict]:
    postings: list[dict] = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(user_agent=random.choice(USER_AGENTS))
        page.set_default_timeout(20_000)
        candidate_links = []
        for seed_url in custom_seed_urls(company):
            page.goto(seed_url, wait_until="domcontentloaded")
            page.wait_for_timeout(1500)
            anchors = page.eval_on_selector_all(
                "a[href]",
                """elements => elements.map(el => ({
                    href: el.href,
                    text: (el.innerText || '').trim()
                }))""",
            )
            for anchor in anchors:
                text = anchor["text"]
                href = anchor["href"]
                lowered_href = href.casefold()
                if TARGET_TITLE_PATTERN.search(text) or any(hint in lowered_href for hint in DESCRIPTION_LINK_HINTS):
                    candidate_links.append((href, text))

        seen: set[str] = set()
        for href, text in candidate_links:
            if href in seen:
                continue
            seen.add(href)
            detail = browser.new_page(user_agent=random.choice(USER_AGENTS))
            try:
                detail.set_default_timeout(20_000)
                detail.goto(href, wait_until="domcontentloaded")
                detail.wait_for_timeout(1200)
                body_html = detail.content()
                title = extract_page_heading(detail) or detail.title() or text
                if not TARGET_TITLE_PATTERN.search(title + " " + text + " " + href):
                    continue
                postings.append(
                    {
                        "job_id": href,
                        "title": title or text,
                        "company": company["name"],
                        "location": company.get("city") or "",
                        "country": company["market"],
                        "posted_date": None,
                        "salary_min": None,
                        "salary_max": None,
                        "salary_currency": None,
                        "description_raw": body_html,
                        "employment_type": None,
                        "remote_ok": infer_remote_ok(body_html),
                        "language": None,
                        "lca_salary_max": company.get("lca_salary_max"),
                    }
                )
            finally:
                detail.close()
        browser.close()
    return postings


def scrape_company(client: httpx.Client, company: dict) -> list[dict]:
    if not company.get("careers_url"):
        return []
    ats_type = company.get("ats_type") or "custom"
    throttle_for_domain(company["careers_url"])
    if ats_type == "greenhouse":
        return greenhouse_jobs(client, company)
    if ats_type == "lever":
        return lever_jobs(client, company)
    if ats_type == "smartrecruiters":
        return smartrecruiters_jobs(client, company)
    if "werkenbijabnamro.nl" in company["careers_url"]:
        return abnamro_jobs(company)
    if "jobs.booking.com" in company["careers_url"] or "booking-com.com/careers" in company["careers_url"]:
        return booking_jobs(client, company)
    if "tomtom.com/careers" in company["careers_url"]:
        return tomtom_jobs(company)
    return scrape_with_playwright(company)


def write_market_output(market: str, postings: list[dict], output_suffix: str | None = None) -> Path:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    suffix = f"_{output_suffix}" if output_suffix else ""
    output_path = RAW_DIR / f"{date.today().isoformat()}_{market}{suffix}.json"
    output_path.write_text(json.dumps(postings, indent=2, ensure_ascii=True) + "\n")
    return output_path


def main() -> int:
    args = parse_args()
    selected_names = load_selected_names(args.names_file)
    companies: list[dict] = []
    if args.market in {"NL", "all"}:
        companies.extend(load_companies(NL_PATH, "NL"))
    if args.market in {"US", "all"}:
        companies.extend(load_companies(US_PATH, "US"))

    companies = select_companies(companies, args.offset, args.limit, args.include_unresolved, selected_names)
    market_postings = {"NL": [], "US": []}

    with httpx.Client(follow_redirects=True, headers={"user-agent": random.choice(USER_AGENTS)}) as client:
        for company in companies:
            try:
                scraped = scrape_company(client, company)
            except Exception as exc:
                print(f"Skipping {company['name']}: {exc}", file=sys.stderr)
                continue
            market_postings[company["market"]].extend(scraped)

    for market, postings in market_postings.items():
        output_path = write_market_output(market, postings, args.output_suffix)
        print(f"Wrote {len(postings)} {market} postings to {output_path}")

    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"scrape_careers.py failed: {exc}", file=sys.stderr)
        raise
