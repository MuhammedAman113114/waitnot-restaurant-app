# 🔧 Fix IP Address - Quick Guide

## Problem

Your IP address changed!
- **Old IP:** `10.254.223.222` (in the app)
- **New IP:** `172.27.96.222` (your current IP)

That's why the connection test is failing.

## Solution (2 Minutes)

### Option 1: Update in the App (No Rebuild!) ⚡ FASTEST

**On your phone, in the Settings page:**

1. **Change API URL:**
   - Current: `http://10.254.223.222:5000/api`
   - Change to: `http://172.27.96.222:5000/api`

2. **Change Socket URL:**
   - Current: `http://10.254.223.222:5000`
   - Change to: `http://172.27.96.222:5000`

3. **Test Connection:**
   - Tap "Test Connection" button
   - Should show: ✓ Connected! Found X restaurants

4. **Save:**
   - Tap "Save Settings"
   - Go back to home page
   - Restaurants should load!

### Option 2: Rebuild APK with New IP

If you want the new IP as default:

```bash
rebuild-with-java17.bat
```

Then reinstall the APK.

## Why This Happened

Your computer's IP address can change when:
- You reconnect to WiFi
- Your router assigns a new IP
- You switch networks
- Your computer restarts

**This is exactly why I created the Settings page!** You can update the IP without rebuilding the APK.

## Current Status

✅ Backend is running on port 5000
✅ Settings page is working
✅ New IP detected: `172.27.96.222`
❌ App configured with old IP: `10.254.223.222`

## Quick Steps

**Right now on your phone:**

1. In Settings page, manually type:
   ```
   API URL: http://172.27.96.222:5000/api
   Socket URL: http://172.27.96.222:5000
   ```

2. Tap "Test Connection"

3. Should work! ✓

4. Tap "Save Settings"

5. Go to home page

6. Enjoy! 🎉

## Alternative: Use the Preset

I've updated the code so the "Network IP" preset now uses `172.27.96.222`. But you'd need to rebuild for that to take effect.

**Easier:** Just manually change the IP in the Settings page right now!

## Verify Backend is Accessible

From your phone's browser, visit:
```
http://172.27.96.222:5000/api/restaurants
```

You should see JSON data with restaurant list.

## Summary

Your IP changed from `10.254.223.222` to `172.27.96.222`. Just update it in the Settings page and you're good to go!

**No rebuild needed - that's the whole point of the Settings page!** 🚀
