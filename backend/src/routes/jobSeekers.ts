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
    return String(s).split(',').map((x) => x.trim()).filter(Boolean)
  }
}

function parsePreferredRoles(s: string | null): string[] {
  if (!s) return []
  try {
    const parsed = JSON.parse(s)
    return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : (s ? [s] : [])
  } catch {
    return String(s).split(',').map((x) => x.trim()).filter(Boolean)
  }
}

/** Profile completion 0–100 (same 9 fields as frontend). Only candidates >50% are visible to recruiters. */
function profileCompletionPercent(profile: {
  fullName?: string | null
  email?: string | null
  primaryRole?: string | null
  experience?: number | null
  jobPreferences?: string | null
  preferredLocations?: string | null
  skills?: string | null
  resumeUrl?: string | null
  profileSummary?: string | null
}): number {
  const filled = (v: unknown) => {
    if (v == null) return false
    if (typeof v === 'string') return v.trim().length > 0
    if (Array.isArray(v)) return v.length > 0
    if (typeof v === 'number') return true
    return false
  }
  const roles = parsePreferredRoles(profile.jobPreferences ?? null)
  const locs = parseLocations(profile.preferredLocations ?? null)
  const count = [
    filled(profile.fullName),
    filled(profile.email),
    filled(profile.primaryRole),
    profile.experience != null && typeof profile.experience === 'number',
    roles.length > 0,
    locs.length > 0,
    filled(profile.skills),
    filled(profile.resumeUrl),
    filled(profile.profileSummary),
  ].filter(Boolean).length
  return Math.round((count / 9) * 100)
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
// Return all job seeker profiles except the current user. Do NOT filter by company.
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const model = (prisma as any).jobSeekerProfile
    if (!model || typeof model.findMany !== 'function') {
      return res.json([])
    }
    const userId = req.user!.id
    const { search } = req.query
    const searchQuery = typeof search === 'string' ? search.trim().toLowerCase() : ''

    let profiles = await model.findMany({
      where: { userId: { not: userId } },
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

    // Only show candidates with profile completion > 50% to recruiters
    profiles = profiles.filter((profile: Record<string, unknown>) => profileCompletionPercent(profile as any) > 50)

    // Filter by search query if provided
    if (searchQuery) {
      profiles = profiles.filter((profile: { fullName?: string | null; primaryRole?: string | null; jobPreferences?: string | null; skills?: string | null; experience?: number | null }) => {
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

    // Format response — always return preferredRoles, preferredLocations, skills as arrays (no raw JSON)
    const formattedProfiles = profiles.map((profile: { id: string; userId: string; fullName?: string | null; email?: string | null; experience?: number | null; primaryRole?: string | null; jobPreferences?: string | null; skills?: string | null; profileImageURL?: string | null; createdAt: unknown; updatedAt: unknown; preferredLocations?: unknown; profileSummary?: string | null; resumeUrl?: string | null }) => ({
      id: profile.id,
      userId: profile.userId,
      fullName: profile.fullName,
      email: profile.email,
      experience: profile.experience,
      primaryRole: profile.primaryRole,
      skills: parseSkills(profile.skills ?? null),
      preferredRoles: parsePreferredRoles(profile.jobPreferences ?? null),
      preferredLocations: parseLocations((profile as any).preferredLocations ?? null),
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
        skillsArray = profile.skills.split(',').map((s: string) => s.trim()).filter(Boolean)
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
      preferredRoles: parsePreferredRoles(profile.jobPreferences),
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
