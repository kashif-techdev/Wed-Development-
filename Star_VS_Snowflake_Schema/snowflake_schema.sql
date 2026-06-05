-- ============================================================
-- SNOWFLAKE SCHEMA: Retail Sales Data Warehouse (PostgreSQL)
-- Database: retail_snowflake_dw
-- Run in pgAdmin 4 Query Tool connected to retail_snowflake_dw
-- ============================================================

-- Clean re-run (drops all tables in dependency-safe order)
DROP TABLE IF EXISTS fact_sales     CASCADE;
DROP TABLE IF EXISTS dim_product    CASCADE;
DROP TABLE IF EXISTS dim_subcategory CASCADE;
DROP TABLE IF EXISTS dim_category   CASCADE;
DROP TABLE IF EXISTS dim_customer   CASCADE;
DROP TABLE IF EXISTS dim_store      CASCADE;
DROP TABLE IF EXISTS dim_city       CASCADE;
DROP TABLE IF EXISTS dim_state      CASCADE;
DROP TABLE IF EXISTS dim_country    CASCADE;
DROP TABLE IF EXISTS dim_date       CASCADE;

-- ---------- Product hierarchy (3 levels) ----------

CREATE TABLE dim_category (
    category_id   INTEGER      PRIMARY KEY,
    category_name VARCHAR(50)  NOT NULL UNIQUE
);

CREATE TABLE dim_subcategory (
    subcategory_id   INTEGER     PRIMARY KEY,
    subcategory_name VARCHAR(50) NOT NULL,
    category_id      INTEGER     NOT NULL,
    CONSTRAINT fk_subcategory_category
        FOREIGN KEY (category_id) REFERENCES dim_category(category_id)
);

CREATE TABLE dim_product (
    product_id     INTEGER        PRIMARY KEY,
    product_name   VARCHAR(100)   NOT NULL,
    unit_price     NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    subcategory_id INTEGER        NOT NULL,
    CONSTRAINT fk_product_subcategory
        FOREIGN KEY (subcategory_id) REFERENCES dim_subcategory(subcategory_id)
);

-- ---------- Geography hierarchy (3 levels) ----------

CREATE TABLE dim_country (
    country_id   INTEGER     PRIMARY KEY,
    country_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE dim_state (
    state_id   INTEGER     PRIMARY KEY,
    state_name VARCHAR(50) NOT NULL,
    country_id INTEGER     NOT NULL,
    CONSTRAINT fk_state_country
        FOREIGN KEY (country_id) REFERENCES dim_country(country_id)
);

CREATE TABLE dim_city (
    city_id   INTEGER     PRIMARY KEY,
    city_name VARCHAR(50) NOT NULL,
    state_id  INTEGER     NOT NULL,
    CONSTRAINT fk_city_state
        FOREIGN KEY (state_id) REFERENCES dim_state(state_id)
);

CREATE TABLE dim_customer (
    customer_id   INTEGER      PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    city_id       INTEGER      NOT NULL,
    CONSTRAINT fk_customer_city
        FOREIGN KEY (city_id) REFERENCES dim_city(city_id)
);

CREATE TABLE dim_store (
    store_id   INTEGER      PRIMARY KEY,
    store_name VARCHAR(100) NOT NULL,
    city_id    INTEGER      NOT NULL,
    CONSTRAINT fk_store_city
        FOREIGN KEY (city_id) REFERENCES dim_city(city_id)
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
-- DATA INSERTIONS
-- ============================================================

INSERT INTO dim_category (category_id, category_name) VALUES
(1, 'Electronics'),
(2, 'Clothing'),
(3, 'Groceries');

INSERT INTO dim_subcategory (subcategory_id, subcategory_name, category_id) VALUES
(1, 'Laptops',     1),
(2, 'Smartphones', 1),
(3, 'Mens Wear',   2),
(4, 'Womens Wear', 2),
(5, 'Beverages',   3),
(6, 'Snacks',      3);

INSERT INTO dim_product (product_id, product_name, unit_price, subcategory_id) VALUES
(1, 'Dell XPS 15',         1299.99, 1),
(2, 'MacBook Air M2',      1099.99, 1),
(3, 'iPhone 15',            999.99, 2),
(4, 'Samsung Galaxy S24',   899.99, 2),
(5, 'Mens Formal Shirt',     49.99, 3),
(6, 'Womens Summer Dress',   79.99, 4),
(7, 'Orange Juice 1L',        3.99, 5),
(8, 'Potato Chips 200g',      2.49, 6);

INSERT INTO dim_country (country_id, country_name) VALUES
(1, 'United States'),
(2, 'United Kingdom');

INSERT INTO dim_state (state_id, state_name, country_id) VALUES
(1, 'California', 1),
(2, 'New York',   1),
(3, 'England',    2);

INSERT INTO dim_city (city_id, city_name, state_id) VALUES
(1, 'Los Angeles',   1),
(2, 'New York City', 2),
(3, 'London',        3);

INSERT INTO dim_customer (customer_id, customer_name, city_id) VALUES
(1, 'Alice Johnson',  1),
(2, 'Bob Smith',      2),
(3, 'Carol Williams', 3),
(4, 'David Brown',    1);

INSERT INTO dim_store (store_id, store_name, city_id) VALUES
(1, 'LA Downtown Store',   1),
(2, 'NYC Fifth Ave Store', 2),
(3, 'London Oxford Store', 3);

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

-- Q1: Sales by category (requires 3 dimension joins)
SELECT
    c.category_name,
    SUM(f.total_amount) AS total_sales,
    SUM(f.quantity)     AS total_units
FROM fact_sales f
JOIN dim_product p      ON f.product_id = p.product_id
JOIN dim_subcategory sc ON p.subcategory_id = sc.subcategory_id
JOIN dim_category c     ON sc.category_id = c.category_id
GROUP BY c.category_name
ORDER BY total_sales DESC;

-- Q2: Sales by country (requires 4 dimension joins)
SELECT
    co.country_name,
    SUM(f.total_amount) AS total_sales
FROM fact_sales f
JOIN dim_store s    ON f.store_id = s.store_id
JOIN dim_city ci    ON s.city_id = ci.city_id
JOIN dim_state st   ON ci.state_id = st.state_id
JOIN dim_country co ON st.country_id = co.country_id
GROUP BY co.country_name
ORDER BY total_sales DESC;

-- Q3: Row counts for all tables
SELECT 'dim_category'    AS table_name, COUNT(*) AS row_count FROM dim_category
UNION ALL SELECT 'dim_subcategory', COUNT(*) FROM dim_subcategory
UNION ALL SELECT 'dim_product',     COUNT(*) FROM dim_product
UNION ALL SELECT 'dim_country',     COUNT(*) FROM dim_country
UNION ALL SELECT 'dim_state',       COUNT(*) FROM dim_state
UNION ALL SELECT 'dim_city',        COUNT(*) FROM dim_city
UNION ALL SELECT 'dim_customer',    COUNT(*) FROM dim_customer
UNION ALL SELECT 'dim_store',       COUNT(*) FROM dim_store
UNION ALL SELECT 'dim_date',        COUNT(*) FROM dim_date
UNION ALL SELECT 'fact_sales',      COUNT(*) FROM fact_sales
ORDER BY table_name;
