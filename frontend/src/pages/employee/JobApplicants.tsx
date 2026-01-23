import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../../lib/api'

interface Applicant {
  id: string
  name: string
  email: string
  phone?: string
  resumeUrl?: string
  formData: Record<string, any>
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export default function JobApplicants() {
  const { jobId } = useParams<{ jobId: string }>()
  const navigate = useNavigate()
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (jobId) {
      fetchApplicants(jobId)
    }
  }, [jobId])

  const fetchApplicants = async (id: string) => {
    try {
      const response = await api.get(`/jobs/${id}/applicants`)
      setApplicants(response.data)
    } catch (error) {
      console.error('Failed to fetch applicants:', error)
      setApplicants([])
    } finally {
      setIsLoading(false)
    }
  }

  const copyApplicantDetails = (applicant: Applicant) => {
    const details = `
Name: ${applicant.name}
Email: ${applicant.email}
Phone: ${applicant.phone || 'N/A'}
${Object.entries(applicant.formData)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}
    `.trim()

    navigator.clipboard.writeText(details)
    toast.success('Applicant details copied to clipboard!')
  }

  const updateStatus = async (applicantId: string, status: 'approved' | 'rejected') => {
    try {
      await api.patch(`/applications/${applicantId}/status`, { status })
      setApplicants((prev) =>
        prev.map((app) => (app.id === applicantId ? { ...app, status } : app))
      )
      toast.success(`Application ${status}!`)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update status')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (selectedApplicant) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedApplicant(null)}
          className="mb-6 text-indigo-600 hover:text-indigo-700 font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Applicants
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-8 border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{selectedApplicant.name}</h2>
              <p className="text-gray-600">{selectedApplicant.email}</p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                selectedApplicant.status === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : selectedApplicant.status === 'rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {selectedApplicant.status.charAt(0).toUpperCase() + selectedApplicant.status.slice(1)}
            </span>
          </div>

          <div className="space-y-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="bg-gray-50 rounded-xl p-5 space-y-2 border border-gray-100">
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {selectedApplicant.email}
                </p>
                {selectedApplicant.phone && (
                  <p className="text-gray-700">
                    <span className="font-medium">Phone:</span> {selectedApplicant.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Application Details</h3>
              <div className="bg-gray-50 rounded-xl p-5 space-y-2 border border-gray-100">
                {Object.entries(selectedApplicant.formData).map(([key, value]) => (
                  <p key={key} className="text-gray-700">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>{' '}
                    {String(value)}
                  </p>
                ))}
              </div>
            </div>

            {selectedApplicant.resumeUrl && (
              <div>
                <a
                  href={selectedApplicant.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors inline-flex items-center gap-2"
                >
                  View Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => copyApplicantDetails(selectedApplicant)}
              className="flex-1 h-12 bg-gray-600 text-white rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-md"
            >
              Copy Details
            </button>
            {selectedApplicant.status === 'pending' && (
              <>
                <button
                  onClick={() => updateStatus(selectedApplicant.id, 'approved')}
                  className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(selectedApplicant.id, 'rejected')}
                  className="flex-1 h-12 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-md"
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => navigate('/employee')}
        className="mb-6 text-indigo-600 hover:text-indigo-700 font-medium transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Job Posts
      </button>

      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Applicants</h1>

      {applicants.length === 0 ? (
        <div className="max-w-4xl mx-auto mt-16 bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-12 text-center flex flex-col items-center justify-center border border-gray-100">
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No applicants yet</h2>
          <p className="text-gray-600 text-base">
            No job postings here yet. Ready to create one?
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applicants.map((applicant) => (
            <div
              key={applicant.id}
              onClick={() => setSelectedApplicant(applicant)}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-6 cursor-pointer hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{applicant.name}</h3>
                  <p className="text-gray-600">{applicant.email}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Applied on {new Date(applicant.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    applicant.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : applicant.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
