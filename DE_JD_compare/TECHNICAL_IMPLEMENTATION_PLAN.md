# Technical Implementation Plan for `DE_JD_compare`

## Summary

This document translates [PLAN.md](/Users/simona/Documents/work site/DE_JD_compare/PLAN.md) into an execution-ready technical plan. It preserves the exact phase structure, file surface, and data contracts already defined there. It does not introduce extra scripts, extra pipeline stages, or new top-level modules beyond the ones already named in the project plan.

Implementation is task-oriented and decision-complete: each planned task defines its purpose, inputs, outputs, dependencies, processing steps, validation checks, failure handling, and completion criteria so engineering work can start directly from this document.

## Implementation Rules

- Only use the scripts already defined in `PLAN.md`:
  - `scripts/build_nl_companies.py`
  - `scripts/build_us_companies.py`
  - `scripts/find_careers_pages.py`
  - `scripts/scrape_careers.py`
  - `scripts/clean.py`
  - `scripts/aggregate.py`
- Keep the frontend as a single `app/index.html` file with no build step.
- Keep workflow scope limited to `.github/workflows/refresh.yml` and `.github/workflows/update_company_lists.yml`.
- Do not add extra ATS parser files; ATS-specific logic stays inside `scripts/scrape_careers.py`.
- Do not add extra secrets beyond `KVK_API_KEY`.
- Preserve the JSON contracts already defined in `PLAN.md`; implementation may fill fields but should not expand the surface unless the plan already requires it.

## Public Interfaces / Data Contracts

### `data/company_lists/nl_companies.json`

Array of objects with this shape:

```json
[
  {
    "name": "Adyen",
    "city": "Amsterdam",
    "kvk": "34259528",
    "careers_url": null,
    "ats_type": "greenhouse"
  }
]
```

Required fields:
- `name`
- `city`
- `kvk`
- `careers_url`

Optional field:
- `ats_type`

### `data/company_lists/us_companies.json`

Array of objects with this shape:

```json
[
  {
    "name": "Databricks",
    "city": "San Francisco",
    "lca_salary_max": 185000,
    "careers_url": null,
    "ats_type": "lever"
  }
]
```

Required fields:
- `name`
- `city`
- `lca_salary_max`
- `careers_url`

Optional field:
- `ats_type`

### Raw posting output from `scripts/scrape_careers.py`

Each raw posting object must preserve this schema:

```json
{
  "job_id": "abc123",
  "title": "Senior Data Engineer",
  "company": "Databricks",
  "location": "San Francisco, CA",
  "country": "US",
  "posted_date": "2026-03-15",
  "salary_min": null,
  "salary_max": null,
  "salary_currency": null,
  "description_raw": "<html>...</html>",
  "employment_type": "full-time",
  "remote_ok": true,
  "language": null,
  "lca_salary_max": 185000
}
```

### Cleaned posting output from `scripts/clean.py`

Each cleaned posting must preserve the fields defined in `PLAN.md`, including:

```json
{
  "job_id": "abc123",
  "market": "US",
  "language": "en",
  "posted_date": "2026-03-15",
  "seniority_level": "senior",
  "tools": {
    "databricks": true,
    "snowflake": false
  },
  "salary_usd_annual": 185000,
  "salary_source": "lca",
  "experience_years_min": 5,
  "remote_ok": true
}
```

### `data/summary.json`

Top-level shape must remain:

```json
{
  "last_updated": "2026-03-15",
  "markets": {},
  "tools": {},
  "salary_distribution": {},
  "venn": {
    "nl_only": [],
    "us_only": [],
    "shared": []
  },
  "trends": []
}
```

## Task-by-Task Plan

### 1. Repo Initialization

**Purpose**
- Align the repo structure and runtime config with the project plan before code implementation starts.

**Inputs**
- Existing repo scaffold
- `PLAN.md`
- Existing `data/summary.json`

**Outputs**
- Directories present:
  - `data/company_lists/`
  - `data/raw/`
  - `data/processed/`
  - `scripts/`
  - `app/`
  - `.github/workflows/`
- `.env.example` containing only `KVK_API_KEY`
- Existing `data/summary.json` retained as the initial frontend contract

**Required dependencies**
- None beyond the repo itself

**Processing steps**
1. Ensure only the planned directories exist.
2. Keep `data/summary.json` as the placeholder aggregation contract.
3. Replace old `.env.example` values with the single optional `KVK_API_KEY`.

**Validation checks**
- `data/company_lists`, `data/raw`, and `data/processed` exist.
- `.github/workflows` exists.
- `.env.example` contains only the KvK setting.

**Failure handling**
- Fail immediately if required directories cannot be created or if `.env.example` still exposes unrelated keys.

**Completion criteria**
- Repo shape matches the file structure in `PLAN.md` without adding extra top-level components.

### 2. `scripts/build_nl_companies.py`

**Purpose**
- Build the Netherlands company input list from the IND recognised sponsors register.

**Inputs**
- `data/company_lists/nl_ind_raw.xlsx` or PDF equivalent from the IND register
- Optional `KVK_API_KEY`

**Outputs**
- `data/company_lists/nl_companies.json`

**Required dependencies**
- `pandas`
- `openpyxl`
- `pdfplumber`
- `python-dotenv`
- `httpx` for optional KvK API lookup

**Processing steps**
1. Detect the IND input file format from extension.
2. Parse Excel with `pandas` and `openpyxl`; if the file is PDF, use `pdfplumber`.
3. Normalize extracted columns to company name, city, and KvK number.
4. Filter companies to these cities only:
   - Amsterdam
   - Amstelveen
   - Haarlem
   - Utrecht
5. Apply the second-pass relevance filter:
   - First pass: company-name keyword heuristics for tech, finance, and scale-up employers
   - Second pass: if `KVK_API_KEY` exists, query KvK and keep SBI sectors 62xx, 63xx, or 64xx
6. Build output records with `careers_url: null`.
7. Write `nl_companies.json`.

**Validation checks**
- Input file parsed successfully.
- Output contains at least one company.
- Every output record has `name`, `city`, `kvk`, and `careers_url`.
- No output row includes a city outside the allowed list.

**Failure handling**
- Fail loudly if the file format is unsupported.
- Fail loudly if parsing produces zero rows.
- If KvK lookup fails or the key is missing, continue with name heuristics only.

**Completion criteria**
- `nl_companies.json` is written and usable as input for career-page discovery.

### 3. `scripts/build_us_companies.py`

**Purpose**
- Build the California company list from DOL LCA disclosure data with normalized filed salary signals.

**Inputs**
- `data/company_lists/us_lca_raw.csv`

**Outputs**
- `data/company_lists/us_companies.json`

**Required dependencies**
- `pandas`

**Processing steps**
1. Read the LCA CSV in chunks to handle large file size safely.
2. Normalize `WAGE_RATE_OF_PAY_FROM` to annual values using `WAGE_UNIT_OF_PAY`:
   - `Year` stays annual
   - `Hour` × 2080
   - `Week` × 52
   - `Bi-Weekly` × 26
3. Filter rows where:
   - `WORKSITE_STATE == 'CA'`
   - `SOC_CODE == '15-1242'` or `CASE_TITLE` contains `data engineer` case-insensitively
   - normalized annual wage is at least `100000`
4. Deduplicate by `EMPLOYER_NAME`.
5. Keep the maximum annual wage per employer as `lca_salary_max`.
6. Write output records with `careers_url: null`.

**Validation checks**
- Chunked load completes without exhausting memory.
- Wage normalization handles all four planned units correctly.
- Output is non-empty.
- Every output record contains `name`, `city`, `lca_salary_max`, and `careers_url`.

**Failure handling**
- Fail loudly if the CSV cannot be read.
- Drop rows with invalid or implausible wage normalization results rather than breaking the full run.
- Fail loudly if filtering results in zero companies.

**Completion criteria**
- `us_companies.json` is written and ready for careers-page discovery and salary joins.

### 4. `scripts/find_careers_pages.py`

**Purpose**
- Discover and cache careers URLs and ATS types for companies in both markets.

**Inputs**
- `data/company_lists/nl_companies.json`
- `data/company_lists/us_companies.json`

**Outputs**
- Updated `nl_companies.json`
- Updated `us_companies.json`

**Required dependencies**
- `httpx`
- `playwright`

**Processing steps**
1. Load both company JSON files.
2. For each company where `careers_url` is null, attempt URL patterns in this exact order:
   - `https://{domain}/careers`
   - `https://{domain}/jobs`
   - `https://{domain}/en/careers`
   - `https://jobs.{domain}/`
3. When no direct pattern resolves, try hosted ATS search patterns described in `PLAN.md`.
4. Detect ATS provider from resolved URL or page content:
   - `greenhouse`
   - `lever`
   - `workday`
   - `smartrecruiters`
   - `bamboohr`
   - `custom`
5. Persist `careers_url` and `ats_type` back into the company JSON files.
6. Leave unresolved companies with `careers_url: null`.

**Validation checks**
- Existing non-null `careers_url` values are preserved.
- Resolved ATS URLs get the expected `ats_type`.
- Unresolved companies remain present in the file.

**Failure handling**
- Per-company failures are logged and skipped.
- Network or parsing errors must not abort the full company list update.

**Completion criteria**
- Both company lists are updated in place with as many resolved `careers_url` and `ats_type` values as possible.

### 5. `scripts/scrape_careers.py`

**Purpose**
- Scrape job postings from discovered careers pages using ATS-specific paths while keeping the scraper surface inside one script.

**Inputs**
- `data/company_lists/nl_companies.json`
- `data/company_lists/us_companies.json`

**Outputs**
- `data/raw/YYYY-MM-DD_NL.json`
- `data/raw/YYYY-MM-DD_US.json`

**Required dependencies**
- `httpx`
- `playwright`
- `asyncio`

**Processing steps**
1. Load NL and US company lists.
2. For each company with a non-null `careers_url`, dispatch scraping by `ats_type`.
3. Use JSON APIs for:
   - Greenhouse
   - Lever
   - SmartRecruiters
4. Use Playwright for:
   - Workday
   - Custom sites
5. Filter postings to titles containing:
   - `data engineer`
   - `data ingenieur`
6. Fetch full descriptions for matching postings.
7. Join company-level `lca_salary_max` into US postings.
8. Write one timestamped raw file per market.
9. Apply per-domain throttling and per-company timeout handling.

**Validation checks**
- Output records match the raw posting contract.
- Non-target job titles are excluded.
- Both market outputs are valid JSON arrays even when partially empty.

**Failure handling**
- One failing company must not stop the full run.
- Requests should timeout per company rather than hanging the full scrape.
- Unreachable or blocked sites should be logged and skipped.

**Completion criteria**
- Raw files are written for the current run and contain only targeted postings.

### 5A. V0 Pilot Scraping Rollout

**Purpose**
- Start scraping in a controlled way that validates the pipeline before attempting a broad NL or US crawl.

**Inputs**
- `data/company_lists/nl_companies.json`
- `data/company_lists/us_companies.json`
- Current implementations of `scripts/find_careers_pages.py` and `scripts/scrape_careers.py`

**Outputs**
- A small validated batch of updated company records with resolved `careers_url` values
- One pilot raw scrape output per market in `data/raw/`
- A short go / no-go decision on whether to scale to the next batch size

**Scope for v0**
- Treat this phase as pipeline validation, not a production scrape.
- Do not run `find_careers_pages.py` or `scrape_careers.py` against the full NL company list on the first pass.
- Use small market-balanced samples first:
  - US: 20 to 50 companies
  - NL: 20 to 50 companies

**Implementation approach**
1. Create temporary sample subsets from the full company files without changing the permanent company-list contracts.
2. Run careers-page discovery only for the selected sample companies.
3. Inspect the resolved URLs manually for a small subset across ATS types:
   - homepage plus `/careers`
   - Greenhouse
   - Lever
   - Workday
   - SmartRecruiters
   - custom
4. Run scraping only on companies in the sample that now have non-null `careers_url`.
5. Review the raw output for title precision, duplicate postings, broken detail pages, and empty descriptions.
6. Scale only after the pilot meets the validation thresholds below.

**Sampling rules**
1. Prefer recognizable employers first because URL resolution is easier to verify manually.
2. For the US approvals-based list, start near the top of the ranked list because those employers are more likely to have stable ATS pages.
3. For the NL sponsor-based list, prefer companies with clearer brand-like names before long-tail legal entities.
4. Keep the sample mixed enough to exercise multiple ATS providers instead of over-sampling one domain pattern.

**Pilot validation checks**
- Careers-page discovery hit rate is high enough to justify scale-up:
  - target at least 40 percent resolved in the first NL pilot
  - target at least 60 percent resolved in the first US pilot
- ATS classification is directionally correct on manual inspection.
- Scraper output contains at least some valid targeted postings for each market, or a clear explanation if one market produces zero.
- No single broken company aborts the batch.
- Raw output records preserve the required schema from the raw posting contract.
- Scrape duration stays operationally reasonable for a small batch.

**Failure handling**
- If careers discovery hit rate is too low, stop and improve discovery heuristics before scaling scraping.
- If scraping produces mostly empty descriptions or irrelevant titles, stop and fix ATS-specific extraction before scaling.
- If Workday or custom sites dominate failures, continue only for ATS types already proven to work and defer the harder classes.
- If NL sample quality is poor because the sponsor workbook is too broad, add a tighter pre-filter before further discovery attempts.

**Scale-up criteria**
1. Pilot batch passes the validation checks.
2. Discovery quality is stable across both markets.
3. At least Greenhouse, Lever, and one browser-driven path are proven end to end.
4. The raw outputs are usable enough for `scripts/clean.py` to run without schema repair.
5. Only then expand to larger batches such as:
   - US: 100, then full list
   - NL: 100, then 250, then broader rollout

**Operational recommendation**
- Keep v0 execution manual from the terminal rather than putting the first scrape behind scheduled GitHub Actions.
- Only move to the scheduled workflow after one or two successful local pilot runs.

**Completion criteria**
- A pilot scrape has been executed on small NL and US samples.
- The team has concrete evidence on discovery hit rate, ATS mix, scrape precision, and the highest-priority fixes before scaling.

### 6. `scripts/clean.py`

**Purpose**
- Normalize, enrich, and deduplicate raw postings into the cleaned dataset used by aggregation.

**Inputs**
- Current-run raw files in `data/raw/`
- `data/company_lists/us_companies.json` for LCA salary joins
- Stored weekly EUR→USD exchange rate referenced in `PLAN.md`

**Outputs**
- `data/processed/YYYY-MM-DD.json`

**Required dependencies**
- `rapidfuzz`
- `beautifulsoup4`
- `lxml`
- `langdetect`

**Processing steps**
1. Load only the raw files from the current run.
2. Deduplicate exact and near-duplicate postings.
3. Detect language from the raw description and store `en`, `nl`, or `other`.
4. Infer `seniority_level` from title keywords and Dutch/English equivalents.
5. Extract `experience_years_min` from the description using the regex rules in `PLAN.md`.
6. Clean description text by stripping HTML and normalizing whitespace.
7. Extract tool mentions against the defined keyword dictionary.
8. Normalize salary using this precedence:
   - Posting salary fields
   - `lca_salary_max`
   - null
9. Convert EUR-denominated salary values to annual USD.
10. Write one timestamped cleaned output file.

**Validation checks**
- Duplicate postings are removed.
- `language`, `seniority_level`, and `salary_source` stay within the allowed values.
- Tool extraction avoids obvious false positives such as matching `java` inside `javascript`.
- Output records contain the planned cleaned fields.

**Failure handling**
- Invalid postings may be skipped, but the full run should continue.
- Missing exchange-rate data should fail loudly rather than silently writing inconsistent salary values.

**Completion criteria**
- One cleaned file is written for the current run and is suitable for aggregation without extra transformation.

### 7. `scripts/aggregate.py`

**Purpose**
- Aggregate all processed runs into the summary dataset consumed directly by the frontend.

**Inputs**
- All processed files in `data/processed/`

**Outputs**
- `data/summary.json`

**Required dependencies**
- Standard library only:
  - `statistics`
  - `json`
  - `pathlib`

**Processing steps**
1. Load all processed posting files.
2. Split postings by market.
3. Compute per-market:
   - total count
   - NL language breakdown
   - seniority breakdown
   - tool frequencies
   - salary percentiles excluding nulls
   - top tools
   - remote percentage
4. Compute cross-market tool overlap:
   - NL only
   - US only
   - shared
5. Compute trend series by month if multiple historical runs exist.
6. Write `data/summary.json` with the stable top-level keys already defined.

**Validation checks**
- `summary.json` keeps the required top-level shape.
- Salary statistics exclude null values.
- Venn grouping uses the thresholds defined in `PLAN.md`.
- Empty historical data yields an empty `trends` array rather than an error.

**Failure handling**
- Fail loudly if no processed files exist.
- Ignore malformed individual processed rows when possible, but fail if market-level aggregation cannot be produced.

**Completion criteria**
- `data/summary.json` is complete enough for the frontend to render without additional processing.

### 8. `app/index.html`

**Purpose**
- Deliver the full one-page interface as a static HTML application with no build tooling.

**Inputs**
- `data/summary.json`

**Outputs**
- Rendered comparison UI served directly from `app/index.html`

**Required dependencies**
- Chart.js via CDN

**Processing steps**
1. Fetch `data/summary.json` on page load.
2. Render header, last-updated value, and market toggle.
3. Render summary cards for both markets.
4. Render grouped tool frequency bars.
5. Render salary distribution visualization.
6. Render Venn-style overlap lists from the `venn` object.
7. Render the trends chart only when there is enough data.
8. Implement only these controls:
   - category filter
   - seniority filter
   - top-10 toggle
   - market toggle
9. Render methodology and data-source notes in the footer.

**Validation checks**
- Page loads without a build step.
- Empty `trends` does not break rendering.
- Sparse salary data does not break rendering.
- Filter controls update the displayed charts and summaries consistently.

**Failure handling**
- If `data/summary.json` cannot be loaded, render a clear in-page error state rather than a blank page.

**Completion criteria**
- The frontend can be opened statically and reads directly from `data/summary.json`.

### 9. GitHub Actions

#### `.github/workflows/refresh.yml`

**Purpose**
- Run the weekly scrape, clean, and aggregation pipeline.

**Inputs**
- Repo checkout
- Public DOL LCA source
- Optional `KVK_API_KEY`

**Outputs**
- Updated data artifacts committed back to the repo

**Required dependencies**
- Python 3.12
- Playwright browser install
- Packages from `requirements.txt`

**Processing steps**
1. Checkout the repo.
2. Set up Python 3.12.
3. Install dependencies and Playwright browsers.
4. Download the LCA CSV to `data/company_lists/us_lca_raw.csv`.
5. Run:
   - `python scripts/build_us_companies.py`
   - `python scripts/scrape_careers.py`
   - `python scripts/clean.py`
   - `python scripts/aggregate.py`
6. Rebase against the latest branch state.
7. Commit and push generated data artifacts.

**Validation checks**
- Workflow runs from a clean checkout.
- Pipeline completes even when some company scrapes fail.

**Failure handling**
- Per-company scrape failures should not fail the workflow.
- Hard failures in data build or aggregation should fail the workflow visibly.

**Completion criteria**
- Weekly workflow refreshes repo data outputs without manual intervention.

#### `.github/workflows/update_company_lists.yml`

**Purpose**
- Refresh the NL company list and run careers page discovery for both markets on a quarterly cadence.

**Inputs**
- Repo checkout (includes current `us_companies.json`)
- Fresh IND register download
- Optional `KVK_API_KEY`

**Outputs**
- Updated company list files for both markets committed back to the repo

**Required dependencies**
- Python 3.12
- Packages from `requirements.txt`

**Processing steps**
1. Checkout the repo.
2. Download the latest IND register.
3. Run:
   - `python scripts/build_nl_companies.py`
   - `python scripts/find_careers_pages.py`
4. Rebase against the latest branch state.
5. Commit updated company-list outputs.

**Validation checks**
- Workflow can run without additional secrets beyond `KVK_API_KEY`.
- Updated company files are the only intended artifacts of the job.

**Failure handling**
- Missing `KVK_API_KEY` must not break the name-heuristic path.
- IND format changes should fail loudly so the issue is visible.

**Completion criteria**
- Quarterly workflow updates the NL list and cached careers URLs for both markets with no manual repo editing.

### 10. Documentation Alignment

**Purpose**
- Keep config and dependency documentation aligned with the actual pipeline scope.

**Inputs**
- `PLAN.md`
- `requirements.txt`
- `.env.example`

**Outputs**
- `requirements.txt` matching the dependency list from `PLAN.md`
- `.env.example` matching actual runtime needs

**Required dependencies**
- None

**Processing steps**
1. Keep `requirements.txt` restricted to the dependencies listed in `PLAN.md`.
2. Keep `.env.example` restricted to `KVK_API_KEY`.
3. If a README is added later, document only the planned pipeline, not additional scope.

**Validation checks**
- Dependency list matches the plan.
- Runtime environment docs do not mention unused external services.

**Failure handling**
- Treat drift between docs and actual runtime requirements as a blocking issue during implementation review.

**Completion criteria**
- Configuration docs match the actual project design with no stale or unused references.

## Test Plan

### `build_nl_companies.py`
- Excel parse succeeds.
- PDF fallback succeeds.
- City filter removes out-of-scope rows.
- No-API-key mode falls back to name heuristics.

### `build_us_companies.py`
- Annual, hourly, weekly, and bi-weekly wage normalization is correct.
- Title and SOC filtering keep intended rows.
- Employer dedup keeps max wage.

### `find_careers_pages.py`
- Known ATS URLs resolve and classify correctly.
- Unresolved companies remain null without crashing.
- Pilot sample execution can be limited safely without mutating unrelated companies.

### `scrape_careers.py`
- Each ATS path returns normalized posting records.
- Non-matching titles are excluded.
- One failing company does not abort the run.
- Small-batch pilot runs complete before any full-list rollout.
- Raw outputs from pilot runs are inspected before scale-up.

### `clean.py`
- Duplicate postings collapse correctly.
- Dutch and English language detection both work.
- Seniority and experience extraction behave as defined.
- Tool extraction avoids obvious false positives like `java` in `javascript`.
- Salary-source precedence is `posting`, then `lca`, then null.

### `aggregate.py`
- Percentiles exclude null salaries.
- Venn buckets follow the threshold rules from `PLAN.md`.
- Trends appear only when more than one historical run exists.

### `app/index.html`
- Page loads from static hosting without build tooling.
- Empty `trends` and sparse salary data render gracefully.
- Filters update charts and counts consistently.

### Workflows
- Scheduled jobs can run from a clean checkout.
- Missing optional `KVK_API_KEY` does not break non-NL refresh paths.

## Assumptions

- Output file for this planning task is `/Users/simona/Documents/work site/DE_JD_compare/TECHNICAL_IMPLEMENTATION_PLAN.md`.
- “Do not create extra functions” is interpreted here as “do not add extra scripts, modules, workflows, or top-level components beyond those already named in `PLAN.md`.”
- Internal helper logic may still exist inside the named scripts, but the implementation plan does not add any extra top-level project surface.
- The repo is still at scaffold stage, so setup tasks are explicitly included.
