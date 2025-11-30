@echo off
echo ========================================
echo Starting Frontend Dev Server
echo ========================================
echo.
echo Client will run at: http://localhost:5173
echo.
echo Keep this window open while developing
echo Press Ctrl+C to stop the server
echo.

cd client
call npm run dev
