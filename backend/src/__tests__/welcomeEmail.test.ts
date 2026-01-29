/**
 * Welcome email flow tests:
 * - New user signup (register) → welcome email sent once
 * - Existing user login → no welcome email
 * - User updates profile → no email (profile update uses job seeker/employee routes, not auth; only signup triggers welcome email)
 */

import request from 'supertest'
import express from 'express'
import authRoutes from '../routes/auth'

const sendWelcomeEmailMock = jest.fn()
const sendPasswordResetEmailMock = jest.fn()

jest.mock('../utils/email', () => ({
  sendPasswordResetEmail: (...args: unknown[]) => sendPasswordResetEmailMock(...args),
  sendWelcomeEmail: (...args: unknown[]) => sendWelcomeEmailMock(...args),
}))

const userFindUnique = jest.fn()
const userCreate = jest.fn()
const userUpdate = jest.fn()
const userFindFirst = jest.fn()

jest.mock('../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: (...args: unknown[]) => userFindUnique(...args),
      findFirst: (...args: unknown[]) => userFindFirst(...args),
      create: (...args: unknown[]) => userCreate(...args),
      update: (...args: unknown[]) => userUpdate(...args),
    },
    employeeProfile: { findUnique: jest.fn() },
    jobSeekerProfile: { findUnique: jest.fn(), create: jest.fn(), update: jest.fn() },
    jobPost: { findFirst: jest.fn() },
    referralInvitation: { findFirst: jest.fn(), create: jest.fn(), findMany: jest.fn() },
  },
}))

const app = express()
app.use(express.json())
app.use('/api/auth', authRoutes)

beforeEach(() => {
  jest.clearAllMocks()
  sendWelcomeEmailMock.mockResolvedValue(undefined)
})

describe('Welcome email on signup', () => {
  it('sends welcome email once when a new user registers', async () => {
    userFindUnique.mockResolvedValue(null)
    userCreate.mockResolvedValue({
      id: 'user-1',
      email: 'new@example.com',
      name: 'New User',
      role: null,
    })

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'New User', email: 'new@example.com', password: 'password123' })

    expect(res.status).toBe(201)
    expect(userCreate).toHaveBeenCalledTimes(1)

    // Welcome email is sent asynchronously; wait a tick for the fire-and-forget promise
    await new Promise((r) => setImmediate(r))

    expect(sendWelcomeEmailMock).toHaveBeenCalledTimes(1)
    expect(sendWelcomeEmailMock).toHaveBeenCalledWith('new@example.com', 'New User')
    expect(userUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'user-1' },
        data: { welcomeEmailSent: true },
      })
    )
  })

  it('does not send welcome email on login (existing user)', async () => {
    const bcrypt = await import('bcryptjs')
    const hashedPassword = await bcrypt.hash('password123', 10)
    const existingUser = {
      id: 'user-1',
      email: 'existing@example.com',
      name: 'Existing User',
      role: null,
      password: hashedPassword,
    }
    userFindUnique.mockResolvedValue(existingUser)

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'existing@example.com', password: 'password123' })

    expect(res.status).toBe(200)
    await new Promise((r) => setImmediate(r))
    expect(sendWelcomeEmailMock).not.toHaveBeenCalled()
  })

  it('does not send welcome email when user already exists (register duplicate)', async () => {
    userFindUnique.mockResolvedValue({
      id: 'user-1',
      email: 'existing@example.com',
      name: 'Existing',
      role: null,
    })

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Existing', email: 'existing@example.com', password: 'password123' })

    expect(res.status).toBe(400)
    expect(userCreate).not.toHaveBeenCalled()
    expect(sendWelcomeEmailMock).not.toHaveBeenCalled()
  })
})
