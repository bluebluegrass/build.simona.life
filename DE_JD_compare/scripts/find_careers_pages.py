from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from urllib.parse import quote, unquote, urljoin, urlparse

import httpx
from bs4 import BeautifulSoup


ROOT = Path(__file__).resolve().parents[1]
NL_PATH = ROOT / "data" / "company_lists" / "nl_companies.json"
US_PATH = ROOT / "data" / "company_lists" / "us_companies.json"
COMMON_CAREERS_PATHS = ("/careers", "/jobs", "/en/careers", "/vacancies")
ATS_SEARCH_PATTERNS = (
    "site:greenhouse.io",
    "site:lever.co",
    "site:myworkdayjobs.com",
    "site:smartrecruiters.com",
    "site:bamboohr.com",
)
DOMAIN_HINT_PATTERN = re.compile(r"\b([a-z0-9-]+\.(?:com|io|nl|app))\b", re.IGNORECASE)
LEGAL_SUFFIX_TOKENS = {
    "b", "v", "bv", "n", "nv", "llc", "inc", "corp", "corporation", "limited", "ltd", "plc", "sa", "gmbh", "ag", "sarl",
}
GENERIC_TRAILING_TOKENS = {
    "international", "technologies", "technology", "services", "service", "solutions", "solution", "holding", "holdings",
    "group", "global", "netherlands", "europe", "systems", "bank",
}
CAREERS_TERMS = ("career", "careers", "job", "jobs", "vacanc", "werken bij", "join us")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Discover careers URLs for NL and US company lists.")
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
        "--include-resolved",
        action="store_true",
        help="Also revisit companies that already have a careers_url. Default is unresolved companies only.",
    )
    return parser.parse_args()


def slugify_company_name(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.casefold()).strip("-")
    return slug.replace("-b-v", "").replace("-bv", "")


def company_name_variants(company_name: str) -> list[str]:
    normalized = str(company_name or "").strip()
    variants: list[str] = []

    for match in DOMAIN_HINT_PATTERN.findall(normalized):
        variants.append(match.casefold())

    tokens = [token for token in re.split(r"[^a-z0-9]+", normalized.casefold()) if token]
    while tokens and tokens[-1] in LEGAL_SUFFIX_TOKENS:
        tokens.pop()
    while len(tokens) > 1 and tokens[-1] in GENERIC_TRAILING_TOKENS:
        tokens.pop()

    if tokens:
        variants.append("-".join(tokens))
        if len(tokens) > 1:
            variants.append("".join(tokens))
        if len(tokens) > 1:
            variants.append(tokens[0])

    slug = slugify_company_name(company_name)
    if slug:
        variants.append(slug)

    seen: set[str] = set()
    ordered: list[str] = []
    for variant in variants:
        cleaned = variant.strip(".-")
        if cleaned and cleaned not in seen:
            seen.add(cleaned)
            ordered.append(cleaned)
    return ordered


def candidate_homepages(company_name: str) -> list[str]:
    candidates: list[str] = []
    for variant in company_name_variants(company_name):
        if "." in variant:
            candidates.extend([f"https://{variant}", f"https://www.{variant}"])
            continue
        for tld in ("com", "io", "nl", "app"):
            candidates.extend([f"https://{variant}.{tld}", f"https://www.{variant}.{tld}"])

    seen: set[str] = set()
    ordered: list[str] = []
    for candidate in candidates:
        if candidate not in seen:
            seen.add(candidate)
            ordered.append(candidate)
    return ordered


def detect_ats_type(url: str, content: str = "") -> str:
    lowered_url = url.casefold()
    lowered_content = content.casefold()
    if "greenhouse.io" in lowered_url or "greenhouse" in lowered_content:
        return "greenhouse"
    if "lever.co" in lowered_url or "lever" in lowered_content:
        return "lever"
    if "myworkdayjobs.com" in lowered_url or "workday" in lowered_content:
        return "workday"
    if "smartrecruiters.com" in lowered_url or "smartrecruiters" in lowered_content:
        return "smartrecruiters"
    if "bamboohr.com" in lowered_url or "bamboohr" in lowered_content:
        return "bamboohr"
    return "custom"


def normalize_ats_url(url: str, ats_type: str) -> str:
    parsed = urlparse(url)
    parts = [part for part in parsed.path.split("/") if part]

    if ats_type == "greenhouse":
        if "greenhouse.io" in parsed.netloc and parts:
            if "boards.greenhouse.io" in parsed.netloc and len(parts) >= 1:
                return f"{parsed.scheme}://{parsed.netloc}/{parts[0]}"
            if "job-boards.greenhouse.io" in parsed.netloc and len(parts) >= 1:
                return f"{parsed.scheme}://{parsed.netloc}/{parts[0]}"
        return url

    if ats_type == "lever":
        if "lever.co" in parsed.netloc and parts:
            return f"{parsed.scheme}://{parsed.netloc}/{parts[0]}"
        return url

    return url


def url_is_ok(response: httpx.Response) -> bool:
    return response.status_code == 200 and "text/html" in response.headers.get("content-type", "")


def extract_career_link(base_url: str, html: str) -> str | None:
    soup = BeautifulSoup(html, "lxml")
    candidates: list[str] = []
    for anchor in soup.select("a[href]"):
        href = anchor.get("href", "")
        text = " ".join(anchor.get_text(" ", strip=True).split())
        joined = f"{text} {href}".casefold()
        if any(term in joined for term in CAREERS_TERMS):
            candidates.append(urljoin(base_url, href))

    seen: set[str] = set()
    for candidate in candidates:
        if candidate in seen:
            continue
        seen.add(candidate)
        return candidate
    return None


def try_common_paths(client: httpx.Client, company_name: str) -> tuple[str | None, str | None]:
    for homepage in candidate_homepages(company_name):
        try:
            homepage_response = client.get(homepage, timeout=10.0)
        except httpx.HTTPError:
            continue
        if homepage_response.status_code >= 400:
            continue

        linked_careers_page = extract_career_link(str(homepage_response.url), homepage_response.text)
        if linked_careers_page:
            try:
                linked_response = client.get(linked_careers_page, timeout=10.0)
            except httpx.HTTPError:
                linked_response = None
            if linked_response and url_is_ok(linked_response):
                ats_type = detect_ats_type(str(linked_response.url), linked_response.text)
                return str(linked_response.url), ats_type

        for path in COMMON_CAREERS_PATHS:
            target = urljoin(str(homepage_response.url).rstrip("/") + "/", path.lstrip("/")) if path else str(homepage_response.url)
            try:
                response = client.get(target, timeout=10.0)
            except httpx.HTTPError:
                continue
            if url_is_ok(response):
                ats_type = detect_ats_type(str(response.url), response.text)
                return str(response.url), ats_type
    return None, None


def extract_search_links(html: str) -> list[str]:
    soup = BeautifulSoup(html, "lxml")
    links: list[str] = []
    for anchor in soup.select("a[href]"):
        href = anchor.get("href", "")
        if href.startswith("//duckduckgo.com/l/?uddg="):
            parsed = urlparse(href)
            query = parsed.query
            match = re.search(r"uddg=([^&]+)", query)
            if match:
                links.append(unquote(match.group(1)))
        elif href.startswith("http"):
            links.append(href)
    return links


def search_hosted_ats(client: httpx.Client, company_name: str) -> tuple[str | None, str | None]:
    for pattern in ATS_SEARCH_PATTERNS:
        query = quote(f'{pattern} "{company_name}" jobs OR careers')
        try:
            response = client.get(f"https://duckduckgo.com/html/?q={query}", timeout=15.0)
        except httpx.HTTPError:
            continue
        if response.status_code >= 400:
            continue
        for link in extract_search_links(response.text):
            ats_type = detect_ats_type(link)
            if ats_type != "custom":
                return normalize_ats_url(link, ats_type), ats_type
    return None, None


def selected_indices(
    companies: list[dict],
    offset: int,
    limit: int | None,
    include_resolved: bool,
    selected_names: set[str] | None,
) -> list[int]:
    eligible = [
        index
        for index, company in enumerate(companies)
        if (include_resolved or not company.get("careers_url"))
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


def update_company_list(
    path: Path,
    client: httpx.Client,
    offset: int,
    limit: int | None,
    include_resolved: bool,
    selected_names: set[str] | None,
) -> None:
    if not path.exists():
        return

    companies = json.loads(path.read_text())
    updated = False
    targets = selected_indices(companies, offset, limit, include_resolved, selected_names)

    for index in targets:
        company = companies[index]
        if company.get("careers_url"):
            detected_ats_type = detect_ats_type(company["careers_url"])
            normalized_url = normalize_ats_url(company["careers_url"], detected_ats_type)
            if company.get("careers_url") != normalized_url:
                company["careers_url"] = normalized_url
                updated = True
            if company.get("ats_type") != detected_ats_type:
                company["ats_type"] = detected_ats_type
                updated = True
            continue

        careers_url, ats_type = try_common_paths(client, company["name"])
        if not careers_url:
            careers_url, ats_type = search_hosted_ats(client, company["name"])

        if careers_url:
            company["careers_url"] = careers_url
            company["ats_type"] = ats_type
            updated = True

    if updated:
        path.write_text(json.dumps(companies, indent=2, ensure_ascii=True) + "\n")
        print(f"Updated careers URLs in {path} for {len(targets)} selected companies")
    else:
        print(f"No changes for {path} across {len(targets)} selected companies")


def main() -> int:
    args = parse_args()
    selected_names = load_selected_names(args.names_file)
    selected_paths: list[Path] = []
    if args.market in {"NL", "all"}:
        selected_paths.append(NL_PATH)
    if args.market in {"US", "all"}:
        selected_paths.append(US_PATH)

    with httpx.Client(follow_redirects=True, headers={"user-agent": "DE_JD_compare/1.0"}) as client:
        for path in selected_paths:
            update_company_list(path, client, args.offset, args.limit, args.include_resolved, selected_names)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"find_careers_pages.py failed: {exc}", file=sys.stderr)
        raise
