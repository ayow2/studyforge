## 📄 `README.md` – Full Content

# StudyForge

_A college-level AI-generated productivity app designed to track assignments, grades, and gamify academic success._

---

## 📌 Project Overview

**StudyForge** is an intelligent academic dashboard that helps students stay organized and motivated. It enables students to track assignments, input grades, monitor streaks, and earn scores based on academic performance and punctuality — all in a clean, responsive UI.

---

## 🔧 Features

- ✅ User Registration & Authentication (secured data per student)
- ✅ Assignment input & tracking (title, due date, completion)
- ✅ Toggle completion with point rewards (based on timing)
- ✅ Manual grade entry for each assignment
- ✅ Dynamic grade average calculation
- ✅ Score and daily streak tracking
- ✅ Styled dashboard using Tailwind CSS

---

## ⚙️ System Architecture

![System Diagram](studyforge_architecture.png)

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | React, Vite, Tailwind CSS     |
| Backend   | Node.js, Express              |
| Database  | SQLite (per-user data)        |
| Auth      | Basic session/token logic (local) |

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js v18+
- npm or yarn

### 📦 Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
````

### ▶️ Run Locally

```bash
# In one terminal (backend)
cd backend
npm run dev

# In another terminal (frontend)
cd frontend
npm run dev
```

Frontend will be at `http://localhost:5173`, backend at `http://localhost:3001`.

---

## 📂 Folder Structure

studyforge/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── utils/
│   │   └── app.js
│   └── db/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
└── README.md

---

## 🛡 License

This project is open for educational use.

---

> Made with 🧠 by AI, deployed by students.

```

---

Would you like this in a downloadable `.md` file, or pushed directly into your repo structure?
```
