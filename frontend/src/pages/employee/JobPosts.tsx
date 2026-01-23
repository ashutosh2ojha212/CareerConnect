import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'

interface JobPost {
  id: string
  title: string
  description: string
  company: {
    name: string
  }
  applicantCount: number
  createdAt: string
}

export default function JobPosts() {
  const navigate = useNavigate()
  const [jobPosts, setJobPosts] = useState<JobPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchJobPosts()
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div>
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
              onClick={() => navigate(`/employee/job/${job.id}`)}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-6 cursor-pointer hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {job.applicantCount} applicants
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">{job.company.name}</span>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors">
                  View Applicants →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
