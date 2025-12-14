# Mobile App Assets

This document describes the required assets for the mobile app.

## Required Assets

### App Icons

Place these files in `mobile/assets/`:

1. **icon.png** (1024x1024)
   - Main app icon
   - Used for iOS and Android
   - Should be square with no transparency

2. **adaptive-icon.png** (1024x1024)
   - Android adaptive icon foreground
   - Should have safe zone (inner 80% of image)

3. **favicon.png** (48x48)
   - Web favicon
   - Used when running on web

### Splash Screen

1. **splash.png** (1242x2436 or 2048x2732)
   - Launch screen image
   - Should match app theme
   - Background color: #0f172a (dark slate)

## Design Guidelines

### Colors
- Primary: #10b981 (emerald green)
- Background: #0f172a (dark slate)
- Card: #1e293b (slate)
- Text: #ffffff (white)
- Secondary Text: #cbd5e1 (light slate)

### Icon Design Tips

1. **Keep it simple**: Icons should be recognizable at small sizes
2. **Use brand colors**: Incorporate the emerald green (#10b981)
3. **High contrast**: Ensure visibility on dark backgrounds
4. **No text**: Icons should work without text labels
5. **Consistent style**: Match the app's design language

## Generating Assets

### Using Online Tools

1. [App Icon Generator](https://www.appicon.co/)
   - Upload 1024x1024 source image
   - Download all required sizes

2. [Expo Asset Generator](https://github.com/expo/expo-cli)
   ```bash
   npx expo-asset-generator
   ```

### Manual Creation

1. Create source image (1024x1024)
2. Export as PNG
3. Place in `mobile/assets/` directory
4. Update `app.json` if using custom paths

## Current Status

⚠️ **Placeholder icons needed**

You need to create:
- [ ] `icon.png` (1024x1024)
- [ ] `adaptive-icon.png` (1024x1024)
- [ ] `splash.png` (1242x2436)
- [ ] `favicon.png` (48x48)

## Quick Start

1. Design app icon (1024x1024)
2. Use tool to generate all sizes
3. Place files in `mobile/assets/`
4. Test with `expo start`

## Resources

- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/app-icons)
- [Android Icon Guidelines](https://developer.android.com/guide/practices/ui_guidelines/icon_design)
- [Expo Asset Documentation](https://docs.expo.dev/guides/app-icons/)

