# NL Cleaning Implementation Plan

## Summary

This plan turns [NL Cleaning.md](/Users/simona/Documents/work%20site/DE_JD_compare/NL%20Cleaning.md) into a buildable pipeline that fits the current repo.

The objective is to produce a higher-quality `data/company_lists/nl_companies.json` by:

- enriching IND companies with real business metadata
- filtering out irrelevant companies before scraping
- keeping the existing downstream scraper and raw/clean pipeline intact

The implementation should improve the NL company list without introducing a parallel data model or a second scraping system.

## Recommended Position

The overall direction in `NL Cleaning.md` is correct, but it needs three changes before implementation:

1. Keep the current file-based workflow and existing `nl_companies.json` contract.
2. Make KvK enrichment optional and cacheable, because it is the highest operational dependency.
3. Use LLM scoring only after deterministic sector and size filtering, and persist scores as reviewable metadata rather than making them the only source of truth.

The right output is still a curated NL company list with:

- `name`
- `city`
- `kvk`
- `careers_url`
- `ats_type`

Any enrichment-only fields should live in intermediate files, not in the final scraper-facing file unless they are explicitly useful downstream.

## Implementation Changes

### 1. Add a staged NL company-list pipeline

Implement these stages under `scripts/`:

- `enrich_nl_companies.py`
  - input: raw IND-derived company list
  - enrich from KvK where possible
  - output: `data/company_lists/nl_companies_enriched.json`
- `filter_nl_companies.py`
  - apply sector and size filters
  - output: `data/company_lists/nl_companies_filtered.json`
- `score_nl_relevance.py`
  - apply LLM relevance scoring only to filtered companies
  - output: `data/company_lists/nl_companies_scored.json`
- `finalize_nl_companies.py`
  - merge reviewed careers URLs / ATS values into scraper-facing shape
  - output: `data/company_lists/nl_companies.json`

Do not replace the existing raw IND workbook flow. This should sit on top of it.

### 2. Lock the intermediate schema

Use one consistent intermediate company schema across enrichment, filtering, and scoring:

```json
{
  "name": "Example B.V.",
  "city": "Amsterdam",
  "kvk": "12345678",
  "website": null,
  "sbi_code": null,
  "sbi_description": null,
  "employees": null,
  "sector_relevant": null,
  "size_relevant": null,
  "llm_relevant": null,
  "llm_confidence": null,
  "llm_reason": null,
  "careers_url": null,
  "ats_type": null,
  "needs_manual_url": false
}
```

Rules:

- `kvk` remains stringly typed
- unknown enrichment values remain `null`
- the final scraper-facing file should only keep fields needed by the scraper and discovery steps

### 3. Deterministic filtering before LLM use

Implement sector filtering first.

Recommended deterministic rules:

- keep SBI prefixes from the draft:
  - `58`, `61`, `62`, `63`, `64`, `65`, `66`, `70`, `72`, `73`
- require either:
  - `employees >= 50`, or
  - company name matches a curated allowlist / recognizable tech-finance employer pattern
- explicitly exclude obvious low-value patterns where enrichment still passes:
  - staffing / recruitment agencies
  - accounting / tax / legal firms
  - small local consultancies with no product signal

This stage should output explicit booleans:

- `sector_relevant`
- `size_relevant`

LLM scoring should only run on rows that pass deterministic filtering.

### 4. Use LLM scoring as a ranking and cleanup layer, not sole authority

The LLM stage should answer one narrow question:

- “Does this company plausibly employ internal data engineers?”

Implementation rules:

- score only the filtered subset
- use structured JSON output
- persist the raw decision fields
- keep `high` and `medium` confidence positives by default
- write all scored results to disk so borderline cases can be manually reviewed

Do not let the LLM directly modify careers URLs, ATS type, or final schema.

### 5. Careers URL discovery should stay mostly deterministic

The draft is right that this should be mostly manual for the top set, but the implementation needs a hybrid rule:

- for high-priority final companies, allow manual correction as first-class input
- for the rest, probe:
  - known `/careers`, `/jobs`, `/vacancies`, `/werkenbij` paths
  - known ATS host patterns
- preserve existing non-null `careers_url` values from the current curated file unless explicitly overwritten

Add a simple manual overrides file such as:

- `data/company_lists/nl_company_overrides.json`

This should support:

- `website`
- `careers_url`
- `ats_type`
- optional inclusion / exclusion override

This avoids losing the curation work already done in the repo.

### 6. Finalization should merge, not rebuild blindly

`finalize_nl_companies.py` should merge:

- current `nl_companies.json`
- scored enriched companies
- manual overrides

Precedence:

1. manual overrides
2. current curated `nl_companies.json` values
3. newly discovered values

This matters because the repo already contains valid careers URLs and ATS assignments for many important NL companies.

## Output and Interface Contracts

### Intermediate outputs

Add these files:

- `data/company_lists/nl_companies_enriched.json`
- `data/company_lists/nl_companies_filtered.json`
- `data/company_lists/nl_companies_scored.json`
- `data/company_lists/nl_company_overrides.json`

### Final output

Preserve the existing final contract for the scraper:

```json
{
  "name": "Example B.V.",
  "city": "Amsterdam",
  "kvk": "12345678",
  "careers_url": "https://example.com/careers",
  "ats_type": "greenhouse"
}
```

If `ats_type` is still unknown, omit it or set it to `null` consistently with the current scraper expectations.

## Test Plan

### Deterministic filtering

- company with relevant SBI + 200 employees should survive
- company with relevant SBI + 5 employees should be filtered unless allowlisted
- company with non-relevant SBI should be removed

### Enrichment

- KvK success populates `sbi_code`, `sbi_description`, `employees`
- KvK failure leaves enrichment fields `null` and does not crash the run
- repeated runs should reuse cached enrichment results where available

### LLM scoring

- only filtered companies are scored
- malformed model response does not crash the run
- scored output always preserves input company fields plus score metadata

### Merge/finalization

- existing curated companies with valid `careers_url` survive unchanged if no better override exists
- manual override beats auto-discovered values
- final `nl_companies.json` remains valid input for `find_careers_pages.py` and `scrape_careers.py`

### Pipeline compatibility

- `find_careers_pages.py` can read the finalized file without changes to its contract
- `scrape_careers.py` can run against the finalized file without schema breakage

## Assumptions and Defaults

- The IND workbook remains the source of truth for the initial NL company universe.
- KvK enrichment may require credentials or rate-limited access, so caching is mandatory.
- Manual overrides are expected and desirable for the top NL companies.
- The immediate goal is better company-list quality, not fully automated end-to-end NL curation.
- The final company-list contract must stay compatible with the existing scraper flow.

## Suggested Build Order

1. Implement enrichment with disk caching.
2. Implement deterministic filter stage.
3. Implement LLM scoring on filtered output only.
4. Add manual overrides support.
5. Implement final merge step that regenerates `nl_companies.json`.
6. Validate with a small benchmark slice before rerunning the full NL list.
