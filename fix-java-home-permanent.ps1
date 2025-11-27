# Run this as Administrator to permanently fix JAVA_HOME

$javaPath = "C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot"

Write-Host "Setting JAVA_HOME to: $javaPath" -ForegroundColor Green

# Set system environment variable
[System.Environment]::SetEnvironmentVariable('JAVA_HOME', $javaPath, 'Machine')

Write-Host "JAVA_HOME has been set!" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: You must restart your computer for this to take effect everywhere." -ForegroundColor Yellow
Write-Host ""
Write-Host "For now, you can use fix-java-and-build.bat to build the APK." -ForegroundColor Cyan

pause
