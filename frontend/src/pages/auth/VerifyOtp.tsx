import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authService } from '../../lib/auth'

const RESEND_COOLDOWN_SEC = 30

export default function VerifyOtp() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    }
  }, [searchParams])

  useEffect(() => {
    if (resendCooldown <= 0) return
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [resendCooldown])

  const otpString = otp.join('')
  const isValid = otpString.length === 6 && /^\d+$/.test(otpString)

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('')
      const newOtp = [...otp]
      digits.forEach((d, i) => {
        if (index + i < 6) newOtp[index + i] = d
      })
      setOtp(newOtp)
      const next = document.getElementById(`otp-${Math.min(index + digits.length, 5)}`) as HTMLInputElement
      next?.focus()
      return
    }
    if (value && !/^\d$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      next?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`) as HTMLInputElement
      prev?.focus()
      const newOtp = [...otp]
      newOtp[index - 1] = ''
      setOtp(newOtp)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newOtp = [...otp]
    pasted.split('').forEach((d, i) => {
      if (i < 6) newOtp[i] = d
    })
    setOtp(newOtp)
    const idx = Math.min(pasted.length, 5)
    const el = document.getElementById(`otp-${idx}`) as HTMLInputElement
    el?.focus()
  }

  const handleVerify = async () => {
    if (!email) {
      toast.error('Email is required. Please go back and sign up again.')
      return
    }
    if (!isValid) {
      toast.error('Please enter a valid 6-digit code')
      return
    }
    setIsLoading(true)
    try {
      await authService.verifyOtp(email, otpString)
      toast.success('Email verified! You can now sign in.')
      navigate('/signin')
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Verification failed. Please check the code.'
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email) {
      toast.error('Email is required')
      return
    }
    if (resendCooldown > 0) return
    setIsLoading(true)
    try {
      await authService.resendOtp(email)
      toast.success('OTP resent')
      setResendCooldown(RESEND_COOLDOWN_SEC)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to resend code')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/background.png')` }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-white/10 via-indigo-200/10 to-purple-300/10 dark:from-black/40 dark:via-indigo-900/20 dark:to-purple-900/20 backdrop-blur-[12px] z-0" />

      <div className="relative w-[90%] max-w-md z-10 mx-auto">
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-white/50 dark:border-white/10 p-6 sm:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img src="/logo.png" alt="CareerConnect" className="h-14 sm:h-16 w-auto object-contain" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Verify Your Email
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              We've sent a 6-digit OTP to:
            </p>
            <p className="text-base font-medium text-gray-800 dark:text-gray-200 mt-1 break-all">
              {email || 'your email'}
            </p>
          </div>

          <div
            className="flex justify-center gap-2 sm:gap-3 mb-6"
            onPaste={handlePaste}
          >
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleVerify}
            disabled={!isValid || isLoading}
            className="w-full h-12 text-base font-medium bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:opacity-90 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-md hover:shadow-lg transition-all mb-4"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying...
              </span>
            ) : (
              'Verify OTP'
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Didn't receive?</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0 || isLoading}
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link to="/signin" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
