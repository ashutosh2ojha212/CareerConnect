import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../lib/auth'
import Logo from '../../components/Logo'
import JobPosts from './JobPosts'
import CreateJobPost from './CreateJobPost'
import JobApplicants from './JobApplicants'

export default function EmployeeDashboard() {
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
              to="/employee"
              className="border-b-2 border-primary-500 py-4 px-1 text-sm font-medium text-primary-600"
            >
              My Job Posts
            </Link>
            <Link
              to="/employee/create"
              className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Create Job Post
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route index element={<JobPosts />} />
          <Route path="create" element={<CreateJobPost />} />
          <Route path="job/:jobId" element={<JobApplicants />} />
        </Routes>
      </main>
    </div>
  )
}

