import axios from 'axios'

// Support both names for production (Vercel: set VITE_API_BASE_URL or VITE_API_URL)
const API_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-storage')
  if (token) {
    try {
      const parsed = JSON.parse(token)
      if (parsed.state?.token) {
        config.headers.Authorization = `Bearer ${parsed.state.token}`
      }
    } catch (e) {
      // Ignore parse errors
    }
  }
  return config
})

export default api

