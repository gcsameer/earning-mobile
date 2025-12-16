# 🔄 EAS Update Guide

## ⚠️ Windows Issue

There's a known Windows issue with `eas update` command where it tries to create directories with colons in the name (like `node:sea`), which Windows doesn't allow.

## ✅ Solution: Push Updates After Build

EAS Update is typically used for **over-the-air (OTA) updates** after your app is already built and deployed. 

### Step 1: Build Production APK First

```bash
cd mobile
eas build --platform android --profile production
```

### Step 2: After Build Completes

Once you have a production build, you can push updates using:

```bash
# For production branch
eas update --branch production --message "Update description"

# For preview branch  
eas update --branch preview --message "Update description"
```

## 🔄 How EAS Update Works

1. **Build APK** - Users install the APK (contains native code)
2. **Push Updates** - Use `eas update` to push JavaScript/asset updates
3. **Users Get Updates** - App automatically downloads and applies updates

## 📋 Update Workflow

### Initial Release
```bash
# 1. Build production APK
eas build --platform android --profile production

# 2. Distribute APK to users
```

### Future Updates (No Rebuild Needed)
```bash
# 1. Make code changes
# 2. Push update (no rebuild needed!)
eas update --branch production --message "Added new feature"

# Users get update automatically
```

## 🎯 When to Use EAS Update

✅ **Use EAS Update for:**
- JavaScript code changes
- React component updates
- Asset updates (images, fonts)
- Bug fixes
- Feature additions

❌ **Need New Build for:**
- Native code changes
- New native dependencies
- App configuration changes (app.json)
- Version number changes

## 🔧 Workaround for Windows

If you need to push updates on Windows:

1. **Use WSL (Windows Subsystem for Linux)**
   ```bash
   wsl
   cd /mnt/c/Users/sgc59/OneDrive/Desktop/earning-app/mobile
   eas update --branch production
   ```

2. **Or use GitHub Actions** (automated)
   - Set up CI/CD to push updates automatically

3. **Or wait until after build** (recommended)
   - Build APK first
   - Then push updates as needed

## 📝 Current Status

✅ **EAS Update is configured:**
- `expo-updates` installed
- Update URL configured
- Runtime version set to app version

⚠️ **Windows Issue:**
- Cannot run `eas update` directly on Windows
- Use WSL or push updates after build

## 🚀 Next Steps

1. **Build Production APK:**
   ```bash
   eas build --platform android --profile production
   ```

2. **After build, push updates (using WSL or after deployment):**
   ```bash
   eas update --branch production --message "Initial production release"
   ```

---

**For now, focus on building the production APK. Updates can be pushed later!** 🎯

