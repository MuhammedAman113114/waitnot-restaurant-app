# 📱 Mobile APK Connection Fix

## Problem
Your APK is configured to connect to `localhost:5000`, which doesn't work on a mobile device because localhost refers to the phone itself, not your computer.

## Solution Options

### Option 1: Quick Fix - Use Environment Config (RECOMMENDED)

Instead of rebuilding, we can create a configuration screen in the app where you can change the server URL.

**Steps:**
1. I'll add a settings page to the app
2. You can enter your computer's IP address in the app
3. No need to rebuild every time your IP changes

### Option 2: Rebuild APK with Correct IP

**Current Status:**
- ✅ Configuration files updated to use `10.254.223.222:5000`
- ✅ Backend server is accessible on network
- ❌ Java JDK not installed (required for building)

**To rebuild, you need to:**

1. **Install Java 17:**
   ```bash
   # Run as Administrator
   choco install temurin17 -y
   ```
   
   Or download manually from: https://adoptium.net/temurin/releases/?version=17

2. **Set JAVA_HOME:**
   After installation, Java will be at:
   `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`

3. **Rebuild APK:**
   ```bash
   rebuild-with-new-ip.bat
   ```

### Option 3: Use ngrok (For Testing Without WiFi Issues)

Deploy your backend through ngrok to get a public URL:

1. Install ngrok: https://ngrok.com/download
2. Run: `ngrok http 5000`
3. Copy the https URL (e.g., `https://abc123.ngrok.io`)
4. Update config files with this URL
5. Rebuild APK

**Pros:** Works anywhere, no WiFi/IP issues
**Cons:** Free tier has limitations, URL changes each time

## Current Network Setup

**Your Computer:**
- WiFi IP: `10.254.223.222`
- Backend running on: `http://10.254.223.222:5000`
- Backend is accessible ✅

**Your Phone:**
- Must be on same WiFi network
- Currently trying to connect to: `localhost:5000` ❌

## Testing Backend from Phone

Before installing APK, test if your phone can reach the backend:

1. Open browser on your phone
2. Visit: `http://10.254.223.222:5000/api/restaurants`
3. You should see JSON data with restaurant list

If this doesn't work:
- Check if phone is on same WiFi
- Run `allow-firewall.bat` as Administrator on your computer
- Check if backend server is running: `cd server && npm run dev`

## Recommended Approach

**For Development/Testing:**
Use Option 1 (Settings page in app) - Most flexible, no rebuilds needed

**For Production:**
Deploy backend to cloud (Heroku/Railway/Render) and use that URL

## Need Help?

Run these diagnostic commands:

```bash
# Check if backend is running
netstat -ano | findstr :5000

# Check your current IP
ipconfig

# Test backend from your computer
curl http://10.254.223.222:5000/api/restaurants
```
