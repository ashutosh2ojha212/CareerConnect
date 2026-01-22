# Carrier Connect - Setup Guide

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)
- Git

## Installation Steps

### 1. Install Dependencies

From the root directory:

```bash
npm install
```

This will install dependencies for both frontend and backend.

### 2. Set Up Database

1. Create a PostgreSQL database:

```sql
CREATE DATABASE carrier_connect;
```

2. Update the `DATABASE_URL` in `backend/.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/carrier_connect?schema=public"
```

3. Run Prisma migrations:

```bash
cd backend
npm run prisma:migrate
npm run prisma:generate
```

4. (Optional) Seed the database with sample data:

```bash
npm run seed
```

### 3. Configure Environment Variables

#### Backend (`backend/.env`)

Copy `backend/.env.example` to `backend/.env` and update:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/carrier_connect?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
UPLOAD_DIR=./uploads
```

#### Frontend (`frontend/.env`)

Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

### 4. Start Development Servers

From the root directory:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3001`
- Frontend dev server on `http://localhost:5173`

Or start them separately:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Default Test Accounts

After seeding, you can use:

- **Employee/Referrer**: 
  - Email: `john@techcorp.com`
  - Password: `password123`

- **Job Seeker**: 
  - Create a new account via Sign Up

## Project Structure

```
carrier-connect/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── pages/    # Page components
│   │   ├── components/ # Reusable components
│   │   ├── store/     # Zustand state management
│   │   └── lib/      # API utilities
│   └── public/       # Static assets
├── backend/          # Express + TypeScript
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── middleware/ # Auth & error handling
│   │   └── utils/    # Helper functions
│   └── prisma/       # Database schema
└── package.json      # Root workspace config
```

## Available Scripts

### Root
- `npm run dev` - Start both frontend and backend
- `npm run build` - Build both projects
- `npm run lint` - Lint both projects

### Backend
- `npm run dev` - Start dev server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run seed` - Seed database with sample data

### Frontend
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Next Steps

1. Customize the logo in `frontend/public/logo.svg`
2. Update company information
3. Configure email service for password reset
4. Add more features as needed

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify DATABASE_URL in `.env` is correct
- Check database credentials

### Port Already in Use
- Change PORT in `backend/.env`
- Update VITE_API_URL in `frontend/.env` accordingly

### Prisma Issues
- Run `npm run prisma:generate` after schema changes
- Run `npm run prisma:migrate` to apply migrations

## Support

For issues or questions, check the README.md or create an issue in the repository.

