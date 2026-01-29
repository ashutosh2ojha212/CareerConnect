import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import api from '../../lib/api'

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api').replace(/\/api\/?$/, '')

interface JobSeekerProfile {
  id: string
  userId: string
  fullName: string
  email: string
  experience: number | null
  primaryRole: string | null
  skills: string[]
  preferredRoles?: string[]
  preferredLocations?: string[]
  profileSummary?: string | null
  resumeUrl?: string | null
  profileImageURL: string | null
  createdAt: string
  updatedAt: string
}

function ensureStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => (typeof x === 'string' ? x : String(x)))
  if (typeof v === 'string') {
    try {
      const p = JSON.parse(v)
      return Array.isArray(p) ? p.map(String) : v ? [v] : []
    } catch {
      return v ? v.split(',').map((s) => s.trim()).filter(Boolean) : []
    }
  }
  return []
}

interface JobPostOption {
  id: string
  title: string
  companyName: string
  location?: string
}

interface ViewProfileModalProps {
  profile: JobSeekerProfile | null
  onClose: () => void
}

function ViewProfileModal({ profile, onClose }: ViewProfileModalProps) {
  const [inviting, setInviting] = useState(false)
  const [showJobSelector, setShowJobSelector] = useState(false)
  const [jobPosts, setJobPosts] = useState<JobPostOption[]>([])
  const [invitedJobPostIds, setInvitedJobPostIds] = useState<string[]>([])
  const [loadingJobs, setLoadingJobs] = useState(false)
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)

  if (!profile) return null

  const getInitials = (name: string) => {
    const names = name.trim().split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const resumeHref = profile.resumeUrl
    ? (profile.resumeUrl.startsWith('http') ? profile.resumeUrl : `${API_BASE}${profile.resumeUrl}`)
    : null

  const fetchJobPostsAndInvited = async () => {
    setLoadingJobs(true)
    try {
      const [jobsRes, sentRes] = await Promise.all([
        api.get('/jobs/my-posts'),
        api.get(`/invitations/sent?candidateId=${encodeURIComponent(profile.userId)}`),
      ])
      setJobPosts(jobsRes.data || [])
      setInvitedJobPostIds((sentRes.data?.jobPostIds ?? []) as string[])
    } catch (e) {
      console.error('Failed to fetch job posts or sent invitations:', e)
      setJobPosts([])
      setInvitedJobPostIds([])
    } finally {
      setLoadingJobs(false)
    }
  }

  const handleInviteClick = () => {
    setSelectedJobId(null)
    fetchJobPostsAndInvited()
    setShowJobSelector(true)
  }

  const handleSendInvitation = async () => {
    if (!selectedJobId) {
      toast.error('Please select a job opening')
      return
    }
    const alreadyInvited = invitedJobPostIds.includes(selectedJobId)
    if (alreadyInvited) {
      toast.error('Invitation already sent to this candidate.')
      return
    }
    setInviting(true)
    try {
      await api.post('/invitations', {
        toJobSeekerId: profile.userId,
        jobPostId: selectedJobId,
      })
      toast.success('Invitation sent to the candidate.')
      setInvitedJobPostIds((prev) => (prev.includes(selectedJobId) ? prev : [...prev, selectedJobId]))
      setShowJobSelector(false)
      setSelectedJobId(null)
    } catch (e: any) {
      if (e.response?.status === 409) {
        toast.error('Invitation already sent to this candidate.')
        setInvitedJobPostIds((prev) => (prev.includes(selectedJobId) ? prev : [...prev, selectedJobId]))
        setSelectedJobId(null)
        // Keep modal open; do not disable main Invite button
      } else {
        toast.error(e.response?.data?.message || 'Failed to send invitation')
      }
    } finally {
      setInviting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Candidate Profile</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-center gap-5 pb-6 border-b border-gray-200">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg flex-shrink-0">
                {getInitials(profile.fullName)}
              </div>
              <div className="min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{profile.fullName}</h3>
                <p className="text-gray-600 mb-1 truncate">{profile.email}</p>
                {profile.primaryRole && (
                  <p className="text-base font-semibold text-gray-800">{profile.primaryRole}</p>
                )}
              </div>
            </div>

            {/* Experience */}
            {profile.experience != null && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Experience</p>
                <p className="text-lg font-bold text-gray-900">{profile.experience} years</p>
              </div>
            )}

            {/* Preferred Roles (Looking For) — chips only, hide if empty */}
            {(() => {
              const roles = ensureStringArray(profile.preferredRoles ?? (profile as any).jobPreferences)
              if (roles.length === 0) return null
              return (
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Looking For</p>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((r, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#EEF0FF] text-[#4A4CF0] rounded-xl text-sm font-semibold border border-[#D4D7FF]">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })()}

            {/* Preferred Locations — single section, chips */}
            {(() => {
              const locs = ensureStringArray(profile.preferredLocations)
              if (locs.length === 0) return null
              return (
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Preferred Locations</p>
                  <div className="flex flex-wrap gap-2">
                    {locs.map((loc, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#EEF0FF] text-[#4A4CF0] rounded-xl text-sm font-semibold border border-[#D4D7FF]">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })()}

            {/* Skills — chips */}
            {(() => {
              const sk = ensureStringArray(profile.skills)
              if (sk.length === 0) return null
              return (
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {sk.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#EEF0FF] text-[#4A4CF0] rounded-xl text-sm font-semibold border border-[#D4D7FF]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })()}

            {/* Download Resume + Invite to Apply */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-gray-100">
              {resumeHref ? (
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-[#EEF0FF] text-[#4A4CF0] font-semibold hover:bg-[#D4D7FF] transition-colors border border-[#D4D7FF]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>
              ) : (
                <span className="text-gray-500 text-sm font-medium">Resume not uploaded</span>
              )}
              <button
                type="button"
                onClick={handleInviteClick}
                disabled={inviting}
                className="h-11 px-5 rounded-xl bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] text-white font-semibold hover:shadow-lg disabled:opacity-60 transition-all"
              >
                {inviting ? 'Sending…' : 'Invite to Apply'}
              </button>
            </div>
          </div>
        </div>

        {/* Job Selection Modal */}
        {showJobSelector && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Select Job Opening</h3>
                <button
                  onClick={() => {
                    setShowJobSelector(false)
                    setSelectedJobId(null)
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Choose which job opening you want to invite {profile.fullName.split(' ')[0]} to apply for:
              </p>
              
              {loadingJobs ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A4CF0]"></div>
                </div>
              ) : jobPosts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-2">No job posts available</p>
                  <p className="text-sm text-gray-400">Create a job post first to invite candidates</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
                  {jobPosts.map((job) => {
                    const alreadyInvited = invitedJobPostIds.includes(job.id)
                    return (
                      <label
                        key={job.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all ${
                          alreadyInvited
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-80'
                            : selectedJobId === job.id
                              ? 'border-[#4A4CF0] bg-[#EEF0FF] cursor-pointer'
                              : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                        }`}
                      >
                        <input
                          type="radio"
                          name="jobPost"
                          value={job.id}
                          checked={selectedJobId === job.id}
                          onChange={() => !alreadyInvited && setSelectedJobId(job.id)}
                          disabled={alreadyInvited}
                          className="mt-1 h-4 w-4 text-[#4A4CF0] focus:ring-[#4A4CF0] disabled:opacity-50"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900">{job.title}</p>
                          <p className="text-sm text-gray-600">{job.companyName}</p>
                          {job.location && (
                            <p className="text-xs text-gray-500">{job.location}</p>
                          )}
                          {alreadyInvited && (
                            <p className="text-xs font-medium text-amber-600 mt-1">Already invited</p>
                          )}
                        </div>
                      </label>
                    )
                  })}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowJobSelector(false)
                    setSelectedJobId(null)
                  }}
                  className="flex-1 h-10 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendInvitation}
                  disabled={
                    !selectedJobId ||
                    inviting ||
                    jobPosts.length === 0 ||
                    invitedJobPostIds.includes(selectedJobId)
                  }
                  className="flex-1 h-10 rounded-xl bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] text-white font-semibold hover:shadow-lg disabled:opacity-50 transition-all"
                >
                  {inviting ? 'Sending...' : 'Send Invitation'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface JobSeekersProps {
  searchQuery?: string
}

export default function JobSeekers({ searchQuery = '' }: JobSeekersProps) {
  const [profiles, setProfiles] = useState<JobSeekerProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProfile, setSelectedProfile] = useState<JobSeekerProfile | null>(null)

  const fetchJobSeekers = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = searchQuery.trim() ? `?search=${encodeURIComponent(searchQuery.trim())}` : ''
      const response = await api.get(`/job-seekers${params}`)
      setProfiles(response.data)
    } catch (error) {
      console.error('Failed to fetch job seekers:', error)
      setProfiles([])
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery])

  useEffect(() => {
    fetchJobSeekers()
  }, [fetchJobSeekers])

  const getInitials = (name: string) => {
    const names = name.trim().split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Browse Candidates</h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Discover talented job seekers looking for opportunities
        </p>
      </div>

      {profiles.length === 0 ? (
        <div className="max-w-4xl mx-auto mt-20 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-12 text-center flex flex-col items-center justify-center border border-gray-100">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] flex items-center justify-center shadow-lg mb-6">
            <svg
              className="h-12 w-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {searchQuery.trim() ? `No candidates found for "${searchQuery}"` : 'No job seeker profiles available yet'}
          </h2>
          <p className="text-gray-600 text-base max-w-md">
            {searchQuery.trim()
              ? 'Try adjusting your search terms to find more candidates.'
              : 'Profiles will appear once candidates start using the platform.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="group bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  {getInitials(profile.fullName)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{profile.fullName}</h3>
                  {profile.primaryRole && (
                    <p className="text-sm font-medium text-gray-700 truncate mb-1">{profile.primaryRole}</p>
                  )}
                  {profile.experience !== null && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {profile.experience} years experience
                    </p>
                  )}
                </div>
              </div>

              {(() => {
                const roles = ensureStringArray(profile.preferredRoles ?? (profile as any).jobPreferences)
                if (roles.length === 0) return null
                return (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Preferred Roles</p>
                    <div className="flex flex-wrap gap-1.5">
                      {roles.slice(0, 4).map((r, i) => (
                        <span key={i} className="px-2.5 py-1 bg-[#EEF0FF] text-[#4A4CF0] rounded-lg text-xs font-semibold">
                          {r}
                        </span>
                      ))}
                      {roles.length > 4 && <span className="text-gray-500 text-xs">+{roles.length - 4}</span>}
                    </div>
                  </div>
                )
              })()}

              {(() => {
                const locs = ensureStringArray(profile.preferredLocations)
                if (locs.length === 0) return null
                return (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Preferred Locations</p>
                    <div className="flex flex-wrap gap-1.5">
                      {locs.slice(0, 3).map((l, i) => (
                        <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                          {l}
                        </span>
                      ))}
                      {locs.length > 3 && <span className="text-gray-500 text-xs">+{locs.length - 3}</span>}
                    </div>
                  </div>
                )
              })()}

              {(() => {
                const sk = ensureStringArray(profile.skills)
                if (sk.length === 0) return null
                return (
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-500 mb-2.5 uppercase tracking-wide">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {sk.slice(0, 4).map((s, i) => (
                        <span key={i} className="px-3 py-1 bg-[#EEF0FF] text-[#4A4CF0] rounded-lg text-xs font-semibold border border-[#D4D7FF]">
                          {s}
                        </span>
                      ))}
                      {sk.length > 4 && <span className="px-3 py-1 text-gray-500 text-xs">+{sk.length - 4} more</span>}
                    </div>
                  </div>
                )
              })()}

              <button
                onClick={() => setSelectedProfile(profile)}
                className="w-full h-11 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md"
              >
                View Full Profile
              </button>
            </div>
          ))}
        </div>
      )}

      <ViewProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
    </div>
  )
}
