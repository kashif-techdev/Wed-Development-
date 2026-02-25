# User Authentication and Profile Management System

A full-stack web application built with **Next.js** (frontend) and **NestJS** (backend) for secure user registration, authentication, and profile management. The application uses **PostgreSQL** as the database and implements JWT-based authentication.

## Features

- ✅ **User Registration** - Secure registration with email and password validation
- ✅ **User Login** - JWT-based authentication system
- ✅ **Profile Management** - View and update user profile information
- ✅ **Account Deletion** - Users can permanently delete their accounts
- ✅ **Beautiful UI/UX** - Modern, responsive design with Tailwind CSS
- ✅ **Error Handling** - Comprehensive error handling on both frontend and backend
- ✅ **Input Validation** - Client-side and server-side validation

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **js-cookie** - Cookie management

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **class-validator** - DTO validation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd lab14
```

### 2. Database Setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE user_auth_db;
```

2. Update the database credentials in `backend/.env` (see step 3).

### 3. Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=user_auth_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=3001
```

**Important:** Change the `JWT_SECRET` to a secure random string in production!

4. Start the backend server:

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The backend will run on `http://localhost:3001`

### 4. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the `frontend` directory (optional):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Database Schema

The application uses a single `users` table with the following structure:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  firstName VARCHAR,
  lastName VARCHAR,
  phone VARCHAR,
  address VARCHAR,
  bio VARCHAR,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Migration Files

The database migration file is located at:
- `backend/src/migrations/1700000000000-CreateUsersTable.ts`

To run migrations manually (if `synchronize: false` in production):

```bash
cd backend
npm run migration:run
```

## API Endpoints

### Authentication

- **POST** `/auth/login` - User login
  - Body: `{ email: string, password: string }`
  - Returns: `{ access_token: string, user: object }`

### User Management

- **POST** `/users/register` - Register new user
  - Body: `{ email: string, password: string, firstName?: string, lastName?: string }`
  - Returns: User object (without password)

- **GET** `/users/profile` - Get user profile (Protected)
  - Headers: `Authorization: Bearer <token>`
  - Returns: User object (without password)

- **PATCH** `/users/profile` - Update user profile (Protected)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ email?: string, firstName?: string, lastName?: string, phone?: string, address?: string, bio?: string }`
  - Returns: Updated user object

- **DELETE** `/users/profile` - Delete user account (Protected)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ message: string }`

## Project Structure

```
lab14/
├── backend/
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   │   ├── guards/         # JWT guards
│   │   │   ├── strategies/     # Passport strategies
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── users/              # User management module
│   │   │   ├── dto/            # Data Transfer Objects
│   │   │   ├── entities/       # TypeORM entities
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   ├── migrations/         # Database migrations
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── data-source.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── app/
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── profile/             # Profile management page
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Home page
│   │   └── globals.css
│   ├── lib/
│   │   └── api.ts              # API client
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.js
│
└── README.md
```

## Usage

1. **Register a New Account**
   - Navigate to `http://localhost:3000/register`
   - Fill in your email, password, and optional name fields
   - Click "Create Account"

2. **Login**
   - Navigate to `http://localhost:3000/login`
   - Enter your email and password
   - Click "Sign In"

3. **Manage Profile**
   - After logging in, you'll be redirected to the profile page
   - Click "Edit Profile" to update your information
   - Click "Save Changes" to save updates
   - Click "Delete Account" to permanently delete your account

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Both client-side and server-side validation
- **CORS Protection**: Configured CORS for frontend-backend communication
- **SQL Injection Protection**: Using TypeORM parameterized queries

## Development

### Backend Development

```bash
cd backend
npm run start:dev  # Watch mode
npm run build      # Build for production
npm run lint       # Run linter
```

### Frontend Development

```bash
cd frontend
npm run dev        # Development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run linter
```

## Production Deployment

1. **Backend**:
   - Set `synchronize: false` in `app.module.ts`
   - Use migrations for database changes
   - Set secure environment variables
   - Use a strong JWT secret
   - Enable HTTPS

2. **Frontend**:
   - Update `NEXT_PUBLIC_API_URL` to production API URL
   - Build the application: `npm run build`
   - Deploy to Vercel, Netlify, or your preferred hosting

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure the database exists

### CORS Errors

- Verify the frontend URL in `backend/src/main.ts` CORS configuration
- Check that the frontend is running on the correct port

### Authentication Issues

- Verify JWT_SECRET is set in backend `.env`
- Check that tokens are being stored in cookies
- Clear browser cookies and try again

## License

MIT License

## Author

Created as a lab project for University Course

---

**Note**: This is a development project. For production use, ensure proper security measures, environment variable management, and database backup strategies are in place.

