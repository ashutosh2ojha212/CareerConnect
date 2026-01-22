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
  }
  token: string
}

export const authService = {
  signIn: async (data: SignInData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data)
    return response.data
  },

  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data)
    return response.data
  },

  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email })
  },

  googleAuth: async (): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/google')
    return response.data
  },

  logout: () => {
    useAuthStore.getState().logout()
  },
}

