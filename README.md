# 🏠 Rental Management Web App

A full-stack rental management system built with **React (Vite)** frontend and **Express + MongoDB** backend, deployed via **Vercel**.

---

## 🌐 Live Demo

Frontend: [https://rental-management-wiv3.vercel.app/](https://rental-management-wiv3.vercel.app/)  
Backend API: [https://rental-management-backend.vercel.app/](https://rental-management-backend.vercel.app/)
---

## 🧩 Features

### ✅ Frontend (React + Vite)
- Browse rental listings
- Create / edit / delete rental entries
- Pagination & filtering UI
- Live update of total rental count
- Communicates with backend via API

### ✅ Backend (Express + MongoDB)
- RESTful API: CRUD endpoints for rentals
- CORS-enabled for frontend integration
- Connects to MongoDB Atlas (Cloud)
- Vercel-friendly setup (serverless style)

---

## 🛠️ Getting Started

### 🔧 Prerequisites

- Node.js
- MongoDB Atlas account
- Vercel CLI (`npm i -g vercel`)

---

## 🚀 Backend Setup (`/backend`)

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Environment variable

You **do not need a `.env` file if using Vercel**.  
Instead, go to [Vercel Dashboard](https://vercel.com/dashboard) → your project → `Settings` → `Environment Variables`, and add:

```
Name: MONGODB_URI
Value: mongodb+srv://<username>:<password>@cluster.mongodb.net/test?retryWrites=true&w=majority
```

### 3. Deploy backend

```bash
vercel --prod
```

---

## 💻 Frontend Setup (`/frontend`)

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Create `.env` file

```env
VITE_API_BASE_URL=https://your-backend.vercel.app/api
```

### 3. Run locally

```bash
npm run dev
```

### 4. Deploy to Vercel

```bash
vercel --prod
```

---

## 📡 API Endpoints

| Method | Endpoint                   | Description              |
|--------|----------------------------|--------------------------|
| GET    | `/api/rentals`             | List all rentals         |
| GET    | `/api/rentals/:id`         | Get rental by ID         |
| POST   | `/api/rentals`             | Create new rental        |
| PUT    | `/api/rentals/:id`         | Update rental            |
| DELETE | `/api/rentals/:id`         | Delete rental            |
| GET    | `/api/rentals/total`       | Get total rental count   |
| GET    | `/api/test-env`            | (Debug) Check env value  |

---

## ✨ Credits

- React + Vite for frontend
- Express + MongoDB for backend
- Vercel for free full-stack deployment 💜

---

## 📄 License

MIT License – Free to use and modify.
