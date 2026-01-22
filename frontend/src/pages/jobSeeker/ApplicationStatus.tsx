import { useState, useEffect } from 'react'
import api from '../../lib/api'

interface Application {
  id: string
  employee: {
    name: string
    company: {
      name: string
    }
  }
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export default function ApplicationStatus() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications')
      setApplications(response.data)
    } catch (error) {
      console.error('Failed to fetch applications:', error)
      // Mock data
      setApplications([
        {
          id: '1',
          employee: {
            name: 'John Doe',
            company: { name: 'Tech Corp' },
          },
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Applications</h1>
      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">No applications yet. Start browsing companies!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {app.employee.company.name}
                  </h3>
                  <p className="text-gray-600">Referred by: {app.employee.name}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Applied on {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    app.status
                  )}`}
                >
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

