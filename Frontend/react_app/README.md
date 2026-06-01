# KissanConnect 🌾

## Project Structure

```
src/
├── services/
│   ├── api.js
│   ├── authService.js
│   └── tipsService.js
│
├── pages/
│   ├── AuthPage.jsx
│   └── TipsPage.jsx
│
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   └── SignupForm.jsx
│   ├── tips/
│   │   ├── TipCard.jsx
│   │   ├── TipForm.jsx
│   │   └── CommentSection.jsx
│   └── common/
│       └── ProtectedRoute.jsx
│
├── hooks/
│   └── useTips.js
│
├── utils/
│   └── timeAgo.js
│
├── styles/
│   ├── tips.module.css
│   ├── app.css
│   └── index.css
│
├── App.jsx
└── main.jsx
```

## Folder Breakdown

| Folder | Purpose |
|---|---|
| `services/` | All API calls — fetch logic lives here, not in components |
| `pages/` | Route level screens — AuthPage, TipsPage |
| `components/` | Reusable UI pieces broken by feature |
| `hooks/` | Custom hooks — business logic separated from UI |
| `utils/` | Small helper functions like `timeAgo` |
| `styles/` | All CSS and module files |

## Getting Started

### Prerequisites
- Node.js
- MySQL

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kissanconnect.git

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Environment Variables

Create a `.env` file in your frontend root:

```
VITE_API_URL=http://localhost:3000
```

Create a `.env` file in your backend root:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=kissanconnect
JWT_SECRET=yourjwtsecret
PORT=3000
```

### Run the App

```bash
# Run frontend
cd frontend
npm run dev

# Run backend
cd backend
npm start
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, React Router |
| Backend | Node.js, Express |
| Database | MySQL |
| Auth | JWT |
| Styling | CSS Modules |
| AI Assistant | Groq API (Llama 3.3 70B) |

## AI Assistant

KissanConnect has a built-in AI farming assistant powered by **Groq (Llama 3.3 70B)**.

- Accessible at `/ai-assistant` (protected route)
- Supports **Hindi and English**
- Covers crop diseases, pest control, sowing, harvesting, fertilizers, irrigation, and government schemes
- Quick question chips for common farmer queries