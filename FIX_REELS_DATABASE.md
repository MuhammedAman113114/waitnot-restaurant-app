# 🔧 Fix Reels Not Showing in Restaurant Dashboard

## Problem
Uploaded reels are not visible in the restaurant dashboard because they're not properly linked to restaurants.

## Solution: Manually Add Reels to Database

### Step 1: Open the reels.json file
Location: `server/data/reels.json`

### Step 2: Add the following reels

Replace the content with this (or add to existing reels):

```json
[
  {
    "_id": "reel_pizza_paradise_v3",
    "restaurantId": "midc8u9d91l99mo7yxq",
    "videoUrl": "/videos/v3.mp4",
    "dishName": "Margherita Pizza",
    "price": 300,
    "views": 0,
    "likes": 0,
    "createdAt": "2025-12-01T10:00:00.000Z",
    "updatedAt": "2025-12-01T10:00:00.000Z"
  },
  {
    "_id": "reel_spice_garden_v2",
    "restaurantId": "midc8u7tc3cqndc1r26",
    "videoUrl": "/videos/V2.mp4",
    "dishName": "Paneer Tikka",
    "price": 250,
    "views": 0,
    "likes": 0,
    "createdAt": "2025-12-01T10:00:00.000Z",
    "updatedAt": "2025-12-01T10:00:00.000Z"
  },
  {
    "_id": "reel_burger_hub_v1",
    "restaurantId": "midc8uax60xh1mcd1d",
    "videoUrl": "/videos/v1.mp4",
    "dishName": "Classic Burger",
    "price": 180,
    "views": 0,
    "likes": 0,
    "createdAt": "2025-12-01T10:00:00.000Z",
    "updatedAt": "2025-12-01T10:00:00.000Z"
  }
]
```

### Step 3: Restart the Server
```bash
# Stop the server (Ctrl+C)
# Then restart:
cd server
npm start
```

### Step 4: Verify in Dashboard
1. Login to each restaurant
2. Go to "Reels" tab
3. You should now see the uploaded reels

---

## Restaurant IDs Reference

- **Pizza Paradise**: `midc8u9d91l99mo7yxq`
- **Spice Garden**: `midc8u7tc3cqndc1r26`
- **Burger Hub**: `midc8uax60xh1mcd1d`

---

## Alternative: Use the Upload Form in Dashboard

If you prefer to upload through the UI:

1. Login to restaurant dashboard
2. Go to "Reels" tab
3. Click "Add Reel"
4. Fill in:
   - Video URL: `/videos/v3.mp4` (or v1.mp4, V2.mp4)
   - Dish Name: (e.g., "Margherita Pizza")
   - Price: (e.g., 300)
5. Click "Upload"

---

## Troubleshooting

### Reels still not showing?
1. Check console for errors (F12 in browser)
2. Verify restaurantId matches exactly
3. Clear browser cache
4. Restart server

### Videos not playing?
1. Ensure videos are in `client/public/videos/` folder
2. Check video format (should be MP4)
3. Verify file names match exactly (case-sensitive)

---

## Quick Fix Script

I'll create a script to automatically fix this...
