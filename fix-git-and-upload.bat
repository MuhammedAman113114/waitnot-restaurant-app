@echo off
echo ========================================
echo Fix Git and Upload to GitHub
echo ========================================
echo.

echo [1/6] Removing old Git repositories...
if exist .git (
    rmdir /s /q .git
    echo Removed .git from root
)
if exist server\.git (
    rmdir /s /q server\.git
    echo Removed .git from server
)
if exist client\.git (
    rmdir /s /q client\.git
    echo Removed .git from client
)
echo.

echo [2/6] Initializing new Git repository...
git init
echo.

echo [3/6] Adding all files...
git add .
echo.

echo [4/6] Creating commit...
git commit -m "Initial commit - WaitNot Restaurant App"
echo.

echo [5/6] Adding remote repository...
git remote add origin https://github.com/MuhammedAman113114/waitnot-restaurant-app.git
echo.

echo [6/6] Pushing to GitHub...
git branch -M main
git push -u origin main
echo.

echo ========================================
echo Done!
echo ========================================
echo.
echo If you see authentication error:
echo 1. Username: MuhammedAman113114
echo 2. Password: Use Personal Access Token from:
echo    https://github.com/settings/tokens
echo.
pause
