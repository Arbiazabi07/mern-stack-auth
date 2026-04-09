# MERN Stack Authentication System with MySQL Database & Dashboard CRUD

## 📋 Project Overview

This is a complete full-stack authentication and CRUD application built with the MERN stack using MySQL as the database. The project features user authentication (registration, login, password reset) and a fully functional dashboard where authenticated users can manage their own data items.

**Assignment Title:** MERN Stack Authentication & CRUD with MySQL  
**Institution:** CampusPe   
**Duration:** 2-3 Weeks

## 📚 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Running the Application](#running-the-application)
- [Screenshots](#screenshots)
- [Security Features](#security-features)
- [Best Practices Implemented](#best-practices-implemented)
- [Bonus Features](#bonus-features)
- [Troubleshooting](#troubleshooting)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Grading Criteria](#grading-criteria)
- [Submission Guidelines](#submission-guidelines)
- [License](#license)

## ✨ Features

### Backend Features
- ✅ User Registration with password hashing (bcryptjs)
- ✅ User Login with JWT token generation
- ✅ Password reset functionality with email (Nodemailer)
- ✅ Protected routes with JWT verification middleware
- ✅ Full CRUD operations for dashboard items
- ✅ Dashboard statistics (total, active, pending, completed)
- ✅ MySQL connection pool for better performance
- ✅ SQL injection prevention using parameterized queries
- ✅ Error handling middleware
- ✅ CORS enabled for cross-origin requests

### Frontend Features
- ✅ Beautiful SparkTeen-themed UI with Tailwind CSS
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Login page with email/password and remember me
- ✅ Registration page with validation
- ✅ Forgot password and reset password pages
- ✅ Dashboard with statistics cards
- ✅ Add/Edit/Delete items functionality
- ✅ Status update dropdown for each item
- ✅ Loading states for all API calls
- ✅ Success/Error message alerts
- ✅ Protected routes with AuthContext
- ✅ Automatic token injection in axios requests
- ✅ 401 error handling with auto-logout

## 🛠 Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | Component-based UI library |
| React Router | Client-side routing |
| Axios | HTTP client for API calls |
| Tailwind CSS | Utility-first CSS framework |
| React Context API | Global state management |
| Lucide React | Modern icon library |
| Vite | Build tool and dev server |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web application framework |
| MySQL | Relational database management system |
| mysql2 | MySQL client with Promise support |
| bcryptjs | Password hashing |
| jsonwebtoken (JWT) | Token-based authentication |
| Nodemailer | Email sending for password reset |
| dotenv | Environment variable management |
| cors | Cross-origin resource sharing |

## 📁 Project Structure
mern-stack-auth/
│
├── backend/
│ ├── config/
│ │ └── db.js # MySQL connection configuration
│ ├── controllers/
│ │ ├── authController.js # Authentication logic
│ │ └── itemController.js # CRUD operations logic
│ ├── middleware/
│ │ ├── auth.js # JWT verification middleware
│ │ └── errorHandler.js # Global error handling
│ ├── routes/
│ │ ├── authRoutes.js # Authentication endpoints
│ │ └── itemRoutes.js # CRUD endpoints
│ ├── .env.example # Environment variables template
│ ├── .gitignore # Git ignore file
│ ├── database.sql # Database schema
│ ├── package.json # Backend dependencies
│ └── server.js # Entry point
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ │ ├── axios.js # Axios configuration
│ │ │ ├── authApi.js # Auth API calls
│ │ │ └── itemApi.js # Item API calls
│ │ ├── components/
│ │ │ ├── Login.jsx # Login page
│ │ │ ├── Register.jsx # Registration page
│ │ │ ├── Dashboard.jsx # Dashboard with CRUD
│ │ │ ├── ForgotPassword.jsx
│ │ │ ├── ResetPassword.jsx
│ │ │ ├── ProtectedRoute.jsx
│ │ │ └── PublicRoute.jsx
│ │ ├── context/
│ │ │ └── AuthContext.jsx # Global auth state
│ │ ├── App.jsx # Main app component
│ │ ├── main.jsx # Entry point
│ │ └── index.css # Global styles
│ ├── .env.example # Frontend env template
│ ├── .gitignore
│ ├── index.html
│ ├── package.json
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ └── vite.config.js
│
├── screenshots/ # Application screenshots
├── database.sql # Complete database schema
└── README.md # Project documentation

# Clone repository
git clone https://github.com/Arbiazabi07/mern-stack-auth.git
cd mern-stack-auth

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev

# Database setup
mysql -u root -p
source backend/database.sql

