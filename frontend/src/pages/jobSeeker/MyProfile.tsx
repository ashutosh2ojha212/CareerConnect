import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { useAuthStore } from '../../store/authStore'
import { calculateProfileCompletion, type ProfileForCompletion } from '../../utils/profileCompletion'

interface ProfileForm {
  fullName: string
  email: string
  primaryRole: string
  experience: number | string
  profileSummary: string
}

function ChipAddSection({
  label,
  placeholder,
  chips,
  onAdd,
  onRemove,
  disabled,
}: {
  label: string
  placeholder: string
  chips: string[]
  onAdd: (value: string) => void
  onRemove: (index: number) => void
  disabled: boolean
}) {
  const [input, setInput] = useState('')
  const handleAdd = () => {
    const v = input.trim()
    if (v && !chips.includes(v)) {
      onAdd(v)
      setInput('')
    }
  }
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          onBlur={handleAdd}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 min-w-[120px] h-11 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-600 focus:ring-2 focus:ring-[#4A4CF0]/30 focus:border-[#4A4CF0]"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={disabled}
          className="h-11 px-4 rounded-xl bg-[#EEF0FF] text-[#4A4CF0] font-semibold hover:bg-[#D4D7FF] disabled:opacity-60 transition-colors shrink-0"
        >
          + Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {chips.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EEF0FF] text-[#4A4CF0] text-sm font-medium border border-[#D4D7FF]"
          >
            {item}
            {!disabled && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-0.5 hover:bg-[#4A4CF0]/20 rounded-full transition-colors"
                aria-label={`Remove ${item}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function MyProfile() {
  const { user } = useAuthStore()
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [preferredJobRoles, setPreferredJobRoles] = useState<string[]>([])
  const [preferredLocations, setPreferredLocations] = useState<string[]>([])
  const [keySkills, setKeySkills] = useState<string[]>([])
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const loadErrorShown = useRef(false)

  const { register, handleSubmit, setValue, watch } = useForm<ProfileForm>()

  const watched = watch()

  const completion = calculateProfileCompletion({
    fullName: watched.fullName ?? profile?.fullName,
    email: watched.email ?? profile?.email,
    primaryRole: watched.primaryRole ?? profile?.primaryRole,
    experience: watched.experience ?? profile?.experience,
    jobPreferences: preferredJobRoles,
    preferredLocations,
    skills: keySkills,
    resumeUrl: profile?.resumeUrl,
    profileSummary: watched.profileSummary ?? profile?.profileSummary,
  } as ProfileForCompletion)

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/job-seekers/me')
      setProfile(data)
      setValue('fullName', data.fullName || '')
      setValue('email', data.email || '')
      setValue('primaryRole', data.primaryRole || '')
      setValue('experience', data.experience ?? '')
      setValue('profileSummary', data.profileSummary || '')
      setPreferredJobRoles(parseJobPreferences(data.jobPreferences))
      setPreferredLocations(Array.isArray(data.preferredLocations) ? data.preferredLocations : [])
      setKeySkills(Array.isArray(data.skills) ? data.skills : [])
    } catch (e: any) {
      setProfile(null)
      setIsEditing(true)
      setValue('fullName', user?.name ?? '')
      setValue('email', user?.email ?? '')
      setValue('primaryRole', '')
      setValue('experience', '')
      setValue('profileSummary', '')
      setPreferredJobRoles([])
      setPreferredLocations([])
      setKeySkills([])
      if (e.response?.status !== 404 && !loadErrorShown.current) {
        loadErrorShown.current = true
        toast.error(e.response?.data?.message || "Couldn't load profile. You can create one below.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  function parseJobPreferences(v: unknown): string[] {
    if (Array.isArray(v)) return v.map(String).filter(Boolean)
    if (typeof v === 'string' && v.trim()) {
      try {
        const p = JSON.parse(v)
        return Array.isArray(p) ? p.map(String).filter(Boolean) : [v.trim()]
      } catch {
        return v.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean)
      }
    }
    return []
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const onSubmit = async (form: ProfileForm) => {
    setIsSaving(true)
    try {
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
        fullName: form.fullName || null,
        email: form.email || null,
        primaryRole: form.primaryRole || null,
        experience: form.experience === '' ? null : Number(form.experience),
        jobPreferences: preferredJobRoles.length ? JSON.stringify(preferredJobRoles) : null,
        profileSummary: form.profileSummary || null,
        preferredLocations: preferredLocations.length ? preferredLocations : null,
        skills: keySkills.length ? keySkills : null,
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

  const baseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:3001'

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A4CF0]" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600 text-base sm:text-lg">Manage your job seeker profile so recruiters can find you</p>
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
        {/* Profile completion progress bar */}
        <div className="pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Profile completion</span>
            <span className="text-sm font-bold text-[#4A4CF0]">{completion}%</span>
          </div>
          <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] transition-all duration-300"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              {...register('fullName')}
              disabled={!isEditing}
              placeholder="Your full name"
              className="w-full h-11 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-600 focus:ring-2 focus:ring-[#4A4CF0]/30 focus:border-[#4A4CF0]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register('email')}
              disabled={!isEditing}
              placeholder="you@example.com"
              className="w-full h-11 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-600 focus:ring-2 focus:ring-[#4A4CF0]/30 focus:border-[#4A4CF0]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
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
              step="0.1"
              {...register('experience')}
              disabled={!isEditing}
              placeholder="e.g. 5 or 2.5"
              className="w-full h-11 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-600 focus:ring-2 focus:ring-[#4A4CF0]/30 focus:border-[#4A4CF0]"
            />
          </div>
        </div>

        <ChipAddSection
          label="Preferred Job Roles"
          placeholder="e.g. Full Stack Developer"
          chips={preferredJobRoles}
          onAdd={(v) => setPreferredJobRoles((p) => (p.includes(v) ? p : [...p, v]))}
          onRemove={(i) => setPreferredJobRoles((p) => p.filter((_, j) => j !== i))}
          disabled={!isEditing}
        />

        <ChipAddSection
          label="Preferred Locations"
          placeholder="e.g. Bangalore, Remote"
          chips={preferredLocations}
          onAdd={(v) => setPreferredLocations((p) => (p.includes(v) ? p : [...p, v]))}
          onRemove={(i) => setPreferredLocations((p) => p.filter((_, j) => j !== i))}
          disabled={!isEditing}
        />

        <ChipAddSection
          label="Key Skills"
          placeholder="e.g. React, Node.js"
          chips={keySkills}
          onAdd={(v) => setKeySkills((p) => (p.includes(v) ? p : [...p, v]))}
          onRemove={(i) => setKeySkills((p) => p.filter((_, j) => j !== i))}
          disabled={!isEditing}
        />

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
                  href={profile.resumeUrl.startsWith('http') ? profile.resumeUrl : `${baseUrl}${profile.resumeUrl}`}
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
