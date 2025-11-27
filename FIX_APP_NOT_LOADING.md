# 🔧 Fix: App Not Loading Data

## Problem

- ✅ Browser works: `http://172.27.96.222:5000/api/restaurants`
- ❌ App doesn't load data
- ❌ Test Connection fails in Settings

## Why This Happens

The APK was built with the old IP (`10.254.223.222`) hardcoded. Even though you changed it in Settings, the app needs to be rebuilt or the cache needs to be cleared.

## Solution 1: Clear App Data (Quick - 2 Minutes)

### On Your Phone:

1. **Go to Settings → Apps**
2. **Find "WaitNot" app**
3. **Tap "Storage"**
4. **Tap "Clear Data" or "Clear Storage"**
5. **Open the app again**
6. **Go to Settings (⚙️ icon)**
7. **Enter the IP:**
   - API URL: `http://172.27.96.222:5000/api`
   - Socket URL: `http://172.27.96.222:5000`
8. **Test Connection** - should work now!
9. **Save Settings**
10. **Go to home page** - restaurants should load!

## Solution 2: Rebuild APK (Better - 5 Minutes)

I've updated the code with the new IP. Rebuild the APK:

```bash
rebuild-with-java17.bat
```

Then:
1. Uninstall old APK
2. Install new APK
3. Open app
4. Should work immediately!

## Solution 3: Manual Fix (If Above Don't Work)

### Step 1: Uninstall the app completely

### Step 2: Rebuild with updated code
```bash
rebuild-with-java17.bat
```

### Step 3: Install fresh APK

### Step 4: Configure in Settings
- IP should already be `172.27.96.222`
- Test and save

## What I Fixed in the Code

1. **Updated default IP** to `172.27.96.222` in:
   - `client/src/config.js`
   - `client/src/main.jsx`
   - `client/src/pages/Settings.jsx`

2. **Fixed fetch timeout** in Settings page
   - Now uses AbortController
   - Better error handling

3. **Auto-reload after save**
   - App reloads when you save settings
   - Ensures new config is applied

## Quick Test

**After clearing data or reinstalling:**

1. Open app
2. Go to Settings (⚙️)
3. Verify IP is `172.27.96.222`
4. Tap "Test Connection"
5. Should show: ✓ Connected! Found X restaurants
6. Tap "Save Settings"
7. App will reload
8. Home page should show restaurants

## Troubleshooting

### "Test Connection still fails"
- Make sure you cleared app data completely
- Or rebuild and reinstall APK

### "Home page still shows error"
- After saving settings, did the app reload?
- Try manually closing and reopening the app
- Check Settings again to verify IP is saved

### "Nothing works"
- Uninstall app completely
- Rebuild APK: `rebuild-with-java17.bat`
- Install fresh APK
- Should work immediately

## Why Clearing Data Works

When you install an APK:
1. App code is installed
2. localStorage is empty
3. App uses default IP from code

When you change settings:
1. New IP saved to localStorage
2. But app is already running with old config
3. Need to restart or reload

When you clear data:
1. localStorage is cleared
2. App restarts fresh
3. Reads from localStorage (empty)
4. Uses default IP from code
5. You set new IP in Settings
6. Saves to localStorage
7. App reloads with new IP

## Recommended Approach

**Fastest:** Clear app data (Solution 1)
**Best:** Rebuild APK (Solution 2)

Both will work! Choose based on your preference.

## Current Status

✅ Backend running: `172.27.96.222:5000`
✅ Browser test works
✅ Code updated with new IP
✅ Settings page fixed
❌ Need to clear data or rebuild

**Just clear app data or rebuild, and you're done!**
