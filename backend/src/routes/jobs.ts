import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Get my job posts
router.get('/my-posts', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user!.id

    const jobPosts = await prisma.jobPost.findMany({
      where: { userId },
      include: {
        company: {
          select: {
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
    })

    const formattedPosts = jobPosts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      company: post.company,
      applicantCount: post._count.applications,
      createdAt: post.createdAt,
    }))

    res.json(formattedPosts)
  } catch (error) {
    next(error)
  }
})

// Create job post
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user!.id
    const { title, description, companyId, formFields } = req.body

    if (!title || !description || !companyId) {
      return res.status(400).json({ message: 'Title, description, and company are required' })
    }

    const jobPost = await prisma.jobPost.create({
      data: {
        title,
        description,
        companyId,
        userId,
        customFormFields: {
          create: (formFields || []).map((field: any, index: number) => ({
            label: field.label,
            type: field.type,
            required: field.required || false,
            order: index,
          })),
        },
      },
      include: {
        company: {
          select: {
            name: true,
          },
        },
      },
    })

    res.status(201).json({
      id: jobPost.id,
      title: jobPost.title,
      description: jobPost.description,
      company: jobPost.company,
    })
  } catch (error) {
    next(error)
  }
})

// Get applicants for a job
router.get('/:jobId/applicants', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { jobId } = req.params
    const userId = req.user!.id

    // Verify job belongs to user
    const jobPost = await prisma.jobPost.findFirst({
      where: {
        id: jobId,
        userId,
      },
    })

    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' })
    }

    const applications = await prisma.referralApplication.findMany({
      where: { jobPostId: jobId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const formattedApplications = applications.map((app) => ({
      id: app.id,
      name: app.user.name,
      email: app.user.email,
      formData: app.formData,
      resumeUrl: app.resumeUrl,
      status: app.status,
      createdAt: app.createdAt,
    }))

    res.json(formattedApplications)
  } catch (error) {
    next(error)
  }
})

// Get form fields for a job
router.get('/:jobId/form-fields', authenticate, async (req, res, next) => {
  try {
    const { jobId } = req.params

    const formFields = await prisma.jobCustomFormField.findMany({
      where: { jobPostId: jobId },
      orderBy: {
        order: 'asc',
      },
    })

    res.json(formFields)
  } catch (error) {
    next(error)
  }
})

export default router

