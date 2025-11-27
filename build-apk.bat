@echo off
echo ========================================
echo WaitNot APK Builder
echo ========================================
echo.

REM Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Java is not installed or not in PATH!
    echo Please install Java JDK 11 or higher first.
    echo Download from: https://adoptium.net/
    echo.
    pause
    exit /b 1
)

echo [OK] Java is installed
echo.

REM Navigate to client directory
cd "client"

echo Step 1: Building React app...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] React build failed!
    pause
    exit /b 1
)
echo [OK] React app built successfully
echo.

echo Step 2: Syncing Capacitor...
call npx cap sync
if %errorlevel% neq 0 (
    echo [ERROR] Capacitor sync failed!
    pause
    exit /b 1
)
echo [OK] Capacitor synced successfully
echo.

echo Step 3: Building Android APK...
cd android
call gradlew.bat assembleDebug
if %errorlevel% neq 0 (
    echo [ERROR] APK build failed!
    echo Make sure Android SDK is installed and ANDROID_HOME is set.
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
echo You can now install this APK on your Android device!
echo.
pause
