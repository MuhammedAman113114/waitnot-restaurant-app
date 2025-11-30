@echo off
echo ========================================
echo Starting Local Development Environment
echo ========================================
echo.
echo This will start:
echo 1. Backend Server (http://localhost:5000)
echo 2. Frontend Dev Server (http://localhost:5173)
echo.
echo Press Ctrl+C to stop both servers
echo.
pause

echo Starting servers...
npm run dev
