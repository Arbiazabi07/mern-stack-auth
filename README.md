# MERN Stack Authentication System with MySQL Database & Dashboard CRUD

## 📋 Project Overview

This is a complete full-stack authentication and CRUD application built with the MERN stack using MySQL as the database. The project features user authentication (registration, login, password reset) and a fully functional dashboard where authenticated users can manage their own data items.

**Assignment Title:** MERN Stack Authentication & CRUD with MySQL  
**Institution:** CampusPe   
**Duration:** 2-3 Weeks

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

# Clone repository
git clone https://github.com/Arbiazabi07/mern-stack-auth.git <br>
cd mern-stack-auth

# Backend setup
cd backend <br>
npm install <br>
cp .env.example .env <br>
# Edit .env with your credentials <br>
npm run dev

# Frontend setup (new terminal)
cd frontend <br>
npm install <br>
cp .env.example .env <br>
npm run dev

# Database setup
mysql -u root -p <br>
source backend/database.sql

