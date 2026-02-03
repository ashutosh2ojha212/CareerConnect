import { useState } from 'react'
import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../lib/auth'
import AdminDashboard from './Dashboard'
import AdminUsers from './Users'
import AdminJobPosts from './JobPosts'
import AdminApplications from './Applications'
import AdminReferrals from './Referrals'

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/users', label: 'Users', end: false },
  { to: '/admin/job-posts', label: 'Job Posts', end: false },
  { to: '/admin/applications', label: 'Applications', end: false },
  { to: '/admin/referrals', label: 'Referrals', end: false },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const handleLogout = () => {
    authService.logout()
    navigate('/signin')
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#fefefe] via-[#faf9f7] to-[#f5f4f2]">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      {/* Sidebar — collapses on mobile, overlay on small screens */}
      <aside
        className={`${
          sidebarOpen ? 'w-56' : 'w-16'
        } flex flex-col fixed left-0 top-0 h-full z-40 bg-white/90 backdrop-blur-xl border-r border-gray-200/60 shadow-lg transition-all duration-200 
        max-lg:transform max-lg:transition-transform max-lg:duration-200
        ${!mobileSidebarOpen ? 'max-lg:-translate-x-full' : 'max-lg:translate-x-0 max-lg:z-50 max-lg:shadow-2xl'}`}
      >
        <div className="p-4 border-b border-gray-200/60 flex items-center justify-between">
          {sidebarOpen && (
            <span className="font-semibold text-gray-800 text-sm">Admin</span>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <svg
              className={`w-5 h-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                }`
              }
            >
              <span className="flex-shrink-0 w-5 text-center">{label.charAt(0)}</span>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="p-2 border-t border-gray-200/60 space-y-2">
          {sidebarOpen && user && (
            <p className="px-3 py-2 text-xs text-gray-500 truncate" title={user.email}>
              {user.email}
            </p>
          )}
          <Link
            to="/help"
            className="w-full flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-700 px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {sidebarOpen && <span>Help</span>}
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-lg shadow-sm font-semibold hover:bg-red-600 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileSidebarOpen((o) => !o)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-lg bg-white/90 shadow-md border border-gray-200 hover:bg-gray-50"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-56' : 'ml-16'} max-lg:ml-0 transition-all duration-200 min-h-screen`}>
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="job-posts" element={<AdminJobPosts />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="referrals" element={<AdminReferrals />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
