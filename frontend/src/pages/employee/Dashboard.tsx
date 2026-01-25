import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../lib/auth'
import SearchBar from '../../components/SearchBar'
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
  const [candidateSearchQuery, setCandidateSearchQuery] = useState('')
  const [jobPostSearchQuery, setJobPostSearchQuery] = useState('')
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

  // Determine active tab and search mode
  const getActiveTab = () => {
    if (isActive('/employee/job-seekers')) return 'browse-candidates'
    if (isActive('/employee/create')) return 'create-job-post'
    if (isActive('/employee')) return 'my-job-posts'
    return 'my-job-posts' // default
  }

  const activeTab = getActiveTab()

  const handleCandidateSearch = (query: string) => {
    setCandidateSearchQuery(query)
  }

  const handleJobPostSearch = (query: string) => {
    setJobPostSearchQuery(query)
  }

  // Clear search when switching tabs
  useEffect(() => {
    if (activeTab !== 'browse-candidates') {
      setCandidateSearchQuery('')
    }
    if (activeTab !== 'my-job-posts') {
      setJobPostSearchQuery('')
    }
  }, [activeTab])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fefefe] via-[#faf9f7] to-[#f5f4f2]">
      {/* Glossy Background Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none"></div>

      {/* Premium Navbar */}
      <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] px-6 lg:px-8 py-4 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="CareerConnect"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Center: Context-Aware Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            {activeTab === 'browse-candidates' && (
              <SearchBar
                mode="candidate"
                placeholder="Search job seekers by skills, role, or experience…"
                onSearch={handleCandidateSearch}
                initialValue={candidateSearchQuery}
              />
            )}
            {activeTab === 'my-job-posts' && (
              <SearchBar
                mode="jobpost"
                placeholder="Search your job posts by title, company name, or location…"
                onSearch={handleJobPostSearch}
                initialValue={jobPostSearchQuery}
              />
            )}
            {activeTab === 'create-job-post' && (
              <SearchBar mode="hidden" placeholder="" onSearch={() => {}} />
            )}
          </div>

          {/* Right: Switch Button + Avatar Dropdown */}
          <div className="flex items-center gap-3" ref={dropdownRef}>
            <button
              onClick={() => navigate('/job-seeker')}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] text-white font-medium text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-200 whitespace-nowrap"
            >
              Switch to Job Seeker
            </button>
            
            <div className="relative cursor-pointer" onClick={toggleDropdown}>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] text-white flex items-center justify-center font-semibold shadow-md text-sm hover:shadow-lg transition-shadow">
                {getUserInitials()}
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-2xl py-2 border border-gray-100 z-50 overflow-hidden">
                  <p className="px-4 py-2.5 text-gray-700 text-sm font-medium">Welcome, {getDisplayName()}</p>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <button
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Premium Tabs */}
        <div className="w-full flex items-center justify-center gap-8 mt-10 mb-1 border-b-2 border-gray-200">
          <button
            onClick={() => navigate('/employee/job-seekers')}
            data-active={isActive('/employee/job-seekers')}
            className="relative pb-4 px-2 text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0] data-[active=true]:border-[#4A4CF0]"
          >
            Browse Candidates
            {isActive('/employee/job-seekers') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => navigate('/employee')}
            data-active={isActive('/employee') && !isActive('/employee/job-seekers')}
            className="relative pb-4 px-2 text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0] data-[active=true]:border-[#4A4CF0]"
          >
            My Job Posts
            {isActive('/employee') && !isActive('/employee/job-seekers') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => navigate('/employee/create')}
            data-active={isActive('/employee/create')}
            className="relative pb-4 px-2 text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0] data-[active=true]:border-[#4A4CF0]"
          >
            Create Job Post
            {isActive('/employee/create') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full"></div>
            )}
          </button>
        </div>

        {/* Routes Content */}
        <main className="mt-8">
          <Routes>
            <Route path="job-seekers" element={<JobSeekers searchQuery={candidateSearchQuery} />} />
            <Route index element={<JobPosts searchQuery={jobPostSearchQuery} />} />
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
