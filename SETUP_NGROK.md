# 🔧 Setup ngrok (2 Minutes)

## Step 1: Sign Up (Free)
1. Go to: https://dashboard.ngrok.com/signup
2. Sign up with Google/GitHub (fastest)
3. No credit card needed

## Step 2: Get Your Authtoken
1. After signup, you'll see your authtoken
2. Or go to: https://dashboard.ngrok.com/get-started/your-authtoken
3. Copy the token (looks like: `2abc123def456...`)

## Step 3: Configure ngrok
Run this command (replace with your token):
```bash
ngrok config add-authtoken YOUR_TOKEN_HERE
```

Example:
```bash
ngrok config add-authtoken 2abc123def456ghi789jkl
```

## Step 4: Start ngrok
```bash
ngrok http 5000
```

You'll get: `https://abc123.ngrok-free.app`

## Step 5: Use in App
- API URL: `https://abc123.ngrok-free.app/api`
- Socket URL: `https://abc123.ngrok-free.app`

Done!

## Alternative: Use localtunnel (No Signup Needed!)

If you don't want to sign up for ngrok, use localtunnel instead:

### Install localtunnel
```bash
npm install -g localtunnel
```

### Start backend
```bash
cd server
npm run dev
```

### Start tunnel
```bash
lt --port 5000
```

You'll get: `https://random-name.loca.lt`

### Use in App
- API URL: `https://random-name.loca.lt/api`
- Socket URL: `https://random-name.loca.lt`

**No signup required!**

## Which to Use?

**ngrok (with signup):**
- ✅ More reliable
- ✅ Better performance
- ✅ Free permanent subdomain option
- ❌ Requires signup

**localtunnel (no signup):**
- ✅ No signup needed
- ✅ Works immediately
- ✅ Free
- ❌ Less reliable
- ❌ URL changes each time

## Recommended: localtunnel for Quick Test

Try localtunnel first since it needs no signup:
```bash
npm install -g localtunnel
lt --port 5000
```

Copy the URL and use it in your app!
