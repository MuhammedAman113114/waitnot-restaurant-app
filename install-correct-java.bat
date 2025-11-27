@echo off
echo ========================================
echo Installing Java 17 for Gradle
echo ========================================
echo.
echo Gradle 8.11.1 requires Java 17 or 21
echo Java 25 is too new and not supported
echo.
echo This will install Java 17 LTS using Chocolatey
echo.
pause

echo.
echo [1/2] Installing Java 17...
choco install temurin17 -y

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Installation failed!
    echo.
    echo Please install manually from:
    echo https://adoptium.net/temurin/releases/?version=17
    echo.
    pause
    exit /b 1
)

echo.
echo [2/2] Finding Java 17 installation...
for /d %%i in ("C:\Program Files\Eclipse Adoptium\jdk-17*") do (
    set "JAVA17_PATH=%%i"
    echo Found: %%i
)

if not defined JAVA17_PATH (
    echo [ERROR] Java 17 not found after installation!
    echo Please check: C:\Program Files\Eclipse Adoptium\
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Java 17 Installed
echo ========================================
echo.
echo Location: %JAVA17_PATH%
echo.
echo IMPORTANT: Close ALL terminals and restart them
echo for the changes to take effect!
echo.
echo Next step: Run rebuild-with-java17.bat
echo.
pause
