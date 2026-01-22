import nodemailer from 'nodemailer'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

// Create transporter (configure based on your email service)
const createTransporter = () => {
  const SMTP_USER = process.env.SMTP_USER
  const SMTP_PASS = process.env.SMTP_PASS
  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PORT = process.env.SMTP_PORT

  // Check if credentials are configured
  if (!SMTP_USER || !SMTP_PASS) {
    console.error('❌ SMTP credentials not configured!')
    console.error('Please set SMTP_USER and SMTP_PASS in backend/.env')
    throw new Error('Email service not configured. Please set SMTP_USER and SMTP_PASS in .env')
  }

  // If SMTP_HOST is provided and not Gmail, use custom SMTP settings
  if (SMTP_HOST && SMTP_HOST !== 'smtp.gmail.com') {
    console.log('📧 Using custom SMTP server:', SMTP_HOST)
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || '587'),
      secure: SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // For development only
      },
    })
  }

  // Use Gmail SMTP (default or if SMTP_HOST is smtp.gmail.com or not provided)
  console.log('📧 Using Gmail SMTP service')
  console.log('   SMTP_USER:', SMTP_USER)
  console.log('   SMTP_PASS:', SMTP_PASS ? '***' + SMTP_PASS.slice(-4) : 'NOT SET')
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  console.log('📧 Attempting to send password reset email to:', email)
  
  let transporter
  try {
    transporter = createTransporter()
  } catch (error: any) {
    console.error('❌ Failed to create email transporter:', error.message)
    throw error
  }

  const resetUrl = `${FRONTEND_URL}/reset-password/${token}`
  console.log('🔗 Reset URL:', resetUrl)

  const mailOptions = {
    from: process.env.SMTP_FROM || 'CareerConnect <noreply@careerconnect.com>',
    to: email,
    subject: 'Reset your CareerConnect password',
    html: `
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
    `,
    text: `
      Reset Your Password
      
      You requested to reset your password for your CareerConnect account.
      
      Click the link below to reset your password. This link will expire in 15 minutes.
      
      ${resetUrl}
      
      If you didn't request this password reset, please ignore this email.
    `,
  }

  try {
    console.log('📤 Sending email...')
    console.log('   From:', mailOptions.from)
    console.log('   To:', email)
    console.log('   Subject:', mailOptions.subject)
    
    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Password reset email sent successfully!')
    console.log('   Message ID:', info.messageId)
    console.log('   Response:', info.response)
    return { success: true, messageId: info.messageId }
  } catch (error: any) {
    console.error('❌ Error sending password reset email:')
    console.error('   Error code:', error.code)
    console.error('   Error message:', error.message)
    console.error('   Error response:', error.response)
    console.error('   Error command:', error.command)
    console.error('   Full error:', JSON.stringify(error, null, 2))
    
    // Provide more helpful error messages
    if (error.code === 'EAUTH') {
      console.error('🔴 AUTHENTICATION FAILED')
      console.error('   Please check:')
      console.error('   1. SMTP_USER is your full Gmail address')
      console.error('   2. SMTP_PASS is a Gmail App Password (not your regular password)')
      console.error('   3. 2-Factor Authentication is enabled on your Gmail account')
      console.error('   4. App Password was generated from: https://myaccount.google.com/apppasswords')
      throw new Error('Email authentication failed. Please check your SMTP credentials. Make sure you\'re using a Gmail App Password, not your regular password.')
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      throw new Error('Could not connect to email server. Please check SMTP_HOST and SMTP_PORT.')
    } else if (error.code === 'EENVELOPE') {
      throw new Error('Invalid email address. Please check the recipient email.')
    } else {
      throw new Error(`Failed to send email: ${error.message || 'Unknown error'}`)
    }
  }
}

