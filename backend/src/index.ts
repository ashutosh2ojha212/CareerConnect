import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
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

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

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
    message: 'Carrier Connect Backend is working! 🚀',
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
  res.json({ status: 'ok', message: 'Carrier Connect API is running' })
})

// Error handling
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

