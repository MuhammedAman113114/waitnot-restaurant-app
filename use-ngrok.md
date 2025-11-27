# Using ngrok to Connect Your Phone

## Quick Setup (5 minutes)

1. **Download ngrok:**
   - Go to: https://ngrok.com/download
   - Download for Windows
   - Extract the zip file

2. **Run ngrok:**
   ```bash
   ngrok http 5000
   ```

3. **Copy the HTTPS URL:**
   You'll see something like:
   ```
   Forwarding: https://abc123.ngrok.io -> http://localhost:5000
   ```

4. **Update config.js:**
   ```javascript
   export const API_URL = 'https://abc123.ngrok.io/api';
   export const SOCKET_URL = 'https://abc123.ngrok.io';
   ```

5. **Rebuild the app:**
   ```bash
   cd client
   npm run build
   npx cap sync
   cd android
   gradlew.bat assembleDebug
   ```

6. **Install new APK on phone**

## Why ngrok?
- ✅ No firewall configuration needed
- ✅ Works on any network (even mobile data)
- ✅ HTTPS support
- ✅ Free tier available
