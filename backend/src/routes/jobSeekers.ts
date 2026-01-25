import express from 'express'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest } from '../middleware/auth'
import { upload } from '../utils/upload'

const router = express.Router()
function parseSkills(skills: string | null): string[] {
  if (!skills) return []
  try {
    const parsed = JSON.parse(skills)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return skills.split(',').map((s) => s.trim()).filter(Boolean)
  }
}

function parseLocations(s: string | null): string[] {
  if (!s) return []
  try {
    const parsed = JSON.parse(s)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return s.split(',').map((s) => s.trim()).filter(Boolean)
  }
}

// Get current user's job seeker profile (must be before /:id)
router.get('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const model = (prisma as any).jobSeekerProfile
    if (!model || typeof model.findUnique !== 'function') {
      return res.status(503).json({
        message: 'Profile service not ready. Run: cd backend && npx prisma generate && npx prisma migrate deploy',
      })
    }
    const userId = req.user!.id
    const profile = await model.findUnique({
      where: { userId },
    })
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }
    const p = profile as Record<string, unknown>
    res.json({
      id: profile.id,
      userId: profile.userId,
      fullName: profile.fullName,
      email: profile.email,
      experience: profile.experience,
      primaryRole: profile.primaryRole,
      skills: parseSkills(profile.skills),
      jobPreferences: profile.jobPreferences,
      preferredLocations: parseLocations((p.preferredLocations as string) ?? null),
      profileSummary: (p.profileSummary as string) ?? null,
      resumeUrl: (p.resumeUrl as string) ?? null,
      profileImageURL: profile.profileImageURL,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    })
  } catch (error) {
    next(error)
  }
})

// Create or update current user's job seeker profile (JSON)
router.put('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const model = (prisma as any).jobSeekerProfile
    if (!model || typeof model.upsert !== 'function') {
      return res.status(503).json({
        message: 'Profile service not ready. Run: cd backend && npx prisma generate && npx prisma migrate deploy',
      })
    }
    const userId = req.user!.id
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true, email: true } })
    if (!user) return res.status(401).json({ message: 'Unauthorized' })

    const {
      fullName,
      email,
      experience,
      primaryRole,
      jobPreferences,
      preferredLocations,
      profileSummary,
      resumeUrl,
      skills,
    } = req.body as {
      fullName?: string
      email?: string
      experience?: number
      primaryRole?: string
      jobPreferences?: string
      preferredLocations?: string[] | string
      profileSummary?: string
      resumeUrl?: string
      skills?: string[]
    }

    const preferredLocationsStr =
      preferredLocations == null
        ? undefined
        : Array.isArray(preferredLocations)
        ? JSON.stringify(preferredLocations)
        : typeof preferredLocations === 'string'
        ? preferredLocations
        : undefined
    const skillsStr = skills == null ? undefined : Array.isArray(skills) ? JSON.stringify(skills) : typeof skills === 'string' ? skills : undefined

    const data = {
      fullName: fullName ?? user.name,
      email: email ?? user.email,
      experience: experience != null ? Number(experience) : null,
      primaryRole: primaryRole || null,
      jobPreferences: jobPreferences || null,
      preferredLocations: preferredLocationsStr ?? undefined,
      profileSummary: profileSummary || null,
      resumeUrl: resumeUrl || undefined,
      skills: skillsStr ?? undefined,
    }

    const profile = await model.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    })

    res.json({
      id: profile.id,
      userId: profile.userId,
      fullName: profile.fullName,
      email: profile.email,
      experience: profile.experience,
      primaryRole: profile.primaryRole,
      skills: parseSkills(profile.skills),
      jobPreferences: profile.jobPreferences,
      preferredLocations: parseLocations(profile.preferredLocations),
      profileSummary: profile.profileSummary,
      resumeUrl: profile.resumeUrl,
      profileImageURL: profile.profileImageURL,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    })
  } catch (error) {
    next(error)
  }
})

// Upload resume for current user's profile
router.post('/me/resume', authenticate, upload.single('resume'), async (req: AuthRequest, res, next) => {
  try {
    const model = (prisma as any).jobSeekerProfile
    if (!model || typeof model.upsert !== 'function') {
      return res.status(503).json({
        message: 'Profile service not ready. Run: cd backend && npx prisma generate && npx prisma migrate deploy',
      })
    }
    const userId = req.user!.id
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }
    const resumeUrl = `/uploads/${req.file.filename}`

    await model.upsert({
      where: { userId },
      create: {
        userId,
        fullName: req.user!.name ?? 'User',
        email: req.user!.email ?? '',
        resumeUrl,
      },
      update: { resumeUrl },
    })

    res.json({ resumeUrl })
  } catch (error) {
    next(error)
  }
})

// Get job seekers with search (for employees browsing candidates)
// Excludes profiles whose user is an employee in the same company as the requesting employee
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const model = (prisma as any).jobSeekerProfile
    if (!model || typeof model.findMany !== 'function') {
      return res.json([])
    }
    const userId = req.user!.id
    const { search } = req.query
    const searchQuery = typeof search === 'string' ? search.trim().toLowerCase() : ''

    // Same-company employee user ids to exclude (viewer is employee, don't show colleagues)
    let excludeUserIds: string[] = []
    const myEmployee = await prisma.employeeProfile.findUnique({
      where: { userId },
      select: { companyId: true },
    })
    if (myEmployee) {
      const sameCompanyUserIds = await prisma.employeeProfile.findMany({
        where: { companyId: myEmployee.companyId },
        select: { userId: true },
      })
      excludeUserIds = sameCompanyUserIds.map((e) => e.userId)
    }

    // Get all job seeker profiles except same-company employees
    let profiles = await model.findMany({
      where: excludeUserIds.length ? { userId: { notIn: excludeUserIds } } : undefined,
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
    const formattedProfiles = profiles.map((profile) => ({
      id: profile.id,
      userId: profile.userId,
      fullName: profile.fullName,
      email: profile.email,
      experience: profile.experience,
      primaryRole: profile.primaryRole,
      skills: parseSkills(profile.skills),
      jobPreferences: profile.jobPreferences,
      preferredLocations: parseLocations((profile as any).preferredLocations),
      profileSummary: (profile as any).profileSummary ?? null,
      resumeUrl: (profile as any).resumeUrl ?? null,
      profileImageURL: profile.profileImageURL,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    }))

    res.json(formattedProfiles)
  } catch (error) {
    next(error)
  }
})

// Get a single job seeker profile
router.get('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const model = (prisma as any).jobSeekerProfile
    if (!model || typeof model.findUnique !== 'function') {
      return res.status(503).json({
        message: 'Profile service not ready. Run: cd backend && npx prisma generate && npx prisma migrate deploy',
      })
    }
    const { id } = req.params

    const profile = await model.findUnique({
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
      preferredLocations: parseLocations((profile as any).preferredLocations),
      profileSummary: (profile as any).profileSummary ?? null,
      resumeUrl: (profile as any).resumeUrl ?? null,
      profileImageURL: profile.profileImageURL,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    })
  } catch (error) {
    next(error)
  }
})

export default router
