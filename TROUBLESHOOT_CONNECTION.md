# 🔍 Troubleshoot Connection Issue

## Current Situation

✅ Backend is running on port 5000
✅ Backend works from your computer
✅ Settings page is working
✅ Correct IP entered: `172.27.96.222`
❌ Connection fails from phone: "Failed to fetch"
❌ Firewall rule not found

## Most Likely Cause: Firewall Blocking

Your Windows Firewall is blocking external connections to port 5000.

## Solution Steps

### Step 1: Add Firewall Rule

**Run as Administrator:**
```bash
add-firewall-rule.bat
```

**Important:** Right-click → "Run as Administrator"

This will allow your phone to connect to port 5000.

### Step 2: Test from Phone Browser

Before testing the app, test from your phone's browser:

1. Open Chrome/Safari on your phone
2. Visit: `http://172.27.96.222:5000/api/restaurants`
3. You should see JSON data with restaurant list

**If this doesn't work:**
- Firewall rule didn't apply
- Phone not on same WiFi
- Backend not running

**If this works:**
- The app should work too!

### Step 3: Test in App

1. Open WaitNot app
2. Go to Settings (⚙️ icon)
3. Tap "Test Connection"
4. Should now show: ✓ Connected!
5. Tap "Save Settings"
6. Go to home page
7. Restaurants should load!

## Alternative: Manual Firewall Rule

If the script doesn't work, add the rule manually:

1. **Open Windows Defender Firewall:**
   - Press Win + R
   - Type: `wf.msc`
   - Press Enter

2. **Add Inbound Rule:**
   - Click "Inbound Rules" on left
   - Click "New Rule..." on right
   - Select "Port" → Next
   - Select "TCP" and enter "5000" → Next
   - Select "Allow the connection" → Next
   - Check all profiles → Next
   - Name: "WaitNot Backend Server" → Finish

3. **Test again from phone**

## Verify Checklist

Before testing, verify:

- [ ] Backend is running: `cd server && npm run dev`
- [ ] Firewall rule added (run `add-firewall-rule.bat` as Admin)
- [ ] Phone is on same WiFi network as computer
- [ ] IP is correct: `172.27.96.222`
- [ ] Test from phone browser first

## Test Commands

### On Your Computer:

```bash
# Check if backend is running
netstat -ano | findstr :5000

# Check your IP
ipconfig | findstr "IPv4"

# Test backend locally
curl http://172.27.96.222:5000/api/restaurants
```

### On Your Phone:

**Browser test:**
```
http://172.27.96.222:5000/api/restaurants
```

Should show JSON like:
```json
[
  {
    "_id": "...",
    "name": "Spice Garden",
    "description": "Authentic Indian cuisine...",
    ...
  }
]
```

## Common Issues

### Issue 1: "Failed to fetch"
**Cause:** Firewall blocking
**Solution:** Run `add-firewall-rule.bat` as Administrator

### Issue 2: "Network Error"
**Cause:** Phone not on same WiFi
**Solution:** Connect phone to same WiFi as computer

### Issue 3: "Timeout"
**Cause:** Backend not running
**Solution:** Start backend: `cd server && npm run dev`

### Issue 4: "Connection refused"
**Cause:** Wrong IP address
**Solution:** Check IP with `ipconfig`, update in Settings

## WiFi Network Check

**On Computer:**
```bash
ipconfig
```
Look for "Wireless LAN adapter Wi-Fi" → IPv4 Address

**On Phone:**
- Settings → WiFi
- Check connected network name
- Must match computer's WiFi

## Backend Status Check

```bash
# Check if running
netstat -ano | findstr :5000

# If not running, start it
cd server
npm run dev
```

Should show:
```
🚀 Server running on port 5000
```

## Firewall Rule Verification

```bash
netsh advfirewall firewall show rule name="WaitNot Backend Server"
```

Should show:
```
Rule Name: WaitNot Backend Server
Enabled: Yes
Direction: In
Protocol: TCP
LocalPort: 5000
Action: Allow
```

## Step-by-Step Debugging

1. **Test backend locally:**
   ```bash
   curl http://localhost:5000/api/restaurants
   ```
   ✅ Works? Backend is running

2. **Test backend on network IP:**
   ```bash
   curl http://172.27.96.222:5000/api/restaurants
   ```
   ✅ Works? Network is configured

3. **Test from phone browser:**
   ```
   http://172.27.96.222:5000/api/restaurants
   ```
   ✅ Works? Firewall is open

4. **Test in app:**
   - Settings → Test Connection
   ✅ Works? Everything is good!

## Quick Fix Summary

**Most likely you just need to:**

1. Run `add-firewall-rule.bat` as Administrator
2. Test from phone browser: `http://172.27.96.222:5000/api/restaurants`
3. If browser works, app will work too
4. Test in app Settings page

That's it! The firewall is probably the only issue.
