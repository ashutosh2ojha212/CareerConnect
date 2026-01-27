import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import toast from 'react-hot-toast'
import api from '../../lib/api'

interface FormField {
  id: string
  label: string
  type: 'text' | 'number' | 'file'
  required: boolean
}

interface ReferralFormData {
  fields: FormField[]
}

export default function SetupReferralForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasExistingForm, setHasExistingForm] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const dragRef = useRef<HTMLDivElement>(null)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors: _formErrors },
  } = useForm<ReferralFormData>({
    defaultValues: {
      fields: [
        { id: 'name', label: 'Full Name', type: 'text', required: true },
        { id: 'resume', label: 'Resume (PDF)', type: 'file', required: true },
      ],
    },
  })

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'fields',
  })

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      move(draggedIndex, dragOverIndex)
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      move(index, index - 1)
    }
  }

  const handleMoveDown = (index: number) => {
    if (index < fields.length - 1) {
      move(index, index + 1)
    }
  }

  useEffect(() => {
    fetchExistingForm()
  }, [])

  const fetchExistingForm = async () => {
    try {
      const response = await api.get('/referrer/form')
      if (response.data) {
        // Convert any invalid field types to 'text' (for backward compatibility)
        const sanitizedFields = response.data.fields.map((field: FormField) => {
          if (field.type === 'text' || field.type === 'number' || field.type === 'file') {
            return field
          }
          // Convert invalid types to 'text'
          return { ...field, type: 'text' as const }
        })
        setValue('fields', sanitizedFields)
        setHasExistingForm(true)
      }
    } catch (error: any) {
      if (error.response?.status !== 404) {
        console.error('Failed to fetch form:', error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: ReferralFormData) => {
    setIsSubmitting(true)
    try {
      await api.post('/referrer/form', { fields: data.fields })
      toast.success('Referral form saved successfully!')
      navigate('/employee')
    } catch (error: any) {
      console.error('Save error:', error)
      toast.error(error.response?.data?.message || 'Failed to save referral form')
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/employee')}
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        {hasExistingForm && (
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
            Editing existing form
          </span>
        )}
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-8 border border-gray-100">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          {hasExistingForm ? 'Edit Referral Form' : 'Set Up Referral Form'}
        </h1>
        <p className="text-gray-600 mb-8">
          {hasExistingForm
            ? 'Update the form that job seekers will fill out when requesting referrals from you.'
            : 'Create the form that job seekers will fill out when requesting referrals from you.'}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Form Fields */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Form Fields</h2>
              <button
                type="button"
                onClick={addFormField}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl shadow-md hover:opacity-90 active:scale-[0.97] transition-all duration-200 text-sm"
              >
                + Add Field
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Define the fields that job seekers need to fill when requesting a referral.
            </p>

            <p className="text-xs text-gray-500 mb-2">
              Drag fields to reorder, or use the arrow buttons.
            </p>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`border rounded-xl p-5 bg-gray-50/50 transition-all duration-200 ${
                    draggedIndex === index
                      ? 'opacity-50 border-indigo-400 scale-[0.98]'
                      : dragOverIndex === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Drag Handle and Reorder Buttons */}
                    <div className="flex flex-col items-center gap-1 pt-7">
                      <button
                        type="button"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move up"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <div
                        className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600"
                        title="Drag to reorder"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        </svg>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === fields.length - 1}
                        className="p-1 text-gray-400 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move down"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {/* Field Configuration */}
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Field Label
                          </label>
                          <input
                            type="text"
                            {...register(`fields.${index}.label` as const, {
                              required: 'Label is required',
                            })}
                            className="w-full h-11 px-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                            placeholder="e.g., Full Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Field Type
                          </label>
                          <select
                            {...register(`fields.${index}.type` as const)}
                            className="w-full h-11 px-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                          >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="file">File Upload</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            {...register(`fields.${index}.required` as const)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                          />
                          <span className="ml-2 text-sm text-gray-700">Required</span>
                        </label>
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors flex items-center gap-1"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/employee')}
              className="flex-1 h-12 px-4 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-md"
            >
              {isSubmitting ? 'Saving...' : hasExistingForm ? 'Update Form' : 'Save Form'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
