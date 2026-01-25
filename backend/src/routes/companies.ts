import express from 'express'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()
// Get all companies that have employees OR job posts
// Exclude "Default Company" from display
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user!.id
    const isJobSeeker = req.user!.role !== 'referrer' // job_seeker or null/other → see all companies

    // Job seekers: see all companies that have at least one employee or one job post
    // (including Default Company, where many jobs live when employees have no real company).
    // Employees/referrers: exclude Default Company and companies where the only content is from themselves.
    const whereClause = isJobSeeker
      ? {
          OR: [
            { employees: { some: {} } },  // at least one employee
            { jobPosts: { some: {} } },   // at least one job post
          ],
        }
      : {
          name: { not: 'Default Company' },
          OR: [
            {
              employees: {
                some: { userId: { not: userId } },
              },
            },
            {
              jobPosts: {
                some: { userId: { not: userId } },
              },
            },
          ],
        }

    const companies = await prisma.company.findMany({
      where: whereClause,
      include: {
        _count: {
          select: { employees: true, jobPosts: true },
        },
      },
    })

    const formatted = companies.map((company) => ({
      id: company.id,
      name: company.name,
      description: company.description,
      logo: company.logo,
      employeeCount: company._count.employees,
      jobPostCount: company._count.jobPosts,
    }))

    res.json(formatted)
  } catch (error) {
    next(error)
  }
})

// Get company details with job posts. Job seeker sees all companies except Default.
// jobPosts: exclude only jobs created by current user (jobPost.userId != currentUserId).
// Also exclude jobs from user's own company if user is an employee.
router.get('/:companyId', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { companyId } = req.params
    const userId = req.user!.id

    // Build where clause for job posts
    // Exclude only jobs created by current user
    // Job seekers should see all jobs from all companies except their own posts
    const jobPostWhere: any = {
      userId: { not: userId }, // Exclude jobs created by current user
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        jobPosts: {
          where: jobPostWhere,
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

