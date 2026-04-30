-- Crash simulation helper SQL

-- 1) Start an uncommitted long transaction (run in Session A)
BEGIN;
INSERT INTO orders (order_id, customer_id, order_date, status, total_amount, city, payment_type, created_at)
SELECT
    900000000 + g,
    (random() * 100000)::BIGINT + 1,
    CURRENT_DATE,
    'pending',
    ROUND((random() * 1000)::NUMERIC, 2),
    'Islamabad',
    'card',
    NOW()
FROM generate_series(1, 10000) AS g;
-- Do NOT COMMIT.

-- 2) In Session B, find Session A PID
SELECT pid, usename, state, query
FROM pg_stat_activity
WHERE state IN ('active', 'idle in transaction')
ORDER BY pid;

-- 3) Terminate backend (simulated abrupt failure for that backend)
-- SELECT pg_terminate_backend(<pid>);

-- 4) After restart/reconnect, validate rollback
SELECT COUNT(*) AS should_be_zero
FROM orders
WHERE order_id BETWEEN 900000001 AND 900010000;
