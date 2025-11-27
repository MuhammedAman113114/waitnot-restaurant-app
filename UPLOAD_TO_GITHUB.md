# 📤 Upload Your Project to GitHub - Complete Guide

## Step 1: Create GitHub Account (2 minutes)

1. Go to: https://github.com
2. Click "Sign up"
3. Enter your email, password, and username
4. Verify your email
5. Choose "Free" plan

---

## Step 2: Install Git (5 minutes)

### Check if Git is already installed:
```bash
git --version
```

If you see a version number, Git is installed. Skip to Step 3.

### If not installed:

**Windows:**
1. Download: https://git-scm.com/download/win
2. Run the installer
3. Use default settings (just keep clicking "Next")
4. Restart your terminal/command prompt

**Verify installation:**
```bash
git --version
```

---

## Step 3: Configure Git (1 minute)

Open terminal/command prompt and run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and the email you used for GitHub.

---

## Step 4: Create .gitignore File (2 minutes)

This tells Git which files NOT to upload (like node_modules).

**Create file:** `.gitignore` in your project root

**Content:**
```
# Dependencies
node_modules/
client/node_modules/
server/node_modules/

# Build outputs
client/dist/
client/android/app/build/
client/android/.gradle/
client/android/local.properties

# Environment files
.env
server/.env

# IDE
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# APK files (optional - remove if you want to upload APKs)
*.apk

# Temporary files
*.tmp
*.temp
```

---

## Step 5: Initialize Git in Your Project (1 minute)

Open terminal in your project folder:

```bash
cd C:\Project\WAITNOT-apk\WAITNOT-apk
```

Initialize Git:
```bash
git init
```

You should see: `Initialized empty Git repository`

---

## Step 6: Add Files to Git (1 minute)

Add all files:
```bash
git add .
```

Check what will be uploaded:
```bash
git status
```

You should see a list of files in green.

---

## Step 7: Create First Commit (1 minute)

```bash
git commit -m "Initial commit - WaitNot Restaurant App"
```

---

## Step 8: Create GitHub Repository (3 minutes)

1. Go to: https://github.com
2. Click the "+" icon (top right) → "New repository"
3. Fill in:
   - **Repository name:** `waitnot-restaurant-app`
   - **Description:** "Restaurant Discovery & Smart Ordering System with Mobile App"
   - **Visibility:** Public (or Private if you prefer)
   - **DO NOT** check "Initialize with README" (we already have files)
4. Click "Create repository"

---

## Step 9: Connect Local Project to GitHub (2 minutes)

GitHub will show you commands. Copy and run them:

```bash
git remote add origin https://github.com/YOUR_USERNAME/waitnot-restaurant-app.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your actual GitHub username!

**Example:**
```bash
git remote add origin https://github.com/john123/waitnot-restaurant-app.git
git branch -M main
git push -u origin main
```

---

## Step 10: Enter GitHub Credentials

When you run `git push`, you'll be asked for credentials:

### Option 1: Personal Access Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "WaitNot Project"
4. Check: `repo` (full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)
7. When Git asks for password, paste the token

### Option 2: GitHub Desktop (Easier)

1. Download: https://desktop.github.com
2. Install and sign in
3. Add your local repository
4. Push to GitHub with one click

---

## Step 11: Verify Upload (1 minute)

1. Go to: `https://github.com/YOUR_USERNAME/waitnot-restaurant-app`
2. You should see all your files!

---

## Quick Commands Reference

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log
```

---

## Common Issues & Solutions

### Issue: "git: command not found"
**Solution:** Install Git (see Step 2)

### Issue: "Permission denied"
**Solution:** Use Personal Access Token instead of password

### Issue: "Repository not found"
**Solution:** Check the repository URL is correct

### Issue: "Large files"
**Solution:** Make sure `.gitignore` is set up correctly

### Issue: "Authentication failed"
**Solution:** 
1. Use Personal Access Token
2. Or use GitHub Desktop
3. Or use SSH keys

---

## After Uploading to GitHub

Now you can deploy your project:

### Deploy Backend (Render.com)
1. Go to Render.com
2. Click "New +" → "Web Service"
3. Connect GitHub
4. Select your repository
5. Configure and deploy

### Deploy Frontend (Vercel)
1. Go to Vercel.com
2. Click "Add New Project"
3. Import from GitHub
4. Select your repository
5. Configure and deploy

See `DEPLOY_COMPLETE_WEBSITE.md` for detailed deployment instructions.

---

## Updating Your Project Later

When you make changes:

```bash
# 1. Add changes
git add .

# 2. Commit with message
git commit -m "Description of changes"

# 3. Push to GitHub
git push
```

Your deployed sites will auto-update if you enable auto-deploy!

---

## Summary

1. ✅ Create GitHub account
2. ✅ Install Git
3. ✅ Configure Git
4. ✅ Create .gitignore
5. ✅ Initialize Git
6. ✅ Add files
7. ✅ Commit
8. ✅ Create GitHub repo
9. ✅ Connect and push
10. ✅ Verify upload

**Total time: 15-20 minutes**

Your project is now on GitHub and ready to deploy! 🚀

---

## Need Help?

If you get stuck:
1. Check Git is installed: `git --version`
2. Check you're in the right folder: `pwd` or `cd`
3. Check GitHub repository URL is correct
4. Try GitHub Desktop for easier workflow

Good luck! 🎉
