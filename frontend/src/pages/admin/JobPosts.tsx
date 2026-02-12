import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { adminApi, AdminJobPost } from '../../lib/adminApi'

export default function AdminJobPosts() {
  const [posts, setPosts] = useState<AdminJobPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = () => {
    setLoading(true)
    adminApi
      .getJobPosts()
      .then((res) => setPosts(res.data))
      .catch((e) => setError(e.response?.data?.error ?? 'Failed to load job posts'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete job post "${title}"?`)) return
    try {
      await adminApi.deleteJobPost(id)
      toast.success('Job post deleted')
      fetchPosts()
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? 'Failed to delete job post')
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
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Job Posts</h1>

      {/* Mobile: card list */}
      <div className="md:hidden space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-4">
            <p className="font-semibold text-gray-900">{p.title}</p>
            <p className="text-sm text-gray-600 mt-0.5">{p.companyName}</p>
            <p className="text-xs text-gray-500 mt-1">
              {p.creator?.name ?? '—'} · {p.applicantCount} applicant{p.applicantCount !== 1 ? 's' : ''}
            </p>
            <p className="text-xs text-gray-500 mt-1">{new Date(p.createdAt).toLocaleDateString()}</p>
            <button
              type="button"
              onClick={() => handleDelete(p.id, p.title)}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creator</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{p.companyName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{p.creator?.name ?? '—'} ({p.creator?.email})</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{p.applicantCount}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" onClick={() => handleDelete(p.id, p.title)} className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
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
