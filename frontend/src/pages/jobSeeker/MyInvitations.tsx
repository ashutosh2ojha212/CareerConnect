import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'
import ReferralForm from '../../components/ReferralForm'

interface Invitation {
  id: string
  fromEmployeeId: string
  toJobSeekerId: string
  jobPostId: string | null
  status: string
  createdAt: string
  inviterName: string
  jobTitle: string | null
  companyName: string | null
  companyId: string | null
  employeeId: string
}

export default function MyInvitations() {
  const navigate = useNavigate()
  const [list, setList] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Invitation | null>(null)
  const [hasAppliedMap, setHasAppliedMap] = useState<Record<string, boolean>>({})

  const fetchInvitations = async () => {
    try {
      const { data } = await api.get('/invitations/me')
      setList(Array.isArray(data) ? data : [])
    } catch {
      setList([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInvitations()
  }, [])

  useEffect(() => {
    if (selected) return
    list.forEach((inv) => {
      if (inv.status === 'APPLIED' || hasAppliedMap[inv.id]) return
      api.get(`/applications/check?employeeId=${inv.employeeId}`).then((r) => {
        if (r.data?.hasApplied) {
          setHasAppliedMap((m) => ({ ...m, [inv.id]: true }))
        }
      }).catch(() => {})
    })
  }, [list, selected])

  const handleApplyNow = (inv: Invitation) => {
    if (inv.status === 'APPLIED' || hasAppliedMap[inv.id]) return
    setSelected(inv)
  }

  const handleSuccess = async () => {
    if (selected) {
      try {
        await api.put(`/invitations/${selected.id}/apply`)
      } catch (_) {}
      setHasAppliedMap((m) => ({ ...m, [selected.id]: true }))
      setSelected(null)
    }
    navigate('/job-seeker/applications')
  }

  if (selected) {
    const employee = {
      id: selected.employeeId,
      name: selected.inviterName,
      company: {
        id: selected.companyId ?? '',
        name: selected.companyName ?? 'Company',
      },
    }
    return (
      <ReferralForm
        employee={employee}
        onBack={() => setSelected(null)}
        onSuccess={handleSuccess}
      />
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A4CF0]" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My Invitations</h1>
        <p className="text-gray-600 text-base sm:text-lg">Referral invites from employees — apply to submit your candidacy</p>
      </div>

      {list.length === 0 ? (
        <div className="max-w-4xl mx-auto mt-20 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-12 text-center flex flex-col items-center justify-center border border-gray-100">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] flex items-center justify-center shadow-lg mb-6">
            <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No invitations yet</h2>
          <p className="text-gray-600 text-base max-w-md">When employees invite you to apply, they will show up here.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {list.map((inv) => {
            const alreadyApplied = inv.status === 'APPLIED' || hasAppliedMap[inv.id]
            const jobGone = !inv.jobPostId && inv.jobTitle === null && inv.companyName === null
            return (
              <div
                key={inv.id}
                className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {inv.jobTitle ?? 'Referral opportunity'}
                    </h3>
                    <p className="text-base font-medium text-gray-700 mb-1">
                      {inv.companyName ?? 'Company'}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Referred by <span className="font-semibold">{inv.inviterName}</span>
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Invited on {new Date(inv.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center flex-shrink-0">
                    {jobGone ? (
                      <span className="text-sm text-amber-700 font-medium">This job is no longer available</span>
                    ) : alreadyApplied ? (
                      <span className="px-4 py-2 rounded-xl bg-[#34c759] text-white text-sm font-semibold">
                        Applied
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApplyNow(inv)}
                        className="h-11 px-5 rounded-xl bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] text-white font-semibold hover:shadow-lg transition-all"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
