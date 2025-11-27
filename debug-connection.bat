@echo off
echo ========================================
echo WaitNot Connection Debugger
echo ========================================
echo.

echo [1/6] Checking if server is running...
netstat -ano | findstr :5000
if errorlevel 1 (
    echo ❌ Server is NOT running on port 5000!
    echo.
    echo Please start the server:
    echo   cd server
    echo   node server.js
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Server is running on port 5000
)
echo.

echo [2/6] Checking your IP address...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    set IP=%%a
    goto :found_ip
)
:found_ip
echo Your IP: %IP%
echo.

echo [3/6] Testing if API is accessible locally...
curl -s http://localhost:5000/api/restaurants > nul
if errorlevel 1 (
    echo ❌ Cannot access API locally!
    echo Server might not be responding correctly.
    pause
    exit /b 1
) else (
    echo ✅ API is accessible locally
)
echo.

echo [4/6] Checking config.js...
findstr "172.27.96.100" client\src\config.js > nul
if errorlevel 1 (
    echo ⚠️  WARNING: IP 172.27.96.100 not found in config.js
    echo Your IP might have changed!
    echo.
    echo Current IP: %IP%
    echo Config file: client\src\config.js
    echo.
    echo Please update the config file with your current IP.
    pause
) else (
    echo ✅ Config file has correct IP
)
echo.

echo [5/6] Checking if APK was built recently...
if exist "client\android\app\build\outputs\apk\debug\app-debug.apk" (
    echo ✅ APK file exists
    dir "client\android\app\build\outputs\apk\debug\app-debug.apk" | findstr "app-debug.apk"
) else (
    echo ❌ APK file not found!
    echo You need to build the APK first.
    echo Run: fix-java-and-build.bat
    pause
    exit /b 1
)
echo.

echo [6/6] Checking if IP is in built files...
if exist "client\dist\assets" (
    findstr /s "172.27.96.100" client\dist\assets\*.js > nul
    if errorlevel 1 (
        echo ❌ IP not found in built files!
        echo The app was built with old configuration.
        echo You MUST rebuild the app.
        echo.
        pause
    ) else (
        echo ✅ IP found in built files
    )
) else (
    echo ⚠️  dist folder not found - app hasn't been built
)
echo.

echo ========================================
echo Summary
echo ========================================
echo.
echo Next steps:
echo 1. Make sure your phone is on the same WiFi
echo 2. Test in phone browser: http://172.27.96.100:5000/api/restaurants
echo 3. If browser works but app doesn't:
echo    - Completely uninstall old app from phone
echo    - Install fresh APK
echo    - Wait 10 seconds after opening
echo.
echo If still not working, try ngrok:
echo 1. Download from: https://ngrok.com/download
echo 2. Run: ngrok http 5000
echo 3. Update config.js with ngrok URL
echo 4. Rebuild app
echo.
echo For detailed guide, read: DETAILED-FIX-GUIDE.md
echo.
pause
