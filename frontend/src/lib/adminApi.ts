import api from './api'

const prefix = '/admin'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string | null
  isAdmin: boolean
  deactivated: boolean
  createdAt: string
}

export interface AdminJobPost {
  id: string
  title: string
  companyName: string
  company: { id: string; name: string }
  description: string | null
  experience: number | null
  location: string | null
  skills: string[]
  createdAt: string
  creator: { id: string; name: string; email: string }
  applicantCount: number
}

export interface AdminApplication {
  id: string
  status: string
  createdAt: string
  user: { id: string; name: string; email: string }
  jobPost: {
    id: string
    title: string
    companyName: string
    user: { id: string; name: string }
  } | null
}

export interface AdminReferral {
  id: string
  status: string
  createdAt: string
  inviter: { id: string; name: string; email: string } | null
  candidate: { id: string; name: string; email: string } | null
  job: {
    id: string
    title: string
    company: string
    location: string | null
  } | null
}

export interface AdminStats {
  totalUsers: number
  employees: number
  jobSeekers: number
  jobPosts: number
  referralsSent: number
  pendingReferrals: number
  acceptedReferrals: number
  rejectedReferrals: number
}

export const adminApi = {
  getUsers: () => api.get<AdminUser[]>(`${prefix}/users`),
  deleteUser: (id: string) => api.delete(`${prefix}/users/${id}`),
  updateUserRole: (id: string, role: 'admin' | 'user') =>
    api.patch(`${prefix}/users/${id}/role`, { role }),
  updateUserStatus: (id: string, deactivated: boolean) =>
    api.patch(`${prefix}/users/${id}/status`, { deactivated }),

  getJobPosts: () => api.get<AdminJobPost[]>(`${prefix}/job-posts`),
  deleteJobPost: (id: string) => api.delete(`${prefix}/job-posts/${id}`),

  getApplications: () => api.get<AdminApplication[]>(`${prefix}/applications`),
  deleteApplication: (id: string) => api.delete(`${prefix}/applications/${id}`),

  getReferrals: () => api.get<AdminReferral[]>(`${prefix}/referrals`),
  deleteReferral: (id: string) => api.delete(`${prefix}/referrals/${id}`),

  getStats: () => api.get<AdminStats>(`${prefix}/stats`),
}
