import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth'
import { upload } from '../utils/upload'

const router = express.Router()
const prisma = new PrismaClient()

// Get my applications (job seeker)
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user!.id

    const applications = await prisma.referralApplication.findMany({
      where: { userId },
      include: {
        jobPost: {
          include: {
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const formattedApplications = applications.map((app) => ({
      id: app.id,
      employee: {
        name: 'Employee', // TODO: Get employee name from employeeId
        company: {
          name: app.jobPost?.company?.name || 'Unknown',
        },
      },
      status: app.status,
      createdAt: app.createdAt,
    }))

    res.json(formattedApplications)
  } catch (error) {
    next(error)
  }
})

// Submit application
router.post(
  '/:employeeId',
  authenticate,
  upload.single('resume'),
  async (req: AuthRequest, res, next) => {
    try {
      const userId = req.user!.id
      const { employeeId } = req.params
      const file = req.file

      // Extract form data (excluding file)
      const formData: Record<string, any> = {}
      Object.keys(req.body).forEach((key) => {
        if (key !== 'resume') {
          formData[key] = req.body[key]
        }
      })
      
      // Convert formData to JSON string for SQLite
      const formDataJson = JSON.stringify(formData)

      // Get employee's company and job posts
      const employee = await prisma.employeeProfile.findUnique({
        where: { userId: employeeId },
        include: {
          company: {
            include: {
              jobPosts: {
                take: 1,
                orderBy: {
                  createdAt: 'desc',
                },
              },
            },
          },
        },
      })

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' })
      }

      const jobPostId = employee.company.jobPosts[0]?.id || null

      const application = await prisma.referralApplication.create({
        data: {
          userId,
          employeeId,
          jobPostId,
          formData: formDataJson,
          resumeUrl: file ? `/uploads/${file.filename}` : null,
        },
      })

      res.status(201).json({
        id: application.id,
        message: 'Application submitted successfully',
      })
    } catch (error) {
      next(error)
    }
  }
)

// Update application status
router.patch('/:applicationId/status', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { applicationId } = req.params
    const { status } = req.body

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    const application = await prisma.referralApplication.findUnique({
      where: { id: applicationId },
      include: {
        jobPost: {
          select: {
            userId: true,
          },
        },
      },
    })

    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }

    // Verify user owns the job post
    if (application.jobPost?.userId !== req.user!.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    const updated = await prisma.referralApplication.update({
      where: { id: applicationId },
      data: { status },
    })

    res.json({
      id: updated.id,
      status: updated.status,
    })
  } catch (error) {
    next(error)
  }
})

// Get form fields for employee (for job seeker to see what fields to fill)
router.get('/:employeeId/form-fields', authenticate, async (req, res, next) => {
  try {
    const { employeeId } = req.params

    // Get employee's company and latest job post
    const employee = await prisma.employeeProfile.findUnique({
      where: { userId: employeeId },
      include: {
        company: {
          include: {
            jobPosts: {
              take: 1,
              orderBy: {
                createdAt: 'desc',
              },
              include: {
                customFormFields: {
                  orderBy: {
                    order: 'asc',
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    const formFields = employee.company.jobPosts[0]?.customFormFields || []

    // Default fields if none exist
    if (formFields.length === 0) {
      res.json([
        { id: 'name', label: 'Full Name', type: 'text', required: true },
        { id: 'email', label: 'Email', type: 'email', required: true },
        { id: 'phone', label: 'Phone Number', type: 'tel', required: false },
        { id: 'resume', label: 'Resume (PDF)', type: 'file', required: true },
      ])
    } else {
      res.json(formFields)
    }
  } catch (error) {
    next(error)
  }
})

export default router

