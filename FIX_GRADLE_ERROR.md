# 🔧 Fix Gradle Build Error

## Problem
Build passed prebuild but failed during Gradle build:
```
✖ Build failed
🤖 Android build failed:
Gradle build failed with unknown error. See logs for the "Run gradlew" phase.
```

## Common Causes

1. **AdMob Plugin Compatibility** - `react-native-google-mobile-ads` may have compatibility issues
2. **Missing Android Configuration** - Missing permissions or Google Services
3. **Gradle Version Conflicts** - Dependency version mismatches
4. **Missing google-services.json** - Required for AdMob

## ✅ Solution 1: Temporarily Remove AdMob Plugin (Test)

To test if AdMob is causing the issue, temporarily remove it:

### Step 1: Comment out AdMob plugin in `app.json`
```json
{
  "expo": {
    "plugins": [
      // Temporarily disabled for testing
      // [
      //   "react-native-google-mobile-ads",
      //   {
      //     "androidAppId": "ca-app-pub-8858320671117320~8435057976",
      //     "iosAppId": "ca-app-pub-8858320671117320~8435057976"
      //   }
      // ]
    ]
  }
}
```

### Step 2: Try building again
```bash
eas build --platform android --profile preview
```

If build succeeds, AdMob is the issue. Proceed to Solution 2.

## ✅ Solution 2: Fix AdMob Configuration

### Option A: Update AdMob Plugin Version

Check if there's a newer version compatible with Expo SDK 50:
```bash
cd mobile
npm install react-native-google-mobile-ads@latest
```

### Option B: Add Google Services File

1. Download `google-services.json` from Firebase Console
2. Place in `mobile/google-services.json`
3. Update `app.json` (already done):
```json
{
  "android": {
    "googleServicesFile": "./google-services.json"
  }
}
```

### Option C: Use Expo Config Plugin

Update `app.json` to use Expo's AdMob config plugin:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 34,
            "targetSdkVersion": 34,
            "buildToolsVersion": "34.0.0"
          }
        }
      ],
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": "ca-app-pub-8858320671117320~8435057976",
          "iosAppId": "ca-app-pub-8858320671117320~8435057976"
        }
      ]
    ]
  }
}
```

## ✅ Solution 3: Add Build Properties

Install `expo-build-properties`:
```bash
cd mobile
npm install expo-build-properties
```

Update `app.json`:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 34,
            "targetSdkVersion": 34,
            "minSdkVersion": 21
          }
        }
      ],
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": "ca-app-pub-8858320671117320~8435057976",
          "iosAppId": "ca-app-pub-8858320671117320~8435057976"
        }
      ]
    ]
  }
}
```

## ✅ Solution 4: Check Build Logs

1. Go to: https://expo.dev/accounts/breakout8848s-organization/projects/nepearn/builds/
2. Click on the failed build
3. Check the "Run gradlew" phase logs
4. Look for specific error messages like:
   - "Could not resolve dependency"
   - "Plugin with id 'com.google.gms.google-services' not found"
   - "Missing class" errors
   - Version conflicts

## 🚀 Recommended Steps

1. **First**: Check the build logs to see the exact error
2. **Second**: Try Solution 1 (remove AdMob temporarily) to confirm it's the issue
3. **Third**: If AdMob is the issue, try Solution 3 (add expo-build-properties)
4. **Fourth**: If still failing, check AdMob plugin documentation for Expo SDK 50 compatibility

## 📋 Quick Fix Commands

```bash
# Install expo-build-properties
cd mobile
npm install expo-build-properties

# Update app.json with build properties (see Solution 3)
# Then try building again
eas build --platform android --profile preview
```

## ⚠️ Important Notes

- **Expo SDK 50** may have compatibility issues with some plugins
- **AdMob SDK** requires proper Android configuration
- **Google Services** file may be required for AdMob
- Check the **exact error** in build logs for specific fixes

## 🔍 Next Steps

1. Check build logs for specific error
2. Try removing AdMob plugin temporarily
3. If build succeeds without AdMob, fix AdMob configuration
4. If build still fails, check dependency versions

---

**The key is to identify the exact Gradle error from the build logs!**

