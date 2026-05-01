# 🌾 KisanConnect

> Connecting farmers and people through real-world knowledge sharing 🌱

KisanConnect is a full-stack web platform where farmers can share practical farming tips and users can learn, interact, and grow together through a simple and community-driven interface.

---

## 🎥 Demo

🚀 Live Demo: (add later)
📸 Screenshots: (add later)

---

## ❓ Why KisanConnect?

Farmers often have valuable practical knowledge, but there is no simple platform to share it with others.

KisanConnect solves this by:

* Enabling farmers to share real experiences
* Allowing users to learn directly from farmers
* Creating a community-based learning environment

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

### 👨‍🌾 Identity & Time

* Displays farmer name with each tip
* Shows “time ago” (e.g., 2 min ago, 3 days ago)

### 📄 Profile Page

* View user details (name, email, role)

---

## 🏗️ Architecture

Frontend (React)
⬇
Backend (Node.js / Express)
⬇
Database (MySQL)

---

## 🧠 Tech Stack

**Frontend:**

* React.js
* CSS / Tailwind

**Backend:**

* Node.js
* Express.js

**Database:**

* MySQL

**Authentication:**

* JWT
* bcrypt

---

## 📦 API Overview

### Auth

* `POST /signup`
* `POST /login`

### Tips

* `POST /tips`
* `GET /tips`
* `DELETE /tips/:id`

### Likes

* `POST /tips/:id/like`

### Comments

* `POST /comments`
* `GET /comments/:tip_id`

---

## 🌟 What Makes It Stand Out?

* Full-stack implementation with authentication
* Real-time interaction (likes & comments)
* Clean and scalable architecture
* Focus on real-world agricultural problems

---

## 🚀 Planned Features

* 🎤 Voice-based tip posting
* 🔊 Text-to-speech for tips
* 🤖 AI-powered farming assistant
* 🛠️ Problem raise & resolution system
* 🌐 Multi-language support
* 📑 Government schemes guidance

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kisanconnect.git
cd kisanconnect
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=kisanconnect
JWT_SECRET=your_secret_key
```

### 4. Run backend

```bash
npm start
```

### 5. Run frontend

```bash
npm run dev
```

---

## 🧠 What I Learned

* Building REST APIs with Express
* JWT authentication and security
* React state management
* Handling real-world UI problems
* Full-stack integration

---

## 👩‍💻 Author

Riya Kashyap

---

## 🌟 Final Note

KisanConnect is focused on bridging the gap between farmers and learners by creating a simple, scalable, and impactful platform.

