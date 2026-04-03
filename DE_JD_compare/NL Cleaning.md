# NL Company Cleaning Pipeline

## Overview

```
IND register (~10,000 companies)
    → Step 1: filter by sector (tech / finance / scale-up)
    → Step 2: enrich with KvK data (sector code, company size)
    → Step 3: LLM relevance score (does this company plausibly hire DEs?)
    → Step 4: find careers URL
    → Step 5: detect ATS type
    → curated list (~50–150 companies)
```

---

## Step 1 — SBI sector filter

SBI codes are the Dutch equivalent of NAICS. After enrichment, filter for codes that correlate with data engineering roles.

This alone should cut 10,000 → roughly 300–600 companies.

```python
# scripts/filter_sector.py

# SBI codes for tech / finance / relevant sectors
# full list: https://www.kvk.nl/sbi-codes/
RELEVANT_SBI_PREFIXES = {
    "62",    # IT services (6201 custom software, 6202 IT consulting)
    "63",    # data processing, hosting, web portals
    "64",    # financial services (banks, fintech)
    "65",    # insurance
    "66",    # financial support activities
    "70",    # management consulting
    "72",    # R&D
    "73",    # advertising / market research
    "58",    # publishing / media
    "61",    # telecom
}

def is_relevant(company: dict) -> bool:
    sbi = str(company.get("sbi_code", ""))
    employees = company.get("employees") or 0

    sector_match = any(sbi.startswith(p) for p in RELEVANT_SBI_PREFIXES)
    size_match = employees >= 50  # too small = unlikely to have DE team

    return sector_match and size_match


def filter_companies(input_file: str, output_file: str):
    with open(input_file) as f:
        companies = json.load(f)

    filtered = [c for c in companies if is_relevant(c)]

    print(f"Before: {len(companies)}, After: {len(filtered)}")

    with open(output_file, "w") as f:
        json.dump(filtered, f, indent=2, ensure_ascii=False)


filter_companies("companies_enriched.json", "companies_filtered.json")
```

---

## Step 3 — LLM relevance scoring

After sector filtering you still have companies like law firms, accounting offices, and HR consultancies that technically have SBI 62/70 but would never have a data engineering team. One LLM call per company name + description cleans this up fast and cheaply.

This cuts 300–600 → roughly 80–150 genuinely relevant companies. At ~300 companies and $0.0004/1K tokens this costs ~$0.50 total.

```python
# scripts/score_relevance.py
from openai import AsyncOpenAI
import asyncio, json

client = AsyncOpenAI()

async def score_company(company: dict) -> dict:
    prompt = f"""
    Company name: {company['name']}
    City: {company.get('city', 'unknown')}
    Sector (SBI): {company.get('sbi_description', 'unknown')}
    Employees: {company.get('employees', 'unknown')}

    Question: Does this company plausibly have an internal
    data engineering team that would hire a Senior Data Engineer?

    Criteria for YES:
    - Tech product company, fintech, scale-up, e-commerce
    - Large enterprise with real data infrastructure needs
    - Has 50+ employees

    Criteria for NO:
    - Staffing / recruitment agency
    - Small consultancy or freelance shop
    - Law firm, accounting firm, HR company
    - Physical goods manufacturer with no tech product
    - Retail shop, restaurant, hotel

    Respond with JSON only:
    {{
        "relevant": true or false,
        "confidence": "high" or "medium" or "low",
        "reason": "one sentence"
    }}
    """

    r = await client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
        temperature=0,
    )
    result = json.loads(r.choices[0].message.content)
    company["llm_relevant"] = result["relevant"]
    company["llm_confidence"] = result["confidence"]
    company["llm_reason"] = result["reason"]
    return company


async def score_all(input_file: str, output_file: str):
    with open(input_file) as f:
        companies = json.load(f)

    semaphore = asyncio.Semaphore(10)

    async def bounded(c):
        async with semaphore:
            return await score_company(c)

    scored = await asyncio.gather(*[bounded(c) for c in companies])

    # keep relevant + high/medium confidence
    final = [
        c for c in scored
        if c.get("llm_relevant")
        and c.get("llm_confidence") in ("high", "medium")
    ]

    print(f"Before: {len(companies)}, After: {len(final)}")

    with open(output_file, "w") as f:
        json.dump(final, f, indent=2, ensure_ascii=False)


asyncio.run(score_all("companies_filtered.json", "companies_scored.json"))
```

---

## Step 4 — Find careers URL

Now you have a clean company list but `careers_url` is still null.

> **Note:** For the top 50 companies, adding the careers URL manually takes 20 minutes and is more reliable than probing. Automation is only worth it when processing hundreds.

```python
# scripts/find_careers_url.py

COMMON_CAREERS_PATHS = [
    "/careers", "/jobs", "/vacancies", "/werkenbij",
    "/en/careers", "/en/jobs", "/about/careers",
    "/company/careers", "/join-us", "/join",
]

async def find_careers_url(
    client: httpx.AsyncClient,
    company: dict
) -> dict:
    # Step 1: try to find company website via name search
    # (or add website to companies.json manually for top 50)

    # Step 2: probe common paths
    base_url = company.get("website", "")
    if not base_url:
        return company  # skip for now, flag for manual

    for path in COMMON_CAREERS_PATHS:
        try:
            url = base_url.rstrip("/") + path
            r = await client.head(url, timeout=5, follow_redirects=True)
            if r.status_code == 200:
                company["careers_url"] = str(r.url)
                return company
        except Exception:
            continue

    # Step 3: check for known ATS patterns
    company_slug = company["name"].lower().replace(" ", "")
    greenhouse_url = f"https://boards.greenhouse.io/{company_slug}"
    lever_url = f"https://jobs.lever.co/{company_slug}"

    for url in [greenhouse_url, lever_url]:
        try:
            r = await client.head(url, timeout=5)
            if r.status_code == 200:
                company["careers_url"] = url
                return company
        except Exception:
            continue

    # not found — flag for manual lookup
    company["careers_url"] = None
    company["needs_manual_url"] = True
    return company
```

---

## Full pipeline — run order

```bash
python scripts/enrich_kvk.py          # add SBI, employees
python scripts/filter_sector.py       # SBI + size filter
python scripts/score_relevance.py     # LLM relevance check
python scripts/find_careers_url.py    # find careers pages
# manual pass: open companies_scored.json, add missing URLs
python scripts/detect_ats.py          # greenhouse/lever/static/agent
```

**Output:** `companies_final.json` with 50–150 companies, all with `careers_url` and `ats` filled in — ready to feed into the collector.

> The messy `"AAE" Advanced Automated Equipment B.V.`-style entries disappear entirely at the SBI filter stage, long before the LLM ever sees them.
