import express from 'express'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()

// POST /api/invitations — employee sends invite (fromEmployeeId, toJobSeekerId, optional jobPostId)
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const fromEmployeeId = req.user!.id
    const { toJobSeekerId, jobPostId } = req.body as { toJobSeekerId?: string; jobPostId?: string }

    if (!toJobSeekerId || typeof toJobSeekerId !== 'string') {
      return res.status(400).json({ message: 'toJobSeekerId is required' })
    }

    const emp = await prisma.employeeProfile.findUnique({ where: { userId: fromEmployeeId } })
    if (!emp) {
      return res.status(403).json({ message: 'Only employees can send invitations' })
    }

    if (toJobSeekerId === fromEmployeeId) {
      return res.status(400).json({ message: 'Cannot invite yourself' })
    }

    const candidate = await prisma.user.findUnique({ where: { id: toJobSeekerId } })
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' })
    }

    let resolvedJobPostId: string | null = jobPostId && typeof jobPostId === 'string' ? jobPostId : null
    if (!resolvedJobPostId) {
      const latest = await prisma.jobPost.findFirst({
        where: { userId: fromEmployeeId },
        orderBy: { createdAt: 'desc' },
        select: { id: true },
      })
      resolvedJobPostId = latest?.id ?? null
    }

    const model = (prisma as any).referralInvitation
    if (!model?.create) {
      return res.status(503).json({ message: 'Invitations not available. Run prisma generate and migrate.' })
    }

    const existing = await model.findFirst({
      where: { inviterId: fromEmployeeId, candidateId: toJobSeekerId },
    })
    if (existing) {
      return res.status(409).json({ message: 'Invitation already sent to this candidate' })
    }

    const inv = await model.create({
      data: {
        inviterId: fromEmployeeId,
        candidateId: toJobSeekerId,
        jobPostId: resolvedJobPostId,
        status: 'PENDING',
      },
    })

    res.status(201).json({
      id: inv.id,
      fromEmployeeId: inv.inviterId,
      toJobSeekerId: inv.candidateId,
      jobPostId: inv.jobPostId ?? null,
      status: inv.status,
      createdAt: inv.createdAt,
    })
  } catch (e: any) {
    if (e.code === 'P2002') {
      return res.status(409).json({ message: 'Invitation already sent to this candidate' })
    }
    next(e)
  }
})

// GET /api/invitations/me — job seeker lists received invitations (with job/company/employee)
router.get('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const toJobSeekerId = req.user!.id
    const model = (prisma as any).referralInvitation
    if (!model?.findMany) {
      return res.json([])
    }

    const rows = await model.findMany({
      where: { candidateId: toJobSeekerId },
      include: {
        inviter: { select: { id: true, name: true } },
        jobPost: {
          select: {
            id: true,
            title: true,
            companyName: true,
            companyId: true,
            company: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    const invitations = rows.map((r: any) => ({
      id: r.id,
      fromEmployeeId: r.inviterId,
      toJobSeekerId: r.candidateId,
      jobPostId: r.jobPostId ?? null,
      status: r.status === 'pending' ? 'PENDING' : r.status,
      createdAt: r.createdAt,
      inviterName: r.inviter?.name ?? 'Employee',
      jobTitle: r.jobPost?.title ?? null,
      companyName: r.jobPost?.company?.name ?? r.jobPost?.companyName ?? null,
      companyId: r.jobPost?.company?.id ?? null,
      employeeId: r.inviterId,
    }))

    res.json(invitations)
  } catch (error) {
    next(error)
  }
})

// PUT /api/invitations/:id/apply — job seeker marks invitation as APPLIED (after they applied)
router.put('/:id/apply', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user!.id
    const { id } = req.params
    const model = (prisma as any).referralInvitation
    if (!model?.update) {
      return res.status(503).json({ message: 'Invitations not available.' })
    }

    const inv = await model.findUnique({ where: { id } })
    if (!inv) {
      return res.status(404).json({ message: 'Invitation not found' })
    }
    if (inv.candidateId !== userId) {
      return res.status(403).json({ message: 'You can only apply to your own invitations' })
    }

    const updated = await model.update({
      where: { id },
      data: { status: 'APPLIED' },
    })

    res.json({
      id: updated.id,
      status: updated.status,
      jobPostId: updated.jobPostId,
      employeeId: updated.inviterId,
    })
  } catch (e: any) {
    if (e.code === 'P2025') {
      return res.status(404).json({ message: 'Invitation not found' })
    }
    next(e)
  }
})

export default router
