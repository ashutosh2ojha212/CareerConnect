import express from 'express'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()
// Get all companies — only exclude "Default Company". Do not filter by userId or employee membership.
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const companies = await prisma.company.findMany({
      where: {
        name: { not: 'Default Company' },
      },
      include: {
        _count: {
          select: { employees: true },
        },
      },
    })

    const formatted = companies.map((company) => ({
      id: company.id,
      name: company.name,
      description: company.description,
      logo: company.logo,
      employeeCount: company._count.employees,
    }))

    res.json(formatted)
  } catch (error) {
    next(error)
  }
})

// Get company details with job posts. Job seeker sees all companies except Default.
// jobPosts: only exclude current user's own posts (jobPost.userId != currentUserId).
router.get('/:companyId', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { companyId } = req.params
    const userId = req.user!.id

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        jobPosts: {
          where: {
            userId: { not: userId },
          },
          include: {
            user: {
              select: { id: true, name: true },
            },
            _count: { select: { applications: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        employees: {
          where: { userId: { not: userId } },
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
        _count: { select: { employees: true } },
      },
    })

    if (!company || company.name === 'Default Company') {
      return res.status(404).json({ message: 'Company not found' })
    }

    const formattedJobPosts = company.jobPosts.map((job) => ({
      id: job.id,
      title: job.title,
      companyName: job.companyName,
      description: job.description,
      experience: job.experience,
      location: job.location,
      skills: job.skills ? JSON.parse(job.skills) : [],
      applicantCount: job._count.applications,
      createdAt: job.createdAt,
      postedBy: {
        id: job.user.id,
        name: job.user.name,
      },
    }))

    res.json({
      id: company.id,
      name: company.name,
      description: company.description,
      logo: company.logo,
      employeeCount: company._count.employees,
      jobPosts: formattedJobPosts,
    })
  } catch (error) {
    next(error)
  }
})

// Get employees by company (filtered to exclude current user)
router.get('/:companyId/employees', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { companyId } = req.params
    const userId = req.user!.id

    const employees = await prisma.employeeProfile.findMany({
      where: { 
        companyId,
        userId: {
          not: userId, // Exclude current user
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    const formattedEmployees = employees.map((emp) => ({
      id: emp.user.id,
      name: emp.user.name,
      email: emp.user.email,
      position: emp.position,
      company: {
        id: emp.company.id,
        name: emp.company.name,
      },
    }))

    res.json(formattedEmployees)
  } catch (error) {
    next(error)
  }
})

export default router

