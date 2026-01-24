import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import ApplicationFieldRow from '../../components/ApplicationFieldRow'

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

type TabStatus = 'pending' | 'approved' | 'rejected'

export default function JobApplicants() {
  const { jobId } = useParams<{ jobId: string }>()
  const navigate = useNavigate()
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabStatus>('pending')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (jobId) {
      fetchApplicants(jobId, activeTab)
    }
  }, [jobId, activeTab])

  const fetchApplicants = async (id: string, status?: TabStatus) => {
    try {
      setIsLoading(true)
      const url = status 
        ? `/jobs/${id}/applicants?status=${status}`
        : `/jobs/${id}/applicants`
      const response = await api.get(url)
      setApplicants(response.data)
    } catch (error) {
      console.error('Failed to fetch applicants:', error)
      setApplicants([])
      toast.error('Failed to fetch applicants')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (applicantId: string) => {
    try {
      setIsDeleting(true)
      await api.delete(`/applications/${applicantId}`)
      
      // Optimistically remove from UI
      setApplicants((prev) => prev.filter((app) => app.id !== applicantId))
      
      // If deleted applicant was selected, clear selection
      if (selectedApplicant && selectedApplicant.id === applicantId) {
        setSelectedApplicant(null)
      }
      
      setShowDeleteConfirm(null)
      toast.success('Applicant removed successfully')
    } catch (error: any) {
      console.error('Failed to delete applicant:', error)
      toast.error(error.response?.data?.message || 'Failed to delete applicant')
    } finally {
      setIsDeleting(false)
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
      
      // Remove from current tab's list (optimistic update)
      setApplicants((prev) => prev.filter((app) => app.id !== applicantId))
      
      // If viewing detail page, close it
      if (selectedApplicant && selectedApplicant.id === applicantId) {
        setSelectedApplicant(null)
      }
      
      toast.success(`Application ${status}!`)
      
      // Switch to the appropriate tab and refetch
      setActiveTab(status)
      if (jobId) {
        fetchApplicants(jobId, status)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update status')
      // On error, refetch current tab to restore state
      if (jobId) {
        fetchApplicants(jobId, activeTab)
      }
    }
  }

  const getEmptyStateMessage = (status: TabStatus) => {
    switch (status) {
      case 'pending':
        return 'No pending applicants yet.'
      case 'approved':
        return 'No approved applicants yet.'
      case 'rejected':
        return 'No rejected applicants yet.'
      default:
        return 'No applicants yet.'
    }
  }

  if (isLoading && applicants.length === 0) {
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
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Application Details</h3>
            <div className="space-y-1">
              {selectedApplicant.formFields && selectedApplicant.formFields.length > 0 ? (
                // Use form field labels if available - maintain order from schema
                selectedApplicant.formFields.map((field) => {
                  let value = selectedApplicant.formData[field.id]
                  
                  // For file fields, prioritize formData value, then resumeUrl
                  if (field.type === 'file') {
                    // Check multiple possible field names for resume
                    if (!value) {
                      // Try common resume field names
                      const resumeFieldNames = ['resume', 'resumeUrl', 'file', 'pdf', 'document']
                      for (const name of resumeFieldNames) {
                        if (selectedApplicant.formData[name]) {
                          value = selectedApplicant.formData[name]
                          break
                        }
                      }
                    }
                    
                    // Fallback to resumeUrl if still no value
                    if (!value && selectedApplicant.resumeUrl) {
                      value = selectedApplicant.resumeUrl
                    }
                  }
                  
                  // Determine file URL for file fields
                  const fileUrl = field.type === 'file' 
                    ? (value || selectedApplicant.resumeUrl || null)
                    : undefined
                  
                  return (
                    <ApplicationFieldRow
                      key={field.id}
                      label={field.label}
                      value={value}
                      type={field.type as 'text' | 'file' | 'email' | 'tel' | 'number' | 'textarea'}
                      fileUrl={fileUrl}
                      applicationId={selectedApplicant.id}
                      fieldId={field.id}
                    />
                  )
                })
              ) : (
                // Fallback to raw form data if no form fields metadata
                Object.entries(selectedApplicant.formData)
                  .filter(([key]) => key !== 'jobPostId' && key !== 'employeeId')
                  .map(([key, value]) => {
                    // Determine type from key name
                    let fieldType: 'text' | 'file' | 'email' | 'tel' | 'number' | 'textarea' = 'text'
                    let fileUrl: string | undefined = undefined
                    
                    if (key.toLowerCase().includes('email')) {
                      fieldType = 'email'
                    } else if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('tel')) {
                      fieldType = 'tel'
                    } else if (key.toLowerCase().includes('experience') || key.toLowerCase().includes('year')) {
                      fieldType = 'number'
                    } else if (key.toLowerCase().includes('resume') || key.toLowerCase().includes('file')) {
                      fieldType = 'file'
                      fileUrl = typeof value === 'string' ? value : selectedApplicant.resumeUrl
                    }
                    
                    return (
                      <ApplicationFieldRow
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        value={value}
                        type={fieldType}
                        fileUrl={fileUrl}
                        applicationId={selectedApplicant.id}
                        fieldId={key}
                      />
                    )
                  })
              )}
              
              {/* Resume Link (if not already shown as a field and exists) */}
              {selectedApplicant.resumeUrl && 
               selectedApplicant.formFields &&
               !selectedApplicant.formFields.some(f => f.type === 'file' || f.id === 'resume') &&
               !selectedApplicant.formData['resume'] && (
                <ApplicationFieldRow
                  label="Resume"
                  value={selectedApplicant.resumeUrl}
                  type="file"
                  fileUrl={selectedApplicant.resumeUrl}
                  applicationId={selectedApplicant.id}
                  fieldId="resume"
                />
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

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          {(['pending', 'approved', 'rejected'] as TabStatus[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Applicants List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : applicants.length === 0 ? (
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No applicants found</h2>
          <p className="text-gray-600 text-base">
            {getEmptyStateMessage(activeTab)}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applicants.map((applicant) => (
            <div
              key={applicant.id}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 relative"
            >
              <div className="flex justify-between items-start">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => setSelectedApplicant(applicant)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">{applicant.name}</h3>
                  <p className="text-gray-600">{applicant.email}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Applied on {new Date(applicant.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowDeleteConfirm(applicant.id)
                    }}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete applicant"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => !isDeleting && setShowDeleteConfirm(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this application?
              <br />
              <span className="font-medium text-red-600">This action cannot be undone.</span>
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                disabled={isDeleting}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
