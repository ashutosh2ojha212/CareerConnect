import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import GoogleButton from '../../components/GoogleButton'
import { EyeIcon, EyeSlashIcon } from '../../components/PasswordToggleIcons'
import { authService, SignInData } from '../../lib/auth'
import { useAuthStore } from '../../store/authStore'

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  oauth_error: 'Google sign-in failed. Try again or use email/password. Check backend logs for details.',
  oauth_cancelled: 'Google sign-in was cancelled.',
  oauth_not_configured: 'Google sign-in is not configured on the server.',
  token_exchange_failed: 'Google sign-in failed at token exchange. Check redirect URI in Google Cloud Console.',
  userinfo_failed: 'Could not load your Google profile.',
  missing_user_info: 'Google did not provide email or name.',
  account_deactivated: 'This account has been deactivated.',
}

export default function SignIn() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error && OAUTH_ERROR_MESSAGES[error]) {
      toast.error(OAUTH_ERROR_MESSAGES[error])
      setSearchParams({}, { replace: true })
    }
  }, [searchParams, setSearchParams])

  const handleGoogleAuth = () => {
    setIsGoogleLoading(true)
    const backendUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:3001'
    window.location.href = `${backendUrl}/auth/google`
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
    <div className="min-h-screen relative flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-hidden">
      {/* Animated Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/background.png')`,
        }}
      />

      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/20 via-indigo-100/30 to-purple-200/30 dark:from-indigo-950/50 dark:via-purple-900/40 dark:to-indigo-950/50 animate-gradientMove z-0" />
      {/* Contrast overlay - increases readability in both themes */}
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40 z-0" />

      <div className="relative w-full max-w-[380px] sm:max-w-md md:max-w-lg mx-auto z-10 px-4">
        {/* Frosted-glass card - design token based */}
        <div className="auth-frosted-card ring-1 ring-black/5 dark:ring-white/10 p-6 py-8 sm:p-8 md:p-10 lg:p-12 rounded-2xl transition-all duration-200 animate-fadeInUp">
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
            <h2 className="text-2xl sm:text-xl font-semibold text-foreground mb-2">
              Welcome back
            </h2>
            <p className="text-sm text-muted">
              Sign in to your account to continue
            </p>
          </div>

          {/* Google OAuth Button */}
          <div className="mb-6">
            <GoogleButton
              onClick={handleGoogleAuth}
              isLoading={isGoogleLoading}
              text="Continue with Google"
              variant="frosted"
            />
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-card-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-muted">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="auth-frosted-input w-full h-12 px-4 rounded-xl placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-indigo-400/60 dark:focus:ring-blue-400/50 transition-all duration-200 text-sm"
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
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary-500 hover:text-primary-600 dark:text-blue-400 hover:text-blue-300 hover:underline font-medium transition-all duration-200"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password', {
                    required: 'Password is required',
                    validate: {
                      notEmpty: (value) => value.trim() !== '' || 'Password cannot be empty',
                      minLength: (value) => value.length >= 6 || 'Password must be at least 6 characters',
                      maxLength: (value) => value.length <= 128 || 'Password is too long (max 128 characters)',
                      noSpaces: (value) => !/\s/.test(value) || 'Password cannot contain spaces',
                      noOnlySpaces: (value) => value.trim().length > 0 || 'Password cannot be only spaces',
                    }
                  })}
                  className="auth-frosted-input w-full h-12 px-4 pr-11 rounded-xl placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-indigo-400/60 dark:focus:ring-blue-400/50 transition-all duration-200 text-sm"
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
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 text-muted hover:text-foreground cursor-pointer select-none outline-none focus:outline-none transition-all duration-200"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-blue-500 dark:to-blue-600 text-white rounded-xl hover:opacity-90 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-indigo-400/60 dark:focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-white/50 dark:focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-md dark:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-lg"
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
          <p className="mt-8 text-center text-sm text-muted">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="text-primary-500 hover:text-primary-600 dark:text-blue-400 hover:text-blue-300 hover:underline font-medium transition-all duration-200"
            >
              Sign up
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
