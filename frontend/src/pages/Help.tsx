import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || 'support@mycareerconnects.in'

export default function Help() {
  const { isAuthenticated } = useAuthStore()
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=CareerConnect%20Support%20Request`

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fefefe] via-[#faf9f7] to-[#f5f4f2]">
      <div className="fixed inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none" />

      <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] px-4 sm:px-6 py-4 border-b border-gray-200/60">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="CareerConnect" className="h-9 sm:h-10 w-auto object-contain" />
          </Link>
          {isAuthenticated() ? (
            <Link
              to="/role-selection"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/signin"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-8 sm:p-12 text-center">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Help & Support</h1>
          <p className="text-gray-600 text-base sm:text-lg mb-6">
            For any issues, contact us at:
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-block text-indigo-600 hover:text-indigo-700 font-semibold text-lg break-all mb-8"
          >
            {SUPPORT_EMAIL}
          </a>
          <a
            href={mailto}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:opacity-90 transition-all"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Send us an email
          </a>
        </div>
      </main>
    </div>
  )
}
