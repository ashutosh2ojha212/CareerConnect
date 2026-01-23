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
      companyName: post.companyName,
      description: post.description,
      experience: post.experience,
      location: post.location,
      skills: post.skills ? JSON.parse(post.skills) : [],
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
    const { companyName, title, description, experience, location, skills, companyId } = req.body

    if (!companyName || companyName.trim() === '') {
      return res.status(400).json({ message: 'Company name is required' })
    }

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    if (experience === undefined || experience === null) {
      return res.status(400).json({ message: 'Minimum years of experience is required' })
    }

    if (!location || location.trim() === '') {
      return res.status(400).json({ message: 'Job location is required' })
    }

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ message: 'At least one required skill is required' })
    }

    // Get user's company from their employee profile, or create a default one
    let employeeProfile = await prisma.employeeProfile.findUnique({
      where: { userId },
      select: { companyId: true },
    })

    // If employee profile doesn't exist, create one with a default company
    if (!employeeProfile) {
      // Get or create a default company
      let defaultCompany = await prisma.company.findFirst({
        orderBy: { createdAt: 'asc' },
      })

      if (!defaultCompany) {
        // Create a default company if none exists
        defaultCompany = await prisma.company.create({
          data: {
            name: 'Default Company',
            description: 'Default company for employees without a profile',
          },
        })
      }

      // Create employee profile with default company
      await prisma.employeeProfile.create({
        data: {
          userId,
          companyId: defaultCompany.id,
        },
      })

      employeeProfile = {
        companyId: defaultCompany.id,
      }
    }

    const jobPost = await prisma.jobPost.create({
      data: {
        title,
        companyName: companyName.trim(),
        description: description || null,
        experience: Number(experience),
        location: location.trim(),
        skills: JSON.stringify(skills),
        companyId: employeeProfile.companyId,
        userId,
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
      companyName: jobPost.companyName,
      description: jobPost.description,
      experience: jobPost.experience,
      location: jobPost.location,
      skills: jobPost.skills ? JSON.parse(jobPost.skills) : [],
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

// Get a single job post by ID
router.get('/:jobId', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { jobId } = req.params
    const userId = req.user!.id

    const jobPost = await prisma.jobPost.findFirst({
      where: {
        id: jobId,
        userId,
      },
      include: {
        company: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!jobPost) {
      return res.status(404).json({ message: 'Job post not found' })
    }

    res.json({
      id: jobPost.id,
      title: jobPost.title,
      companyName: jobPost.companyName,
      description: jobPost.description,
      experience: jobPost.experience,
      location: jobPost.location,
      skills: jobPost.skills ? JSON.parse(jobPost.skills) : [],
      company: jobPost.company,
      createdAt: jobPost.createdAt,
      updatedAt: jobPost.updatedAt,
    })
  } catch (error) {
    next(error)
  }
})

// Update job post
router.put('/:jobId', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { jobId } = req.params
    const userId = req.user!.id
    const { companyName, title, description, experience, location, skills } = req.body

    // Verify job belongs to user
    const existingJob = await prisma.jobPost.findFirst({
      where: {
        id: jobId,
        userId,
      },
    })

    if (!existingJob) {
      return res.status(404).json({ message: 'Job post not found' })
    }

    if (!companyName || companyName.trim() === '') {
      return res.status(400).json({ message: 'Company name is required' })
    }

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    if (experience === undefined || experience === null) {
      return res.status(400).json({ message: 'Minimum years of experience is required' })
    }

    if (!location || location.trim() === '') {
      return res.status(400).json({ message: 'Job location is required' })
    }

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ message: 'At least one required skill is required' })
    }

    const updatedJob = await prisma.jobPost.update({
      where: { id: jobId },
      data: {
        title,
        companyName: companyName.trim(),
        description: description || null,
        experience: Number(experience),
        location: location.trim(),
        skills: JSON.stringify(skills),
      },
      include: {
        company: {
          select: {
            name: true,
          },
        },
      },
    })

    res.json({
      id: updatedJob.id,
      title: updatedJob.title,
      companyName: updatedJob.companyName,
      description: updatedJob.description,
      experience: updatedJob.experience,
      location: updatedJob.location,
      skills: updatedJob.skills ? JSON.parse(updatedJob.skills) : [],
      company: updatedJob.company,
    })
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

