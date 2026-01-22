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

export default function CompanyEmployees() {
  const { companyId } = useParams<{ companyId: string }>()
  const navigate = useNavigate()
  const [employees, setEmployees] = useState<Employee[]>([])
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
      setEmployees(response.data)
    } catch (error) {
      console.error('Failed to fetch employees:', error)
      // Mock data
      setEmployees([
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          position: 'Senior Software Engineer',
          company: { id: id, name: 'Tech Corp' },
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          position: 'Engineering Manager',
          company: { id: id, name: 'Tech Corp' },
        },
      ])
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
            <button
              onClick={() => setSelectedEmployee(employee)}
              className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Request Referral
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

