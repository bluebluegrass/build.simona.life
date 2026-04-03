# System Diagram

## Summary

This document maps the current architecture of `DE_JD_compare` and distinguishes between:

- what is already implemented
- what is planned but not yet built
- where each major function lives

The current system is a file-based pipeline:

1. build company lists
2. discover careers pages
3. scrape postings
4. clean postings
5. aggregate / render dashboard

The planned extensions are:

- a staged NL company-cleaning pipeline
- an agentic fallback collector for hard custom careers sites

## Current End-to-End Flow

```text
NL source files / US source files
        |
        v
build_nl_companies.py      build_us_companies.py
        |                         |
        +-----------+-------------+
                    |
                    v
     nl_companies.json / us_companies.json
                    |
                    v
         find_careers_pages.py
                    |
                    v
  company lists with careers_url + ats_type
                    |
                    v
           scrape_careers.py
    | ATS/API routes | custom Playwright |
                    |
                    v
         data/raw/YYYY-MM-DD_*.json
                    |
                    v
                clean.py
                    |
                    v
      data/processed/YYYY-MM-DD.json
                    |
             +------+------+
             |             |
             v             v
        aggregate.py   app/index.html
             |             |
             v             v
      data/summary.json  dashboard
```

## Current Modules

### 1. Company List Build Layer

#### `scripts/build_nl_companies.py`

Purpose:

- parse NL source files
- normalize company fields
- apply lightweight relevance filtering
- write `data/company_lists/nl_companies.json`

Key functions:

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

#### `scripts/build_us_companies.py`

Purpose:

- build US company list from approvals JSON or wage-like source data
- normalize company names and wages
- write `data/company_lists/us_companies.json`

Key functions:

- `normalize_header`
- `normalize_company_name`
- `build_from_approvals_json`
- `normalize_annual_wage`
- `prepare_chunk`
- `main`

### 2. Careers Discovery Layer

#### `scripts/find_careers_pages.py`

Purpose:

- discover careers pages
- detect ATS types
- update company list rows with `careers_url` and `ats_type`

Key functions:

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

### 3. Scraping Layer

#### `scripts/scrape_careers.py`

Purpose:

- load selected companies
- route by ATS type
- scrape ATS/API-backed sites and selected custom sites
- write raw postings to `data/raw/`

Key functions:

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

Routing shape:

```text
company row
   |
   +--> greenhouse_jobs()
   +--> lever_jobs()
   +--> smartrecruiters_jobs()
   +--> booking_jobs()
   +--> abnamro_jobs()
   +--> tomtom_jobs()
   +--> scrape_with_playwright()
```

### 4. Cleaning Layer

#### `scripts/clean.py`

Purpose:

- load raw run files
- clean and deduplicate postings
- normalize salary, seniority, language, and tools
- write processed postings

Key functions:

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

### 5. Aggregation Layer

#### `scripts/aggregate.py`

Purpose:

- summarize processed data
- compute salary, tools, venn, and trend data
- write `data/summary.json`

Key functions:

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

### 6. Frontend Layer

#### `app/index.html`

Purpose:

- load processed data directly in v0
- summarize rows client-side
- render charts and role list

Key functions:

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

Frontend flow:

```text
data/processed/YYYY-MM-DD.json
        |
        v
   summarizeRows()
        |
        +--> renderSummaryCards()
        +--> renderStackSection()
        +--> renderJobsSection()
        +--> renderToolsChart()
        +--> renderSalarySection()
        +--> renderVennSection()
        +--> renderTrendChart()
```

## Current Data Files

### Company lists

- `data/company_lists/nl_companies.json`
- `data/company_lists/us_companies.json`

### Raw outputs

- `data/raw/YYYY-MM-DD_NL_curated.json`
- `data/raw/YYYY-MM-DD_US_manual_links.json`

### Processed outputs

- `data/processed/YYYY-MM-DD.json`

### Optional aggregate output

- `data/summary.json`

## Planned Extension 1: NL Cleaning Pipeline

Source documents:

- [NL Cleaning.md](/Users/simona/Documents/work%20site/DE_JD_compare/NL%20Cleaning.md)
- [NL_CLEANING_IMPLEMENTATION_PLAN.md](/Users/simona/Documents/work%20site/DE_JD_compare/NL_CLEANING_IMPLEMENTATION_PLAN.md)

Goal:

- improve quality of `nl_companies.json`
- remove weak or irrelevant NL companies before scraping

Planned flow:

```text
nl_ind_raw.xlsx
     |
     v
build_nl_companies.py
     |
     v
initial NL company rows
     |
     v
enrich_nl_companies.py
     |
     v
nl_companies_enriched.json
     |
     v
filter_nl_companies.py
     |
     v
nl_companies_filtered.json
     |
     v
score_nl_relevance.py
     |
     v
nl_companies_scored.json
     |
     +---------------------+
     | manual overrides    |
     v                     |
finalize_nl_companies.py <-+
     |
     v
nl_companies.json
```

Planned major functions:

- enrichment from KvK
- deterministic SBI / size filter
- LLM relevance scoring
- final merge with overrides and existing curated values

Not yet built.

## Planned Extension 2: Agentic Fallback Collector

Source document:

- [Agentic_data_collector.md](/Users/simona/Documents/work%20site/DE_JD_compare/Agentic_data_collector.md)

Goal:

- recover postings from hard public custom careers sites
- only when deterministic scraping fails

Recommended module shape:

```text
scripts/
  scrape_careers.py
  agentic_fallback/
    __init__.py
    controller.py
    browser.py
    schemas.py
    prompts.py
```

Planned flow:

```text
scrape_careers.py
     |
     +--> ATS/API scraper --------------------> raw postings
     |
     +--> deterministic custom Playwright ----> raw postings
     |
     +--> if custom failed but page is public:
              agentic_fallback/controller.py
                    |
                    +--> browser.py
                    +--> prompts.py
                    +--> schemas.py
                    |
                    v
              raw postings + runlog
```

Planned major responsibilities:

- bounded browser navigation
- typed state machine
- fallback trigger contract
- per-company run logging

Not yet built.

## Built vs Planned

### Already implemented

- company-list builders
- careers page discovery
- ATS detection
- ATS/API scraping
- selected custom scrapers
- raw-to-processed cleaning
- frontend dashboard

### Planned but not implemented

- staged NL enrichment / filtering / relevance scoring pipeline
- agentic fallback for hard custom sites
- structured fallback run logs
- manual override system for NL company-list curation

## Architectural Boundaries

### Current primary path

This repo is centered on six execution files:

- `build_nl_companies.py`
- `build_us_companies.py`
- `find_careers_pages.py`
- `scrape_careers.py`
- `clean.py`
- `aggregate.py`

Any new subsystem should plug into this shape rather than create a parallel product.

### Recommended extension points

- NL cleaning should refine inputs before `nl_companies.json`
- agentic fallback should sit under `scrape_careers.py`

### Avoid

- parallel storage systems
- alternate downstream schemas
- second full scraper stack
- LLM-driven collection on ATS/API-backed sites

## Decision Map

```text
Should this company be scraped?
    |
    +--> build_* company list scripts
    |
    +--> optional future NL cleaning pipeline
    |
    v
Does this company have a careers URL?
    |
    +--> find_careers_pages.py
    |
    v
How should this site be scraped?
    |
    +--> ATS/API route -> scrape_careers.py
    |
    +--> custom deterministic route -> scrape_careers.py
    |
    +--> future agentic fallback for hard custom sites
    |
    v
How is the data normalized?
    |
    +--> clean.py
    |
    v
How is the data shown?
    |
    +--> aggregate.py and/or app/index.html
```

## Bottom Line

The implemented system is already a working file-based scraping pipeline.

The two credible next architecture additions are:

1. a stronger NL company-cleaning pipeline before `nl_companies.json`
2. a bounded agentic fallback inside the scraper for hard custom sites

Everything else should be treated as support for those two extension points, not as a separate platform.
