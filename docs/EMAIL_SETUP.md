# Gmail SMTP Setup (Fix "Email authentication failed")

If you see: **"Email authentication failed. Please check your SMTP credentials. Make sure you're using a Gmail App Password, not your regular password."** — Gmail is rejecting the login. Use a **Gmail App Password** (not your normal Gmail password).

---

## Step 1: Turn on 2-Step Verification

1. Go to **https://myaccount.google.com/security**
2. Sign in with **mycareerconnects@gmail.com** (or the email in `SMTP_USER`)
3. Under **"How you sign in to Google"**, click **2-Step Verification**
4. Turn it **On** and complete the setup (e.g. phone)

---

## Step 2: Create an App Password

1. Go to **https://myaccount.google.com/apppasswords**
2. Sign in with the same Gmail account
3. **Select app:** choose **Mail** (or **Other** and type "CareerConnect")
4. **Select device:** choose **Other** and type "CareerConnect backend"
5. Click **Generate**
6. Copy the **16-character password** (e.g. `abcd efgh ijkl mnop`) — use it **without spaces**: `abcdefghijklmnop`

---

## Step 3: Update backend/.env

Open **`backend/.env`** and set:

```env
SMTP_USER=mycareerconnects@gmail.com
SMTP_PASS=your-16-char-app-password-no-spaces
SMTP_FROM=CareerConnect <noreply@careerconnect.com>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

Replace `your-16-char-app-password-no-spaces` with the App Password you copied (no spaces).

---

## Step 4: Restart the backend

Stop the backend (Ctrl+C) and run again:

```bash
npm run dev
```

Then try "Forgot password" or sign up again; the email should send.

---

## If it still fails

- **"App Passwords" not showing?** 2-Step Verification must be on first.
- **Wrong password?** Generate a **new** App Password, update `SMTP_PASS`, and restart.
- **Revoked?** If you shared the App Password or reset your Google password, generate a new one and update `.env`.
