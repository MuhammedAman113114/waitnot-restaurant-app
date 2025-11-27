@echo off
echo ========================================
echo Upload WaitNot to GitHub
echo ========================================
echo.

REM Check if Git is installed
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git first:
    echo https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo [OK] Git is installed
echo.

REM Check if already initialized
if exist .git (
    echo [INFO] Git repository already initialized
) else (
    echo Initializing Git repository...
    git init
    echo [OK] Git initialized
)

echo.
echo Adding files to Git...
git add .

echo.
echo Creating commit...
git commit -m "Initial commit - WaitNot Restaurant App"

echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Create a new repository on GitHub:
echo    https://github.com/new
echo.
echo 2. Name it: waitnot-restaurant-app
echo.
echo 3. DO NOT initialize with README
echo.
echo 4. After creating, run these commands:
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/waitnot-restaurant-app.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo Replace YOUR_USERNAME with your GitHub username!
echo.
echo ========================================
echo.

pause
