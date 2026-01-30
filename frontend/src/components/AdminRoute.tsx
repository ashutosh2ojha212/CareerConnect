import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface AdminRouteProps {
  children: React.ReactNode
}

/** Protects /admin: requires auth and cc_role === 'admin'. No link to admin anywhere in app. */
export default function AdminRoute({ children }: AdminRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated())
  const isAdmin = useAuthStore((state) => state.isAdmin())

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/not-authorized" replace />
  }

  return <>{children}</>
}
