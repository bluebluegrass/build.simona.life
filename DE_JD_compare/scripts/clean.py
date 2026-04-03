from __future__ import annotations

import json
import re
import sys
from datetime import date
from pathlib import Path

from bs4 import BeautifulSoup
from langdetect import detect_langs
from rapidfuzz import fuzz


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw"
PROCESSED_DIR = ROOT / "data" / "processed"
US_COMPANIES_PATH = ROOT / "data" / "company_lists" / "us_companies.json"
EUR_TO_USD_RATE = 1.08
TECH_CATEGORIES = {
    "cloud": ["aws", "azure", "gcp", "google cloud"],
    "compute": ["databricks", "spark", "pyspark", "flink", "hadoop", "emr"],
    "warehouse": ["snowflake", "redshift", "bigquery", "synapse", "delta lake"],
    "orchestration": ["airflow", "dbt", "prefect", "dagster", "argo"],
    "streaming": ["kafka", "kinesis", "event hubs", "pub/sub"],
    "iac": ["terraform", "bicep", "cloudformation", "pulumi"],
    "languages": ["python", "scala", "java", "sql", "typescript"],
    "devops": ["kubernetes", "docker", "ci/cd", "github actions"],
    "governance": ["avg", "gdpr", "ccpa", "data vault", "unity catalog", "purview"],
}
TITLE_LEVEL_RULES = (
    ("lead", ("lead", "staff", "principal", "hoofd")),
    ("senior", ("senior", "sr.")),
    ("junior", ("junior", "jr.")),
)
EXPERIENCE_PATTERNS = (
    re.compile(r"\b(\d+)\+?\s*years?\b", re.IGNORECASE),
    re.compile(r"\b(\d+)\+?\s*jaar\b", re.IGNORECASE),
)


def latest_run_date() -> str:
    candidates = []
    for path in RAW_DIR.glob("*.json"):
        prefix = path.stem.split("_", 1)[0]
        try:
            date.fromisoformat(prefix)
        except ValueError:
            continue
        candidates.append(prefix)
    if not candidates:
        raise FileNotFoundError("No raw files found in data/raw/")
    return max(candidates)


def load_current_run_files(run_date: str) -> list[dict]:
    postings: list[dict] = []
    for path in sorted(RAW_DIR.glob(f"{run_date}_*.json")):
        postings.extend(json.loads(path.read_text()))
    if not postings:
        raise RuntimeError(f"No raw postings found for run date {run_date}")
    return postings


def normalize_company(value: object) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip().casefold()


def clean_description(raw_html: object) -> str:
    soup = BeautifulSoup(str(raw_html or ""), "lxml")
    text = soup.get_text(" ", strip=True)
    text = text.lower()
    return re.sub(r"\s+", " ", text).strip()


def detect_language(raw_text: str) -> str:
    try:
        candidates = detect_langs(raw_text[:5000])
    except Exception:
        return "other"
    if not candidates:
        return "other"
    best = candidates[0]
    if best.prob < 0.9:
        return "other"
    return best.lang if best.lang in {"en", "nl"} else "other"


def infer_seniority(title: str, experience_years_min: int | None) -> str:
    lowered = title.casefold()
    for level, keywords in TITLE_LEVEL_RULES:
        if any(keyword in lowered for keyword in keywords):
            return level
    if experience_years_min is not None and experience_years_min >= 5:
        return "senior"
    return "mid"


def extract_experience_years(text: str) -> int | None:
    matches = []
    for pattern in EXPERIENCE_PATTERNS:
        matches.extend(int(match) for match in pattern.findall(text))
    return min(matches) if matches else None


def tool_patterns() -> dict[str, re.Pattern[str]]:
    patterns = {}
    for terms in TECH_CATEGORIES.values():
        for term in terms:
            if term == "java":
                patterns[term] = re.compile(r"\bjava\b(?!script)", re.IGNORECASE)
            else:
                escaped = re.escape(term)
                escaped = escaped.replace(r"\ ", r"\s+")
                patterns[term] = re.compile(rf"(?<!\w){escaped}(?!\w)", re.IGNORECASE)
    return patterns


TOOL_PATTERNS = tool_patterns()


def extract_tools(text: str) -> dict[str, bool]:
    extracted = {tool: bool(pattern.search(text)) for tool, pattern in TOOL_PATTERNS.items()}
    if extracted.get("avg") and extracted.get("gdpr"):
        extracted["avg"] = True
        extracted["gdpr"] = True
    return extracted


def load_us_lca_map() -> dict[str, int]:
    if not US_COMPANIES_PATH.exists():
        return {}
    companies = json.loads(US_COMPANIES_PATH.read_text())
    return {normalize_company(item["name"]): int(item["lca_salary_max"]) for item in companies if item.get("lca_salary_max")}


def normalize_salary(posting: dict, lca_salary: int | None) -> tuple[int | None, str | None]:
    salary_min = posting.get("salary_min")
    salary_max = posting.get("salary_max")
    chosen = salary_max if salary_max is not None else salary_min
    if chosen is not None:
        value = float(chosen)
        currency = str(posting.get("salary_currency") or "").upper()
        if currency == "EUR":
            value *= EUR_TO_USD_RATE
        return int(round(value)), "posting"
    if lca_salary is not None:
        return int(lca_salary), "lca"
    return None, None


def exact_key(posting: dict) -> tuple[str, str, str | None]:
    return (
        normalize_company(posting.get("company")),
        str(posting.get("title") or "").strip().casefold(),
        posting.get("posted_date"),
    )


def is_near_duplicate(candidate: dict, existing: dict) -> bool:
    if exact_key(candidate) != exact_key(existing):
        return False
    candidate_text = clean_description(candidate.get("description_raw"))
    existing_text = existing["description_clean"]
    return fuzz.ratio(candidate_text[:4000], existing_text[:4000]) >= 95


def main() -> int:
    run_date = latest_run_date()
    raw_postings = load_current_run_files(run_date)
    us_lca_map = load_us_lca_map()
    processed: list[dict] = []
    seen_keys: set[tuple[str, str, str | None]] = set()

    for posting in raw_postings:
        key = exact_key(posting)
        description_clean = clean_description(posting.get("description_raw"))
        if key in seen_keys:
            continue
        if any(is_near_duplicate(posting, existing) for existing in processed):
            continue

        language = detect_language(str(posting.get("description_raw") or ""))
        experience_years_min = extract_experience_years(description_clean)
        seniority_level = infer_seniority(str(posting.get("title") or ""), experience_years_min)
        lca_salary = posting.get("lca_salary_max") or us_lca_map.get(normalize_company(posting.get("company")))
        salary_usd_annual, salary_source = normalize_salary(posting, lca_salary)

        country = str(posting.get("country") or "").upper()
        market = "NL" if country == "NL" else "US"
        processed_record = {
            "job_id": posting.get("job_id"),
            "title": posting.get("title"),
            "company": posting.get("company"),
            "location": posting.get("location"),
            "country": market,
            "market": market,
            "language": language,
            "posted_date": posting.get("posted_date"),
            "seniority_level": seniority_level,
            "tools": extract_tools(description_clean),
            "salary_usd_annual": salary_usd_annual,
            "salary_source": salary_source,
            "experience_years_min": experience_years_min,
            "remote_ok": bool(posting.get("remote_ok")),
            "employment_type": posting.get("employment_type"),
            "description_clean": description_clean,
        }
        processed.append(processed_record)
        seen_keys.add(key)

    if not processed:
        raise RuntimeError("Cleaning produced zero postings.")

    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    output_path = PROCESSED_DIR / f"{run_date}.json"
    output_path.write_text(json.dumps(processed, indent=2, ensure_ascii=True) + "\n")
    print(f"Wrote {len(processed)} cleaned postings to {output_path}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"clean.py failed: {exc}", file=sys.stderr)
        raise
