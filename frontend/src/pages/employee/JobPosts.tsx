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
      // Mock data
      setJobPosts([
        {
          id: '1',
          title: 'Senior Software Engineer',
          description: 'Looking for an experienced software engineer...',
          company: { name: 'Tech Corp' },
          applicantCount: 5,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Product Manager',
          description: 'Join our product team...',
          company: { name: 'Tech Corp' },
          applicantCount: 3,
          createdAt: new Date().toISOString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Job Posts</h1>
        <button
          onClick={() => navigate('/employee/create')}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          + Create New Job Post
        </button>
      </div>

      {jobPosts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">No job posts yet. Create your first one!</p>
          <button
            onClick={() => navigate('/employee/create')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
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
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2 py-1 rounded">
                  {job.applicantCount} applicants
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{job.company.name}</span>
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
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

