# 📱 Mobile App Setup - Complete Guide

## ✅ What's Been Done

1. ✅ **AdMob SDK Added** - `react-native-google-mobile-ads` in package.json
2. ✅ **AdMob Configured** - App ID added to `app.json`
3. ✅ **Ad Components Created:**
   - `AdBanner.js` - For banner ads
   - `RewardedAd.js` - For rewarded ads
4. ✅ **Ads Integrated in Screens:**
   - Dashboard - Banner ad at bottom
   - Tasks - Banner ads at top, every 3rd task, and bottom
5. ✅ **EAS Build Config** - `eas.json` created for APK building

---

## 📋 Your AdMob IDs

- **App ID:** `ca-app-pub-8858320671117320~8435057976`
- **Banner Ad Unit:** `ca-app-pub-8858320671117320/6142924791`
- **Rewarded Ad Unit:** `ca-app-pub-8858320671117320/6166975524`

These are already configured in the code!

---

## 🚀 Next Steps

### Step 1: Install Dependencies

```bash
cd mobile
npm install
```

This installs the AdMob SDK and all dependencies.

### Step 2: Build APK

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build --platform android --profile preview
```

This will:
- Build the APK on Expo's servers
- Take 10-20 minutes
- Provide a download link

### Step 3: Host APK

After building:

1. **Option A: Upload to CDN**
   - Upload APK to Firebase Hosting, AWS S3, or any file host
   - Get the direct download URL
   - Set in Vercel: `APK_DOWNLOAD_URL=https://your-url.com/nep-earn.apk`

2. **Option B: Use Public Folder**
   - Place APK in `frontend/public/nep-earn.apk`
   - Download will work automatically

### Step 4: Test Download

1. Go to dashboard on your website
2. Click "Download APK" button
3. APK should download

---

## 📱 Ad Placement in Mobile App

### Dashboard Screen
- Banner ad at the bottom

### Tasks Screen
- Banner ad at the top
- Banner ad after every 3rd task
- Banner ad at the bottom

### Future: Rewarded Ads
- Can be added to any screen using `<RewardedAdButton />` component

---

## 🔍 Testing Ads

### Development
Use test ad IDs (temporarily):
- Test Banner: `ca-app-pub-3940256099942544/6300978111`
- Test Rewarded: `ca-app-pub-3940256099942544/5224354917`

### Production
Your actual ad IDs are already configured:
- Banner: `ca-app-pub-8858320671117320/6142924791`
- Rewarded: `ca-app-pub-8858320671117320/6166975524`

---

## 📋 Files Changed

### Frontend
- ✅ `frontend/pages/dashboard.js` - Added download section
- ✅ `frontend/pages/api/download-apk.js` - APK download route

### Mobile App
- ✅ `mobile/package.json` - Added AdMob SDK
- ✅ `mobile/app.json` - Added AdMob app ID
- ✅ `mobile/src/components/AdBanner.js` - Banner ad component
- ✅ `mobile/src/components/RewardedAd.js` - Rewarded ad component
- ✅ `mobile/src/screens/DashboardScreen.js` - Added banner ad
- ✅ `mobile/src/screens/TasksScreen.js` - Added banner ads
- ✅ `mobile/eas.json` - EAS build configuration
- ✅ `mobile/BUILD_APK_GUIDE.md` - Complete build guide

---

## 🎯 Quick Start

1. **Install:** `cd mobile && npm install`
2. **Build:** `eas build --platform android --profile preview`
3. **Download:** Get APK from Expo dashboard
4. **Host:** Upload to CDN or public folder
5. **Set URL:** Add `APK_DOWNLOAD_URL` to Vercel (if using CDN)
6. **Test:** Download from dashboard

---

## 💡 Important Notes

1. **AdMob Approval:** Ads may take 24-48 hours to show after account approval
2. **APK Size:** ~25-30 MB (includes React Native runtime)
3. **Updates:** Users need to download new APK for updates
4. **Play Store:** For Play Store, you'll need additional setup

---

## ✅ Checklist

- [ ] Installed mobile dependencies
- [ ] Built APK with EAS
- [ ] Downloaded APK
- [ ] Hosted APK (CDN or public folder)
- [ ] Set `APK_DOWNLOAD_URL` in Vercel (if using CDN)
- [ ] Tested download from dashboard
- [ ] Verified ads show in mobile app

---

## 🆘 Need Help?

See `BUILD_APK_GUIDE.md` for detailed build instructions.

The mobile app is ready! Just build the APK and host it for download.

