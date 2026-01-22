# 🚨 Quick Fix: Email Not Sending

## ❌ Problem

Your `backend/.env` file has **placeholder values** instead of real Gmail credentials:

```env
SMTP_USER=your-email@gmail.com          ← PLACEHOLDER
SMTP_PASS=your-app-password-here       ← PLACEHOLDER
```

## ✅ Solution: Get Gmail App Password

### Step 1: Enable 2-Factor Authentication
1. Go to: https://myaccount.google.com/security
2. Enable "2-Step Verification" if not already enabled

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" from dropdown
3. Select "Other (Custom name)"
4. Enter: "CareerConnect"
5. Click "Generate"
6. **Copy the 16-character password** (format: `xxxx xxxx xxxx xxxx`)

### Step 3: Update backend/.env

Edit `backend/.env` and replace:

```env
# BEFORE (Placeholders - NOT WORKING)
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-here

# AFTER (Your Real Credentials)
SMTP_USER=gpt9338@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
```

**Important:**
- Remove spaces from App Password: `abcdefghijklmnop`
- Use your actual Gmail address
- Use the 16-character App Password (not your regular password)

### Step 4: Restart Backend

```bash
# Stop backend (Ctrl+C in terminal)
cd backend
npm run dev
```

### Step 5: Test Again

1. Go to `/forgot-password`
2. Enter email: `gpt9338@gmail.com`
3. Click "Send reset link"
4. **Check backend console** - you should see:
   ```
   ✅ Password reset email sent successfully!
   ```
5. Check your Gmail inbox (and spam folder)

## 🔍 Check Backend Console

When you click "Send reset link", watch the backend terminal:

**✅ Success:**
```
📧 Using Gmail SMTP service
   SMTP_USER: gpt9338@gmail.com
📧 Attempting to send password reset email...
📤 Sending email...
✅ Password reset email sent successfully!
```

**❌ Error (if credentials wrong):**
```
❌ Error sending password reset email:
   Error code: EAUTH
   Error message: Invalid login
🔴 AUTHENTICATION ERROR - Check your SMTP credentials!
```

## ⚠️ Common Mistakes

1. **Using regular Gmail password** → Must use App Password
2. **Spaces in App Password** → Remove all spaces
3. **Wrong email address** → Use exact Gmail address
4. **Not restarting backend** → Must restart after changing .env

## 📧 After Fixing

Once you update `.env` with real credentials and restart:
- Backend will send emails successfully
- You'll receive reset link in Gmail
- Password reset flow will work end-to-end

