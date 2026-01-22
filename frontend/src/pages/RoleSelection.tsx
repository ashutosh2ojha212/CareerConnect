import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Logo from '../components/Logo'
import { authService } from '../lib/auth'

export default function RoleSelection() {
  const navigate = useNavigate()
  const { user, setAuth } = useAuthStore()

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <Logo className="justify-center mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Dashboard</h1>
          <p className="text-xl text-gray-600">
            Select how you'd like to use Carrier Connect
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Job Seeker Card */}
          <div
            onClick={() => handleRoleSelect('job_seeker')}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-primary-100 mb-6">
                <svg
                  className="h-10 w-10 text-primary-600"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Seeker</h2>
              <p className="text-gray-600 mb-6">
                Browse companies, find employees, and request referrals for job opportunities.
              </p>
              <ul className="text-left space-y-2 text-gray-600 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Browse companies and employees
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Submit referral requests
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Track application status
                </li>
              </ul>
              <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition">
                Continue as Job Seeker
              </button>
            </div>
          </div>

          {/* Employee/Referrer Card */}
          <div
            onClick={() => handleRoleSelect('referrer')}
            className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <svg
                  className="h-10 w-10 text-green-600"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Employee / Referrer</h2>
              <p className="text-gray-600 mb-6">
                Post job openings, create custom forms, and manage referral requests.
              </p>
              <ul className="text-left space-y-2 text-gray-600 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Post job openings
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Create custom application forms
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  View and manage applicants
                </li>
              </ul>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                Continue as Employee
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => {
              authService.logout()
              navigate('/signin')
            }}
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

