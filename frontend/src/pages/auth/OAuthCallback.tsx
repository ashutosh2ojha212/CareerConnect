import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'

export default function OAuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const setAuth = useAuthStore((state) => state.setAuth)
  const hasProcessed = useRef(false)

  useEffect(() => {
    if (hasProcessed.current) return
    hasProcessed.current = true

    const token = searchParams.get('token')
    const userParam = searchParams.get('user')
    const error = searchParams.get('error')

    if (error) {
      toast.error('Google sign-in failed. Please try again.')
      navigate('/signin')
      return
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(userParam)
        setAuth(user, token)
        toast.success('Signed in successfully!')
        navigate('/role-selection')
      } catch (err) {
        toast.error('Failed to process authentication')
        navigate('/signin')
      }
    } else {
      toast.error('Authentication failed')
      navigate('/signin')
    }
  }, [searchParams, navigate, setAuth])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign-in...</p>
      </div>
    </div>
  )
}

