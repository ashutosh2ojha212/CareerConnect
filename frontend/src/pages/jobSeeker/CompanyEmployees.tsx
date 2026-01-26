import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../lib/api'
import ReferralForm from '../../components/ReferralForm'

interface JobPost {
  id: string
  title: string
  companyName: string
  description?: string | null
  experience?: number | null
  location?: string | null
  skills?: string[]
  applicantCount: number
  createdAt: string
  postedBy: { id: string; name: string }
}

interface CompanyDetail {
  id: string
  name: string
  description?: string | null
  logo?: string | null
  employeeCount: number
  jobPosts: JobPost[]
}

interface Employee {
  id: string
  name: string
  email: string
  position: string | null
  company: { id: string; name: string }
}

export default function CompanyEmployees() {
  const { companyId } = useParams<{ companyId: string }>()
  const navigate = useNavigate()
  const [company, setCompany] = useState<CompanyDetail | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalJob, setModalJob] = useState<JobPost | null>(null)
  const [referralTarget, setReferralTarget] = useState<{ employee: Employee; jobPostId: string } | null>(null)

  useEffect(() => {
    if (companyId) {
      fetchData()
    }
  }, [companyId])

  const fetchData = async () => {
    if (!companyId) return
    const isUuid = /^[0-9a-f-]{36}$/i.test(companyId)
    const param = isUuid ? companyId : encodeURIComponent(companyId)
    try {
      const [companyRes, employeesRes] = await Promise.all([
        api.get(`/companies/${param}`),
        api.get(`/companies/${param}/employees`).catch(() => ({ data: [] })),
      ])
      setCompany(companyRes.data)
      setEmployees(employeesRes.data || [])
    } catch (e: any) {
      if (e.response?.status === 404) setCompany(null)
      else setCompany(null)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A4CF0]" />
      </div>
    )
  }

  if (referralTarget) {
    return (
      <ReferralForm
        employee={referralTarget.employee}
        jobPostId={referralTarget.jobPostId}
        onBack={() => setReferralTarget(null)}
        onSuccess={() => {
          setReferralTarget(null)
          setModalJob(null)
          navigate('/job-seeker/applications')
        }}
      />
    )
  }

  if (!company) {
    return (
      <div>
        <button
          onClick={() => navigate('/job-seeker')}
          className="mb-4 text-[#4A4CF0] hover:text-[#6366F1] font-semibold"
        >
          ← Back to Companies
        </button>
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <p className="text-gray-600">Company not found.</p>
        </div>
      </div>
    )
  }

  const jobPosts = company.jobPosts || []

  return (
    <div>
      <button
        onClick={() => navigate('/job-seeker')}
        className="mb-4 text-[#4A4CF0] hover:text-[#6366F1] font-semibold flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Companies
      </button>

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{company.name}</h1>
        {company.description && (
          <p className="text-gray-600 text-base">{company.description}</p>
        )}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Openings</h2>

      {jobPosts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-8 text-center border border-gray-100">
          <p className="text-gray-600">No job openings at this company right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {jobPosts.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-3">Posted by {job.postedBy.name}</p>
              {job.description && (
                <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.experience != null && (
                  <span className="px-3 py-1 bg-[#EEF0FF] text-[#4A4CF0] rounded-lg text-sm font-medium">
                    {job.experience}+ years
                  </span>
                )}
                {job.location && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                    {job.location}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {job.applicantCount} {job.applicantCount === 1 ? 'applicant' : 'applicants'}
              </p>
              <button
                onClick={() => setModalJob(job)}
                className="w-full py-2.5 rounded-xl bg-[#4A4CF0] text-white font-semibold hover:bg-[#6366F1] transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {modalJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setModalJob(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{modalJob.title}</h3>
              <button
                onClick={() => setModalJob(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 font-medium mb-2">{company.name}</p>
            {modalJob.description && (
              <p className="text-gray-700 mb-4 whitespace-pre-wrap">{modalJob.description}</p>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {modalJob.experience != null && (
                <span className="px-3 py-1 bg-[#EEF0FF] text-[#4A4CF0] rounded-lg text-sm font-medium">
                  {modalJob.experience}+ years
                </span>
              )}
              {modalJob.location && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                  {modalJob.location}
                </span>
              )}
            </div>
            {modalJob.skills && modalJob.skills.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {modalJob.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#EEF0FF] text-[#4A4CF0] rounded-lg text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <p className="text-sm font-medium text-gray-700 mb-2">Referring employee</p>
            <p className="text-gray-600 mb-4">{modalJob.postedBy.name}</p>
            <button
              onClick={() => {
                const emp = employees.find((e) => e.id === modalJob.postedBy.id)
                const employee: Employee = emp || {
                  id: modalJob.postedBy.id,
                  name: modalJob.postedBy.name,
                  email: '',
                  position: null,
                  company: { id: company.id, name: company.name },
                }
                setReferralTarget({ employee, jobPostId: modalJob.id })
                setModalJob(null)
              }}
              className="w-full py-3 rounded-xl bg-[#4A4CF0] text-white font-semibold hover:bg-[#6366F1] transition"
            >
              Request Referral
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
