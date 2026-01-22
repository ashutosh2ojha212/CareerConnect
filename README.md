# Carrier Connect

A referral platform connecting job seekers with employees for referrals and job opportunities.

## Tech Stack

- **Frontend**: React + Vite + TypeScript + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT

## Project Structure

```
carrier-connect/
├── frontend/          # React application
├── backend/           # Express API server
└── package.json       # Root workspace config
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both `frontend/` and `backend/` directories
   - Update with your database credentials and JWT secret

4. Set up the database:
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

5. Start development servers:
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:3001`
   - Frontend dev server on `http://localhost:5173`

## Features

### Job Seeker Dashboard
- Browse companies and employees
- Submit referral requests
- Upload resume
- Track application status

### Employee/Referrer Dashboard
- Post job openings
- Create custom application forms
- View applicants
- Copy applicant details for referral portals

## Development

- Frontend: `cd frontend && npm run dev`
- Backend: `cd backend && npm run dev`

## License

MIT

