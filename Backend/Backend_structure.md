# KisanConnect Backend Flow Revision

---

## 🎯 Goal

Understand how requests move from **user → backend → database → response**

---

# 🏗️ 1. Backend Architecture

Basic system flow:

```
User → Frontend → API → Backend → Database → Response
```

### Example:

User logs in

```
POST /login
```

Backend:

* Processes request
* Validates user
* Sends response

---

# 📁 2. Backend Folder Structure

```
backend
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── tipController.js
│
├── middleware
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── routes
│   ├── authRoutes.js
│   ├── tipRoutes.js
│
├── models
│   └── userModel.js
│
└── server.js
```

### Explanation:

* **routes** → define API endpoints
* **controllers** → contain business logic
* **middleware** → runs before controller
* **models** → interact with database
* **config** → database connection

---

# 🔄 3. Request Lifecycle

Every request follows:

```
Client Request
↓
Route
↓
Middleware
↓
Controller
↓
Database
↓
Response
```

### Example:

```
POST /tips
```

Flow:

```
Route → Auth Middleware → Controller → DB → Response
```

---

# 🔐 4. Authentication Flow

## Registration

```
POST /register
```

Steps:

1. Receive user data
2. Hash password
3. Store in DB

---

## Login

```
POST /login
```

Steps:

1. Find user
2. Compare password
3. Generate JWT
4. Send token

---

# 🛡️ 5. Protected Routes

Some routes require authentication.

### Example:

```
POST /tips/create
```

Flow:

```
Client
↓
Authorization Header
↓
Auth Middleware
↓
JWT Verified
↓
Controller Runs
↓
Database
↓
Response
```

---

# 🌾 6. Tip Posting Flow

Farmer creates a tip.

### Request:

```
POST /tips/create
```

### Body:

* title
* content
* category

### Flow:

```
Client
↓
Route
↓
Auth Middleware
↓
Role Middleware (Farmer Check)
↓
Controller
↓
Database Insert
↓
Response
```

---

# 🗄️ 7. Database Tables

## Users

* id
* name
* email
* password
* role

## Tips

* id
* farmer_id
* title
* content
* category
* created_at

---

# 👥 8. Role-Based Access Control (RBAC)

### Rule:

Only farmers can create tips.

```js
if (user.role !== "farmer") {
    return error;
}
```

Users can still view tips.

---

# ⚠️ 9. Error Handling (IMPORTANT)

Always handle errors properly:

* Invalid input → 400 Bad Request
* Unauthorized → 401
* Forbidden (wrong role) → 403
* Server error → 500

---

# 🧠 10. Thinking Framework (VERY IMPORTANT)

Before building any feature, ask:

1. What route will handle this?
2. Do I need authentication?
3. Do I need role check?
4. What logic goes in controller?
5. What DB query is required?
6. What response will I send?

---

# ⚡ 11. Development Rule

Always think in this order:

```
Route
→ Middleware
→ Controller
→ Database
→ Response
```

❌ Never start coding randomly
✅ Always follow request flow

---

# 🚀 12. Real Example (Complete Flow)

### Like Feature

```
POST /tips/:tip_id/like
```

Flow:

```
Route
↓
Auth Middleware
↓
Controller
    → Check like exists
    → Insert/Delete
↓
Database
↓
Response (Liked / Unliked)
```

---

# 🎯 Daily Reminder

If something breaks, debug in this order:

1. Route correct hai?
2. Middleware run ho raha hai?
3. Token valid hai?
4. Controller logic sahi hai?
5. Query sahi hai?
6. Database me data aa raha hai?

---
