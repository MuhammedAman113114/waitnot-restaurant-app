# Complete Step-by-Step Guide to Fix Connection Error

## Current Situation
- ✅ Backend server is running on port 5000
- ✅ You can access http://172.27.96.100:5000/api/restaurants in your phone's browser
- ❌ The APK shows "Connection Error - Network Error"

This means the network is fine, but the app's WebView can't make the request.

---

## Step 1: Verify Current Setup

### 1.1 Check if server is running
Open Command Prompt and run:
```bash
netstat -ano | findstr :5000
```

You should see something like:
```
TCP    0.0.0.0:5000    0.0.0.0:0    LISTENING    2272
```

If not, start the server:
```bash
cd server
node server.js
```

Keep this window open!

### 1.2 Verify your IP hasn't changed
```bash
ipconfig | findstr "IPv4"
```

Should show: `172.27.96.100`

If it's different, update `client/src/config.js` with the new IP.

---

## Step 2: Test Backend from Phone Browser

On your phone, open Chrome/Firefox and go to:
```
http://172.27.96.100:5000/api/restaurants
```

**Expected:** You should see JSON data with restaurant information.

**If this doesn't work:**
- Your phone and computer are on different WiFi networks
- Windows Firewall is blocking the connection
- Your IP address changed

---

## Step 3: Clean Rebuild the APK

### 3.1 Clean the Android build
```bash
cd client\android
gradlew.bat clean
cd ..\..
```

### 3.2 Rebuild everything
```bash
fix-java-and-build.bat
```

Wait for it to complete. You should see:
```
BUILD SUCCESSFUL
```

---

## Step 4: Completely Remove Old App

**IMPORTANT:** Android caches the old app's code!

On your phone:
1. Long press the WaitNot app icon
2. Tap "App info" or drag to info icon
3. Tap "Storage"
4. Tap "Clear Storage" or "Clear Data"
5. Go back
6. Tap "Uninstall"
7. Confirm uninstall

---

## Step 5: Install Fresh APK

### Method 1: USB Transfer
1. Connect phone to computer via USB
2. Copy `client\android\app\build\outputs\apk\debug\app-debug.apk` to phone's Downloads folder
3. On phone, open Files app → Downloads
4. Tap `app-debug.apk`
5. Allow "Install from Unknown Sources" if prompted
6. Tap "Install"

### Method 2: ADB Install (if USB debugging enabled)
```bash
adb install -r client\android\app\build\outputs\apk\debug\app-debug.apk
```

The `-r` flag replaces the old app.

---

## Step 6: Test the App

1. Make sure backend server is still running
2. Open WaitNot app on your phone
3. Wait 10 seconds for it to load

---

## Step 7: If Still Not Working - Debug with ADB

### 7.1 Enable USB Debugging on Phone
1. Settings → About Phone
2. Tap "Build Number" 7 times (enables Developer Options)
3. Settings → Developer Options
4. Enable "USB Debugging"

### 7.2 Connect Phone and Check Logs
```bash
adb devices
```

Should show your device. Then run:
```bash
adb logcat -c
adb logcat | findstr "WaitNot\|axios\|chromium"
```

Open the app and watch the logs. Look for errors.

---

## Common Issues and Solutions

### Issue 1: "Network Error" in app but browser works

**Cause:** Android WebView security blocking HTTP requests

**Solution:** We already added network security config. Try this:

Edit `client/src/config.js` and change timeout:
```javascript
export const API_URL = 'http://172.27.96.100:5000/api';
export const SOCKET_URL = 'http://172.27.96.100:5000';
export const TIMEOUT = 30000; // 30 seconds
```

Then edit `client/src/main.jsx` line 12:
```javascript
axios.defaults.timeout = 30000  // Change from 10000 to 30000
```

Rebuild and reinstall.

### Issue 2: CORS Error

**Check server logs** for CORS errors. The server should show:
```
Access-Control-Allow-Origin: *
```

### Issue 3: Wrong URL being called

**Check the built file** to verify IP is correct:
```bash
cd client
findstr /s "172.27.96.100" dist\assets\*.js
```

Should show your IP in the output.

---

## Alternative Solution: Use ngrok (Bypasses All Issues)

If nothing works, use ngrok to create a public URL:

### 1. Download ngrok
- Go to: https://ngrok.com/download
- Download Windows version
- Extract to a folder (e.g., C:\ngrok)

### 2. Run ngrok
```bash
cd C:\ngrok
ngrok http 5000
```

You'll see:
```
Forwarding: https://abc123.ngrok.io -> http://localhost:5000
```

### 3. Update config with ngrok URL
Edit `client/src/config.js`:
```javascript
export const API_URL = 'https://abc123.ngrok.io/api';
export const SOCKET_URL = 'https://abc123.ngrok.io';
```

### 4. Rebuild and reinstall
```bash
fix-java-and-build.bat
```

**Advantages:**
- ✅ Works on any network (even mobile data)
- ✅ HTTPS (no security issues)
- ✅ No firewall problems
- ✅ No IP address changes

---

## Verification Checklist

Before asking for help, verify:

- [ ] Backend server is running (`netstat -ano | findstr :5000`)
- [ ] Can access JSON in phone browser (http://172.27.96.100:5000/api/restaurants)
- [ ] Phone and computer on same WiFi
- [ ] Old app completely uninstalled
- [ ] Fresh APK installed
- [ ] Waited at least 10 seconds for app to load
- [ ] Checked ADB logs for errors

---

## Quick Test: Simplify the Problem

Let's test if the issue is with the app or the API call.

### Create a test HTML file:
Create `client/public/test.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>API Test</title>
</head>
<body>
    <h1>Testing API Connection</h1>
    <button onclick="testAPI()">Test API</button>
    <pre id="result"></pre>
    
    <script>
        async function testAPI() {
            const result = document.getElementById('result');
            result.textContent = 'Loading...';
            
            try {
                const response = await fetch('http://172.27.96.100:5000/api/restaurants');
                const data = await response.json();
                result.textContent = 'SUCCESS!\n' + JSON.stringify(data, null, 2);
            } catch (error) {
                result.textContent = 'ERROR: ' + error.message;
            }
        }
    </script>
</body>
</html>
```

Rebuild and test. If this works but the main app doesn't, the issue is with axios configuration.

---

## Last Resort: Use Local IP in Different Format

Sometimes Android has issues with certain IP formats. Try:

1. Use computer name instead of IP
2. Use 10.0.2.2 if using Android emulator
3. Use ngrok (recommended)

---

## Need More Help?

Run these commands and share the output:

```bash
# 1. Check server status
netstat -ano | findstr :5000

# 2. Check IP
ipconfig | findstr "IPv4"

# 3. Check built file
cd client
findstr /s "baseURL" dist\assets\*.js

# 4. Check APK build date
dir android\app\build\outputs\apk\debug\app-debug.apk

# 5. Get ADB logs (with phone connected)
adb logcat -d | findstr "chromium"
```

Share these outputs for further debugging.
