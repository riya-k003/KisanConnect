# 🌾 KisanConnect

> Connecting farmers and people through real-world knowledge sharing 🌱

KisanConnect is a full-stack web platform where farmers share practical farming tips and users learn from them. It also has **KissanAI**, an AI farming assistant that answers in Hindi and English.

---

## 🎥 Demo

🚀 Live Demo: (https://kisan-connect-p8p7.vercel.app/)
📸 Screenshots: <img width="1316" height="602" alt="image" src="https://github.com/user-attachments/assets/bcf802a4-1050-485b-8ef9-4e9e0c0d83c0" />
<img width="1303" height="602" alt="image" src="https://github.com/user-attachments/assets/93619afb-5a32-47cc-945e-6c62ed42d8a1" />

<img width="1352" height="568" alt="image" src="https://github.com/user-attachments/assets/cb4e876b-b27a-44a2-a101-ac7dabdd276e" />
<img width="1365" height="560" alt="image" src="https://github.com/user-attachments/assets/7a7004a9-4d23-4c51-ac53-3ab7e35973a0" />



---

## ❓ Why KisanConnect?

Farmers have valuable practical knowledge, but there is no simple place to share it.

KisanConnect:

* Lets farmers share real experiences
* Lets users learn directly from farmers
* Builds a community-based learning space
* Gives AI-powered farming advice in Hindi and English

👉 Built to solve a real-world problem, not just as a demo project.

---

## ✨ Features

### 🔐 Authentication
* Signup with email OTP verification (6-digit OTP, single use, expires in 5 minutes) <!-- TODO: confirm INTERVAL in userController.js is 5, not 1 -->
* Login with JWT; unverified accounts cannot log in
* Role-based access (Farmer / User)
* OTP email delivery through Brevo (HTTP API)
* Re-signup with an unverified email updates the same user row (the `user_id` stays the same)

### 🌱 Tips Sharing
* Farmers post tips with an optional image (Cloudinary)
* Paginated feed with search
* Delete own tips

### 💬 Interaction
* Like / unlike with optimistic UI
* Comments with a live count

### 🤖 KissanAI (Hindi / English)
* Replies in a fixed JSON shape: `type` (question / advice / error), `reply`, `crop`
* Asks the crop name first instead of guessing
* Remembers the last 6 messages of the chat (history is kept in the frontend)
* Safety rules: no chemical names or doses, refers to KCC / KVK
* Text-to-speech for replies (Web Speech API)
* Model: `openai/gpt-oss-120b` via Groq

### 👨‍🌾 Profile Page
* Shows name, email and role
* Shows the tips posted by the logged-in farmer

### ⏱️ Identity & Time
* Farmer name with each tip
* "Time ago" display (2 min ago, 3 days ago)

---

## 🏗️ Architecture

```text
Frontend (React + Vite, Vercel)
        ⬇
Backend (Node.js / Express, Render)
        ⬇
 ├── MySQL (Aiven)
 ├── Groq API (KissanAI)
 ├── Brevo (OTP email)
 └── Cloudinary (tip images)
```

---

## 🧠 Tech Stack

**Frontend:** React.js, React Router, Tailwind CSS

**Backend:** Node.js, Express.js, Multer

**Database:** MySQL

**Authentication:** JWT, bcrypt, email OTP

**Services:** Groq API, Brevo, Cloudinary

**Hosting:** Vercel (frontend), Render (backend), Aiven (MySQL)

---

## 📦 API Overview

### Auth (`/api/users`)
* `POST /api/users/register`
* `POST /api/users/verify-otp`
* `POST /api/users/login`
* `GET  /api/users/profile` (JWT required, returns the user from the token)

### Tips
<!-- TODO: replace <tips-path> with the mount path from server.js (for example /tips or /api/tips) -->
* `POST   <tips-path>/` (farmer only, optional image)
* `GET    <tips-path>/` (all tips, paginated)
* `DELETE <tips-path>/:tip_id` (farmer only)
* `POST   <tips-path>/:tip_id/like`
<!-- TODO: add the route the Profile page uses to load the logged-in farmer's tips -->

### Comments
* `POST /tips/:tip_id/comments`
* `GET  /tips/:tip_id/comments`

### AI Assistant
* `POST /api/kisanai/ask`

---

## 🗄️ Database

* `users`: name, email, password (bcrypt hash), role, `is_verified`
* `otp_verifications`: `user_id` (foreign key), `otp_code`, `purpose`, `expires_at`, `is_used`, `created_at`
* `tips`, `likes`, `comments`

**Why a separate OTP table?** OTP is temporary, single-use data. `users` holds permanent data. Keeping them apart also allows replay protection (`is_used`) and reuse for password reset later (`purpose`).

---

## 🌟 What Makes It Stand Out?

* Full-stack app, deployed end to end on free tiers
* JWT auth with email OTP verification
* Optimistic UI for likes
* KissanAI with structured JSON output, chat history and safety rules
* API keys never exposed to the frontend
* Focus on a real agricultural problem

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/riya-k003/KisanConnect.git
cd KisanConnect
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

### 4. Create `Backend/.env`

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=kisanconnect
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_verified_sender_email
# Cloudinary keys (use the variable names from your config file)
```

> Brevo blocks requests from IP addresses that are not in its authorised list. Add your IP at `https://app.brevo.com/security/authorised_ips`, or the OTP email will fail with a 401.

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
│   │   └── kisanAi.controller.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── tipsRoutes.js
│   │   ├── commentsRoutes.js
│   │   └── kisanAI.route.js
│   ├── middleware/        # authmiddleware, rolemiddleware
│   ├── config/            # db, multer
│   ├── .env
│   └── server.js
│
└── Frontend/
    └── react_app/
        └── src/
            ├── services/  # api, authService, tipsService, kisanAI
            ├── pages/     # AuthPage, TipsPage, ProfilePage, AiPage
            ├── components/
            ├── hooks/
            ├── utils/
            ├── styles/
            ├── App.jsx
            └── main.jsx
```

---

## 🐞 Bugs I Faced and How I Fixed Them

* **OTP never expired (timezone mismatch):** JS calculated the expiry and MySQL used a different timezone. Fix: the expiry is now calculated in SQL with `DATE_ADD(NOW(), INTERVAL 5 MINUTE)`, so one clock is used everywhere.
* **Email failed only on Render:** Render's free tier blocks SMTP ports. Fix: moved from Nodemailer to Brevo's HTTP API (port 443).
* **OTP input backspace bug:** a controlled React input did not update state on backspace. Fix: update the state in the empty-value case too.
* **Re-signup deleted the user:** an unverified user's row was deleted and recreated, so `user_id` changed every time. Fix: the row is updated instead.
* **KissanAI made up a helpline number:** a prompt rule does not stop an LLM. Fix: numbers must come from code, not from the AI.

---

## ⚠️ Known Limitations

* No rate limit on OTP requests or on wrong OTP guesses
* OTP "used" and user "verified" are updated separately, not in one transaction
* A new OTP does not invalidate the older unused ones
* Login returns different messages for an unknown email and a wrong password
* Unverified accounts that are never completed are not cleaned up (no cron job yet)
* KissanAI history lives in the frontend and is lost on page refresh
* KissanAI history is validated in the backend, but the AI's `type` value is not yet checked against the allowed values

---

## 🚀 Planned Features

* 🌐 More languages (Bhojpuri, Punjabi, Marathi)
* 🎤 Voice-based tip posting
* 📚 Answers from verified sources (RAG) in KissanAI
* 🔒 OTP rate limiting and a cleanup job for unverified accounts
* 🛠️ Problem raise and resolution system

---

## 🧠 What I Learned

* Building REST APIs with Express
* JWT auth, bcrypt and OTP verification design
* React state management and controlled components
* Integrating third-party APIs securely
* Deploying on free tiers (Vercel, Render, Aiven) and debugging platform limits
* Thinking about how a flow can be abused, not only whether it works

---

## 👩‍💻 Author

Riya Kashyap

---

## 🌟 Final Note

KisanConnect bridges the gap between farmers and learners through a simple, practical platform, now with AI that speaks the farmer's language.
