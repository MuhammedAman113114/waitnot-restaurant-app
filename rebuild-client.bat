@echo off
echo ========================================
echo Rebuilding Client with Latest Changes
echo ========================================

cd client
call npm run build

echo.
echo ========================================
echo Build Complete!
echo ========================================
echo.
echo The latest changes are now in client/dist
echo.
echo Next steps:
echo 1. Test locally: npm start
echo 2. Or deploy to production
echo.
pause
