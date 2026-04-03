# System Diagram: Engineering View

## Summary

This is the engineering-focused architecture map for `DE_JD_compare`.

It emphasizes:

- module ownership
- data contracts
- runtime dependencies
- extension points
- where new work should and should not attach

This document is intended for implementation planning and codebase change design, not stakeholder explanation.

## Top-Level Ownership Model

```text
Company list build
  owner: build_nl_companies.py / build_us_companies.py

Careers URL discovery
  owner: find_careers_pages.py

Posting collection
  owner: scrape_careers.py

Normalization / enrichment of posting content
  owner: clean.py

Aggregation
  owner: aggregate.py

Presentation
  owner: app/index.html
```

Rule:

Each layer should consume the previous layer’s output and should not duplicate its responsibility.

## Repository Runtime Graph

```text
data/company_lists/* source files
        |
        v
scripts/build_nl_companies.py
scripts/build_us_companies.py
        |
        v
data/company_lists/nl_companies.json
data/company_lists/us_companies.json
        |
        v
scripts/find_careers_pages.py
        |
        v
company rows with careers_url / ats_type
        |
        v
scripts/scrape_careers.py
        |
        v
data/raw/YYYY-MM-DD_*.json
        |
        v
scripts/clean.py
        |
        v
data/processed/YYYY-MM-DD.json
        |
        +----------------------+
        |                      |
        v                      v
scripts/aggregate.py      app/index.html
        |                      |
        v                      v
data/summary.json         dashboard
```

## Module Inventory

## 1. `scripts/build_nl_companies.py`

### Ownership

Owns NL company-list creation from raw source files.

### Inputs

- `data/company_lists/nl_ind_raw.xlsx`
- fallback PDF-like input if present
- optional KvK API access for SBI lookup

### Outputs

- `data/company_lists/nl_companies.json`

### Internal functions

- `normalize_header`
- `normalize_text`
- `normalize_company_name`
- `normalize_city`
- `normalize_kvk`
- `pick_column`
- `normalize_dataframe`
- `parse_excel`
- `parse_pdf`
- `find_input_file`
- `has_relevant_name`
- `lookup_sbi_codes`
- `keep_row`
- `main`

### Direct dependencies

- `pandas`
- `httpx`
- `Path`
- NL source workbook / PDF

### Data contract owned

Current output shape:

```json
{
  "name": "Example B.V.",
  "city": "",
  "kvk": "12345678",
  "careers_url": null,
  "ats_type": null
}
```

### Notes

- This file already contains primitive relevance filtering.
- Planned NL cleaning work should refine or extend this path, not bypass it.

## 2. `scripts/build_us_companies.py`

### Ownership

Owns US company-list creation.

### Inputs

- `data/company_lists/us_companies_from_approvals_receipts.json`
- optionally LCA-style inputs in broader project plan

### Outputs

- `data/company_lists/us_companies.json`

### Internal functions

- `normalize_header`
- `normalize_company_name`
- `build_from_approvals_json`
- `normalize_annual_wage`
- `prepare_chunk`
- `main`

### Direct dependencies

- `pandas`
- `Path`
- approvals JSON / wage-like source data

### Data contract owned

Current output shape:

```json
{
  "name": "Example Inc.",
  "city": "",
  "lca_salary_max": null,
  "careers_url": null
}
```

### Notes

- US company-list quality is currently intentionally v0-level.
- Any future enrichment should preserve this final scraper-facing shape unless scraper inputs are intentionally expanded.

## 3. `scripts/find_careers_pages.py`

### Ownership

Owns careers-page discovery and ATS classification.

### Inputs

- `data/company_lists/nl_companies.json`
- `data/company_lists/us_companies.json`
- optional names-file filters and market selectors

### Outputs

- updated company-list JSON rows with:
  - `careers_url`
  - `ats_type`

### Internal functions

- `parse_args`
- `slugify_company_name`
- `company_name_variants`
- `candidate_homepages`
- `detect_ats_type`
- `normalize_ats_url`
- `url_is_ok`
- `extract_career_link`
- `try_common_paths`
- `extract_search_links`
- `search_hosted_ats`
- `selected_indices`
- `load_selected_names`
- `update_company_list`
- `main`

### Direct dependencies

- `httpx`
- company-list JSON files
- hosted ATS probing logic

### Contract owned

Discovery-layer enrichment of company rows:

```json
{
  "name": "...",
  "careers_url": "https://...",
  "ats_type": "greenhouse|lever|smartrecruiters|custom|..."
}
```

### Notes

- This is the only place that should assign ATS type in the current architecture.
- Future NL cleaning should not duplicate ATS detection.

## 4. `scripts/scrape_careers.py`

### Ownership

Owns posting collection from careers pages.

### Inputs

- `data/company_lists/nl_companies.json`
- `data/company_lists/us_companies.json`
- `ats_type`
- `careers_url`
- selected-market and batch CLI filters

### Outputs

- `data/raw/YYYY-MM-DD_<market>*.json`

### Internal functions

- `parse_args`
- `load_companies`
- `select_companies`
- `load_selected_names`
- `infer_remote_ok`
- `normalize_salary_value`
- `pick_salary_currency`
- `throttle_for_domain`
- `detect_slug`
- `extract_page_heading`
- `custom_seed_urls`
- `greenhouse_jobs`
- `lever_jobs`
- `smartrecruiters_jobs`
- `booking_jobs`
- `abnamro_jobs`
- `tomtom_jobs`
- `scrape_with_playwright`
- `scrape_company`
- `write_market_output`
- `main`

### Direct dependencies

- `httpx`
- `playwright`
- company-list JSON files
- ATS-specific public APIs
- custom site browser scraping

### Contract owned

Raw posting contract:

```json
{
  "job_id": "...",
  "title": "...",
  "company": "...",
  "location": "...",
  "country": "NL|US",
  "posted_date": null,
  "salary_min": null,
  "salary_max": null,
  "salary_currency": null,
  "description_raw": "...",
  "employment_type": null,
  "remote_ok": false,
  "language": null,
  "lca_salary_max": null
}
```

### Routing responsibility

This file is the runtime router for:

- ATS/API scraping
- company-specific custom extractors
- generic custom Playwright scraping

### Notes

- This is the correct future integration point for the planned agentic fallback.
- Do not create a second independent collector that bypasses this file.

## 5. `scripts/clean.py`

### Ownership

Owns transformation from raw postings to processed analytical rows.

### Inputs

- all raw files for the latest run date under `data/raw/`
- `data/company_lists/us_companies.json` for optional US salary fallback

### Outputs

- `data/processed/YYYY-MM-DD.json`

### Internal functions

- `latest_run_date`
- `load_current_run_files`
- `normalize_company`
- `clean_description`
- `detect_language`
- `infer_seniority`
- `extract_experience_years`
- `tool_patterns`
- `extract_tools`
- `load_us_lca_map`
- `normalize_salary`
- `exact_key`
- `is_near_duplicate`
- `main`

### Direct dependencies

- `bs4`
- `langdetect`
- `rapidfuzz`
- raw postings
- US company-list salary data

### Contract owned

Processed posting contract:

```json
{
  "job_id": "...",
  "title": "...",
  "company": "...",
  "location": "...",
  "country": "NL|US",
  "market": "NL|US",
  "language": "en|nl|other",
  "posted_date": null,
  "seniority_level": "junior|mid|senior|lead",
  "tools": {},
  "salary_usd_annual": null,
  "salary_source": null,
  "experience_years_min": null,
  "remote_ok": false,
  "employment_type": null,
  "description_clean": "..."
}
```

### Notes

- This file owns analytical extraction from descriptions.
- Scraping should not duplicate this work unless a field is required in the raw contract.

## 6. `scripts/aggregate.py`

### Ownership

Owns aggregation from processed postings into summary metrics.

### Inputs

- `data/processed/YYYY-MM-DD.json`

### Outputs

- `data/summary.json`

### Internal functions

- `load_processed_postings`
- `percentile`
- `salary_stats`
- `tool_frequency`
- `build_market_summary`
- `build_tools_summary`
- `build_salary_distribution`
- `build_venn`
- `build_trends`
- `main`

### Direct dependencies

- processed postings

### Notes

- In the current dashboard v0, some summary logic is also duplicated client-side.
- Long-term, either `aggregate.py` or the frontend should be authoritative, not both.

## 7. `app/index.html`

### Ownership

Owns dashboard rendering and current v0 client-side summarization.

### Inputs

- `data/processed/2026-04-03.json` currently loaded directly
- optionally `data/summary.json` in a more mature setup

### Outputs

- rendered dashboard in browser

### Internal functions

- `summarizeRows`
- `formatMoney`
- `formatPct`
- `buildCategoryOptions`
- `currentToolEntries`
- `renderSummaryCards`
- `renderStackSection`
- `currentRows`
- `renderJobsSection`
- `renderToolsChart`
- `renderSalarySection`
- `renderVennSection`
- `renderTrendChart`
- `render`
- `attachEvents`

### Direct dependencies

- browser `fetch`
- Chart.js CDN
- processed JSON file

### Notes

- Current implementation is intentionally v0 and partially duplicates aggregate logic.
- If the backend summary becomes authoritative later, this file should simplify.

## Current Dependency Matrix

```text
build_nl_companies.py
  -> nl_ind_raw.xlsx
  -> optional KvK HTTP lookup
  -> nl_companies.json

build_us_companies.py
  -> approvals JSON / US source data
  -> us_companies.json

find_careers_pages.py
  -> nl_companies.json
  -> us_companies.json
  -> hosted ATS probing
  -> updated company list rows

scrape_careers.py
  -> nl_companies.json / us_companies.json
  -> ATS APIs
  -> Playwright
  -> raw JSON outputs

clean.py
  -> raw JSON outputs
  -> us_companies.json
  -> processed JSON

aggregate.py
  -> processed JSON
  -> summary.json

app/index.html
  -> processed JSON directly
  -> Chart.js
```

## Data Contract Boundaries

### Boundary 1: Company list contract

Producer:

- `build_nl_companies.py`
- `build_us_companies.py`

Consumer:

- `find_careers_pages.py`
- `scrape_careers.py`

Stability requirement:

- very high

### Boundary 2: Raw posting contract

Producer:

- `scrape_careers.py`

Consumer:

- `clean.py`

Stability requirement:

- very high

### Boundary 3: Processed posting contract

Producer:

- `clean.py`

Consumer:

- `aggregate.py`
- `app/index.html`

Stability requirement:

- very high

### Boundary 4: Summary contract

Producer:

- `aggregate.py`

Consumer:

- future dashboard path

Stability requirement:

- medium for now, because the frontend currently computes much of this directly

## Planned Engineering Extensions

## A. NL Cleaning Pipeline

Source docs:

- [NL Cleaning.md](/Users/simona/Documents/work%20site/DE_JD_compare/NL%20Cleaning.md)
- [NL_CLEANING_IMPLEMENTATION_PLAN.md](/Users/simona/Documents/work%20site/DE_JD_compare/NL_CLEANING_IMPLEMENTATION_PLAN.md)

Recommended ownership:

```text
scripts/enrich_nl_companies.py
scripts/filter_nl_companies.py
scripts/score_nl_relevance.py
scripts/finalize_nl_companies.py
```

Recommended dependency graph:

```text
build_nl_companies.py
    -> initial company rows
    -> enrich_nl_companies.py
    -> filter_nl_companies.py
    -> score_nl_relevance.py
    -> finalize_nl_companies.py
    -> nl_companies.json
```

Key rule:

- this pipeline refines the inputs to `nl_companies.json`
- it must not alter the raw posting or processed posting contracts

Recommended intermediate files:

- `nl_companies_enriched.json`
- `nl_companies_filtered.json`
- `nl_companies_scored.json`
- `nl_company_overrides.json`

## B. Agentic Fallback

Source doc:

- [Agentic_data_collector.md](/Users/simona/Documents/work%20site/DE_JD_compare/Agentic_data_collector.md)

Recommended ownership:

```text
scripts/agentic_fallback/browser.py
scripts/agentic_fallback/schemas.py
scripts/agentic_fallback/controller.py
scripts/agentic_fallback/prompts.py
```

Recommended integration point:

- called only from `scrape_careers.py`

Recommended dependency graph:

```text
scrape_careers.py
   |
   +--> ATS/API path
   +--> deterministic custom path
   +--> agentic_fallback/controller.py
            |
            +--> browser.py
            +--> schemas.py
            +--> prompts.py
```

Key rules:

- fallback only for `ats_type == custom`
- no second storage system
- output must still be raw posting JSON
- add runlog JSON, not SQLite

## File Ownership and Change Guidance

### If changing NL company quality

Touch:

- `build_nl_companies.py`
- future NL cleaning scripts

Avoid:

- changing scraper contract first

### If changing careers discovery

Touch:

- `find_careers_pages.py`

Avoid:

- embedding ATS detection logic in multiple places

### If changing scraping coverage

Touch:

- `scrape_careers.py`
- future `agentic_fallback/*`

Avoid:

- moving normalization logic into scraper

### If changing tool extraction / salary / seniority

Touch:

- `clean.py`

Avoid:

- per-site one-off downstream logic unless absolutely necessary

### If changing visual summary logic

Touch:

- `aggregate.py`
- `app/index.html`

Avoid:

- letting both drift with different definitions of the same metric

## Current Risks

### 1. Summary duplication

Both `aggregate.py` and `app/index.html` can summarize processed data.

Risk:

- drift in market counts, salaries, or tool frequency logic

### 2. NL build logic is too light

`build_nl_companies.py` currently does some filtering, but not the staged enrichment planned later.

Risk:

- noisy NL company universe

### 3. Custom scraping is accumulating company-specific logic

`scrape_careers.py` already contains:

- `booking_jobs`
- `abnamro_jobs`
- `tomtom_jobs`

Risk:

- more hardcoded handlers unless a bounded fallback path is added

### 4. Company-list schema differences by market

NL and US company rows are similar but not identical.

Risk:

- future shared logic may accidentally assume one unified schema

## Recommended Engineering Direction

1. Keep the current six-file pipeline as the backbone.
2. Add staged NL cleaning before `nl_companies.json`.
3. Add bounded agentic fallback inside the scraper, not beside it.
4. Preserve raw and processed contracts.
5. Eventually choose one authoritative summary path between `aggregate.py` and frontend client-side summarization.

## Bottom Line

The codebase already has a coherent pipeline with clear ownership:

- build lists
- discover careers pages
- scrape raw postings
- clean into processed rows
- aggregate and render

New work should attach at exactly two extension points:

- before `nl_companies.json`
- inside `scrape_careers.py` for hard custom-site fallback

Anything outside those boundaries is likely to duplicate existing ownership and create architectural drift.
