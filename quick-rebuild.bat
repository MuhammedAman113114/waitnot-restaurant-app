@echo off
setlocal

REM Set Java 17
for /d %%i in ("C:\Program Files\Eclipse Adoptium\jdk-17*") do set JAVA_HOME=%%i
set PATH=%JAVA_HOME%\bin;%PATH%

REM Set Android SDK
set ANDROID_HOME=C:\Users\kaif6\AppData\Local\Android\Sdk
set PATH=%ANDROID_HOME%\platform-tools;%PATH%

echo Building APK (no clean)...
echo.

cd client\android
call gradlew.bat assembleDebug --no-daemon

if %errorlevel% equ 0 (
    echo.
    echo SUCCESS! APK at:
    echo %cd%\app\build\outputs\apk\debug\app-debug.apk
    echo.
    dir app\build\outputs\apk\debug\app-debug.apk
) else (
    echo.
    echo BUILD FAILED!
)

pause
