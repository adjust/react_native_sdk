### Version 4.12.0 (28th December 2017)
#### Native changes:
- **[iOS]** https://github.com/adjust/ios_sdk/blob/master/CHANGELOG.md#version-4120-13th-december-2017
- **[iOS]** https://github.com/adjust/ios_sdk/blob/master/CHANGELOG.md#version-4121-13th-december-2017
- **[AND]** https://github.com/adjust/android_sdk/blob/master/CHANGELOG.md#version-4120-13th-december-2017

#### Added
- **[AND]** Added `getAmazonAdId` method to `Adjust` interface.
- **[iOS][AND]** Added `setAppSecret` method to `AdjustConfig` interface.
- **[iOS][AND]** Added `setReadMobileEquipmentIdentity` method to `AdjustConfig` interface.
- Added `componentWillUnmount()` method to `Adjust` JS interface to unsubscribe from callbacks.

#### Changed
- Switch to `RCTEventEmitter` instead of `RCTBridge` for emitting native events [reference](https://github.com/facebook/react-native/issues/8714)

#### Native SDKs
- **[iOS]** [iOS@v4.12.1][ios_sdk_v4.12.1]
- **[AND]** [Android@v4.12.0][android_sdk_v4.12.0]

---


### Version 4.11.7 (5th October 2017)
#### Added
- **[iOS]** Added support for `use_frameworks!` option in `Podfile` (thanks to @jimmy-devine).

#### Changed
- **[iOS]** Updated Adjust pod version to `4.11.5` in `react-native-adjust.podspec`.

#### Native SDKs
- **[iOS]** [iOS@v4.11.5][ios_sdk_v4.11.5]
- **[AND]** [Android@v4.11.4][android_sdk_v4.11.4]

---

### Version 4.11.6 (28th September 2017)
#### Added
- **[iOS]** Improved iOS 11 support.

#### Changed
- **[iOS]** Removed iOS connection validity checks.
- **[iOS]** Updated native iOS SDK to version **4.11.5**.

#### Native SDKs
- **[iOS]** [iOS@v4.11.5][ios_sdk_v4.11.5]
- **[AND]** [Android@v4.11.4][android_sdk_v4.11.4]

---

### Version 4.11.5 (22nd August 2017)
#### Added
- **[iOS]** Added `Podspec` file for Cocoapods support (thanks to @pietropizzi, @tecbot and @dan-manges).

#### Native SDKs
- **[iOS]** [iOS@v4.11.4][ios_sdk_v4.11.4]
- **[AND]** [Android@v4.11.4][android_sdk_v4.11.4]

---

### Version 4.11.4 (3rd August 2017)
#### Added
- **[AND]** Added support for `React Native 0.47.0 and higher` (thanks to @robertmerten and @ruiaraujo).

#### Changed
- **[REPO]** Example app built `React Native 0.47.0`.

#### Native SDKs
- **[iOS]** [iOS@v4.11.4][ios_sdk_v4.11.4]
- **[AND]** [Android@v4.11.4][android_sdk_v4.11.4]

---

### Version 4.11.3 (15th May 2017)
#### Added
- **[iOS][AND]** Added check if `sdk_click` package response contains attribution information.
- **[iOS][AND]** Added sending of attributable parameters with every `sdk_click` package.

#### Changed
- **[iOS][AND]** Replaced `assert` level logs with `warn` level.

#### Native SDKs
- **[iOS]** [iOS@v4.11.4][ios_sdk_v4.11.4]
- **[AND]** [Android@v4.11.4][android_sdk_v4.11.4]

---

### Version 4.11.2 (24th April 2017)
#### Added
- **[iOS]** Added nullability annotations to public headers for Swift 3.0 compatibility.
- **[iOS]** Added `BITCODE_GENERATION_MODE` to iOS framework for `Carthage` support.
- **[iOS]** Added support for iOS 10.3.
- **[iOS][AND]** Added sending of the app's install time.
- **[iOS][AND]** Added sending of the app's update time.

#### Fixed
- **[iOS]** Fixed not processing of `sdk_info` package type causing logs not to print proper package name once tracked.
- **[AND]** Fixed query string parsing.
- **[AND]** Fixed issue of creating and destroying lots of threads on certain Android API levels (https://github.com/adjust/android_sdk/issues/265).
- **[AND]** Protected `Package Manager` from throwing unexpected exceptions (https://github.com/adjust/android_sdk/issues/266).

#### Changed
- **[AND]** Refactored native networking code.
- **[iOS]** Updated native iOS SDK to version **4.11.3**.
- **[AND]** Updated native Android SDK to version **4.11.3**.
- **[REPO]** Introduced `[iOS]`, `[AND]`, `[WIN]` and `[REPO]` tags to `CHANGELOG` to highlight the platform the change is referring to.
- **[REPO]** Updated example app.

#### Native SDKs
- **[iOS]** [iOS@v4.11.3][ios_sdk_v4.11.3]
- **[AND]** [Android@v4.11.3][android_sdk_v4.11.3]

---

### Version 4.11.1 (21st February 2017)
#### Added
- **[REPO]** Added support for React Native `0.40.0`++ (thanks to @philipheinser, @philipshurpik and @dhorelik)

#### Fixed
- **[iOS]** Fixed `Duplicate interface definition for class` error messages.

#### Changed
- **[REPO]** Updated iOS and Android example apps build scripts.

#### Native SDKs
- **[iOS]** [iOS@v4.11.0][ios_sdk_v4.11.0]
- **[AND]** [Android@v4.11.0][android_sdk_v4.11.0]

---

### Version 4.11.0 (13th February 2017)
#### Added
- **[iOS][AND]** Added `adid` property to the attribution callback response.
- **[iOS][AND]** Added `getAdid` method to the `Adjust` instance to be able to get adid value at any time after obtaining it, not only when session/event callbacks have been triggered.
- **[iOS][AND]** Added `getAttribution` method to the `Adjust` instance to be able to get current attribution value at any time after obtaining it, not only when an attribution callback has been triggered.
- **[iOS]** Added `getIdfa` method to the `Adjust` instance to be able to obtain iOS advertising identifier (IDFA).
- **[AND]** Added `getGoogleAdId` method to the `Adjust` instance to be able to obtain Google Play Services advertising identifier.
- **[AND]** Added sending of **Amazon Fire Advertising Identifier** for Android platform.
- **[AND]** Added possibility to set default tracker for the app by adding `adjust_config.properties` file to the `assets` folder of your Android app. Mostly meant to be used by the `Adjust Store & Pre-install Tracker Tool` (https://github.com/adjust/android_sdk/blob/master/doc/english/pre_install_tracker_tool.md).

#### Fixed
- **[iOS][AND]** Now reading push token value from activity state file when sending package.
- **[iOS]** Fixed memory leak by closing network session for iOS platform.
- **[iOS]** Fixed `TARGET_OS_TV` pre-processor check for iOS platform.

#### Changed
- **[iOS][AND]** Firing attribution request as soon as install has been tracked, regardless of presence of attribution callback implementation in user's app.
- **[iOS]** Saving iAd/AdSearch details to prevent sending duplicated `sdk_click` packages for iOS platform.
- **[iOS]** Updated native iOS SDK to version **4.11.0**.
- **[AND]** Updated native Android SDK to version **4.11.0**.
- **[REPO]** Updated docs.

#### Native SDKs
- **[iOS]** [iOS@v4.11.0][ios_sdk_v4.11.0]
- **[AND]** [Android@v4.11.0][android_sdk_v4.11.0]

---

### Version 4.10.0 (1st December 2016)
#### Added
- **[iOS][AND]** Initial release of the adjust SDK for React Native. Supported platforms: `iOS` and `Android`.

#### Native SDKs
- **[iOS]** [iOS@v4.10.3][ios_sdk_v4.10.3]
- **[AND]** [Android@v4.10.4][android_sdk_v4.10.4]

[ios_sdk_v4.10.3]: https://github.com/adjust/ios_sdk/tree/v4.10.3
[ios_sdk_v4.11.0]: https://github.com/adjust/ios_sdk/tree/v4.11.0
[ios_sdk_v4.11.3]: https://github.com/adjust/ios_sdk/tree/v4.11.3
[ios_sdk_v4.11.4]: https://github.com/adjust/ios_sdk/tree/v4.11.4
[ios_sdk_v4.11.5]: https://github.com/adjust/ios_sdk/tree/v4.11.5
[ios_sdk_v4.12.1]: https://github.com/adjust/ios_sdk/tree/v4.12.1

[android_sdk_v4.10.4]: https://github.com/adjust/android_sdk/tree/v4.10.4
[android_sdk_v4.11.0]: https://github.com/adjust/android_sdk/tree/v4.11.0
[android_sdk_v4.11.1]: https://github.com/adjust/android_sdk/tree/v4.11.1
[android_sdk_v4.11.3]: https://github.com/adjust/android_sdk/tree/v4.11.3
[android_sdk_v4.11.4]: https://github.com/adjust/android_sdk/tree/v4.11.4
[android_sdk_v4.12.0]: https://github.com/adjust/android_sdk/tree/v4.12.0
