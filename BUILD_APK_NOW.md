# 🔨 Build APK with Latest Features

## 🚀 Quick Build

### Option 1: Use Quick Build Script (Recommended)
```bash
quick-build-apk.bat
```

### Option 2: Use Latest Build Script
```bash
build-latest-apk.bat
```

### Option 3: Use Existing Script
```bash
build-with-java17.bat
```

---

## 📦 What's Included in This Build

### ✅ Latest Features:
1. **Restaurant Data Isolation**
   - Each restaurant sees only their own data
   - SessionStorage protection
   - No cross-tab interference

2. **Voice Assistant Improvements**
   - A/B options for veg/non-veg
   - "Say A for vegetarian or B for non-vegetarian"
   - Better not-available handling
   - Auto-fill user details

3. **Reel Upload Fix**
   - Reels upload to correct restaurant
   - Uses sessionStorage for tab-specific ID
   - No more cross-restaurant reel display

4. **Bug Fixes**
   - Restaurant switching on refresh fixed
   - localStorage corruption detection
   - Automatic ID correction

---

## 🛠️ Build Steps

### Prerequisites Check:
```bash
# Check Java version (should be 17)
java -version

# Check Node.js
node -version

# Check npm
npm -version
```

### Manual Build Process:

#### Step 1: Build Web App
```bash
cd client
npm run build
```

#### Step 2: Sync to Capacitor
```bash
npx cap sync android
```

#### Step 3: Build Android APK
```bash
cd android
gradlew assembleDebug
```

#### Step 4: Find Your APK
```
Location: client\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📤 Upload to GitHub

### After Building:

```bash
# Add the APK
git add client/android/app/build/outputs/apk/debug/app-debug.apk

# Commit with version info
git commit -m "Update APK v1.1.0 - Restaurant isolation + Voice improvements"

# Push to GitHub
git push origin main
```

### Download Link Updates Automatically:
```
https://github.com/MuhammedAman113114/waitnot-restaurant-app/raw/main/client/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🧪 Test Before Uploading

### Test Checklist:
- [ ] Install APK on Android device
- [ ] Test voice assistant ("Hey Waiter")
- [ ] Test A/B options (A for veg, B for non-veg)
- [ ] Login to restaurant dashboard
- [ ] Refresh page - should stay on same restaurant
- [ ] Upload a reel - should appear in correct restaurant
- [ ] Test QR code scanning
- [ ] Test order placement

---

## 📊 Build Information

### Expected Output:
```
BUILD SUCCESSFUL in 2m 30s
APK Location: client\android\app\build\outputs\apk\debug\app-debug.apk
Size: ~4-5 MB
```

### If Build Fails:

#### Error: Java version wrong
```bash
# Use the Java 17 build script
build-with-java17.bat
```

#### Error: Gradle build failed
```bash
# Clean and rebuild
cd client/android
gradlew clean
gradlew assembleDebug
```

#### Error: npm build failed
```bash
# Clear cache and rebuild
cd client
npm cache clean --force
npm install
npm run build
```

---

## 🎯 Version Management

### Current Version: v1.1.0

### Changelog:
```
v1.1.0 (Latest)
- ✅ Restaurant data isolation
- ✅ SessionStorage protection
- ✅ Voice assistant A/B options
- ✅ Reel upload fix
- ✅ Auto-fill improvements

v1.0.0 (Previous)
- Initial release
- Basic voice ordering
- QR code scanning
- Restaurant dashboard
```

### Update Version Number:
Edit `client/android/app/build.gradle`:
```gradle
versionCode 2
versionName "1.1.0"
```

---

## 📱 Distribution

### After Building and Testing:

1. **Upload to GitHub** ✅
   ```bash
   git add client/android/app/build/outputs/apk/debug/app-debug.apk
   git commit -m "Release v1.1.0"
   git push origin main
   ```

2. **Create GitHub Release** (Optional)
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```
   Then create release on GitHub with APK attached

3. **Share Download Link**
   ```
   https://github.com/MuhammedAman113114/waitnot-restaurant-app/raw/main/client/android/app/build/outputs/apk/debug/app-debug.apk
   ```

---

## 🔄 Continuous Updates

### When You Make Changes:

1. **Make code changes**
2. **Test locally**
3. **Build new APK**: `quick-build-apk.bat`
4. **Test APK on device**
5. **Upload to GitHub**
6. **Users get latest version automatically**

---

## 📞 Support

### Build Issues?
- Check `BUILD_APK_NOW.md` (this file)
- Check `APK_BUILD_COMPLETE_GUIDE.md`
- Check `TROUBLESHOOT_CONNECTION.md`

### Questions?
- Open issue on GitHub
- Check documentation files
- Review error logs

---

## ✅ Ready to Build!

Run one of these commands:

```bash
# Quick build (recommended)
quick-build-apk.bat

# Full build with details
build-latest-apk.bat

# Existing build script
build-with-java17.bat
```

---

**Happy Building! 🔨📱**
