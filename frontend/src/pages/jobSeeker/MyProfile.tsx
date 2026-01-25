import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { useAuthStore } from '../../store/authStore'

interface ProfileForm {
  fullName: string
  email: string
  primaryRole: string
  experience: number | string
  jobPreferences: string
  profileSummary: string
  skills: string
}

const LOCATION_OPTIONS = [
  'Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata',
  'Remote', 'Gurgaon', 'Noida', 'Ahmedabad', 'Kochi', 'Chandigarh',
]

export default function MyProfile() {
  const { user } = useAuthStore()
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [skillsInput, setSkillsInput] = useState('')
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const loadErrorShown = useRef(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileForm>()

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/job-seekers/me')
      setProfile(data)
      setValue('fullName', data.fullName || '')
      setValue('email', data.email || '')
      setValue('primaryRole', data.primaryRole || '')
      setValue('experience', data.experience ?? '')
      setValue('jobPreferences', data.jobPreferences || '')
      setValue('profileSummary', data.profileSummary || '')
      setSkillsInput(Array.isArray(data.skills) ? data.skills.join(', ') : (data.skills || ''))
      setSelectedLocations(Array.isArray(data.preferredLocations) ? data.preferredLocations : [])
    } catch (e: any) {
      // 404 or any error = no profile yet → show empty form in edit mode
      setProfile(null)
      setIsEditing(true)
      const name = user?.name ?? ''
      const email = user?.email ?? ''
      setValue('fullName', name)
      setValue('email', email)
      setValue('primaryRole', '')
      setValue('experience', '')
      setValue('jobPreferences', '')
      setValue('profileSummary', '')
      setSkillsInput('')
      setSelectedLocations([])
      const status = e.response?.status
      if (status !== 404 && !loadErrorShown.current) {
        loadErrorShown.current = true
        toast.error(e.response?.data?.message || 'Couldn’t load profile. You can create one below.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    )
  }

  const onSubmit = async (form: ProfileForm) => {
    setIsSaving(true)
    try {
      const skillsArr = skillsInput
        .split(/[\s,]+/)
        .map((s) => s.trim())
        .filter(Boolean)

      let resumeUrl = profile?.resumeUrl
      if (resumeFile) {
        const fd = new FormData()
        fd.append('resume', resumeFile)
        const { data } = await api.post('/job-seekers/me/resume', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        resumeUrl = data.resumeUrl
      }

      await api.put('/job-seekers/me', {
        fullName: form.fullName,
        email: form.email,
        primaryRole: form.primaryRole || null,
        experience: form.experience === '' ? null : Number(form.experience),
        jobPreferences: form.jobPreferences || null,
        profileSummary: form.profileSummary || null,
        preferredLocations: selectedLocations,
        skills: skillsArr,
        resumeUrl,
      })
      toast.success('Profile saved successfully')
      setIsEditing(false)
      setResumeFile(null)
      fetchProfile()
    } catch (e: any) {
      toast.error(e.response?.data?.message || 'Failed to save profile')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A4CF0]" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Manage your job seeker profile so recruiters can find you
          </p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="h-12 px-6 rounded-xl bg-[#4A4CF0] text-white font-semibold hover:bg-[#6366F1] transition-colors shrink-0"
          >
            Edit Profile
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              {...register('fullName', { required: 'Full name is required' })}
              disabled={!isEditing}
              className="w-full h-11 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 disabled:bg-gray-50 disabled:text-gray-600 focus:ring-2 focus:ring-[#4A4CF0]/30 focus:border-[#4A4CF0]"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              disabled={!isEditing}
              className="w-full h-11 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 disabled:bg-gray-50 disabled:text-gray-600 focus:ring-2 focus:ring-[#4A4CF0]/30 focus:border-[#4A4CF0]"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Role / Designation</label>
            <input
              {...register('primaryRole')}
              disabled={!isEditing}
              placeholder="e.g. Software Engineer"
              className="w-full h-11 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-600 focus:ring-2 focus:ring-[#4A4CF0]/30 focus:border-[#4A4CF0]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
            <input
              type="number"
              min={0}
              {...register('experience', { min: { value: 0, message: 'Must be 0 or more' } })}
              disabled={!isEditing}
              placeholder="e.g. 5"
              className="w-full h-11 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-600 focus:ring-2 focus:ring-[#4A4CF0]/30 focus:border-[#4A4CF0]"
            />
            {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Job Role</label>
          <input
            {...register('jobPreferences')}
            disabled={!isEditing}
            placeholder="e.g. Product Manager, Backend Developer"
            className="w-full h-11 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-600 focus:ring-2 focus:ring-[#4A4CF0]/30 focus:border-[#4A4CF0]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Locations</label>
          <div className="flex flex-wrap gap-2">
            {LOCATION_OPTIONS.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => isEditing && toggleLocation(loc)}
                disabled={!isEditing}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  selectedLocations.includes(loc)
                    ? 'bg-[#4A4CF0] text-white border-[#4A4CF0]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#4A4CF0]'
                } ${!isEditing ? 'cursor-default opacity-90' : ''}`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Skills (comma or space separated)</label>
          <input
            value={skillsInput}
            onChange={(e) => isEditing && setSkillsInput(e.target.value)}
            disabled={!isEditing}
            placeholder="e.g. React, Node.js, TypeScript"
            className="w-full h-11 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-600 focus:ring-2 focus:ring-[#4A4CF0]/30 focus:border-[#4A4CF0]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resume (PDF)</label>
          {isEditing ? (
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#EEF0FF] file:text-[#4A4CF0] file:font-semibold"
            />
          ) : (
            <div className="flex items-center gap-2 text-gray-700">
              {profile?.resumeUrl ? (
                <a
                  href={profile.resumeUrl.startsWith('http') ? profile.resumeUrl : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001'}${profile.resumeUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4A4CF0] font-medium hover:underline"
                >
                  View resume
                </a>
              ) : (
                <span className="text-gray-500">No resume uploaded</span>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Summary / Bio</label>
          <textarea
            {...register('profileSummary')}
            disabled={!isEditing}
            rows={4}
            placeholder="A short summary of your experience and what you're looking for..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-600 focus:ring-2 focus:ring-[#4A4CF0]/30 focus:border-[#4A4CF0] resize-none"
          />
        </div>

        {isEditing && (
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="h-12 px-6 rounded-xl bg-[#4A4CF0] text-white font-semibold hover:bg-[#6366F1] disabled:opacity-60 transition-colors"
            >
              {isSaving ? 'Saving…' : 'Save Profile'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false)
                setResumeFile(null)
                fetchProfile()
              }}
              className="h-12 px-6 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
