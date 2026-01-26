import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'

interface Company {
  id: string
  name: string
  description?: string | null
  logo?: string
  employeeCount: number
  jobPostCount?: number
}

export default function Companies() {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      const response = await api.get('/companies')
      setCompanies(response.data || [])
    } catch (error) {
      console.error('Failed to fetch companies:', error)
      setCompanies([])
    } finally {
      setIsLoading(false)
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
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Browse Companies</h1>
        <p className="text-gray-600 text-base sm:text-lg">Discover companies and connect with employees for referrals</p>
      </div>
      {companies.length === 0 ? (
        <div className="max-w-4xl mx-auto mt-20 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-12 text-center flex flex-col items-center justify-center border border-gray-100">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] flex items-center justify-center shadow-lg mb-6">
            <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No companies available yet</h2>
          <p className="text-gray-600 text-base max-w-md">Check back later for companies and referral opportunities.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => {
            const displayName = company.name
            return (
          <div
            key={company.id}
            onClick={() => navigate(`/job-seeker/company/${company.id}`)}
            className="group bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center mb-5">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] flex items-center justify-center mr-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-xl">
                  {displayName.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{displayName}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {company.jobPostCount ?? 0} {company.jobPostCount === 1 ? 'job opening' : 'job openings'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {company.employeeCount ?? 0} {company.employeeCount === 1 ? 'referrer' : 'referrers'}
                  </span>
                </div>
              </div>
            </div>
            {company.description != null && company.description !== '' && (
              <p className="text-gray-600 mb-5 leading-relaxed">{company.description}</p>
            )}
            <button className="mt-4 text-[#4A4CF0] hover:text-[#6366F1] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
              View Opportunities
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

