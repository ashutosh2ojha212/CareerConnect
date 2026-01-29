import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster, ToastBar, toast } from 'react-hot-toast'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import OAuthCallback from './pages/auth/OAuthCallback'
import RoleSelection from './pages/RoleSelection'
import JobSeekerDashboard from './pages/jobSeeker/Dashboard'
import EmployeeDashboard from './pages/employee/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Toaster position="top-right">
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                <span className="flex-1">{message}</span>
                <button
                  type="button"
                  onClick={() => toast.dismiss(t.id)}
                  className="ml-2 p-1 rounded hover:bg-black/10 text-inherit focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black/20"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
        <Route
          path="/role-selection"
          element={
            <ProtectedRoute>
              <RoleSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-seeker/*"
          element={
            <ProtectedRoute>
              <JobSeekerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/*"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  )
}

export default App

