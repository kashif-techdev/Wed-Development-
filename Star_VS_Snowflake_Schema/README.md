# Database Lab: Star Schema vs Snowflake Schema

**DBMS:** PostgreSQL (pgAdmin 4)

## Quick Start in pgAdmin 4

| Step | Action | File |
|------|--------|------|
| 1 | Connect to `postgres` database → Query Tool → Execute | `setup_databases.sql` |
| 2 | Connect to `retail_snowflake_dw` → Query Tool → Execute | `snowflake_schema.sql` |
| 3 | Connect to `retail_star_dw` → Query Tool → Execute | `star_schema.sql` |

## Lab Report

Submit **`FINAL_REPORT.md`** — it contains the full comparison, ERDs, implementation details, expected query results, and pgAdmin instructions.

## Files

| File | Description |
|------|-------------|
| `FINAL_REPORT.md` | Complete lab report (main submission document) |
| `setup_databases.sql` | Creates `retail_snowflake_dw` and `retail_star_dw` |
| `snowflake_schema.sql` | Snowflake schema — 10 tables + sample data |
| `star_schema.sql` | Star schema — 5 tables + sample data |

## Databases Created

- `retail_snowflake_dw` — normalized snowflake schema (10 tables)
- `retail_star_dw` — denormalized star schema (5 tables)

Both contain identical sales data (10 transactions, total $6,856.82) for fair comparison.
