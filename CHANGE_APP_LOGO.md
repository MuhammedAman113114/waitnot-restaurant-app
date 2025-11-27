# 🎨 Change App Logo - Complete Guide

## Quick Method: Use Icon Kitchen (5 Minutes)

### Step 1: Convert Logo to PNG (if needed)
Your logo is at: `Images\logo.jpg`

If it's JPG, convert to PNG:
1. Open in Paint/Photoshop
2. Save As → PNG format
3. Or use online: https://jpg2png.com

### Step 2: Generate App Icons
1. Go to: https://icon.kitchen/
2. Upload your logo (Images\logo.jpg)
3. Adjust padding/background if needed
4. Click "Download"
5. Extract the ZIP file

### Step 3: Replace Icons
Copy the generated icons to your project:

**From the downloaded ZIP, copy:**
- `android/res/mipmap-*` folders

**To your project:**
- `client/android/app/src/main/res/`

Replace all `mipmap-*` folders.

### Step 4: Rebuild APK
```bash
build-production-apk.bat
```

---

## Alternative: Manual Method Using Android Studio

### Step 1: Open Android Studio
1. Open Android Studio
2. Open your project: `client/android`

### Step 2: Use Image Asset Studio
1. Right-click: `app/src/main/res`
2. Select: `New` → `Image Asset`
3. Icon Type: `Launcher Icons (Adaptive and Legacy)`
4. Path: Browse to `Images\logo.jpg`
5. Adjust padding/background
6. Click `Next` → `Finish`

### Step 3: Rebuild
```bash
build-production-apk.bat
```

---

## Quick PowerShell Script

I'll create a script to help you:

```powershell
# Copy logo to Android resources
Copy-Item "Images\logo.jpg" "client\android\app\src\main\res\drawable\logo.jpg"
```

But you still need to generate different sizes (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi).

---

## Icon Sizes Needed

Android requires multiple sizes:

- **mdpi:** 48x48px
- **hdpi:** 72x72px
- **xhdpi:** 96x96px
- **xxhdpi:** 144x144px
- **xxxhdpi:** 192x192px

---

## Easiest Solution: Use Icon Kitchen

1. **Go to:** https://icon.kitchen/
2. **Upload:** `Images\logo.jpg`
3. **Download:** Android icons
4. **Extract** and copy to: `client\android\app\src\main\res\`
5. **Rebuild:** `build-production-apk.bat`

**This is the fastest and easiest method!**

---

## After Changing Logo

1. Rebuild APK
2. Uninstall old app from phone
3. Install new APK
4. You'll see your new logo!

---

## Files to Replace

```
client/android/app/src/main/res/
├── mipmap-hdpi/
│   ├── ic_launcher.png
│   └── ic_launcher_round.png
├── mipmap-mdpi/
│   ├── ic_launcher.png
│   └── ic_launcher_round.png
├── mipmap-xhdpi/
│   ├── ic_launcher.png
│   └── ic_launcher_round.png
├── mipmap-xxhdpi/
│   ├── ic_launcher.png
│   └── ic_launcher_round.png
└── mipmap-xxxhdpi/
    ├── ic_launcher.png
    └── ic_launcher_round.png
```

---

## Summary

**Easiest:** Use https://icon.kitchen/
**Time:** 5 minutes
**Result:** Professional app icon in all sizes

1. Upload logo to Icon Kitchen
2. Download Android icons
3. Copy to `client/android/app/src/main/res/`
4. Rebuild APK
5. Done!

🎨 Your app will have a custom logo!
