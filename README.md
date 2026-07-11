# 🌾 KisanConnect

> Connecting farmers and people through real-world knowledge sharing 🌱

KisanConnect is a full-stack web platform where farmers can share practical farming tips and users can learn, interact, and grow together — now powered by an AI farming assistant that answers questions in Hindi and English.

---

## 🎥 Demo

🚀 Live Demo: 
📸 Screenshots: 

---

## ❓ Why KisanConnect?

Farmers often have valuable practical knowledge, but there is no simple platform to share it with others.

KisanConnect solves this by:

* Enabling farmers to share real experiences
* Allowing users to learn directly from farmers
* Creating a community-based learning environment
* Providing AI-powered farming advice in Hindi and English

👉 Built to solve a real-world problem, not just as a demo project.

---

## ✨ Features

### 🔐 Authentication
* Secure Login & Signup (JWT-based)
* Role-based access (Farmer / User)

### 🌱 Tips Sharing
* Farmers can post tips
* View all tips with pagination
* Delete own tips

### 💬 Interaction
* Like / Unlike tips
* Comment on tips
* Separate comment input per tip

### 🤖 AI Farming Assistant ← NEW
* Ask farming questions in Hindi or English
* Get instant advice on crops, pests, fertilizers, irrigation
* Government schemes guidance
* Powered by Groq (Llama 3.3 70B) — free and fast

### 👨‍🌾 Identity & Time
* Displays farmer name with each tip
* Shows "time ago" (e.g., 2 min ago, 3 days ago)

### 📄 Profile Page
* View user details (name, email, role)

---

## 🏗️ Architecture

Frontend (React)
⬇
Backend (Node.js / Express)
⬇
Groq API (AI Assistant)
⬇
Database (MySQL)

---

## 🧠 Tech Stack

**Frontend:**
* React.js
* React Router
* CSS / Tailwind

**Backend:**
* Node.js
* Express.js

**Database:**
* MySQL

**Authentication:**
* JWT
* bcrypt

**AI:**
* Groq API
* Llama 3.3 70B model

---

## 📦 API Overview

### Auth
* `POST /api/users/signup`
* `POST /api/users/login`

### Tips
* `POST /tips`
* `GET /tips`
* `DELETE /tips/:id`

### Likes
* `POST /tips/:id/like`

### Comments
* `POST /tips/:tip_id/comments`
* `GET /tips/:tip_id/comments`

### AI Assistant ← NEW
* `POST /api/kisanai/ask`

---

## 🌟 What Makes It Stand Out?

* Full-stack implementation with JWT authentication
* Real-time interaction (likes & comments)
* AI-powered farming assistant in Hindi & English
* Secure API key handling — Groq key never exposed to frontend
* Clean and scalable architecture
* Focus on real-world agricultural problems

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kisanconnect.git
cd kisanconnect
```

### 2. Install Backend dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend dependencies

```bash
cd Frontend/react_app
npm install
```

### 4. Create `Backend/.env` file

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=kisanconnect
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
```

### 5. Run Backend

```bash
cd Backend
node server.js
```

### 6. Run Frontend

```bash
cd Frontend/react_app
npm run dev
```

---

## 📁 Project Structure

```text
KisanConnect/
├── Backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── tipsController.js
│   │   ├── commentsController.js
│   │   └── kisanAI.controller.js      # AI Assistant Controller
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── tipsRoutes.js
│   │   ├── commentsRoutes.js
│   │   └── kisanAI.route.js           # AI Assistant Routes
│   │
│   ├── middleware/
│   ├── config/
│   ├── .env
│   └── server.js
│
└── Frontend/
    └── react_app/
        └── src/
            ├── services/
            │   ├── api.js
            │   ├── authService.js
            │   ├── tipsService.js
            │   └── kisanAI.js         # AI Assistant API Service
            │
            ├── pages/
            │   ├── AuthPage.jsx
            │   ├── TipsPage.jsx
            │   └── AiPage.jsx         # AI Assistant Page
            │
            ├── components/
            │   ├── auth/
            │   ├── tips/
            │   ├── common/
            │   └── KisanChat.jsx      # Chatbot UI Component
            │
            ├── hooks/
            ├── utils/
            ├── styles/
            ├── App.jsx
            └── main.jsx
```
---

## 🚀 Planned Features

* 🌐 Multi-language support (Bhojpuri, Punjabi, Marathi)
* 📸 Image upload in tips
* 🎤 Voice-based tip posting
* 🔊 Text-to-speech for tips
* 🛠️ Problem raise & resolution system

---

## 🧠 What I Learned

* Building REST APIs with Express
* JWT authentication and security
* React state management and component design
* Integrating third-party AI APIs securely
* Handling real-world UI problems
* Full-stack integration end to end
* Debugging frontend-backend connection issues

---

## 👩‍💻 Author

Riya Kashyap

---

## 🌟 Final Note

KisanConnect bridges the gap between farmers and learners through a simple, scalable, and impactful platform — now with AI that speaks the farmer's language.

## Deployment