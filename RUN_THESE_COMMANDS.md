# 🚀 Run These Commands to Build APK

## ✅ Already Completed Automatically

- ✅ Dependencies installed (`npm install`)
- ✅ Git repository initialized
- ✅ EAS CLI installed globally
- ✅ All code committed

---

## 📋 Commands You Need to Run (Manual Steps)

### Step 1: Login to Expo (Interactive)

Open terminal in the `mobile` directory and run:

```bash
cd mobile
eas login
```

Enter your Expo account email and password. If you don't have an account, create one at https://expo.dev

### Step 2: Configure EAS Build (One-time setup)

```bash
eas build:configure
```

This will create/update `eas.json` if needed.

### Step 3: Build APK

```bash
eas build --platform android --profile preview
```

**This will:**
- Upload your code to Expo servers
- Build the APK (takes 10-20 minutes)
- Provide a download link when complete

**You'll see output like:**
```
Build started, it may take a few minutes to complete.
...
Build finished. Download: https://expo.dev/artifacts/...
```

### Step 4: Download APK

1. Copy the download URL from the terminal
2. Open in browser and download the `.apk` file
3. Save it as `nep-earn.apk`

### Step 5: Host APK

**Option A: Upload to CDN (Recommended)**

1. Upload `nep-earn.apk` to:
   - Firebase Hosting
   - AWS S3
   - Google Drive (get public link)
   - GitHub Releases
   - Any file hosting service

2. Get the direct download URL

3. Go to Vercel → Your Project → Settings → Environment Variables
4. Add:
   ```
   APK_DOWNLOAD_URL=https://your-cdn-url.com/nep-earn.apk
   ```

**Option B: Use Public Folder**

1. Copy `nep-earn.apk` to `frontend/public/nep-earn.apk`
2. No environment variable needed

### Step 6: Redeploy Frontend (if using CDN)

If you set `APK_DOWNLOAD_URL` in Vercel:
1. Go to Vercel → Your Project → Deployments
2. Click "Redeploy"

---

## 📋 Complete Command List

```bash
# 1. Navigate to mobile directory
cd mobile

# 2. Login to Expo (interactive - enter credentials)
eas login

# 3. Configure EAS (one-time)
eas build:configure

# 4. Build APK (takes 10-20 minutes)
eas build --platform android --profile preview

# 5. Download APK from the link provided
# 6. Host APK (upload to CDN or copy to frontend/public/)
# 7. Set APK_DOWNLOAD_URL in Vercel (if using CDN)
# 8. Redeploy frontend (if using CDN)
```

---

## ✅ What's Already Done

- ✅ All dependencies installed
- ✅ AdMob SDK integrated
- ✅ Ad components created
- ✅ Ads added to screens
- ✅ Dashboard download button ready
- ✅ APK download API route ready
- ✅ EAS build config ready (`eas.json`)

---

## 🎯 You Just Need To

1. **Login:** `eas login` (requires your Expo account)
2. **Build:** `eas build --platform android --profile preview`
3. **Download:** Get APK from the link
4. **Host:** Upload to CDN or public folder
5. **Configure:** Set `APK_DOWNLOAD_URL` in Vercel (if using CDN)

Everything else is automated! 🎉

---

## 💡 Tips

- **Expo Account:** Free account works fine
- **Build Time:** Usually 10-20 minutes
- **APK Size:** ~25-30 MB
- **CDN Recommended:** Better performance than public folder

---

## 🆘 Troubleshooting

### "EAS CLI not found"
```bash
npm install -g eas-cli
```

### "Not logged in"
```bash
eas login
```

### "Build failed"
- Check `app.json` for errors
- Ensure all dependencies installed
- Check Expo account status

---

## 📱 After APK is Ready

1. Users can download from dashboard
2. Install APK on Android devices
3. Ads will show in the app
4. All features work on mobile

The mobile app is ready - just build and host the APK!

