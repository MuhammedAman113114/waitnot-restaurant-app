@echo off
echo ========================================
echo Generate Sample Reviews for All Menu Items
echo ========================================
echo.

cd server

echo Running review generation script...
echo.

call npm run generate-reviews

echo.
echo ========================================
echo.

if %errorlevel% equ 0 (
    echo SUCCESS! Sample reviews have been generated.
    echo.
    echo You can now:
    echo 1. Start the server: npm run dev
    echo 2. Open the app and view reviews on menu items
    echo.
) else (
    echo ERROR! Failed to generate reviews.
    echo.
)

cd ..

pause
