# 🔧 Fix: Data Not Loading Issue

## Problem
The app shows "Connection Error - timeout of 10000ms exceeded" because the Render backend is sleeping (free tier limitation).

## Solution Options

### Option 1: Wake Up Render Backend (Quick Fix)
The Render free tier sleeps after 15 minutes of inactivity. First request takes 30-60 seconds to wake it up.

**Steps:**
1. Open browser and visit: https://waitnot-restaurant-app.onrender.com/api/restaurants
2. Wait 30-60 seconds for the server to wake up
3. Refresh your app
4. Data should now load

**Note:** This is temporary - server will sleep again after 15 minutes of inactivity.

---

### Option 2: Run Local Server (Best for Development)

#### Step 1: Start Local Backend
```bash
# Open terminal and run:
npm run server
```

This will start the server at `http://localhost:5000`

#### Step 2: Update Client Config
Open `client/src/config.js` and change:

```javascript
// Change from:
export const API_URL = localStorage.getItem('apiUrl') || 'https://waitnot-restaurant-app.onrender.com/api';
export const SOCKET_URL = localStorage.getItem('socketUrl') || 'https://waitnot-restaurant-app.onrender.com';

// To:
export const API_URL = localStorage.getItem('apiUrl') || 'http://localhost:5000/api';
export const SOCKET_URL = localStorage.getItem('socketUrl') || 'http://localhost:5000';
```

#### Step 3: Rebuild and Test
```bash
# In client folder:
cd client
npm run dev
```

Open browser at `http://localhost:5173`

---

### Option 3: Use Ngrok for Mobile Testing

If you need to test on mobile/APK with local server:

#### Step 1: Start Local Server
```bash
npm run server
```

#### Step 2: Start Ngrok
```bash
ngrok http 5000
```

You'll get a URL like: `https://abc123.ngrok.io`

#### Step 3: Update Config
In `client/src/config.js`:
```javascript
export const API_URL = 'https://abc123.ngrok.io/api';
export const SOCKET_URL = 'https://abc123.ngrok.io';
```

#### Step 4: Rebuild APK
```bash
.\build-production-apk.bat
```

---

### Option 4: Upgrade Render Plan (Production Solution)

For production without sleep issues:
1. Go to https://render.com
2. Upgrade to paid plan ($7/month)
3. Server stays awake 24/7
4. No configuration changes needed

---

## Quick Test Script

I'll create a script to test backend connectivity:

```bash
# test-backend.bat
```

---

## Recommended Approach

**For Development:**
- Use Option 2 (Local Server)
- Fast, reliable, no timeouts

**For Testing on Phone:**
- Use Option 3 (Ngrok)
- Allows mobile testing with local server

**For Production:**
- Use Option 4 (Paid Render)
- Or deploy to another service (Railway, Heroku, AWS)

---

## Current Status

✅ Frontend: Working  
❌ Backend: Sleeping on Render  
✅ Code: No errors  
❌ Data: Not loading due to backend timeout

## Next Steps

Choose one of the options above based on your needs. I recommend starting with Option 1 to quickly test, then moving to Option 2 for development.
