# Quick Start Guide

## Prerequisites
- Node.js (v18+)
- PostgreSQL (v12+)
- npm or yarn

## Quick Setup (5 minutes)

### 1. Database Setup
```bash
# Create PostgreSQL database
createdb user_auth_db
# Or using psql:
psql -U postgres -c "CREATE DATABASE user_auth_db;"
```

### 2. Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your database credentials
npm run start:dev
```

### 3. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Default Configuration

If you use the default `.env` values:
- Database: `user_auth_db` on `localhost:5432`
- Backend: `http://localhost:3001`
- Frontend: `http://localhost:3000`

## First Steps

1. Open http://localhost:3000
2. Click "Create New Account"
3. Register with your email and password
4. Login with your credentials
5. Update your profile information

## Troubleshooting

**Database connection error?**
- Ensure PostgreSQL is running
- Check credentials in `backend/.env`

**CORS errors?**
- Verify backend CORS settings in `backend/src/main.ts`
- Check frontend is running on port 3000

**Port already in use?**
- Change PORT in `backend/.env`
- Update `NEXT_PUBLIC_API_URL` in frontend if needed

For detailed documentation, see [README.md](README.md)

