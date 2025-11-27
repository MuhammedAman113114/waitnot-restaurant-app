@echo off
echo ========================================
echo Change App Logo
echo ========================================
echo.

echo Checking if logo file exists...
if not exist "Images\logo.jpg" (
    echo [ERROR] Logo file not found at: Images\logo.jpg
    pause
    exit /b 1
)

echo [OK] Logo file found
echo.

echo You need to:
echo 1. Convert logo.jpg to PNG format
echo 2. Create different sizes for Android
echo.
echo I'll open Android Studio's Image Asset tool for you.
echo.
echo Manual Steps:
echo 1. Open Android Studio
echo 2. Right-click on: client/android/app/src/main/res
echo 3. Select: New ^> Image Asset
echo 4. Choose: Launcher Icons (Adaptive and Legacy)
echo 5. Path: Browse to Images\logo.jpg
echo 6. Click Next ^> Finish
echo.
echo OR use an online tool:
echo https://icon.kitchen/
echo.
echo After generating icons:
echo 1. Replace files in: client/android/app/src/main/res/mipmap-*
echo 2. Rebuild APK: build-production-apk.bat
echo.

pause

echo.
echo Opening Android Studio documentation...
start https://developer.android.com/studio/write/create-app-icons
echo.

pause
