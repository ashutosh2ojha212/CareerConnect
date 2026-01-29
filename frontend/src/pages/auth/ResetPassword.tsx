import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import { EyeIcon, EyeSlashIcon } from '../../components/PasswordToggleIcons'

interface ResetPasswordData {
  newPassword: string
  confirmPassword: string
}

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordData>()

  const newPassword = watch('newPassword')

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false)
        setIsValid(false)
        toast.error('Invalid reset link')
        return
      }

      try {
        const response = await api.get(`/auth/reset-password/${token}`)
        if (response.data.valid) {
          setIsValid(true)
        } else {
          setIsValid(false)
          toast.error('Invalid or expired reset link')
        }
      } catch (error: any) {
        setIsValid(false)
        toast.error(error.response?.data?.message || 'Invalid or expired reset link')
      } finally {
        setIsValidating(false)
      }
    }

    validateToken()
  }, [token])

  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      toast.error('Invalid reset link')
      return
    }

    setIsLoading(true)
    try {
      const response = await api.post<{ success: boolean; message: string }>('/auth/reset-password', {
        token,
        newPassword: data.newPassword,
      })
      
      if (response.data.success) {
        toast.success('Password reset successfully!')
        setTimeout(() => {
          navigate('/signin')
        }, 1500)
      } else {
        toast.error(response.data.message || 'Failed to reset password')
      }
    } catch (error: any) {
      console.error('Reset password error:', error)
      toast.error(error.response?.data?.message || 'Failed to reset password. The link may be invalid or expired.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isValidating) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/background.png')`,
          }}
        >
          <div className="fixed inset-0 bg-black/10 backdrop-blur-[6px] z-0"></div>
        </div>

        <div className="relative w-full max-w-md z-10">
          <div className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Validating reset link...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isValid) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/background.png')`,
          }}
        >
          <div className="fixed inset-0 bg-black/10 backdrop-blur-[6px] z-0"></div>
        </div>

        <div className="relative w-full max-w-md z-10">
          <div className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Subtle gradient badge background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl"></div>
                {/* Logo with enhanced styling */}
                <div className="relative drop-shadow-md">
                  <img
                    src="/logo.png"
                    alt="CareerConnect"
                    width={280}
                    height={100}
                    className="object-contain mx-auto"
                    loading="eager"
                    decoding="sync"
                    style={{
                      width: '280px',
                      height: '100px',
                      imageRendering: 'crisp-edges',
                    }}
                  />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Invalid Link</h1>
            <p className="text-sm text-gray-600 mb-8">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link
              to="/forgot-password"
              className="inline-flex items-center justify-center w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:opacity-90 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-blue-500/20"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/background.png')`,
        }}
      >
        {/* Deeper blur overlay */}
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[6px] z-0"></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Premium Auth Card */}
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Logo Section */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Subtle gradient badge background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl"></div>
                {/* Logo with enhanced styling */}
                <div className="relative drop-shadow-md">
                  <img
                    src="/logo.png"
                    alt="CareerConnect"
                    width={280}
                    height={100}
                    className="object-contain mx-auto"
                    loading="eager"
                    decoding="sync"
                    style={{
                      width: '280px',
                      height: '100px',
                      imageRendering: 'crisp-edges',
                    }}
                  />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Reset your password
            </h1>
            <p className="text-sm text-gray-600">
              Enter your new password below
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* New Password Field */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('newPassword', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className="w-full h-11 px-4 pr-11 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:shadow-sm transition-all duration-200 text-sm"
                  placeholder="••••••••"
                  aria-invalid={errors.newPassword ? 'true' : 'false'}
                />
                <span
                  data-password-toggle
                  role="button"
                  tabIndex={0}
                  onClick={() => setShowNewPassword((p) => !p)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowNewPassword((p) => !p); } }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 text-gray-500 hover:text-gray-700 cursor-pointer select-none outline-none focus:outline-none"
                  aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showNewPassword ? <EyeIcon /> : <EyeSlashIcon />}
                </span>
              </div>
              {errors.newPassword && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value: string) =>
                      value === newPassword || 'Passwords do not match',
                  })}
                  className="w-full h-11 px-4 pr-11 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:shadow-sm transition-all duration-200 text-sm"
                  placeholder="••••••••"
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                />
                <span
                  data-password-toggle
                  role="button"
                  tabIndex={0}
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowConfirmPassword((p) => !p); } }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 text-gray-500 hover:text-gray-700 cursor-pointer select-none outline-none focus:outline-none"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:opacity-90 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-blue-500/20"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting password...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/signin" className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

