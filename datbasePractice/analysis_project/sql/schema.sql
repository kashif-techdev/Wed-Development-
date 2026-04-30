-- Base schema for assignment experiments
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    order_date DATE NOT NULL,
    status TEXT NOT NULL,
    total_amount NUMERIC(12,2) NOT NULL,
    city TEXT,
    payment_type TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Optional synthetic data generator (comment out if using real dataset)
-- Generates 600,000 rows so WAL/recovery measurements remain meaningful.
INSERT INTO orders (order_id, customer_id, order_date, status, total_amount, city, payment_type, created_at)
SELECT
    g AS order_id,
    (random() * 100000)::BIGINT + 1 AS customer_id,
    DATE '2020-01-01' + ((random() * 2190)::INT) AS order_date,
    (ARRAY['pending','shipped','delivered','cancelled'])[1 + (random() * 3)::INT] AS status,
    ROUND((random() * 1000)::NUMERIC, 2) AS total_amount,
    (ARRAY['Islamabad','Lahore','Karachi','Peshawar'])[1 + (random() * 3)::INT] AS city,
    (ARRAY['card','cash','wallet'])[1 + (random() * 2)::INT] AS payment_type,
    NOW() - ((random() * 365)::INT || ' days')::INTERVAL AS created_at
FROM generate_series(1, 600000) AS g;

ANALYZE orders;
