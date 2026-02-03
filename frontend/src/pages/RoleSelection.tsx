import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { authService } from '../lib/auth'

export default function RoleSelection() {
  const navigate = useNavigate()
  const { user, setAuth } = useAuthStore()

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
      return user.name.split(' ')[0] // First name only
    }
    if (user?.email) {
      return user.email.split('@')[0]
    }
    return 'User'
  }

  const handleRoleSelect = async (role: 'job_seeker' | 'referrer') => {
    try {
      // Update user role in backend
      // For now, we'll just update locally and navigate
      if (user) {
        setAuth({ ...user, role }, useAuthStore.getState().token || '')
      }
      
      if (role === 'job_seeker') {
        navigate('/job-seeker')
      } else {
        navigate('/employee')
      }
    } catch (error) {
      console.error('Failed to update role:', error)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/background.png')`,
        }}
      />

      {/* Animated Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/10 via-indigo-200/10 to-purple-300/10 dark:from-black/40 dark:via-indigo-900/20 dark:to-purple-900/20 animate-gradientMove backdrop-blur-[12px] z-0"></div>

      {/* Clean Overlay for Readability */}
      <div className="fixed inset-0 bg-white/30 backdrop-blur-[6px] z-0"></div>

      {/* Top Navigation Bar - Fixed and Visible */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-white/40 backdrop-blur-xl shadow-sm px-4 sm:px-6 h-14 sm:h-[70px] flex items-center justify-between z-50 border-b border-white/20">
        {/* Left: Logo Only */}
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="CareerConnect"
            className="h-9 sm:h-10 w-auto object-contain drop-shadow-md"
            style={{
              imageRendering: 'crisp-edges',
            }}
          />
        </div>

        {/* Right: User Info & Sign Out */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* User Avatar */}
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-md text-xs sm:text-sm">
            {getUserInitials()}
          </div>
          
          {/* Username — hide on very small screens */}
          <span className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base hidden xs:inline min-w-0">
            Hi, {getDisplayName()}
          </span>

          {/* Sign Out Button */}
          <button
            onClick={() => {
              authService.logout()
              navigate('/signin')
            }}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 underline text-sm font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content - Account for Fixed Navbar */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24">
        {/* Heading Block - Proper Top Spacing */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Choose Your Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
            Select the experience that best fits the way you want to use CareerConnect.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 max-w-5xl mx-auto mt-6 sm:mt-10">
          {/* Job Seeker Card */}
          <div
            onClick={() => handleRoleSelect('job_seeker')}
            className="bg-white/80 dark:bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/10 hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
          >
            <div className="text-center">
              {/* Icon */}
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white flex items-center justify-center shadow-md mx-auto mb-4 sm:mb-6">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                Job Seeker
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-4 font-medium">
                Referrals That Take You Further
              </p>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-6 leading-relaxed">
                Browse companies, find the right employees to refer you, and submit personalized referral requests — all in one place.
              </p>

              {/* Bullet Points */}
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Discover employees at top companies</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Submit structured referral requests</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Track your application and referral status</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Increase your chances with better visibility</span>
                </li>
              </ul>

              {/* Button */}
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-12 rounded-xl w-full shadow-md hover:opacity-90 active:scale-[0.98] text-sm font-medium transition-all duration-200">
                Continue as Job Seeker
              </button>
            </div>
          </div>

          {/* Employee/Referrer Card */}
          <div
            onClick={() => handleRoleSelect('referrer')}
            className="bg-white/80 dark:bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/10 hover:shadow-[0_12px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_50px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer"
          >
            <div className="text-center">
              {/* Icon */}
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-white flex items-center justify-center shadow-md mx-auto mb-6">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                Employee / Referrer
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-4 font-medium">
                Help Talent Find Its Path
              </p>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-6 leading-relaxed">
                Share job openings, review applicants, and create custom forms to streamline your referral process.
              </p>

              {/* Bullet Points */}
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Post job openings effortlessly</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Build custom application/referral forms</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Review, filter, and manage applicants</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Support strong talent with meaningful referrals</span>
                </li>
              </ul>

              {/* Button */}
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white h-12 rounded-xl w-full shadow-md hover:opacity-90 active:scale-[0.98] text-sm font-medium transition-all duration-200">
                Continue as Employee
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        .animate-gradientMove {
          background-size: 200% 200%;
          animation: gradientMove 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
