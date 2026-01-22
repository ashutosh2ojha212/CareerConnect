import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import ForgotPassword from './pages/auth/ForgotPassword'
import RoleSelection from './pages/RoleSelection'
import JobSeekerDashboard from './pages/jobSeeker/Dashboard'
import EmployeeDashboard from './pages/employee/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
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

