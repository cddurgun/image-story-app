# ImageStory AI - iOS App

A native iOS app that wraps the ImageStory AI web application using WKWebView. The app opens directly to the signup page for new users.

## Requirements

- macOS with Xcode 14.0 or later
- iOS 16.0+ deployment target
- Apple Developer account (for device testing and App Store deployment)

## Project Structure

```
ios-app/
└── ImageStoryApp/
    └── ImageStoryApp/
        ├── ImageStoryAppApp.swift      # Main app entry point
        ├── ContentView.swift            # Main view with WebView
        ├── WebView.swift                # WKWebView wrapper
        ├── Info.plist                   # App configuration
        └── Assets.xcassets/             # App assets
            ├── AccentColor.colorset/
            └── AppIcon.appiconset/
```

## Setup Instructions

### Step 1: Open in Xcode

1. Open **Xcode**
2. Click **File → Open**
3. Navigate to the `ios-app/ImageStoryApp` folder
4. Select the `ImageStoryApp` folder (not individual files)
5. Click **Open**

### Step 2: Create Xcode Project

Since we've created the source files, you need to create an Xcode project:

1. In Xcode, go to **File → New → Project**
2. Select **iOS → App**
3. Click **Next**
4. Configure your project:
   - **Product Name**: ImageStoryApp
   - **Team**: Select your Apple Developer team
   - **Organization Identifier**: com.yourcompany (or your preferred identifier)
   - **Interface**: SwiftUI
   - **Language**: Swift
   - **Storage**: None
5. **Save the project in the `ios-app` directory**

### Step 3: Add Source Files

1. In Xcode's Project Navigator, **delete** these default files:
   - ContentView.swift (the default one)
   - ImageStoryAppApp.swift (the default one)

2. **Drag and drop** the files from the `ImageStoryApp/ImageStoryApp` folder:
   - ImageStoryAppApp.swift
   - ContentView.swift
   - WebView.swift
   - Info.plist
   - Assets.xcassets (entire folder)

3. When prompted, select:
   - ✅ Copy items if needed
   - ✅ Create groups
   - ✅ Add to targets: ImageStoryApp

### Step 4: Configure Project Settings

1. Select your project in the Project Navigator
2. Select the **ImageStoryApp** target
3. Go to **Signing & Capabilities** tab:
   - Enable **Automatically manage signing**
   - Select your **Team**
   - Xcode will automatically create a bundle identifier

4. Go to **General** tab:
   - Set **Minimum Deployments** to iOS 16.0 or later
   - Verify **Display Name** is "ImageStory AI"

5. Go to **Info** tab:
   - Verify the Info.plist is loaded correctly
   - Check that these keys exist:
     - NSAppTransportSecurity (for network access)
     - NSCameraUsageDescription
     - NSPhotoLibraryUsageDescription

### Step 5: Update Web URL (if needed)

If you deploy a new version of your web app to Vercel:

1. Open `ContentView.swift`
2. Update the `webURL` constant with your new deployment URL:
   ```swift
   private let webURL = URL(string: "YOUR_NEW_VERCEL_URL/signup")!
   ```

## Running the App

### On Simulator

1. Select an iPhone simulator from the device menu (e.g., "iPhone 15 Pro")
2. Click the **Run** button (▶️) or press **Cmd + R**
3. The app will launch in the simulator showing the signup page

### On Physical Device

1. Connect your iPhone via USB
2. Select your device from the device menu
3. Click the **Run** button (▶️)
4. On first run, you may need to:
   - Trust the developer certificate on your device
   - Go to **Settings → General → VPN & Device Management**
   - Trust your developer certificate

## Features

### WebView Configuration

The app includes a fully configured WKWebView with:
- ✅ JavaScript enabled
- ✅ Local storage support
- ✅ Back/forward navigation gestures
- ✅ Inline media playback
- ✅ Loading indicator
- ✅ Network error handling

### App Permissions

Configured in Info.plist:
- **Camera Access**: For capturing images
- **Photo Library**: For saving generated images
- **Network Access**: For loading the web app

### User Experience

- **Launch Screen**: White background with accent color
- **Loading Indicator**: Purple circular progress view with text
- **Direct to Signup**: Opens `/signup` page immediately
- **Full Navigation**: Users can navigate through all web app pages
- **Persistent Session**: Web sessions persist across app launches

## Customization

### Change App Icon

1. Create your app icons in these sizes:
   - 1024x1024 (App Store)
   - 180x180, 120x120, 87x87 (iPhone)
   - 167x167, 152x152, 76x76 (iPad)

2. In Xcode:
   - Open **Assets.xcassets**
   - Click **AppIcon**
   - Drag your images into the appropriate slots

### Change Accent Color

1. In Xcode, open **Assets.xcassets**
2. Click **AccentColor**
3. Change the color to match your brand

### Change Loading Text

Edit `ContentView.swift`:
```swift
Text("Loading ImageStory AI...")
    .font(.headline)
    .foregroundColor(.gray)
```

## App Store Deployment

### 1. Prepare for Distribution

1. In Xcode, select **Product → Archive**
2. Wait for the archive to complete
3. Click **Distribute App**

### 2. TestFlight (Beta Testing)

1. Choose **TestFlight** distribution
2. Follow the prompts to upload to App Store Connect
3. Add beta testers in App Store Connect

### 3. App Store Release

1. Create an app listing in App Store Connect
2. Upload screenshots and descriptions
3. Submit for review
4. Wait for Apple's approval (typically 1-3 days)

## Troubleshooting

### Build Errors

**Issue**: "Developer certificate not found"
- **Solution**: Add your Apple ID in Xcode Preferences → Accounts

**Issue**: "No such module SwiftUI"
- **Solution**: Ensure deployment target is iOS 16.0+

### Runtime Errors

**Issue**: Blank white screen
- **Solution**: Check the webURL is correct and accessible

**Issue**: "Can't connect to server"
- **Solution**: Verify Info.plist includes NSAppTransportSecurity

**Issue**: Images not loading
- **Solution**: Ensure network permissions are granted

### Common Xcode Issues

**Issue**: Files not found
- **Solution**: Check file references are correct (right-click → Show in Finder)

**Issue**: Build succeeds but crashes on launch
- **Solution**: Check for typos in Info.plist or missing assets

## Current Configuration

- **App Name**: ImageStory AI
- **Initial URL**: https://image-story-r0sp1mdaw-cans-projects-8d11bd8a.vercel.app/signup
- **Minimum iOS**: 16.0
- **Supported Devices**: iPhone, iPad
- **Orientations**: Portrait, Landscape

## Support

For issues or questions:
1. Check the web app is accessible in Safari
2. Verify Xcode version compatibility
3. Review console logs in Xcode for errors
4. Test on different devices/simulators

## License

This app wraps the ImageStory AI web application. Ensure you have proper rights to distribute the web content as a mobile app.
