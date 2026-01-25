import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'

interface JobPost {
  id: string
  title: string
  companyName?: string
  description: string
  experience?: number
  location?: string
  skills?: string[] | string
  company: {
    name: string
  }
  applicantCount: number
  createdAt: string
}

interface ReferralForm {
  id: string
  formTitle: string
  fields: Array<{
    id: string
    label: string
    type: string
    required: boolean
  }>
}

interface JobPostsProps {
  searchQuery?: string
}

export default function JobPosts({ searchQuery = '' }: JobPostsProps) {
  const navigate = useNavigate()
  const [jobPosts, setJobPosts] = useState<JobPost[]>([])
  const [allJobPosts, setAllJobPosts] = useState<JobPost[]>([])
  const [referralForm, setReferralForm] = useState<ReferralForm | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFormLoading, setIsFormLoading] = useState(true)

  useEffect(() => {
    fetchJobPosts()
    fetchReferralForm()
  }, [])

  const fetchJobPosts = async () => {
    try {
      const response = await api.get('/jobs/my-posts')
      setAllJobPosts(response.data)
      setJobPosts(response.data)
    } catch (error) {
      console.error('Failed to fetch job posts:', error)
      setAllJobPosts([])
      setJobPosts([])
    } finally {
      setIsLoading(false)
    }
  }

  // Filter job posts based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setJobPosts(allJobPosts)
      return
    }

    const query = searchQuery.toLowerCase().trim()
    const filtered = allJobPosts.filter((post) => {
      const title = (post.title || '').toLowerCase()
      const companyName = (post.companyName || post.company?.name || '').toLowerCase()
      const location = (post.location || '').toLowerCase()
      const experience = post.experience?.toString() || ''
      const skills = post.skills || []
      
      // Parse skills - handle both array and string formats
      let skillsArray: string[] = []
      if (Array.isArray(skills)) {
        skillsArray = skills.map(s => String(s).toLowerCase())
      } else if (typeof skills === 'string') {
        try {
          const parsed = JSON.parse(skills)
          skillsArray = Array.isArray(parsed) ? parsed.map((s: any) => String(s).toLowerCase()) : []
        } catch {
          // If not JSON, treat as comma-separated string
          skillsArray = skills.toLowerCase().split(',').map(s => s.trim()).filter(Boolean)
        }
      }

      return (
        title.includes(query) ||
        companyName.includes(query) ||
        location.includes(query) ||
        experience.includes(query) ||
        skillsArray.some(skill => skill.includes(query))
      )
    })

    setJobPosts(filtered)
  }, [searchQuery, allJobPosts])

  const fetchReferralForm = async () => {
    try {
      const response = await api.get('/referrer/form')
      if (response.data) {
        setReferralForm(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch referral form:', error)
      setReferralForm(null)
    } finally {
      setIsFormLoading(false)
    }
  }

  const handleEditClick = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation()
    navigate(`/employee/edit/${jobId}`)
  }

  if (isLoading || isFormLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 mt-6">
      {/* Main Content - Job Posts Section */}
      <div className="min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Job Posts</h1>
            <p className="text-gray-600 text-base sm:text-lg">Manage and track the job openings you've shared</p>
          </div>
          <button
            onClick={() => navigate('/employee/create')}
            className="h-12 px-6 sm:px-8 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-200 whitespace-nowrap text-sm sm:text-base"
          >
            + Create New Job Post
          </button>
        </div>

        {jobPosts.length === 0 ? (
        /* Premium Empty State */
        <div className="max-w-4xl mx-auto mt-20 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-12 text-center flex flex-col items-center justify-center border border-gray-100">
          {searchQuery ? (
            <>
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] flex items-center justify-center shadow-lg mb-6">
                <svg
                  className="h-12 w-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No job posts found</h2>
              <p className="text-gray-600 text-base max-w-md">
                No job posts found for "{searchQuery}". Try adjusting your search terms.
              </p>
            </>
          ) : (
            <>
          {/* Illustration Icon */}
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

              {/* Main Text */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                No job posts yet
              </h2>
              <p className="text-gray-600 text-base mb-8 max-w-md">
                You haven't created any job posts. Start by creating your first one!
              </p>

              {/* Button */}
              <button
                onClick={() => navigate('/employee/create')}
                className="h-12 px-8 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-200"
              >
                Create Job Post
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPosts.map((job) => (
            <div
              key={job.id}
              className="group bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 relative"
            >
              {/* Edit Icon - Top Right */}
              <button
                onClick={(e) => handleEditClick(e, job.id)}
                className="absolute top-5 right-5 p-2.5 text-gray-400 hover:text-[#4A4CF0] hover:bg-[#4A4CF0]/10 rounded-xl transition-all duration-200 z-10"
                title="Edit Job Post"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>

              <div
                onClick={() => navigate(`/employee/job/${job.id}`)}
                className="pr-12"
              >
                {/* Company Name */}
                <p className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">
                  {job.companyName || job.company?.name || 'Company'}
                </p>
                
                {/* Job Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 pr-2">{job.title}</h3>

                {/* Key Information Grid */}
                <div className="space-y-3 mb-6">
                  {/* Experience */}
                  {job.experience !== null && job.experience !== undefined && (
                    <div className="flex items-center gap-2.5 text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-medium">{job.experience}+ years experience</span>
                    </div>
                  )}

                  {/* Location */}
                  {job.location && (
                    <div className="flex items-center gap-2.5 text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="font-medium">{job.location}</span>
                    </div>
                  )}
                </div>

                {/* Divider Line */}
                <div className="border-t border-gray-100 mb-5" style={{ borderColor: 'rgba(0, 0, 0, 0.07)' }}></div>

                {/* Footer with Applicants Count and CTA */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                  {/* Applicant Count Badge */}
                  <span className="inline-flex items-center justify-center h-[36px] px-4 py-0 rounded-xl bg-[#EEF0FF] text-[#4A4CF0] text-xs font-medium border border-[#D4D7FF] cursor-pointer hover:shadow-sm transition-shadow whitespace-nowrap flex-shrink-0">
                    {job.applicantCount} {job.applicantCount === 1 ? 'applicant' : 'applicants'}
                  </span>
                  
                  {/* View Details Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/employee/job/${job.id}`)
                    }}
                    className="inline-flex items-center gap-1.5 text-[#4A4CF0] hover:text-[#6366F1] font-semibold text-sm transition-all duration-200 group whitespace-nowrap flex-shrink-0"
                  >
                    <span className="whitespace-nowrap">View Details</span>
                    <svg 
                      className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ strokeWidth: 2.5 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Right Sidebar - Compact Referral Form Card */}
      <div className="lg:sticky lg:top-24 h-fit">
        {!referralForm ? (
          <div className="bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] rounded-2xl p-6 text-white shadow-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Complete Your Referral Setup</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Create the form job seekers will fill when requesting referrals from you.
                </p>
              </div>
              <button
                onClick={() => navigate('/employee/setup-form')}
                className="w-full px-4 py-3 bg-white text-[#4A4CF0] font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-200 text-sm"
              >
                Set Up Referral Form
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 border border-gray-100">
            {/* Edit Form Button - Top */}
            <button
              onClick={() => navigate('/employee/setup-form')}
              className="w-full px-4 py-2.5 text-sm font-semibold border-2 border-[#4A4CF0] text-[#4A4CF0] rounded-xl hover:bg-[#4A4CF0]/10 active:scale-[0.98] transition-all duration-200 mb-5"
            >
              Edit Form
            </button>

            {/* Title and Status */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-gray-900">
                {referralForm.formTitle || 'Referral Application Form'}
              </h3>
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-bold border border-green-200">
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Form Active
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
