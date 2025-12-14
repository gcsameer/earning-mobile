# NepEarn Mobile App

React Native mobile application for NepEarn - Earn money by completing tasks.

## Features

- ✅ User authentication (Login/Register)
- ✅ Dashboard with balance overview
- ✅ Task management
- ✅ Wallet and transaction history
- ✅ Referral system
- ✅ Withdrawal requests
- ✅ CPX Research offerwall integration
- ✅ Offline support (via PWA features)

## Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS) or Android Studio (for Android)

## Installation

1. Install dependencies:
   ```bash
   cd mobile
   npm install
   ```

2. Configure API endpoint:
   - Update `app.json` with your backend URL:
     ```json
     "extra": {
       "apiBaseUrl": "https://your-backend-url.railway.app"
     }
     ```
   - Or set environment variable:
     ```bash
     export EXPO_PUBLIC_API_BASE_URL=https://your-backend-url.railway.app
     ```

## Running the App

### Development

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web
```

### Building for Production

#### iOS

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios
```

#### Android

```bash
# Build for Android
eas build --platform android
```

## Project Structure

```
mobile/
├── App.js                 # Main app entry point
├── app.json              # Expo configuration
├── package.json
├── babel.config.js
└── src/
    ├── config/
    │   └── api.js        # API client configuration
    ├── context/
    │   └── AuthContext.js # Authentication context
    ├── navigation/
    │   └── AppNavigator.js # Navigation setup
    └── screens/
        ├── LoginScreen.js
        ├── RegisterScreen.js
        ├── DashboardScreen.js
        ├── TasksScreen.js
        ├── WalletScreen.js
        ├── ReferralsScreen.js
        ├── OfferwallScreen.js
        └── WithdrawScreen.js
```

## API Integration

The mobile app uses the same backend API as the web application. All endpoints are configured in `src/config/api.js`.

### Authentication

- Tokens are stored securely using AsyncStorage
- Automatic token refresh on 401 errors
- Token management functions: `setTokens`, `getAccessToken`, `clearTokens`

### API Endpoints

- `/api/auth/token/` - Login
- `/api/auth/register/` - Register
- `/api/me/` - Get user profile
- `/api/tasks/` - List tasks
- `/api/wallet/` - Get wallet balance
- `/api/withdraw/` - Submit withdrawal
- `/api/referrals/` - Get referral data
- `/api/cpx/wall/` - Get offerwall URL

## Environment Variables

Set these in `app.json` or as environment variables:

- `EXPO_PUBLIC_API_BASE_URL` - Backend API base URL (without /api)

## Features

### Authentication
- Secure token storage
- Automatic token refresh
- Login/Register screens
- Protected routes

### Dashboard
- Balance overview
- Quick actions
- Referral code display

### Tasks
- List available tasks
- Start tasks
- Task completion tracking

### Wallet
- Balance display
- Transaction history
- Withdrawal requests

### Referrals
- Referral code sharing
- Referral statistics
- Referred users list

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify `EXPO_PUBLIC_API_BASE_URL` is set correctly
   - Check backend is running and accessible
   - Verify CORS settings on backend

2. **Build Errors**
   - Clear cache: `expo start -c`
   - Delete `node_modules` and reinstall
   - Check Node.js version compatibility

3. **Token Issues**
   - Clear app data and re-login
   - Verify backend JWT settings
   - Check token expiration times

## Development Tips

- Use Expo Go app for quick testing on physical devices
- Enable remote debugging in Expo DevTools
- Use React Native Debugger for advanced debugging
- Test on both iOS and Android regularly

## Deployment

### App Store (iOS)

1. Build with EAS: `eas build --platform ios`
2. Submit to App Store Connect
3. Wait for review

### Google Play (Android)

1. Build with EAS: `eas build --platform android`
2. Upload APK/AAB to Google Play Console
3. Wait for review

## Support

For issues or questions:
- Check backend API is running
- Verify environment variables
- Review Expo documentation: https://docs.expo.dev

