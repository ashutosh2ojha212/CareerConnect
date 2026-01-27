import { useState, useEffect } from 'react'
import api from '../../lib/api'
import toast from 'react-hot-toast'

interface Application {
  id: string
  jobPostId: string | null
  jobTitle: string | null
  companyName: string
  employee: {
    id?: string
    name: string
    company: { name: string }
  }
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export default function ApplicationStatus() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications')
      setApplications(response.data || [])
    } catch (error) {
      console.error('Failed to fetch applications:', error)
      setApplications([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (applicationId: string) => {
    if (!confirm('Are you sure you want to delete this application?')) {
      return
    }
    try {
      await api.delete(`/applications/${applicationId}`)
      toast.success('Application deleted successfully')
      fetchApplications()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete application')
    }
  }

  const filteredApplications = applications.filter((app) =>
    activeTab === 'approved' ? app.status === 'approved' : activeTab === 'rejected' ? app.status === 'rejected' : app.status === 'pending'
  )

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

  const pendingCount = applications.filter(a => a.status === 'pending').length
  const approvedCount = applications.filter(a => a.status === 'approved').length
  const rejectedCount = applications.filter(a => a.status === 'rejected').length

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Applications</h1>
        <p className="text-gray-600 text-base sm:text-lg">Track the status of your referral applications</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-3 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3 px-4 font-semibold transition-colors border-b-2 ${
            activeTab === 'pending'
              ? 'text-[#4A4CF0] border-[#4A4CF0]'
              : 'text-gray-600 border-transparent hover:text-[#4A4CF0]'
          }`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          className={`pb-3 px-4 font-semibold transition-colors border-b-2 ${
            activeTab === 'approved'
              ? 'text-[#4A4CF0] border-[#4A4CF0]'
              : 'text-gray-600 border-transparent hover:text-[#4A4CF0]'
          }`}
        >
          Accepted ({approvedCount})
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          className={`pb-3 px-4 font-semibold transition-colors border-b-2 ${
            activeTab === 'rejected'
              ? 'text-[#4A4CF0] border-[#4A4CF0]'
              : 'text-gray-600 border-transparent hover:text-[#4A4CF0]'
          }`}
        >
          Rejected ({rejectedCount})
        </button>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="max-w-4xl mx-auto mt-20 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-12 text-center flex flex-col items-center justify-center border border-gray-100">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] flex items-center justify-center shadow-lg mb-6">
            <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {activeTab === 'pending' ? 'No pending applications' : activeTab === 'approved' ? 'No accepted applications' : 'No rejected applications'}
          </h2>
          <p className="text-gray-600 text-base max-w-md">
            {activeTab === 'pending'
              ? 'Start browsing companies to find referral opportunities!'
              : `You don't have any ${activeTab} applications at the moment.`}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredApplications.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {app.jobTitle || 'Referral Application'}
                  </h3>
                  <p className="text-base font-medium text-gray-700 mb-1">{app.companyName}</p>
                  <p className="text-sm text-gray-600 mb-1">Referred by: <span className="font-semibold">{app.employee?.name ?? '—'}</span></p>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Applied on {new Date(app.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className={`px-5 py-2.5 rounded-full text-sm font-bold shadow-sm ${getStatusColor(
                      app.status
                    )}`}
                  >
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                    title="Delete application"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

