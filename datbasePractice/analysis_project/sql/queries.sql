-- Six realistic query types for Part A

-- Q1: Point lookup
SELECT * FROM orders WHERE order_id = 250000;

-- Q2: Single-column filter
SELECT COUNT(*) FROM orders WHERE order_date BETWEEN DATE '2023-01-01' AND DATE '2023-12-31';

-- Q3: Multi-condition filter
SELECT * FROM orders
WHERE customer_id = 900
  AND order_date >= DATE '2024-01-01';

-- Q4: Partial-index-friendly query
SELECT order_id, customer_id, order_date
FROM orders
WHERE status = 'pending'
  AND order_date >= DATE '2024-01-01';

-- Q5: Covering-index-friendly aggregation
SELECT customer_id, SUM(total_amount) AS total_spend
FROM orders
WHERE customer_id BETWEEN 1000 AND 5000
GROUP BY customer_id;

-- Q6: Group-by on categorical
SELECT status, COUNT(*) AS cnt
FROM orders
GROUP BY status;
