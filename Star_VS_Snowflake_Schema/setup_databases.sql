-- ============================================================
-- STEP 0: Run this script in pgAdmin 4
-- Connect to the default "postgres" database, then execute.
-- ============================================================

-- Terminate existing connections (required before DROP DATABASE)
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname IN ('retail_snowflake_dw', 'retail_star_dw')
  AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS retail_snowflake_dw;
DROP DATABASE IF EXISTS retail_star_dw;

CREATE DATABASE retail_snowflake_dw
    WITH ENCODING = 'UTF8';

CREATE DATABASE retail_star_dw
    WITH ENCODING = 'UTF8';

-- Next steps:
-- 1. Open Query Tool on database "retail_snowflake_dw" → run snowflake_schema.sql
-- 2. Open Query Tool on database "retail_star_dw"       → run star_schema.sql
