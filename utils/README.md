# 📂 utils/ Folder  

The `utils/` folder contains all the **AI-related backend logic and API call implementations**.  
Each Python file here corresponds to a **specific AI feature** that powers the legal platform.  
These utilities are imported and used within `app.py` routes to keep logic modular, maintainable, and clean.  

---

## 🎯 Purpose  

- Encapsulate **AI-powered functions** (document scanning, deadline generation, fee negotiation, etc.).  
- Maintain a **separation of concerns** between frontend templates, routes (`app.py`), and AI logic.  
- Allow team members to easily update or extend AI features without breaking other modules.  

---

## 📁 File Overview  
utils/
│── chat_with_lawyer.py # AI-assisted fee negotiation & communication with lawyers
│── doc_scan.py # AI-powered document scanning & categorization
│── generate_deadlines.py # Auto-generates deadlines based on legal case type & procedure
│── generate_req_docs.py # Identifies and lists missing required documents for a case
│── query_analysis.py # AI-driven analysis of user queries & issue detection
│── README.md # This documentation file


---

## 🧩 Features by Module  

### 🔹 `chat_with_lawyer.py`  
- Helps users **negotiate fees with lawyers** fairly.  
- Calculates **percentage of work already completed** by the user.  
- Detects if conversation involves **fee discussions**.  
- Extracts mentioned fees from chat context (e.g., "$10,000", "10k USD").  
- Suggests **fair fee adjustments** proportional to completed preparation.  
- Generates structured **AI responses in JSON format** for transparency.  
- Provides fallback messages if API response fails.  

---

### 🔹 `doc_scan.py`  
- Scans uploaded legal documents.  
- Classifies document type (e.g., contracts, petitions, financials, evidence).  
- Checks against required documents for the user’s case type.  
- Returns missing/invalid document insights.  
- Integrates with the **RAG pipeline** for vector storage in `faiss_index/`.  

---

### 🔹 `generate_deadlines.py`  
- Automatically generates **case deadlines** based on:  
  - Court schedules  
  - Legal procedures  
  - Case type (immigration, civil, divorce, corporate, etc.)  
- Syncs deadlines with user’s **calendar (Google/Outlook)**.  
- Returns reminders and alerts for upcoming deadlines.  

---

### 🔹 `generate_req_docs.py`  
- AI-powered module that:  
  - Identifies **required documents** for a given case type.  
  - Cross-checks uploaded files.  
  - Flags missing documents or incomplete submissions.  
- Ensures **no critical documents are skipped** before filing.  

---

### 🔹 `query_analysis.py`  
- Analyzes **user’s challenge/case description**.  
- Detects the **specific legal issue** (e.g., immigration rejection, corporate compliance issue).  
- Connects to the **planned feature**:  
  - If user receives a **negative verdict**, AI finds another user with a **similar positive outcome**.  
  - Explains **why the positive outcome succeeded**.  
  - Ensures **privacy** by anonymizing names/identifiers before sharing.  
  - Supports compensation system when anonymized cases are downloaded.  

---


---

## 📌 Notes for Team Members  

- All modules rely on the **Google Gemini API (`genai`)**, with the API key stored in `.env`.  
- Keep **response structures JSON-compliant** wherever possible for easy parsing in `app.py`.  
- When extending, create **new Python files** here for specific AI functionalities instead of adding to existing files.  
- This modular approach ensures that each AI feature remains **independent and testable**.  

---

