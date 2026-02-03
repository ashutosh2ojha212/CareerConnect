/**
 * Email Service - Reusable notification system using Resend.
 * Logs all emails to EmailLog for audit.
 */
import { prisma } from '../lib/prisma'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
const defaultFrom =
  process.env.SMTP_FROM ||
  process.env.EMAIL_FROM ||
  'CareerConnect <noreply@careerconnect.com>'

function useResend(): boolean {
  return !!process.env.RESEND_API_KEY
}

async function sendViaResend(
  to: string,
  subject: string,
  html: string,
  text: string,
  from: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      html,
      text,
    })
    if (error) {
      console.error('❌ Resend API error:', error.message)
      return { success: false, error: error.message }
    }
    return { success: true, messageId: data?.id }
  } catch (err: any) {
    console.error('❌ Resend send error:', err?.message ?? err)
    return { success: false, error: err?.message ?? 'Unknown error' }
  }
}

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string,
  eventType: string,
  metadata: Record<string, unknown> = {},
  from: string = defaultFrom
): Promise<{ success: boolean; messageId?: string }> {
  if (!useResend()) {
    const err = 'Email not configured. Set RESEND_API_KEY in .env'
    await logEmail(to, subject, eventType, false, err, null, metadata)
    throw new Error(err)
  }

  const result = await sendViaResend(to, subject, html, text, from)
  await logEmail(
    to,
    subject,
    eventType,
    result.success,
    result.error ?? null,
    result.messageId ?? null,
    metadata
  )
  if (!result.success) {
    throw new Error(result.error ?? 'Failed to send email')
  }
  return { success: true, messageId: result.messageId }
}

async function logEmail(
  toEmail: string,
  subject: string,
  eventType: string,
  success: boolean,
  errorMsg: string | null,
  messageId: string | null,
  metadata: Record<string, unknown> = {}
) {
  try {
    await prisma.emailLog.create({
      data: {
        toEmail,
        subject,
        eventType,
        success,
        errorMsg,
        messageId,
        metadata: JSON.stringify(metadata),
      },
    })
  } catch (e) {
    console.error('Failed to log email:', e)
  }
}

/** Base HTML wrapper for all CareerConnect emails */
function emailWrapper(title: string, content: string): string {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #4A4CF0 0%, #6366F1 50%, #7C3AED 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">CareerConnect</h1>
    </div>
    <div style="background: #ffffff; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      ${content}
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">© ${new Date().getFullYear()} CareerConnect. All rights reserved.</p>
    </div>
  </body>
</html>
  `.trim()
}

// ─────────────────────────────────────────────────────────
// A. Job Application — notify job creator (employee)
// ─────────────────────────────────────────────────────────
export async function sendJobApplicationNotification(params: {
  toEmail: string
  candidateName: string
  jobTitle: string
  companyName: string
  timestamp: Date
}): Promise<{ success: boolean; messageId?: string }> {
  const dashboardUrl = `${FRONTEND_URL}/employee`
  const content = `
    <h2 style="color: #1f2937; margin-top: 0; font-size: 20px;">New Job Application</h2>
    <p style="color: #4b5563; font-size: 16px;"><strong>${params.candidateName}</strong> has applied for a role you posted.</p>
    <ul style="color: #4b5563; font-size: 16px; padding-left: 20px;">
      <li><strong>Job:</strong> ${params.jobTitle}</li>
      <li><strong>Company:</strong> ${params.companyName}</li>
      <li><strong>Applied at:</strong> ${params.timestamp.toLocaleString()}</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${dashboardUrl}" style="display: inline-block; background: linear-gradient(135deg, #4A4CF0 0%, #6366F1 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">View Dashboard</a>
    </div>
  `
  const html = emailWrapper('New Application', content)
  const text = `${params.candidateName} applied for ${params.jobTitle} at ${params.companyName}. Applied at: ${params.timestamp.toLocaleString()}. View dashboard: ${dashboardUrl}`
  return sendEmail(
    params.toEmail,
    `New application: ${params.candidateName} for ${params.jobTitle}`,
    html,
    text,
    'job_application',
    {
      candidateName: params.candidateName,
      jobTitle: params.jobTitle,
      companyName: params.companyName,
    }
  )
}

// ─────────────────────────────────────────────────────────
// B. Referral Invitation — notify job seeker when employee invites
// ─────────────────────────────────────────────────────────
export async function sendReferralInvitationNotification(params: {
  toEmail: string
  inviterName: string
  jobTitle: string
  companyName: string
}): Promise<{ success: boolean; messageId?: string }> {
  const invitationsUrl = `${FRONTEND_URL}/job-seeker/invitations`
  const content = `
    <h2 style="color: #1f2937; margin-top: 0; font-size: 20px;">Referral Invitation</h2>
    <p style="color: #4b5563; font-size: 16px;"><strong>${params.inviterName}</strong> has invited you to apply for a referral opportunity.</p>
    <ul style="color: #4b5563; font-size: 16px; padding-left: 20px;">
      <li><strong>Job:</strong> ${params.jobTitle}</li>
      <li><strong>Company:</strong> ${params.companyName}</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${invitationsUrl}" style="display: inline-block; background: linear-gradient(135deg, #4A4CF0 0%, #6366F1 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">View Invitation</a>
    </div>
  `
  const html = emailWrapper('Referral Invitation', content)
  const text = `${params.inviterName} invited you to apply for ${params.jobTitle} at ${params.companyName}. View: ${invitationsUrl}`
  return sendEmail(
    params.toEmail,
    `Referral invitation: ${params.inviterName} — ${params.jobTitle}`,
    html,
    text,
    'referral_invitation',
    {
      inviterName: params.inviterName,
      jobTitle: params.jobTitle,
      companyName: params.companyName,
    }
  )
}

// ─────────────────────────────────────────────────────────
// B. Referral Accepted — notify employee when job seeker applies
// ─────────────────────────────────────────────────────────
export async function sendReferralAcceptedNotification(params: {
  toEmail: string
  candidateName: string
  jobTitle: string
}): Promise<{ success: boolean; messageId?: string }> {
  const dashboardUrl = `${FRONTEND_URL}/employee`
  const content = `
    <h2 style="color: #1f2937; margin-top: 0; font-size: 20px;">Referral Accepted</h2>
    <p style="color: #4b5563; font-size: 16px;"><strong>${params.candidateName}</strong> has accepted your referral invitation and applied for the job.</p>
    <ul style="color: #4b5563; font-size: 16px; padding-left: 20px;">
      <li><strong>Job:</strong> ${params.jobTitle}</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${dashboardUrl}" style="display: inline-block; background: linear-gradient(135deg, #34c759 0%, #30d158 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">View Dashboard</a>
    </div>
  `
  const html = emailWrapper('Referral Accepted', content)
  const text = `${params.candidateName} accepted your referral and applied for ${params.jobTitle}. View: ${dashboardUrl}`
  return sendEmail(
    params.toEmail,
    `Referral accepted: ${params.candidateName} applied for ${params.jobTitle}`,
    html,
    text,
    'referral_accepted',
    {
      candidateName: params.candidateName,
      jobTitle: params.jobTitle,
    }
  )
}

// ─────────────────────────────────────────────────────────
// B. Referral Rejected — notify employee when job seeker declines
// ─────────────────────────────────────────────────────────
export async function sendReferralRejectedNotification(params: {
  toEmail: string
  candidateName: string
  jobTitle: string
}): Promise<{ success: boolean; messageId?: string }> {
  const content = `
    <h2 style="color: #1f2937; margin-top: 0; font-size: 20px;">Referral Declined</h2>
    <p style="color: #4b5563; font-size: 16px;"><strong>${params.candidateName}</strong> has declined your referral invitation.</p>
    <ul style="color: #4b5563; font-size: 16px; padding-left: 20px;">
      <li><strong>Job:</strong> ${params.jobTitle}</li>
    </ul>
    <p style="color: #6b7280; font-size: 14px;">No action required. You can invite other candidates from your dashboard.</p>
  `
  const html = emailWrapper('Referral Declined', content)
  const text = `${params.candidateName} declined your referral invitation for ${params.jobTitle}.`
  return sendEmail(
    params.toEmail,
    `Referral declined: ${params.candidateName} — ${params.jobTitle}`,
    html,
    text,
    'referral_rejected',
    {
      candidateName: params.candidateName,
      jobTitle: params.jobTitle,
    }
  )
}

// ─────────────────────────────────────────────────────────
// C. Application Status (Accept/Reject) — notify job seeker
// ─────────────────────────────────────────────────────────
export async function sendApplicationStatusNotification(params: {
  toEmail: string
  jobTitle: string
  status: 'approved' | 'rejected'
  timestamp: Date
}): Promise<{ success: boolean; messageId?: string }> {
  const statusLabel = params.status === 'approved' ? 'Approved' : 'Not selected'
  const statusColor = params.status === 'approved' ? '#34c759' : '#6b7280'
  const applicationsUrl = `${FRONTEND_URL}/job-seeker/applications`
  const content = `
    <h2 style="color: #1f2937; margin-top: 0; font-size: 20px;">Application Update</h2>
    <p style="color: #4b5563; font-size: 16px;">Your application status has been updated.</p>
    <ul style="color: #4b5563; font-size: 16px; padding-left: 20px;">
      <li><strong>Job:</strong> ${params.jobTitle}</li>
      <li><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: 600;">${statusLabel}</span></li>
      <li><strong>Updated at:</strong> ${params.timestamp.toLocaleString()}</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${applicationsUrl}" style="display: inline-block; background: linear-gradient(135deg, #4A4CF0 0%, #6366F1 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">View Applications</a>
    </div>
  `
  const html = emailWrapper('Application Update', content)
  const text = `Your application for ${params.jobTitle} was ${statusLabel}. Updated at: ${params.timestamp.toLocaleString()}. View: ${applicationsUrl}`
  return sendEmail(
    params.toEmail,
    `Application ${statusLabel}: ${params.jobTitle}`,
    html,
    text,
    'application_status',
    {
      jobTitle: params.jobTitle,
      status: params.status,
    }
  )
}

// ─────────────────────────────────────────────────────────
// OTP Verification — send 6-digit OTP to user
// ─────────────────────────────────────────────────────────
export async function sendOtpEmail(params: {
  toEmail: string
  otp: string
  expiryMinutes: number
}): Promise<{ success: boolean; messageId?: string }> {
  const content = `
    <h2 style="color: #1f2937; margin-top: 0; font-size: 20px;">Verify your email</h2>
    <p style="color: #4b5563; font-size: 16px;">Use the code below to complete your CareerConnect signup. This code expires in ${params.expiryMinutes} minutes.</p>
    <div style="text-align: center; margin: 30px 0; padding: 24px; background: #f3f4f6; border-radius: 12px; font-family: monospace; font-size: 28px; font-weight: 700; letter-spacing: 8px; color: #1f2937;">
      ${params.otp}
    </div>
    <p style="color: #6b7280; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
  `
  const html = emailWrapper('Verify your email', content)
  const text = `Your CareerConnect verification code is: ${params.otp}. It expires in ${params.expiryMinutes} minutes.`
  return sendEmail(
    params.toEmail,
    'Verify your email - CareerConnect',
    html,
    text,
    'otp',
    { expiryMinutes: params.expiryMinutes }
  )
}
