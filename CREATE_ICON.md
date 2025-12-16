# 🎨 Quick Fix: Create App Icon

The build needs an icon file. Here's the fastest way to create one:

## Option 1: Use Online Generator (Fastest - 2 minutes)

1. Go to: https://www.appicon.co/
2. Upload any square image (or use their generator)
3. Download the 1024x1024 icon
4. Save as `mobile/assets/icon.png`

## Option 2: Use Expo's Default (Temporary)

For now, we can use Expo's default icon by removing the icon property, but it's better to add a real icon.

## Option 3: Create Simple Icon (5 minutes)

1. Open any image editor (Paint, Photoshop, GIMP, etc.)
2. Create a 1024x1024 image
3. Fill with your brand color (#10b981 - emerald green)
4. Add text "NE" or your logo
5. Export as PNG
6. Save as `mobile/assets/icon.png`

## Required Files

Place these in `mobile/assets/`:
- `icon.png` (1024x1024) - **REQUIRED for build**
- `adaptive-icon.png` (1024x1024) - Optional (can use same as icon)
- `splash.png` (1242x2436) - Optional
- `favicon.png` (48x48) - Optional

## After Adding Icon

The build should work! Try:
```bash
eas build --platform android --profile preview
```

