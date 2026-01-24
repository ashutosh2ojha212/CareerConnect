import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth'
import { upload } from '../utils/upload'
import path from 'path'
import fs from 'fs'

const router = express.Router()
const prisma = new PrismaClient()

// Check if user has already applied for a job (by jobId)
router.get('/check', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user!.id
    const { jobId, employeeId } = req.query

    if (jobId && typeof jobId === 'string') {
      const existingApplication = await prisma.referralApplication.findFirst({
        where: {
          jobPostId: jobId,
          userId,
        },
        select: {
          id: true,
          status: true,
        },
      })

      return res.json({
        hasApplied: !!existingApplication,
        application: existingApplication || null,
      })
    }

    // Check by employeeId (get their latest job post)
    if (employeeId && typeof employeeId === 'string') {
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

      if (!employee || !employee.company.jobPosts[0]) {
        return res.json({
          hasApplied: false,
          application: null,
        })
      }

      const jobPostId = employee.company.jobPosts[0].id
      const existingApplication = await prisma.referralApplication.findFirst({
        where: {
          jobPostId,
          userId,
        },
        select: {
          id: true,
          status: true,
        },
      })

      return res.json({
        hasApplied: !!existingApplication,
        application: existingApplication || null,
        jobPostId,
      })
    }

    return res.status(400).json({ message: 'jobId or employeeId is required' })
  } catch (error) {
    next(error)
  }
})

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
  upload.any(), // Accept any file field name
  async (req: AuthRequest, res, next) => {
    try {
      const userId = req.user!.id
      const { employeeId } = req.params
      const files = req.files as Express.Multer.File[]
      const file = files && files.length > 0 ? files[0] : null

      // Extract form data (excluding files)
      const formData: Record<string, any> = {}
      Object.keys(req.body).forEach((key) => {
        formData[key] = req.body[key]
      })
      
      // Process uploaded files and add to formData
      let fileUrl: string | null = null
      if (files && files.length > 0) {
        files.forEach((uploadedFile) => {
          const fileUrlValue = `/uploads/${uploadedFile.filename}`
          const fieldName = uploadedFile.fieldname || 'resume'
          
          // Add file URL to formData with the field name
          formData[fieldName] = fileUrlValue
          
          // Store first file URL in resumeUrl for backward compatibility
          if (!fileUrl) {
            fileUrl = fileUrlValue
          }
        })
      }
      
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

      // Check if user has already applied for this job
      if (jobPostId) {
        const existingApplication = await prisma.referralApplication.findFirst({
          where: {
            jobPostId,
            userId,
          },
        })

        if (existingApplication) {
          return res.status(409).json({ 
            message: 'You have already applied for this job',
            applicationId: existingApplication.id,
          })
        }
      }

      try {
        const application = await prisma.referralApplication.create({
          data: {
            userId,
            employeeId,
            jobPostId,
            formData: formDataJson,
            resumeUrl: fileUrl, // Store in resumeUrl for backward compatibility
          },
        })

        res.status(201).json({
          id: application.id,
          message: 'Application submitted successfully',
        })
      } catch (error: any) {
        // Handle unique constraint violation
        if (error.code === 'P2002' || error.message?.includes('Unique constraint')) {
          return res.status(409).json({ 
            message: 'You have already applied for this job',
          })
        }
        throw error
      }

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

// Delete application
router.delete('/:applicationId', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { applicationId } = req.params
    const userId = req.user!.id

    // Find the application and verify ownership
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

    // Verify user owns the job post (only job creator can delete)
    if (!application.jobPost || application.jobPost.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized: Only the job creator can delete applications' })
    }

    // Hard delete the application
    await prisma.referralApplication.delete({
      where: { id: applicationId },
    })

    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

// Download file from application
router.get('/:applicationId/files/:fieldId', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { applicationId, fieldId } = req.params
    const userId = req.user!.id

    // Find the application and verify ownership
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

    // Verify user owns the job post (only job creator can download)
    if (!application.jobPost || application.jobPost.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized: Only the job creator can download files' })
    }

    // Parse form data to find the file field
    let parsedFormData: Record<string, any> = {}
    try {
      parsedFormData = typeof application.formData === 'string' 
        ? JSON.parse(application.formData) 
        : application.formData
    } catch (e) {
      parsedFormData = {}
    }

    // Get file URL from formData or resumeUrl
    let fileUrl: string | null = null

    // Check if fieldId matches a form field
    if (parsedFormData[fieldId]) {
      fileUrl = parsedFormData[fieldId]
    } else if (fieldId === 'resume' && application.resumeUrl) {
      fileUrl = application.resumeUrl
    }

    if (!fileUrl) {
      return res.status(404).json({ message: 'File not found' })
    }

    // Remove leading slash if present and construct full path
    const uploadDir = process.env.UPLOAD_DIR || './uploads'
    const fileName = fileUrl.startsWith('/uploads/') 
      ? fileUrl.replace('/uploads/', '') 
      : fileUrl
    const filePath = path.join(uploadDir, fileName)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not available' })
    }

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`)

    // Stream the file
    const fileStream = fs.createReadStream(filePath)
    fileStream.pipe(res)
  } catch (error) {
    next(error)
  }
})

export default router

