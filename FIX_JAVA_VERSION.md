# 🔧 Fix Java Version Issue

## Problem

The build is failing with:
```
Unsupported class file major version 69
```

This means Gradle is trying to use Java 25, which is too new. Gradle 8.11.1 only supports Java 17 or 21.

## Solution (2 Steps)

### Step 1: Install Java 17

Run as **Administrator**:
```bash
install-correct-java.bat
```

This will:
- Install Java 17 LTS using Chocolatey
- Verify the installation
- Show you the installation path

**OR** install manually:
1. Download from: https://adoptium.net/temurin/releases/?version=17
2. Install with default settings
3. Note the installation path

### Step 2: Rebuild APK

After Java 17 is installed:
```bash
rebuild-with-java17.bat
```

This will:
- Use Java 17 (not Java 25)
- Build React app
- Sync Capacitor
- Build Android APK

## Why This Happened

- Gradle 8.11.1 supports Java 17-21
- Your system has Java 25 (too new)
- Need to use Java 17 for compatibility

## After Building

1. **Find your APK:**
   ```
   client\android\app\build\outputs\apk\debug\app-debug.apk
   ```

2. **Install on phone**

3. **Configure in app:**
   - Open app
   - Tap Settings icon (⚙️)
   - Enter IP: `10.254.223.222`
   - Test connection
   - Save settings

## Quick Commands

```bash
# Install Java 17 (as Administrator)
install-correct-java.bat

# Build APK
rebuild-with-java17.bat

# Test connection
test-connection.bat
```

## Alternative: Test in Browser First

Don't want to build APK yet? Test in browser:

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm run dev

# Open: http://localhost:3000
# Click Settings icon (⚙️)
```

## Troubleshooting

### "Java 17 not found"
- Make sure you ran `install-correct-java.bat` as Administrator
- Check: `C:\Program Files\Eclipse Adoptium\`
- You should see a folder like `jdk-17.0.x.x-hotspot`

### "Chocolatey not found"
Install Chocolatey first:
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### Build still fails
- Close ALL terminals
- Open new terminal
- Run `rebuild-with-java17.bat` again

## Summary

1. Install Java 17: `install-correct-java.bat` (as Admin)
2. Build APK: `rebuild-with-java17.bat`
3. Install on phone
4. Configure server URL in Settings page

The Settings page I added earlier means you won't need to rebuild when your IP changes!
