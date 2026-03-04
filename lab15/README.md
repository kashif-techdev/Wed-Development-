# Login and Registration System

A full-stack authentication application with React/Next.js frontend and Express.js backend, using PostgreSQL database.

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Bootstrap 5
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens), bcryptjs for password hashing

## Project Structure

```
lab15/
├── backend/
│   ├── database/
│   │   └── db.js          # PostgreSQL connection and initialization
│   ├── routes/
│   │   └── auth.js        # Authentication routes (register, login)
│   ├── server.js          # Express server setup
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── pages/
│   │   ├── index.tsx      # Home page
│   │   ├── login.tsx      # Login page
│   │   ├── register.tsx   # Registration page
│   │   ├── dashboard.tsx  # Protected dashboard page
│   │   └── _app.tsx       # App wrapper with Bootstrap
│   ├── styles/
│   │   └── globals.css    # Global CSS styles
│   ├── lib/
│   │   └── api.ts         # API client functions
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.js
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup

1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE authdb;
```

2. Update the database credentials in `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=authdb
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key_change_in_production
PORT=5000
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
copy .env.example .env
# On Linux/Mac: cp .env.example .env
```

4. Update the `.env` file with your database credentials.

5. Start the server:
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

- User Registration with validation
- User Login with JWT authentication
- Password hashing using bcryptjs
- Protected dashboard page
- Responsive design with Bootstrap 5
- Form validation and error handling
- Token-based authentication

## API Endpoints

### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

## Usage

1. Open `http://localhost:3000` in your browser
2. Click "Sign Up" to create a new account
3. Fill in the registration form and submit
4. After registration, you'll be redirected to the dashboard
5. Or use "Sign In" to login with existing credentials
6. Access the dashboard to see your user information
7. Click "Logout" to sign out

## Notes

- The database tables will be created automatically when the backend server starts
- JWT tokens are stored in localStorage (for production, consider using httpOnly cookies)
- Password must be at least 6 characters long
- Email and username must be unique

