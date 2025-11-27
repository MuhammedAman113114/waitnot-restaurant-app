@echo off
echo ========================================
echo Fix JAVA_HOME Path
echo ========================================
echo.
echo Your actual Java path is:
echo C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot
echo.
echo Current JAVA_HOME is set to:
echo %JAVA_HOME%
echo.
echo This script will guide you to fix it.
echo.
pause

echo.
echo ========================================
echo INSTRUCTIONS:
echo ========================================
echo.
echo 1. Press Windows Key
echo 2. Search for "Environment Variables"
echo 3. Click "Edit the system environment variables"
echo 4. Click "Environment Variables" button
echo 5. Under "System variables", find "JAVA_HOME"
echo 6. Click "Edit"
echo 7. Change the value to:
echo    C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot
echo 8. Click OK on all windows
echo 9. Close this window and open a NEW terminal
echo 10. Run check-requirements.bat again
echo.
echo ========================================
echo.
echo For this session only, you can also run:
echo set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot
echo.
pause
