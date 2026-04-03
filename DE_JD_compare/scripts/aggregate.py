from __future__ import annotations

import json
import math
import statistics
import sys
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PROCESSED_DIR = ROOT / "data" / "processed"
OUTPUT_PATH = ROOT / "data" / "summary.json"
SENIORITY_LEVELS = ("junior", "mid", "senior", "lead")
TOOL_CATEGORIES = {
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
TOOL_TO_CATEGORY = {tool: category for category, tools in TOOL_CATEGORIES.items() for tool in tools}


def load_processed_postings() -> list[dict]:
    postings: list[dict] = []
    for path in sorted(PROCESSED_DIR.glob("*.json")):
        postings.extend(json.loads(path.read_text()))
    if not postings:
        raise FileNotFoundError("No processed files found in data/processed/")
    return postings


def percentile(values: list[int], p: float) -> int | None:
    if not values:
        return None
    if len(values) == 1:
        return values[0]
    index = (len(values) - 1) * p
    lower = math.floor(index)
    upper = math.ceil(index)
    if lower == upper:
        return values[lower]
    weight = index - lower
    return int(round(values[lower] + (values[upper] - values[lower]) * weight))


def salary_stats(postings: list[dict]) -> dict:
    salaries = sorted(int(posting["salary_usd_annual"]) for posting in postings if posting.get("salary_usd_annual") is not None)
    if not salaries:
        return {"count": 0, "p25": None, "median": None, "p75": None}
    return {
        "count": len(salaries),
        "p25": percentile(salaries, 0.25),
        "median": int(statistics.median(salaries)),
        "p75": percentile(salaries, 0.75),
    }


def tool_frequency(postings: list[dict], tool: str) -> tuple[float, int]:
    if not postings:
        return 0.0, 0
    count = sum(1 for posting in postings if posting.get("tools", {}).get(tool))
    return round(count / len(postings), 4), count


def build_market_summary(postings: list[dict]) -> dict:
    salaries = salary_stats(postings)
    seniority_counts = {level: sum(1 for posting in postings if posting.get("seniority_level") == level) for level in SENIORITY_LEVELS}
    tool_counts = {
        tool: tool_frequency(postings, tool)[1]
        for tool in TOOL_TO_CATEGORY
    }
    top_tools = [
        tool
        for tool, count in sorted(tool_counts.items(), key=lambda item: (-item[1], item[0]))
        if count > 0
    ][:10]
    return {
        "count": len(postings),
        "count_nl_lang": sum(1 for posting in postings if posting.get("language") == "nl"),
        "count_en_lang": sum(1 for posting in postings if posting.get("language") == "en"),
        "median_salary_usd": salaries["median"],
        "top_tool": top_tools[0] if top_tools else None,
        "top_tools": top_tools,
        "remote_pct": round(sum(1 for posting in postings if posting.get("remote_ok")) / len(postings), 4) if postings else 0.0,
        "seniority": seniority_counts,
    }


def build_tools_summary(markets: dict[str, list[dict]]) -> dict:
    summary = {}
    for tool, category in TOOL_TO_CATEGORY.items():
        summary[tool] = {
            "category": category,
            "overall": {},
            "counts": {},
            "by_seniority": {},
        }
        for market, postings in markets.items():
            pct, count = tool_frequency(postings, tool)
            summary[tool]["overall"][market] = pct
            summary[tool]["counts"][market] = count
        for level in SENIORITY_LEVELS:
            summary[tool]["by_seniority"][level] = {}
            for market, postings in markets.items():
                filtered = [posting for posting in postings if posting.get("seniority_level") == level]
                pct, count = tool_frequency(filtered, tool)
                summary[tool]["by_seniority"][level][market] = {
                    "pct": pct,
                    "count": count,
                    "total": len(filtered),
                }
    return summary


def build_salary_distribution(markets: dict[str, list[dict]]) -> dict:
    distribution = {market: salary_stats(postings) for market, postings in markets.items()}
    distribution["by_seniority"] = {}
    for level in SENIORITY_LEVELS:
        distribution["by_seniority"][level] = {
            market: salary_stats([posting for posting in postings if posting.get("seniority_level") == level])
            for market, postings in markets.items()
        }
    return distribution


def build_venn(tools_summary: dict) -> dict:
    venn = {"nl_only": [], "us_only": [], "shared": []}
    for tool, payload in tools_summary.items():
        nl_pct = payload["overall"].get("NL", 0.0)
        us_pct = payload["overall"].get("US", 0.0)
        if nl_pct > 0.10 and us_pct < 0.05:
            venn["nl_only"].append(tool)
        elif us_pct > 0.10 and nl_pct < 0.05:
            venn["us_only"].append(tool)
        elif nl_pct > 0.10 and us_pct > 0.10:
            venn["shared"].append(tool)
    for key in venn:
        venn[key] = sorted(venn[key])
    return venn


def build_trends(postings: list[dict]) -> list[dict]:
    monthly_totals: dict[tuple[str, str], int] = defaultdict(int)
    monthly_tool_counts: dict[tuple[str, str, str], int] = defaultdict(int)
    months: set[tuple[str, str]] = set()

    for posting in postings:
        posted_date = posting.get("posted_date")
        if not posted_date or len(str(posted_date)) < 7:
            continue
        month = str(posted_date)[:7]
        market = posting.get("market")
        monthly_totals[(month, market)] += 1
        months.add((month, market))
        for tool, present in posting.get("tools", {}).items():
            if present:
                monthly_tool_counts[(month, market, tool)] += 1

    if len({month for month, _ in months}) < 2:
        return []

    trends = []
    for (month, market, tool), count in sorted(monthly_tool_counts.items()):
        total = monthly_totals[(month, market)]
        trends.append({"month": month, "market": market, "tool": tool, "pct": round(count / total, 4)})
    return trends


def main() -> int:
    postings = load_processed_postings()
    markets = {
        "NL": [posting for posting in postings if posting.get("market") == "NL"],
        "US": [posting for posting in postings if posting.get("market") == "US"],
    }
    tools_summary = build_tools_summary(markets)
    payload = {
        "_comment": "This file is auto-generated by scripts/aggregate.py. Do not edit manually.",
        "last_updated": max((posting.get("posted_date") for posting in postings if posting.get("posted_date")), default=None),
        "markets": {market: build_market_summary(market_postings) for market, market_postings in markets.items()},
        "tools": tools_summary,
        "salary_distribution": build_salary_distribution(markets),
        "venn": build_venn(tools_summary),
        "trends": build_trends(postings),
    }
    OUTPUT_PATH.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n")
    print(f"Wrote summary data to {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"aggregate.py failed: {exc}", file=sys.stderr)
        raise
