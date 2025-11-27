@echo off
echo Building APK with correct Java path...

set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"

cd "client\android"
call gradlew assembleDebug

if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo.
    echo ========================================
    echo SUCCESS! APK built successfully!
    echo ========================================
    echo.
    echo APK Location:
    echo %CD%\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo Next steps:
    echo 1. Copy APK to your phone
    echo 2. Install it
    echo 3. Make sure backend is running on port 5000
    echo 4. Test the app!
    echo.
) else (
    echo.
    echo BUILD FAILED!
    echo.
)

pause
