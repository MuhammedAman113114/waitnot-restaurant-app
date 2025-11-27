# 📱 Install New APK - Final Steps

## ✅ Build Complete!

Your new APK with the Settings page is ready!

**Location:** `client\android\app\build\outputs\apk\debug\app-debug.apk`
**Size:** 4.26 MB
**Built:** Just now with all fixes

## Important: Uninstall Old APK First!

The APK you're currently using is the OLD version without the Settings page. You MUST uninstall it first.

### Step 1: Uninstall Old APK

On your phone:
1. Go to Settings → Apps
2. Find "WaitNot" app
3. Tap "Uninstall"
4. Confirm

### Step 2: Copy New APK to Phone

**Option A: USB Cable**
1. Connect phone to computer via USB
2. Copy `client\android\app\build\outputs\apk\debug\app-debug.apk` to phone
3. Navigate to the file on phone

**Option B: Cloud/Email**
1. Upload APK to Google Drive/Dropbox
2. Download on phone
3. Or email it to yourself

**Option C: ADB (if installed)**
```bash
adb install -r client\android\app\build\outputs\apk\debug\app-debug.apk
```

### Step 3: Install New APK

1. Open the APK file on your phone
2. Allow "Install from Unknown Sources" if prompted
3. Tap "Install"
4. Wait for installation to complete
5. Tap "Open"

### Step 4: Look for Settings Icon

In the new app, you should see:
- 🌐 Language selector
- ⚙️ **Settings icon** (NEW!)
- 🎬 Reels icon
- 🛒 Cart icon

The Settings icon (⚙️) should be between the language selector and reels icon.

### Step 5: Configure Server URL

1. Tap the Settings icon (⚙️)
2. You'll see the Settings page with:
   - Quick presets
   - API URL input
   - Socket URL input
   - Test Connection button

3. The default IP should already be set to: `10.254.223.222`

4. Tap "Test Connection"
   - If successful: You'll see "✓ Connected! Found X restaurants"
   - If failed: Check the troubleshooting section below

5. If successful, tap "Save Settings"

6. Restart the app (close and reopen)

### Step 6: Test the App

1. You should see the home page with restaurants
2. Try browsing restaurants
3. Add items to cart
4. Everything should work!

## Troubleshooting

### "Settings icon not visible"
- Make sure you uninstalled the old APK first
- Make sure you installed the NEW APK (4.26 MB)
- Check the build date/time

### "Connection still fails"
1. **Check backend is running:**
   ```bash
   cd server
   npm run dev
   ```

2. **Check your IP hasn't changed:**
   ```bash
   ipconfig
   ```
   Look for IPv4 Address under WiFi adapter

3. **Test from phone browser:**
   Open browser on phone and visit:
   ```
   http://10.254.223.222:5000/api/restaurants
   ```
   You should see JSON data

4. **Check firewall:**
   Run as Administrator on your computer:
   ```bash
   allow-firewall.bat
   ```

5. **Verify same WiFi:**
   Make sure both phone and computer are on the same WiFi network

### "Can't find Settings page"
- Tap the ⚙️ icon in the top navbar
- It's between the language selector and reels icon
- If you don't see it, you're using the old APK

### "Test Connection fails"
1. Make sure backend is running
2. Check if IP is correct (run `ipconfig` on computer)
3. Try the "Localhost" preset if testing on emulator
4. Try the "Network IP" preset if testing on real device

## What the Settings Page Looks Like

You should see:
- **Title:** "Server Settings"
- **Info card:** Blue box with mobile device setup instructions
- **Quick Presets:** Two buttons (Localhost, Network IP)
- **API URL field:** Text input with your server URL
- **Socket URL field:** Text input for real-time updates
- **Test Connection button:** Blue button to test
- **Save Settings button:** Green button to save
- **Reset button:** Gray button to reset to defaults
- **Help section:** Instructions for finding your IP

## Current Configuration

- **Your Computer IP:** `10.254.223.222`
- **Backend URL:** `http://10.254.223.222:5000`
- **API URL:** `http://10.254.223.222:5000/api`
- **APK Size:** 4.26 MB
- **Build Date:** Just now

## Benefits of New APK

✅ **Settings page** - Change server URL without rebuilding
✅ **Connection testing** - Test before saving
✅ **Quick presets** - Easy switching between environments
✅ **Instructions** - Built-in help for finding your IP
✅ **No rebuild needed** - Update URL anytime

## Next Time Your IP Changes

1. Open the app
2. Tap Settings icon (⚙️)
3. Enter new IP address
4. Test connection
5. Save settings
6. Restart app

**No rebuild needed!** 🎉

## Summary

1. ✅ Uninstall old APK
2. ✅ Install new APK (4.26 MB)
3. ✅ Look for Settings icon (⚙️)
4. ✅ Configure server URL
5. ✅ Test connection
6. ✅ Save and restart
7. ✅ Enjoy your app!

The Settings page makes it easy to configure the server URL without rebuilding. This is a huge improvement over the old version!
