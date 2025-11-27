@echo off
echo ========================================
echo WaitNot - Allow Firewall Access
echo ========================================
echo.
echo This will allow Node.js to accept connections on port 5000
echo so your phone can connect to the backend server.
echo.
echo You need to run this as Administrator!
echo.
pause

REM Check if running as administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Not running as Administrator!
    echo.
    echo Please right-click this file and select "Run as Administrator"
    echo.
    pause
    exit /b 1
)

echo Adding firewall rule for Node.js...
netsh advfirewall firewall add rule name="WaitNot Backend Server" dir=in action=allow protocol=TCP localport=5000
if %errorlevel% equ 0 (
    echo [OK] Firewall rule added successfully!
) else (
    echo [WARN] Rule might already exist or failed to add
)

echo.
echo Adding firewall rule for Node.js executable...
netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\Program Files\nodejs\node.exe" enable=yes
if %errorlevel% equ 0 (
    echo [OK] Node.js allowed through firewall!
) else (
    echo [WARN] Rule might already exist or failed to add
)

echo.
echo ========================================
echo Done! Your phone should now be able to connect.
echo ========================================
echo.
echo Next steps:
echo 1. Start your backend: cd server ^&^& npm run dev
echo 2. Test from phone browser: http://172.27.96.100:5000/api/restaurants
echo 3. If it works, install and test your APK!
echo.
pause
