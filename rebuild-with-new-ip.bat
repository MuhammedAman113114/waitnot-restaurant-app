@echo off
echo ========================================
echo Rebuilding APK with Network IP
echo ========================================
echo.
echo Current IP: 10.254.223.222
echo Backend URL: http://10.254.223.222:5000
echo.

REM Set Java path
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%

REM Set Android SDK path
set ANDROID_HOME=C:\Users\kaif6\AppData\Local\Android\Sdk
set PATH=%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\cmdline-tools\latest\bin;%PATH%

echo [1/3] Building React app...
cd client
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] React build failed!
    cd ..
    pause
    exit /b 1
)
echo [OK] React app built
echo.

echo [2/3] Syncing Capacitor...
call npx cap sync android
if %errorlevel% neq 0 (
    echo [ERROR] Capacitor sync failed!
    cd ..
    pause
    exit /b 1
)
echo [OK] Capacitor synced
echo.

echo [3/3] Building Android APK...
cd android
call gradlew.bat assembleDebug --no-daemon
if %errorlevel% neq 0 (
    echo [ERROR] APK build failed!
    cd ..\..
    pause
    exit /b 1
)

cd ..\..

echo.
echo ========================================
echo SUCCESS! APK Built Successfully!
echo ========================================
echo.
echo APK Location:
echo client\android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo IMPORTANT:
echo 1. Make sure backend is running: cd server ^&^& npm run dev
echo 2. Make sure phone is on same WiFi network
echo 3. Test backend from phone browser first:
echo    http://10.254.223.222:5000/api/restaurants
echo 4. If that works, install the APK!
echo.
echo If connection fails, run: allow-firewall.bat (as Administrator)
echo.
pause
