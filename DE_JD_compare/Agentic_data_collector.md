# Agentic Careers Collector

## Executive Recommendation

Do not build the original proposal as written.

It is too broad for this repo, duplicates existing scraping logic, and introduces high operational ambiguity too early. The right MVP is a **bounded fallback collector** for hard custom careers sites that current deterministic scraping cannot handle.

This project already has the correct primary architecture:

- ATS/API-first where possible
- deterministic scraping before browser automation
- raw JSON output compatible with `clean.py`
- lightweight downstream aggregation and frontend consumption

The agentic layer should fit into that system. It should not become a second general-purpose scraper stack.

## Final Position

### Keep

- Playwright for JS-rendered pages and interactive careers surfaces
- Pydantic-style structured validation
- hard step ceilings and bounded runs
- concurrency limits
- caching / avoid reprocessing the same URL in one run

### Change

- use the agent **only** as fallback for `ats_type == custom`
- use a deterministic controller before invoking any model
- return existing raw posting objects, not a new storage schema
- replace free-form ReAct with a small typed state machine
- write run logs to JSON files, not SQLite

### Remove for MVP

- full ReAct collector for every company
- SQLite as primary persistence
- broad autonomous browsing across all ATS types
- separate LangChain LLM path plus separate OpenAI extraction client
- agent-owned classification policy that diverges from `clean.py`

## Why The Original Proposal Is Overbuilt

### 1. Wrong layer boundary

The proposal creates a new `collector/` subsystem that effectively reimplements scraping, extraction, persistence, and orchestration. This conflicts with the current repo, where those concerns already exist in:

- `scripts/find_careers_pages.py`
- `scripts/scrape_careers.py`
- `scripts/clean.py`

For MVP, the agent should be a capability inside `scrape_careers.py` or a closely-related helper module, not a parallel product.

### 2. Too much autonomy too early

Pure ReAct browsing is expensive and hard to debug. On careers sites, failure is usually not “the model is dumb”; it is:

- blocked page
- hidden search box
- pagination trap
- stale careers URL
- poor link discovery

Those should be handled by deterministic checks first. An LLM should only reason when heuristics fail but the site is still public and reachable.

### 3. SQLite is unnecessary

This repo already uses file-based raw and processed outputs. Introducing SQLite now creates:

- a second persistence contract
- migration overhead
- replay complexity
- more code paths for no clear MVP gain

For the current dataset size, JSON is enough.

### 4. The proposed tools are too stringly typed

Tool outputs like:

- `"[PAGE TEXT] ..."`
- `"[SEARCH FAILED] ..."`
- `"[SAVED] ..."`

are convenient for demos, but weak for production debugging. Tool results should be typed objects with stable fields:

- `status`
- `reason`
- `current_url`
- `links`
- `page_text_excerpt`
- `posting`

That is necessary if this is meant to run unattended.

### 5. Classification is split in the wrong place

The proposal asks the agent to classify seniority and extract downstream analytical fields during collection. That is not aligned with this repo. The current pipeline intentionally separates:

- collection in `raw`
- normalization/extraction in `clean.py`

Keep that separation. The fallback collector should gather valid raw postings, not become a second cleaning layer.

## MVP Architecture To Build

## Goal

Improve coverage for hard public custom careers pages without changing the existing raw, processed, or frontend contracts.

## Placement

Integrate the agentic fallback under the existing scraping layer.

Recommended shape:

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

This keeps the fallback physically separate enough to stay maintainable, but logically inside the existing scraper flow.

## Collection Strategy

The collector must use strict routing:

### Route 1: ATS/API path

If `ats_type` is:

- `greenhouse`
- `lever`
- `smartrecruiters`

then use the existing deterministic/API scraper only.

The agent is never invoked.

### Route 2: Deterministic Playwright path

If `ats_type == custom`, try the existing browser-based heuristics first:

- open careers page
- extract visible links
- match obvious job URLs
- follow clear “careers”, “jobs”, “vacancies”, “next” links
- search current page heuristically for “data engineer”

If that succeeds, stop there.

### Route 3: Agentic fallback path

Invoke the fallback only if all of the following are true:

1. the company is `ats_type == custom`
2. deterministic extraction found zero valid postings
3. the site is still reachable and public
4. the page is not a login wall or hard block page

This is the core control that keeps cost and complexity bounded.

## Typed State Machine

Do not use unconstrained ReAct.

Use a small explicit state machine with bounded transitions:

```text
START
  -> load_page
  -> inspect_page
  -> choose_action
      -> follow_link
      -> search_page
      -> paginate
      -> extract_posting
      -> finish
ERROR -> finish
```

State should include:

- `company`
- `market`
- `careers_url`
- `current_url`
- `visited_urls`
- `candidate_posting_urls`
- `extracted_postings`
- `errors`
- `step_count`
- `blocked`
- `finished`

Hard limits:

- max tool steps: `12`
- max pagination depth: `3`
- max posting URLs extracted per company: `10`
- never revisit a URL in `visited_urls`

## LLM Responsibility

The model should do only narrow reasoning:

- identify which links are most likely job posting links
- decide between a small set of next actions
- decide whether the page is public-but-unsupported vs blocked vs empty

The model should not:

- own final persistence
- invent output schema
- do full downstream job normalization
- freely browse arbitrary domains

## Interfaces

### Input contract

Use the existing company row shape, with the fields already used by `scrape_careers.py`:

```json
{
  "name": "Company",
  "careers_url": "https://...",
  "ats_type": "custom",
  "city": "",
  "lca_salary_max": null
}
```

Plus the market coming from the current company-list source selection.

### Output contract

The fallback must return the same raw posting schema already consumed by `clean.py`:

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

No new downstream-required fields should be introduced for MVP.

### Failure contract

Each fallback run should emit a machine-readable run summary entry, for example:

```json
{
  "company": "Example",
  "market": "NL",
  "careers_url": "https://...",
  "strategy": "agentic_fallback",
  "status": "blocked|unsupported|no_matches|partial_success|success|error",
  "step_count": 7,
  "visited_urls": 4,
  "postings_found": 1,
  "error_reason": null,
  "elapsed_seconds": 18.4,
  "llm_calls": 3
}
```

This should be written to a JSON log file for the run, not to a database.

## Recommended Module Design

## `browser.py`

Responsibilities:

- one Playwright browser/context/page per company run
- deterministic helpers only
- no persistence logic

Methods should return typed observations, not formatted strings.

Recommended helpers:

- `goto(url) -> PageObservation`
- `extract_links() -> list[LinkObservation]`
- `search(query) -> PageObservation`
- `click_link(url_or_selector) -> PageObservation`
- `is_blocked_page() -> bool`

## `schemas.py`

Use Pydantic models for:

- `FallbackState`
- `PageObservation`
- `LinkObservation`
- `FallbackRunResult`

Do not redefine a second business schema for postings beyond the raw posting contract already in use.

## `controller.py`

Responsibilities:

- route between deterministic and agentic actions
- own state transitions
- enforce step ceilings
- track visited URLs and outcomes
- return raw postings plus run summary

This module should be fully testable without the full scraper.

## `prompts.py`

Keep prompts short and action-scoped.

Bad:

- long prose policy
- duplicated navigation strategy in both code and prompt
- vague “find all senior data engineer postings”

Good:

- choose one action from a fixed action set
- rank candidate links by likelihood of being a data engineer posting
- decide whether current page is blocked, empty, search results, or job detail

## Logging and Observability

For MVP, add explicit run artifacts:

- `data/raw/YYYY-MM-DD_<market>.json` for postings
- `data/raw/YYYY-MM-DD_agentic_fallback_runlog.json` for per-company results

Each runlog row should include:

- company
- strategy used
- whether fallback was invoked
- final status
- URLs visited
- postings extracted
- llm call count
- elapsed time

Without this, debugging failures will be too expensive.

## Prompt And Tool Guidance

## Recommended tool set

Keep the tool surface very small:

- `load_current_page`
- `extract_visible_links`
- `search_current_page`
- `open_candidate_link`
- `extract_current_posting`

That is enough.

Do not add “save_posting” as an LLM tool. Saving should happen in controller code after validation.

## Prompt policy

Prompt should express:

- target role family: `data engineer`
- allowed next actions
- step limit
- never revisit URLs
- stop conditions

Prompt should not express:

- full business rules already encoded in code
- complex salary extraction logic
- downstream seniority taxonomy beyond simple collection needs

## Compatibility With Current Pipeline

This MVP must preserve:

- `clean.py` input shape
- `aggregate.py` expectations
- frontend expectations

The fallback layer may improve raw coverage only. It should not require reworking downstream scripts.

## Acceptance Criteria

Recommend implementation only if the MVP can satisfy all of these:

1. It improves recovery on hard public custom sites that the current scraper misses.
2. It does not change the raw posting contract.
3. It produces inspectable per-company outcomes.
4. It invokes the LLM only on a minority of companies.
5. It fails fast on blocked or login-walled pages.
6. It does not regress ATS/API paths.

## Benchmark Set For Validation

Use a fixed benchmark, not ad hoc trials.

### ATS/API control

- one Greenhouse company
- one Lever company

Expectation:

- no fallback invocation

### Deterministic custom-site control

- one custom site currently solvable with existing scraper logic

Expectation:

- deterministic path wins
- no fallback invocation

### Hard custom-site candidate

- one custom site currently requiring manual URL help or company-specific handling

Expectation:

- fallback returns at least one valid raw posting

### Blocked site

- one site known to return WAF/Access Denied

Expectation:

- classified as blocked
- no looping

### No-match site

- one public careers page with no relevant data engineer roles

Expectation:

- clean zero-result outcome

## Build Order

### Phase 1

- extract current deterministic custom-site logic from `scrape_careers.py`
- define fallback trigger contract
- add typed runlog output

### Phase 2

- implement bounded browser wrapper
- implement explicit fallback state machine
- implement minimal prompt and tool set

### Phase 3

- wire fallback into `scrape_careers.py`
- benchmark against a short fixed site list
- confirm raw schema compatibility through `clean.py`

### Phase 4

- tighten failure taxonomy
- add per-run cost/latency reporting
- only then consider LangGraph if state complexity justifies it

## Recommended Technical Choices

### For MVP

- Playwright: yes
- Pydantic: yes
- JSON run logs: yes
- deterministic controller: yes
- optional LangGraph: maybe, only if it adds clarity

### Not recommended for MVP

- LangChain ReAct as the primary control plane
- SQLite persistence
- separate extraction and save tools owned by the LLM
- generic autonomous browsing across all company types

## Bottom Line

The correct MVP is not “an agent that scrapes careers pages.”

It is:

**a bounded, observable, fallback browser reasoner for custom public sites that fail deterministic extraction, while preserving the existing raw-to-clean pipeline unchanged.**

That is small enough to build, cheap enough to run, and aligned with the actual architecture of this repo.
