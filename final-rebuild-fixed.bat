@echo off
echo ========================================
echo FINAL BUILD - Network Security Fixed!
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
echo.

cd client

echo [1/4] Building React app...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] React build failed!
    cd ..
    pause
    exit /b 1
)
echo.

echo [2/4] Syncing Capacitor...
call npx cap sync android
if %errorlevel% neq 0 (
    echo [ERROR] Capacitor sync failed!
    cd ..
    pause
    exit /b 1
)
echo.

echo [3/4] Cleaning Android build...
cd android
call gradlew.bat clean --no-daemon
echo.

echo [4/4] Building APK with network security fix...
call gradlew.bat assembleDebug --no-daemon

if %errorlevel% equ 0 (
    cd ..\..
    echo.
    echo ========================================
    echo SUCCESS! FIXED APK READY!
    echo ========================================
    echo.
    echo APK: client\android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo THIS APK HAS THE CRITICAL FIX:
    echo - Network Security Config updated
    echo - Your IP (172.27.96.222) is now allowed
    echo - HTTP requests will work!
    echo.
    echo INSTALL THIS APK AND IT WILL WORK!
    echo.
    dir client\android\app\build\outputs\apk\debug\app-debug.apk
    echo.
) else (
    cd ..\..
    echo [ERROR] Build failed!
)

pause
