@echo off
echo ========================================
echo Quick APK Build with Latest Changes
echo ========================================
echo.
echo Building APK with:
echo - Restaurant data isolation
echo - Voice assistant A/B options
echo - SessionStorage fixes
echo - Reel upload fixes
echo.

REM Use the existing build script
call build-with-java17.bat

echo.
echo ========================================
echo Build Complete!
echo ========================================
echo.
echo To upload to GitHub:
echo 1. git add client/android/app/build/outputs/apk/debug/app-debug.apk
echo 2. git commit -m "Update APK with latest features"
echo 3. git push origin main
echo.
echo Download link: 
echo https://github.com/MuhammedAman113114/waitnot-restaurant-app/raw/main/client/android/app/build/outputs/apk/debug/app-debug.apk
echo.
pause
