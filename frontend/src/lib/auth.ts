import api from './api'
import { useAuthStore } from '../store/authStore'

export interface SignInData {
  email: string
  password: string
}

export interface SignUpData {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    email: string
    name: string
    role: 'job_seeker' | 'referrer' | null
    accessRole?: 'admin' | 'user'
  }
  token: string
}

export interface VerifyOtpResponse extends AuthResponse {
  message?: string
}

export const authService = {
  signIn: async (data: SignInData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data)
    return response.data
  },

  signUp: async (data: SignUpData): Promise<AuthResponse & { needsVerification?: boolean }> => {
    const response = await api.post<AuthResponse & { needsVerification?: boolean }>('/auth/register', data)
    return response.data
  },

  verifyOtp: async (email: string, otp: string): Promise<VerifyOtpResponse> => {
    const response = await api.post<VerifyOtpResponse>('/auth/verify-otp', { email, otp })
    return response.data
  },

  resendOtp: async (email: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post<{ success: boolean; message: string }>('/auth/resend-otp', { email })
    return response.data
  },

  forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post<{ success: boolean; message: string }>('/auth/forgot-password', { email })
    return response.data
  },

  googleAuth: async (): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/google')
    return response.data
  },

  logout: () => {
    useAuthStore.getState().logout()
  },
}

