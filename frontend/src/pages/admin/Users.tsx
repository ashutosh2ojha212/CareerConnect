import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { adminApi, AdminUser } from '../../lib/adminApi'
import { useAuthStore } from '../../store/authStore'

export default function AdminUsers() {
  const currentUserId = useAuthStore((s) => s.user?.id)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = () => {
    setLoading(true)
    adminApi
      .getUsers()
      .then((res) => setUsers(res.data))
      .catch((e) => setError(e.response?.data?.error ?? 'Failed to load users'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id: string, email: string) => {
    if (!window.confirm(`Delete user ${email}? This cannot be undone.`)) return
    try {
      await adminApi.deleteUser(id)
      toast.success('User deleted')
      fetchUsers()
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? 'Failed to delete user')
    }
  }

  const handleRoleChange = async (id: string, role: 'admin' | 'user') => {
    try {
      await adminApi.updateUserRole(id, role)
      toast.success(`Role updated to ${role}`)
      fetchUsers()
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? 'Failed to update role')
    }
  }

  const handleStatusChange = async (id: string, deactivated: boolean) => {
    try {
      await adminApi.updateUserStatus(id, deactivated)
      toast.success(deactivated ? 'User deactivated' : 'User activated')
      fetchUsers()
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? 'Failed to update status')
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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Users</h1>
      <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((u) => (
                <tr key={u.id} className={u.deactivated ? 'bg-gray-50 opacity-75' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {u.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{u.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {u.isAdmin ? (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                        Admin
                      </span>
                    ) : u.role === 'job_seeker' ? (
                      'Job seeker'
                    ) : u.role === 'referrer' ? (
                      'Referrer'
                    ) : (
                      'User'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {u.deactivated ? (
                      <span className="text-amber-600 font-medium">Deactivated</span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                    {u.id !== currentUserId && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            handleRoleChange(u.id, u.isAdmin ? 'user' : 'admin')
                          }
                          className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          {u.isAdmin ? 'Demote' : 'Promote'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(u.id, !u.deactivated)}
                          className="text-amber-600 hover:text-amber-800 font-medium"
                        >
                          {u.deactivated ? 'Activate' : 'Deactivate'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(u.id, u.email)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </>
                    )}
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
