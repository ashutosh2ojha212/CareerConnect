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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Candidate Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-2xl shadow-md">
                {getInitials(profile.fullName)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{profile.fullName}</h3>
                <p className="text-gray-600">{profile.email}</p>
                {profile.primaryRole && (
                  <p className="text-gray-700 mt-1">{profile.primaryRole}</p>
                )}
              </div>
            </div>

            {/* Experience */}
            {profile.experience !== null && (
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Experience</p>
                <p className="text-gray-900">{profile.experience} years</p>
              </div>
            )}

            {/* Job Preferences */}
            {profile.jobPreferences && (
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Looking For</p>
                <p className="text-gray-900">{profile.jobPreferences}</p>
              </div>
            )}

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
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
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Browse Candidates</h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Discover talented job seekers looking for opportunities
        </p>
      </div>

      {profiles.length === 0 ? (
        <div className="max-w-4xl mx-auto mt-16 bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-10 text-center flex flex-col items-center justify-center border border-gray-100">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md mb-6">
            <svg
              className="h-10 w-10 text-white"
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {searchQuery.trim() ? `No candidates found for "${searchQuery}"` : 'No job seeker profiles available yet'}
          </h2>
          <p className="text-gray-600 text-base">
            {searchQuery.trim()
              ? 'Try adjusting your search terms'
              : 'Profiles will appear once candidates start using the platform.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl shadow-md flex-shrink-0">
                  {getInitials(profile.fullName)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{profile.fullName}</h3>
                  {profile.primaryRole && (
                    <p className="text-sm text-gray-600 truncate">{profile.primaryRole}</p>
                  )}
                  {profile.experience !== null && (
                    <p className="text-sm text-gray-500 mt-1">{profile.experience} years experience</p>
                  )}
                </div>
              </div>

              {profile.jobPreferences && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Looking for:</p>
                  <p className="text-sm text-gray-700">{profile.jobPreferences}</p>
                </div>
              )}

              {profile.skills && profile.skills.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {profile.skills.length > 3 && (
                      <span className="px-2 py-0.5 text-gray-500 text-xs">+{profile.skills.length - 3} more</span>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedProfile(profile)}
                className="w-full h-10 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-md"
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
