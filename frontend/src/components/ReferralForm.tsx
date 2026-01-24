import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import api from '../lib/api'

interface Employee {
  id: string
  name: string
  company: {
    id: string
    name: string
  }
}

interface ReferralFormProps {
  employee: Employee
  onBack: () => void
  onSuccess: () => void
}

interface FormData {
  [key: string]: string | File
}

export default function ReferralForm({ employee, onBack, onSuccess }: ReferralFormProps) {
  const [formFields, setFormFields] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null)
  const { register, handleSubmit } = useForm<FormData>()

  useEffect(() => {
    fetchFormFields()
    checkApplicationStatus()
  }, [])

  const checkApplicationStatus = async () => {
    try {
      const response = await api.get(`/applications/check?employeeId=${employee.id}`)
      if (response.data.hasApplied) {
        setHasApplied(true)
        setApplicationStatus(response.data.application?.status || null)
      }
    } catch (error) {
      console.error('Failed to check application status:', error)
    }
  }

  const fetchFormFields = async () => {
    try {
      // Fetch custom form fields for this employee/company
      const response = await api.get(`/employees/${employee.id}/form-fields`)
      setFormFields(response.data)
    } catch (error) {
      // Default form fields if none exist
      setFormFields([
        { id: 'name', label: 'Full Name', type: 'text', required: true },
        { id: 'email', label: 'Email', type: 'email', required: true },
        { id: 'phone', label: 'Phone Number', type: 'tel', required: false },
        { id: 'experience', label: 'Years of Experience', type: 'number', required: false },
        { id: 'resume', label: 'Resume (PDF)', type: 'file', required: true },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      
      Object.keys(data).forEach((key) => {
        if (data[key] instanceof File) {
          formData.append(key, data[key] as File)
        } else {
          formData.append(key, data[key] as string)
        }
      })

      await api.post(`/applications/${employee.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('Referral request submitted successfully!')
      setHasApplied(true)
      onSuccess()
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error('You already applied to this job')
        setHasApplied(true)
        // Refresh application status
        checkApplicationStatus()
      } else {
        toast.error(error.response?.data?.message || 'Failed to submit application')
      }
    } finally {
      setIsSubmitting(false)
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
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="mb-4 text-primary-600 hover:text-primary-700 font-medium"
      >
        ← Back
      </button>
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Request Referral from {employee.name}
        </h2>
        <p className="text-gray-600 mb-6">{employee.company.name}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {formFields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'file' ? (
                <input
                  type="file"
                  accept=".pdf"
                  {...register(field.id, { required: field.required })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              ) : (
                <input
                  type={field.type}
                  {...register(field.id, { required: field.required })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              )}
            </div>
          ))}

          {hasApplied ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <p className="font-semibold text-yellow-800">Already Applied</p>
              </div>
              {applicationStatus && (
                <p className="text-sm text-yellow-700">
                  Status: <span className="font-medium capitalize">{applicationStatus}</span>
                </p>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || hasApplied}
                className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

