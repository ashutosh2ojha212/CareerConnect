import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import api from '../../lib/api'

interface JobPostForm {
  companyName: string
  title: string
  experience: number
  location: string
  skills: string[]
  description?: string
}

export default function EditJobPost() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState('')
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JobPostForm>({
    defaultValues: {
      companyName: '',
      experience: undefined,
      location: '',
      skills: [],
      description: '',
    },
  })

  useEffect(() => {
    if (id) {
      fetchJobPost(id)
    }
  }, [id])

  const fetchJobPost = async (jobId: string) => {
    try {
      const response = await api.get(`/jobs/${jobId}`)
      const job = response.data
      setValue('companyName', job.companyName || '')
      setValue('title', job.title || '')
      setValue('experience', job.experience || 0)
      setValue('location', job.location || '')
      setValue('description', job.description || '')
      if (job.skills && Array.isArray(job.skills)) {
        setSkills(job.skills)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load job post')
      navigate('/employee')
    } finally {
      setIsLoading(false)
    }
  }

  const addSkill = () => {
    const trimmedSkill = skillInput.trim()
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill])
      setSkillInput('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleSkillKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  const onSubmit = async (data: JobPostForm) => {
    setIsSubmitting(true)
    try {
      const payload = {
        companyName: data.companyName,
        title: data.title,
        experience: Number(data.experience),
        location: data.location,
        skills: skills.length > 0 ? skills : [],
        description: data.description || null,
      }
      await api.put(`/jobs/${id}`, payload)
      toast.success('Job updated successfully!')
      navigate('/employee')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update job post')
    } finally {
      setIsSubmitting(false)
    }
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
      <button
        onClick={() => navigate('/employee')}
        className="mb-6 text-indigo-600 hover:text-indigo-700 font-medium transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Job Posts
      </button>

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-8 border border-gray-100">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Edit Job Post</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Job Information Section */}
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-900">Job Information</h2>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('companyName', { required: 'Company name is required' })}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:shadow-md transition-all duration-200"
                placeholder="e.g., Google, TCS, Infosys"
              />
              {errors.companyName && (
                <p className="mt-1.5 text-sm text-red-600">{errors.companyName.message}</p>
              )}
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('title', { required: 'Job title is required' })}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:shadow-md transition-all duration-200"
                placeholder="e.g., Senior Software Engineer"
              />
              {errors.title && (
                <p className="mt-1.5 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Minimum Years of Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                {...register('experience', {
                  required: 'Minimum years of experience is required',
                  valueAsNumber: true,
                  validate: (value) => {
                    if (isNaN(value) || value < 0) {
                      return 'Experience must be a positive number'
                    }
                    return true
                  },
                })}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:shadow-md transition-all duration-200"
                placeholder="e.g., 2"
              />
              {errors.experience && (
                <p className="mt-1.5 text-sm text-red-600">{errors.experience.message}</p>
              )}
            </div>

            {/* Job Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('location', { required: 'Job location is required' })}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:shadow-md transition-all duration-200"
                placeholder="e.g., Bangalore, Pune"
              />
              {errors.location && (
                <p className="mt-1.5 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Skills
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleSkillKeyPress}
                  className="flex-1 h-12 px-4 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:shadow-md transition-all duration-200"
                  placeholder="e.g., React"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="h-12 w-12 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 active:scale-[0.97] transition-all duration-200 flex items-center justify-center shadow-md"
                  title="Add Skill"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium shadow-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-indigo-900 transition-colors ml-0.5"
                        title="Remove skill"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                {...register('description')}
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:shadow-md transition-all duration-200 resize-none"
                placeholder="Describe the job position, requirements, and benefits..."
              />
            </div>
          </div>

          {/* Action Buttons */}
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
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-md"
            >
              {isSubmitting ? 'Updating...' : 'Update Job Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
