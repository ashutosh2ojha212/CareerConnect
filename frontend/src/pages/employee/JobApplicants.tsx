import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../../lib/api'

interface FormField {
  id: string
  label: string
  type: string
  required: boolean
}

interface JobPost {
  id: string
  title: string
  companyName: string
  experience?: number
  company: {
    name: string
  }
}

interface Applicant {
  id: string
  name: string
  email: string
  phone?: string
  resumeUrl?: string
  formData: Record<string, any>
  formFields?: FormField[]
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  jobPost?: JobPost | null
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

  const getInitials = (name: string) => {
    const names = name.trim().split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const copyApplicationSummary = (applicant: Applicant) => {
    let summary = 'Referral Details:\n'
    summary += `Name: ${applicant.name}\n`
    summary += `Email: ${applicant.email}\n`
    
    if (applicant.jobPost) {
      summary += `\nJob Information:\n`
      summary += `Role: ${applicant.jobPost.title}\n`
      summary += `Company: ${applicant.jobPost.companyName || applicant.jobPost.company?.name}\n`
    }
    
    summary += `Applied On: ${formatDate(applicant.createdAt)}\n`
    summary += `Status: ${applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}\n`
    
    summary += `\nApplication Details:\n`
    
    if (applicant.formFields && applicant.formFields.length > 0) {
      applicant.formFields.forEach((field) => {
        const value = applicant.formData[field.id]
        if (value !== undefined && value !== null && value !== '') {
          if (field.type === 'file') {
            summary += `${field.label}: ${applicant.resumeUrl || 'Not provided'}\n`
          } else {
            summary += `${field.label}: ${value}\n`
          }
        }
      })
    } else {
      Object.entries(applicant.formData)
        .filter(([key]) => key !== 'resume' && key !== 'jobPostId' && key !== 'employeeId')
        .forEach(([key, value]) => {
          summary += `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: ${value}\n`
        })
    }
    
    if (applicant.resumeUrl) {
      summary += `\nResume: ${applicant.resumeUrl}\n`
    }

    navigator.clipboard.writeText(summary)
    toast.success('Application summary copied to clipboard!')
  }

  const updateStatus = async (applicantId: string, status: 'approved' | 'rejected') => {
    try {
      await api.patch(`/applications/${applicantId}/status`, { status })
      setApplicants((prev) =>
        prev.map((app) => (app.id === applicantId ? { ...app, status } : app))
      )
      if (selectedApplicant && selectedApplicant.id === applicantId) {
        setSelectedApplicant({ ...selectedApplicant, status })
      }
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-10">
          {/* Back Button */}
          <button
            onClick={() => setSelectedApplicant(null)}
            className="mb-6 text-indigo-600 hover:text-indigo-700 font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Applicants
          </button>

          {/* Applicant Header Card */}
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Applicant Identity Block */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl shadow-md">
                  {getInitials(selectedApplicant.name)}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{selectedApplicant.name}</h2>
                  <p className="text-gray-600 mt-1">{selectedApplicant.email}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                    selectedApplicant.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : selectedApplicant.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {selectedApplicant.status === 'approved' && (
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {selectedApplicant.status === 'rejected' && (
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  {selectedApplicant.status === 'pending' && (
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  )}
                  {selectedApplicant.status.charAt(0).toUpperCase() + selectedApplicant.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Metadata Section */}
          {selectedApplicant.jobPost && (
            <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Job & Submission Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Applied On</p>
                  <p className="text-gray-700">{formatDate(selectedApplicant.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Company</p>
                  <p className="text-gray-700">
                    {selectedApplicant.jobPost.companyName || selectedApplicant.jobPost.company?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Role Applied For</p>
                  <p className="text-gray-700">{selectedApplicant.jobPost.title}</p>
                </div>
                {selectedApplicant.jobPost.experience && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Required Experience</p>
                    <p className="text-gray-700">{selectedApplicant.jobPost.experience}+ years</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Application Details Section */}
          <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Application Details</h3>
            <div className="space-y-4">
              {selectedApplicant.formFields && selectedApplicant.formFields.length > 0 ? (
                // Use form field labels if available
                selectedApplicant.formFields.map((field) => {
                  const value = selectedApplicant.formData[field.id]
                  if (value === undefined || value === null || value === '') return null
                  
                  return (
                    <div key={field.id} className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                      <p className="text-sm font-medium text-gray-500 mb-1">{field.label}</p>
                      {field.type === 'file' ? (
                        <div className="flex items-center gap-2">
                          <a
                            href={selectedApplicant.resumeUrl || (typeof value === 'string' ? value : '#')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors inline-flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Resume
                          </a>
                        </div>
                      ) : (
                        <p className="text-gray-700">{String(value)}</p>
                      )}
                    </div>
                  )
                })
              ) : (
                // Fallback to raw form data if no form fields metadata
                Object.entries(selectedApplicant.formData)
                  .filter(([key]) => key !== 'resume' && key !== 'jobPostId' && key !== 'employeeId')
                  .map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </p>
                      <p className="text-gray-700">{String(value)}</p>
                    </div>
                  ))
              )}
              
              {/* Resume Link (if not already shown as a field) */}
              {selectedApplicant.resumeUrl && 
               (!selectedApplicant.formFields || 
                !selectedApplicant.formFields.some(f => f.type === 'file')) && (
                <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                  <p className="text-sm font-medium text-gray-500 mb-1">Resume</p>
                  <a
                    href={selectedApplicant.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {selectedApplicant.status === 'pending' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => updateStatus(selectedApplicant.id, 'approved')}
                  className="h-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(selectedApplicant.id, 'rejected')}
                  className="h-12 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reject
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-gray-600 text-sm">
                  This application has already been processed.
                </p>
              </div>
            )}

            {/* Copy Application Summary Button */}
            <button
              onClick={() => copyApplicationSummary(selectedApplicant)}
              className="w-full h-12 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 active:scale-[0.97] transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Details
            </button>
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
