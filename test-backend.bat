@echo off
echo ========================================
echo Testing Backend Connectivity
echo ========================================
echo.

echo [1] Testing Render Backend...
echo URL: https://waitnot-restaurant-app.onrender.com/api/restaurants
echo.
echo This may take 30-60 seconds if server is sleeping...
echo.

powershell -Command "try { $response = Invoke-RestMethod -Uri 'https://waitnot-restaurant-app.onrender.com/api/restaurants' -TimeoutSec 60; Write-Host '[SUCCESS] Backend is responding!' -ForegroundColor Green; Write-Host 'Restaurants found:' $response.Count; } catch { Write-Host '[FAILED] Backend not responding' -ForegroundColor Red; Write-Host 'Error:' $_.Exception.Message; }"

echo.
echo ========================================
echo.

echo [2] Testing Local Backend...
echo URL: http://localhost:5000/api/restaurants
echo.

powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:5000/api/restaurants' -TimeoutSec 5; Write-Host '[SUCCESS] Local backend is running!' -ForegroundColor Green; Write-Host 'Restaurants found:' $response.Count; } catch { Write-Host '[INFO] Local backend not running' -ForegroundColor Yellow; Write-Host 'Run: npm run server'; }"

echo.
echo ========================================
echo Test Complete
echo ========================================
echo.
pause
