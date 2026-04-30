import argparse
import csv
import json
import os
import time
from contextlib import contextmanager
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Tuple

import psycopg
import pandas as pd


PART_A_QUERIES = {
    "q1_point_lookup": "SELECT * FROM orders WHERE order_id = 250000;",
    "q2_range_scan": "SELECT COUNT(*) FROM orders WHERE order_date BETWEEN DATE '2023-01-01' AND DATE '2023-12-31';",
    "q3_multi_condition": "SELECT * FROM orders WHERE customer_id = 900 AND order_date >= DATE '2024-01-01';",
    "q4_partial_candidate": "SELECT order_id, customer_id, order_date FROM orders WHERE status = 'pending' AND order_date >= DATE '2024-01-01';",
    "q5_aggregation_covering_candidate": "SELECT customer_id, SUM(total_amount) AS total_spend FROM orders WHERE customer_id BETWEEN 1000 AND 5000 GROUP BY customer_id;",
    "q6_group_by_status": "SELECT status, COUNT(*) AS cnt FROM orders GROUP BY status;",
}


@dataclass
class DbConfig:
    host: str
    port: str
    dbname: str
    user: str
    password: str

    @classmethod
    def from_env(cls) -> "DbConfig":
        return cls(
            host=os.getenv("PGHOST", "localhost"),
            port=os.getenv("PGPORT", "5432"),
            dbname=os.getenv("PGDATABASE", "assign4"),
            user=os.getenv("PGUSER", "postgres"),
            password=os.getenv("PGPASSWORD", "Hadi.123"),
        )

    def dsn(self) -> str:
        return f"host={self.host} port={self.port} dbname={self.dbname} user={self.user} password={self.password}"


@contextmanager
def get_conn(cfg: DbConfig):
    with psycopg.connect(cfg.dsn(), autocommit=True) as conn:
        yield conn


def run_sql(cur, sql: str):
    cur.execute(sql)


def explain_analyze(cur, query: str) -> Dict:
    cur.execute(f"EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) {query}")
    result = cur.fetchone()[0][0]
    return result


def extract_plan_fields(plan_json: Dict) -> Tuple[float, str]:
    execution_time = float(plan_json["Execution Time"])
    node_type = plan_json["Plan"]["Node Type"]
    return execution_time, node_type


def index_size_bytes(cur, index_name: str) -> int:
    cur.execute("SELECT COALESCE(pg_relation_size(%s), 0);", (index_name,))
    row = cur.fetchone()
    return int(row[0]) if row else 0


def drop_experiment_indexes(cur):
    run_sql(
        cur,
        """
        DROP INDEX IF EXISTS idx_orders_order_date;
        DROP INDEX IF EXISTS idx_orders_customer_order_date;
        DROP INDEX IF EXISTS idx_orders_pending_order_date;
        DROP INDEX IF EXISTS idx_orders_customer_covering;
        DROP INDEX IF EXISTS idx_orders_status;
        DROP INDEX IF EXISTS idx_orders_customer_id;
        """,
    )


def create_indexes_for_strategy(cur, strategy: str):
    drop_experiment_indexes(cur)
    statements = {
        "baseline_no_index": [],
        "single_column": [
            "CREATE INDEX idx_orders_order_date ON orders(order_date);",
        ],
        "composite": [
            "CREATE INDEX idx_orders_customer_order_date ON orders(customer_id, order_date);",
        ],
        "partial": [
            "CREATE INDEX idx_orders_pending_order_date ON orders(order_date) WHERE status = 'pending';",
        ],
        "covering": [
            "CREATE INDEX idx_orders_customer_covering ON orders(customer_id) INCLUDE(total_amount, status);",
        ],
    }
    index_names = {
        "baseline_no_index": [],
        "single_column": ["idx_orders_order_date"],
        "composite": ["idx_orders_customer_order_date"],
        "partial": ["idx_orders_pending_order_date"],
        "covering": ["idx_orders_customer_covering"],
    }

    total_build_ms = 0.0
    for stmt in statements[strategy]:
        t0 = time.perf_counter()
        run_sql(cur, stmt)
        t1 = time.perf_counter()
        total_build_ms += (t1 - t0) * 1000

    run_sql(cur, "ANALYZE orders;")
    return total_build_ms, index_names[strategy]


def run_part_a(cfg: DbConfig, output_dir: Path):
    strategies = ["baseline_no_index", "single_column", "composite", "partial", "covering"]
    query_rows = []
    index_rows = []

    with get_conn(cfg) as conn:
        with conn.cursor() as cur:
            for strategy in strategies:
                build_ms, names = create_indexes_for_strategy(cur, strategy)

                total_index_size = sum(index_size_bytes(cur, name) for name in names)
                index_rows.append(
                    {
                        "strategy": strategy,
                        "index_build_time_ms": round(build_ms, 3),
                        "index_size_bytes": total_index_size,
                    }
                )

                for qname, qsql in PART_A_QUERIES.items():
                    plan = explain_analyze(cur, qsql)
                    exec_ms, scan_type = extract_plan_fields(plan)
                    query_rows.append(
                        {
                            "strategy": strategy,
                            "query_name": qname,
                            "execution_time_ms": round(exec_ms, 3),
                            "top_node_type": scan_type,
                            "plan_json": json.dumps(plan),
                        }
                    )

    write_csv(output_dir / "part_a_query_times.csv", query_rows)
    write_csv(output_dir / "part_a_index_build_and_size.csv", index_rows)


def current_lsn(cur) -> str:
    cur.execute("SELECT pg_current_wal_lsn();")
    return cur.fetchone()[0]


def wal_diff(cur, start_lsn: str, end_lsn: str) -> float:
    cur.execute("SELECT pg_wal_lsn_diff(%s, %s);", (end_lsn, start_lsn))
    return float(cur.fetchone()[0])


def get_bgwriter(cur) -> Tuple[int, int]:
    # PostgreSQL version compatibility:
    # - Older versions expose checkpoint counters in pg_stat_bgwriter.
    # - Newer versions (e.g., PG18) expose them in pg_stat_checkpointer.
    try:
        cur.execute("SELECT checkpoints_timed, checkpoints_req FROM pg_stat_bgwriter;")
        row = cur.fetchone()
        return int(row[0]), int(row[1])
    except psycopg.Error:
        cur.execute("SELECT num_timed, num_requested FROM pg_stat_checkpointer;")
        row = cur.fetchone()
        return int(row[0]), int(row[1])


def reset_bgwriter(cur):
    # PostgreSQL version compatibility:
    # - Older versions: bgwriter
    # - Newer versions: checkpointer
    try:
        cur.execute("SELECT pg_stat_reset_shared('bgwriter');")
    except psycopg.Error:
        cur.execute("SELECT pg_stat_reset_shared('checkpointer');")


def bulk_insert_100k(cur):
    cur.execute(
        """
        INSERT INTO orders (order_id, customer_id, order_date, status, total_amount, city, payment_type, created_at)
        SELECT
            (SELECT COALESCE(MAX(order_id), 0) FROM orders) + g,
            (random() * 100000)::BIGINT + 1,
            CURRENT_DATE - ((random() * 365)::INT),
            (ARRAY['pending','shipped','delivered','cancelled'])[1 + (random() * 3)::INT],
            ROUND((random() * 1000)::NUMERIC, 2),
            (ARRAY['Islamabad','Lahore','Karachi','Peshawar'])[1 + (random() * 3)::INT],
            (ARRAY['card','cash','wallet'])[1 + (random() * 2)::INT],
            NOW()
        FROM generate_series(1, 100000) AS g;
        """
    )


def run_part_b(cfg: DbConfig, output_dir: Path, wal_config_label: str):
    configs = [wal_config_label]
    rows = []

    with get_conn(cfg) as conn:
        with conn.cursor() as cur:
            for cfg_name in configs:
                # User must set config manually before each run and restart/reload Postgres.
                reset_bgwriter(cur)
                start_cp_timed, start_cp_req = get_bgwriter(cur)
                lsn_start = current_lsn(cur)
                t0 = time.perf_counter()
                bulk_insert_100k(cur)
                t1 = time.perf_counter()
                lsn_end = current_lsn(cur)
                end_cp_timed, end_cp_req = get_bgwriter(cur)

                elapsed = t1 - t0
                rows_per_sec = 100000 / elapsed if elapsed > 0 else 0
                wal_bytes = wal_diff(cur, lsn_start, lsn_end)

                rows.append(
                    {
                        "wal_config": cfg_name,
                        "insert_time_sec": round(elapsed, 3),
                        "rows_per_sec": round(rows_per_sec, 2),
                        "wal_bytes_generated": int(wal_bytes),
                        "checkpoints_timed_delta": end_cp_timed - start_cp_timed,
                        "checkpoints_req_delta": end_cp_req - start_cp_req,
                        "recovery_time_sec": -1,
                        "notes": "Set manually in postgresql.conf before run",
                    }
                )

    out_path = output_dir / "part_b_wal_configs.csv"
    if out_path.exists():
        old = pd.read_csv(out_path)
        new = pd.DataFrame(rows)
        merged = pd.concat([old, new], ignore_index=True)
        merged = merged.drop_duplicates(subset=["wal_config"], keep="last")
        merged.to_csv(out_path, index=False)
    else:
        write_csv(out_path, rows)


def setup_part_c_indexes(cur, level: str):
    drop_experiment_indexes(cur)
    if level == "minimal":
        return
    if level == "moderate":
        run_sql(cur, "CREATE INDEX idx_orders_status ON orders(status);")
        run_sql(cur, "CREATE INDEX idx_orders_customer_id ON orders(customer_id);")
        return
    if level == "heavy":
        run_sql(cur, "CREATE INDEX idx_orders_order_date ON orders(order_date);")
        run_sql(cur, "CREATE INDEX idx_orders_customer_order_date ON orders(customer_id, order_date);")
        run_sql(cur, "CREATE INDEX idx_orders_pending_order_date ON orders(order_date) WHERE status = 'pending';")
        run_sql(cur, "CREATE INDEX idx_orders_customer_covering ON orders(customer_id) INCLUDE(total_amount, status);")
        run_sql(cur, "CREATE INDEX idx_orders_status ON orders(status);")
        return
    raise ValueError(f"Unknown level: {level}")


def run_part_c(cfg: DbConfig, output_dir: Path):
    levels = ["minimal", "moderate", "heavy"]
    rows = []
    with get_conn(cfg) as conn:
        with conn.cursor() as cur:
            for level in levels:
                setup_part_c_indexes(cur, level)
                run_sql(cur, "ANALYZE orders;")
                lsn_start = current_lsn(cur)
                t0 = time.perf_counter()
                bulk_insert_100k(cur)
                t1 = time.perf_counter()
                lsn_end = current_lsn(cur)
                wal_bytes = wal_diff(cur, lsn_start, lsn_end)
                elapsed = t1 - t0

                rows.append(
                    {
                        "index_setup": level,
                        "index_count_proxy": {"minimal": 0, "moderate": 2, "heavy": 5}[level],
                        "insert_time_sec": round(elapsed, 3),
                        "rows_per_sec": round(100000 / elapsed, 2) if elapsed > 0 else 0,
                        "wal_bytes_generated": int(wal_bytes),
                        "recovery_time_sec": -1,
                        "notes": "Fill recovery_time_sec manually after crash-recovery test",
                    }
                )

    write_csv(output_dir / "part_c_index_vs_wal_recovery.csv", rows)


def write_csv(path: Path, rows: List[Dict]):
    path.parent.mkdir(parents=True, exist_ok=True)
    if not rows:
        return
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def main():
    parser = argparse.ArgumentParser(description="Run ADMS assignment benchmarks")
    parser.add_argument("--part", choices=["a", "b", "c", "all"], default="all")
    parser.add_argument("--output-dir", default="results")
    parser.add_argument(
        "--wal-config-label",
        default="default_baseline",
        help="Label written to Part B CSV for the currently active PostgreSQL WAL configuration",
    )
    args = parser.parse_args()

    output_dir = Path(args.output_dir)
    cfg = DbConfig.from_env()

    if args.part in ("a", "all"):
        run_part_a(cfg, output_dir)
        print("Part A completed.")
    if args.part in ("b", "all"):
        run_part_b(cfg, output_dir, args.wal_config_label)
        print("Part B completed.")
    if args.part in ("c", "all"):
        run_part_c(cfg, output_dir)
        print("Part C completed.")


if __name__ == "__main__":
    main()
