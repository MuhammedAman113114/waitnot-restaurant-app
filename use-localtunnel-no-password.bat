@echo off
echo ========================================
echo WaitNot - Setup Public URL (No Password)
echo ========================================
echo.

echo Checking if localtunnel is installed...
where lt >nul 2>&1
if %errorlevel% neq 0 (
    echo localtunnel not found. Installing...
    npm install -g localtunnel
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install localtunnel
        pause
        exit /b 1
    )
    echo [OK] localtunnel installed!
)

echo.
echo ========================================
echo Starting Public Tunnel (No Password)
echo ========================================
echo.
echo Make sure your backend is running in another terminal:
echo   cd server
echo   npm run dev
echo.
echo Starting tunnel on port 5000...
echo.
echo You will get a URL like: https://random-name.loca.lt
echo.
echo COPY THAT URL and use it in your app Settings:
echo   API URL: https://your-url.loca.lt/api
echo   Socket URL: https://your-url.loca.lt
echo.
echo Press Ctrl+C to stop the tunnel
echo.
echo ========================================
echo.

REM Note: localtunnel always shows password page on first visit
REM Just check the terminal for the password and enter it once
lt --port 5000 --print-requests

pause
