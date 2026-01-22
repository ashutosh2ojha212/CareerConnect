import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../lib/auth'
import Logo from '../../components/Logo'
import Companies from './Companies'
import CompanyEmployees from './CompanyEmployees'
import ApplicationStatus from './ApplicationStatus'

export default function JobSeekerDashboard() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const handleLogout = () => {
    authService.logout()
    navigate('/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link
              to="/job-seeker"
              className="border-b-2 border-primary-500 py-4 px-1 text-sm font-medium text-primary-600"
            >
              Browse Companies
            </Link>
            <Link
              to="/job-seeker/applications"
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              My Applications
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route index element={<Companies />} />
          <Route path="company/:companyId" element={<CompanyEmployees />} />
          <Route path="applications" element={<ApplicationStatus />} />
        </Routes>
      </main>
    </div>
  )
}

