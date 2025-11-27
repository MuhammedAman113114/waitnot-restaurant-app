# 🔄 Old APK vs New APK

## What You're Currently Using (OLD APK)

❌ **No Settings icon** in navbar
❌ **Hardcoded to localhost** - doesn't work on mobile
❌ **Can't change server URL** without rebuilding
❌ **Shows "Connection Error"** on mobile devices
❌ **No way to test connection**

### Navbar Icons (Old):
```
🌐 Language | 🎬 Reels | 🛒 Cart
```

## What You Need to Install (NEW APK)

✅ **Settings icon (⚙️)** in navbar
✅ **Configured for network IP** - works on mobile
✅ **Can change server URL** in the app
✅ **Connection testing** before saving
✅ **Quick presets** for easy switching

### Navbar Icons (New):
```
🌐 Language | ⚙️ Settings | 🎬 Reels | 🛒 Cart
```

## Key Differences

| Feature | Old APK | New APK |
|---------|---------|---------|
| Settings Page | ❌ No | ✅ Yes |
| Settings Icon | ❌ No | ✅ Yes (⚙️) |
| Server URL | ❌ Hardcoded localhost | ✅ Configurable |
| Connection Test | ❌ No | ✅ Yes |
| Quick Presets | ❌ No | ✅ Yes |
| Works on Mobile | ❌ No | ✅ Yes |
| Change IP | ❌ Rebuild needed | ✅ Change in app |
| File Size | ~4 MB | 4.26 MB |

## How to Tell Which Version You Have

### Method 1: Check for Settings Icon
- Open the app
- Look at the top navbar
- **Old:** 🌐 Language | 🎬 Reels | 🛒 Cart
- **New:** 🌐 Language | ⚙️ Settings | 🎬 Reels | 🛒 Cart

### Method 2: Check File Size
- **Old:** Various sizes
- **New:** Exactly 4,264,166 bytes (4.26 MB)

### Method 3: Check Build Date
- **New APK:** Built today (November 26, 2025)
- **Old APK:** Built earlier

## Why You Need the New APK

The old APK you're using has these problems:

1. **Hardcoded to localhost:5000**
   - Localhost means "this device"
   - On your phone, localhost = your phone, not your computer
   - That's why you get "Connection Error"

2. **No way to change it**
   - The server URL is hardcoded in the app
   - You can't change it without rebuilding
   - Every time your IP changes, you need to rebuild

3. **No Settings page**
   - Can't configure anything
   - Can't test connection
   - Can't switch between environments

## What the New APK Fixes

1. **Default IP set to your computer**
   - Pre-configured with `10.254.223.222`
   - Should work immediately on your WiFi

2. **Settings page for configuration**
   - Change server URL anytime
   - Test connection before saving
   - Quick presets for common scenarios

3. **No rebuild needed**
   - IP changed? Just update in Settings
   - Testing different server? Switch in Settings
   - Production deployment? Update in Settings

## Installation Steps

### IMPORTANT: Uninstall Old APK First!

You MUST uninstall the old APK before installing the new one:

1. **Uninstall old APK:**
   - Settings → Apps → WaitNot → Uninstall

2. **Install new APK:**
   - Copy `client\android\app\build\outputs\apk\debug\app-debug.apk` to phone
   - Open and install

3. **Verify it's the new version:**
   - Look for Settings icon (⚙️) in navbar
   - If you see it, you have the new version!

4. **Configure server URL:**
   - Tap Settings icon (⚙️)
   - IP should already be `10.254.223.222`
   - Tap "Test Connection"
   - If successful, tap "Save Settings"

## Visual Comparison

### Old APK Home Screen:
```
┌─────────────────────────────────┐
│ waitnot  🌐 GB  🎬  🛒         │ ← No Settings icon
├─────────────────────────────────┤
│                                 │
│     Connection Error            │
│     Network Error               │
│     [Retry]                     │
│                                 │
└─────────────────────────────────┘
```

### New APK Home Screen:
```
┌─────────────────────────────────┐
│ waitnot  🌐 GB  ⚙️  🎬  🛒     │ ← Settings icon here!
├─────────────────────────────────┤
│                                 │
│  [Restaurant List]              │
│  • Spice Garden                 │
│  • Pizza Paradise               │
│  • Burger Hub                   │
│                                 │
└─────────────────────────────────┘
```

### New APK Settings Page:
```
┌─────────────────────────────────┐
│ ← ⚙️ Server Settings            │
├─────────────────────────────────┤
│ 📱 Mobile Device Setup          │
│ If you're using this app on...  │
├─────────────────────────────────┤
│ Quick Presets                   │
│ [Localhost] [Network IP]        │
├─────────────────────────────────┤
│ API URL                         │
│ http://10.254.223.222:5000/api  │
├─────────────────────────────────┤
│ Socket URL                      │
│ http://10.254.223.222:5000      │
├─────────────────────────────────┤
│ [🔌 Test Connection]            │
│ ✓ Connected! Found 3 restaurants│
├─────────────────────────────────┤
│ [💾 Save Settings] [🔄 Reset]   │
└─────────────────────────────────┘
```

## Summary

**You're currently using:** OLD APK (no Settings icon)
**You need to install:** NEW APK (with Settings icon ⚙️)

**Steps:**
1. Uninstall old APK
2. Install new APK (4.26 MB)
3. Look for Settings icon (⚙️)
4. Configure and test connection
5. Enjoy!

The new APK solves all your connection problems and makes it easy to configure the server URL without rebuilding! 🎉
