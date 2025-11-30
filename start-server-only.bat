@echo off
echo ========================================
echo Starting Backend Server
echo ========================================
echo.
echo Server will run at: http://localhost:5000
echo.
echo Keep this window open while developing
echo Press Ctrl+C to stop the server
echo.

cd server
call npm run dev
