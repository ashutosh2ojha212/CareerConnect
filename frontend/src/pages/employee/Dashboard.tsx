import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../lib/auth'
import JobSeekers from './JobSeekers'
import JobPosts from './JobPosts'
import CreateJobPost from './CreateJobPost'
import JobApplicants from './JobApplicants'
import SetupReferralForm from './SetupReferralForm'
import EditJobPost from './EditJobPost'

export default function EmployeeDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuthStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
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
    if (path === '/employee/job-seekers') {
      return location.pathname === '/employee/job-seekers' || location.pathname === '/employee/job-seekers/'
    }
    if (path === '/employee') {
      return location.pathname === '/employee' || location.pathname === '/employee/'
    }
    return location.pathname.startsWith(path)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Navigate to job seekers tab with search query
      if (searchQuery.trim()) {
        navigate(`/employee/job-seekers?search=${encodeURIComponent(searchQuery.trim())}`)
      } else {
        navigate('/employee/job-seekers')
      }
    }
  }

  // Sync search query with URL when on job-seekers page
  useEffect(() => {
    if (location.pathname === '/employee/job-seekers') {
      const params = new URLSearchParams(location.search)
      const searchParam = params.get('search')
      if (searchParam) {
        setSearchQuery(searchParam)
      }
    }
  }, [location])

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

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search job seekers by skills, role, or experience…"
              className="w-full h-11 px-4 pl-10 pr-4 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
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
      <div className="max-w-7xl mx-auto px-6">
        {/* Premium Tabs */}
        <div className="w-full flex items-center gap-10 mt-12 border-b border-gray-200">
          <button
            onClick={() => navigate('/employee/job-seekers')}
            data-active={isActive('/employee/job-seekers')}
            className="pb-3 px-1 text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors border-b-2 border-transparent data-[active=true]:text-indigo-600 data-[active=true]:border-indigo-600"
          >
            Browse Candidates
          </button>
          <button
            onClick={() => navigate('/employee')}
            data-active={isActive('/employee') && !isActive('/employee/job-seekers')}
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
            <Route path="job-seekers" element={<JobSeekers />} />
            <Route index element={<JobPosts />} />
            <Route path="create" element={<CreateJobPost />} />
            <Route path="edit/:id" element={<EditJobPost />} />
            <Route path="setup-form" element={<SetupReferralForm />} />
            <Route path="job/:jobId" element={<JobApplicants />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
