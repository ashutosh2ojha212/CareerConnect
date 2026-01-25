/**
 * Profile fields contributing to completion (equal weight each).
 * Each filled field adds 1/9 ≈ 11.11% toward 100%.
 */
const FIELDS = [
  'fullName',
  'email',
  'currentRole',
  'yearsExperience',
  'preferredJobRoles',
  'preferredLocations',
  'keySkills',
  'resumeUrl',
  'summary',
] as const

export interface ProfileForCompletion {
  fullName?: string | null
  email?: string | null
  primaryRole?: string | null
  experience?: number | null
  jobPreferences?: string | string[] | null
  preferredLocations?: string[] | null
  skills?: string[] | null
  resumeUrl?: string | null
  profileSummary?: string | null
}

function isFilled(value: unknown): boolean {
  if (value == null) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'number') return true
  return false
}

/**
 * Returns a value 0–100 representing profile completion.
 * Uses: fullName, email, currentRole (primaryRole), yearsExperience (experience),
 * preferredJobRoles (jobPreferences), preferredLocations, keySkills (skills), resumeUrl, summary (profileSummary).
 * Each field has equal weight.
 */
export function calculateProfileCompletion(profile: ProfileForCompletion | null): number {
  if (!profile) return 0

  const roles: string[] = Array.isArray(profile.jobPreferences)
    ? profile.jobPreferences as string[]
    : (typeof profile.jobPreferences === 'string' && profile.jobPreferences.trim()
        ? (() => {
            try {
              const parsed = JSON.parse(profile.jobPreferences)
              return Array.isArray(parsed) ? parsed : [profile.jobPreferences]
            } catch {
              return profile.jobPreferences.split(',').map((s) => s.trim()).filter(Boolean)
            }
          })()
        : [])

  const checks = [
    isFilled(profile.fullName),
    isFilled(profile.email),
    isFilled(profile.primaryRole),
    profile.experience != null && profile.experience !== '',
    roles.length > 0,
    isFilled(profile.preferredLocations),
    isFilled(profile.skills),
    isFilled(profile.resumeUrl),
    isFilled(profile.profileSummary),
  ]
  const count = checks.filter(Boolean).length
  return Math.round((count / FIELDS.length) * 100)
}
