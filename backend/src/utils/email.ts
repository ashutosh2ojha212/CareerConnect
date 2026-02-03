import nodemailer from 'nodemailer'
import { Resend } from 'resend'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

const defaultFrom = process.env.SMTP_FROM || process.env.EMAIL_FROM || 'CareerConnect <noreply@careerconnect.com>'

/** Use Resend (HTTPS API) when RESEND_API_KEY is set — works on Railway free tier where SMTP ports are blocked. */
function useResend(): boolean {
  return !!process.env.RESEND_API_KEY
}

/** Send email via Resend API (no SMTP ports needed). */
async function sendViaResend(to: string, subject: string, html: string, text: string, from: string): Promise<{ success: boolean; messageId?: string }> {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { data, error } = await resend.emails.send({
    from: from,
    to: [to],
    subject,
    html,
    text,
  })
  if (error) {
    console.error('❌ Resend API error:', error.message)
    throw new Error(error.message)
  }
  return { success: true, messageId: data?.id }
}

// Create SMTP transporter (only used when RESEND_API_KEY is not set)
const createTransporter = () => {
  const SMTP_USER = process.env.SMTP_USER
  const SMTP_PASS = process.env.SMTP_PASS
  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PORT = process.env.SMTP_PORT

  if (!SMTP_USER || !SMTP_PASS) {
    console.error('❌ SMTP credentials not configured!')
    console.error('Please set SMTP_USER and SMTP_PASS, or use RESEND_API_KEY (recommended on Railway).')
    throw new Error('Email service not configured. Set SMTP_USER and SMTP_PASS, or RESEND_API_KEY in .env')
  }

  if (SMTP_HOST && SMTP_HOST !== 'smtp.gmail.com') {
    console.log('📧 Using custom SMTP server:', SMTP_HOST)
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || '587'),
      secure: SMTP_PORT === '465',
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      tls: { rejectUnauthorized: false },
    })
  }

  console.log('📧 Using Gmail SMTP')
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: parseInt(SMTP_PORT || '587', 10),
    secure: SMTP_PORT === '465',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

/** Send one email — uses Resend if RESEND_API_KEY is set, otherwise SMTP. */
async function sendEmail(to: string, subject: string, html: string, text: string, from: string = defaultFrom): Promise<{ success: boolean; messageId?: string }> {
  if (useResend()) {
    console.log('📧 Sending via Resend (HTTPS)')
    return sendViaResend(to, subject, html, text, from)
  }
  const transporter = createTransporter()
  const info = await transporter.sendMail({ from, to, subject, html, text })
  return { success: true, messageId: info.messageId }
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  console.log('📧 Attempting to send password reset email to:', email)

  if (!useResend() && !process.env.SMTP_USER) {
    throw new Error('Email not configured. Set RESEND_API_KEY (recommended on Railway) or SMTP_USER and SMTP_PASS.')
  }

  const resetUrl = `${FRONTEND_URL}/reset-password/${token}`
  console.log('🔗 Reset URL:', resetUrl)

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #60A5FA 0%, #8B5CF6 50%, #7C3AED 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">CareerConnect</h1>
        </div>
        <div style="background: #ffffff; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #1f2937; margin-top: 0; font-size: 20px;">Reset Your Password</h2>
          <p style="color: #4b5563; font-size: 16px;">You requested to reset your password for your CareerConnect account.</p>
          <p style="color: #4b5563; font-size: 16px;">Click the button below to reset your password. This link will expire in 15 minutes.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Reset Password</a>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #2563eb; font-size: 14px; word-break: break-all;">${resetUrl}</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">If you didn't request this password reset, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">© ${new Date().getFullYear()} CareerConnect. All rights reserved.</p>
        </div>
      </body>
    </html>
  `
  const text = `
Reset Your Password

You requested to reset your password for your CareerConnect account.

Click the link below to reset your password. This link will expire in 15 minutes.

${resetUrl}

If you didn't request this password reset, please ignore this email.
  `.trim()

  try {
    const result = await sendEmail(email, 'Reset your CareerConnect password', html, text)
    console.log('✅ Password reset email sent successfully!', result.messageId ? `ID: ${result.messageId}` : '')
    return result
  } catch (error: any) {
    console.error('❌ Error sending password reset email:', error.code || '', error.message)
    if (error.code === 'EAUTH') {
      throw new Error('Email authentication failed. Use a Gmail App Password or switch to RESEND_API_KEY on Railway.')
    }
    if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      throw new Error('Could not connect to email server. On Railway free tier use RESEND_API_KEY instead of SMTP (ports 587/465 are blocked).')
    }
    throw error
  }
}

/** Welcome email sent only on first signup. */
export const sendWelcomeEmail = async (email: string, name: string) => {
  const displayName = name?.trim() || 'there'

  if (!useResend() && !process.env.SMTP_USER) {
    throw new Error('Email not configured. Set RESEND_API_KEY (recommended on Railway) or SMTP_USER and SMTP_PASS.')
  }

  const loginUrl = FRONTEND_URL + '/signin'
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to CareerConnect</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #4A4CF0 0%, #6366F1 50%, #7C3AED 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">CareerConnect</h1>
        </div>
        <div style="background: #ffffff; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #1f2937; margin-top: 0; font-size: 20px;">Welcome to CareerConnect 🎉</h2>
          <p style="color: #4b5563; font-size: 16px;">Hi ${displayName},</p>
          <p style="color: #4b5563; font-size: 16px;">Thanks for joining CareerConnect. We're glad to have you!</p>
          <p style="color: #4b5563; font-size: 16px;">Here's how you can get started:</p>
          <ul style="color: #4b5563; font-size: 16px; padding-left: 20px;">
            <li><strong>Browse Companies</strong> — Explore companies and their job openings.</li>
            <li><strong>My Applications</strong> — Track your referral applications and status.</li>
            <li><strong>My Invitations</strong> — See when employees invite you to apply for a role.</li>
            <li><strong>Creating or applying for jobs</strong> — As a job seeker you can request referrals and apply; as an employee you can post jobs and invite candidates.</li>
          </ul>
          <p style="color: #4b5563; font-size: 16px;">We're excited to help you grow your career!</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${loginUrl}" style="display: inline-block; background: linear-gradient(135deg, #4A4CF0 0%, #6366F1 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Sign in to CareerConnect</a>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">© ${new Date().getFullYear()} CareerConnect. All rights reserved.</p>
        </div>
      </body>
    </html>
  `
  const text = `
Welcome to CareerConnect 🎉

Hi ${displayName},

Thanks for joining CareerConnect. We're glad to have you!

Here's how you can get started:
- Browse Companies — Explore companies and their job openings.
- My Applications — Track your referral applications and status.
- My Invitations — See when employees invite you to apply for a role.
- Creating or applying for jobs — As a job seeker you can request referrals and apply; as an employee you can post jobs and invite candidates.

We're excited to help you grow your career!

Sign in: ${loginUrl}

© ${new Date().getFullYear()} CareerConnect. All rights reserved.
  `.trim()

  const result = await sendEmail(email, 'Welcome to CareerConnect 🎉', html, text)
  console.log('✅ Welcome email sent to', email, result.messageId ? `ID: ${result.messageId}` : '')
  return result
}
