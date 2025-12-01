@echo off
echo ========================================
echo Uploading Reels to Restaurants
echo ========================================
echo.

echo Step 1: Starting server...
start cmd /k "cd server && npm start"
timeout /t 5

echo.
echo Step 2: Uploading videos...
echo.

echo Uploading v3.mp4 to Pizza Paradise...
curl -X POST http://localhost:5000/api/reels ^
  -F "video=@client/videos/v3.mp4" ^
  -F "restaurantName=Pizza Paradise" ^
  -F "dishName=Margherita Pizza" ^
  -F "price=300"

echo.
echo Uploading V2.mp4 to Spice Garden...
curl -X POST http://localhost:5000/api/reels ^
  -F "video=@client/videos/V2.mp4" ^
  -F "restaurantName=Spice Garden" ^
  -F "dishName=Paneer Tikka" ^
  -F "price=250"

echo.
echo Uploading v1.mp4 to Burger Hub...
curl -X POST http://localhost:5000/api/reels ^
  -F "video=@client/videos/v1.mp4" ^
  -F "restaurantName=Burger Hub" ^
  -F "dishName=Classic Burger" ^
  -F "price=180"

echo.
echo ========================================
echo Upload Complete!
echo ========================================
pause
