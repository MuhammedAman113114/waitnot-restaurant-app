@echo off
echo ========================================
echo Install Java 17 (Compatible with Gradle)
echo ========================================
echo.
echo Java 25 is too new for Gradle 8.11.1
echo We need to install Java 17 LTS instead
echo.
echo This will install Java 17 using Chocolatey
echo.
pause

echo.
echo Installing Java 17...
choco install temurin17 -y

if %errorlevel% equ 0 (
    echo.
    echo [OK] Java 17 installed successfully!
    echo.
    echo Now you need to:
    echo 1. Set JAVA_HOME to the new Java 17 path
    echo 2. Restart your terminal
    echo 3. Run quick-build.bat again
    echo.
    echo Java 17 is usually installed at:
    echo C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot
    echo.
) else (
    echo.
    echo [ERROR] Installation failed!
    echo.
    echo Please install manually from:
    echo https://adoptium.net/temurin/releases/?version=17
    echo.
)

pause
