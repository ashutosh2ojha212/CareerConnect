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

export const authService = {
  signIn: async (data: SignInData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data)
    return response.data
  },

  signUp: async (data: SignUpData): Promise<{ success: boolean }> => {
    const response = await api.post<{ success?: boolean; message?: string }>('/auth/register', data, {
      validateStatus: (s) => s >= 200 && s < 500,
    })
    if (response.status === 201) return { success: true }
    const msg = (response.data as { message?: string })?.message || 'Failed to create account'
    throw new Error(msg)
  },

  verifyOtp: async (email: string, otp: string): Promise<{ success: boolean }> => {
    const response = await api.post<{ success?: boolean }>('/auth/verify-otp', { email, otp })
    return { success: !!response.data?.success }
  },

  resendOtp: async (email: string): Promise<{ sent: boolean }> => {
    const response = await api.post<{ sent: boolean }>('/auth/resend-otp', { email })
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

