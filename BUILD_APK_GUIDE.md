# 📱 Build APK Guide - NepEarn Mobile App

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Expo CLI** (`npm install -g expo-cli`)
3. **EAS CLI** (`npm install -g eas-cli`) - For building APK
4. **Expo Account** (free account works)

---

## ✅ Step 1: Install Dependencies

```bash
cd mobile
npm install
```

This will install:
- React Native dependencies
- Navigation libraries
- **react-native-google-mobile-ads** (AdMob SDK)

---

## ✅ Step 2: Configure AdMob

Your AdMob IDs are already configured in `app.json`:
- **App ID:** `ca-app-pub-8858320671117320~8435057976`
- **Banner Ad Unit:** `ca-app-pub-8858320671117320/6142924791`
- **Rewarded Ad Unit:** `ca-app-pub-8858320671117320/6166975524`

---

## ✅ Step 3: Login to Expo

```bash
eas login
```

Enter your Expo account credentials.

---

## ✅ Step 4: Configure EAS Build

```bash
eas build:configure
```

This will create `eas.json` configuration file.

---

## ✅ Step 5: Build APK for Android

### Option A: Build on Expo Servers (Recommended)

```bash
eas build --platform android --profile preview
```

This will:
- Build the APK on Expo's servers
- Take 10-20 minutes
- Provide a download link when complete

### Option B: Build Locally (Advanced)

```bash
eas build --platform android --profile preview --local
```

**Note:** Requires Android SDK and more setup.

---

## ✅ Step 6: Download APK

After build completes:

1. You'll get a download link in the terminal
2. Or check: https://expo.dev/accounts/[your-username]/builds
3. Download the `.apk` file

---

## ✅ Step 7: Host APK for Download

### Option 1: Upload to CDN/File Hosting

1. Upload APK to:
   - **Firebase Hosting**
   - **AWS S3**
   - **Google Drive** (public link)
   - **GitHub Releases**
   - Any file hosting service

2. Get the direct download URL

3. Set in Vercel environment variable:
   ```
   APK_DOWNLOAD_URL=https://your-cdn-url.com/nep-earn.apk
   ```

### Option 2: Use Vercel Public Folder

1. Place APK in `frontend/public/nep-earn.apk`
2. The download link will work automatically
3. **Note:** Vercel has file size limits (100MB for free tier)

---

## ✅ Step 8: Update Dashboard Download Link

The dashboard already has the download button. It will:
- Use `APK_DOWNLOAD_URL` from environment variables if set
- Fallback to `/nep-earn.apk` from public folder

---

## 📋 Build Configuration

The `app.json` is already configured with:
- App name: "NepEarn"
- Package: `com.nepearn.app`
- AdMob App ID: `ca-app-pub-8858320671117320~8435057976`

---

## 🎯 Ad Integration

Ads are integrated in:
- **Dashboard Screen** - Banner ad at bottom
- **Tasks Screen** - Banner ads at top, every 3rd task, and bottom
- **Ad Components:**
  - `AdBanner.js` - Banner ads
  - `RewardedAd.js` - Rewarded ads (for future use)

---

## 🔍 Testing Ads

### Development/Testing

AdMob provides test ad unit IDs:
- **Test Banner:** `ca-app-pub-3940256099942544/6300978111`
- **Test Rewarded:** `ca-app-pub-3940256099942544/5224354917`

You can temporarily use these in development.

### Production

Use your actual ad unit IDs:
- **Banner:** `ca-app-pub-8858320671117320/6142924791`
- **Rewarded:** `ca-app-pub-8858320671117320/6166975524`

---

## 📱 APK Features

The APK includes:
- ✅ Full authentication (login/register)
- ✅ Task management
- ✅ Wallet and transactions
- ✅ Referral system
- ✅ Offerwall integration
- ✅ **AdMob ads** (banner and rewarded)
- ✅ Dark theme UI
- ✅ Offline support (cached data)

---

## 🚨 Important Notes

1. **AdMob Approval:** Ads may not show until your AdMob account is approved (24-48 hours)

2. **APK Size:** The APK will be ~25-30 MB (includes React Native runtime)

3. **Updates:** To update the app:
   - Build new APK
   - Upload to same location
   - Users need to download and install new version

4. **Play Store:** For Play Store distribution, you'll need:
   - Signed APK (EAS can handle this)
   - Play Store Developer account ($25 one-time)
   - Additional configuration

---

## 📋 Quick Checklist

- [ ] Installed dependencies (`npm install`)
- [ ] Logged into Expo (`eas login`)
- [ ] Configured EAS build (`eas build:configure`)
- [ ] Built APK (`eas build --platform android --profile preview`)
- [ ] Downloaded APK
- [ ] Hosted APK on CDN or public folder
- [ ] Set `APK_DOWNLOAD_URL` in Vercel (if using CDN)
- [ ] Tested download from dashboard
- [ ] Verified ads show in app

---

## 💡 Troubleshooting

### Build Fails

1. Check `app.json` for errors
2. Ensure all dependencies are installed
3. Check Expo account status

### Ads Not Showing

1. Verify AdMob account is approved
2. Check ad unit IDs are correct
3. Wait 24-48 hours after AdMob setup
4. Use test ad IDs for development

### APK Download Fails

1. Check `APK_DOWNLOAD_URL` is set correctly
2. Verify APK file exists in public folder
3. Check file permissions
4. Verify CDN URL is accessible

---

## 🎉 Success!

Once the APK is built and hosted:
1. Users can download from dashboard
2. Ads will show in the mobile app
3. All features work offline (with cached data)

The mobile app is ready for distribution!

