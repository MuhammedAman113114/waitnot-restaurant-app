@echo off
echo ========================================
echo Adding Firewall Rule for Port 5000
echo ========================================
echo.
echo This will allow your phone to connect to the backend server
echo.
echo IMPORTANT: This must be run as Administrator!
echo.
pause

REM Check if running as administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Not running as Administrator!
    echo.
    echo Please:
    echo 1. Right-click this file
    echo 2. Select "Run as Administrator"
    echo.
    pause
    exit /b 1
)

echo.
echo Adding firewall rule for port 5000...
netsh advfirewall firewall add rule name="WaitNot Backend Server" dir=in action=allow protocol=TCP localport=5000

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Firewall rule added!
    echo.
    echo Port 5000 is now accessible from your phone.
    echo.
    echo Next steps:
    echo 1. Make sure backend is running: cd server ^&^& npm run dev
    echo 2. Test from phone browser: http://172.27.96.222:5000/api/restaurants
    echo 3. If browser works, try the app again
    echo.
) else (
    echo.
    echo [ERROR] Failed to add firewall rule!
    echo.
    echo Try running this command manually in Administrator Command Prompt:
    echo netsh advfirewall firewall add rule name="WaitNot Backend Server" dir=in action=allow protocol=TCP localport=5000
    echo.
)

pause
