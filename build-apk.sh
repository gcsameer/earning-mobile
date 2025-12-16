#!/bin/bash

echo "========================================"
echo "  NepEarn APK Builder"
echo "========================================"
echo ""

echo "Step 1: Checking EAS CLI..."
if ! command -v eas &> /dev/null; then
    echo "EAS CLI not found. Installing..."
    npm install -g eas-cli
    if [ $? -ne 0 ]; then
        echo "Failed to install EAS CLI. Please install manually: npm install -g eas-cli"
        exit 1
    fi
else
    echo "EAS CLI is installed."
fi
echo ""

echo "Step 2: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install dependencies."
    exit 1
fi
echo ""

echo "Step 3: Checking Expo login..."
eas whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "Not logged in to Expo. Please login..."
    eas login
    if [ $? -ne 0 ]; then
        echo "Failed to login. Please try again."
        exit 1
    fi
else
    echo "Already logged in to Expo."
fi
echo ""

echo "Step 4: Building APK..."
echo "This will take 10-20 minutes..."
echo ""
eas build --platform android --profile preview

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "  Build completed successfully!"
    echo "========================================"
    echo ""
    echo "Check the output above for the download link."
    echo ""
else
    echo ""
    echo "========================================"
    echo "  Build failed!"
    echo "========================================"
    echo ""
    echo "Check the error messages above."
    echo "Visit: https://expo.dev/accounts/breakout8848s-organization/projects/nepearn/builds/"
    echo ""
fi

