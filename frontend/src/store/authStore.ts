import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type AccessRole = 'admin' | 'user'

interface User {
  id: string
  email: string
  name: string
  role: 'job_seeker' | 'referrer' | null
  accessRole?: AccessRole
}

interface AuthState {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: () => boolean
  isAdmin: () => boolean
}

const CC_ROLE_KEY = 'cc_role'

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        const accessRole = user.accessRole ?? 'user'
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(CC_ROLE_KEY, accessRole)
        }
        set({ user: { ...user, accessRole }, token })
      },
      logout: () => {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(CC_ROLE_KEY)
        }
        set({ user: null, token: null })
      },
      isAuthenticated: () => !!get().token && !!get().user,
      isAdmin: () => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem(CC_ROLE_KEY) === 'admin') {
          return true
        }
        return get().user?.accessRole === 'admin'
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

