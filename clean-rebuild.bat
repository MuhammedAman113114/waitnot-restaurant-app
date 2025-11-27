@echo off
echo ========================================
echo Clean Rebuild with New IP
echo ========================================
echo.

REM Find Java 17
set "JAVA17_PATH="
for /d %%i in ("C:\Program Files\Eclipse Adoptium\jdk-17*") do set "JAVA17_PATH=%%i"

if not defined JAVA17_PATH (
    echo [ERROR] Java 17 not found!
    pause
    exit /b 1
)

set JAVA_HOME=%JAVA17_PATH%
set PATH=%JAVA_HOME%\bin;%PATH%

REM Set Android SDK
set ANDROID_HOME=C:\Users\ASUS\AppData\Local\Android\Sdk
set PATH=%ANDROID_HOME%\platform-tools;%PATH%

echo Using Java: %JAVA_HOME%
echo Using Android SDK: %ANDROID_HOME%
echo.

cd client

echo [1/4] Cleaning old build...
call npm run build
echo.

echo [2/4] Syncing Capacitor...
call npx cap sync android
echo.

echo [3/4] Cleaning Android build...
cd android
call gradlew.bat clean --no-daemon
echo.

echo [4/4] Building new APK...
call gradlew.bat assembleDebug --no-daemon

if %errorlevel% equ 0 (
    cd ..\..
    echo.
    echo ========================================
    echo SUCCESS! New APK Built!
    echo ========================================
    echo.
    echo APK: client\android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo This APK has:
    echo - New IP: 172.27.96.222
    echo - Fixed Settings page
    echo - Auto-reload after save
    echo.
    echo INSTALL THIS NEW APK!
    echo.
    dir client\android\app\build\outputs\apk\debug\app-debug.apk
    echo.
) else (
    cd ..\..
    echo [ERROR] Build failed!
)

pause
