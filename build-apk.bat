@echo off
echo ========================================
echo   NepEarn APK Builder
echo ========================================
echo.

echo Step 1: Checking EAS CLI...
where eas >nul 2>&1
if %errorlevel% neq 0 (
    echo EAS CLI not found. Installing...
    call npm install -g eas-cli
    if %errorlevel% neq 0 (
        echo Failed to install EAS CLI. Please install manually: npm install -g eas-cli
        pause
        exit /b 1
    )
) else (
    echo EAS CLI is installed.
)
echo.

echo Step 2: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Failed to install dependencies.
    pause
    exit /b 1
)
echo.

echo Step 3: Checking Expo login...
call eas whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo Not logged in to Expo. Please login...
    call eas login
    if %errorlevel% neq 0 (
        echo Failed to login. Please try again.
        pause
        exit /b 1
    )
) else (
    echo Already logged in to Expo.
)
echo.

echo Step 4: Building APK...
echo This will take 10-20 minutes...
echo.
call eas build --platform android --profile preview

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   Build completed successfully!
    echo ========================================
    echo.
    echo Check the output above for the download link.
    echo.
) else (
    echo.
    echo ========================================
    echo   Build failed!
    echo ========================================
    echo.
    echo Check the error messages above.
    echo Visit: https://expo.dev/accounts/breakout8848s-organization/projects/nepearn/builds/
    echo.
)

pause

