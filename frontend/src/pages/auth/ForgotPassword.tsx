import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { authService } from '../../lib/auth'

interface ForgotPasswordData {
  email: string
}

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [userNotFound, setUserNotFound] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>()

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true)
    setUserNotFound(false)
    setIsSubmitted(false)
    
    try {
      const response = await authService.forgotPassword(data.email)
      
      if (response.success) {
        setIsSubmitted(true)
        toast.success("We've sent a password reset link to your email.")
      } else {
        toast.error(response.message || 'Failed to send reset email')
      }
    } catch (error: any) {
      console.error('Forgot password error:', error)
      
      // Check if user not found (404)
      if (error.response?.status === 404) {
        setUserNotFound(true)
        toast.error('This email is not registered. Please sign up first.')
      } else if (error.response?.status === 500) {
        // Email service error
        toast.error(error.response?.data?.message || 'Failed to send reset email. Please try again later.')
      } else {
        // Other errors
        toast.error(error.response?.data?.message || 'An error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
        {/* Background Image with Blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/background.png')`,
          }}
        >
          {/* Contrast overlay */}
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 z-0" />
        </div>

        <div className="relative w-full max-w-[380px] sm:max-w-md mx-auto z-10 px-4">
          <div className="auth-frosted-card p-6 py-8 sm:p-10 rounded-2xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
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
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-foreground mb-2">Check your email</h2>
            <p className="text-sm text-muted mb-8">
              We've sent a password reset link to your email address. Please check your inbox and
              follow the instructions to reset your password.
            </p>
            <Link
              to="/signin"
              className="inline-flex items-center justify-center w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-blue-500/20"
            >
              Back to Sign In
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
        {/* Contrast overlay */}
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40 z-0" />
      </div>

      <div className="relative w-full max-w-[380px] sm:max-w-md mx-auto z-10 px-4">
        {/* Auth Card */}
        <div className="auth-frosted-card p-6 py-8 sm:p-10 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Logo Section */}
          <div className="text-center mb-10">
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
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Reset your password
            </h1>
            <p className="text-sm text-muted">
              Enter your email address and we'll send you a link to reset your password.
            </p>
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
                className="auth-frosted-input w-full h-11 px-4 rounded-lg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 text-sm"
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

            {/* User Not Found Message */}
            {userNotFound && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800 mb-2">
                      This email is not registered. Please sign up first.
                    </p>
                    <Link
                      to="/signup"
                      className="inline-flex items-center justify-center w-full h-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 transition-all duration-200 shadow-md"
                    >
                      Go to Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:opacity-90 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-blue-500/20"
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
                  Sending...
                </span>
              ) : (
                'Send reset link'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-muted">
            Remember your password?{' '}
            <Link
              to="/signin"
              className="text-primary-500 hover:text-primary-600 dark:text-blue-400 hover:text-blue-300 hover:underline font-medium transition-all duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
