import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Get job seekers with search
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { search } = req.query
    const searchQuery = typeof search === 'string' ? search.trim().toLowerCase() : ''

    // Get all job seeker profiles
    let profiles = await prisma.jobSeekerProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    // Filter by search query if provided
    if (searchQuery) {
      profiles = profiles.filter((profile) => {
        const fullName = (profile.fullName || '').toLowerCase()
        const primaryRole = (profile.primaryRole || '').toLowerCase()
        const jobPreferences = (profile.jobPreferences || '').toLowerCase()
        const skills = (profile.skills || '').toLowerCase()
        const experience = profile.experience?.toString() || ''

        return (
          fullName.includes(searchQuery) ||
          primaryRole.includes(searchQuery) ||
          jobPreferences.includes(searchQuery) ||
          skills.includes(searchQuery) ||
          experience.includes(searchQuery)
        )
      })
    }

    // Format response
    const formattedProfiles = profiles.map((profile) => {
      // Parse skills if it's JSON, otherwise treat as comma-separated
      let skillsArray: string[] = []
      if (profile.skills) {
        try {
          skillsArray = JSON.parse(profile.skills)
        } catch {
          skillsArray = profile.skills.split(',').map((s) => s.trim()).filter(Boolean)
        }
      }

      return {
        id: profile.id,
        userId: profile.userId,
        fullName: profile.fullName,
        email: profile.email,
        experience: profile.experience,
        primaryRole: profile.primaryRole,
        skills: skillsArray,
        jobPreferences: profile.jobPreferences,
        profileImageURL: profile.profileImageURL,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      }
    })

    res.json(formattedProfiles)
  } catch (error) {
    next(error)
  }
})

// Get a single job seeker profile
router.get('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params

    const profile = await prisma.jobSeekerProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
    })

    if (!profile) {
      return res.status(404).json({ message: 'Job seeker profile not found' })
    }

    // Parse skills
    let skillsArray: string[] = []
    if (profile.skills) {
      try {
        skillsArray = JSON.parse(profile.skills)
      } catch {
        skillsArray = profile.skills.split(',').map((s) => s.trim()).filter(Boolean)
      }
    }

    res.json({
      id: profile.id,
      userId: profile.userId,
      fullName: profile.fullName,
      email: profile.email,
      experience: profile.experience,
      primaryRole: profile.primaryRole,
      skills: skillsArray,
      jobPreferences: profile.jobPreferences,
      profileImageURL: profile.profileImageURL,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    })
  } catch (error) {
    next(error)
  }
})

export default router
