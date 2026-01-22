import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Get all companies
router.get('/', authenticate, async (req, res, next) => {
  try {
    const companies = await prisma.company.findMany({
      include: {
        _count: {
          select: {
            employees: true,
          },
        },
      },
    })

    const companiesWithCount = companies.map((company) => ({
      id: company.id,
      name: company.name,
      description: company.description,
      logo: company.logo,
      employeeCount: company._count.employees,
    }))

    res.json(companiesWithCount)
  } catch (error) {
    next(error)
  }
})

// Get employees by company
router.get('/:companyId/employees', authenticate, async (req, res, next) => {
  try {
    const { companyId } = req.params

    const employees = await prisma.employeeProfile.findMany({
      where: { companyId },
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

