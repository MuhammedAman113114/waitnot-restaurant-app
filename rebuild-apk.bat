@echo off
echo ========================================
echo Rebuilding WaitNot APK
echo ========================================
echo.

cd client

echo [1/3] Building React app...
call npm run build
if errorlevel 1 (
    echo ERROR: React build failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Syncing with Capacitor...
call npx cap sync
if errorlevel 1 (
    echo ERROR: Capacitor sync failed!
    pause
    exit /b 1
)

echo.
echo [3/3] Building APK...
cd android
call gradlew.bat assembleDebug
if errorlevel 1 (
    echo ERROR: APK build failed!
    cd ..\..
    pause
    exit /b 1
)

cd ..\..

echo.
echo ========================================
echo SUCCESS! APK built successfully!
echo ========================================
echo.
echo APK Location:
echo client\android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo Next steps:
echo 1. Copy app-debug.apk to your phone
echo 2. Install it (uninstall old version first)
echo 3. Open the app
echo.
pause
