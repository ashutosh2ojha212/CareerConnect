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

export default function JobPosts() {
  const navigate = useNavigate()
  const [jobPosts, setJobPosts] = useState<JobPost[]>([])
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
      setJobPosts(response.data)
    } catch (error) {
      console.error('Failed to fetch job posts:', error)
      setJobPosts([])
    } finally {
      setIsLoading(false)
    }
  }

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
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 mt-6">
      {/* Main Content - Job Posts Section */}
      <div className="min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">My Job Posts</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage and track the job openings you've shared.</p>
          </div>
          <button
            onClick={() => navigate('/employee/create')}
            className="h-12 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:opacity-90 active:scale-[0.97] transition-all duration-200 whitespace-nowrap text-sm sm:text-base"
          >
            + Create New Job Post
          </button>
        </div>

        {jobPosts.length === 0 ? (
        /* Premium Empty State */
        <div className="max-w-4xl mx-auto mt-16 bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-10 text-center flex flex-col items-center justify-center border border-gray-100">
          {/* Illustration Icon */}
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Main Text */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No job posts yet
          </h2>
          <p className="text-gray-600 text-base mb-8">
            You haven't created any job posts. Start by creating your first one!
          </p>

          {/* Button */}
          <button
            onClick={() => navigate('/employee/create')}
            className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:opacity-90 active:scale-[0.97] transition-all duration-200"
          >
            Create Job Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPosts.map((job) => (
            <div
              key={job.id}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-6 cursor-pointer hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 relative"
            >
              {/* Edit Icon - Top Right */}
              <button
                onClick={(e) => handleEditClick(e, job.id)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 z-10"
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
                className="pr-8"
              >
                {/* Job Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-1 pr-8">{job.title}</h3>
                
                {/* Company Name */}
                <p className="text-base font-medium text-gray-700 mb-4">
                  {job.companyName || job.company?.name || 'Default Company'}
                </p>

                {/* Key Information Grid */}
                <div className="space-y-2 mb-4">
                  {/* Experience */}
                  {job.experience !== null && job.experience !== undefined && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 text-gray-400"
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
                      <span>{job.experience}+ years experience</span>
                    </div>
                  )}

                  {/* Location */}
                  {job.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 text-gray-400"
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
                      <span>{job.location}</span>
                    </div>
                  )}
                </div>

                {/* Footer with Applicants Count and CTA */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {job.applicantCount} applicants
                  </span>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Right Sidebar - Simplified Referral Form Card */}
      <div className="lg:sticky lg:top-24 h-fit">
        {!referralForm ? (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Complete your referral setup</h3>
                <p className="text-indigo-100 text-sm">
                  Create the form job seekers will fill when requesting referrals from you.
                </p>
              </div>
              <button
                onClick={() => navigate('/employee/setup-form')}
                className="w-full px-4 py-2.5 bg-white text-indigo-600 font-semibold rounded-xl shadow-md hover:opacity-90 active:scale-[0.97] transition-all duration-200 text-sm"
              >
                Set Up Referral Form
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 border border-gray-100">
            {/* Edit Form Button - Top */}
            <button
              onClick={() => navigate('/employee/setup-form')}
              className="w-full px-4 py-2 text-sm font-medium border border-indigo-500 text-indigo-600 rounded-xl hover:bg-indigo-50 active:scale-[0.97] transition-all duration-200 mb-4"
            >
              Edit Form
            </button>

            {/* Title and Status */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-900">
                {referralForm.formTitle || 'Referral Application Form'}
              </h3>
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-medium">
                  <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
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
