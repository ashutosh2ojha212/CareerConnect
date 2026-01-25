import { useState, useEffect, useCallback } from 'react'
import api from '../../lib/api'

interface JobSeekerProfile {
  id: string
  userId: string
  fullName: string
  email: string
  experience: number | null
  primaryRole: string | null
  skills: string[]
  jobPreferences: string | null
  profileImageURL: string | null
  createdAt: string
  updatedAt: string
}

interface ViewProfileModalProps {
  profile: JobSeekerProfile | null
  onClose: () => void
}

function ViewProfileModal({ profile, onClose }: ViewProfileModalProps) {
  if (!profile) return null

  const getInitials = (name: string) => {
    const names = name.trim().split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Candidate Profile</h2>
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
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {getInitials(profile.fullName)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{profile.fullName}</h3>
                <p className="text-gray-600 mb-2">{profile.email}</p>
                {profile.primaryRole && (
                  <p className="text-base font-semibold text-gray-800">{profile.primaryRole}</p>
                )}
              </div>
            </div>

            {/* Experience */}
            {profile.experience !== null && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Experience</p>
                <p className="text-lg font-bold text-gray-900">{profile.experience} years</p>
              </div>
            )}

            {/* Job Preferences */}
            {profile.jobPreferences && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Looking For</p>
                <p className="text-base font-semibold text-gray-900">{profile.jobPreferences}</p>
              </div>
            )}

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-[#4A4CF0]/10 to-[#6366F1]/10 text-[#4A4CF0] rounded-xl text-sm font-semibold border border-[#4A4CF0]/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
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

              {profile.jobPreferences && (
                <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Looking For</p>
                  <p className="text-sm font-medium text-gray-900">{profile.jobPreferences}</p>
                </div>
              )}

              {profile.skills && profile.skills.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-500 mb-2.5 uppercase tracking-wide">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-[#4A4CF0]/10 to-[#6366F1]/10 text-[#4A4CF0] rounded-lg text-xs font-semibold border border-[#4A4CF0]/20"
                      >
                        {skill}
                      </span>
                    ))}
                    {profile.skills.length > 4 && (
                      <span className="px-3 py-1 text-gray-500 text-xs font-medium flex items-center">
                        +{profile.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedProfile(profile)}
                className="w-full h-11 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}

      <ViewProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
    </div>
  )
}
