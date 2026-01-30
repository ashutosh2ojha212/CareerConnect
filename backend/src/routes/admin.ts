import express from 'express'
import { prisma } from '../lib/prisma'
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// All admin routes require authentication + admin role
router.use(authenticate)
router.use(requireAdmin)

// GET /api/admin/users — list all users
router.get('/users', async (req: AuthRequest, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isAdmin: true,
        deactivated: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/admin/users/:id
router.delete('/users/:id', async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params
    if (id === req.user!.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' })
    }
    await prisma.user.delete({ where: { id } })
    res.json({ success: true })
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'User not found' })
    next(error)
  }
})

// PATCH /api/admin/users/:id/role — promote/demote admin (body: { role: "admin" | "user" })
router.patch('/users/:id/role', async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params
    const { role } = req.body as { role?: string }
    if (!role || (role !== 'admin' && role !== 'user')) {
      return res.status(400).json({ message: 'role must be "admin" or "user"' })
    }
    const isAdmin = role === 'admin'
    const updated = await prisma.user.update({
      where: { id },
      data: { isAdmin },
      select: { id: true, email: true, isAdmin: true },
    })
    res.json(updated)
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'User not found' })
    next(error)
  }
})

// PATCH /api/admin/users/:id/status — activate/deactivate (body: { deactivated: boolean })
router.patch('/users/:id/status', async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params
    const { deactivated } = req.body as { deactivated?: boolean }
    if (typeof deactivated !== 'boolean') {
      return res.status(400).json({ message: 'deactivated must be a boolean' })
    }
    if (id === req.user!.id && deactivated) {
      return res.status(400).json({ message: 'Cannot deactivate your own account' })
    }
    const updated = await prisma.user.update({
      where: { id },
      data: { deactivated },
      select: { id: true, email: true, deactivated: true },
    })
    res.json(updated)
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'User not found' })
    next(error)
  }
})

// GET /api/admin/job-posts
router.get('/job-posts', async (req: AuthRequest, res, next) => {
  try {
    const jobPosts = await prisma.jobPost.findMany({
      include: {
        company: { select: { id: true, name: true } },
        user: { select: { id: true, name: true, email: true } },
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    res.json(
      jobPosts.map((p) => ({
        id: p.id,
        title: p.title,
        companyName: p.companyName,
        company: p.company,
        description: p.description,
        experience: p.experience,
        location: p.location,
        skills: p.skills ? JSON.parse(p.skills) : [],
        createdAt: p.createdAt,
        creator: p.user,
        applicantCount: p._count.applications,
      }))
    )
  } catch (error) {
    next(error)
  }
})

// DELETE /api/admin/job-posts/:id
router.delete('/job-posts/:id', async (req: AuthRequest, res, next) => {
  try {
    await prisma.jobPost.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Job post not found' })
    next(error)
  }
})

// GET /api/admin/applications
router.get('/applications', async (req: AuthRequest, res, next) => {
  try {
    const applications = await prisma.referralApplication.findMany({
      where: { deleted: { not: true } },
      include: {
        user: { select: { id: true, name: true, email: true } },
        jobPost: {
          select: {
            id: true,
            title: true,
            companyName: true,
            user: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    res.json(applications)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/admin/applications/:id
router.delete('/applications/:id', async (req: AuthRequest, res, next) => {
  try {
    await prisma.referralApplication.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Application not found' })
    next(error)
  }
})

// GET /api/admin/referrals — all referral invitations with inviter, candidate, job details
router.get('/referrals', async (req: AuthRequest, res, next) => {
  try {
    const referrals = await prisma.referralInvitation.findMany({
      include: {
        inviter: { select: { id: true, name: true, email: true } },
        candidate: { select: { id: true, name: true, email: true } },
        jobPost: { select: { id: true, title: true, companyName: true, location: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    const payload = referrals.map((r) => ({
      id: r.id,
      inviter: r.inviter
        ? { id: r.inviter.id, name: r.inviter.name, email: r.inviter.email }
        : null,
      candidate: r.candidate
        ? { id: r.candidate.id, name: r.candidate.name, email: r.candidate.email }
        : null,
      job: r.jobPost
        ? {
            id: r.jobPost.id,
            title: r.jobPost.title,
            company: r.jobPost.companyName,
            location: r.jobPost.location ?? null,
          }
        : null,
      status: r.status,
      createdAt: r.createdAt,
    }))
    res.json(payload)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/admin/referrals/:id
router.delete('/referrals/:id', async (req: AuthRequest, res, next) => {
  try {
    await prisma.referralInvitation.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Referral not found' })
    next(error)
  }
})

// GET /api/admin/stats
router.get('/stats', async (req: AuthRequest, res, next) => {
  try {
    const [totalUsers, employeesCount, jobSeekersCount, jobPostsCount, referralsGroup] =
      await Promise.all([
        prisma.user.count(),
        prisma.employeeProfile.count(),
        prisma.jobSeekerProfile.count(),
        prisma.jobPost.count(),
        prisma.referralInvitation.groupBy({
          by: ['status'],
          _count: { status: true },
        }),
      ])

    const referralsSent = await prisma.referralInvitation.count()
    const pendingReferrals =
      referralsGroup.find((g) => g.status === 'PENDING')?._count.status ?? 0
    const acceptedReferrals =
      referralsGroup.find((g) => g.status === 'APPLIED')?._count.status ?? 0
    const rejectedReferrals = 0 // schema has PENDING | APPLIED only

    res.json({
      totalUsers,
      employees: employeesCount,
      jobSeekers: jobSeekersCount,
      jobPosts: jobPostsCount,
      referralsSent,
      pendingReferrals,
      acceptedReferrals,
      rejectedReferrals,
    })
  } catch (error) {
    next(error)
  }
})

export default router
