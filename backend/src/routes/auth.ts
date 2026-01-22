import express from 'express'
import { PrismaClient } from '@prisma/client'
import { hashPassword, comparePassword } from '../utils/bcrypt'
import { generateToken } from '../utils/jwt'

const router = express.Router()
const prisma = new PrismaClient()

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    // Generate token
    const token = generateToken(user.id)

    res.status(201).json({
      user,
      token,
    })
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
    })

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
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
      },
      token,
    })
  } catch (error) {
    next(error)
  }
})

// Forgot Password (placeholder - implement email service later)
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal if user exists
      return res.json({ message: 'If the email exists, a reset link has been sent' })
    }

    // TODO: Send password reset email
    // For now, just return success
    res.json({ message: 'If the email exists, a reset link has been sent' })
  } catch (error) {
    next(error)
  }
})

// Google OAuth
router.post('/google', async (req, res, next) => {
  try {
    const { idToken, email, name, picture } = req.body

    // For now, accept email and name directly
    // In production, verify idToken with Google's API
    if (!email || !name) {
      return res.status(400).json({ message: 'Email and name are required' })
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Create new user with Google OAuth
      // Note: For Google OAuth, we don't store a password
      // In production, you'd want to add an oauthProvider field or use a separate OAuth table
      const hashedPassword = await hashPassword(Math.random().toString(36) + Date.now().toString()) // Temporary secure password
      
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword, // In production, use a separate OAuth table
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      })
    }

    // Generate token
    const token = generateToken(user.id)

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    })
  } catch (error: any) {
    // Handle unique constraint violation (email already exists)
    if (error.code === 'P2002') {
      // User already exists, try to sign them in
      const user = await prisma.user.findUnique({
        where: { email: req.body.email },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      })

      if (user) {
        const token = generateToken(user.id)
        return res.json({
          user,
          token,
        })
      }
    }
    next(error)
  }
})

export default router

