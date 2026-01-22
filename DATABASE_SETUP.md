# Database Setup Guide

## Quick Setup Options

### Option 1: Install PostgreSQL (Recommended for Production)

#### macOS with Homebrew:
```bash
brew install postgresql@14
brew services start postgresql@14
```

#### Create Database:
```bash
createdb carrier_connect
```

Then update `backend/.env`:
```env
DATABASE_URL="postgresql://$(whoami)@localhost:5432/carrier_connect?schema=public"
```

#### Run Migrations:
```bash
cd backend
npm run prisma:migrate
```

### Option 2: Use SQLite (Easier for Development)

If you want to get started quickly without installing PostgreSQL, we can switch to SQLite:

1. Update `backend/prisma/schema.prisma`:
   - Change `provider = "postgresql"` to `provider = "sqlite"`
   - Change `DATABASE_URL` to `"file:./dev.db"`

2. Update `backend/.env`:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

3. Run migrations:
   ```bash
   cd backend
   npm run prisma:migrate
   ```

### Option 3: Use Cloud Database (Free Tier)

- **Supabase**: https://supabase.com (Free PostgreSQL)
- **Railway**: https://railway.app (Free PostgreSQL)
- **Neon**: https://neon.tech (Free PostgreSQL)

Just copy the connection string to `backend/.env`

## After Database Setup

1. Run migrations:
   ```bash
   cd backend
   npm run prisma:migrate
   ```

2. (Optional) Seed sample data:
   ```bash
   npm run seed
   ```

3. Start the servers:
   ```bash
   cd ..
   npm run dev
   ```

