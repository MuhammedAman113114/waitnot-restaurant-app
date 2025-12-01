# 🧪 Test Restaurant Data Isolation

## Quick Test Guide

### Prerequisites
```bash
# Rebuild the client with latest changes
cd client
npm run build
cd ..

# Start the server
npm start
```

## Test 1: Basic Data Isolation ✅

### Steps:
1. **Open Browser 1** (Chrome)
   - Go to: `http://localhost:5000/restaurant-login`
   - Login to **Pizza Paradise**
   - Username: `pizza@test.com`
   - Password: `password123`

2. **Note the data:**
   - Count the orders
   - Count the reels
   - Note the menu items

3. **Open Browser 2** (Firefox or Incognito)
   - Go to: `http://localhost:5000/restaurant-login`
   - Login to **Spice Garden**
   - Username: `spice@test.com`
   - Password: `password123`

4. **Verify:**
   - ✅ Completely different orders
   - ✅ Completely different reels
   - ✅ Completely different menu items
   - ✅ Different restaurant name in header

### Expected Console Output (Browser 1 - Pizza Paradise):
```
=== Restaurant Dashboard Loading ===
Restaurant ID from localStorage: midc8u7tc3cqndc1r1
=== Fetching Restaurant Data ===
✓ Restaurant fetched: Pizza Paradise (ID: midc8u7tc3cqndc1r1)
=== Data Isolation Check ===
Current Restaurant: Pizza Paradise
Fetching orders for restaurant: midc8u7tc3cqndc1r1
Orders fetched: X orders
Fetching reels for restaurant: midc8u7tc3cqndc1r1
Restaurant reels fetched: X reels
```

### Expected Console Output (Browser 2 - Spice Garden):
```
=== Restaurant Dashboard Loading ===
Restaurant ID from localStorage: midc8u7tc3cqndc1r26
=== Fetching Restaurant Data ===
✓ Restaurant fetched: Spice Garden (ID: midc8u7tc3cqndc1r26)
=== Data Isolation Check ===
Current Restaurant: Spice Garden
Fetching orders for restaurant: midc8u7tc3cqndc1r26
Orders fetched: X orders
Fetching reels for restaurant: midc8u7tc3cqndc1r26
Restaurant reels fetched: X reels
```

## Test 2: Refresh Persistence ✅

### Steps:
1. Stay logged in to **Spice Garden**
2. Press **F5** to refresh
3. Open Console (F12)

### Verify:
- ✅ Still shows Spice Garden (not Pizza Paradise)
- ✅ Same orders appear
- ✅ Same reels appear
- ✅ Console shows correct restaurant ID

## Test 3: Real-time Updates Isolation ✅

### Steps:
1. **Browser 1**: Login to Pizza Paradise
2. **Browser 2**: Login to Pizza Paradise
3. **Browser 3**: Login to Spice Garden

4. **Create a test order for Pizza Paradise:**
   - Use customer app or API
   - Order from Pizza Paradise

### Verify:
- ✅ Browser 1 receives notification (Pizza Paradise)
- ✅ Browser 2 receives notification (Pizza Paradise)
- ❌ Browser 3 does NOT receive notification (Spice Garden)

## Test 4: Data Modification Protection ✅

### Steps:
1. Login to **Pizza Paradise**
2. Open Console (F12)
3. Get a reel ID from Spice Garden (from database or another browser)

4. **Try to delete Spice Garden's reel:**
```javascript
// In Pizza Paradise's console
const spiceGardenReelId = 'xxx'; // A reel from Spice Garden
const pizzaParadiseId = localStorage.getItem('restaurantId');

fetch(`/api/reels/${spiceGardenReelId}?restaurantId=${pizzaParadiseId}`, {
  method: 'DELETE'
})
.then(r => r.json())
.then(console.log);
```

### Expected Result:
```json
{
  "error": "Unauthorized: Cannot delete reels from another restaurant"
}
```

## Test 5: Analytics Isolation ✅

### Steps:
1. Login to **Pizza Paradise**
2. Go to **Analytics** tab
3. Note the revenue, order count, top items

4. Logout and login to **Spice Garden**
5. Go to **Analytics** tab

### Verify:
- ✅ Completely different analytics
- ✅ Different revenue numbers
- ✅ Different top items
- ✅ Different order counts

## Test 6: Menu Management Isolation ✅

### Steps:
1. Login to **Pizza Paradise**
2. Go to **Menu** tab
3. Add a new item: "Test Pizza - ₹500"

4. Logout and login to **Spice Garden**
5. Go to **Menu** tab

### Verify:
- ❌ "Test Pizza" does NOT appear in Spice Garden's menu
- ✅ Only Spice Garden's items appear

## Test 7: Table Orders Isolation ✅

### Steps:
1. Login to **Pizza Paradise**
2. Create a dine-in order for Table 1

3. Logout and login to **Spice Garden**
4. Go to **Table Orders** tab

### Verify:
- ❌ Pizza Paradise's Table 1 order does NOT appear
- ✅ Only Spice Garden's table orders appear

## Test 8: QR Code Isolation ✅

### Steps:
1. Login to **Pizza Paradise**
2. Go to **QR Codes** tab
3. Note the QR code URL for Table 1

4. Logout and login to **Spice Garden**
5. Go to **QR Codes** tab
6. Note the QR code URL for Table 1

### Verify:
- ✅ Different URLs (contain different restaurant IDs)
- ✅ Scanning Pizza Paradise's QR shows Pizza Paradise menu
- ✅ Scanning Spice Garden's QR shows Spice Garden menu

## Automated Test (Optional)

Create a test script to verify data isolation:

```javascript
// test-isolation.js
const axios = require('axios');

async function testIsolation() {
  const baseURL = 'http://localhost:5000/api';
  
  // Get all restaurants
  const { data: restaurants } = await axios.get(`${baseURL}/restaurants`);
  
  for (const restaurant of restaurants) {
    console.log(`\n=== Testing ${restaurant.name} ===`);
    
    // Get orders
    const { data: orders } = await axios.get(`${baseURL}/orders/restaurant/${restaurant._id}`);
    console.log(`Orders: ${orders.length}`);
    
    // Verify all orders belong to this restaurant
    const invalidOrders = orders.filter(o => o.restaurantId !== restaurant._id);
    if (invalidOrders.length > 0) {
      console.error(`❌ ISOLATION BREACH: ${invalidOrders.length} orders from other restaurants!`);
    } else {
      console.log(`✅ All orders belong to ${restaurant.name}`);
    }
    
    // Get reels
    const { data: reels } = await axios.get(`${baseURL}/reels?restaurantId=${restaurant._id}`);
    console.log(`Reels: ${reels.length}`);
    
    // Verify all reels belong to this restaurant
    const invalidReels = reels.filter(r => {
      const reelRestaurantId = r.restaurantId?._id || r.restaurantId;
      return reelRestaurantId !== restaurant._id;
    });
    if (invalidReels.length > 0) {
      console.error(`❌ ISOLATION BREACH: ${invalidReels.length} reels from other restaurants!`);
    } else {
      console.log(`✅ All reels belong to ${restaurant.name}`);
    }
  }
}

testIsolation().catch(console.error);
```

Run with:
```bash
node test-isolation.js
```

## Success Criteria

All tests should show:
- ✅ Each restaurant sees only their own data
- ✅ No data leakage between restaurants
- ✅ Real-time updates properly scoped
- ✅ Cannot modify other restaurants' data
- ✅ Analytics calculated from own data only
- ✅ Console logs show correct restaurant IDs

## If Tests Fail

1. **Check Console Logs:**
   - Look for warning messages
   - Verify restaurant IDs match

2. **Clear Browser Data:**
   ```javascript
   localStorage.clear();
   ```
   Then login again

3. **Restart Server:**
   ```bash
   npm start
   ```

4. **Check Database:**
   - Verify `restaurantId` field exists on all orders/reels
   - Check `server/data/*.json` files

## Report Issues

If you find any data isolation issues:
1. Note which test failed
2. Copy console logs
3. Note the restaurant IDs involved
4. Check `RESTAURANT_DATA_ISOLATION_COMPLETE.md` for troubleshooting

---

**Status**: All data isolation tests should pass! ✅
