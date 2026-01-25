import express from 'express'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()

// POST /api/referral-invitations — employee invites a candidate (job seeker)
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const inviterId = req.user!.id
    const { candidateId } = req.body as { candidateId?: string }

    if (!candidateId || typeof candidateId !== 'string') {
      return res.status(400).json({ message: 'candidateId is required' })
    }

    // Ensure inviter is an employee
    const inviterEmployee = await prisma.employeeProfile.findUnique({
      where: { userId: inviterId },
    })
    if (!inviterEmployee) {
      return res.status(403).json({ message: 'Only employees can send referral invitations' })
    }

    // Candidate must exist and be a different user
    if (candidateId === inviterId) {
      return res.status(400).json({ message: 'Cannot invite yourself' })
    }

    const candidate = await prisma.user.findUnique({
      where: { id: candidateId },
    })
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' })
    }

    const model = (prisma as any).referralInvitation
    if (!model?.create) {
      return res.status(503).json({ message: 'Referral invitations not available. Run prisma generate and migrate.' })
    }

    // Prevent duplicate invitations
    const existing = await model.findFirst({
      where: { inviterId, candidateId },
    })
    if (existing) {
      return res.status(409).json({ message: 'Invitation already sent to this candidate' })
    }

    const invitation = await model.create({
      data: { inviterId, candidateId, status: 'pending' },
    })

    res.status(201).json({
      id: invitation.id,
      inviterId: invitation.inviterId,
      candidateId: invitation.candidateId,
      status: invitation.status,
      createdAt: invitation.createdAt,
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Invitation already sent to this candidate' })
    }
    next(error)
  }
})

// GET /api/referral-invitations/me — job seeker gets their own invitations (for notification)
router.get('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const candidateId = req.user!.id
    const model = (prisma as any).referralInvitation
    if (!model?.findMany) {
      return res.json([])
    }

    const invitations = await model.findMany({
      where: { candidateId },
      include: {
        inviter: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    res.json(
      invitations.map((inv: any) => ({
        id: inv.id,
        inviterId: inv.inviterId,
        inviterName: inv.inviter?.name,
        candidateId: inv.candidateId,
        status: inv.status,
        createdAt: inv.createdAt,
      }))
    )
  } catch (error) {
    next(error)
  }
})

export default router
