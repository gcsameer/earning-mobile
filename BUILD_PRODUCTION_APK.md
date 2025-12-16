# 🚀 Build Production APK - Complete Guide

## ✅ Production Configuration Ready

The production build profile is now configured with:
- ✅ APK build type (for direct installation)
- ✅ Production API URL
- ✅ Release build configuration
- ✅ Node.js version specified
- ✅ All optimizations enabled

---

## 📋 Build Production APK

### Step 1: Login to Expo (if not already)

```bash
cd mobile
eas login
```

### Step 2: Build Production APK

```bash
eas build --platform android --profile production
```

**This will:**
- Build a production-ready APK
- Optimize for release
- Include all production settings
- Take 15-25 minutes
- Provide a download link when complete

---

## 📥 After Build Completes

### Step 3: Get Download Link

You'll see output like:
```
✅ Build finished!
📦 Download: https://expo.dev/artifacts/eas/abc123.../build.apk
```

**Copy this link** - this is your production APK download URL.

### Step 4: Update Frontend Download Link

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Find your **NepEarn** frontend project
3. Go to **Settings** → **Environment Variables**
4. Add/Update:
   - **Name:** `NEXT_PUBLIC_APK_DOWNLOAD_URL`
   - **Value:** `https://expo.dev/artifacts/eas/.../build.apk` (your APK link)
   - **Environment:** All (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** the frontend

### Step 5: Test Download

1. Visit your frontend URL
2. Go to Dashboard
3. Click "Download APK" button
4. APK should download automatically

---

## 🎯 Production APK Features

Your production APK includes:

- ✅ **All Game Tasks:** Scratch Card, Spin Wheel, Puzzle, Quiz
- ✅ **Daily Bonus:** Claim daily bonus coins
- ✅ **Login Streak:** Track login streak with rewards
- ✅ **Analytics:** View earnings statistics
- ✅ **Email Validation:** Real-time email verification
- ✅ **Show/Hide Password:** Toggle password visibility
- ✅ **Offerwalls:** CPX Research and Tapjoy
- ✅ **AdMob Ready:** Ad components integrated
- ✅ **Production API:** Connected to production backend
- ✅ **Optimized:** Release build optimizations
- ✅ **Version:** 1.0.0 (Version Code: 1)

---

## 📱 APK Details

- **Package Name:** `com.nepearn.app`
- **Version:** 1.0.0
- **Version Code:** 1
- **Min Android:** 5.0 (API 21)
- **Target Android:** 14 (API 34)
- **Build Type:** Release APK
- **Size:** ~25-30 MB

---

## 🔄 Update Version (For Future Builds)

When you need to release an update:

1. Update version in `app.json`:
   ```json
   {
     "version": "1.0.1",
     "versionCode": 2
   }
   ```

2. Build again:
   ```bash
   eas build --platform android --profile production
   ```

3. Update download link in Vercel

---

## ⚠️ Important Notes

1. **Production Build:** Uses `--profile production` (not preview)
2. **APK Format:** Direct installation file (not AAB for Play Store)
3. **Download Link:** Save the Expo artifact link
4. **Environment Variable:** Must set in Vercel for download to work
5. **Testing:** Test APK installation on a real Android device

---

## 🎉 Ready to Build!

Run this command to build your production APK:

```bash
cd mobile
eas build --platform android --profile production
```

**The production APK will be ready for distribution!** 🚀

---

## 📋 Quick Reference

```bash
# Build Production APK
cd mobile
eas build --platform android --profile production

# After build:
# 1. Copy APK download link
# 2. Add to Vercel: NEXT_PUBLIC_APK_DOWNLOAD_URL
# 3. Redeploy frontend
# 4. Test download button
```

---

**Your production APK is ready to build!** 🎯

