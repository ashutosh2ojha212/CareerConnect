import { useState, useEffect, useRef, startTransition } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../lib/auth'
import api from '../../lib/api'
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
  const invitationToastShown = useRef(false)

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

  // Show toast when job seeker has new invitations
  useEffect(() => {
    if (invitationToastShown.current) return
    let cancelled = false
    api.get('/invitations/me').then(({ data }) => {
      if (cancelled || invitationToastShown.current) return
      const list = Array.isArray(data) ? data : []
      const pending = list.filter((i: any) => i.status !== 'APPLIED')
      if (pending.length > 0) {
        invitationToastShown.current = true
        toast('You have a new referral invitation.', { icon: '✉️', duration: 5000 })
      }
    }).catch(() => {})
    return () => { cancelled = true }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fefefe] via-[#faf9f7] to-[#f5f4f2]">
      {/* Glossy Background Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none"></div>

      {/* Premium Navbar */}
      <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] px-6 lg:px-8 py-4 border-b border-gray-200/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="CareerConnect"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Right: Switch Button + Avatar Dropdown */}
          <div className="flex items-center gap-3" ref={dropdownRef}>
            <button
              onClick={() => startTransition(() => navigate('/employee'))}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] text-white font-medium text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-200 whitespace-nowrap"
            >
              Switch to Employee
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
      <div className="max-w-6xl mx-auto px-6">
        {/* Premium Tabs */}
        <div className="w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 mb-1 border-b-2 border-gray-200">
          <button
            onClick={() => handleNav('/job-seeker')}
            data-active={isActive('/job-seeker')}
            className="relative pb-4 px-2 text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0]"
          >
            Browse Companies
            {isActive('/job-seeker') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full" />
            )}
          </button>
          <button
            onClick={() => handleNav('/job-seeker/applications')}
            data-active={isActive('/job-seeker/applications')}
            className="relative pb-4 px-2 text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0]"
          >
            My Applications
            {isActive('/job-seeker/applications') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full" />
            )}
          </button>
          <button
            onClick={() => handleNav('/job-seeker/invitations')}
            data-active={isActive('/job-seeker/invitations')}
            className="relative pb-4 px-2 text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0]"
          >
            My Invitations
            {isActive('/job-seeker/invitations') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full" />
            )}
          </button>
          <button
            onClick={() => handleNav('/job-seeker/profile')}
            data-active={isActive('/job-seeker/profile')}
            className="relative pb-4 px-2 text-base font-semibold text-gray-600 hover:text-[#4A4CF0] transition-all duration-200 border-b-3 border-transparent data-[active=true]:text-[#4A4CF0]"
          >
            My Profile
            {isActive('/job-seeker/profile') && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4CF0] to-[#6366F1] rounded-full" />
            )}
          </button>
        </div>

        {/* Routes Content */}
        <main className="mt-8">
          <Routes>
            <Route index element={<Companies />} />
            <Route path="company/:companyId" element={<CompanyEmployees />} />
            <Route path="applications" element={<ApplicationStatus />} />
            <Route path="invitations" element={<MyInvitations />} />
            <Route path="profile" element={<MyProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
