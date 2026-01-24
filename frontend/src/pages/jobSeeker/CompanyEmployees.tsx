import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../lib/api'
import ReferralForm from '../../components/ReferralForm'

interface Employee {
  id: string
  name: string
  email: string
  position: string
  company: {
    id: string
    name: string
  }
}

interface EmployeeWithStatus extends Employee {
  hasApplied?: boolean
  applicationStatus?: string
}

export default function CompanyEmployees() {
  const { companyId } = useParams<{ companyId: string }>()
  const navigate = useNavigate()
  const [employees, setEmployees] = useState<EmployeeWithStatus[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (companyId) {
      fetchEmployees(companyId)
    }
  }, [companyId])

  const fetchEmployees = async (id: string) => {
    try {
      const response = await api.get(`/companies/${id}/employees`)
      const employeesData = response.data || []

      // Check application status for each employee
      const employeesWithStatus = await Promise.all(
        employeesData.map(async (employee: Employee) => {
          try {
            const checkResponse = await api.get(`/applications/check?employeeId=${employee.id}`)
            return {
              ...employee,
              hasApplied: checkResponse.data.hasApplied,
              applicationStatus: checkResponse.data.application?.status || null,
            }
          } catch (error) {
            return {
              ...employee,
              hasApplied: false,
              applicationStatus: null,
            }
          }
        })
      )

      setEmployees(employeesWithStatus)
    } catch (error: any) {
      console.error('Failed to fetch employees:', error)
      if (error.response?.status === 404) {
        // Company not found or user is the only employee
        setEmployees([])
      } else {
        setEmployees([])
      }
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

  if (selectedEmployee) {
    return (
      <ReferralForm
        employee={selectedEmployee}
        onBack={() => setSelectedEmployee(null)}
        onSuccess={() => {
          setSelectedEmployee(null)
          navigate('/job-seeker/applications')
        }}
      />
    )
  }

  if (!isLoading && employees.length === 0) {
    return (
      <div>
        <button
          onClick={() => navigate('/job-seeker')}
          className="mb-4 text-primary-600 hover:text-primary-700 font-medium"
        >
          ← Back to Companies
        </button>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">No employees available at this company.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => navigate('/job-seeker')}
        className="mb-4 text-primary-600 hover:text-primary-700 font-medium"
      >
        ← Back to Companies
      </button>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Employees</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <span className="text-primary-600 font-bold">
                  {employee.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{employee.name}</h3>
                <p className="text-sm text-gray-500">{employee.position}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{employee.email}</p>
            {employee.hasApplied ? (
              <button
                disabled
                className="w-full bg-gray-300 text-gray-600 py-2 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Already Applied
              </button>
            ) : (
              <button
                onClick={() => setSelectedEmployee(employee)}
                className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Request Referral
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

