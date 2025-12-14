# ⚡ Quick APK Build - Run These Commands

## ✅ Already Done
- ✅ Dependencies installed
- ✅ Git repository initialized
- ✅ EAS build configured

---

## 🚀 Next Steps (Manual - Requires Login)

### Step 1: Login to Expo

```bash
cd mobile
eas login
```

Enter your Expo account credentials (or create account if needed).

### Step 2: Build APK

```bash
eas build --platform android --profile preview
```

This will:
- Build APK on Expo servers
- Take 10-20 minutes
- Provide download link when complete

### Step 3: Download APK

After build completes, you'll get a download link. Download the `.apk` file.

### Step 4: Host APK

**Option A: Upload to CDN**
1. Upload APK to Firebase Hosting, AWS S3, or any file host
2. Get direct download URL
3. Set in Vercel: `APK_DOWNLOAD_URL=https://your-url.com/nep-earn.apk`

**Option B: Use Public Folder**
1. Copy APK to `frontend/public/nep-earn.apk`
2. Download will work automatically

### Step 5: Redeploy Frontend (if using CDN)

If you set `APK_DOWNLOAD_URL` in Vercel:
1. Go to Vercel → Your Project
2. Redeploy to apply environment variable

---

## 📋 Commands Summary

```bash
# 1. Login (interactive - you need to do this)
cd mobile
eas login

# 2. Build APK (takes 10-20 minutes)
eas build --platform android --profile preview

# 3. Download APK from the link provided
# 4. Host APK (CDN or public folder)
# 5. Set APK_DOWNLOAD_URL in Vercel (if using CDN)
# 6. Redeploy frontend (if using CDN)
```

---

## ✅ What's Ready

- ✅ Mobile app code with AdMob integration
- ✅ Ad components created and integrated
- ✅ EAS build configuration ready
- ✅ Dashboard download button ready
- ✅ APK download API route ready

---

## 🎯 Just Need To

1. **Login to Expo** (`eas login`)
2. **Build APK** (`eas build --platform android --profile preview`)
3. **Host APK** (upload to CDN or public folder)
4. **Set environment variable** (if using CDN)

Everything else is done! 🎉

