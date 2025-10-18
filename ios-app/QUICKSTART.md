# Quick Start Guide - ImageStory AI iOS App

## ⚡ Fastest Way to Run

### Step 1: Open Xcode (2 minutes)

```bash
# Navigate to the ios-app directory
cd ios-app

# Open Xcode
open -a Xcode
```

### Step 2: Create New Project in Xcode

1. **File → New → Project**
2. Choose **iOS → App**
3. Settings:
   - **Product Name**: `ImageStoryApp`
   - **Team**: Your Apple Developer Team
   - **Organization ID**: `com.yourname` (or any ID)
   - **Interface**: `SwiftUI`
   - **Language**: `Swift`
4. **Save in**: The `ios-app` folder (alongside the `ImageStoryApp` folder)

### Step 3: Replace Default Files

1. **Delete these default files** (right-click → Delete):
   - `ContentView.swift` (the auto-generated one)
   - `ImageStoryAppApp.swift` (the auto-generated one)

2. **Add our files**:
   - Drag the entire `ImageStoryApp/ImageStoryApp` folder into your project
   - Check "Copy items if needed"
   - Check "Create groups"

### Step 4: Configure Signing

1. Select **ImageStoryApp** project in navigator
2. Select **ImageStoryApp** target
3. **Signing & Capabilities** tab:
   - Enable "Automatically manage signing"
   - Select your Team

### Step 5: Run! 🚀

1. Select **iPhone 15 Pro** simulator (or any iPhone)
2. Click **Run** (▶️) or press `Cmd + R`

## What You'll See

1. **Loading screen**: White screen with purple loading indicator
2. **Signup page**: Your web app's signup page loads instantly
3. **Full functionality**: Users can signup, login, create stories, generate images

## Files Created

```
ios-app/
├── README.md                          # Full documentation
├── QUICKSTART.md                      # This file
└── ImageStoryApp/
    └── ImageStoryApp/
        ├── ImageStoryAppApp.swift     # App entry point
        ├── ContentView.swift          # Main view with loading
        ├── WebView.swift              # WKWebView wrapper
        ├── Info.plist                 # Permissions & config
        └── Assets.xcassets/           # App icons & colors
```

## Key Features

✅ **Direct to Signup**: Opens `/signup` page immediately
✅ **Full Navigation**: Back/forward gestures work
✅ **Persistent Sessions**: Login state persists
✅ **Loading Indicator**: Beautiful purple loading screen
✅ **Network Permissions**: Pre-configured for API access

## Current Configuration

- **Web URL**: `https://image-story-r0sp1mdaw-cans-projects-8d11bd8a.vercel.app/signup`
- **Min iOS**: 16.0
- **Supports**: iPhone & iPad
- **Orientations**: Portrait & Landscape

## Update Web URL

If you deploy a new version:

**Edit `ContentView.swift`:**
```swift
private let webURL = URL(string: "YOUR_NEW_URL/signup")!
```

## Troubleshooting

**"No Team"**: Add Apple ID in Xcode Preferences → Accounts
**"Cannot connect"**: Check if web URL is accessible in Safari
**"Blank screen"**: Verify the webURL in ContentView.swift

## Next Steps

- **Customize Icon**: Add app icons in Assets.xcassets → AppIcon
- **Change Colors**: Edit AccentColor in Assets.xcassets
- **TestFlight**: Product → Archive → Distribute → TestFlight
- **App Store**: Submit through App Store Connect

## Need Help?

Check the full [README.md](./README.md) for detailed documentation.

---

**Ready to build your iOS app? Start with Step 1! 🎉**
