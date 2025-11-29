@echo off
echo ========================================
echo DEPLOYING VOICE API FIX TO PRODUCTION
echo ========================================
echo.

echo Step 1: Adding changes to git...
git add server/routes/voice.js
echo.

echo Step 2: Committing fix...
git commit -m "Fix: Remove top-level await from voice.js for production compatibility"
echo.

echo Step 3: Pushing to GitHub...
git push origin main
echo.

echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo The fix has been pushed to GitHub.
echo Render will automatically redeploy in 1-2 minutes.
echo.
echo WHAT WAS FIXED:
echo - Removed top-level await that caused 500 errors
echo - Added async IIFE for OpenRouter loading
echo - Added openrouterLoaded flag for safety
echo - Improved error handling and logging
echo.
echo TEST THE FIX:
echo 1. Wait 2 minutes for Render to redeploy
echo 2. Try voice command: "Hey Aman, get me one pizza"
echo 3. Should work with or without AI
echo.
pause
