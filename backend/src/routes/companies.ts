import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Get all companies (filtered to exclude companies where user is the only employee)
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user!.id

    // Get all companies with employees
    const companies = await prisma.company.findMany({
      include: {
        employees: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
        _count: {
          select: {
            employees: true,
          },
        },
      },
    })

    // Filter out companies where the current user is the only employee
    const filteredCompanies = companies
      .filter((company) => {
        // Get employees excluding the current user
        const otherEmployees = company.employees.filter(
          (emp) => emp.user.id !== userId
        )
        // Only include companies that have at least one other employee
        return otherEmployees.length > 0
      })
      .map((company) => ({
        id: company.id,
        name: company.name,
        description: company.description,
        logo: company.logo,
        employeeCount: company._count.employees,
      }))

    res.json(filteredCompanies)
  } catch (error) {
    next(error)
  }
})

// Get company details with job posts (filtered)
router.get('/:companyId', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { companyId } = req.params
    const userId = req.user!.id

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        jobPosts: {
          where: {
            // Exclude job posts created by the current user
            userId: {
              not: userId,
            },
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
            _count: {
              select: {
                applications: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        employees: {
          where: {
            // Exclude the current user from employee list
            userId: {
              not: userId,
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
          },
        },
        _count: {
          select: {
            employees: true,
          },
        },
      },
    })

    if (!company) {
      return res.status(404).json({ message: 'Company not found' })
    }

    // If no other employees exist, don't show the company
    if (company.employees.length === 0) {
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

