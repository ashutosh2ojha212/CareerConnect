import express from 'express'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest } from '../middleware/auth'
import { upload } from '../utils/upload'
import path from 'path'
import fs from 'fs'
import {
  sendJobApplicationNotification,
  sendApplicationStatusNotification,
} from '../services/emailService'

const router = express.Router()
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
      where: { 
        userId,
        deleted: { not: true }, // Exclude soft-deleted applications
      },
      include: {
        jobPost: {
          include: {
            company: { select: { id: true, name: true } },
            user: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const formattedApplications = applications.map((app) => {
      const companyName = app.jobPost?.company?.name && app.jobPost.company.name !== 'Default Company'
        ? app.jobPost.company.name
        : (app.jobPost?.companyName || 'Company')
      return {
        id: app.id,
        jobPostId: app.jobPostId,
        jobTitle: app.jobPost?.title ?? null,
        companyName,
        employee: {
          id: app.jobPost?.user?.id,
          name: app.jobPost?.user?.name ?? 'Employee',
          company: { name: companyName },
        },
        status: app.status,
        createdAt: app.createdAt,
      }
    })

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
      const { jobPostId: providedJobPostId } = req.query // Get jobPostId from query if provided
      const files = req.files as Express.Multer.File[]
      const file = files && files.length > 0 ? files[0] : null

      // Extract form data (excluding files)
      const formData: Record<string, any> = {}
      Object.keys(req.body).forEach((key) => {
        formData[key] = req.body[key]
      })
      
      // Process uploaded files and add to formData (store original filename for download)
      let fileUrl: string | null = null
      if (files && files.length > 0) {
        files.forEach((uploadedFile) => {
          const fileUrlValue = `/uploads/${uploadedFile.filename}`
          const fieldName = uploadedFile.fieldname || 'resume'
          const originalName = (uploadedFile.originalname || 'Resume.pdf').replace(/[^\w\s\-_.]/g, '_').trim() || 'Resume.pdf'
          if (!originalName.toLowerCase().endsWith('.pdf')) {
            formData[fieldName + 'OriginalFilename'] = originalName + '.pdf'
          } else {
            formData[fieldName + 'OriginalFilename'] = originalName
          }
          formData[fieldName] = fileUrlValue
          if (!fileUrl) {
            fileUrl = fileUrlValue
          }
        })
      }
      
      // Store form data as JSON string
      const formDataJson = JSON.stringify(formData)

      // Determine jobPostId: use provided one, or get from employee's latest job post
      let jobPostId: string | null = null
      
      if (providedJobPostId && typeof providedJobPostId === 'string') {
        // Verify the job post exists and belongs to the employee
        const jobPost = await prisma.jobPost.findUnique({
          where: { id: providedJobPostId },
          select: {
            id: true,
            userId: true,
          },
        })
        
        // Check if the job post's userId matches the employeeId
        if (jobPost && jobPost.userId === employeeId) {
          jobPostId = providedJobPostId
        } else {
          return res.status(400).json({ message: 'Invalid job post or job post does not belong to this employee' })
        }
      } else {
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

        jobPostId = employee.company.jobPosts[0]?.id || null
      }

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
            message: 'You have already applied to this job.',
            applicationId: existingApplication.id,
          })
        }
      }

      const application = await prisma.referralApplication.create({
        data: {
          userId,
          employeeId,
          jobPostId,
          formData: formDataJson,
          resumeUrl: fileUrl, // Store in resumeUrl for backward compatibility
        },
        include: {
          user: { select: { name: true } },
          jobPost: {
            select: {
              title: true,
              companyName: true,
              user: { select: { email: true } },
            },
          },
        },
      })

      // Send email to job creator (employee)
      if (application.jobPost?.user?.email) {
        sendJobApplicationNotification({
          toEmail: application.jobPost.user.email,
          candidateName: application.user?.name ?? 'A candidate',
          jobTitle: application.jobPost.title,
          companyName: application.jobPost.companyName ?? 'Company',
          timestamp: application.createdAt,
        }).catch((e) => console.error('Job application email failed:', e?.message))
      }

      res.status(201).json({
        id: application.id,
        message: 'Application submitted successfully',
      })
    } catch (error: any) {
      if (error.code === 'P2002' || error.message?.includes('Unique constraint')) {
        return res.status(409).json({ 
          message: 'You have already applied to this job.',
        })
      }
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
      include: {
        user: { select: { email: true } },
        jobPost: { select: { title: true } },
      },
    })

    // Notify job seeker of status change (only for approved/rejected)
    if (
      (status === 'approved' || status === 'rejected') &&
      updated.user?.email &&
      updated.jobPost?.title
    ) {
      sendApplicationStatusNotification({
        toEmail: updated.user.email,
        jobTitle: updated.jobPost.title,
        status,
        timestamp: updated.updatedAt,
      }).catch((e) => console.error('Application status email failed:', e?.message))
    }

    res.json({
      id: updated.id,
      status: updated.status,
    })
  } catch (error) {
    next(error)
  }
})

// Get form fields for employee (for job seeker to see what fields to fill)
// Uses the employee's ReferralForm from setup-form, not job-level custom fields.
router.get('/:employeeId/form-fields', authenticate, async (req, res, next) => {
  try {
    const { employeeId } = req.params

    const employee = await prisma.employeeProfile.findUnique({
      where: { userId: employeeId },
      select: { userId: true },
    })

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    const referralForm = await prisma.referralForm.findUnique({
      where: { userId: employeeId },
    })

    if (!referralForm || !referralForm.fields) {
      return res.json([
        { id: 'name', label: 'Full Name', type: 'text', required: true, order: 0 },
        { id: 'email', label: 'Email', type: 'text', required: true, order: 1 },
        { id: 'phone', label: 'Phone Number', type: 'text', required: true, order: 2 },
        { id: 'experience', label: 'Years of Experience', type: 'number', required: true, order: 3 },
        { id: 'resume', label: 'Resume (PDF)', type: 'file', required: true, order: 4 },
      ])
    }

    const fields = JSON.parse(referralForm.fields) as Array<{ id: string; label: string; type: string }>
    const withOrder = (Array.isArray(fields) ? fields : []).map((f, i) => ({
      id: f.id,
      label: f.label,
      type: f.type || 'text',
      required: true,
      order: i,
    }))
    res.json(withOrder)
  } catch (error) {
    next(error)
  }
})

// Revoke application (only pending applications can be revoked)
router.delete('/:applicationId/revoke', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { applicationId } = req.params
    const userId = req.user!.id

    // Find the application and verify ownership
    const application = await prisma.referralApplication.findUnique({
      where: { id: applicationId },
    })

    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }

    // Verify user owns the application
    if (application.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized: You can only revoke your own applications' })
    }

    // Only allow revoking pending applications
    if (application.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending applications can be revoked' })
    }

    // Hard delete the application (revoke)
    await prisma.referralApplication.delete({
      where: { id: applicationId },
    })

    res.json({ success: true, message: 'Application revoked successfully' })
  } catch (error) {
    next(error)
  }
})

// Delete application (soft delete)
// - Job seeker: can delete their own accepted/rejected applications (use revoke for pending)
// - Employee (job owner): can delete any application (pending, approved, rejected) for their job
router.delete('/:applicationId', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { applicationId } = req.params
    const userId = req.user!.id

    const application = await prisma.referralApplication.findUnique({
      where: { id: applicationId },
      include: {
        jobPost: { select: { userId: true } },
      },
    })

    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }

    const isJobSeekerOwner = application.userId === userId
    const isJobOwner = application.jobPost?.userId === userId

    if (isJobOwner) {
      // Employee managing their job: allow delete for any status (pending, approved, rejected)
    } else if (isJobSeekerOwner) {
      // Job seeker: only allow deleting accepted or rejected (use revoke for pending)
      if (application.status === 'pending') {
        return res.status(400).json({ message: 'Pending applications cannot be deleted. Use revoke instead.' })
      }
    } else {
      return res.status(403).json({ message: 'Unauthorized: You can only delete your own applications' })
    }

    // Soft delete the application
    await prisma.referralApplication.update({
      where: { id: applicationId },
      data: { deleted: true },
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

    // Remove leading slash if present and construct full path (same base as multer/static)
    const uploadDir = path.resolve(process.cwd(), process.env.UPLOAD_DIR || 'uploads')
    const fileName = fileUrl.startsWith('/uploads/') 
      ? fileUrl.replace('/uploads/', '') 
      : fileUrl
    const filePath = path.join(uploadDir, fileName)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not available' })
    }

    // Prefer original filename from formData so downloads use the name the user uploaded
    const originalFilename = parsedFormData[fieldId + 'OriginalFilename']
    const safeFilename = typeof originalFilename === 'string' && originalFilename
      ? originalFilename.replace(/[^\w\s\-_.]/g, '_').trim() || path.basename(filePath)
      : path.basename(filePath)
    const downloadFilename = safeFilename.toLowerCase().endsWith('.pdf') ? safeFilename : safeFilename + '.pdf'

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${downloadFilename}"`)
    // Expose so frontend can read filename for download attribute (CORS)
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition')

    // Stream the file
    const fileStream = fs.createReadStream(filePath)
    fileStream.pipe(res)
  } catch (error) {
    next(error)
  }
})

export default router

