@echo off
echo ========================================
echo Testing WaitNot Connection
echo ========================================
echo.

echo [1/3] Checking if backend is running on port 5000...
netstat -ano | findstr :5000 > nul
if %errorlevel% equ 0 (
    echo ✓ Backend server is running
) else (
    echo ✗ Backend server is NOT running
    echo   Run: cd server ^&^& npm run dev
    goto :end
)

echo.
echo [2/3] Checking if frontend is running on port 3000...
netstat -ano | findstr :3000 > nul
if %errorlevel% equ 0 (
    echo ✓ Frontend server is running
) else (
    echo ✗ Frontend server is NOT running
    echo   Run: cd client ^&^& npm run dev
    goto :end
)

echo.
echo [3/3] Testing API endpoint...
curl -s http://localhost:5000/api/restaurants > nul
if %errorlevel% equ 0 (
    echo ✓ API is responding correctly
) else (
    echo ✗ API is not responding
    goto :end
)

echo.
echo ========================================
echo ✓ All systems operational!
echo ========================================
echo.
echo Open your browser and refresh: http://localhost:3000
echo.

:end
pause
