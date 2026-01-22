import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import toast from 'react-hot-toast'
import api from '../../lib/api'

interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'file'
  required: boolean
}

interface JobPostForm {
  title: string
  description: string
  companyId: string
  formFields: FormField[]
}

export default function CreateJobPost() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<JobPostForm>({
    defaultValues: {
      formFields: [
        { id: 'name', label: 'Full Name', type: 'text', required: true },
        { id: 'email', label: 'Email', type: 'email', required: true },
        { id: 'resume', label: 'Resume (PDF)', type: 'file', required: true },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'formFields',
  })

  const onSubmit = async (data: JobPostForm) => {
    setIsSubmitting(true)
    try {
      const response = await api.post('/jobs', data)
      toast.success('Job post created successfully!')
      navigate(`/employee/job/${response.data.id}`)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create job post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const addFormField = () => {
    append({
      id: `field_${Date.now()}`,
      label: '',
      type: 'text',
      required: false,
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/employee')}
        className="mb-4 text-primary-600 hover:text-primary-700 font-medium"
      >
        ← Back to Job Posts
      </button>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Job Post</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Job Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Job Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('title', { required: 'Job title is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="e.g., Senior Software Engineer"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="Describe the job position, requirements, and benefits..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Custom Form Fields */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Application Form Fields
              </h2>
              <button
                type="button"
                onClick={addFormField}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                + Add Field
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Define the fields that job seekers need to fill when applying for this position.
            </p>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field Label
                      </label>
                      <input
                        type="text"
                        {...register(`formFields.${index}.label` as const, {
                          required: 'Label is required',
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        placeholder="e.g., Years of Experience"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field Type
                      </label>
                      <select
                        {...register(`formFields.${index}.type` as const)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="tel">Phone</option>
                        <option value="number">Number</option>
                        <option value="textarea">Textarea</option>
                        <option value="file">File (PDF)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register(`formFields.${index}.required` as const)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Required</span>
                    </label>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/employee')}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Job Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

