# 🐾 Petgram – Social Media for Pet Lovers

Petgram is a full-stack social media web application built with the **MERN Stack (MongoDB, Express.js, React, Node.js)**, featuring **Firebase Authentication**, **Cloudinary image uploads**, and **Socket.io**-based real-time chat. Users can post pet photos, chat with friends, and engage with content through likes and comments.

---

## 🔗 Live Demo (optional)
> Add your deployed URL here (e.g., Vercel/Netlify + Render/Heroku)

---

## 📸 Screenshots

| Login | Feed | Upload Post |
|:--:|:--:|:--:|
| ![](Login.png) | ![](FeedPage.png) | ![](UploadPost.png) |

| Profile | Chat |
|:--:|:--:|
| ![](Profile.png) | ![](ChatPage.png) |

---

## 🧠 Features

### 🔐 Authentication
- Firebase Email/Password login and signup
- Global AuthContext for user state

### 📰 Feed Page
- View posts from yourself and friends
- Like and comment on posts
- Friend suggestions

### 📤 Upload Post
- Upload images with captions
- Stored on **Cloudinary**, metadata saved in MongoDB

### 👤 Profile Page
- View user profile and personal posts
- Upload/change profile picture
- Logout functionality

### 💬 Chat System
- Real-time messaging with friends using **Socket.io**
- Display recent chats
- Message history stored in MongoDB

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| Authentication | Firebase Auth |
| Media Storage | Cloudinary |
| Real-time Chat | Socket.io |
| State Management | React Context API |

---

## 📁 Project Structure (Frontend)

