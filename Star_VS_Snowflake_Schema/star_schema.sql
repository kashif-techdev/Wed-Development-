-- ============================================================
-- STAR SCHEMA: Retail Sales Data Warehouse (PostgreSQL)
-- Database: retail_star_dw
-- Run in pgAdmin 4 Query Tool connected to retail_star_dw
-- ============================================================

-- Clean re-run (drops all tables in dependency-safe order)
DROP TABLE IF EXISTS fact_sales  CASCADE;
DROP TABLE IF EXISTS dim_product CASCADE;
DROP TABLE IF EXISTS dim_customer CASCADE;
DROP TABLE IF EXISTS dim_store   CASCADE;
DROP TABLE IF EXISTS dim_date    CASCADE;

-- ---------- Denormalized product dimension ----------

CREATE TABLE dim_product (
    product_id       INTEGER        PRIMARY KEY,
    product_name     VARCHAR(100)   NOT NULL,
    subcategory_name VARCHAR(50)    NOT NULL,
    category_name    VARCHAR(50)    NOT NULL,
    unit_price       NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0)
);

-- ---------- Denormalized customer dimension ----------

CREATE TABLE dim_customer (
    customer_id   INTEGER      PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    city_name     VARCHAR(50)  NOT NULL,
    state_name    VARCHAR(50)  NOT NULL,
    country_name  VARCHAR(50)  NOT NULL
);

-- ---------- Denormalized store dimension ----------

CREATE TABLE dim_store (
    store_id     INTEGER      PRIMARY KEY,
    store_name   VARCHAR(100) NOT NULL,
    city_name    VARCHAR(50)  NOT NULL,
    state_name   VARCHAR(50)  NOT NULL,
    country_name VARCHAR(50)  NOT NULL
);

-- ---------- Time dimension ----------

CREATE TABLE dim_date (
    date_id   INTEGER PRIMARY KEY,
    full_date DATE    NOT NULL UNIQUE,
    day_num   INTEGER NOT NULL CHECK (day_num BETWEEN 1 AND 31),
    month_num INTEGER NOT NULL CHECK (month_num BETWEEN 1 AND 12),
    quarter   INTEGER NOT NULL CHECK (quarter BETWEEN 1 AND 4),
    year_num  INTEGER NOT NULL
);

-- ---------- Fact table ----------

CREATE TABLE fact_sales (
    sale_id      INTEGER        PRIMARY KEY,
    product_id   INTEGER        NOT NULL,
    customer_id  INTEGER        NOT NULL,
    store_id     INTEGER        NOT NULL,
    date_id      INTEGER        NOT NULL,
    quantity     INTEGER        NOT NULL CHECK (quantity > 0),
    total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
    CONSTRAINT fk_sales_product
        FOREIGN KEY (product_id)  REFERENCES dim_product(product_id),
    CONSTRAINT fk_sales_customer
        FOREIGN KEY (customer_id) REFERENCES dim_customer(customer_id),
    CONSTRAINT fk_sales_store
        FOREIGN KEY (store_id)    REFERENCES dim_store(store_id),
    CONSTRAINT fk_sales_date
        FOREIGN KEY (date_id)     REFERENCES dim_date(date_id)
);

-- ============================================================
-- DATA INSERTIONS (equivalent data to snowflake schema)
-- ============================================================

INSERT INTO dim_product (product_id, product_name, subcategory_name, category_name, unit_price) VALUES
(1, 'Dell XPS 15',         'Laptops',     'Electronics', 1299.99),
(2, 'MacBook Air M2',      'Laptops',     'Electronics', 1099.99),
(3, 'iPhone 15',            'Smartphones', 'Electronics',  999.99),
(4, 'Samsung Galaxy S24',   'Smartphones', 'Electronics',  899.99),
(5, 'Mens Formal Shirt',     'Mens Wear',   'Clothing',      49.99),
(6, 'Womens Summer Dress',   'Womens Wear', 'Clothing',      79.99),
(7, 'Orange Juice 1L',       'Beverages',   'Groceries',      3.99),
(8, 'Potato Chips 200g',     'Snacks',      'Groceries',      2.49);

INSERT INTO dim_customer (customer_id, customer_name, city_name, state_name, country_name) VALUES
(1, 'Alice Johnson',  'Los Angeles',   'California', 'United States'),
(2, 'Bob Smith',      'New York City', 'New York',   'United States'),
(3, 'Carol Williams', 'London',        'England',    'United Kingdom'),
(4, 'David Brown',    'Los Angeles',   'California', 'United States');

INSERT INTO dim_store (store_id, store_name, city_name, state_name, country_name) VALUES
(1, 'LA Downtown Store',   'Los Angeles',   'California', 'United States'),
(2, 'NYC Fifth Ave Store', 'New York City', 'New York',   'United States'),
(3, 'London Oxford Store', 'London',        'England',    'United Kingdom');

INSERT INTO dim_date (date_id, full_date, day_num, month_num, quarter, year_num) VALUES
(20240115, '2024-01-15', 15, 1, 1, 2024),
(20240120, '2024-01-20', 20, 1, 1, 2024),
(20240210, '2024-02-10', 10, 2, 1, 2024),
(20240305, '2024-03-05',  5, 3, 1, 2024),
(20240412, '2024-04-12', 12, 4, 2, 2024);

INSERT INTO fact_sales (sale_id, product_id, customer_id, store_id, date_id, quantity, total_amount) VALUES
(1,  1, 1, 1, 20240115, 1, 1299.99),
(2,  3, 2, 2, 20240115, 1,  999.99),
(3,  5, 4, 1, 20240120, 2,   99.98),
(4,  7, 1, 1, 20240210, 5,   19.95),
(5,  2, 3, 3, 20240210, 1, 1099.99),
(6,  6, 3, 3, 20240305, 1,   79.99),
(7,  4, 2, 2, 20240305, 1,  899.99),
(8,  8, 4, 1, 20240412, 3,    7.47),
(9,  1, 2, 2, 20240412, 1, 1299.99),
(10, 5, 1, 1, 20240412, 1,   49.99);

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

-- Q1: Sales by category (single join to dim_product)
SELECT
    p.category_name,
    SUM(f.total_amount) AS total_sales,
    SUM(f.quantity)     AS total_units
FROM fact_sales f
JOIN dim_product p ON f.product_id = p.product_id
GROUP BY p.category_name
ORDER BY total_sales DESC;

-- Q2: Sales by country (single join to dim_store)
SELECT
    s.country_name,
    SUM(f.total_amount) AS total_sales
FROM fact_sales f
JOIN dim_store s ON f.store_id = s.store_id
GROUP BY s.country_name
ORDER BY total_sales DESC;

-- Q3: Row counts for all tables
SELECT 'dim_product'  AS table_name, COUNT(*) AS row_count FROM dim_product
UNION ALL SELECT 'dim_customer', COUNT(*) FROM dim_customer
UNION ALL SELECT 'dim_store',    COUNT(*) FROM dim_store
UNION ALL SELECT 'dim_date',     COUNT(*) FROM dim_date
UNION ALL SELECT 'fact_sales',   COUNT(*) FROM fact_sales
ORDER BY table_name;
