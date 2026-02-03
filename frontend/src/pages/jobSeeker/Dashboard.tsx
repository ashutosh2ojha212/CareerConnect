import { useState, useEffect, useRef, startTransition } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../lib/auth'
import api from '../../lib/api'
import { calculateProfileCompletion } from '../../utils/profileCompletion'
import SearchBar from '../../components/SearchBar'
import Companies from './Companies'
import CompanyEmployees from './CompanyEmployees'
import ApplicationStatus from './ApplicationStatus'
import MyInvitations from './MyInvitations'
import MyProfile from './MyProfile'

export default function JobSeekerDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuthStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const INVITATION_TOAST_KEY = 'careerconnect_lastSeenInvitationId'
  const [navbarSearch, setNavbarSearch] = useState('')
  const [profileCompletion, setProfileCompletion] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isBrowseCompanies = location.pathname === '/job-seeker' || location.pathname === '/job-seeker/'
  const isCompanyDetails = location.pathname.startsWith('/job-seeker/company/')
  const isMyApplications = location.pathname.startsWith('/job-seeker/applications')
  const showNavbarSearch = isBrowseCompanies || isCompanyDetails || isMyApplications

  const getSearchPlaceholder = () => {
    if (isCompanyDetails) return 'Search job roles…'
    if (isMyApplications) return 'Search applications…'
    return 'Search companies…'
  }

  const handleNavbarSearch = (query: string) => {
    setNavbarSearch(query)
  }

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
    if (path === '/job-seeker') {
      const p = location.pathname
      return p === '/job-seeker' || p === '/job-seeker/' || p.startsWith('/job-seeker/company/')
    }
    return location.pathname.startsWith(path)
  }

  const handleNav = (path: string) => {
    startTransition(() => {
      navigate(path)
    })
  }

  // Fetch profile completion to show/hide "Complete your profile" banner (only when ≤50%)
  useEffect(() => {
    let cancelled = false
    api.get('/job-seekers/me')
      .then(({ data }) => {
        if (cancelled) return
        const p = data as { fullName?: string; email?: string; primaryRole?: string; experience?: number; jobPreferences?: string | string[]; preferredLocations?: string[]; skills?: string[]; resumeUrl?: string; profileSummary?: string }
        setProfileCompletion(calculateProfileCompletion(p))
      })
      .catch(() => {
        if (!cancelled) setProfileCompletion(0)
      })
    return () => { cancelled = true }
  }, [location.pathname])

  // Show toast only once per new invitation; use localStorage to track last seen
  useEffect(() => {
    let cancelled = false
    api.get('/invitations/me').then(({ data }) => {
      if (cancelled) return
      const list = Array.isArray(data) ? data : []
      const pending = list.filter((i: any) => i.status !== 'APPLIED')
      if (pending.length === 0) return
      const latestId = pending[0]?.id
      const lastSeen = typeof localStorage !== 'undefined' ? localStorage.getItem(INVITATION_TOAST_KEY) : null
      if (latestId && latestId !== lastSeen) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(INVITATION_TOAST_KEY, latestId)
        }
        toast.success('You have a new referral invitation.', {
          duration: 5000,
          style: {
            background: '#059669',
            color: '#fff',
            padding: '14px 20px',
            fontSize: '15px',
          },
        })
      }
    }).catch(() => {})
    return () => { cancelled = true }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fefefe] via-[#faf9f7] to-[#f5f4f2]">
      {/* Glossy Background Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none"></div>

      {/* Premium Navbar — responsive with mobile hamburger */}
      <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="CareerConnect" className="h-9 sm:h-10 w-auto object-contain" />
          </div>

          {/* Center: Search bar — hidden on small mobile, shown from sm */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-4 min-w-0 hidden sm:block">
            {showNavbarSearch && (
              <SearchBar
                mode={isCompanyDetails ? 'job-search' : isBrowseCompanies ? 'company' : 'jobpost'}
                placeholder={getSearchPlaceholder()}
                onSearch={handleNavbarSearch}
                initialValue={navbarSearch}
              />
            )}
          </div>

          {/* Right: Desktop — Switch + Avatar. Mobile — Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3" ref={dropdownRef}>
            <button
              onClick={() => startTransition(() => navigate('/employee'))}
              className="hidden sm:inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] text-white font-medium text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-200 whitespace-nowrap"
            >
              Employee Dashboard
            </button>

            <div className="hidden sm:block relative cursor-pointer" onClick={toggleDropdown}>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4A4CF0] to-[#6366F1] text-white flex items-center justify-center font-semibold shadow-md text-sm hover:shadow-lg transition-shadow">
                {getUserInitials()}
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-2xl py-2 border border-gray-100 z-50 overflow-hidden">
                  <p className="px-4 py-2.5 text-gray-700 text-sm font-medium">Welcome, {getDisplayName()}</p>
                  <div className="h-px bg-gray-100 my-1" />
                  <Link to="/job-seeker/profile" className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setIsDropdownOpen(false)}>Profile</Link>
                  <Link to="/help" className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setIsDropdownOpen(false)}>Help</Link>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors" onClick={handleLogout}>Sign Out</button>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
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

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 border-t border-gray-200/60">
            {showNavbarSearch && (
              <div className="mb-3">
                <SearchBar
                  mode={isCompanyDetails ? 'job-search' : isBrowseCompanies ? 'company' : 'jobpost'}
                  placeholder={getSearchPlaceholder()}
                  onSearch={handleNavbarSearch}
                  initialValue={navbarSearch}
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <button onClick={() => { startTransition(() => navigate('/employee')); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] text-white font-medium text-sm">Employee Dashboard</button>
              <Link to="/job-seeker/profile" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 text-sm font-medium">Profile</Link>
              <Link to="/help" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 text-sm font-medium">Help</Link>
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 text-sm font-medium">Sign Out</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Container — match Employee dashboard spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        {/* Premium Tabs — horizontal scroll on mobile */}
        <div className="w-full flex items-center gap-2 sm:gap-6 mt-6 sm:mt-10 mb-1 border-b-2 border-gray-200 overflow-x-auto pb-px scrollbar-hide flex-nowrap">
          <button
            onClick={() => handleNav('/job-seeker')}
            data-active={isActive('/job-seeker')}
            className="relative pb-4 px-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0] flex-shrink-0 whitespace-nowrap"
          >
            Browse Companies
            {isActive('/job-seeker') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full" />
            )}
          </button>
          <button
            onClick={() => handleNav('/job-seeker/applications')}
            data-active={isActive('/job-seeker/applications')}
            className="relative pb-4 px-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0] flex-shrink-0 whitespace-nowrap"
          >
            My Applications
            {isActive('/job-seeker/applications') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full" />
            )}
          </button>
          <button
            onClick={() => handleNav('/job-seeker/invitations')}
            data-active={isActive('/job-seeker/invitations')}
            className="relative pb-4 px-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0] flex-shrink-0 whitespace-nowrap"
          >
            My Invitations
            {isActive('/job-seeker/invitations') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full" />
            )}
          </button>
          <button
            onClick={() => handleNav('/job-seeker/profile')}
            data-active={isActive('/job-seeker/profile')}
            className="relative pb-4 px-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0] flex-shrink-0 whitespace-nowrap"
          >
            My Profile
            {isActive('/job-seeker/profile') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full" />
            )}
          </button>
        </div>

        {/* Profile visibility prompt — only when profile is ≤50% complete so recruiters can discover you */}
        {profileCompletion !== null && profileCompletion <= 50 && (
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-purple-50 border border-indigo-100/80 shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">Get discovered by recruiters</p>
                  <p className="text-gray-600 text-sm mt-0.5">Complete your profile so recruiters can find you and reach out with referral opportunities.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => startTransition(() => navigate('/job-seeker/profile'))}
                className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Complete my profile
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Routes Content */}
        <main className="mt-8">
          <Routes>
            <Route index element={<Companies searchQuery={navbarSearch} />} />
            <Route path="company/:companyId" element={<CompanyEmployees searchQuery={navbarSearch} />} />
            <Route path="applications" element={<ApplicationStatus searchQuery={navbarSearch} />} />
            <Route path="invitations" element={<MyInvitations />} />
            <Route path="profile" element={<MyProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
