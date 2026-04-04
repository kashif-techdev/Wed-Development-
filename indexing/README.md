# 📚 Database Indexing

Welcome to the **Indexing in Databases** repository 🚀  
This repository contains all the important concepts, explanations, and examples related to **database indexing**.

---

## 🔹 📌 What is Indexing?

Indexing is a technique used in databases to **improve the speed of data retrieval**.

👉 It works like an index in a book:
- Instead of scanning the whole table  
- The database jumps directly to the required data  

---

## 🔹 🎯 Objectives

- Understand how indexing improves performance  
- Learn different types of indexes  
- Explore indexing techniques used in real databases  
- Practice concepts for exams and real-world applications  

---

## 🔹 🧠 Topics Covered

## ALL about Hard disk
- How hardisk look like 
- how it stores the records 
- how read write operation occur
- block concepts etc

### 1️⃣ Basics of Indexing
- What is indexing?
- Why we use indexing
- Advantages & disadvantages

---

### 2️⃣ Types of Indexes
- Primary Index  
- Secondary Index  
- Clustered Index  
- Non-Clustered Index  
- Composite Index  
- Unique Index  

---

### 3️⃣ Indexing Techniques
- Ordered Indexing  
- Hash Indexing  

---

### 4️⃣ Dense vs Sparse Index
- Dense Index  
- Sparse Index  

---

### 5️⃣ Multi-Level Indexing
- Concept of indexing on index  
- Performance improvement  

---

### 6️⃣ Tree-Based Indexing 🌳
- B-Tree  
- B+ Tree (Most Important)  

---

### 7️⃣ Hashing Techniques
- Static Hashing  
- Dynamic Hashing  
  - Extendible Hashing  
  - Linear Hashing  

---

### 8️⃣ Advanced Indexing
- Covering Index  
- Bitmap Index  
- Full-Text Index  

---

### 9️⃣ Index Operations
- Searching  
- Insertion  
- Deletion  
- Updating  

---

## 🔹 ⚡ Advantages of Indexing

✅ Faster data retrieval  
✅ Efficient query execution  
✅ Improved database performance  

---

## 🔹 ⚠️ Disadvantages

❌ Extra storage required  
❌ Slower insert/update/delete operations  
❌ Maintenance overhead  

---

## 🔹 🔥 Most Important Topics

- B+ Tree Index ⭐⭐⭐  
- Primary vs Secondary Index ⭐⭐⭐  
- Dense vs Sparse Index ⭐⭐⭐  
- Clustered vs Non-Clustered Index ⭐⭐⭐  
- Hashing ⭐⭐  

---

## 🔹 📖 Example Use Case

Without Index:
```sql
SELECT * FROM Students WHERE StudentID = 10;