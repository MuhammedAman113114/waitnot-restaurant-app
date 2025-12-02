@echo off
echo ========================================
echo Building Latest Waitnot APK
echo ========================================
echo.
echo This will build an APK with:
echo - Restaurant data isolation fixes
echo - Voice assistant improvements
echo - SessionStorage protection
echo - All latest features
echo.
pause

echo.
echo ========================================
echo Step 1: Building Web App
echo ========================================
cd client
call npm run build
if errorlevel 1 (
    echo ERROR: Web build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Step 2: Syncing to Capacitor
echo ========================================
call npx cap sync android
if errorlevel 1 (
    echo ERROR: Capacitor sync failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Step 3: Building Android APK
echo ========================================
cd android
call gradlew assembleDebug
if errorlevel 1 (
    echo ERROR: Android build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build Complete!
echo ========================================
echo.
echo APK Location:
echo client\android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo File size:
cd app\build\outputs\apk\debug
dir app-debug.apk
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Test the APK on your device
echo 2. Commit to GitHub:
echo    git add client/android/app/build/outputs/apk/debug/app-debug.apk
echo    git commit -m "Update APK with latest features"
echo    git push origin main
echo.
echo 3. Download link will be updated automatically!
echo.
pause
