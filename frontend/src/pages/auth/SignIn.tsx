import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import CareerConnectLogo from '../../components/logo/CareerConnectLogo'
import GoogleButton from '../../components/GoogleButton'
import { authService, SignInData } from '../../lib/auth'
import { useAuthStore } from '../../store/authStore'
import api from '../../lib/api'

export default function SignIn() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>()

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true)
    try {
      // In production, integrate with @react-oauth/google or Google Identity Services
      // For now, this demonstrates the flow - you'll need to:
      // 1. Install: npm install @react-oauth/google
      // 2. Get Google OAuth credentials from Google Cloud Console
      // 3. Replace this with actual Google OAuth flow
      
      // Example with @react-oauth/google:
      // const response = await googleLogin()
      // const { idToken } = response.credential
      // Then send idToken to backend for verification
      
      // For demo purposes, we'll use a mock flow
      // In production, replace this with actual Google OAuth
      const response = await api.post('/auth/google', {
        idToken: 'mock-google-token',
        email: 'user@gmail.com',
        name: 'Google User',
        picture: '',
      })
      
      setAuth(response.data.user, response.data.token)
      toast.success('Signed in with Google successfully!')
      navigate('/role-selection')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to sign in with Google')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const onSubmit = async (data: SignInData) => {
    setIsLoading(true)
    try {
      const response = await authService.signIn(data)
      setAuth(response.user, response.token)
      toast.success('Signed in successfully!')
      navigate('/role-selection')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521790361593-509c7a6b6fa8?q=80&w=1800&auto=format')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/70 to-purple-900/80"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Auth Card with smooth entrance animation */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <CareerConnectLogo size={64} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* Google OAuth Button */}
          <div className="mb-6">
            <GoogleButton
              onClick={handleGoogleAuth}
              isLoading={isGoogleLoading}
              text="Continue with Google"
            />
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full h-11 px-4 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200 text-sm"
                placeholder="you@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                  role="alert"
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className="w-full h-11 px-4 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200 text-sm"
                placeholder="••••••••"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
                  role="alert"
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-0 border-gray-300 rounded cursor-pointer transition-colors"
              />
              <label
                htmlFor="remember"
                className="ml-2.5 block text-sm text-gray-600 cursor-pointer"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-blue-500/25"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
