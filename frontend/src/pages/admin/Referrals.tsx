import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { adminApi, AdminReferral } from '../../lib/adminApi'

export default function AdminReferrals() {
  const [referrals, setReferrals] = useState<AdminReferral[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReferrals = () => {
    setLoading(true)
    adminApi
      .getReferrals()
      .then((res) => setReferrals(res.data))
      .catch((e) => setError(e.response?.data?.error ?? 'Failed to load referrals'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchReferrals()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this referral invitation?')) return
    try {
      await adminApi.deleteReferral(id)
      toast.success('Referral deleted')
      fetchReferrals()
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? 'Failed to delete referral')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">{error}</div>
    )
  }

  return (
    <div className="min-w-0">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Referrals / Invitations</h1>

      {/* Mobile: card list */}
      <div className="md:hidden space-y-4">
        {referrals.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-4">
            <p className="font-semibold text-gray-900">{r.inviter?.name ?? r.inviter?.email ?? '—'}</p>
            {r.inviter?.email && r.inviter?.name && <p className="text-xs text-gray-500">{r.inviter.email}</p>}
            <p className="text-sm text-gray-700 mt-2">→ {r.candidate?.name ?? r.candidate?.email ?? '—'}</p>
            {r.candidate?.email && r.candidate?.name && <p className="text-xs text-gray-500">{r.candidate.email}</p>}
            <p className="text-sm text-gray-600 mt-2">{r.job?.title ?? '—'}{r.job?.company ? ` @ ${r.job.company}` : ''}</p>
            <span className={`inline-flex mt-2 px-2 py-0.5 rounded text-xs font-medium ${r.status === 'APPLIED' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
              {r.status}
            </span>
            <p className="text-xs text-gray-500 mt-2">{new Date(r.createdAt).toLocaleDateString()}</p>
            <button
              type="button"
              onClick={() => handleDelete(r.id)}
              className="mt-4 min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 touch-manipulation w-full sm:w-auto"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block bg-white/80 backdrop-blur rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inviter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {referrals.map((r) => (
                <tr key={r.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {r.inviter?.name ?? r.inviter?.email ?? '—'}
                    {r.inviter?.email && r.inviter?.name ? <span className="block text-gray-500 text-xs mt-0.5">{r.inviter.email}</span> : null}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {r.candidate?.name ?? r.candidate?.email ?? '—'}
                    {r.candidate?.email && r.candidate?.name ? <span className="block text-gray-500 text-xs mt-0.5">{r.candidate.email}</span> : null}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {r.job?.title ?? '—'}{r.job?.company ? ` @ ${r.job.company}` : ''}{r.job?.location ? ` · ${r.job.location}` : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${r.status === 'APPLIED' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{r.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" onClick={() => handleDelete(r.id)} className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
