@echo off
echo ========================================
echo Fixing JAVA_HOME and Building APK
echo ========================================
echo.

echo Setting JAVA_HOME for this session...
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot
set PATH=%JAVA_HOME%\bin;%PATH%

echo JAVA_HOME: %JAVA_HOME%
echo.

echo Verifying Java installation...
java -version
echo.

echo ========================================
echo Building APK
echo ========================================
echo.

cd client

echo [1/3] Building React app...
call npm run build
if errorlevel 1 (
    echo ERROR: React build failed!
    cd ..
    pause
    exit /b 1
)

echo.
echo [2/3] Syncing with Capacitor...
call npx cap sync
if errorlevel 1 (
    echo ERROR: Capacitor sync failed!
    cd ..
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
echo 1. Uninstall old WaitNot app from your phone
echo 2. Copy app-debug.apk to your phone
echo 3. Install the new APK
echo 4. Open the app
echo.
pause
