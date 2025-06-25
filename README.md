# AI_Resume_Analyzer

# 📝 AI Resume Analyzer

An AI-powered Resume Analyzer that extracts key information from resumes and provides structured insights to help job seekers or recruiters quickly assess resumes.

---

## 🚀 Features

- 📄 Upload resumes in text or PDF format  
- 🧠 AI-driven extraction of key sections:
  - Contact Information  
  - Education  
  - Skills  
  - Work Experience  
  - Projects  
  - Certifications  
  - Strengths & Weaknesses (Optional AI Suggestions)  
- 📦 Backend powered by **Spring Boot (Java)**  
- 🎨 Interactive Frontend with **React** and **Tailwind CSS**  
- 🔍 Collapsible, section-wise display of extracted information  
- 🌑 Sleek dark mode-inspired UI  
- 📂 No database required; uses browser storage for simplicity  

---

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS, React Markdown  
- **Backend:** Java, Spring Boot, PDF Parsing (e.g., Apache PDFBox)  
- **Others:** Axios for API calls, Lucide Icons for UI elements  

---

## 📁 Project Structure

```
resume-analyzer/
├── backend/           # Java Spring Boot API for processing resumes
├── frontend/          # React frontend with interactive UI
├── README.md
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/resume-analyzer.git
cd resume-analyzer
```

### 2️⃣ Backend Setup (Java Spring Boot)

```bash
cd backend
# Import into IntelliJ or run via terminal:
mvn clean install
mvn spring-boot:run
```

### 3️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

### 4️⃣ Open in Browser

Visit: [http://localhost:3000](http://localhost:3000)  
Ensure backend runs on port **8080** (or adjust as needed)

---

## 📷 Screenshots

> *Add screenshots of the app showing uploaded resume and extracted sections here*

---

## ✨ Future Improvements

- AI-enhanced feedback for resume improvement  
- Downloadable structured reports  
- Support for additional file formats (DOCX, etc.)  
- Authentication & multi-user support  
- Advanced keyword matching for job-specific analysis  

---

## 🤝 Contributing

Contributions, suggestions, and feature requests are welcome!  
Feel free to open issues or submit pull requests.

---

