# Front-end for Audio Recording Proof-of-Concept

## Installing on OSX/Linux
1. `sudo npm install -g cordova`
2. `cordova platforms add android`
3. `cordova platforms add ios` 
4. `cordova platforms add browser` (Currently does not support audio recording)
5. `cordova plugin add cordova-plugin-audioinput`

## Testing on iOS/Android/Browser
1. `cordova run ios`
2. `cordova run android`
3. `cordova run browser` (Browser is convenient for UI work only)

## Debugging the console for iOS
1. Install XCode
2. cd platforms/ios/
3. Open xcodeproj via XCode
4. Create a wildcard provisioning profile on iTunes Connect if you don't have one already.
5. Click "Fix Code Signing Issues" if applicable under "General Settings."
6. Select your iOS device as the target.
7. Build and run. `CMD + B` and `CMD + R`
8. Open Safari and navigate to `Develop > Your Device`
9. The Safari browser will open and you can debug/inspect.

# Debugging the console for Android
1. Install Android Studio
2. Update all drivers and check all software additions they throw at you.
3. Create an emulator or hook up your device.
4. Build and run.
5. Open Chrome and enter in the URL: `chrome://inspect`
6. The new window will mirror your device and you can debug/inspect.
