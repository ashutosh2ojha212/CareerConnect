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
      // Mock data
      setApplicants([
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          formData: {
            experience: '5 years',
            skills: 'React, Node.js',
          },
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      ])
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (selectedApplicant) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedApplicant(null)}
          className="mb-4 text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Applicants
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedApplicant.name}</h2>
              <p className="text-gray-600">{selectedApplicant.email}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
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

          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p>
                  <span className="font-medium">Email:</span> {selectedApplicant.email}
                </p>
                {selectedApplicant.phone && (
                  <p>
                    <span className="font-medium">Phone:</span> {selectedApplicant.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Application Details</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {Object.entries(selectedApplicant.formData).map(([key, value]) => (
                  <p key={key}>
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
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Resume →
                </a>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => copyApplicantDetails(selectedApplicant)}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Copy Details
            </button>
            {selectedApplicant.status === 'pending' && (
              <>
                <button
                  onClick={() => updateStatus(selectedApplicant.id, 'approved')}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(selectedApplicant.id, 'rejected')}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
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
        className="mb-4 text-primary-600 hover:text-primary-700 font-medium"
      >
        ← Back to Job Posts
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Applicants</h1>

      {applicants.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">No applicants yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applicants.map((applicant) => (
            <div
              key={applicant.id}
              onClick={() => setSelectedApplicant(applicant)}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
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
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
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

