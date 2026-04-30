-- Drop all experiment indexes
DROP INDEX IF EXISTS idx_orders_order_date;
DROP INDEX IF EXISTS idx_orders_customer_order_date;
DROP INDEX IF EXISTS idx_orders_pending_order_date;
DROP INDEX IF EXISTS idx_orders_customer_covering;
DROP INDEX IF EXISTS idx_orders_status;
DROP INDEX IF EXISTS idx_orders_customer_id;

-- Strategy 1: no index baseline
-- Keep table with only primary key (order_id).

-- Strategy 2: single-column index
CREATE INDEX idx_orders_order_date ON orders(order_date);

-- Strategy 3: composite index
CREATE INDEX idx_orders_customer_order_date ON orders(customer_id, order_date);

-- Strategy 4: partial index
CREATE INDEX idx_orders_pending_order_date
ON orders(order_date)
WHERE status = 'pending';

-- Strategy 5: covering index
CREATE INDEX idx_orders_customer_covering
ON orders(customer_id)
INCLUDE(total_amount, status);

-- Part C moderate setup (2 indexes)
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
