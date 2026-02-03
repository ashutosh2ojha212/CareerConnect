import { useState, useEffect, useRef, startTransition } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

      {/* Premium Navbar — responsive with mobile hamburger */}
      <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="CareerConnect" className="h-9 sm:h-10 w-auto object-contain" />
          </div>

          <div className="flex-1 max-w-2xl mx-2 sm:mx-4 min-w-0 hidden sm:block">
            {activeTab === 'browse-candidates' && (
              <SearchBar mode="candidate" placeholder="Search job seekers..." onSearch={handleCandidateSearch} initialValue={candidateSearchQuery} />
            )}
            {activeTab === 'my-job-posts' && (
              <SearchBar mode="jobpost" placeholder="Search your job posts..." onSearch={handleJobPostSearch} initialValue={jobPostSearchQuery} />
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3" ref={dropdownRef}>
            <button
              onClick={() => startTransition(() => navigate('/job-seeker'))}
              className="hidden sm:inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] text-white font-medium text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-200 whitespace-nowrap"
            >
              Find Jobs
            </button>
            <div className="hidden sm:block relative cursor-pointer" onClick={toggleDropdown}>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] text-white flex items-center justify-center font-semibold shadow-md text-sm hover:shadow-lg transition-shadow">
                {getUserInitials()}
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-2xl py-2 border border-gray-100 z-50 overflow-hidden">
                  <p className="px-4 py-2.5 text-gray-700 text-sm font-medium">Welcome, {getDisplayName()}</p>
                  <div className="h-px bg-gray-100 my-1" />
                  <Link to="/help" className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setIsDropdownOpen(false)}>Help</Link>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors" onClick={handleLogout}>Sign Out</button>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 border-t border-gray-200/60">
            {(activeTab === 'browse-candidates' || activeTab === 'my-job-posts') && (
              <div className="mb-3">
                {activeTab === 'browse-candidates' && <SearchBar mode="candidate" placeholder="Search job seekers..." onSearch={handleCandidateSearch} initialValue={candidateSearchQuery} />}
                {activeTab === 'my-job-posts' && <SearchBar mode="jobpost" placeholder="Search your job posts..." onSearch={handleJobPostSearch} initialValue={jobPostSearchQuery} />}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <button onClick={() => { startTransition(() => navigate('/job-seeker')); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] text-white font-medium text-sm">Find Jobs</button>
              <Link to="/help" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 text-sm font-medium">Help</Link>
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 text-sm font-medium">Sign Out</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-hidden">
        {/* Premium Tabs — horizontal scroll on mobile */}
        <div className="w-full flex items-center gap-4 sm:gap-8 mt-6 sm:mt-10 mb-1 border-b-2 border-gray-200 overflow-x-auto pb-px scrollbar-hide flex-nowrap">
          <button
            onClick={() => startTransition(() => navigate('/employee/job-seekers'))}
            data-active={isActive('/employee/job-seekers')}
            className="relative pb-4 px-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0] flex-shrink-0 whitespace-nowrap"
          >
            Browse Candidates
            {isActive('/employee/job-seekers') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => startTransition(() => navigate('/employee'))}
            data-active={isActive('/employee') && !isActive('/employee/job-seekers')}
            className="relative pb-4 px-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0] flex-shrink-0 whitespace-nowrap"
          >
            My Job Posts
            {isActive('/employee') && !isActive('/employee/job-seekers') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => startTransition(() => navigate('/employee/create'))}
            data-active={isActive('/employee/create')}
            className="relative pb-4 px-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0] flex-shrink-0 whitespace-nowrap"
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
