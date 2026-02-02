# Career Connect – Production Deployment with PostgreSQL

This guide covers deploying the backend with **PostgreSQL** (required for production). SQLite is not supported in production.

---

## 1. Database: PostgreSQL

The app uses **PostgreSQL** via Prisma. Set `DATABASE_URL` in your backend environment.

### Option A: Railway

1. Create a project at [railway.app](https://railway.app).
2. Add a **PostgreSQL** service (one-click).
3. Open the PostgreSQL service → **Variables** → copy `DATABASE_URL` (or **Connect** → **Postgres connection URL**).
4. In your backend service (or root project), add variable:
   ```bash
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/railway?schema=public
   ```
   Use the exact URL Railway provides (it often includes `?schema=public` or similar).

### Option B: Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **Project Settings** → **Database**.
3. Copy **Connection string** → **URI** (use “Session mode” or “Transaction” for Prisma).
4. Format: `postgresql://postgres.[ref]:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres`
5. Add to backend env:
   ```bash
   DATABASE_URL=postgresql://postgres.[ref]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
   For direct connection (migrations), use port **5432** and omit `?pgbouncer=true` when running `prisma migrate deploy`.

### Option C: Neon

1. Create a project at [neon.tech](https://neon.tech).
2. Copy the connection string from the dashboard (e.g. `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`).
3. Add to backend env:
   ```bash
   DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

---

## 2. Backend environment variables

Set these for the **backend** (Railway, Render, Fly.io, or your host):

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://USER:PASS@HOST:5432/DB?schema=public` |
| `JWT_SECRET` | Secret for JWT signing (use a long random string in production) | `your-super-secret-key-change-me` |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |
| `PORT` | Server port (host often sets this) | `3001` |
| `NODE_ENV` | Environment | `production` |
| `UPLOAD_DIR` | Directory for uploaded files (resumes); use persistent volume if needed | `./uploads` |
| `FRONTEND_URL` | Frontend origin (for CORS and OAuth redirects) | `https://your-app.vercel.app` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | From Google Cloud Console |
| `GOOGLE_REDIRECT_URI` | OAuth callback URL | `https://your-api.railway.app/api/auth/google/callback` |
| `SMTP_USER` | Sender email (e.g. Gmail) | `mycareerconnects@gmail.com` |
| `SMTP_PASS` | App password for SMTP_USER | Gmail App Password |
| `SMTP_FROM` | From header for emails | `CareerConnect <noreply@careerconnect.com>` |
| `SMTP_HOST` | SMTP host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `ADMIN_EMAIL` | (Optional) Email to promote to admin after first deploy | `mycareerconnects@gmail.com` |

---

## 3. Run migrations and seed (one-time)

After `DATABASE_URL` is set:

```bash
cd backend
npx prisma migrate deploy
npx prisma generate
```

Optional seed (sample data):

```bash
npx tsx src/scripts/seed.ts
```

Optional: promote first admin:

```bash
ADMIN_EMAIL=mycareerconnects@gmail.com npx ts-node --compiler-options '{"module":"CommonJS"}' src/scripts/promote-admin.ts
```

---

## 4. Backend start commands

- **Development:** `npm run dev` (uses `tsx watch`).
- **Production:** build then run Node:
  ```bash
  npm run build
  npm start
  ```
  Or run with `tsx` without building: `npx tsx src/index.ts` (ensure `NODE_ENV=production` and `DATABASE_URL` are set).

---

## 5. Uploads and persistence

- Resume uploads go to `UPLOAD_DIR` (default `./uploads`).
- On Railway/Render/Fly, use a **persistent volume** (or object storage) for `UPLOAD_DIR` so files survive restarts.
- Ensure the backend serves `/uploads` (already configured in `backend/src/index.ts`).

---

## 6. Frontend

- Set `VITE_API_URL` to your backend API URL (e.g. `https://your-api.railway.app/api`).
- For Google OAuth, add your production frontend URL to the Google OAuth client and set `FRONTEND_URL` and `GOOGLE_REDIRECT_URI` accordingly.

---

## 7. Checklist before go-live

- [ ] `DATABASE_URL` points to PostgreSQL (not SQLite).
- [ ] `JWT_SECRET` is a strong random value.
- [ ] `FRONTEND_URL` and `GOOGLE_REDIRECT_URI` match your production URLs.
- [ ] `prisma migrate deploy` has been run.
- [ ] CORS allows your frontend origin.
- [ ] Admin user promoted if needed (`ADMIN_EMAIL` + promote script).
- [ ] Upload directory is persistent or replaced with object storage.

---

## 8. Local development with PostgreSQL

To run the backend against PostgreSQL locally (e.g. Docker):

```bash
# Example: start Postgres in Docker
docker run -d --name careerconnect-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=careerconnect -p 5432:5432 postgres:15

# In backend/.env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/careerconnect?schema=public"

cd backend
npx prisma migrate deploy
npx prisma generate
npm run dev
```

Old SQLite migrations are kept in `backend/prisma/migrations_sqlite_backup` for reference only; production uses the new PostgreSQL migration `init_postgres`.
