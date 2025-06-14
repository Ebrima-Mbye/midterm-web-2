# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

# 🎓 MEAN Stack Role-Based Authentication & Authorization

## 📘 University of The Gambia - School of ICT

Course: Internet & Web Programming II  
**Assignment:** Midterm Project (20%)  
**Developer:** Ebrima Mbye

## Objective

This project implements a **dynamic role-based authentication and authorization module** using the **MEAN stack** (MongoDB, Express.js, Angular, Node.js). It supports:

- Secure user registration and login
- Role management (Admin, Editor, Viewer)
- Route protection and role-based UI access
- Clean Angular frontend with guards and services

# Start Server

```bash
npm run start
```

# Start frontend

```bash
ng serve
```

## Tech Stack

| Layer    | Technology           |
| -------- | -------------------- |
| Frontend | Angular 17           |
| Backend  | Node.js + Express    |
| Database | MongoDB (local)      |
| Auth     | JWT + bcrypt         |
| Guards   | Angular Route Guards |
| HTTP     | Angular HttpClient   |

## Functional Requirements

### 1. User Registration & Login

- Full name, email, password, and role on register
- Passwords hashed with `bcrypt`
- JWT tokens returned on login

### 2. Roles & Permissions

- 3 roles supported: **Admin**, **Editor**, **Viewer**
- Roles stored in MongoDB
- Admin can update user roles via backend route

### 3. Authorization

- Backend routes protected via middleware
- Frontend routes protected via Angular guards
- UI displays content based on logged-in user's role

### 4. Frontend Interface

- Clean UI built with Angular components
- Navbar shows Login, Register, Dashboard, Logout
- Dashboard shows role-specific content

## Project Structure

midterm/
├── backend/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── .env
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── app/
│ │ │ ├── components/
│ │ │ │ ├── login/
│ │ │ │ ├── register/
│ │ │ │ ├── dashboard/
│ │ │ │ └── navbar/
│ │ │ ├── guards/
│ │ │ ├── services/
│ │ ├── main.ts
│ │ ├── app.routes.ts
│ ├── angular.json
| └── .gitignore
├── README.md

## Setup Instructions

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally
- [Angular CLI](https://angular.io/cli)

- Install Angular CLI globally if not already installed:

```bash
npm install -g @angular/cli
```

**2.** Backend Setup

- Navigate to the backend folder:

```bash
cd backend
```

- Install dependencies:

```bash
npm install
```

Create a .env file in the backend/ directory and configure it:

```bash
MONGO_URI=mongodb://127.0.0.1:27017/roleAuthDB
JWT_SECRET=yourSecretKey
```

Start the backend server:

```bash
npm run start
```

The backend will run at http://localhost:3000.

**3.** Frontend Setup
Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

- Install dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
ng serve
```

The frontend will run at http://localhost:4200.

Test Users
You may use the following test credentials to verify role-based access and navigation:

# These users exist:

- Editor

```json
{
  "fullName": "Ebrima Mbye",
  "email": "ebrimambye@utg.gm",
  "password": "password123",
  "role": "Editor"
}
```

- Viewer

```json
{
  "fullName": "Bubacarr Njie",
  "email": "bubacarrnjie@utg.gm",
  "password": "password456",
  "role": "Viewer"
}
```

- Admin

```json
{
  "fullName": "Admin Boss",
  "email": "admin@utg.gm",
  "password": "admin123",
  "role": "Admin"
}
```

You may also register new users and select a role during registration.

API Endpoints
Authentication

```js
POST /api/auth/register — Register a new user
```

```js
POST /api/auth/login — Login and receive JWT
```

Role Management (Admin Only)

```js
GET /api/users — Fetch all users
```

```js
PUT /api/users/:id/role — Update user role
```

These endpoints are protected using JWT and role-based middleware.

Code Structure and Architecture
Backend routes, controllers, and middleware are modular and follow best practices

MongoDB models are defined using Mongoose

JWT tokens are securely generated and verified

Angular frontend uses services, guards, and clean routing

Guards (AuthGuard, RoleGuard) handle access control based on login status and user role

Tokens are stored in localStorage for session management

The UI dynamically updates based on user role
