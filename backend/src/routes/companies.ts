import express from 'express'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()
// Get all companies that have employees OR job posts
// Job seekers: grouped by JobPost.companyName (Bajaj, Visa, Google). Exclude "Default Company" only if real names exist.
// Employees/referrers: from Company table, exclude Default and self-only.
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user!.id
    const isJobSeeker = req.user!.role !== 'referrer'

    if (isJobSeeker) {
      // Group by companyName from job posts; exclude "Default Company" only when other names exist
      const jobs = await prisma.jobPost.findMany({
        select: { companyName: true, companyId: true, userId: true },
      })
      const byName = new Map<string, { companyId: string; jobPostCount: number; referrerIds: Set<string> }>()
      for (const j of jobs) {
        const n = (j.companyName ?? '').trim()
        if (!n) continue
        const cur = byName.get(n)
        if (!cur) {
          byName.set(n, { companyId: j.companyId, jobPostCount: 1, referrerIds: new Set([j.userId]) })
        } else {
          cur.jobPostCount += 1
          cur.referrerIds.add(j.userId)
        }
      }
      const names = Array.from(byName.keys())
      const hasReal = names.some((n) => n !== 'Default Company')
      const list = names
        .filter((n) => !hasReal || n !== 'Default Company')
        .map((name) => {
          const rec = byName.get(name)!
          return {
            id: encodeURIComponent(name),
            name,
            description: null as string | null,
            logo: null as string | null,
            jobPostCount: rec.jobPostCount,
            employeeCount: rec.referrerIds.size,
          }
        })
      return res.json(list)
    }

    const whereClause = {
      name: { not: 'Default Company' },
      OR: [
        { employees: { some: { userId: { not: userId } } } },
        { jobPosts: { some: { userId: { not: userId } } } },
      ],
    }
    const companies = await prisma.company.findMany({
      where: whereClause,
      include: {
        _count: { select: { employees: true, jobPosts: true } },
      },
    })
    const formatted = companies.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      logo: c.logo,
      jobPostCount: c._count.jobPosts,
      employeeCount: c._count.employees,
    }))
    res.json(formatted)
  } catch (error) {
    next(error)
  }
})

// Get company details with job posts. Supports :companyId as UUID (Company.id) or encoded company name.
router.get('/:companyId', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { companyId } = req.params
    const userId = req.user!.id
    const isUuid = /^[0-9a-f-]{36}$/i.test(companyId)

    if (isUuid) {
      const company = await prisma.company.findUnique({
        where: { id: companyId },
        include: {
          jobPosts: {
            where: { userId: { not: userId } },
            include: {
              user: { select: { id: true, name: true } },
              _count: { select: { applications: true } },
            },
            orderBy: { createdAt: 'desc' },
          },
          _count: { select: { employees: true } },
        },
      })
      if (!company) return res.status(404).json({ message: 'Company not found' })
      const displayName = company.name === 'Default Company' ? (company.jobPosts[0]?.companyName ?? company.name) : company.name
      const formattedJobPosts = company.jobPosts.map((j) => ({
        id: j.id,
        title: j.title,
        companyName: j.companyName,
        description: j.description,
        experience: j.experience,
        location: j.location,
        skills: j.skills ? (typeof j.skills === 'string' ? JSON.parse(j.skills) : j.skills) : [],
        applicantCount: j._count.applications,
        createdAt: j.createdAt,
        postedBy: { id: j.user.id, name: j.user.name },
      }))
      return res.json({
        id: company.id,
        name: displayName,
        description: company.description,
        logo: company.logo,
        employeeCount: company._count.employees,
        jobPosts: formattedJobPosts,
      })
    }

    const companyName = decodeURIComponent(companyId)
    const jobPosts = await prisma.jobPost.findMany({
      where: { companyName, userId: { not: userId } },
      include: {
        user: { select: { id: true, name: true } },
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    const referrerIds = new Set(jobPosts.map((j) => j.userId))
    return res.json({
      id: companyId,
      name: companyName,
      description: null,
      logo: null,
      employeeCount: referrerIds.size,
      jobPosts: jobPosts.map((j) => ({
        id: j.id,
        title: j.title,
        companyName: j.companyName,
        description: j.description,
        experience: j.experience,
        location: j.location,
        skills: j.skills ? (typeof j.skills === 'string' ? JSON.parse(j.skills) : j.skills) : [],
        applicantCount: j._count.applications,
        createdAt: j.createdAt,
        postedBy: { id: j.user.id, name: j.user.name },
      })),
    })
  } catch (error) {
    next(error)
  }
})

// Get employees/referrers by company. :companyId can be UUID or encoded company name.
// Excludes current user. For by-name, returns users who posted jobs for that companyName; company display uses that name.
router.get('/:companyId/employees', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { companyId } = req.params
    const userId = req.user!.id
    const isUuid = /^[0-9a-f-]{36}$/i.test(companyId)

    if (isUuid) {
      const employees = await prisma.employeeProfile.findMany({
        where: { companyId, userId: { not: userId } },
        include: {
          user: { select: { id: true, name: true, email: true } },
          company: { select: { id: true, name: true } },
        },
      })
      let displayName = employees[0]?.company?.name ?? 'Company'
      if (displayName === 'Default Company') {
        const first = await prisma.jobPost.findFirst({
          where: { companyId },
          select: { companyName: true },
        })
        if (first?.companyName) displayName = first.companyName
      }
      const list = employees.map((emp) => ({
        id: emp.user.id,
        name: emp.user.name,
        email: emp.user.email,
        position: emp.position,
        company: { id: emp.company.id, name: displayName },
      }))
      return res.json(list)
    }

    const companyName = decodeURIComponent(companyId)
    const jobs = await prisma.jobPost.findMany({
      where: { companyName, userId: { not: userId } },
      select: { userId: true },
      distinct: ['userId'],
    })
    const ids = jobs.map((j) => j.userId)
    const users = await prisma.user.findMany({
      where: { id: { in: ids } },
      select: { id: true, name: true, email: true },
    })
    const empProfiles = await prisma.employeeProfile.findMany({
      where: { userId: { in: ids } },
      select: { userId: true, position: true },
    })
    const posMap = new Map(empProfiles.map((e) => [e.userId, e.position]))
    const list = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      position: posMap.get(u.id) ?? null,
      company: { id: companyId, name: companyName },
    }))
    res.json(list)
  } catch (error) {
    next(error)
  }
})

export default router

