import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../lib/auth'
import JobPosts from './JobPosts'
import CreateJobPost from './CreateJobPost'
import JobApplicants from './JobApplicants'

export default function EmployeeDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuthStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      const names = user.name.trim().split(' ')
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      }
      return user.name.substring(0, 2).toUpperCase()
    }
    if (user?.email) {
      return user.email.split('@')[0].substring(0, 2).toUpperCase()
    }
    return 'U'
  }

  // Get display name
  const getDisplayName = () => {
    if (user?.name) {
      return user.name.split(' ')[0]
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'User'
  }

  const handleLogout = () => {
    authService.logout()
    navigate('/signin')
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const isActive = (path: string) => {
    if (path === '/employee') {
      return location.pathname === '/employee' || location.pathname === '/employee/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fefefe] via-[#faf9f7] to-[#f5f4f2]">
      {/* Glossy Background Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none"></div>

      {/* Premium Navbar */}
      <nav className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-xl shadow-sm px-8 py-4 flex items-center justify-between border-b border-gray-200/50">
        {/* Left: Logo + Switch Button */}
        <div className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="CareerConnect"
            className="h-12 w-auto object-contain drop-shadow-md"
            style={{
              imageRendering: 'crisp-edges',
            }}
          />
          <button
            onClick={() => navigate('/job-seeker')}
            className="ml-6 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm shadow-md hover:opacity-90 active:scale-[0.97] transition-all duration-200 whitespace-nowrap"
          >
            Switch to Job Seeker
          </button>
        </div>

        {/* Right: Avatar Dropdown */}
        <div className="flex items-center gap-4" ref={dropdownRef}>
          <div className="relative cursor-pointer" onClick={toggleDropdown}>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold shadow-md text-sm">
              {getUserInitials()}
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl py-3 border border-gray-100 z-50">
                <p className="px-4 py-2 text-gray-600 text-sm">Welcome, {getDisplayName()}</p>
                <div className="h-px bg-gray-200 my-2"></div>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Premium Tabs */}
        <div className="w-full flex items-center gap-10 mt-12 border-b border-gray-200">
          <button
            onClick={() => navigate('/employee')}
            data-active={isActive('/employee')}
            className="pb-3 px-1 text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors border-b-2 border-transparent data-[active=true]:text-indigo-600 data-[active=true]:border-indigo-600"
          >
            My Job Posts
          </button>
          <button
            onClick={() => navigate('/employee/create')}
            data-active={isActive('/employee/create')}
            className="pb-3 px-1 text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors border-b-2 border-transparent data-[active=true]:text-indigo-600 data-[active=true]:border-indigo-600"
          >
            Create Job Post
          </button>
        </div>

        {/* Routes Content */}
        <main className="mt-8">
          <Routes>
            <Route index element={<JobPosts />} />
            <Route path="create" element={<CreateJobPost />} />
            <Route path="job/:jobId" element={<JobApplicants />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
