# MERN Stack Authentication System with MySQL Database & Dashboard CRUD

## 📋 Project Overview

This is a complete full-stack authentication and CRUD application built with the MERN stack using MySQL as the database. The project features user authentication (registration, login, password reset) and a fully functional dashboard where authenticated users can manage their own data items.

**Assignment Title:** MERN Stack Authentication & CRUD with MySQL  
**Institution:** CampusPe   
**Duration:** 2-3 Weeks

## ✨ Features

### Backend Features
-  User Registration with password hashing (bcryptjs)
-  User Login with JWT token generation
-  Password reset functionality with email (Nodemailer)
-  Protected routes with JWT verification middleware
-  Full CRUD operations for dashboard items
-  Dashboard statistics (total, active, pending, completed)
-  MySQL connection pool for better performance
-  SQL injection prevention using parameterized queries
-  Error handling middleware
-  CORS enabled for cross-origin requests

### Frontend Features
-  Beautiful SparkTeen-themed UI with Tailwind CSS
-  Responsive design for mobile, tablet, and desktop
-  Login page with email/password and remember me
-  Registration page with validation
-  Forgot password and reset password pages
-  Dashboard with statistics cards
-  Add/Edit/Delete items functionality
-  Status update dropdown for each item
-  Loading states for all API calls
-  Success/Error message alerts
-  Protected routes with AuthContext
-  Automatic token injection in axios requests
-  401 error handling with auto-logout

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

# Frontend setup
cd frontend <br>
npm install <br>
cp .env.example .env <br>
npm run dev

# Database setup
mysql -u root -p <br>
source backend/database.sql

# Screenshots

## Login Page
<img width="1923" height="990" alt="Screenshot 2026-04-09 at 12 54 28 PM" src="https://github.com/user-attachments/assets/c87ffdcf-5a7f-46d3-acf1-895719dd3939" />

## Registration Page
<img width="1913" height="990" alt="Screenshot 2026-04-09 at 12 55 30 PM" src="https://github.com/user-attachments/assets/03708f01-5f52-40d4-92e4-987dd955c51e" />

## Forgot Password Page
<img width="1896" height="980" alt="Screenshot 2026-04-09 at 1 00 32 PM" src="https://github.com/user-attachments/assets/d1bf9731-90d5-43c8-83c6-b0e2139893af" />



## Dashboard with items
<img width="1322" height="990" alt="Screenshot 2026-04-09 at 1 00 05 PM" src="https://github.com/user-attachments/assets/c21814f4-bc6f-477e-a7cd-da485250e113" />

## Add item form
<img width="1918" height="990" alt="Screenshot 2026-04-09 at 12 56 59 PM" src="https://github.com/user-attachments/assets/e4cb2b22-60aa-4edb-94c7-64929e2503b4" />

## Edit item functionality
<img width="1915" height="990" alt="Screenshot 2026-04-09 at 12 57 18 PM" src="https://github.com/user-attachments/assets/16f4b7c6-c5d1-413e-ae2a-c4fdb1bb88c8" />

## Delete confirmation
<img width="1902" height="990" alt="Screenshot 2026-04-09 at 12 58 18 PM" src="https://github.com/user-attachments/assets/78a139df-3e79-4f3c-b3fb-97c6fffb6fb2" />

<img width="1920" height="1080" alt="Screenshot 2026-04-09 at 12 58 21 PM (2)" src="https://github.com/user-attachments/assets/d8805b54-d245-4a37-ad49-fc9f81fc9aa9" />

## MySQL database showing tables with data

### Items Table
<img width="1288" height="990" alt="Screenshot 2026-04-09 at 1 10 06 PM" src="https://github.com/user-attachments/assets/75ee857b-c45f-4a47-ba88-3f1967b961fc" />

### Users Table
<img width="1817" height="990" alt="Screenshot 2026-04-09 at 1 10 31 PM" src="https://github.com/user-attachments/assets/ef81416e-5d88-493e-b353-bc75425075cc" />











