import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { adminApi, AdminApplication } from '../../lib/adminApi'

export default function AdminApplications() {
  const [applications, setApplications] = useState<AdminApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchApplications = () => {
    setLoading(true)
    adminApi
      .getApplications()
      .then((res) => setApplications(res.data))
      .catch((e) => setError(e.response?.data?.error ?? 'Failed to load applications'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this application?')) return
    try {
      await adminApi.deleteApplication(id)
      toast.success('Application deleted')
      fetchApplications()
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? 'Failed to delete application')
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
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Applications</h1>
      <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job / Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((a) => (
                <tr key={a.id}>
                  <td className="px-6 py-4 text-sm">
                    <span className="font-medium text-gray-900">{a.user?.name ?? '—'}</span>
                    <br />
                    <span className="text-gray-500">{a.user?.email}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {a.jobPost?.title ?? '—'} @ {a.jobPost?.companyName ?? '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                        a.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : a.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {a.status === 'approved' ? 'referred' : a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(a.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      Delete
                    </button>
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
