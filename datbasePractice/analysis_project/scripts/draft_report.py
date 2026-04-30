import argparse
from pathlib import Path

import pandas as pd


def fmt_ms(v: float) -> str:
    return f"{v:.3f} ms"


def fmt_s(v: float) -> str:
    return f"{v:.3f} s"


def fmt_int(v: float) -> str:
    return f"{int(v):,}"


def part_a_text(results_dir: Path) -> str:
    p = results_dir / "part_a_query_times.csv"
    q = results_dir / "part_a_index_build_and_size.csv"
    if not p.exists() or not q.exists():
        return "## Part A Results - Indexing\nCSV files not found.\n"

    df = pd.read_csv(p)
    idx = pd.read_csv(q)
    best = df.sort_values("execution_time_ms").groupby("query_name", as_index=False).first()

    lines = [
        "## Part A Results - Indexing",
        "",
        "### Fastest Strategy Per Query",
    ]
    for _, row in best.iterrows():
        lines.append(
            f"- `{row['query_name']}`: `{row['strategy']}` with {fmt_ms(row['execution_time_ms'])} (top node: {row['top_node_type']})."
        )

    lines.extend(["", "### Index Build and Size Observations"])
    for _, row in idx.iterrows():
        lines.append(
            f"- `{row['strategy']}`: build time {fmt_ms(row['index_build_time_ms'])}, size {fmt_int(row['index_size_bytes'])} bytes."
        )

    lines.extend(
        [
            "",
            "### Interpretation",
            "- Sequential scan can still be selected when estimated selectivity is low or table access is cheaper than index traversal + heap fetch.",
            "- Composite and partial indexes help only when query predicates match index definition and filter selectivity is high.",
            "- Covering indexes reduce heap reads when required columns are included.",
        ]
    )
    return "\n".join(lines) + "\n"


def part_b_text(results_dir: Path) -> str:
    p = results_dir / "part_b_wal_configs.csv"
    if not p.exists():
        return "## Part B Results - WAL and Recovery\nCSV file not found.\n"

    df = pd.read_csv(p)
    fastest = df.sort_values("rows_per_sec", ascending=False).iloc[0]
    lowest_wal = df.sort_values("wal_bytes_generated", ascending=True).iloc[0]

    lines = [
        "## Part B Results - WAL and Recovery",
        "",
        "### Throughput Summary",
        f"- Fastest write throughput: `{fastest['wal_config']}` at {fastest['rows_per_sec']:.2f} rows/s ({fmt_s(fastest['insert_time_sec'])}).",
        f"- Lowest WAL volume: `{lowest_wal['wal_config']}` with {fmt_int(lowest_wal['wal_bytes_generated'])} bytes.",
        "",
        "### Per-Configuration Notes",
    ]
    for _, row in df.iterrows():
        lines.append(
            f"- `{row['wal_config']}`: {row['rows_per_sec']:.2f} rows/s, WAL {fmt_int(row['wal_bytes_generated'])} bytes, checkpoints (timed={int(row['checkpoints_timed_delta'])}, req={int(row['checkpoints_req_delta'])})."
        )

    lines.extend(
        [
            "",
            "### Crash-Recovery Discussion",
            "- Add observed recovery times from PostgreSQL logs (time between restart and ready-for-connections).",
            "- Verify rollback by confirming uncommitted inserted range is absent after restart.",
        ]
    )
    return "\n".join(lines) + "\n"


def part_c_text(results_dir: Path) -> str:
    p = results_dir / "part_c_index_vs_wal_recovery.csv"
    if not p.exists():
        return "## Part C Results - Intersection\nCSV file not found.\n"

    df = pd.read_csv(p)
    lines = [
        "## Part C Results - Intersection",
        "",
        "### WAL and Throughput by Index Setup",
    ]
    for _, row in df.iterrows():
        lines.append(
            f"- `{row['index_setup']}` (count={int(row['index_count_proxy'])}): throughput {row['rows_per_sec']:.2f} rows/s, WAL {fmt_int(row['wal_bytes_generated'])} bytes, recovery {row['recovery_time_sec']} s."
        )

    lines.extend(
        [
            "",
            "### Discussion",
            "- Additional indexes typically increase WAL because each inserted tuple may trigger multiple index page updates and WAL records.",
            "- Growth is often non-linear due to page splits, fillfactor behavior, and checkpoint timing.",
            "- HOT updates can reduce index churn when updated columns are not indexed, lowering index-related WAL.",
        ]
    )
    return "\n".join(lines) + "\n"


def main():
    parser = argparse.ArgumentParser(description="Draft report text from benchmark CSVs")
    parser.add_argument("--results-dir", default="results")
    parser.add_argument("--output", default="report/auto_report_draft.md")
    args = parser.parse_args()

    results_dir = Path(args.results_dir)
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)

    body = []
    body.append("# Auto Draft Report Sections\n")
    body.append(part_a_text(results_dir))
    body.append(part_b_text(results_dir))
    body.append(part_c_text(results_dir))

    output.write_text("\n".join(body), encoding="utf-8")
    print(f"Wrote report draft to: {output}")


if __name__ == "__main__":
    main()
