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

    // Skills is optional - allow empty array or undefined
    if (skills !== undefined && skills !== null && !Array.isArray(skills)) {
      return res.status(400).json({ message: 'Skills must be an array' })
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
        skills: skills && skills.length > 0 ? JSON.stringify(skills) : null,
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
    const { status } = req.query
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

    // Build where clause with optional status filter
    const whereClause: any = { jobPostId: jobId }
    if (status && typeof status === 'string' && ['pending', 'approved', 'rejected'].includes(status)) {
      whereClause.status = status
    }

    const applications = await prisma.referralApplication.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        jobPost: {
          select: {
            id: true,
            title: true,
            companyName: true,
            experience: true,
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

    // Get job post with custom form fields
    const jobPostWithFields = await prisma.jobPost.findUnique({
      where: { id: jobId },
      include: {
        customFormFields: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    })

    // Get custom form fields from job post, or fallback to default
    let baseFormFields = jobPostWithFields?.customFormFields || []
    
    // If no custom fields, use default fields
    if (baseFormFields.length === 0) {
      baseFormFields = [
        { id: 'name', label: 'Full Name', type: 'text', required: true, order: 0 },
        { id: 'email', label: 'Email', type: 'email', required: true, order: 1 },
        { id: 'phone', label: 'Phone Number', type: 'tel', required: false, order: 2 },
        { id: 'experience', label: 'Years of Experience', type: 'number', required: false, order: 3 },
        { id: 'resume', label: 'Resume (PDF)', type: 'file', required: true, order: 4 },
      ]
    }

    const formattedApplications = applications.map((app) => {
      let parsedFormData = {}
      try {
        parsedFormData = typeof app.formData === 'string' ? JSON.parse(app.formData) : app.formData
      } catch (e) {
        parsedFormData = {}
      }

      // Build complete form fields list - include all fields from formData
      const formDataKeys = new Set(Object.keys(parsedFormData))
      const fieldMap = new Map(baseFormFields.map(f => [f.id, f]))
      
      // Add any fields from formData that aren't in baseFormFields
      formDataKeys.forEach(key => {
        if (!fieldMap.has(key) && key !== 'jobPostId' && key !== 'employeeId') {
          // Infer field type and label from key name
          let type = 'text'
          let label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
          
          if (key.toLowerCase().includes('email')) type = 'email'
          else if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('tel')) type = 'tel'
          else if (key.toLowerCase().includes('experience') || key.toLowerCase().includes('year')) type = 'number'
          else if (key.toLowerCase().includes('resume') || key.toLowerCase().includes('file')) type = 'file'
          
          fieldMap.set(key, { id: key, label, type, required: false, order: 999 })
        }
      })

      // Convert map to array and sort by order
      const allFormFields = Array.from(fieldMap.values()).sort((a, b) => (a.order || 0) - (b.order || 0))

      // Ensure resume URL is in formData if it exists
      // Find the resume/file field in formFields
      const resumeField = allFormFields.find(f => f.type === 'file')
      
      if (app.resumeUrl) {
        // If we have a resume field defined, use its ID
        if (resumeField && !parsedFormData[resumeField.id]) {
          parsedFormData[resumeField.id] = app.resumeUrl
        } else if (!resumeField) {
          // If no resume field defined but we have a resumeUrl, add it
          parsedFormData['resume'] = app.resumeUrl
        } else if (resumeField && parsedFormData[resumeField.id] !== app.resumeUrl) {
          // Update with actual resumeUrl if different
          parsedFormData[resumeField.id] = app.resumeUrl
        }
      }

      return {
        id: app.id,
        name: app.user.name,
        email: app.user.email,
        formData: parsedFormData,
        formFields: allFormFields, // Include all form field metadata
        resumeUrl: app.resumeUrl,
        status: app.status,
        createdAt: app.createdAt,
        jobPost: app.jobPost
          ? {
              id: app.jobPost.id,
              title: app.jobPost.title,
              companyName: app.jobPost.companyName,
              experience: app.jobPost.experience,
              company: app.jobPost.company,
            }
          : null,
      }
    })

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

    // Skills is optional - allow empty array or undefined
    if (skills !== undefined && skills !== null && !Array.isArray(skills)) {
      return res.status(400).json({ message: 'Skills must be an array' })
    }

    const updatedJob = await prisma.jobPost.update({
      where: { id: jobId },
      data: {
        title,
        companyName: companyName.trim(),
        description: description || null,
        experience: Number(experience),
        location: location.trim(),
        skills: skills && skills.length > 0 ? JSON.stringify(skills) : null,
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

