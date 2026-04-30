import argparse
from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd


def part_a_chart(input_dir: Path, output_dir: Path):
    path = input_dir / "part_a_query_times.csv"
    if not path.exists():
        return
    df = pd.read_csv(path)
    pivot = df.pivot_table(index="query_name", columns="strategy", values="execution_time_ms", aggfunc="mean")
    ax = pivot.plot(kind="bar", figsize=(12, 6))
    ax.set_title("Part A: Query Time vs Index Strategy")
    ax.set_ylabel("Execution Time (ms)")
    ax.set_xlabel("Query")
    plt.xticks(rotation=20, ha="right")
    plt.tight_layout()
    plt.savefig(output_dir / "part_a_query_time_bar.png", dpi=200)
    plt.close()


def part_b_chart(input_dir: Path, output_dir: Path):
    path = input_dir / "part_b_wal_configs.csv"
    if not path.exists():
        return
    df = pd.read_csv(path)
    ax = df.plot(x="wal_config", y="rows_per_sec", kind="bar", legend=False, figsize=(10, 5))
    ax.set_title("Part B: Write Throughput vs WAL Configuration")
    ax.set_ylabel("Rows per second")
    ax.set_xlabel("WAL Config")
    plt.xticks(rotation=20, ha="right")
    plt.tight_layout()
    plt.savefig(output_dir / "part_b_throughput_vs_wal_config.png", dpi=200)
    plt.close()


def part_c_charts(input_dir: Path, output_dir: Path):
    path = input_dir / "part_c_index_vs_wal_recovery.csv"
    if not path.exists():
        return
    df = pd.read_csv(path)

    ax1 = df.plot(x="index_count_proxy", y="wal_bytes_generated", marker="o", figsize=(8, 5))
    ax1.set_title("Part C: WAL Volume vs Index Count")
    ax1.set_xlabel("Index Count")
    ax1.set_ylabel("WAL Bytes Generated")
    plt.tight_layout()
    plt.savefig(output_dir / "part_c_wal_vs_index_count_line.png", dpi=200)
    plt.close()

    ax2 = df.plot(x="index_setup", y="recovery_time_sec", kind="bar", legend=False, figsize=(8, 5))
    ax2.set_title("Part C: Recovery Time vs Index Setup")
    ax2.set_xlabel("Index Setup")
    ax2.set_ylabel("Recovery Time (sec)")
    plt.xticks(rotation=0)
    plt.tight_layout()
    plt.savefig(output_dir / "part_c_recovery_vs_index_count_bar.png", dpi=200)
    plt.close()


def main():
    parser = argparse.ArgumentParser(description="Generate assignment charts from CSV outputs")
    parser.add_argument("--input-dir", default="results")
    parser.add_argument("--output-dir", default="results")
    args = parser.parse_args()

    input_dir = Path(args.input_dir)
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    part_a_chart(input_dir, output_dir)
    part_b_chart(input_dir, output_dir)
    part_c_charts(input_dir, output_dir)
    print("Charts generated.")


if __name__ == "__main__":
    main()
