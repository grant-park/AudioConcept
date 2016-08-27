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
