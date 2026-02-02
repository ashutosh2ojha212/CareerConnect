import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import authRoutes from './routes/auth'
import companyRoutes from './routes/companies'
import jobRoutes from './routes/jobs'
import applicationRoutes from './routes/applications'
import referrerRoutes from './routes/referrer'
import jobSeekerRoutes from './routes/jobSeekers'
import referralInvitationRoutes from './routes/referralInvitations'
import invitationRoutes from './routes/invitations'
import adminRoutes from './routes/admin'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

// Production safety: require JWT_SECRET and min length in production
const isProduction = process.env.NODE_ENV === 'production'
if (isProduction) {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    console.error('FATAL: In production JWT_SECRET must be set and at least 32 characters.')
    process.exit(1)
  }
}

const app = express()
const PORT = process.env.PORT || 3001

// Upload directory: same as multer (UPLOAD_DIR or cwd-relative "uploads")
const uploadDir = path.resolve(process.cwd(), process.env.UPLOAD_DIR || 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// CORS: exact origins (spelling matters — use "career" not "carrer")
const corsOptions: cors.CorsOptions = {
  origin: [
    'https://career-connect-frontend.vercel.app', // production (copy from Vercel → Domains)
    process.env.FRONTEND_URL,
    'http://localhost:5173',
  ].filter(Boolean) as string[],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded files from same path multer uses
app.use('/uploads', express.static(uploadDir))

// Routes (no /api prefix — frontend uses VITE_API_URL = origin only)
app.use('/auth', authRoutes)
app.use('/companies', companyRoutes)
app.use('/jobs', jobRoutes)
app.use('/applications', applicationRoutes)
app.use('/referrer', referrerRoutes)
app.use('/job-seekers', jobSeekerRoutes)
app.use('/referral-invitations', referralInvitationRoutes)
app.use('/invitations', invitationRoutes)
app.use('/admin', adminRoutes)

// Root endpoint - Backend status
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Career Connect Backend is working! 🚀',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/auth',
      companies: '/companies',
      jobs: '/jobs',
      applications: '/applications',
      referrer: '/referrer',
      jobSeekers: '/job-seekers',
    },
  })
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Career Connect API is running' })
})

// Error handling
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

