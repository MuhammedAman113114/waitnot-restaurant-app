# 🌐 Deploy Complete Website Online - Free & Permanent

## Overview

We'll deploy:
1. **Backend** → Render.com (Free)
2. **Frontend** → Vercel/Netlify (Free)
3. **Result** → Complete website accessible from anywhere!

---

## Part 1: Deploy Backend (Render.com)

### Step 1: Prepare Backend for Deployment

Your backend is already ready! Just need to push to GitHub.

### Step 2: Create Render Account
1. Go to: https://render.com
2. Sign up with GitHub (easiest)
3. Free - no credit card needed

### Step 3: Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Or use "Public Git repository" if not on GitHub yet

**Settings:**
- **Name:** `waitnot-backend`
- **Region:** Choose closest to you
- **Root Directory:** `server`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free

4. Click "Create Web Service"
5. Wait 5-10 minutes for deployment

**You'll get a URL like:** `https://waitnot-backend.onrender.com`

**Save this URL!** You'll need it for the frontend.

---

## Part 2: Deploy Frontend (Vercel - Recommended)

### Step 1: Update Frontend Config

Before deploying, update the API URL in your frontend:

**File:** `client/src/config.js`

Change to:
```javascript
export const API_URL = 'https://waitnot-backend.onrender.com/api';
export const SOCKET_URL = 'https://waitnot-backend.onrender.com';
```

**File:** `client/src/main.jsx`

Change to:
```javascript
const savedApiUrl = localStorage.getItem('apiUrl') || 'https://waitnot-backend.onrender.com/api'
axios.defaults.baseURL = savedApiUrl.replace('/api', '')
```

### Step 2: Create Vercel Account
1. Go to: https://vercel.com
2. Sign up with GitHub
3. Free - no credit card needed

### Step 3: Deploy Frontend
1. Click "Add New..." → "Project"
2. Import your Git repository
3. Or use Vercel CLI (see below)

**Settings:**
- **Framework Preset:** Vite
- **Root Directory:** `client`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

4. Click "Deploy"
5. Wait 2-3 minutes

**You'll get a URL like:** `https://waitnot.vercel.app`

---

## Alternative: Deploy Frontend to Netlify

### Step 1: Create Netlify Account
1. Go to: https://netlify.com
2. Sign up with GitHub
3. Free - no credit card needed

### Step 2: Deploy
1. Click "Add new site" → "Import an existing project"
2. Connect to GitHub
3. Select your repository

**Settings:**
- **Base directory:** `client`
- **Build command:** `npm run build`
- **Publish directory:** `client/dist`

4. Click "Deploy"

**You'll get a URL like:** `https://waitnot.netlify.app`

---

## Part 3: Update Mobile App

After deployment, update your mobile app:

### Option 1: Rebuild APK with Production URL

Update these files with your production URLs:

**`client/src/config.js`:**
```javascript
export const API_URL = 'https://waitnot-backend.onrender.com/api';
export const SOCKET_URL = 'https://waitnot-backend.onrender.com';
```

**`client/src/main.jsx`:**
```javascript
axios.defaults.baseURL = 'https://waitnot-backend.onrender.com'
```

Then rebuild:
```bash
clean-rebuild.bat
```

### Option 2: Use Settings Page

Just enter the production URL in the app's Settings page:
- API URL: `https://waitnot-backend.onrender.com/api`
- Socket URL: `https://waitnot-backend.onrender.com`

---

## Quick Deployment Using CLI

### Deploy Backend (Render CLI)
```bash
# Install Render CLI
npm install -g render-cli

# Login
render login

# Deploy
cd server
render deploy
```

### Deploy Frontend (Vercel CLI)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd client
vercel
```

---

## Summary of URLs

After deployment, you'll have:

1. **Backend API:** `https://waitnot-backend.onrender.com`
2. **Frontend Website:** `https://waitnot.vercel.app`
3. **Mobile App:** Use backend URL in Settings

---

## Cost

Everything is **100% FREE**:
- ✅ Render.com: Free tier (750 hours/month)
- ✅ Vercel: Free for personal projects
- ✅ Netlify: Free for personal projects

---

## Benefits

✅ **Always online** - No need to run npm run dev
✅ **Permanent URLs** - Never change
✅ **HTTPS** - Secure by default
✅ **Fast** - CDN included
✅ **No maintenance** - Auto-updates from GitHub
✅ **Professional** - Real domain names

---

## Troubleshooting

### Backend deployment fails
- Check `server/package.json` has `"start": "node server.js"`
- Make sure all dependencies are in `package.json`
- Check Render logs for errors

### Frontend deployment fails
- Make sure build command is `npm run build`
- Check output directory is `dist`
- Verify all dependencies are installed

### CORS errors
Your backend already has CORS enabled, so this should work fine.

### Database/Data
Your app uses JSON files for data. On Render, these files will reset when the server restarts (free tier). For production, consider using:
- MongoDB Atlas (free)
- PostgreSQL on Render (free)
- Supabase (free)

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Get backend URL
3. ✅ Update frontend config with backend URL
4. ✅ Deploy frontend to Vercel/Netlify
5. ✅ Update mobile app with production URL
6. ✅ Test everything!

**Total time: 20-30 minutes**
**Cost: $0**
**Result: Professional, always-online website!**

---

## Need Help?

If you get stuck:
1. Check deployment logs
2. Verify all URLs are correct
3. Test backend URL in browser: `https://your-backend.onrender.com/api/restaurants`
4. Test frontend URL in browser: `https://your-frontend.vercel.app`

Good luck! 🚀
