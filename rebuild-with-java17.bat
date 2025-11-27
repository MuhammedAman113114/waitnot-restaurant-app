@echo off
echo ========================================
echo Rebuilding APK with Java 17
echo ========================================
echo.

REM Find Java 17
set "JAVA17_PATH="
for /d %%i in ("C:\Program Files\Eclipse Adoptium\jdk-17*") do set "JAVA17_PATH=%%i"

if not defined JAVA17_PATH (
    echo [ERROR] Java 17 not found!
    echo.
    echo Please run: install-correct-java.bat
    echo.
    pause
    exit /b 1
)

echo Using Java 17: %JAVA17_PATH%
set JAVA_HOME=%JAVA17_PATH%
set PATH=%JAVA_HOME%\bin;%PATH%

REM Verify Java version
echo.
echo Verifying Java version...
java -version
if %errorlevel% neq 0 (
    echo [ERROR] Java not working!
    pause
    exit /b 1
)

REM Set Android SDK
set ANDROID_HOME=C:\Users\ASUS\AppData\Local\Android\Sdk
set PATH=%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\cmdline-tools\latest\bin;%PATH%

echo.
echo ========================================
echo Building APK...
echo ========================================
echo.

cd client

echo [1/3] Building React app...
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
call gradlew.bat clean assembleDebug --no-daemon
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
echo File size:
dir client\android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo NEXT STEPS:
echo 1. Copy APK to your phone
echo 2. Install the APK
echo 3. Make sure backend is running: cd server ^&^& npm run dev
echo 4. Make sure phone is on same WiFi
echo 5. Open app and go to Settings (⚙️ icon)
echo 6. Enter your computer's IP: 10.254.223.222
echo 7. Test connection and save
echo.
pause
