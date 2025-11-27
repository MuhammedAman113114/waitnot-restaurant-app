# 🎯 Complete Setup Guide - From Zero to APK

## 📋 Current Status

✅ **Already Done:**
- Capacitor installed and configured
- React app built with your local IP (172.27.96.100)
- Android platform added and synced
- Configuration files created
- Helper scripts ready

🚨 **What You Need:**
- Java JDK 11+
- Android Studio + Android SDK
- Backend server running

## 🚀 Complete Step-by-Step Guide

### Phase 1: Install Build Tools (30-40 minutes)

#### Step 1.1: Install Java JDK

**Option A: Using Chocolatey (Recommended)**
```powershell
# Open PowerShell as Administrator (Right-click → Run as Administrator)

# Install Chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Java
choco install openjdk11 -y
```

**Option B: Manual Install**
1. Download JDK from: https://adoptium.net/
2. Run installer (choose default options)
3. Note installation path (e.g., `C:\Program Files\Eclipse Adoptium\jdk-11.0.21-hotspot`)

#### Step 1.2: Set JAVA_HOME Environment Variable

1. Press `Windows Key` and search "Environment Variables"
2. Click "Edit the system environment variables"
3. Click "Environment Variables" button
4. Under "System variables", click "New"
5. Variable name: `JAVA_HOME`
6. Variable value: `C:\Program Files\Eclipse Adoptium\jdk-11.0.21-hotspot` (your path)
7. Click OK

#### Step 1.3: Add Java to PATH

1. In "System variables", find and select "Path"
2. Click "Edit"
3. Click "New"
4. Add: `%JAVA_HOME%\bin`
5. Click OK on all windows

#### Step 1.4: Install Android Studio

1. Download from: https://developer.android.com/studio
2. Run installer
3. Choose "Standard" installation
4. Wait for download to complete (this takes 10-20 minutes)

#### Step 1.5: Install Android SDK Components

1. Open Android Studio
2. Click "More Actions" → "SDK Manager"
3. In "SDK Platforms" tab:
   - ✅ Check "Android 13.0 (Tiramisu)" - API Level 33
4. In "SDK Tools" tab:
   - ✅ Check "Android SDK Build-Tools 33"
   - ✅ Check "Android SDK Command-line Tools (latest)"
   - ✅ Check "Android SDK Platform-Tools"
5. Click "Apply" and wait for download

#### Step 1.6: Set ANDROID_HOME Environment Variable

1. Press `Windows Key` and search "Environment Variables"
2. Click "Edit the system environment variables"
3. Click "Environment Variables" button
4. Under "System variables", click "New"
5. Variable name: `ANDROID_HOME`
6. Variable value: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
   - Replace `YourUsername` with your actual username
7. Click OK

#### Step 1.7: Add Android SDK to PATH

1. In "System variables", find and select "Path"
2. Click "Edit"
3. Click "New" and add each of these:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\cmdline-tools\latest\bin`
4. Click OK on all windows

#### Step 1.8: RESTART YOUR COMPUTER

This is crucial! Environment variables won't work until you restart.

---

### Phase 2: Verify Installation (2 minutes)

After restarting, open a NEW Command Prompt and run:

```bash
# Check Java
java -version
# Expected: openjdk version "11.x.x" or higher

# Check JAVA_HOME
echo %JAVA_HOME%
# Expected: C:\Program Files\Eclipse Adoptium\jdk-11.x.x-hotspot

# Check Android SDK
echo %ANDROID_HOME%
# Expected: C:\Users\YourUsername\AppData\Local\Android\Sdk

# Check ADB
adb version
# Expected: Android Debug Bridge version x.x.x
```

**Or use our checker:**
```bash
cd "WAITNOT - APK"
check-requirements.bat
```

All should show [OK]!

---

### Phase 3: Configure Firewall (1 minute)

Your phone needs to access your computer's backend server.

**Option A: Using our script (Recommended)**
```bash
cd "WAITNOT - APK"
# Right-click allow-firewall.bat → Run as Administrator
```

**Option B: Manual**
1. Windows Security → Firewall & network protection
2. Advanced settings
3. Inbound Rules → New Rule
4. Port → TCP → 5000
5. Allow the connection
6. Name it "WaitNot Backend"

---

### Phase 4: Start Backend Server (1 minute)

Open a NEW terminal:
```bash
cd "WAITNOT - APK/server"
npm run dev
```

You should see:
```
🚀 Server running on port 5000
```

**Keep this terminal open!**

---

### Phase 5: Test Backend Accessibility (1 minute)

**From your computer:**
Open browser and visit:
- http://172.27.96.100:5000/api/restaurants

You should see JSON data with restaurants.

**From your phone:**
1. Make sure phone is on same WiFi as computer
2. Open browser on phone
3. Visit: http://172.27.96.100:5000/api/restaurants
4. You should see the same JSON data

If you don't see data on phone:
- Check firewall (run allow-firewall.bat as admin)
- Check if both devices on same WiFi
- Check if backend server is running

---

### Phase 6: Build APK (5-10 minutes first time)

**Option A: Using Build Script**
```bash
cd "WAITNOT - APK"
build-apk.bat
```

**Option B: Using Android Studio (Recommended for first build)**
1. Open Android Studio
2. File → Open → Navigate to `WAITNOT - APK/client/android`
3. Click OK
4. Wait for Gradle sync (5-10 minutes first time)
   - You'll see progress at bottom of window
   - Don't interrupt this process!
5. Once sync complete:
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
6. Wait for build (2-5 minutes)
7. Click "locate" in notification to find APK

**Option C: Manual Command Line**
```bash
cd "WAITNOT - APK/client/android"
gradlew.bat assembleDebug
```

---

### Phase 7: Install APK on Phone (2 minutes)

#### Step 7.1: Find Your APK
Location:
```
WAITNOT - APK/client/android/app/build/outputs/apk/debug/app-debug.apk
```

#### Step 7.2: Transfer to Phone
- Copy via USB cable
- Email to yourself
- Upload to Google Drive/Dropbox
- Use ADB: `adb install app-debug.apk`

#### Step 7.3: Enable Unknown Sources
On your phone:
1. Settings → Security → Unknown Sources (enable)
2. Or: Settings → Apps → Special Access → Install Unknown Apps → Enable for your file manager

#### Step 7.4: Install
1. Open the APK file on your phone
2. Tap "Install"
3. Tap "Open" when done

---

### Phase 8: Test the App (5 minutes)

**Prerequisites:**
- ✅ Phone on same WiFi as computer
- ✅ Backend server running
- ✅ Firewall allows port 5000

**Basic Tests:**
1. Open WaitNot app
2. Should see list of restaurants
3. Click on "Spice Garden"
4. Should see menu items
5. Add "Butter Chicken" to cart
6. Click cart icon
7. Should see item in cart
8. Click "Checkout"
9. Fill in delivery details
10. Place order

**Verify Order:**
1. Open browser on computer
2. Go to: http://localhost:3000/restaurant-login
3. Login: spice@example.com / password123
4. Should see your order in dashboard!

---

## 🎯 Quick Reference

### Build Commands
```bash
# Check requirements
check-requirements.bat

# Build APK
build-apk.bat

# Manual build
cd "WAITNOT - APK/client"
npm run build
npx cap sync
cd android
gradlew.bat assembleDebug
```

### Server Commands
```bash
# Start backend
cd "WAITNOT - APK/server"
npm run dev

# Seed data (if needed)
cd "WAITNOT - APK/server"
npm run seed
```

### Testing URLs
- Backend API: http://172.27.96.100:5000/api/restaurants
- Web App: http://localhost:3000
- Restaurant Login: http://localhost:3000/restaurant-login

### Test Credentials
- Email: spice@example.com
- Password: password123

---

## 🐛 Troubleshooting

### Build Fails with "JAVA_HOME not set"
1. Install Java JDK
2. Set JAVA_HOME environment variable
3. **Restart computer**
4. Try again

### Build Fails with "Android SDK not found"
1. Install Android Studio
2. Install SDK components
3. Set ANDROID_HOME environment variable
4. **Restart computer**
5. Try again

### "Gradle sync failed"
1. Open Android Studio
2. File → Invalidate Caches → Invalidate and Restart
3. Wait for re-sync
4. Try building again

### Phone Can't Connect to Server
1. Check both on same WiFi
2. Run allow-firewall.bat as admin
3. Test from phone browser: http://172.27.96.100:5000/api/restaurants
4. If still fails, temporarily disable firewall and test

### White Screen on App
1. Check backend is running
2. Check phone can access backend (test in browser)
3. Check Android Studio Logcat for errors
4. Rebuild app

### App Crashes on Launch
1. Connect phone via USB
2. Open Android Studio → Logcat
3. Look for error messages
4. Check if API URL is correct in config.js

---

## ✅ Success Checklist

### Installation
- [ ] Java JDK installed
- [ ] JAVA_HOME set
- [ ] Android Studio installed
- [ ] Android SDK Platform 33 installed
- [ ] Android SDK Build-Tools 33 installed
- [ ] ANDROID_HOME set
- [ ] Computer restarted
- [ ] `java -version` works
- [ ] `echo %JAVA_HOME%` shows path
- [ ] `echo %ANDROID_HOME%` shows path

### Backend
- [ ] Backend server running
- [ ] Can access http://172.27.96.100:5000/api/restaurants from computer
- [ ] Can access http://172.27.96.100:5000/api/restaurants from phone
- [ ] Firewall allows port 5000

### Build
- [ ] React app built (dist folder exists)
- [ ] Capacitor synced
- [ ] APK built successfully
- [ ] APK file exists at correct location

### Testing
- [ ] Phone on same WiFi as computer
- [ ] APK installed on phone
- [ ] App opens without crashing
- [ ] Can see restaurants list
- [ ] Can view restaurant details
- [ ] Can add items to cart
- [ ] Can place order
- [ ] Order appears in dashboard

---

## 🎉 You're Done!

If all checkboxes are checked, congratulations! You have:
- ✅ Built your first Android APK
- ✅ Tested it on a real device
- ✅ Connected it to your backend
- ✅ Verified full functionality

## 🚀 Next Steps

1. **Deploy Backend to Cloud:**
   - Heroku, Railway, Render, or Vercel
   - Update config.js with production URL
   - Rebuild APK

2. **Customize Your App:**
   - Change app name and icon
   - Update branding and colors
   - Add your own content

3. **Build Release APK:**
   - Generate keystore
   - Sign APK for production
   - Optimize and test

4. **Publish to Play Store:**
   - Create developer account ($25)
   - Prepare store listing
   - Upload APK/AAB
   - Submit for review

Good luck! 🎊📱
