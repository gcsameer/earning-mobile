/**
 * Generate placeholder assets for Expo app
 * Run: node generate-assets.js
 */

const fs = require('fs');
const path = require('path');

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// For now, we'll create a note file explaining the assets are needed
// In production, you should replace these with actual designed assets
const note = `# Assets Required

This directory should contain:
- icon.png (1024x1024) - App icon
- adaptive-icon.png (1024x1024) - Android adaptive icon
- splash.png (1242x2436) - Splash screen
- favicon.png (48x48) - Web favicon

For now, using Expo's default assets by updating app.json.
`;

fs.writeFileSync(path.join(assetsDir, 'README.md'), note);

console.log('✅ Assets directory created');
console.log('⚠️  You need to add actual asset files or use Expo defaults');

