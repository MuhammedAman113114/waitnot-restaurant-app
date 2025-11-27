# 📱 WaitNot APK Build Instructions

## ✅ What We've Done So Far

1. ✅ Installed Capacitor dependencies
2. ✅ Built the React app (dist folder created)
3. ✅ Added Android platform
4. ✅ Synced Capacitor with Android project

## 🚨 What You Need to Install

### 1. Install Java JDK (Required)

**Option A: Using Chocolatey (Recommended)**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy Bypass -Scope Process -Force
choco install openjdk11 -y
```

**Option B: Manual Download**
1. Download JDK 11 or higher: https://adoptium.net/
2. Install it
3. Set JAVA_HOME environment variable:
   - Search "Environment Variables" in Windows
   - Click "Environment Variables"
   - Under "System Variables", click "New"
   - Variable name: `JAVA_HOME`
   - Variable value: `C:\Program Files\Eclipse Adoptium\jdk-11.0.XX-hotspot` (your JDK path)
   - Add to PATH: `%JAVA_HOME%\bin`

### 2. Install Android Studio (Required for SDK)

1. Download: https://developer.android.com/studio
2. Install Android Studio
3. Open Android Studio
4. Go to: Tools → SDK Manager
5. Install:
   - ✅ Android SDK Platform 33 (Android 13)
   - ✅ Android SDK Build-Tools 33.0.0
   - ✅ Android SDK Command-line Tools

### 3. Set Android SDK Environment Variables

Add these to your System Environment Variables:
- `ANDROID_HOME`: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
- Add to PATH: 
  - `%ANDROID_HOME%\platform-tools`
  - `%ANDROID_HOME%\tools`
  - `%ANDROID_HOME%\tools\bin`

## 🔧 After Installing Requirements

### Verify Installation

Open a NEW PowerShell/CMD window and run:
```bash
java -version
# Should show: openjdk version "11.x.x" or higher

echo %JAVA_HOME%
# Should show: C:\Program Files\Eclipse Adoptium\jdk-11.x.x-hotspot

echo %ANDROID_HOME%
# Should show: C:\Users\YourUsername\AppData\Local\Android\Sdk
```

## 🏗️ Build the APK

### Method 1: Using Gradle (Command Line)

```bash
cd "WAITNOT - APK/client/android"
gradlew.bat assembleDebug
```

The APK will be at:
```
WAITNOT - APK/client/android/app/build/outputs/apk/debug/app-debug.apk
```

### Method 2: Using Android Studio (Easier)

1. Open Android Studio
2. Click "Open an Existing Project"
3. Navigate to: `WAITNOT - APK/client/android`
4. Wait for Gradle sync to complete
5. Click: Build → Build Bundle(s) / APK(s) → Build APK(s)
6. Wait for build to complete
7. Click "locate" in the notification to find your APK

## 📱 Install APK on Your Phone

### Option 1: Direct USB Install
```bash
# Enable USB Debugging on your phone first
adb install "WAITNOT - APK/client/android/app/build/outputs/apk/debug/app-debug.apk"
```

### Option 2: Manual Install
1. Copy `app-debug.apk` to your phone
2. Open the file on your phone
3. Allow "Install from Unknown Sources" if prompted
4. Install the app

## ⚠️ Important Notes

### Backend Server
The app currently points to `http://localhost:5000` which won't work on a real phone!

You need to:
1. Deploy your backend to a cloud service (Heroku, Railway, Render)
2. Update the API URL in the app

**Update API URL:**
Create `WAITNOT - APK/client/src/config.js`:
```javascript
export const API_URL = 'https://your-backend-url.com/api';
```

Then update all axios calls to use this URL.

### Rebuild After Changes
Whenever you make changes:
```bash
cd "WAITNOT - APK/client"
npm run build
npx cap sync
cd android
gradlew.bat assembleDebug
```

## 🎨 Customize Your App

### Change App Name
Edit: `WAITNOT - APK/client/android/app/src/main/res/values/strings.xml`
```xml
<string name="app_name">WaitNot</string>
```

### Change App Icon
1. Open Android Studio
2. Right-click `res` folder
3. New → Image Asset
4. Upload your icon (512x512 PNG)
5. Generate all sizes

### Change Package Name
Edit: `WAITNOT - APK/client/capacitor.config.json`
```json
{
  "appId": "com.yourcompany.waitnot"
}
```

## 🔐 Build Release APK (For Publishing)

### 1. Generate Keystore
```bash
keytool -genkey -v -keystore waitnot-release.keystore -alias waitnot-key -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Configure Signing
Edit: `WAITNOT - APK/client/android/app/build.gradle`

Add before `android {`:
```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Inside `android {`, add:
```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

### 3. Create keystore.properties
Create: `WAITNOT - APK/client/android/keystore.properties`
```properties
storePassword=your_password
keyPassword=your_password
keyAlias=waitnot-key
storeFile=../waitnot-release.keystore
```

### 4. Build Release APK
```bash
cd "WAITNOT - APK/client/android"
gradlew.bat assembleRelease
```

Release APK: `app/build/outputs/apk/release/app-release.apk`

## 🚀 Quick Start (After Installing Java & Android SDK)

```bash
# 1. Build React app
cd "WAITNOT - APK/client"
npm run build

# 2. Sync with Android
npx cap sync

# 3. Build APK
cd android
gradlew.bat assembleDebug

# 4. Find your APK
# Location: android/app/build/outputs/apk/debug/app-debug.apk
```

## 📞 Troubleshooting

### "JAVA_HOME is not set"
- Install JDK and set JAVA_HOME environment variable
- Restart your terminal/IDE after setting

### "Android SDK not found"
- Install Android Studio
- Set ANDROID_HOME environment variable
- Restart your terminal/IDE

### "Gradle build failed"
```bash
cd android
gradlew.bat clean
gradlew.bat assembleDebug
```

### "White screen on app launch"
- Check if backend URL is accessible from phone
- Check browser console in Android Studio logcat

## ✅ Final Checklist

- [ ] Java JDK 11+ installed
- [ ] JAVA_HOME environment variable set
- [ ] Android Studio installed
- [ ] Android SDK installed (Platform 33, Build-Tools 33)
- [ ] ANDROID_HOME environment variable set
- [ ] Backend deployed to cloud (not localhost)
- [ ] API URL updated in app
- [ ] React app built (`npm run build`)
- [ ] Capacitor synced (`npx cap sync`)
- [ ] APK built successfully
- [ ] APK tested on real device

Good luck! 🎉
