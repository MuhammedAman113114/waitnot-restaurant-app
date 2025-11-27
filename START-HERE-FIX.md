# 🔧 Fix Connection Error - Start Here

## Quick Diagnosis

Run this first:
```bash
debug-connection.bat
```

This will tell you exactly what's wrong.

---

## Most Likely Solution (90% of cases)

The issue is that **Android WebView caches old JavaScript code**. Here's the fix:

### Step 1: Rebuild with Test Page
```bash
fix-java-and-build.bat
```

### Step 2: Completely Remove Old App

**On your phone:**
1. Long press WaitNot app icon
2. Tap "App info"
3. Tap "Storage" → "Clear Storage" → "Clear Data"
4. Go back → "Uninstall"

### Step 3: Install Fresh APK
Copy `client\android\app\build\outputs\apk\debug\app-debug.apk` to your phone and install.

### Step 4: Test with Debug Page First

Before opening the main app, test the connection:

1. Open Chrome on your phone
2. Go to: `http://172.27.96.100:5000/test-connection.html`
3. Tap all three "Test" buttons
4. Take a screenshot of the results

**If all tests pass:** The connection works! The issue is in the app code.
**If tests fail:** The connection doesn't work. See "Network Issues" below.

---

## If Tests Pass But App Still Fails

This means the connection works, but the app has a configuration issue.

### Solution: Check Axios Configuration

1. Open `client/src/main.jsx`
2. Verify line 12 shows:
   ```javascript
   axios.defaults.baseURL = 'http://172.27.96.100:5000'
   ```

3. Check line 13:
   ```javascript
   axios.defaults.timeout = 10000
   ```

4. If correct, try increasing timeout to 30000:
   ```javascript
   axios.defaults.timeout = 30000
   ```

5. Rebuild and reinstall.

---

## If Tests Fail (Network Issues)

### Issue 1: Different WiFi Networks

**Check:** Are your phone and computer on the same WiFi?

**Fix:**
- Connect both to the same WiFi network
- OR use ngrok (see below)

### Issue 2: IP Address Changed

**Check:** Run `ipconfig | findstr "IPv4"`

**Fix:** If IP is different from 172.27.96.100:
1. Update `client/src/config.js` with new IP
2. Rebuild: `fix-java-and-build.bat`
3. Reinstall APK

### Issue 3: Firewall Blocking

**Check:** Can you access in phone browser?
- Open Chrome on phone
- Go to: `http://172.27.96.100:5000/api/restaurants`

**Fix:** If browser fails too:

**Option A: Allow through firewall (Run as Administrator)**
```powershell
New-NetFirewallRule -DisplayName "WaitNot Server" -Direction Inbound -LocalPort 5000 -Protocol TCP -Action Allow
```

**Option B: Temporarily disable firewall**
- Windows Security → Firewall → Turn off (not recommended)

---

## Best Solution: Use ngrok (Works 100% of the time)

This bypasses ALL network issues:

### 1. Download ngrok
- Go to: https://ngrok.com/download
- Download Windows version
- Extract to `C:\ngrok`

### 2. Start ngrok
```bash
cd C:\ngrok
ngrok http 5000
```

You'll see:
```
Forwarding    https://abc123.ngrok.io -> http://localhost:5000
```

**Copy the https URL** (e.g., `https://abc123.ngrok.io`)

### 3. Update Config
Edit `client/src/config.js`:
```javascript
export const API_URL = 'https://abc123.ngrok.io/api';
export const SOCKET_URL = 'https://abc123.ngrok.io';
```

### 4. Rebuild
```bash
fix-java-and-build.bat
```

### 5. Install and Test
- Uninstall old app
- Install new APK
- Open app

**Advantages:**
- ✅ Works on ANY network (even mobile data!)
- ✅ HTTPS (no security issues)
- ✅ No firewall problems
- ✅ No IP changes
- ✅ Can share with others for testing

---

## Detailed Debugging Steps

### 1. Check Server
```bash
netstat -ano | findstr :5000
```
Should show server running.

### 2. Check IP
```bash
ipconfig | findstr "IPv4"
```
Should match config.js.

### 3. Test from Computer
```bash
curl http://172.27.96.100:5000/api/restaurants
```
Should return JSON.

### 4. Test from Phone Browser
Open: `http://172.27.96.100:5000/api/restaurants`
Should show JSON.

### 5. Test Connection Page
Open: `http://172.27.96.100:5000/test-connection.html`
All tests should pass.

### 6. Check Built Files
```bash
cd client
findstr /s "172.27.96.100" dist\assets\*.js
```
Should find your IP.

### 7. Check APK Date
```bash
dir client\android\app\build\outputs\apk\debug\app-debug.apk
```
Should be recent (today's date).

---

## Still Not Working?

### Get ADB Logs

1. Enable USB Debugging on phone:
   - Settings → About Phone
   - Tap "Build Number" 7 times
   - Settings → Developer Options
   - Enable "USB Debugging"

2. Connect phone via USB

3. Run:
```bash
adb devices
adb logcat -c
adb logcat | findstr "chromium\|Console"
```

4. Open the app and watch for errors

5. Share the error messages

---

## Common Error Messages

### "Network Error"
- Server not accessible
- Wrong IP address
- Firewall blocking
- Different WiFi networks

### "Timeout"
- Server too slow
- Network congestion
- Increase timeout in config

### "CORS Error"
- Server CORS not configured (but it should be)
- Check server logs

### "ERR_CLEARTEXT_NOT_PERMITTED"
- Android blocking HTTP
- We added network security config
- Make sure you rebuilt after adding it

---

## Quick Reference

| File | Purpose |
|------|---------|
| `debug-connection.bat` | Check what's wrong |
| `fix-java-and-build.bat` | Rebuild APK |
| `client/src/config.js` | API URL configuration |
| `test-connection.html` | Test if connection works |
| `DETAILED-FIX-GUIDE.md` | Complete troubleshooting guide |

---

## Success Checklist

- [ ] Server is running (`netstat -ano | findstr :5000`)
- [ ] IP is correct (`ipconfig`)
- [ ] Can access in phone browser
- [ ] test-connection.html passes all tests
- [ ] Old app completely uninstalled (cleared data)
- [ ] Fresh APK installed
- [ ] Waited 10+ seconds for app to load

---

## Need Help?

1. Run `debug-connection.bat` and share output
2. Test `test-connection.html` and share screenshot
3. Share ADB logs if possible
4. Or just use ngrok - it always works! 😊
