import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import GoogleButton from '../../components/GoogleButton'
import { EyeIcon, EyeSlashIcon } from '../../components/PasswordToggleIcons'
import { authService, SignUpData } from '../../lib/auth'
import { useAuthStore } from '../../store/authStore'

interface SignUpFormData extends SignUpData {
  confirmPassword: string
}

export default function SignUp() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>()

  const password = watch('password')

  const handleGoogleAuth = () => {
    setIsGoogleLoading(true)
    const backendUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:3001'
    window.location.href = `${backendUrl}/auth/google`
  }

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true)
    try {
      const response = await authService.signUp({ name: data.name, email: data.email, password: data.password })
      setAuth(response.user, response.token)
      toast.success('Account created successfully!')
      navigate('/role-selection')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Animated Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/background.png')`,
        }}
      />

      {/* Animated Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/10 via-indigo-200/10 to-purple-300/10 dark:from-black/40 dark:via-indigo-900/20 dark:to-purple-900/20 animate-gradientMove backdrop-blur-[12px] z-0"></div>

      <div className="relative w-full max-w-md md:max-w-lg z-10">
        {/* Premium Auth Card */}
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)] border border-white/50 dark:border-white/10 p-10 md:p-12 transition-all duration-300 animate-fadeInUp">
          {/* Logo Section - Wider Logo with Scale */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6 scale-125 md:scale-150">
              <img
                src="/logo.png"
                alt="CareerConnect"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-lg"
                style={{
                  imageRendering: 'crisp-edges',
                }}
                loading="eager"
                decoding="sync"
              />
            </div>
            <h2 className="text-2xl sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Create your account
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get started with Career Connect today
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
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 dark:bg-gray-900/80 text-gray-400 dark:text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                {...register('name', {
                  required: 'Name is required',
                  validate: {
                    notEmpty: (value) => value.trim() !== '' || 'Name cannot be empty',
                    minLength: (value) => value.trim().length >= 2 || 'Name must be at least 2 characters',
                    maxLength: (value) => value.length <= 100 || 'Name is too long (max 100 characters)',
                    validFormat: (value) => {
                      // Allow letters, spaces, hyphens, apostrophes, and periods
                      const nameRegex = /^[a-zA-Z\s'-\.]+$/
                      return nameRegex.test(value.trim()) || 'Name can only contain letters, spaces, hyphens, apostrophes, and periods'
                    },
                    noConsecutiveSpaces: (value) => !/\s{2,}/.test(value) || 'Name cannot contain consecutive spaces',
                    noLeadingTrailingSpaces: (value) => value.trim() === value || 'Name cannot start or end with spaces',
                  }
                })}
                className="w-full h-12 px-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:shadow-md transition-all duration-200 text-sm"
                placeholder="John Doe"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
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
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  validate: {
                    notEmpty: (value) => value.trim() !== '' || 'Email cannot be empty',
                    noSpaces: (value) => !/\s/.test(value) || 'Email cannot contain spaces',
                    validFormat: (value) => {
                      // Comprehensive email regex
                      const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/
                      return emailRegex.test(value) || 'Please enter a valid email address'
                    },
                    maxLength: (value) => value.length <= 254 || 'Email is too long (max 254 characters)',
                    noConsecutiveDots: (value) => !/\.{2,}/.test(value) || 'Email cannot contain consecutive dots',
                    validDomain: (value) => {
                      const parts = value.split('@')
                      if (parts.length !== 2) return 'Invalid email format'
                      const domain = parts[1]
                      return domain.includes('.') && domain.split('.').length >= 2 || 'Invalid email domain'
                    }
                  }
                })}
                className="w-full h-12 px-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:shadow-md transition-all duration-200 text-sm"
                placeholder="you@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('password', {
                    required: 'Password is required',
                    validate: {
                      notEmpty: (value) => value.trim() !== '' || 'Password cannot be empty',
                      minLength: (value) => value.length >= 8 || 'Password must be at least 8 characters',
                      maxLength: (value) => value.length <= 128 || 'Password is too long (max 128 characters)',
                      hasUpperCase: (value) => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                      hasLowerCase: (value) => /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                      hasNumber: (value) => /[0-9]/.test(value) || 'Password must contain at least one number',
                      hasSpecialChar: (value) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) || 'Password must contain at least one special character',
                      noSpaces: (value) => !/\s/.test(value) || 'Password cannot contain spaces',
                    }
                  })}
                  className="w-full h-12 px-4 pr-11 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:shadow-md transition-all duration-200 text-sm"
                  placeholder="••••••••"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <span
                  data-password-toggle
                  role="button"
                  tabIndex={0}
                  onClick={() => setShowPassword((p) => !p)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setShowPassword((p) => !p)
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer select-none outline-none focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                </span>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
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

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: {
                      matches: (value: string) => value === password || 'Passwords do not match',
                      notEmpty: (value: string) => value.trim() !== '' || 'Please confirm your password',
                    }
                  })}
                  className="w-full h-12 px-4 pr-11 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:shadow-md transition-all duration-200 text-sm"
                  placeholder="••••••••"
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  aria-describedby={
                    errors.confirmPassword ? 'confirmPassword-error' : undefined
                  }
                />
                <span
                  data-password-toggle
                  role="button"
                  tabIndex={0}
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setShowConfirmPassword((p) => !p)
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer select-none outline-none focus:outline-none"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
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
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:opacity-90 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-md hover:shadow-lg mt-2"
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
                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        .animate-fadeInUp {
          animation: fadeInUp 0.35s ease-out;
        }

        .animate-gradientMove {
          background-size: 200% 200%;
          animation: gradientMove 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
