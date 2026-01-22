# Google OAuth Setup Guide

## Current Status

The Google OAuth button and backend route are implemented and ready. However, to complete the full Google OAuth integration, you'll need to:

1. Set up Google OAuth credentials
2. Install the Google OAuth library
3. Replace the mock implementation with real Google OAuth

## Steps to Complete Google OAuth

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Configure OAuth consent screen
6. Create OAuth 2.0 Client ID for Web application
7. Add authorized JavaScript origins:
   - `http://localhost:5173` (development)
   - Your production domain
8. Copy the Client ID

### 2. Install Google OAuth Library

```bash
cd frontend
npm install @react-oauth/google
```

### 3. Update Frontend Code

Replace the mock Google OAuth implementation in `SignIn.tsx` and `SignUp.tsx`:

```tsx
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'

// In your component:
const login = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    // Get user info from Google
    const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
    }).then(res => res.json())

    // Send to backend
    const response = await api.post('/auth/google', {
      idToken: tokenResponse.access_token,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
    })
    
    setAuth(response.data.user, response.data.token)
    navigate('/role-selection')
  },
  onError: () => {
    toast.error('Google sign-in failed')
  },
})
```

### 4. Wrap App with GoogleOAuthProvider

In `App.tsx` or `main.tsx`:

```tsx
import { GoogleOAuthProvider } from '@react-oauth/google'

<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
  <App />
</GoogleOAuthProvider>
```

### 5. Environment Variables

Add to `frontend/.env`:

```
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

## Current Implementation

- ✅ Google OAuth button component created
- ✅ Backend route `/api/auth/google` implemented
- ✅ UI integration complete
- ⚠️ Mock implementation (needs real Google OAuth)

## Testing

The current implementation uses a mock flow for demonstration. To test:

1. Click "Continue with Google" button
2. It will attempt to authenticate (currently mocked)
3. Backend will create/login user
4. User will be redirected to role selection

## Notes

- The backend route accepts `{ idToken, email, name, picture }`
- In production, verify the `idToken` with Google's API before creating/login user
- Consider adding an `oauthProvider` field to the User model for better OAuth management

