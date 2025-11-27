# Testing Guide - WaitNot Application

## Test: Restaurant Reels Management

This test verifies that reels added/edited/deleted by restaurants appear immediately on the user-facing reels page.

### Steps to Test:

1. **Open Two Browser Windows/Tabs:**
   - Window 1: Restaurant Dashboard
   - Window 2: Customer Reels Page

2. **Login to Restaurant Dashboard (Window 1):**
   ```
   URL: http://localhost:3000/restaurant-login
   Email: spice@example.com
   Password: password123
   ```

3. **Navigate to Reels Tab:**
   - Click on "Reels" tab in dashboard
   - You'll see existing reels (if any)

4. **Open Customer Reels Page (Window 2):**
   ```
   URL: http://localhost:3000/reels
   ```
   - View existing reels in vertical scroll format

5. **Test Add Reel:**
   - In Window 1 (Dashboard), click "Add Reel"
   - Fill in:
     - Video URL: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
     - Dish Name: `Test Dish`
     - Price: `299`
   - Click "Add"
   - **Expected:** Reel appears in dashboard grid

6. **Verify on Customer Side:**
   - In Window 2 (Reels page), refresh the page
   - **Expected:** New reel appears in the vertical scroll feed
   - Scroll to find your new reel
   - Click "Order Now" to test ordering flow

7. **Test Edit Reel:**
   - In Window 1 (Dashboard), click edit icon on the reel
   - Change dish name to `Updated Test Dish`
   - Change price to `349`
   - Click "Update"
   - **Expected:** Changes saved in dashboard

8. **Verify Edit on Customer Side:**
   - In Window 2 (Reels page), refresh
   - **Expected:** Reel shows updated name and price

9. **Test Delete Reel:**
   - In Window 1 (Dashboard), click delete icon
   - Confirm deletion
   - **Expected:** Reel removed from dashboard

10. **Verify Delete on Customer Side:**
    - In Window 2 (Reels page), refresh
    - **Expected:** Deleted reel no longer appears

### Expected Results:

✅ All changes made in restaurant dashboard reflect on customer reels page
✅ Add, edit, and delete operations work correctly
✅ Restaurant information (name, rating) displays correctly on reels
✅ Order flow from reels works properly

### Data Flow:

```
Restaurant Dashboard → Local JSON Database → Customer Reels Page
     (Add/Edit/Delete)      (reels.json)         (Fetch & Display)
```

### Notes:

- Changes require page refresh on customer side (no WebSocket for reels currently)
- All reels are stored in `server/data/reels.json`
- Restaurant ID is automatically associated with each reel
- Video URLs must be direct links to video files (mp4, webm, etc.)

## Other Tests to Run:

### Test Order Flow:
1. Place order from customer side
2. Verify it appears in restaurant dashboard (real-time via Socket.IO)
3. Update order status
4. Verify status changes

### Test QR Table Ordering:
1. Click QR code link in dashboard
2. Place order from QR page
3. Verify order appears in "Table Orders" tab

### Test Menu Management:
1. Add/edit/delete menu items
2. Verify changes on restaurant page
3. Test ordering updated menu items

### Test Responsive Design:
1. Resize browser to mobile size (375px)
2. Test all features work on small screens
3. Verify horizontal scrolling tabs work
4. Test modals are scrollable on mobile
