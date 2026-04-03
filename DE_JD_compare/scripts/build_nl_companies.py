from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path
from typing import Iterable

import httpx
import pandas as pd
import pdfplumber
from dotenv import load_dotenv


ROOT = Path(__file__).resolve().parents[1]
COMPANY_LISTS_DIR = ROOT / "data" / "company_lists"
OUTPUT_PATH = COMPANY_LISTS_DIR / "nl_companies.json"
ALLOWED_CITIES = {"amsterdam", "amstelveen", "haarlem", "utrecht"}
SBI_PREFIXES = ("62", "63", "64")
NAME_KEYWORDS = {
    "adyen",
    "booking",
    "catawiki",
    "mollie",
    "backbase",
    "databricks",
    "elastic",
    "optiver",
    "flow traders",
    "bunq",
    "picnic",
    "bol",
    "coolblue",
    "ing",
    "rabobank",
    "abn amro",
    "dept",
    "tomtom",
    "messagebird",
    "bird",
    "we transfer",
    "wework",
    "scale",
    "tech",
    "data",
    "digital",
    "capital",
    "bank",
    "payments",
    "software",
    "cloud",
    "analytics",
    "platform",
}
COLUMN_SYNONYMS = {
    "name": ("naam", "company", "organisatie", "organisation", "bedrijfsnaam", "handelsnaam"),
    "city": ("plaats", "city", "woonplaats", "vestigingsplaats", "location"),
    "kvk": ("kvk", "handelsregisternummer", "chamber", "registration"),
}


def normalize_header(value: object) -> str:
    text = str(value or "").strip().lower()
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def normalize_text(value: object) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip()


def normalize_company_name(value: object) -> str:
    return normalize_text(value).casefold()


def normalize_city(value: object) -> str:
    return normalize_text(value).casefold()


def normalize_kvk(value: object) -> str:
    digits = re.sub(r"\D+", "", str(value or ""))
    return digits[:8]


def pick_column(columns: Iterable[str], aliases: Iterable[str]) -> str | None:
    for column in columns:
        normalized = normalize_header(column)
        if any(alias in normalized for alias in aliases):
            return column
    return None


def normalize_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return pd.DataFrame(columns=["name", "city", "kvk"])

    source_columns = list(df.columns)
    name_column = pick_column(source_columns, COLUMN_SYNONYMS["name"])
    city_column = pick_column(source_columns, COLUMN_SYNONYMS["city"])
    kvk_column = pick_column(source_columns, COLUMN_SYNONYMS["kvk"])

    if not name_column or not kvk_column:
        raise ValueError(f"Could not find required columns in: {source_columns}")

    normalized = pd.DataFrame(
        {
            "name": df[name_column].map(normalize_text),
            "city": df[city_column].map(normalize_text) if city_column else "",
            "kvk": df[kvk_column].map(normalize_kvk),
        }
    )
    normalized = normalized[(normalized["name"] != "") & (normalized["kvk"] != "")]
    normalized = normalized.drop_duplicates(subset=["name", "city", "kvk"]).reset_index(drop=True)
    return normalized


def parse_excel(path: Path) -> pd.DataFrame:
    sheets = pd.read_excel(path, sheet_name=None)
    frames = [sheet for sheet in sheets.values() if not sheet.empty]
    if not frames:
        raise ValueError(f"No rows found in Excel workbook: {path}")
    combined = pd.concat(frames, ignore_index=True)
    return normalize_dataframe(combined)


def parse_pdf(path: Path) -> pd.DataFrame:
    rows: list[list[str]] = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            for table in page.extract_tables() or []:
                for row in table:
                    cleaned = [normalize_text(cell) for cell in (row or [])]
                    if any(cleaned):
                        rows.append(cleaned)

    if not rows:
        raise ValueError(f"No table rows found in PDF: {path}")

    header = rows[0]
    body = rows[1:]
    width = len(header)
    trimmed_body = [row[:width] + [""] * max(0, width - len(row)) for row in body]
    return normalize_dataframe(pd.DataFrame(trimmed_body, columns=header))


def find_input_file() -> Path:
    candidates = (
        COMPANY_LISTS_DIR / "nl_ind_raw.xlsx",
        COMPANY_LISTS_DIR / "nl_ind_raw.xls",
        COMPANY_LISTS_DIR / "nl_ind_raw.pdf",
    )
    for candidate in candidates:
        if candidate.exists():
            return candidate
    raise FileNotFoundError(
        "Expected one of nl_ind_raw.xlsx, nl_ind_raw.xls, or nl_ind_raw.pdf in data/company_lists/"
    )


def has_relevant_name(name: str) -> bool:
    normalized = normalize_company_name(name)
    return any(keyword in normalized for keyword in NAME_KEYWORDS)


def lookup_sbi_codes(client: httpx.Client, api_key: str, kvk_number: str) -> list[str]:
    response = client.get(
        "https://api.kvk.nl/api/v1/basisprofielen",
        params={"kvkNummer": kvk_number},
        headers={"apikey": api_key},
        timeout=15.0,
    )
    response.raise_for_status()
    payload = response.json()
    activities = payload.get("sbiActiviteiten") or []
    return [str(activity.get("sbiCode", "")) for activity in activities if activity.get("sbiCode")]


def keep_row(row: pd.Series, client: httpx.Client | None, api_key: str | None) -> bool:
    if normalize_city(row["city"]) not in ALLOWED_CITIES:
        return False

    if has_relevant_name(row["name"]):
        return True

    if not client or not api_key:
        return False

    try:
        sbi_codes = lookup_sbi_codes(client, api_key, row["kvk"])
    except httpx.HTTPError:
        return False

    return any(code.startswith(SBI_PREFIXES) for code in sbi_codes)


def main() -> int:
    load_dotenv()
    COMPANY_LISTS_DIR.mkdir(parents=True, exist_ok=True)
    source_path = find_input_file()

    if source_path.suffix.lower() in {".xlsx", ".xls"}:
        dataframe = parse_excel(source_path)
    elif source_path.suffix.lower() == ".pdf":
        dataframe = parse_pdf(source_path)
    else:
        raise ValueError(f"Unsupported IND file format: {source_path.suffix}")

    if dataframe["city"].astype(str).str.strip().eq("").all():
        filtered = dataframe.copy()
    else:
        api_key = os.getenv("KVK_API_KEY") or None
        client = httpx.Client(follow_redirects=True) if api_key else None
        try:
            filtered = dataframe[dataframe.apply(lambda row: keep_row(row, client, api_key), axis=1)]
        finally:
            if client is not None:
                client.close()

        if filtered.empty:
            raise RuntimeError("Filtering produced zero NL companies.")

    records = [
        {
            "name": row["name"],
            "city": row["city"],
            "kvk": row["kvk"],
            "careers_url": None,
        }
        for _, row in filtered.sort_values(["city", "name"]).iterrows()
    ]
    OUTPUT_PATH.write_text(json.dumps(records, indent=2, ensure_ascii=True) + "\n")
    print(f"Wrote {len(records)} NL companies to {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"build_nl_companies.py failed: {exc}", file=sys.stderr)
        raise
