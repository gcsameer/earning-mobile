# 📱 Build APK and Update Download Link

## Step 1: Build the APK

Run this command to build the APK:

```bash
cd mobile
eas build --platform android --profile preview
```

This will:
1. Build the APK with all latest features
2. Upload it to Expo's servers
3. Provide a download link

## Step 2: Get the APK Download Link

After the build completes, you'll get a link like:
```
https://expo.dev/artifacts/eas/abc123.../build.apk
```

Copy this link.

## Step 3: Update Vercel Environment Variable

1. Go to: https://vercel.com/dashboard
2. Find your **NepEarn** frontend project
3. Go to **Settings** → **Environment Variables**
4. Add/Update:
   - **Name:** `NEXT_PUBLIC_APK_DOWNLOAD_URL`
   - **Value:** `https://expo.dev/artifacts/eas/.../build.apk` (your APK link)
   - **Environment:** All (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** the frontend

## Step 4: Verify

1. Visit your frontend URL
2. Go to Dashboard
3. Click "Download APK" button
4. APK should download automatically

---

## 🎨 App Icon

The NepEarn logo has been added to:
- `mobile/assets/icon.png` (1024x1024)
- `mobile/assets/adaptive-icon.png` (1024x1024)
- `frontend/public/logo.png` (for web)

The app will use the NepEarn logo as the icon when built.

---

## ✅ What's Included in the APK

- ✅ All game tasks (Scratch Card, Spin Wheel, Puzzle, Quiz)
- ✅ Daily bonus claiming
- ✅ Login streak tracking
- ✅ Analytics dashboard
- ✅ Email validation
- ✅ Show/hide password
- ✅ CPX and Tapjoy offerwalls
- ✅ AdMob integration (placeholder components)
- ✅ All frontend and backend features synced
- ✅ NepEarn logo as app icon

---

## 📋 Quick Commands

```bash
# Build APK
cd mobile
eas build --platform android --profile preview

# After build, get the link and add to Vercel:
# NEXT_PUBLIC_APK_DOWNLOAD_URL = https://expo.dev/artifacts/eas/.../build.apk
```

---

**Once you build and get the APK link, update the Vercel environment variable and the download button will work!** 🚀

