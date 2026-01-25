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
        return 'bg-[#34c759] text-white'
      case 'rejected':
        return 'bg-[#ff3b30] text-white'
      default:
        return 'bg-[#ffcc00] text-gray-900'
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A4CF0]"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Applications</h1>
        <p className="text-gray-600 text-base sm:text-lg">Track the status of your referral applications</p>
      </div>
      {applications.length === 0 ? (
        <div className="max-w-4xl mx-auto mt-20 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-12 text-center flex flex-col items-center justify-center border border-gray-100">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] flex items-center justify-center shadow-lg mb-6">
            <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No applications yet</h2>
          <p className="text-gray-600 text-base max-w-md">Start browsing companies to find referral opportunities!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="group bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {app.employee.company.name}
                  </h3>
                  <p className="text-gray-600 mb-1">Referred by: <span className="font-semibold">{app.employee.name}</span></p>
                  <p className="text-sm text-gray-500 mt-3 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Applied on {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-5 py-2.5 rounded-full text-sm font-bold shadow-sm ${getStatusColor(
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

