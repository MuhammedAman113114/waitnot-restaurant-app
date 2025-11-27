@echo off
echo ========================================
echo WaitNot Quick Build (with correct paths)
echo ========================================
echo.

REM Set correct Java path for this session
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%

REM Set Android SDK path (update if different)
set ANDROID_HOME=C:\Users\kaif6\AppData\Local\Android\Sdk
set PATH=%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\cmdline-tools\latest\bin;%PATH%

echo [INFO] Using JAVA_HOME: %JAVA_HOME%
echo [INFO] Using ANDROID_HOME: %ANDROID_HOME%
echo.

REM Check Java
echo Checking Java...
java -version
if %errorlevel% neq 0 (
    echo [ERROR] Java not found!
    pause
    exit /b 1
)
echo.

REM Check Android SDK
echo Checking Android SDK...
if exist "%ANDROID_HOME%\platform-tools\adb.exe" (
    echo [OK] Android SDK found
) else (
    echo [ERROR] Android SDK not found at: %ANDROID_HOME%
    echo Please install Android Studio first!
    pause
    exit /b 1
)
echo.

echo ========================================
echo Building APK...
echo ========================================
echo.

cd client

echo Step 1: Building React app...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] React build failed!
    pause
    exit /b 1
)
echo [OK] React app built
echo.

echo Step 2: Syncing Capacitor...
call npx cap sync
if %errorlevel% neq 0 (
    echo [ERROR] Capacitor sync failed!
    pause
    exit /b 1
)
echo [OK] Capacitor synced
echo.

echo Step 3: Building Android APK...
cd android
call gradlew.bat assembleDebug
if %errorlevel% neq 0 (
    echo [ERROR] APK build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! APK Built Successfully!
echo ========================================
echo.
echo APK Location:
echo %cd%\app\build\outputs\apk\debug\app-debug.apk
echo.
echo Next steps:
echo 1. Copy APK to your phone
echo 2. Make sure phone is on same WiFi (172.27.96.100)
echo 3. Start backend: cd server ^&^& npm run dev
echo 4. Install and test APK on phone
echo.
pause
