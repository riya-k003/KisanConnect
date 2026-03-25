# KisanConnect Backend Revision Notes

---

## 🔐 1. Authentication Goal

Authentication helps the server identify **who is making the request**.

In KisanConnect:

* Farmers log in to post tips
* Users log in to view content
* The backend must verify the identity of the user

---

## 🔑 2. Password Security (bcrypt)

We never store the real password in the database.

**Flow:**

```
password → hash → stored in DB
```

Example:

```
bcrypt.hash(password, saltRounds)
```

### Why bcrypt?

1. Protects user passwords if database leaks
2. Adds **salt** automatically
3. Same passwords generate **different hashes**

Example:

```
hello123 → $2b$10$abc...
hello123 → $2b$10$xyz...
```

---

## 🔓 3. Login Logic

When a user logs in:

1. Receive email and password
2. Find user in database
3. Compare password

   ```
   bcrypt.compare(enteredPassword, storedHash)
   ```
4. If correct → generate JWT token

   ```
   jwt.sign(payload, SECRET_KEY)
   ```
5. Send token to client

---

## 🧾 4. JWT Structure

A JWT has **three parts**:

```
HEADER.PAYLOAD.SIGNATURE
```

Example:

```
xxxxx.yyyyy.zzzzz
```

* Header → algorithm info
* Payload → user data
* Signature → verifies authenticity

Example payload:

```
{
  id: 8,
  email: "user@email.com"
}
```

---

## 📡 5. How Client Uses the Token

Client sends token with every request:

```
Authorization: Bearer <token>
```

Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ⚙️ 6. Authentication Middleware Flow

1. Read header

   ```
   req.headers.authorization
   ```
2. Extract token

   ```
   token = header.split(" ")[1]
   ```
3. Verify token

   ```
   jwt.verify(token, SECRET_KEY)
   ```
4. Decode payload
5. Attach user

   ```
   req.user = decoded
   ```
6. Call next()

---

## 🔄 7. Request Flow

Client Request
↓
Authorization header
↓
Auth Middleware
↓
Token verified
↓
User extracted
↓
Controller executes

---

## ⚠️ 8. Important JWT Concept

If payload is changed:

```
{ id: 8 } → { id: 100 }
```

👉 Signature becomes invalid
👉 Verification fails

**Memory Trick:**

```
Payload change → Signature breaks → Verification fails
```

---

## 🧠 9. Daily Revision Questions

1. Why do we hash passwords?
2. What does bcrypt.compare do?
3. What are the 3 parts of JWT?
4. Where is token sent?
5. Middleware order?

**Correct Order:**

```
1. Read header
2. Extract token
3. Verify token
4. Decode payload
5. Attach user
6. next()
```

---

# ❤️ LIKE FEATURE (Tips)

---

## 🎯 Goal

Users can **like / unlike a tip**

---

## 🧠 Database Design

### Table: tip_likes

| Column  | Type                     | Description    |
| ------- | ------------------------ | -------------- |
| id      | INT (PK, AUTO_INCREMENT) | Unique ID      |
| user_id | INT (FK)                 | User who liked |
| tip_id  | INT (FK)                 | Tip liked      |

### Constraints:

* UNIQUE(user_id, tip_id) → Prevent duplicate likes

---

## 🔄 API Design

### POST `/tips/:tip_id/like`

---

## ⚙️ Controller Flow (Real Thinking)

1. Get `user_id` from `req.user`
2. Get `tip_id` from params
3. Check if like exists
4. If exists → DELETE (unlike)
5. Else → INSERT (like)
6. Return response

---

## 🔍 Check Existing Like

```sql
SELECT * FROM tip_likes 
WHERE user_id = ? AND tip_id = ?;
```

---

## 💻 Backend Logic (Pseudo Code)

```js
IF (like exists)
    DELETE like
    return "Unliked"
ELSE
    INSERT like
    return "Liked"
```

---

## 🔢 Count Likes per Tip

```sql
SELECT tip_id, COUNT(user_id) AS total_likes
FROM tip_likes
GROUP BY tip_id;
```

👉 COUNT() ignores NULL values

---

## 🔗 Join with Tips

```sql
SELECT t.*, COUNT(l.user_id) AS likes
FROM tips t
LEFT JOIN tip_likes l ON t.id = l.tip_id
GROUP BY t.id;
```

---

## ❤️ Check if Current User Liked

```sql
SELECT tip_id
FROM tip_likes
WHERE user_id = ?;
```

👉 Used to highlight liked button in UI

---

## ⚠️ Edge Cases

* Tip does not exist → return error
* Duplicate like → prevented by UNIQUE constraint
* Invalid token → unauthorized
* Invalid tip_id → validation error

---

## ⚡ Optimization

* Add index on:

  * user_id
  * tip_id

👉 Improves SELECT and COUNT performance

---

## ❌ Common Mistakes

* Wrong joins (tip_id vs user_id)
* Forgetting GROUP BY
* Allowing duplicate likes
* Not extracting user_id from token
* Using INNER JOIN instead of LEFT JOIN

---

## 🎯 Interview Questions

1. How do you prevent duplicate likes?
2. Difference between INNER JOIN and LEFT JOIN?
3. Why use GROUP BY?
4. How to optimize like queries?
5. What happens if no likes exist?

---

## 🚀 Rule for Development

Before writing new backend code:

1. Read this file
2. Understand the flow
3. Then implement feature

---

# 💬 Comment Feature (Tips)

---

## 🎯 Goal

Enable users to:

* Add comments on tips
* View comments under each tip

---

## 🧠 Database Design

### Table: `comments`

| Column     | Type                     | Description                 |
| ---------- | ------------------------ | --------------------------- |
| comment_id | INT (PK, AUTO_INCREMENT) | Unique comment identifier   |
| tip_id     | INT (FK)                 | Associated tip              |
| user_id    | INT (FK)                 | User who posted the comment |
| content    | TEXT                     | Comment text                |
| created_at | DATETIME                 | Timestamp of creation       |

### 🔗 Relationships

* `tip_id` → references `tips.tip_id`
* `user_id` → references `users.user_id`

---

## 🔄 API Design

### ➤ Add Comment

```
POST /tips/:tip_id/comments
```

### ➤ Get Comments for a Tip

```
GET /tips/:tip_id/comments
```

---

## ⚙️ Controller Flow

### ➤ Add Comment

1. Extract `tip_id` from URL params
2. Extract `user_id` and `content` from request body
3. Validate input
4. Insert comment into database
5. Return success response

---

## 💻 Backend Logic (Pseudo Code)

```js
app.post('/tips/:tip_id/comments', async (req, res) => {
  const tip_id = req.params.tip_id;
  const { user_id, content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }

  // Insert into DB
  INSERT INTO comments (tip_id, user_id, content)
  VALUES (?, ?, ?);

  res.status(201).json({ message: "Comment added successfully" });
});
```

---

## 🔍 Fetch Comments

```sql
SELECT *
FROM comments
WHERE tip_id = ?
ORDER BY created_at DESC;
```

---

## ⚠️ Edge Cases

* Empty comment submission
* Invalid `tip_id`
* Unauthorized user
* Extremely long content

---

## ⚡ Optimization

* Index on `tip_id` → faster filtering
* Index on `user_id` → faster user queries

---

## ❌ Common Mistakes

* Sending `tip_id` in body instead of params
* Not validating empty comments
* Forgetting to sort comments
* Over-fetching all comments on page load

---

## 🧠 Frontend Strategy

* Fetch comments **on click (lazy loading)**
* Maintain state as:

```js
{
  tip_id: [comments]
}
```

* Use `openCommentId` to toggle visibility

---

## 🚀 Future Enhancements

* Comment likes ❤️
* Nested replies
* Edit / delete comments
* User mentions

---

## 🧠 Memory Line

Click → Fetch → Store → Show


