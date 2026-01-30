import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    name: string | null
    role: string | null
    isAdmin: boolean
  }
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      userId: string
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, role: true, isAdmin: true, deactivated: true },
    })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    if (user.deactivated) {
      return res.status(403).json({ message: 'Account is deactivated' })
    }

    req.user = { id: user.id, email: user.email, name: user.name, role: user.role, isAdmin: user.isAdmin }
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

/** Require authenticated user to be admin. Use after authenticate middleware. */
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden – Admins only' })
  }
  next()
}

