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

// CORS: allow FRONTEND_URL and localhost for dev
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
].filter(Boolean) as string[]
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    cb(null, false) // disallow unknown origins (browser will block)
  },
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded files from same path multer uses
app.use('/uploads', express.static(uploadDir))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/referrer', referrerRoutes)
app.use('/api/job-seekers', jobSeekerRoutes)
app.use('/api/referral-invitations', referralInvitationRoutes)
app.use('/api/invitations', invitationRoutes)
app.use('/api/admin', adminRoutes)

// Root endpoint - Backend status
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Career Connect Backend is working! 🚀',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      companies: '/api/companies',
      jobs: '/api/jobs',
      applications: '/api/applications',
      referrer: '/api/referrer',
      jobSeekers: '/api/job-seekers'
    }
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Career Connect API is running' })
})

// Error handling
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

