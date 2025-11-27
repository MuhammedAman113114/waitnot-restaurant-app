# 📱 WaitNot APK Testing Guide

## ✅ Your Setup is Ready!

Your app is now configured to work with your local backend server.

**Your Computer's IP:** `172.27.96.100`
**Backend URL:** `http://172.27.96.100:5000/api`

## 🚀 Testing Steps

### Step 1: Start Your Backend Server

Open a new terminal and run:
```bash
cd "WAITNOT - APK/server"
npm run dev
```

You should see:
```
🚀 Server running on port 5000
```

**Keep this terminal open!** The server must be running for the app to work.

### Step 2: Verify Backend is Accessible

Open your browser and test:
- http://172.27.96.100:5000/api/restaurants
- You should see JSON data with restaurants

If you get an error, check:
- Is the server running?
- Is your firewall blocking port 5000?

### Step 3: Build the APK

Now you have 2 options:

#### Option A: Install Java & Android Studio (Recommended)

1. **Install Java JDK:**
   - Download: https://adoptium.net/
   - Install JDK 11 or higher
   - Set JAVA_HOME environment variable
   - Add to PATH: `%JAVA_HOME%\bin`

2. **Install Android Studio:**
   - Download: https://developer.android.com/studio
   - Install Android Studio
   - Open SDK Manager (Tools → SDK Manager)
   - Install:
     - Android SDK Platform 33
     - Android SDK Build-Tools 33.0.0
     - Android SDK Command-line Tools
   - Set ANDROID_HOME: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
   - Add to PATH:
     - `%ANDROID_HOME%\platform-tools`
     - `%ANDROID_HOME%\tools`

3. **Restart Your Computer**

4. **Build APK:**
   ```bash
   cd "WAITNOT - APK"
   build-apk.bat
   ```

#### Option B: Use Android Studio GUI (Easier for First Time)

1. Install Java & Android Studio (steps above)
2. Open Android Studio
3. Click "Open an Existing Project"
4. Navigate to: `WAITNOT - APK/client/android`
5. Wait for Gradle sync (5-10 minutes first time)
6. Click: Build → Build Bundle(s) / APK(s) → Build APK(s)
7. Wait for build to complete
8. Click "locate" to find your APK

### Step 4: Install APK on Your Phone

**Prerequisites:**
- ✅ Your phone must be on the same WiFi network as your computer
- ✅ WiFi network: Check your phone's WiFi settings
- ✅ Backend server must be running

**Installation:**

1. **Copy APK to your phone:**
   - APK location: `WAITNOT - APK/client/android/app/build/outputs/apk/debug/app-debug.apk`
   - Transfer via USB, email, or cloud storage

2. **Enable Unknown Sources:**
   - Settings → Security → Unknown Sources (enable)
   - Or: Settings → Apps → Special Access → Install Unknown Apps

3. **Install the APK:**
   - Open the APK file on your phone
   - Tap "Install"
   - Tap "Open" when done

### Step 5: Test the App

**Basic Tests:**
1. ✅ App opens without crashing
2. ✅ Can see list of restaurants
3. ✅ Can click on a restaurant
4. ✅ Can view menu items
5. ✅ Can add items to cart
6. ✅ Can view cart
7. ✅ Can proceed to checkout

**Advanced Tests:**
1. ✅ Place an order
2. ✅ Check if order appears in restaurant dashboard
3. ✅ Test QR code scanning
4. ✅ Test food reels
5. ✅ Test real-time order updates

## 🐛 Troubleshooting

### "Cannot connect to server"

**Check 1: Same WiFi Network**
```bash
# On your computer, check WiFi name
netsh wlan show interfaces

# On your phone, check WiFi name in Settings
# They must match!
```

**Check 2: Server is Running**
```bash
# Make sure you see this:
🚀 Server running on port 5000
```

**Check 3: Firewall**
```bash
# Allow Node.js through Windows Firewall
# Windows Security → Firewall → Allow an app
# Find Node.js and enable both Private and Public
```

**Check 4: Test from Phone Browser**
- Open browser on your phone
- Visit: http://172.27.96.100:5000/api/restaurants
- If you see JSON data, backend is accessible
- If not, check firewall or WiFi

### "White screen on app launch"

**Solution 1: Check Logs**
- Connect phone via USB
- Open Android Studio
- View → Tool Windows → Logcat
- Look for errors

**Solution 2: Rebuild**
```bash
cd "WAITNOT - APK/client"
npm run build
npx cap sync
cd android
gradlew.bat clean
gradlew.bat assembleDebug
```

### "App crashes immediately"

**Check:**
- Is backend URL correct in config.js?
- Is backend server running?
- Check Android Studio Logcat for error messages

### "IP address changed"

If your computer's IP changes:
1. Run `ipconfig` to get new IP
2. Update `client/src/config.js`
3. Rebuild app:
   ```bash
   cd "WAITNOT - APK/client"
   npm run build
   npx cap sync
   cd android
   gradlew.bat assembleDebug
   ```

## 🔥 Quick Test Commands

```bash
# Terminal 1: Start backend
cd "WAITNOT - APK/server"
npm run dev

# Terminal 2: Test backend
curl http://172.27.96.100:5000/api/restaurants

# Terminal 3: Build APK (after installing Java & Android Studio)
cd "WAITNOT - APK"
build-apk.bat
```

## 📱 Testing Checklist

### Before Building APK
- [ ] Backend server is running
- [ ] Can access http://172.27.96.100:5000/api/restaurants in browser
- [ ] Java JDK installed
- [ ] Android Studio installed
- [ ] JAVA_HOME set
- [ ] ANDROID_HOME set
- [ ] Computer restarted after installation

### After Building APK
- [ ] APK file exists
- [ ] APK copied to phone
- [ ] Phone on same WiFi as computer
- [ ] Backend server running
- [ ] APK installed on phone
- [ ] App opens successfully

### App Functionality
- [ ] Can see restaurants list
- [ ] Can view restaurant details
- [ ] Can add items to cart
- [ ] Can view cart
- [ ] Can place order
- [ ] Order appears in dashboard
- [ ] Real-time updates work

## 🎯 Expected Behavior

**On App Launch:**
- Splash screen appears
- Home page loads with restaurants
- Can search restaurants
- Can click on restaurant cards

**On Restaurant Page:**
- Menu items load
- Can add to cart
- Cart icon shows item count
- Can view cart

**On Checkout:**
- Cart items displayed
- Can enter delivery details
- Can select payment method
- Can place order

**On Restaurant Dashboard:**
- Can login with credentials
- Orders appear in real-time
- Can update order status
- Can manage menu items

## 🔐 Test Credentials

**Restaurant Login:**
- Email: `spice@example.com`
- Password: `password123`

**Other Restaurants:**
- Pizza Paradise: `pizza@example.com` / `password123`
- Burger Hub: `burger@example.com` / `password123`

## 📊 Performance Tips

**For Faster Testing:**
1. Keep backend server running
2. Use `gradlew.bat assembleDebug` for debug builds
3. Use Android Studio's "Run" button for instant deployment
4. Enable USB debugging for faster installation

**For Production:**
1. Deploy backend to cloud (Heroku/Railway/Render)
2. Update config.js with production URL
3. Build release APK with signing
4. Test on multiple devices

## ✅ Success Criteria

You're successful when:
- ✅ APK installs without errors
- ✅ App opens and shows restaurants
- ✅ Can browse and add items to cart
- ✅ Can place orders
- ✅ Orders appear in restaurant dashboard
- ✅ Real-time updates work

## 🚀 Next Steps After Testing

1. **Deploy Backend:**
   - Choose: Heroku, Railway, Render, or Vercel
   - Update config.js with production URL
   - Rebuild APK

2. **Customize App:**
   - Change app name and icon
   - Update colors and branding
   - Add your own restaurants

3. **Build Release APK:**
   - Generate keystore
   - Sign APK
   - Prepare for Play Store

4. **Publish:**
   - Create Play Store account
   - Upload APK/AAB
   - Submit for review

Good luck testing! 🎉📱
