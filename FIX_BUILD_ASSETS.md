# 🔧 Fixed: Build Error - Missing Assets

## Problem
Build failed because `app.json` referenced asset files that don't exist:
- `./assets/icon.png` ❌
- `./assets/splash.png` ❌
- `./assets/adaptive-icon.png` ❌
- `./assets/favicon.png` ❌

## ✅ Solution Applied

Removed asset file references from `app.json` so the build can proceed. The app will now use:
- **Icon:** Expo's default icon
- **Splash:** Solid color background (#0f172a)
- **Adaptive Icon:** Solid color background (#0f172a)
- **Favicon:** Expo's default

## 🚀 Build Now

Try building again:
```bash
cd mobile
eas build --platform android --profile preview
```

## 📝 Add Logo Later

Once you have the NepEarn logo files:

1. Place files in `mobile/assets/`:
   - `icon.png` (1024x1024)
   - `adaptive-icon.png` (1024x1024)
   - `splash.png` (1242x2436)
   - `favicon.png` (48x48)

2. Update `app.json` to add back:
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

3. Rebuild the APK

---

**The build should now work!** 🎉

