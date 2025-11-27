@echo off
echo ========================================
echo WaitNot Final APK Build
echo ========================================
echo.

REM Find Java 17 installation
set JAVA17_PATH=
for /d %%i in ("C:\Program Files\Eclipse Adoptium\jdk-17*") do set JAVA17_PATH=%%i

if "%JAVA17_PATH%"=="" (
    echo [ERROR] Java 17 not found!
    echo.
    echo Checking for Java 25...
    set JAVA25_PATH=
    for /d %%i in ("C:\Program Files\Eclipse Adoptium\jdk-25*") do set JAVA25_PATH=%%i
    
    if not "%JAVA25_PATH%"=="" (
        echo [WARN] Found Java 25, but we need Java 17
        echo Java 25 path: %JAVA25_PATH%
        echo.
        echo Please install Java 17 from:
        echo https://adoptium.net/temurin/releases/?version=17
        echo.
        echo Or run: choco install temurin17 -y
        echo.
        pause
        exit /b 1
    ) else (
        echo [ERROR] No Java installation found!
        pause
        exit /b 1
    )
)

echo [OK] Found Java 17 at: %JAVA17_PATH%
set JAVA_HOME=%JAVA17_PATH%
set PATH=%JAVA_HOME%\bin;%PATH%

REM Set Android SDK path
set ANDROID_HOME=C:\Users\kaif6\AppData\Local\Android\Sdk
set PATH=%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\cmdline-tools\latest\bin;%PATH%

echo [INFO] JAVA_HOME: %JAVA_HOME%
echo [INFO] ANDROID_HOME: %ANDROID_HOME%
echo.

REM Verify Java version
echo Verifying Java 17...
java -version 2>&1 | findstr /C:"17"
if %errorlevel% neq 0 (
    echo [WARN] Java version might not be 17
    java -version
)
echo.

REM Check Android SDK
if not exist "%ANDROID_HOME%\platform-tools\adb.exe" (
    echo [ERROR] Android SDK not found at: %ANDROID_HOME%
    echo.
    echo Please install Android Studio from:
    echo https://developer.android.com/studio
    echo.
    pause
    exit /b 1
)
echo [OK] Android SDK found
echo.

echo ========================================
echo Step 1: Cleaning previous build...
echo ========================================
cd client\android
call gradlew.bat clean
if %errorlevel% neq 0 (
    echo [WARN] Clean failed, continuing anyway...
)
cd ..\..
echo.

echo ========================================
echo Step 2: Building React app...
echo ========================================
cd client
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] React build failed!
    pause
    exit /b 1
)
echo [OK] React app built successfully
echo.

echo ========================================
echo Step 3: Syncing Capacitor...
echo ========================================
call npx cap sync
if %errorlevel% neq 0 (
    echo [ERROR] Capacitor sync failed!
    pause
    exit /b 1
)
echo [OK] Capacitor synced successfully
echo.

echo ========================================
echo Step 4: Building Android APK...
echo ========================================
echo This may take 5-10 minutes on first build...
echo.
cd android
call gradlew.bat assembleDebug --warning-mode all
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] APK build failed!
    echo.
    echo Common issues:
    echo 1. Java version mismatch - Make sure Java 17 is installed
    echo 2. Android SDK missing - Install Android Studio
    echo 3. Gradle cache issues - Try: gradlew.bat clean
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ SUCCESS! APK Built Successfully!
echo ========================================
echo.
echo APK Location:
echo %cd%\app\build\outputs\apk\debug\app-debug.apk
echo.

REM Show file size
if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo File details:
    dir app\build\outputs\apk\debug\app-debug.apk | find "app-debug.apk"
    echo.
    echo ========================================
    echo Next Steps:
    echo ========================================
    echo.
    echo 1. Copy APK to your phone:
    echo    Location: %cd%\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo 2. Start backend server:
    echo    cd server
    echo    npm run dev
    echo.
    echo 3. Make sure your phone is on the same WiFi
    echo    Your computer IP: 172.27.96.100
    echo.
    echo 4. Install APK on your phone:
    echo    - Enable "Unknown Sources" in phone settings
    echo    - Open the APK file
    echo    - Tap Install
    echo.
    echo 5. Test the app!
    echo.
) else (
    echo [ERROR] APK file not found!
    echo Expected at: app\build\outputs\apk\debug\app-debug.apk
    echo.
)

pause
