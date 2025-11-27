@echo off
echo ========================================
echo WaitNot APK Build - Requirements Check
echo ========================================
echo.

set "allGood=1"

REM Check Java
echo Checking Java JDK...
java -version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Java is installed
    java -version 2>&1 | findstr /C:"version"
) else (
    echo [FAIL] Java is NOT installed
    echo        Download from: https://adoptium.net/
    set "allGood=0"
)
echo.

REM Check JAVA_HOME
echo Checking JAVA_HOME...
if defined JAVA_HOME (
    echo [OK] JAVA_HOME is set
    echo     %JAVA_HOME%
) else (
    echo [FAIL] JAVA_HOME is NOT set
    echo        Set it in Environment Variables
    set "allGood=0"
)
echo.

REM Check Android SDK
echo Checking Android SDK...
if defined ANDROID_HOME (
    echo [OK] ANDROID_HOME is set
    echo     %ANDROID_HOME%
    
    if exist "%ANDROID_HOME%\platform-tools\adb.exe" (
        echo [OK] Android SDK Platform Tools found
    ) else (
        echo [WARN] Android SDK Platform Tools not found
        echo        Install via Android Studio SDK Manager
    )
) else (
    echo [FAIL] ANDROID_HOME is NOT set
    echo        Install Android Studio and set ANDROID_HOME
    set "allGood=0"
)
echo.

REM Check Node.js
echo Checking Node.js...
node -v >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Node.js is installed
    node -v
) else (
    echo [FAIL] Node.js is NOT installed
    echo        Download from: https://nodejs.org/
    set "allGood=0"
)
echo.

REM Check if project is set up
echo Checking project setup...
if exist "client\node_modules" (
    echo [OK] Client dependencies installed
) else (
    echo [WARN] Client dependencies not installed
    echo        Run: cd client && npm install
)

if exist "client\android" (
    echo [OK] Android platform added
) else (
    echo [WARN] Android platform not added
    echo        Run: cd client && npx cap add android
)

if exist "client\dist" (
    echo [OK] React app built
) else (
    echo [WARN] React app not built yet
    echo        Run: cd client && npm run build
)
echo.

echo ========================================
if "%allGood%"=="1" (
    echo RESULT: All requirements met! ✓
    echo You can now build your APK!
    echo.
    echo Run: build-apk.bat
) else (
    echo RESULT: Some requirements missing ✗
    echo Please install missing components first.
    echo.
    echo See NEXT_STEPS.md for detailed instructions.
)
echo ========================================
echo.
pause
