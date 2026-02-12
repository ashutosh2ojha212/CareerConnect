import { useState, useEffect } from 'react'
import { adminApi, AdminStats } from '../../lib/adminApi'

function StatCard({
  label,
  value,
  sub,
}: {
  label: string
  value: number
  sub?: string
}) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200/60 shadow-sm p-6 hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {sub != null && <p className="mt-1 text-sm text-gray-500">{sub}</p>}
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    adminApi
      .getStats()
      .then((res) => setStats(res.data))
      .catch((e) => setError(e.response?.data?.error ?? 'Failed to load stats'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-red-700 dark:text-red-300">
        {error ?? 'Failed to load analytics'}
      </div>
    )
  }

  return (
    <div className="min-w-0">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Platform Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Employees" value={stats.employees} />
        <StatCard label="Job Seekers" value={stats.jobSeekers} />
        <StatCard label="Job Posts" value={stats.jobPosts} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Referrals Sent" value={stats.referralsSent} />
        <StatCard label="Pending Referrals" value={stats.pendingReferrals} />
        <StatCard
          label="Accepted / Rejected"
          value={stats.acceptedReferrals}
          sub={`Accepted: ${stats.acceptedReferrals}, Rejected: ${stats.rejectedReferrals}`}
        />
      </div>
    </div>
  )
}
