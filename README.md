# 🏛️ SOVEN_LEGAL_PR  

This project is an **AI-powered legal assistance platform** that helps simplify legal processes. It integrates **Retrieval-Augmented Generation (RAG)** with **FAISS vector indexing** to analyze legal challenges, provide recommendations, and enable secure knowledge-sharing between users.  

The system not only suggests strategies for legal cases but also **compares outcomes** and allows users to **share anonymized case files** in a privacy-first manner.  

---

## 🎯 Core Idea  

1. **AI Case Understanding**  
   - Scans a user’s legal challenge.  
   - Detects the specific issue type.  

2. **Smart Recommendations**  
   - If a verdict is negative, the AI finds another user’s case with a positive outcome.  
   - Explains *why* the positive case succeeded.  

3. **Privacy & Sharing**  
   - AI anonymizes identifiers (names, IDs, addresses).  
   - Users can choose whether to keep their name visible or hidden.  
   - Other users may pay to download these anonymized files.  
   - When a file is shared with consent, the original user earns compensation.  

---

## 📂 Folder Overview  

The project is structured into 6 main folders, each with its own **README.md** explaining internal details.  

SOVEN_LEGAL_PR/
│── pycache/ # Auto-generated Python cache files
│── faiss_index/ # Stores FAISS vector embeddings for RAG
│── legal/ # Contains .md files of 20+ users (used as knowledge base)
│── soven_env/ # Virtual environment folder
│── static/ # JavaScript & CSS files for frontend
│── templates/ # HTML templates (frontend pages)
│── utils/ # Modularized Python classes for AI API calls
│
│── .env # Environment variables (keys, secrets, configs)
│── app.py # Main application file with all routes
│── demo.html # Simple demo frontend
│── demo.ipynb # Notebook for running RAG pipeline & FAISS indexing
│── README.md # This documentation file
│── requirements.txt # Python dependency list


---

## 🧩 Detailed Component Explanation  

### 1. `faiss_index/`  
- Contains **vector embeddings** created from the user `.md` files in `legal/`.  
- These embeddings power the **RAG pipeline**.  
- Built using code inside **`demo.ipynb`**.  

### 2. `legal/`  
- Contains 20+ `.md` files, each describing a different user’s case.  
- These files act as the **data source** for the RAG pipeline.  
- Text is vectorized and stored in `faiss_index/`.  

### 3. `soven_env/`  
- Virtual environment folder.  
- Keeps project dependencies isolated.  

### 4. `static/`  
- Contains **JavaScript** and **CSS** assets.  
- Supports the frontend design and interactivity.  

### 5. `templates/`  
- Contains all **HTML templates** for the application.  
- Defines the frontend structure and user flows.  

### 6. `utils/`  
- Contains **Python helper modules** organized into classes.  
- Manages AI-related logic and external API calls.  
- Keeps code modular and structured.  

---

## 🖥️ Main Application  

### `app.py`  
- The **central hub** of the project.  
- Contains **all application routes** to avoid confusion.  
- Routes handle:  
  - User interactions  
  - AI pipeline integration  
  - File sharing and anonymization  
  - Compensation tracking  

---

## 🔄 Workflow  

1. **Data Preparation**  
   - Case files (`legal/`) are ingested.  
   - Converted into vectors → stored in `faiss_index/`.  

2. **User Interaction**  
   - User submits a challenge via the frontend.  
   - AI scans and detects the issue.  

3. **RAG Search**  
   - FAISS retrieves most relevant similar cases.  
   - If a positive outcome case exists → explain reasons for success.  

4. **Knowledge Sharing Economy**  
   - Other users may download anonymized files.  
   - Download is paid.  
   - The original file owner earns compensation if their file is used.  

---

## 🧠 Demo & Testing  

- **`demo.ipynb`** → Used for building FAISS index and testing RAG pipeline.  
- **`demo.html`** → Simple frontend demo page to visualize AI interactions.  

---

## 📌 Notes for Team Members  

- Every folder has its own `README.md` with **specific instructions**.  
- Always check the **folder-level README** when working on that part of the system.  
- All routes live inside `app.py` → makes debugging and feature-tracking easier.  
- Privacy and compensation workflows are tightly coupled with AI anonymization logic inside `utils/`.  

---

## ✅ Summary  

This project:  
- Uses **RAG + FAISS** to analyze legal cases.  
- Suggests alternative outcomes based on historical cases.  
- Preserves **user privacy** while enabling **knowledge sharing**.  
- Provides a **compensation system** for file owners.  
- Has a clear, modular folder structure for maintainability.  
