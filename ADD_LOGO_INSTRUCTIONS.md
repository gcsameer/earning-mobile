# 🎨 Add NepEarn Logo to Mobile App

## Step 1: Prepare the Logo Image

You need to convert the NepEarn logo to the required sizes:

1. **icon.png** - 1024x1024 pixels (square)
2. **adaptive-icon.png** - 1024x1024 pixels (square, with safe zone)
3. **splash.png** - 1242x2436 pixels (portrait)

## Step 2: Use Online Tool (Recommended)

1. Go to: https://www.appicon.co/
2. Upload your NepEarn logo image
3. Select sizes:
   - iOS: 1024x1024
   - Android: 1024x1024
   - Splash: 1242x2436
4. Download the generated files

## Step 3: Place Files

Place the generated files in `mobile/assets/`:
- `icon.png` (1024x1024)
- `adaptive-icon.png` (1024x1024)
- `splash.png` (1242x2436)

## Step 4: Update app.json

The app.json will automatically use these files if they exist in the assets folder.

## Step 5: Build

```bash
cd mobile
eas build --platform android --profile preview
```

The APK will now have the NepEarn logo as the app icon!

---

## Quick Alternative: Use Image Directly

If you have the logo image file, you can:

1. Resize it to 1024x1024 using any image editor
2. Save as `mobile/assets/icon.png`
3. Copy the same file as `mobile/assets/adaptive-icon.png`
4. Create a splash screen (1242x2436) with the logo centered
5. Save as `mobile/assets/splash.png`

Then build the APK!

