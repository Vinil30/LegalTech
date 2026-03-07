# 📂 templates/ Folder  

The `templates/` folder contains all **HTML files** that define the user interface of the platform. These templates connect directly with the backend routes in `app.py` and provide the structure for how users, lawyers, and admins interact with the system.  

---

## 🎯 Purpose  

- Central hub for all **frontend pages**.  
- Each file corresponds to a **specific workflow** (user onboarding, case upload, lawyer dashboard, AI interactions, etc.).  
- Works in combination with:  
  - **`static/` folder** → CSS & JavaScript for styling and interactivity.  
  - **`utils/` folder** → AI-powered backend logic.  
  - **`app.py`** → Routing and functional integration.  

---

## 🧩 Core Features Represented in Templates  

1. **AI-Powered Document Scanning**  
   - Upload and scan documents.  
   - Detect missing files and highlight incomplete steps.  

2. **Deadline Tracking & Progress Management**  
   - Auto-generate deadlines based on case type.  
   - Sync with Google Calendar / Outlook.  
   - Show progress completion percentage.  

3. **Lawyer Connections & Fee Negotiation**  
   - Connect with specialized lawyers on demand.  
   - Automated negotiation of fees based on work already completed in the platform.  

4. **Case Outcome Intelligence (Planned Feature)**  
   - AI detects case issue type.  
   - If negative verdict → suggests similar positive outcome cases.  
   - Explains why the positive outcome succeeded.  
   - Ensures **privacy** by anonymizing identifiers.  
   - Supports **knowledge-sharing economy** where users earn compensation if their anonymized case file is downloaded by others.  

---

## 📁 File Overview  

templates/
│── chat_interface.html # Chat-based AI interaction page
│── dashboard.html # User dashboard (progress, deadlines, case overview)
│── documents.html # Upload/scan legal documents
│── findusers.html # Discover other users' shared anonymized files
│── index.html # Landing page
│── lawyer_dashboard.html # Dashboard for lawyers (cases, connected clients)
│── lawyer_login.html # Login page for lawyers
│── lawyer_signup.html # Signup page for lawyers
│── lawyer-page.html # Lawyer profile & details page
│── legal_aid.html # General legal aid/help information
│── login.html # User login page
│── signup.html # User signup page
│── upload_case_file.html # Upload case file for RAG pipeline
│── README.md # This documentation file


---

## 🔄 How Templates Fit in the Workflow  

1. **User Onboarding**  
   - `index.html` → Landing page.  
   - `signup.html` / `login.html` → User entry points.  

2. **Case Management**  
   - `dashboard.html` → Shows deadlines, progress percentage, AI suggestions.  
   - `documents.html` → Upload/scan required legal documents.  
   - `upload_case_file.html` → Submits user’s case for AI-powered analysis.  

3. **AI Interaction**  
   - `chat_interface.html` → Conversational AI support for legal queries.  
   - AI highlights missing documents, deadlines, and suggests improvements.  

4. **Lawyer Interaction**  
   - `lawyer_signup.html` & `lawyer_login.html` → Access for lawyers.  
   - `lawyer_dashboard.html` → Case monitoring and client management.  
   - `lawyer-page.html` → Profile and details of individual lawyers.  

5. **Knowledge Sharing & Community Support**  
   - `findusers.html` → Lets users explore anonymized case files shared by others.  
   - AI ensures privacy by changing identifiers.  
   - Paid downloads → compensation for original file owners.  

---

## 📌 Notes for Team Members  

- **Do not add inline CSS/JS** inside templates → keep styles in `static/`.  
- Maintain **consistent naming** when creating new templates to align with `app.py` routes.  
- If you add a new feature:  
  - Create an HTML file here.  
  - Add styling/scripts in `static/`.  
  - Connect it in `app.py` route.  

---

