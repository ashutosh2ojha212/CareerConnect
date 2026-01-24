import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'

interface Company {
  id: string
  name: string
  description: string
  logo?: string
  employeeCount: number
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Companies</h1>
      {companies.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">No companies available at this time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
          <div
            key={company.id}
            onClick={() => navigate(`/job-seeker/company/${company.id}`)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <span className="text-primary-600 font-bold text-lg">
                  {company.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
                <p className="text-sm text-gray-500">{company.employeeCount} employees</p>
              </div>
            </div>
            <p className="text-gray-600">{company.description}</p>
            <button className="mt-4 text-primary-600 hover:text-primary-700 font-medium">
              View Employees →
            </button>
          </div>
        ))}
        </div>
      )}
    </div>
  )
}

