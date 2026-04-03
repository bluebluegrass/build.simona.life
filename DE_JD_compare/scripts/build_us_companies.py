from __future__ import annotations

import json
import re
import sys
from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
INPUT_PATH = ROOT / "data" / "company_lists" / "us_lca_raw.csv"
APPROVALS_INPUT_PATH = ROOT / "data" / "company_lists" / "us_companies_from_approvals_receipts.json"
OUTPUT_PATH = ROOT / "data" / "company_lists" / "us_companies.json"
CHUNK_SIZE = 50_000
WAGE_MULTIPLIERS = {
    "year": 1,
    "hour": 2080,
    "week": 52,
    "bi-weekly": 26,
    "biweekly": 26,
}


def normalize_header(value: object) -> str:
    text = str(value or "").strip().lower()
    text = re.sub(r"[^a-z0-9]+", "_", text)
    return re.sub(r"_+", "_", text).strip("_")


def normalize_company_name(value: object) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip()


def build_from_approvals_json(path: Path) -> list[dict[str, object]]:
    payload = json.loads(path.read_text())
    if not isinstance(payload, list):
        raise ValueError(f"Approvals JSON must contain a list of records: {path}")

    seen: set[str] = set()
    records: list[dict[str, object]] = []
    for item in payload:
        if not isinstance(item, dict):
            continue
        name = normalize_company_name(item.get("name"))
        if not name or name in seen:
            continue
        seen.add(name)
        records.append(
            {
                "name": name,
                "city": "",
                "lca_salary_max": None,
                "careers_url": None,
            }
        )

    if not records:
        raise RuntimeError("Approvals JSON produced zero US companies.")

    return sorted(records, key=lambda record: str(record["name"]).casefold())


def normalize_annual_wage(rate: object, unit: object) -> float | None:
    try:
        numeric_rate = float(rate)
    except (TypeError, ValueError):
        return None

    normalized_unit = str(unit or "").strip().lower()
    multiplier = WAGE_MULTIPLIERS.get(normalized_unit)
    if multiplier is None:
        return None
    annual_wage = numeric_rate * multiplier
    if annual_wage < 40_000 or annual_wage > 500_000:
        return None
    return annual_wage


def prepare_chunk(chunk: pd.DataFrame) -> pd.DataFrame:
    renamed = chunk.rename(columns={column: normalize_header(column) for column in chunk.columns})
    required = {
        "employer_name",
        "worksite_city",
        "worksite_state",
        "soc_code",
        "case_title",
        "wage_rate_of_pay_from",
        "wage_unit_of_pay",
    }
    missing = required - set(renamed.columns)
    if missing:
        raise ValueError(f"LCA CSV is missing required columns: {sorted(missing)}")

    renamed["annual_wage"] = renamed.apply(
        lambda row: normalize_annual_wage(row["wage_rate_of_pay_from"], row["wage_unit_of_pay"]),
        axis=1,
    )
    renamed = renamed[renamed["annual_wage"].notna()]
    renamed = renamed[renamed["worksite_state"].astype(str).str.upper() == "CA"]
    title_match = renamed["case_title"].astype(str).str.contains("data engineer", case=False, na=False)
    soc_match = renamed["soc_code"].astype(str).str.strip() == "15-1242"
    renamed = renamed[title_match | soc_match]
    renamed = renamed[renamed["annual_wage"] >= 100_000]
    return renamed[["employer_name", "worksite_city", "annual_wage"]]


def main() -> int:
    if APPROVALS_INPUT_PATH.exists():
        records = build_from_approvals_json(APPROVALS_INPUT_PATH)
        OUTPUT_PATH.write_text(json.dumps(records, indent=2, ensure_ascii=True) + "\n")
        print(f"Wrote {len(records)} US companies to {OUTPUT_PATH} from {APPROVALS_INPUT_PATH.name}")
        return 0

    if not INPUT_PATH.exists():
        raise FileNotFoundError(f"Missing US input. Expected {APPROVALS_INPUT_PATH.name} or {INPUT_PATH.name}")

    frames: list[pd.DataFrame] = []
    for chunk in pd.read_csv(INPUT_PATH, chunksize=CHUNK_SIZE, low_memory=False):
        prepared = prepare_chunk(chunk)
        if not prepared.empty:
            frames.append(prepared)

    if not frames:
        raise RuntimeError("Filtering produced zero US companies.")

    combined = pd.concat(frames, ignore_index=True)
    grouped = (
        combined.assign(employer_name=combined["employer_name"].map(normalize_company_name))
        .sort_values("annual_wage", ascending=False)
        .drop_duplicates(subset=["employer_name"], keep="first")
    )

    records = [
        {
            "name": row["employer_name"],
            "city": str(row["worksite_city"]).strip(),
            "lca_salary_max": int(round(float(row["annual_wage"]))),
            "careers_url": None,
        }
        for _, row in grouped.sort_values(["city", "employer_name"]).iterrows()
    ]

    OUTPUT_PATH.write_text(json.dumps(records, indent=2, ensure_ascii=True) + "\n")
    print(f"Wrote {len(records)} US companies to {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"build_us_companies.py failed: {exc}", file=sys.stderr)
        raise
