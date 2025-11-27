# 🚀 Quick Fix Guide - Mobile Connection

## Problem
Your APK shows "Connection Error" because it's trying to connect to localhost instead of your computer's IP.

## Solution
I've added a **Settings page** where you can change the server URL without rebuilding!

## Quick Start (3 Steps)

### Step 1: Test in Browser
```bash
# Make sure backend is running
cd server
npm run dev

# In another terminal, start frontend
cd client
npm run dev
```

Open `http://localhost:3000` and click the Settings icon (⚙️) in the navbar.

### Step 2: Configure Server URL
In the Settings page:
1. Click "Network IP" preset (already set to `10.254.223.222`)
2. Click "Test Connection"
3. If successful, click "Save Settings"

### Step 3: Build APK (Requires Java)

**If Java is installed:**
```bash
rebuild-with-new-ip.bat
```

**If Java is NOT installed:**
```bash
# Run as Administrator
choco install temurin17 -y

# Then rebuild
rebuild-with-new-ip.bat
```

## After Installing APK

1. Open the app on your phone
2. Tap the Settings icon (⚙️)
3. The IP should already be set to `10.254.223.222`
4. Tap "Test Connection"
5. If it works, tap "Save Settings"
6. Restart the app

## Important Notes

✅ **Backend must be running:** `cd server && npm run dev`
✅ **Phone must be on same WiFi** as your computer
✅ **Firewall must allow port 5000:** Run `allow-firewall.bat` as Administrator

## Test Backend from Phone

Before using the app, test if your phone can reach the backend:

1. Open browser on phone
2. Visit: `http://10.254.223.222:5000/api/restaurants`
3. You should see JSON data

If this doesn't work, the app won't work either. Check:
- Backend is running
- Phone is on same WiFi
- Firewall allows connections

## Benefits

✅ No rebuild needed when IP changes
✅ Easy to switch between localhost and network IP
✅ Test connection before saving
✅ Works for both development and production

## Need Help?

Check these files:
- `SOLUTION_MOBILE_CONNECTION.md` - Detailed explanation
- `MOBILE_CONNECTION_FIX.md` - Alternative solutions
- `allow-firewall.bat` - Fix firewall issues

## Current Configuration

- **Your Computer IP:** `10.254.223.222`
- **Backend URL:** `http://10.254.223.222:5000`
- **API URL:** `http://10.254.223.222:5000/api`
- **Settings Page:** Available in app navbar (⚙️ icon)

That's it! The Settings page makes it easy to configure the server URL without rebuilding the APK every time.
