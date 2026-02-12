import axios, { AxiosError } from 'axios'

// Backend origin only (no /api). Requests use paths like /auth/register, /jobs, etc.
const API_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15s timeout to catch hung connections early
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

// Retry logic for transient network/DNS failures
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000 // 1s base delay, doubles each retry

function isRetryableError(error: AxiosError): boolean {
  // Retry on network errors (DNS failures, connection refused, timeout)
  if (!error.response) return true
  // Retry on 502, 503, 504 (server temporarily unavailable)
  const status = error.response.status
  return status === 502 || status === 503 || status === 504
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as any
    if (!config) return Promise.reject(error)

    config.__retryCount = config.__retryCount || 0

    // Only retry safe (GET) requests or explicit retryable errors, up to MAX_RETRIES
    const isGet = (config.method || 'get').toLowerCase() === 'get'
    if (config.__retryCount >= MAX_RETRIES || (!isGet && !isRetryableError(error))) {
      return Promise.reject(error)
    }

    if (isRetryableError(error)) {
      config.__retryCount += 1
      const delay = RETRY_DELAY_MS * Math.pow(2, config.__retryCount - 1)
      await new Promise((resolve) => setTimeout(resolve, delay))
      return api(config)
    }

    return Promise.reject(error)
  }
)

export default api

