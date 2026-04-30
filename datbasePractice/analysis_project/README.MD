# 🚀 PostgreSQL Indexing vs WAL Trade-off Analysis

> A performance engineering study on the relationship between **index design**, **Write-Ahead Logging (WAL)**, and **database throughput** in PostgreSQL.

---

## 📌 Overview

This project investigates a critical database systems trade-off:

> ⚖️ **Faster reads vs slower writes**

- Indexes improve query performance  
- But increase **write cost** and **WAL overhead**  

The goal is to **quantify this trade-off** and derive **practical optimization strategies** for real-world systems.

---

## 🧪 Experiment Design

The study is divided into **three major parts**:

### 🔹 Part A — Index Design
Compare **5 indexing strategies**:
- Single-column  
- Composite  
- Partial  
- Covering (`INCLUDE`)  
- Baseline (no additional index)

---

### 🔹 Part B — WAL Configuration
Evaluate **5 WAL settings**:
- `fsync_off`
- `wal_buffers_64mb`
- `slow_checkpoints`
- `synchronous_commit_off`
- Default baseline

---

### 🔹 Part C — Index Count Impact
Analyze effect of:
- Minimal indexing  
- Moderate indexing  
- Heavy indexing  

---

## 🛠️ Tech Stack

- 🗄️ PostgreSQL 18  
- 🐍 Python (`psycopg`, `pandas`, `matplotlib`)  
- 💻 Windows 10  

---

## 📊 Key Findings

### ⚡ Read Performance (Part A)

- Composite index → **~1191× faster**
- Covering index → best for aggregation queries
- Partial index → **smallest & fastest to build**

> ❗ Not all indexes are useful — planner may ignore them.

---

### 💾 WAL & Throughput (Part B)

| Config | Throughput Gain | WAL Reduction |
|--------|---------------|--------------|
| fsync_off | +73.5% | -29.7% |
| wal_buffers_64mb | +18.9% | -31.0% |
| slow_checkpoints | 🚀 **+90.9%** | **-31.0%** |
| synchronous_commit_off | +20.9% | -30.7% |

> ⚠️ Unsafe configs improve speed but reduce durability.

---

### 📉 Index Count Impact (Part C)

| Setup | WAL Increase | Throughput Drop |
|------|-------------|----------------|
| Moderate | +74.5% | -60.4% |
| Heavy | 🚨 **+183.7%** | **-77.5%** |

> 📌 More indexes = more WAL + slower writes

---

## 🧠 Key Insights

- 🎯 Indexes must be **query-driven**, not column-driven  
- ⚡ Targeted indexes → massive performance gains  
- 🧱 Excessive indexing → severe write penalties  
- 🔧 WAL tuning can improve performance, but:
  - Never compromise durability in production  

---

## 🧩 Advanced Concept

### 🔸 HOT (Heap-Only Tuple)

- Reduces index updates during writes  
- Minimizes WAL generation  
- Works when:
  - Updated columns are **not indexed**
  - Tuple stays on same page  

> 💡 Designing for HOT = smarter write optimization

---

## 📌 Practical Recommendations

- ✅ Use **partial indexes** for selective queries  
- ✅ Use **covering indexes** only when necessary  
- ❌ Avoid over-indexing  
- 🔍 Regularly audit unused indexes  
- 🛡️ Keep `fsync=on` in production  
- 📈 Benchmark before tuning WAL settings  

---

## ⚠️ Limitations

- ⏳ Recovery-time analysis not fully completed  
- 🖥️ Tested on single environment (Windows + PostgreSQL 18)  
- 📦 Single dataset (`orders` table)

---

## 🏁 Conclusion

This study confirms a fundamental trade-off in database systems:

> 💡 **You cannot optimize reads without impacting writes.**

- Indexes → 🚀 faster queries  
- But → 📉 slower inserts + more WAL  

### ✅ Best Strategy:
1. Start with minimal indexing  
2. Add only **high-impact indexes**  
3. Tune WAL **carefully and safely**  

---
