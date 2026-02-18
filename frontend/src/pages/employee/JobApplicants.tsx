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

  const getStatusDisplayLabel = (status: string) => {
    if (status === 'approved') return 'Referred'
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const getEmptyStateMessage = (status: TabStatus) => {
    switch (status) {
      case 'pending':
        return 'No pending applicants yet.'
      case 'approved':
        return 'No referred applicants yet.'
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
      <div className="min-h-screen bg-gradient-to-br from-[#fefefe] via-[#faf9f7] to-[#f5f4f2]">
        <div className="max-w-5xl mx-auto px-6 py-10">
          {/* Back Button */}
          <button
            onClick={() => setSelectedApplicant(null)}
            className="mb-8 text-[#4A4CF0] hover:text-[#6366F1] font-semibold transition-colors flex items-center gap-2 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Applicants
          </button>

          {/* Applicant Header Card */}
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-8 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Applicant Identity Block */}
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {getInitials(selectedApplicant.name)}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">{selectedApplicant.name}</h2>
                  <p className="text-gray-600 text-base">{selectedApplicant.email}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span
                  className={`inline-flex items-center px-5 py-2.5 rounded-full text-sm font-bold shadow-sm ${
                    selectedApplicant.status === 'approved'
                      ? 'bg-[#34c759] text-white'
                      : selectedApplicant.status === 'rejected'
                      ? 'bg-[#ff3b30] text-white'
                      : 'bg-[#ffcc00] text-gray-900'
                  }`}
                >
                  {selectedApplicant.status === 'approved' && (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {selectedApplicant.status === 'rejected' && (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  {selectedApplicant.status === 'pending' && (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  )}
                  {getStatusDisplayLabel(selectedApplicant.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Metadata Section */}
          {selectedApplicant.jobPost && (
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-8 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Job & Submission Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Applied On</p>
                  <p className="text-base font-semibold text-gray-900">{formatDate(selectedApplicant.createdAt)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Company</p>
                  <p className="text-base font-semibold text-gray-900">
                    {selectedApplicant.jobPost.companyName || selectedApplicant.jobPost.company?.name}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Role Applied For</p>
                  <p className="text-base font-semibold text-gray-900">{selectedApplicant.jobPost.title}</p>
                </div>
                {selectedApplicant.jobPost.experience && (
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Required Experience</p>
                    <p className="text-base font-semibold text-gray-900">{selectedApplicant.jobPost.experience}+ years</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Application Details Section */}
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Application Details</h3>
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
                    const strVal = value != null ? String(value).trim() : ''
                    let fieldType: 'text' | 'file' | 'email' | 'tel' | 'number' | 'textarea' = 'text'
                    let fileUrl: string | undefined = undefined
                    let label: string

                    // Human-readable labels for auto-generated keys (e.g. FIELD_1770213202030)
                    if (/^FIELD_\d+$/i.test(key) && strVal) {
                      if (/^[\d+\s\-.]{8,15}$/.test(strVal) && /^\d[\d\s\-.]{7,}$/.test(strVal.replace(/\s/g, ''))) {
                        fieldType = 'tel'
                        label = 'Phone Number'
                      } else if (/^\d+(\.\d+)?$/.test(strVal)) {
                        fieldType = 'number'
                        label = 'Years of Experience'
                      } else if (strVal.includes('@') && strVal.includes('.')) {
                        fieldType = 'email'
                        label = 'Email'
                      } else {
                        label = 'Additional field'
                      }
                    } else {
                      label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
                      if (key.toLowerCase().includes('email')) fieldType = 'email'
                      else if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('tel')) fieldType = 'tel'
                      else if (key.toLowerCase().includes('experience') || key.toLowerCase().includes('year')) fieldType = 'number'
                      else if (key.toLowerCase().includes('resume') || key.toLowerCase().includes('file')) {
                        fieldType = 'file'
                        fileUrl = typeof value === 'string' ? value : selectedApplicant.resumeUrl
                      }
                    }

                    return (
                      <ApplicationFieldRow
                        key={key}
                        label={label}
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
                  className="h-14 bg-gradient-to-r from-[#34c759] to-[#30d158] text-white rounded-2xl font-bold text-base hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Refer Applicant
                </button>
                <button
                  onClick={() => updateStatus(selectedApplicant.id, 'rejected')}
                  className="h-14 bg-gradient-to-r from-[#ff3b30] to-[#ff453a] text-white rounded-2xl font-bold text-base hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reject Application
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-200">
                <p className="text-gray-700 text-base font-medium">
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
    <div className="min-w-0">
      <button
        onClick={() => navigate('/employee')}
        className="mb-6 sm:mb-8 text-[#4A4CF0] hover:text-[#6366F1] font-semibold transition-colors flex items-center gap-2 group min-h-[44px] touch-manipulation"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Job Posts
      </button>

      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Applicants</h1>
        <p className="text-gray-600 text-sm sm:text-lg">Review and manage job applications</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 sm:mb-8 border-b-2 border-gray-200 overflow-x-auto scrollbar-hide">
        <nav className="flex space-x-6 sm:space-x-8 min-w-max" aria-label="Tabs">
          {(['pending', 'approved', 'rejected'] as TabStatus[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                relative pb-4 px-2 border-b-3 font-bold text-sm sm:text-base transition-all duration-200 min-h-[44px] touch-manipulation
                ${
                  activeTab === tab
                    ? 'border-[#4A4CF0] text-[#4A4CF0]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {getStatusDisplayLabel(tab)}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full"></div>
              )}
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
        <div className="max-w-4xl mx-auto mt-20 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-12 text-center flex flex-col items-center justify-center border border-gray-100">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] flex items-center justify-center shadow-lg mb-6">
            <svg
              className="h-12 w-12 text-white"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No applicants found</h2>
          <p className="text-gray-600 text-base max-w-md">
            {getEmptyStateMessage(activeTab)}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applicants.map((applicant) => (
            <div
              key={applicant.id}
              className="group bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-4 sm:p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 relative cursor-pointer min-w-0"
              onClick={() => setSelectedApplicant(applicant)}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                    <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-md flex-shrink-0">
                      {getInitials(applicant.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">{applicant.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{applicant.email}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5 sm:ml-14">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Applied on {new Date(applicant.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <span
                    className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-sm ${
                      applicant.status === 'approved'
                        ? 'bg-[#34c759] text-white'
                        : applicant.status === 'rejected'
                        ? 'bg-[#ff3b30] text-white'
                        : 'bg-[#ffcc00] text-gray-900'
                    }`}
                  >
                    {getStatusDisplayLabel(applicant.status)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowDeleteConfirm(applicant.id)
                    }}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 active:bg-red-100 rounded-xl transition-all duration-200 touch-manipulation"
                    title="Delete applicant"
                    aria-label="Delete applicant"
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => !isDeleting && setShowDeleteConfirm(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-8 text-base leading-relaxed">
              Are you sure you want to delete this application?
              <br />
              <span className="font-bold text-red-600">This action cannot be undone.</span>
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                disabled={isDeleting}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                disabled={isDeleting}
                className="px-6 py-3 text-white bg-gradient-to-r from-[#ff3b30] to-[#ff453a] rounded-xl hover:shadow-lg transition-all duration-200 font-bold disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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
