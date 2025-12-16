# 🔧 Fix Expo Build Error

## Problem
Build failed during prebuild phase with "Unknown error" in Prebuild build phase.

## Root Cause
The build was failing because:
1. **Missing asset files** - `app.json` referenced asset files that didn't exist
2. **Asset paths** - Icon, splash, and favicon files were missing

## ✅ Solution Applied

### 1. Removed Asset File References
Updated `app.json` to remove references to missing asset files:
- Removed `icon: "./assets/icon.png"`
- Removed `splash.image: "./assets/splash.png"`
- Removed `adaptiveIcon.foregroundImage: "./assets/adaptive-icon.png"`
- Removed `web.favicon: "./assets/favicon.png"`

### 2. Kept Essential Configuration
- Kept `splash.backgroundColor` for splash screen
- Kept `adaptiveIcon.backgroundColor` for Android
- Kept all other app configuration

### 3. Created Assets Directory
Created `assets/` directory for future use.

## 📋 Next Steps

### Option 1: Use Default Expo Assets (Current)
The app will now use Expo's default assets. This allows the build to proceed.

### Option 2: Add Custom Assets (Recommended for Production)
1. Create or design your app icon (1024x1024 PNG)
2. Create splash screen image (1242x2436 PNG)
3. Create adaptive icon (1024x1024 PNG)
4. Create favicon (48x48 PNG)
5. Place all files in `mobile/assets/`
6. Update `app.json` to reference them:
   ```json
   {
     "expo": {
       "icon": "./assets/icon.png",
       "splash": {
         "image": "./assets/splash.png",
         "resizeMode": "contain",
         "backgroundColor": "#0f172a"
       },
       "android": {
         "adaptiveIcon": {
           "foregroundImage": "./assets/adaptive-icon.png",
           "backgroundColor": "#0f172a"
         }
       },
       "web": {
         "favicon": "./assets/favicon.png"
       }
     }
   }
   ```

## 🚀 Try Building Again

Now you can try building again:

```bash
cd mobile
eas build --platform android --profile preview
```

The build should proceed past the prebuild phase.

## ⚠️ Additional Checks

If build still fails, check:

1. **AdMob Plugin Compatibility**
   - Verify `react-native-google-mobile-ads` is compatible with Expo SDK 50
   - Check plugin configuration in `app.json`

2. **Dependencies**
   - Ensure all dependencies are installed: `npm install`
   - Check for version conflicts

3. **EAS Build Logs**
   - Check the build logs at: https://expo.dev/accounts/breakout8848s-organization/projects/nepearn/builds/
   - Look for specific error messages in the Prebuild phase

4. **Expo SDK Version**
   - Current: Expo SDK ~50.0.0
   - Ensure all plugins support this version

## 📝 Files Changed

- ✅ `mobile/app.json` - Removed asset file references
- ✅ `mobile/assets/` - Created directory
- ✅ `mobile/generate-assets.js` - Created helper script

## ✅ Status

**Fixed:** Asset file references removed. Build should now proceed.

**Next:** Try building again with `eas build --platform android --profile preview`

