import express from 'express'
import crypto from 'crypto'
import { prisma } from '../lib/prisma'
import { hashPassword, comparePassword } from '../utils/bcrypt'
import { generateToken } from '../utils/jwt'
import { sendPasswordResetEmail, sendWelcomeEmail } from '../utils/email'
import { sendOtpEmail } from '../services/emailService'

const router = express.Router()
const OTP_EXPIRY_MINUTES = 10

/** Send welcome email and set welcomeEmailSent. Non-blocking; do not await before sending response. */
async function sendWelcomeEmailAndMarkSent(userId: string, email: string, name: string) {
  try {
    await sendWelcomeEmail(email, name ?? 'there')
    await prisma.user.update({ where: { id: userId }, data: { welcomeEmailSent: true } })
  } catch (err: any) {
    console.error('Welcome email failed:', err?.message ?? err)
  }
}

/**
 * One-time promote first admin (for production when you can't run the script locally).
 * Set ADMIN_EMAIL and ADMIN_PROMOTE_SECRET in Railway, then call:
 *   GET /auth/promote-admin?secret=YOUR_ADMIN_PROMOTE_SECRET
 * or POST /auth/promote-admin with body { "secret": "YOUR_ADMIN_PROMOTE_SECRET" }
 * After use, remove ADMIN_PROMOTE_SECRET from Railway to disable.
 */
router.get('/promote-admin', async (req, res, next) => {
  try {
    const email = process.env.ADMIN_EMAIL
    const secret = process.env.ADMIN_PROMOTE_SECRET
    const provided = (req.query.secret as string) || (req.body && (req.body as { secret?: string }).secret)
    if (!email || !secret || provided !== secret) {
      return res.status(400).json({
        message: 'Promote admin not configured or invalid. Set ADMIN_EMAIL and ADMIN_PROMOTE_SECRET in env and call with ?secret=ADMIN_PROMOTE_SECRET',
      })
    }
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(404).json({ message: `User not found: ${email}. Sign in once with that email, then call this again.` })
    }
    await prisma.user.update({ where: { email }, data: { isAdmin: true } })
    console.log(`✅ ${email} promoted to admin via /auth/promote-admin`)
    return res.json({ success: true, message: `${email} is now an admin. Sign in again and go to /admin` })
  } catch (error) {
    next(error)
  }
})
router.post('/promote-admin', async (req, res, next) => {
  try {
    const email = process.env.ADMIN_EMAIL
    const secret = process.env.ADMIN_PROMOTE_SECRET
    const provided = (req.query.secret as string) || (req.body && (req.body as { secret?: string }).secret)
    if (!email || !secret || provided !== secret) {
      return res.status(400).json({
        message: 'Promote admin not configured or invalid. Set ADMIN_EMAIL and ADMIN_PROMOTE_SECRET in env and call with body { "secret": "ADMIN_PROMOTE_SECRET" }',
      })
    }
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(404).json({ message: `User not found: ${email}. Sign in once with that email, then call this again.` })
    }
    await prisma.user.update({ where: { email }, data: { isAdmin: true } })
    console.log(`✅ ${email} promoted to admin via /auth/promote-admin`)
    return res.json({ success: true, message: `${email} is now an admin. Sign in again and go to /admin` })
  } catch (error) {
    next(error)
  }
})

// Register/signup — does NOT create User. Creates OtpVerification only. User created after OTP verify.
const registerHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Reject if User already exists (fully registered)
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email. Please sign in.' })
    }

    // Delete any existing pending OTP for this email (allow re-signup)
    await prisma.otpVerification.deleteMany({ where: { email } })

    const hashedPassword = await hashPassword(password)
    const otp = String(Math.floor(100000 + Math.random() * 900000))
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)

    await prisma.otpVerification.create({
      data: {
        email,
        otpHash,
        fullName: name.trim(),
        passwordHash: hashedPassword,
        expiresAt,
      },
    })

    try {
      await sendOtpEmail({
        toEmail: email,
        otp,
        expiryMinutes: OTP_EXPIRY_MINUTES,
      })
    } catch (emailErr: any) {
      console.error('OTP email failed:', emailErr?.message)
      await prisma.otpVerification.deleteMany({ where: { email } })
      return res.status(500).json({
        message: 'Failed to send verification email. Please try again later.',
      })
    }

    res.status(201).json({ success: true, message: 'OTP sent to email' })
  } catch (error) {
    next(error)
  }
}
router.post('/register', registerHandler)
router.post('/signup', registerHandler)

// Verify OTP — creates User only after OTP is valid. Returns { success: true }.
router.post('/verify-otp', async (req, res, next) => {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' })
    }

    const otpHash = crypto.createHash('sha256').update(String(otp).trim()).digest('hex')
    const otpRecord = await prisma.otpVerification.findFirst({
      where: {
        email,
        otpHash,
        expiresAt: { gt: new Date() },
      },
    })

    if (!otpRecord) {
      return res.status(400).json({
        message: 'Invalid or expired OTP. Please request a new one.',
      })
    }

    // Check user doesn't already exist (edge case)
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      await prisma.otpVerification.delete({ where: { id: otpRecord.id } })
      return res.status(400).json({ message: 'Account already exists. Please sign in.' })
    }

    // Create User and delete OTP in transaction
    const user = await prisma.$transaction(async (tx) => {
      const u = await tx.user.create({
        data: {
          email: otpRecord.email,
          name: otpRecord.fullName,
          password: otpRecord.passwordHash,
          status: 'ACTIVE',
        },
      })
      await tx.otpVerification.delete({ where: { id: otpRecord.id } })
      return u
    })

    sendWelcomeEmailAndMarkSent(user.id, user.email, user.name ?? 'there').catch(() => {})

    res.json({ success: true, message: 'OTP verified' })
  } catch (error) {
    next(error)
  }
})

// Resend OTP — only works for pending signups (OtpVerification exists, no User yet)
router.post('/resend-otp', async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    const otpRecord = await prisma.otpVerification.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
    })

    if (!otpRecord) {
      return res.status(400).json({
        message: 'No pending verification for this email. Please sign up again.',
      })
    }

    await prisma.otpVerification.deleteMany({ where: { email } })

    const otp = String(Math.floor(100000 + Math.random() * 900000))
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex')
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)

    await prisma.otpVerification.create({
      data: {
        email,
        otpHash,
        fullName: otpRecord.fullName,
        passwordHash: otpRecord.passwordHash,
        expiresAt,
      },
    })

    try {
      await sendOtpEmail({
        toEmail: email,
        otp,
        expiryMinutes: OTP_EXPIRY_MINUTES,
      })
    } catch (emailErr: any) {
      console.error('Resend OTP failed:', emailErr?.message)
      return res.status(500).json({
        message: 'Failed to send verification email. Please try again later.',
      })
    }

    res.json({ sent: true })
  } catch (error) {
    next(error)
  }
})

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, role: true, isAdmin: true, password: true, deactivated: true, status: true },
    })

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    if (user.deactivated) {
      return res.status(403).json({ message: 'Account is deactivated' })
    }

    if (user.status === 'UNVERIFIED' || user.status === 'pending_verification') {
      return res.status(403).json({
        error: 'Email not verified',
        email: user.email,
      })
    }

    // Verify password
    const isValid = await comparePassword(password, user.password)

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(user.id)

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        accessRole: user.isAdmin ? 'admin' : 'user',
      },
      token,
    })
  } catch (error) {
    next(error)
  }
})

// Forgot Password - Generate token and send email
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body

    console.log('🔐 Forgot password request for email:', email)

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Return 404 if user does NOT exist (as per requirements)
    if (!user) {
      console.log('❌ User not found for email:', email)
      return res.status(404).json({ 
        success: false, 
        message: 'This email is not registered. Please sign up first.' 
      })
    }

    console.log('✅ User found, generating reset token...')

    // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

    console.log('🔑 Generated token (first 10 chars):', resetToken.substring(0, 10) + '...')
    console.log('⏰ Token expires at:', resetTokenExpiry.toISOString())

    // Save token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetTokenExpiry,
      },
    })

    console.log('💾 Token saved to database')

    // Send password reset email
    try {
      await sendPasswordResetEmail(user.email, resetToken)
      console.log('✅ Password reset email sent successfully')
      res.json({ 
        success: true, 
        message: "We've sent a password reset link to your email." 
      })
    } catch (emailError: any) {
      console.error('❌ Email sending failed:', emailError.message)
      console.error('Full error details:', emailError)
      
      // Log detailed error for debugging
      if (emailError.code === 'EAUTH') {
        console.error('🔴 AUTHENTICATION ERROR - Check your SMTP credentials!')
        console.error('   Make sure you\'re using a Gmail App Password, not your regular password')
        console.error('   Get App Password from: https://myaccount.google.com/apppasswords')
      }
      
      // Return error with details (in development, show more info)
      const errorMessage = process.env.NODE_ENV === 'development' 
        ? `Failed to send email: ${emailError.message}` 
        : 'Failed to send reset email. Please check your email configuration or try again later.'
      
      return res.status(500).json({ 
        success: false, 
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? {
          code: emailError.code,
          message: emailError.message,
        } : undefined
      })
    }
  } catch (error: any) {
    console.error('❌ Error in forgot-password route:', error)
    next(error)
  }
})

// Get Reset Password - Validate token
router.get('/reset-password/:token', async (req, res, next) => {
  try {
    const { token } = req.params

    if (!token) {
      return res.status(400).json({ message: 'Token is required' })
    }

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date(), // Token not expired
        },
      },
      select: {
        id: true,
        email: true,
      },
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' })
    }

    res.json({ valid: true, email: user.email })
  } catch (error) {
    next(error)
  }
})

// Reset Password - Update password with token
router.post('/reset-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body

    console.log('🔐 Reset password request received')
    console.log('   Token (first 10 chars):', token ? token.substring(0, 10) + '...' : 'missing')

    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: 'Token and new password are required' })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })
    }

    // Find user with valid token
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date(), // Token not expired
        },
      },
    })

    if (!user) {
      console.log('❌ Invalid or expired token')
      return res.status(400).json({ success: false, message: 'Invalid or expired token' })
    }

    console.log('✅ Valid token found for user:', user.email)

    // Hash new password
    const hashedPassword = await hashPassword(newPassword)

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    })

    console.log('✅ Password reset successfully for user:', user.email)
    res.json({ success: true, message: 'Password reset successfully' })
  } catch (error: any) {
    console.error('❌ Error in reset-password route:', error)
    next(error)
  }
})

// Google OAuth - Initiate OAuth flow
router.get('/google', (req, res) => {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/auth/google/callback'
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

  if (!GOOGLE_CLIENT_ID) {
    return res.status(500).json({ 
      message: 'Google OAuth not configured. Please set GOOGLE_CLIENT_ID in backend/.env' 
    })
  }

  // Build Google OAuth URL
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
    state: req.query.state as string || 'default', // Optional: pass state for redirect
  })

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  
  // Redirect to Google
  res.redirect(googleAuthUrl)
})

// Google OAuth - Callback handler
router.get('/google/callback', async (req, res, next) => {
  try {
    const { code, state } = req.query
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
    const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/auth/google/callback'
    const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

    if (!code) {
      return res.redirect(`${FRONTEND_URL}/signin?error=oauth_cancelled`)
    }

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      return res.redirect(`${FRONTEND_URL}/signin?error=oauth_not_configured`)
    }

    // Exchange authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code as string,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json()
      console.error('Google token exchange error:', error)
      return res.redirect(`${FRONTEND_URL}/signin?error=token_exchange_failed`)
    }

    const tokens = (await tokenResponse.json()) as { access_token: string }
    const { access_token } = tokens

    // Get user info from Google
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!userInfoResponse.ok) {
      return res.redirect(`${FRONTEND_URL}/signin?error=userinfo_failed`)
    }

    const userInfo = (await userInfoResponse.json()) as { email?: string; name?: string; picture?: string }
    const { email, name } = userInfo

    if (!email || !name) {
      return res.redirect(`${FRONTEND_URL}/signin?error=missing_user_info`)
    }

    // Check if user exists
    type GoogleAuthUser = { id: string; email: string; name: string | null; role: string | null; isAdmin: boolean; deactivated: boolean }
    let user: GoogleAuthUser | null = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, role: true, isAdmin: true, deactivated: true },
    })

    if (!user) {
      // Create new user with Google OAuth — email pre-verified by Google, so ACTIVE
      const hashedPassword = await hashPassword(Math.random().toString(36) + Date.now().toString())
      const created = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          status: 'ACTIVE',
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isAdmin: true,
          deactivated: true,
        },
      })
      user = created
      // Send welcome email only on first signup; non-blocking (do not await)
      sendWelcomeEmailAndMarkSent(user.id, user.email, user.name ?? 'there').catch(() => {})
    }

    if (user.deactivated) {
      return res.redirect(`${FRONTEND_URL}/signin?error=account_deactivated`)
    }

    // Generate JWT token
    const token = generateToken(user.id)

    // Redirect to frontend with token
    const redirectUrl = new URL(`${FRONTEND_URL}/auth/callback`)
    redirectUrl.searchParams.set('token', token)
    redirectUrl.searchParams.set('user', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      accessRole: user.isAdmin ? 'admin' : 'user',
    }))

    res.redirect(redirectUrl.toString())
  } catch (error: any) {
    console.error('Google OAuth callback error:', error?.message ?? error)
    if (error?.stack) console.error(error.stack)
    const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
    res.redirect(`${FRONTEND_URL}/signin?error=oauth_error`)
  }
})

export default router

