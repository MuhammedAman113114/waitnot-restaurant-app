# Testing Reels - Troubleshooting Guide

## Issue: "Failed to save reel" error

### Step 1: Check if Server is Running

Open terminal and check if the server is running on port 5000:
```bash
# Check if server is running
curl http://localhost:5000/api/reels
```

If you get "Connection refused", the server is not running. Start it:
```bash
cd server
npm run dev
```

### Step 2: Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Try to add a reel
4. Look for error messages

Common errors:
- `Network Error` - Server not running
- `404 Not Found` - API route issue
- `500 Internal Server Error` - Backend error
- `CORS Error` - CORS configuration issue

### Step 3: Test API Directly

Test the reels API endpoint:

**Get all reels:**
```bash
curl http://localhost:5000/api/reels
```

**Create a reel (test):**
```bash
curl -X POST http://localhost:5000/api/reels \
  -H "Content-Type: application/json" \
  -d '{
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "dishName": "Test Dish",
    "price": 299,
    "restaurantId": "YOUR_RESTAURANT_ID",
    "menuItemId": "YOUR_MENU_ITEM_ID"
  }'
```

### Step 4: Check Server Logs

Look at the terminal where the server is running. You should see:
```
Creating reel with data: { videoUrl: '...', dishName: '...', ... }
Reel created: { _id: '...', ... }
```

### Step 5: Verify Data Files

Check if data files exist:
```bash
ls -la server/data/
```

You should see:
- `restaurants.json`
- `orders.json`
- `reels.json`

### Step 6: Check Restaurant ID

Make sure you're logged in:
1. Open DevTools > Application > Local Storage
2. Check for `restaurantId` key
3. If missing, log out and log back in

### Step 7: Check Menu Items

Reels require menu items to exist:
1. Go to Menu tab in dashboard
2. Make sure you have at least one menu item
3. Try adding a reel again

### Common Solutions:

**Problem: Server not running**
```bash
cd server
npm install
npm run dev
```

**Problem: Port already in use**
```bash
# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

**Problem: CORS error**
Check `server/server.js` has:
```javascript
app.use(cors());
```

**Problem: Data not persisting**
Check file permissions:
```bash
chmod 755 server/data
chmod 644 server/data/*.json
```

### Debug Mode

Enable detailed logging:

1. Open `client/src/pages/RestaurantDashboard.jsx`
2. Look for console.log statements
3. Check browser console for detailed logs

### Expected Console Output (Success):

```
Submitting reel data: {
  videoUrl: "...",
  dishName: "Dal Makhani",
  price: 200,
  menuItemId: "...",
  restaurantId: "..."
}
Reel saved: { _id: "...", ... }
Fetching reels for restaurant: ...
All reels: [...]
My reels: [...]
```

### Expected Console Output (Error):

```
Error saving reel: Error: Request failed with status code 500
Error details: { error: "..." }
```

This will tell you exactly what went wrong!

### Quick Fix Checklist:

- [ ] Server is running (`npm run dev` in server folder)
- [ ] Browser can reach http://localhost:5000
- [ ] Logged into restaurant dashboard
- [ ] At least one menu item exists
- [ ] Menu item is selected in dropdown
- [ ] Video URL is provided or file is uploaded
- [ ] Browser console shows no errors
- [ ] Server console shows no errors

### Still Not Working?

1. Restart both servers:
   ```bash
   # Stop both (Ctrl+C)
   # Start server
   cd server && npm run dev
   # Start client (new terminal)
   cd client && npm run dev
   ```

2. Clear browser cache and local storage

3. Check the detailed error message in browser console

4. Check server logs for the exact error

The enhanced error handling will now show you exactly what's wrong!
