# 🚀 Build APK - Step by Step Guide

## ✅ Prerequisites Check

Before building, make sure you have:

1. ✅ **Node.js** installed (v18+)
2. ✅ **EAS CLI** installed globally
3. ✅ **Expo account** (free account works)
4. ✅ **Dependencies** installed in mobile folder

---

## 📋 Step-by-Step Build Process

### Step 1: Install EAS CLI (if not installed)

```bash
npm install -g eas-cli
```

### Step 2: Navigate to Mobile Directory

```bash
cd mobile
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Login to Expo

```bash
eas login
```

Enter your Expo account credentials. If you don't have an account:
- Go to https://expo.dev
- Sign up for free
- Then run `eas login` again

### Step 5: Build APK

```bash
eas build --platform android --profile preview
```

**This will:**
- Upload your code to Expo servers
- Build the APK (takes 10-20 minutes)
- Provide a download link when complete

**You'll see output like:**
```
✔ Build started
✔ Build ID: abc123...
✔ Build URL: https://expo.dev/accounts/.../builds/abc123

Building...
[This takes 10-20 minutes]

✔ Build finished
✔ Download: https://expo.dev/artifacts/...
```

### Step 6: Download APK

1. Copy the download URL from terminal
2. Open in browser
3. Download the `.apk` file
4. Save as `nep-earn.apk`

---

## 🎯 Quick Build Command

Run these commands in order:

```bash
# 1. Navigate to mobile directory
cd mobile

# 2. Install dependencies (if not done)
npm install

# 3. Login to Expo (first time only)
eas login

# 4. Build APK
eas build --platform android --profile preview
```

---

## 📱 After Building

### Option 1: Host APK on CDN (Recommended)

1. Upload `nep-earn.apk` to:
   - Firebase Hosting
   - AWS S3
   - Google Drive (get public link)
   - GitHub Releases
   - Any file hosting service

2. Get the direct download URL

3. Set in Vercel environment variable:
   ```
   APK_DOWNLOAD_URL=https://your-cdn-url.com/nep-earn.apk
   ```

4. Redeploy frontend

### Option 2: Use Public Folder

1. Copy `nep-earn.apk` to `frontend/public/nep-earn.apk`
2. Commit and push
3. No environment variable needed

---

## ⚠️ Troubleshooting

### Build Fails?

1. **Check EAS CLI version:**
   ```bash
   eas --version
   ```
   Should be >= 5.2.0

2. **Check Expo account:**
   - Make sure you're logged in: `eas whoami`
   - If not logged in: `eas login`

3. **Check dependencies:**
   ```bash
   cd mobile
   npm install
   ```

4. **Check build logs:**
   - Go to: https://expo.dev/accounts/breakout8848s-organization/projects/nepearn/builds/
   - Click on failed build
   - Check error messages

### Common Errors

**Error: "Not logged in"**
- Solution: Run `eas login`

**Error: "EAS CLI not found"**
- Solution: `npm install -g eas-cli`

**Error: "Build failed"**
- Check build logs on Expo dashboard
- Make sure all dependencies are installed
- Verify `app.json` and `eas.json` are correct

---

## ✅ Current Configuration

Your app is configured with:
- ✅ **Package:** `com.nepearn.app`
- ✅ **Version:** `1.0.0`
- ✅ **Android SDK:** 34
- ✅ **Min SDK:** 21
- ✅ **AdMob:** Configured
- ✅ **API URL:** `https://earning-backend-production.up.railway.app`

---

## 🚀 Ready to Build!

Run these commands:

```bash
cd mobile
npm install
eas login
eas build --platform android --profile preview
```

**Build time:** 10-20 minutes  
**Result:** Downloadable APK file

---

**Good luck with your build!** 🎉

