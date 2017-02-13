### Version 4.11.0 (13th February 2017)
#### Added
- Added support for react native `0.40.0` (thanks to @philipheinser).
- Added `adid` property to the attribution callback response.
- Added `getIdfa` method to the `Adjust` instance to be able to obtain iOS advertising identifier (IDFA).
- Added `getGoogleAdId` method to the `Adjust` instance to be able to obtain Google Play Services advertising identifier.
- Added `getAdid` method to the `Adjust` instance to be able to get adid value at any time after obtaining it, not only when session/event callbacks have been triggered.
- Added `getAttribution` method to the `Adjust` instance to be able to get current attribution value at any time after obtaining it, not only when an attribution callback has been triggered.
- Added sending of **Amazon Fire Advertising Identifier** for Android platform.
- Added possibility to set default tracker for the app by adding `adjust_config.properties` file to the `assets` folder of your Android app. Mostly meant to be used by the `Adjust Store & Pre-install Tracker Tool` (https://github.com/adjust/android_sdk/blob/master/doc/english/pre_install_tracker_tool.md).

#### Fixed
- Now reading push token value from activity state file when sending package.
- Fixed memory leak by closing network session for iOS platform.
- Fixed `TARGET_OS_TV` pre-processor check for iOS platform.

#### Changed
- Firing attribution request as soon as install has been tracked, regardless of presence of attribution callback implementation in user's app.
- Saving iAd/AdSearch details to prevent sending duplicated `sdk_click` packages for iOS platform.
- Updated docs.
- Updated native iOS SDK to version **4.11.0**.
- Updated native Android SDK to version **4.11.0**.
- Native SDKs stability updates and improvements.

#### Native SDKs
- [iOS@v4.11.0][ios_sdk_v4.11.0]
- [Android@v4.11.0][android_sdk_v4.11.0]

---

### Version 4.10.0 (1st December 2016)
#### Added
- Initial release of the adjust SDK for React Native.

#### Native SDKs
- [iOS@v4.10.3][ios_sdk_v4.10.3]
- [Android@v4.10.4][android_sdk_v4.10.4]

[ios_sdk_v4.10.3]: https://github.com/adjust/ios_sdk/tree/v4.10.3
[ios_sdk_v4.11.0]: https://github.com/adjust/ios_sdk/tree/v4.11.0

[android_sdk_v4.10.4]: https://github.com/adjust/android_sdk/tree/v4.10.4
[android_sdk_v4.11.0]: https://github.com/adjust/android_sdk/tree/v4.11.0
