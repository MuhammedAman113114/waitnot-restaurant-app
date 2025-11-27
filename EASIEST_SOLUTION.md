# 🚀 EASIEST SOLUTION - Use ngrok (5 Minutes)

## Why This is Better

Instead of fighting with:
- ❌ Changing IP addresses
- ❌ Firewall rules
- ❌ WiFi network issues
- ❌ Android security configs

Use ngrok to create a public URL for your local backend!

## Step-by-Step (5 Minutes)

### Step 1: Download ngrok (1 minute)
1. Go to: https://ngrok.com/download
2. Download for Windows
3. Extract the zip file
4. Copy `ngrok.exe` to your project folder

### Step 2: Start Your Backend (if not running)
```bash
cd server
npm run dev
```

Should show: `🚀 Server running on port 5000`

### Step 3: Run ngrok (1 minute)
Open a new terminal and run:
```bash
ngrok http 5000
```

You'll see something like:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:5000
```

**Copy that URL!** (e.g., `https://abc123.ngrok-free.app`)

### Step 4: Update App Settings (1 minute)
In your app:
1. Go to Settings (⚙️)
2. Enter:
   - API URL: `https://abc123.ngrok-free.app/api`
   - Socket URL: `https://abc123.ngrok-free.app`
3. Test Connection → Should work!
4. Save Settings

### Step 5: Test App (1 minute)
Go to home page - restaurants should load!

**Total time: 5 minutes**

## Benefits

✅ **Works immediately** - No configuration needed
✅ **No firewall issues** - ngrok handles everything
✅ **No IP address problems** - Uses ngrok URL
✅ **Works from anywhere** - Not limited to WiFi
✅ **HTTPS included** - Secure connection
✅ **No Android security issues** - HTTPS is always allowed

## Limitations (Free Version)

- URL changes each time you restart ngrok
- Session timeout after 2 hours (just restart)
- Limited to 40 connections/minute

## For Permanent Solution

If you want a URL that never changes:
1. Sign up for ngrok account (free)
2. Get a permanent domain
3. Or deploy to Render.com (see DEPLOY_TO_CLOUD.md)

## Quick Commands

```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start ngrok
ngrok http 5000

# Copy the https URL and use it in app Settings
```

## Why This Works

- ngrok creates a secure tunnel from internet to your local server
- Bypasses all firewall/network issues
- Works with HTTPS (Android loves HTTPS)
- No need to configure anything

## Try It Now!

1. Download ngrok: https://ngrok.com/download
2. Run: `ngrok http 5000`
3. Copy the https URL
4. Enter in app Settings
5. Done!

**This will solve all your connection problems in 5 minutes!** 🎉
