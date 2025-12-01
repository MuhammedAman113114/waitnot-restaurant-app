# 📹 Upload Reels Guide

## Videos to Upload

1. **v3.mp4** → Pizza Paradise (Margherita Pizza - ₹300)
2. **V2.mp4** → Spice Garden (Paneer Tikka - ₹250)  
3. **v1.mp4** → Burger Hub (Classic Burger - ₹180)

---

## Method 1: Using the Upload Script (Easiest)

### Steps:
1. Make sure the server is running
2. Double-click `upload-reels.bat`
3. Wait for uploads to complete

---

## Method 2: Manual Upload via Restaurant Dashboard

### For Pizza Paradise (v3.mp4):
1. Login to Pizza Paradise restaurant account
2. Go to "Reels" tab
3. Click "Add Reel"
4. Upload: `C:\Project\WAITNOT-apk\WAITNOT-apk\client\videos\v3.mp4`
5. Dish Name: Margherita Pizza
6. Price: ₹300
7. Click "Upload"

### For Spice Garden (V2.mp4):
1. Login to Spice Garden restaurant account
2. Go to "Reels" tab
3. Click "Add Reel"
4. Upload: `C:\Project\WAITNOT-apk\WAITNOT-apk\client\videos\V2.mp4`
5. Dish Name: Paneer Tikka
6. Price: ₹250
7. Click "Upload"

### For Burger Hub (v1.mp4):
1. Login to Burger Hub restaurant account
2. Go to "Reels" tab
3. Click "Add Reel"
4. Upload: `C:\Project\WAITNOT-apk\WAITNOT-apk\client\videos\v1.mp4`
5. Dish Name: Classic Burger
6. Price: ₹180
7. Click "Upload"

---

## Method 3: Using cURL Commands

### Upload to Pizza Paradise:
```bash
curl -X POST http://localhost:5000/api/reels \
  -F "video=@client/videos/v3.mp4" \
  -F "restaurantId=midc8u9d91l99mo7yxq" \
  -F "dishName=Margherita Pizza" \
  -F "price=300"
```

### Upload to Spice Garden:
```bash
curl -X POST http://localhost:5000/api/reels \
  -F "video=@client/videos/V2.mp4" \
  -F "restaurantId=midc8u7tc3cqndc1r26" \
  -F "dishName=Paneer Tikka" \
  -F "price=250"
```

### Upload to Burger Hub:
```bash
curl -X POST http://localhost:5000/api/reels \
  -F "video=@client/videos/v1.mp4" \
  -F "restaurantId=midc8uax60xh1mcd1d" \
  -F "dishName=Classic Burger" \
  -F "price=180"
```

---

## Restaurant IDs Reference

- **Pizza Paradise**: `midc8u9d91l99mo7yxq`
- **Spice Garden**: `midc8u7tc3cqndc1r26`
- **Burger Hub**: `midc8uax60xh1mcd1d`

---

## Verification

After uploading, verify by:
1. Opening the customer app
2. Going to the "Reels" section
3. Checking if all 3 videos appear
4. Testing video playback

---

## Troubleshooting

### Video not uploading?
- Check file path is correct
- Ensure server is running
- Check file size (should be < 50MB)
- Verify video format (MP4)

### Video uploaded but not showing?
- Refresh the app
- Check restaurant ID is correct
- Verify reel is marked as available

### Upload fails?
- Check internet connection
- Restart server
- Clear browser cache
- Try different browser

---

## Notes

- Videos are stored in `client/videos/` folder
- Supported format: MP4
- Max file size: 50MB
- Videos will be visible to all customers
- Can be edited/deleted from restaurant dashboard

---

**Status**: Ready to Upload
**Location**: `C:\Project\WAITNOT-apk\WAITNOT-apk\client\videos\`
**Method**: Choose any method above
