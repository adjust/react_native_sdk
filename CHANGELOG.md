### Version 5.0.4 (17th January 2025)
#### Fixed
- Fixed type mismatch of some `AdjustPlayStoreSubscription` fields in JS and TS (https://github.com/adjust/react_native_sdk/issues/260).

#### Native SDKs
- [iOS@v5.0.2][ios_sdk_v5.0.2]
- [Android@v5.0.2][android_sdk_v5.0.2]

---

### Version 5.0.3 (6th December 2024)
#### Changed
- Switched to native Android SDK version that depends on a specific version of the signature library.

#### Native SDKs
- [iOS@v5.0.1][ios_sdk_v5.0.1]
- [Android@v5.0.2][android_sdk_v5.0.2]

---

### Version 5.0.2 (23rd September 2024)
#### Fixed
- Fixed `Adjust.modulemap not found` error in certain CocoaPods integration cases.
- Fixed occasional ANRs while reading install referrer from Shared Preferences during the SDK initialization.

#### Native SDKs
- [iOS@v5.0.1][ios_sdk_v5.0.1]
- [Android@v5.0.1][android_sdk_v5.0.1]

---

### Version 5.0.1 (10th September 2024)
#### Fixed
- Added missing `AdjustDeeplink` class export to `index.d.ts` (https://github.com/adjust/react_native_sdk/pull/246).
- Renamed `AdjustDeeplink` interface to `AdjustDeferredDeeplink` to avoid naming collision with as of now the class named `AdjustDeeplink`.

#### Native SDKs
- [iOS@v5.0.0][ios_sdk_v5.0.0]
- [Android@v5.0.0][android_sdk_v5.0.0]

---

### Version 5.0.0 (6th September 2024)

We're excited to release our major new SDK version (v5). Among many internal improvements, our spoofing protection solution is now included out of the box, reinforcing our commitment to accurate, actionable, and fraud-free data.

To try out SDK v5 in your app, you can follow our new v4 to v5 [migration guide](https://dev.adjust.com/en/sdk/react-native/migration/v4-to-v5).

If you are a current Adjust client and have questions about SDK v5, please email [sdk-v5@adjust.com](mailto:sdk-v5@adjust.com).

In case you were using beta version of the SDK v5, please switch to the official v5 release.

#### Native SDKs
- [iOS@v5.0.0][ios_sdk_v5.0.0]
- [Android@v5.0.0][android_sdk_v5.0.0]

---

### Version 4.38.1 (30th April 2024)
#### Added
- Added sending of the additional iOS SDK observability parameters for debugging purposes.

#### Fixed
- Removed nullability type specifier warnings (https://github.com/adjust/ios_sdk/issues/703).

#### Native SDKs
- [iOS@v4.38.2][ios_sdk_v4.38.2]
- [Android@v4.38.3][android_sdk_v4.38.3]

---

### Version 4.38.0 (27th March 2024)
#### Added
- Added iOS Privacy Manifest for the Adjust SDK.
- Added new domains and corresponding payload restrictions for the Adjust SDK to direct the iOS traffic to:
    - https://consent.adjust.com - for consented users
    - https://analytics.adjust.com - for non-consented users

#### Native SDKs
- [iOS@v4.38.0][ios_sdk_v4.38.0]
- [Android@v4.38.3][android_sdk_v4.38.3]

---

### Version 4.37.2 (21st March 2024)
#### Fixed
- Fixed occasional crashes caused by not synchronized access to cached IDFA value (https://github.com/adjust/ios_sdk/issues/696).

#### Changed
- Added tracking of `third_party_sharing` and `measurement_consent` packages if invoked before SDK initialization in subsequent SDK initializations.

#### Native SDKs
- [iOS@v4.37.2][ios_sdk_v4.37.2]
- [Android@v4.38.2][android_sdk_v4.38.2]

---

### Version 4.37.1 (30th January 2024)
#### Fixed
- Marked all Android method parameters as `final` to address compilation errors when trying to access a callback inside of the inner class (https://github.com/adjust/react_native_sdk/issues/226).

#### Native SDKs
- [iOS@v4.37.0][ios_sdk_v4.37.0]
- [Android@v4.38.1][android_sdk_v4.38.1]

---

### Version 4.37.0 (30th January 2024)
#### Added
- Added ability to process shortened deep links and provide the unshortened link back as a response. You can achieve this by invoking `processDeeplink` method of the `Adjust` instance.
- Added support for Meta install referrer.
- Added getter for obtaining IDFV value of the iOS device. You can obtain IDFV value by calling `getIdfv` method of the `Adjust` instance.
- Added support for Google Play Games on PC.
- Added support for `TopOn` and `AD(X)` ad revenue tracking.
- Added a new type of URL strategy called `AdjustConfig.AdjustUrlStrategyCnOnly`. This URL strategy represents `AdjustConfig.AdjustUrlStrategyCn` strategy, but without fallback domains.
- Added ability to indicate if the device IDs should be read just once per SDK initialization via calling `setReadDeviceInfoOnceEnabled` method of the `AdjustConfig` instance.

#### Native SDKs
- [iOS@v4.37.0][ios_sdk_v4.37.0]
- [Android@v4.38.1][android_sdk_v4.38.1]

---

### Version 4.35.1 (10th October 2023)
#### Added
- Added sending of `event_callback_id` parameter (if set) with the event payload.

#### Native SDKs
- [iOS@v4.35.2][ios_sdk_v4.35.2]
- [Android@v4.35.1][android_sdk_v4.35.1]

---

### Version 4.35.0 (6th October 2023)
#### Added
- Added ability to read App Set ID on Android platform in case you opt in by adding the `com.google.android.gms:play-services-appset` dependency to your Android app.
- Added ability to delay SDK start on iOS platform in order to wait for an answer to the ATT dialog. You can set the number of seconds to wait (capped internally to 120) by calling the `setAttConsentWaitingInterval` method of the `AdjustConfig` instance.
- Added support for purchase verification. In case you are using this feature, you can now use it by calling `verifyAppStorePurchase` (for iOS) and `verifyPlayStorePurchase` (for Android) methods of the `Adjust` instance.
- Added support for SigV3 library. Update authorization header building logic to use `adj_signing_id`.
- Added `setAndroidFinalAttributionEnabled` method to `AdjustConfig` to indicate if only final Android attribution is needed in attribution callback (by default attribution callback return intermediate attribution as well before final attribution if not enabled with this setter method).

#### Native SDKs
- [iOS@v4.35.1][ios_sdk_v4.35.1]
- [Android@v4.35.0][android_sdk_v4.35.0]

---

### Version 4.33.0 (15th January 2023)
#### Added
- Added support for SKAdNetwork 4.0.
- Added support for setting a new China URL Strategy. You can choose this setting by calling `setUrlStrategy` method of `AdjustConfig` instance with `AdjustConfig.UrlStrategyCn` parameter.
- Added support to OAID plugin for MSA SDK v2.0.0.

#### Native SDKs
- [iOS@v4.33.3][ios_sdk_v4.33.3]
- [Android@v4.33.2][android_sdk_v4.33.2]

---

### Version 4.32.1 (14th November 2022)
#### Fixed
- Fixed conversion bug which caused `transaction_date` parameter of iOS subscription tracking to be wrongly formatted.

#### Native SDKs
- [iOS@v4.32.1][ios_sdk_v4.32.1]
- [Android@v4.32.0][android_sdk_v4.32.0]

---

### Version 4.32.0 (11th October 2022)
#### Added
- Added partner sharing settings to the third party sharing feature.
- Added `getLastDeeplink` getter to `Adjust` API to be able to get last tracked deep link by the SDK (iOS only).

#### Changed
- Switched to adding permission `com.google.android.gms.permission.AD_ID` in the Android app's manifest by default.

#### Fixed
- Fixed Xcode 14 build errors by switching to usage of `React-Core` pod (https://github.com/adjust/react_native_sdk/issues/193).
- Added missing cost data info to attribution getter once invoked on iOS platform.

#### Native SDKs
- [iOS@v4.32.1][ios_sdk_v4.32.1]
- [Android@v4.32.0][android_sdk_v4.32.0]

---

### Version 4.31.0 (10th August 2022)
#### Added
- Added ability to mark your app as COPPA compliant. You can enable this setting by calling `setCoppaCompliantEnabled` method of `AdjustConfig` instance to `true`.
- Added ability to mark your Android app as app for the kids in accordance to Google Play Families policies. You can enable this setting by calling `setPlayStoreKidsAppEnabled` method of `AdjustConfig` instance to `true`.
- Added `checkForNewAttStatus` method to `Adjust` API to allow iOS apps to instruct to SDK to check if `att_status` might have changed in the meantime.
- Added support for Generic ad revenue tracking.
- Added support for `LinkMe` feature.
- Added support to get Facebook install referrer information in attribution callback.

#### Fixed
- Fixed `react-native` 0.69 autolinking issue (https://github.com/adjust/react_native_sdk/pull/186).

#### Native SDKs
- [iOS@v4.31.0][ios_sdk_v4.31.0]
- [Android@v4.31.0][android_sdk_v4.31.0]

---

### Version 4.29.6 (26th January 2022)
#### Added
- Added support to OAID plugin for MSA SDK v1.1.0.

#### Fixed
- Added missing URL strategy constants to `index.d.ts` (https://github.com/adjust/react_native_sdk/issues/157).

#### Native SDKs
- [iOS@v4.29.6][ios_sdk_v4.29.6]
- [Android@v4.28.9][android_sdk_v4.28.9]

---

### Version 4.29.5 (14th December 2021)
#### Added
- Added Huawei Install Referrer Track ID support.
- Added support for `Admost` ad revenue tracking.

#### Fixed
- Fixed `NativeEventEmitter` warnings caused by RN 0.66 upgrade (https://github.com/adjust/react_native_sdk/issues/147).

#### Native SDKs
- [iOS@v4.29.6][ios_sdk_v4.29.6]
- [Android@v4.28.8][android_sdk_v4.28.8]

---

### Version 4.29.4 (19th August 2021)
#### Added
- Added support to OAID plugin for MSA SDK v1.0.26.

#### Fixed
- Fixed issue with insufficient buffer size for storing SDK prefix (https://github.com/adjust/react_native_sdk/issues/140).

#### Native SDKs
- [iOS@v4.29.5][ios_sdk_v4.29.5]
- [Android@v4.28.4][android_sdk_v4.28.4]

---

### Version 4.29.3 (11th August 2021)
#### Added
- Added support to OAID plugin for MSA SDK v1.0.26.

#### Fixed
- Fixed wrong `trackAdRevenue` TypeScript method declaration (https://github.com/adjust/react_native_sdk/issues/134#issuecomment-892761735).

#### Native SDKs
- [iOS@v4.29.4][ios_sdk_v4.29.4]
- [Android@v4.28.4][android_sdk_v4.28.4]

---

### Version 4.29.2 (26th July 2021)
#### Fixed
- Removed accidentally added `create-react-native-app` plugin dependency (thanks to @kelleyvanevert).

#### Native SDKs
- [iOS@v4.29.3][ios_sdk_v4.29.3]
- [Android@v4.28.3][android_sdk_v4.28.3]

---

### Version 4.29.1 (21st July 2021)
#### Fixed
- Fixed wrong `trackAdRevenue` TypeScript method declaration (https://github.com/adjust/react_native_sdk/issues/134).
- Fixed missing authorization header in retry requests on Android.

#### Native SDKs
- [iOS@v4.29.3][ios_sdk_v4.29.3]
- [Android@v4.28.3][android_sdk_v4.28.3]

---

### Version 4.29.0 (15th July 2021)
#### Added
- [beta] Added data residency feature. You can choose this setting by calling `setUrlStrategy` method of `AdjustConfig` instance with `AdjustConfig.DataResidencyEU` (for EU data residency region), `AdjustConfig.DataResidencyTR` (for TR data residency region) or `AdjustConfig.DataResidencyUS` value (for US data residency region).
- Added possibility to `trackAdRevenue` method of `Adjust` interface to allow tracking of ad revenue by passing `AdjustAdRevenue` object as parameter.
- Added support for `AppLovin MAX` ad revenue tracking.
- Added `setConversionValueUpdatedCallbackListener` method to `AdjustConfig` which can be used to set a callback which will get information when Adjust SDK updates conversion value for the user.
- Added preinstall tracking with usage of system installer receiver on Android platform (`setPreinstallFilePath` method of the `AdjustConfig`).

#### Native SDKs
- [iOS@v4.29.3][ios_sdk_v4.29.3]
- [Android@v4.28.2][android_sdk_v4.28.2]

---

### Version 4.28.0 (1th April 2021)
#### Changed
- Removed native iOS legacy code.

#### Native SDKs
- [iOS@v4.28.0][ios_sdk_v4.28.0]
- [Android@v4.27.0][android_sdk_v4.27.0]

---

### Version 4.26.0 (18th February 2021)
#### Added
- Added possibility to get cost data information in attribution callback.
- Added `setNeedsCost` method to `AdjustConfig` to indicate if cost data is needed in attribution callback (by default cost data will not be part of attribution callback if not enabled with this setter method).
- Added `setPreinstallTrackingEnabled` method to `AdjustConfig` to allow enabling of preinstall tracking (this feature is OFF by default).
- Added support for Apple Search Ads attribution with usage of `AdServices.framework`.
- Added `setAllowAdServicesInfoReading` method to `AdjustConfig` to allow option for users to prevent SDK from performing any tasks related to Apple Search Ads attribution with usage of `AdServices.framework`.
- Added wrapper method `updateConversionValue` method to `Adjust` to allow updating SKAdNetwork conversion value via SDK API.
- Added `getAppTrackingAuthorizationStatus` getter to `Adjust` instance to be able to get current iOS app tracking status.
- Added improved measurement consent management and third party sharing mechanism.
- Added public constants to be used as sources for ad revenue tracking with `trackAdRevenue` method.

#### Native SDKs
- [iOS@v4.26.1][ios_sdk_v4.26.1]
- [Android@v4.26.2][android_sdk_v4.26.2]

---

### Version 4.23.1 (6th November 2020)
#### Added
- Added support for autolinking.

#### Native SDKs
- [iOS@v4.23.2][ios_sdk_v4.23.2]
- [Android@v4.24.1][android_sdk_v4.24.1]

---

### Version 4.23.0 (28th August 2020)
#### Added
- Added communication with SKAdNetwork framework by default on iOS 14.
- Added method `deactivateSKAdNetworkHandling` method to `AdjustConfig` to switch off default communication with SKAdNetwork framework in iOS 14.
- Added wrapper method `requestTrackingAuthorizationWithCompletionHandler` to `Adjust` to allow asking for user's consent to be tracked in iOS 14 and immediate propagation of user's choice to backend.
- Added handling of new iAd framework error codes introduced in iOS 14.
- Added sending of value of user's consent to be tracked with each package.
- Added `setUrlStrategy` method to `AdjustConfig` class to allow selection of URL strategy for specific market.

#### Native SDKs
- [iOS@v4.23.0][ios_sdk_v4.23.0]
- [Android@v4.24.0][android_sdk_v4.24.0]

---

### Version 4.22.0 (6th June 2020)
#### Added
- Added subscription tracking feature.
- Added OAID plugin for Adjust SDK named `react-native-adjust-oaid`. With this plugin added next to Adjust SDK, SDK will be able to read Open Advertising ID if present on the device.
- Added support for Huawei App Gallery install referrer.

#### Changed
- Updated communication flow with `iAd.framework`.

#### Native SDKs
- [iOS@v4.22.1][ios_sdk_v4.22.1]
- [Android@v4.22.0][android_sdk_v4.22.0]

---

### Version 4.21.0 (1st April 2020)
#### Added
- Added `disableThirdPartySharing` method to `Adjust` interface to allow disabling of data sharing with third parties outside of Adjust ecosystem.
- Added support for signature library as a plugin.
- Added more aggressive sending retry logic for install session package.
- Added additional parameters to `ad_revenue` package payload.
- Added external device ID support.

#### Native SDKs
- [iOS@v4.21.0][ios_sdk_v4.21.0]
- [Android@v4.21.0][android_sdk_v4.21.0]

---

### Version 4.18.2 (11th October 2019)
#### Added
- Added `convertUniversalLink` method from native iOS SDK to JS API (thanks to @tootsweet).

#### Changed
- Updated example and test app to RN 0.61.2.
- Updated README to fix typos (thanks to @BorisMisnik).

#### Native SDKs
- [iOS@v4.18.3][ios_sdk_v4.18.3]
- [Android@v4.18.3][android_sdk_v4.18.3]

---

### Version 4.18.1 (2nd July 2019)
#### Fixed
- Fixed compile errors when trying to use Adjust SDK with TypeScript 2.9 and higher (thanks to @rawrmaan).

#### Changed
- Changed submodule endpoints from `SSH` to `HTTPS` (thanks to @rawrmaan).

#### Native SDKs
- [iOS@v4.18.0][ios_sdk_v4.18.0]
- [Android@v4.18.0][android_sdk_v4.18.0]

---

### Version 4.18.0 (1st July 2019)
#### Added
- Added `trackAdRevenue` method to `Adjust` interface to allow tracking of ad revenue. With this release added support for `MoPub` ad revenue tracking.
- Added reading of Facebook anonymous ID if available on iOS platform.

#### Native SDKs
- [iOS@v4.18.0][ios_sdk_v4.18.0]
- [Android@v4.18.0][android_sdk_v4.18.0]

---

### Version 4.17.2 (3rd May 2019)
#### Changed
- Updated iOS SDK version number in Podspec file to 4.17.2.

#### Native SDKs
- [iOS@v4.17.2][ios_sdk_v4.17.2]
- [Android@v4.17.0][android_sdk_v4.17.0]

---

### Version 4.17.1 (3rd May 2019)
#### Added
- Added support for projects written in `TypeScript`.

#### Native SDKs
- [iOS@v4.17.1][ios_sdk_v4.17.1]
- [Android@v4.17.0][android_sdk_v4.17.0]

---

### Version 4.17.0 (12th December 2018)
#### Added
- Added `getSdkVersion()` method to `Adjust` interface to obtain current SDK version string.

#### Changed
- Changed usage of `compile` keyword in plugin's `build.gradle` file into `implementation` (https://github.com/adjust/react_native_sdk/issues/47).

#### Native SDKs
- [iOS@v4.17.1][ios_sdk_v4.17.1]
- [Android@v4.17.0][android_sdk_v4.17.0]

---

### Version 4.15.0 (10th October 2018)
#### Added
- Added `setCallbackId` method on `AdjustEvent` object for users to set custom ID on event object which will later be reported in event success/failure callbacks.
- Added `callbackId` field to event tracking success callback object.
- Added `callbackId` field to event tracking failure callback object.

#### Changed
- Updated Android SDK and build tools to 26 (thanks to @hamidhadi).
- Marked `setReadMobileEquipmentIdentity` method of `AdjustConfig` object as deprecated.
- SDK will now fire attribution request each time upon session tracking finished in case it lacks attribution info.

#### Native SDKs
- [iOS@v4.15.0][ios_sdk_v4.15.0]
- [Android@v4.15.0][android_sdk_v4.15.0]

---

### Version 4.14.0 (4th July 2018)
#### Added
- Added deep link caching in case `appWillOpenUrl` method is called before SDK is initialised.

#### Changed
- Imposed type checks when calling methods for adding callback and partner parameters - both key and value now **must** be strings.
- Updated the way how iOS native bridge handles push tokens from React Native interface - they are now being passed directly as strings to native iOS SDK.

#### Native SDKs
- [iOS@v4.14.1][ios_sdk_v4.14.1]
- [Android@v4.14.0][android_sdk_v4.14.0]

---

### Version 4.13.0 (22nd May 2018)
#### Added
- Added `gdprForgetMe` method to `Adjust` interface to enable possibility for user to be forgotten in accordance with GDPR law.

#### Native SDKs
- [iOS@v4.13.0][ios_sdk_v4.13.0]
- [Android@v4.13.0][android_sdk_v4.13.0]

---

### Version 4.12.3 (12th March 2018)
#### Native changes
- https://github.com/adjust/android_sdk/blob/master/CHANGELOG.md#version-4124-9th-march-2018

#### Native SDKs
- [iOS@v4.12.3][ios_sdk_v4.12.3]
- [Android@v4.12.4][android_sdk_v4.12.4]

---

### Version 4.12.2 (8th March 2018)
#### Native changes
- https://github.com/adjust/ios_sdk/blob/master/CHANGELOG.md#version-4122-13th-february-2018
- https://github.com/adjust/ios_sdk/blob/master/CHANGELOG.md#version-4123-23rd-february-2018
- https://github.com/adjust/android_sdk/blob/master/CHANGELOG.md#version-4122-28th-february-2018
- https://github.com/adjust/android_sdk/blob/master/CHANGELOG.md#version-4123-7th-march-2018

#### Native SDKs
- [iOS@v4.12.3][ios_sdk_v4.12.3]
- [Android@v4.12.3][android_sdk_v4.12.3]

---

### Version 4.12.1 (1st February 2018)
#### Native changes
- https://github.com/adjust/android_sdk/blob/master/CHANGELOG.md#version-4121-31st-january-2018

#### Native SDKs
- [iOS@v4.12.1][ios_sdk_v4.12.1]
- [Android@v4.12.1][android_sdk_v4.12.1]

---

### Version 4.12.0 (4th January 2018)
#### Native changes:
- **[iOS]** https://github.com/adjust/ios_sdk/blob/master/CHANGELOG.md#version-4120-13th-december-2017
- **[iOS]** https://github.com/adjust/ios_sdk/blob/master/CHANGELOG.md#version-4121-13th-december-2017
- **[AND]** https://github.com/adjust/android_sdk/blob/master/CHANGELOG.md#version-4120-13th-december-2017

#### Added
- Added `getAmazonAdId` method to `Adjust` interface.
- Added `setAppSecret` method to `AdjustConfig` interface.
- Added `setReadMobileEquipmentIdentity` method to `AdjustConfig` interface.
- Added `componentWillUnmount` method to `Adjust` interface to unsubscribe from callbacks.

#### Changed
- Switched to `RCTEventEmitter` instead of `RCTBridge` for emitting native events ([reference](https://github.com/facebook/react-native/issues/8714)).

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
[ios_sdk_v4.12.3]: https://github.com/adjust/ios_sdk/tree/v4.12.3
[ios_sdk_v4.13.0]: https://github.com/adjust/ios_sdk/tree/v4.13.0
[ios_sdk_v4.14.1]: https://github.com/adjust/ios_sdk/tree/v4.14.1
[ios_sdk_v4.15.0]: https://github.com/adjust/ios_sdk/tree/v4.15.0
[ios_sdk_v4.17.1]: https://github.com/adjust/ios_sdk/tree/v4.17.1
[ios_sdk_v4.17.2]: https://github.com/adjust/ios_sdk/tree/v4.17.2
[ios_sdk_v4.18.0]: https://github.com/adjust/ios_sdk/tree/v4.18.0
[ios_sdk_v4.18.3]: https://github.com/adjust/ios_sdk/tree/v4.18.3
[ios_sdk_v4.21.0]: https://github.com/adjust/ios_sdk/tree/v4.21.0
[ios_sdk_v4.21.3]: https://github.com/adjust/ios_sdk/tree/v4.21.3
[ios_sdk_v4.22.1]: https://github.com/adjust/ios_sdk/tree/v4.22.1
[ios_sdk_v4.23.0]: https://github.com/adjust/ios_sdk/tree/v4.23.0
[ios_sdk_v4.23.2]: https://github.com/adjust/ios_sdk/tree/v4.23.2
[ios_sdk_v4.26.1]: https://github.com/adjust/ios_sdk/tree/v4.26.1
[ios_sdk_v4.28.0]: https://github.com/adjust/ios_sdk/tree/v4.28.0
[ios_sdk_v4.29.3]: https://github.com/adjust/ios_sdk/tree/v4.29.3
[ios_sdk_v4.29.4]: https://github.com/adjust/ios_sdk/tree/v4.29.4
[ios_sdk_v4.29.5]: https://github.com/adjust/ios_sdk/tree/v4.29.5
[ios_sdk_v4.29.6]: https://github.com/adjust/ios_sdk/tree/v4.29.6
[ios_sdk_v4.31.0]: https://github.com/adjust/ios_sdk/tree/v4.31.0
[ios_sdk_v4.32.1]: https://github.com/adjust/ios_sdk/tree/v4.32.1
[ios_sdk_v4.33.3]: https://github.com/adjust/ios_sdk/tree/v4.33.3
[ios_sdk_v4.35.1]: https://github.com/adjust/ios_sdk/tree/v4.35.1
[ios_sdk_v4.35.2]: https://github.com/adjust/ios_sdk/tree/v4.35.2
[ios_sdk_v4.37.0]: https://github.com/adjust/ios_sdk/tree/v4.37.0
[ios_sdk_v4.37.2]: https://github.com/adjust/ios_sdk/tree/v4.37.2
[ios_sdk_v4.38.0]: https://github.com/adjust/ios_sdk/tree/v4.38.0
[ios_sdk_v4.38.2]: https://github.com/adjust/ios_sdk/tree/v4.38.2
[ios_sdk_v5.0.0]: https://github.com/adjust/ios_sdk/tree/v5.0.0
[ios_sdk_v5.0.1]: https://github.com/adjust/ios_sdk/tree/v5.0.1
[ios_sdk_v5.0.2]: https://github.com/adjust/ios_sdk/tree/v5.0.2

[android_sdk_v4.10.4]: https://github.com/adjust/android_sdk/tree/v4.10.4
[android_sdk_v4.11.0]: https://github.com/adjust/android_sdk/tree/v4.11.0
[android_sdk_v4.11.1]: https://github.com/adjust/android_sdk/tree/v4.11.1
[android_sdk_v4.11.3]: https://github.com/adjust/android_sdk/tree/v4.11.3
[android_sdk_v4.11.4]: https://github.com/adjust/android_sdk/tree/v4.11.4
[android_sdk_v4.12.0]: https://github.com/adjust/android_sdk/tree/v4.12.0
[android_sdk_v4.12.1]: https://github.com/adjust/android_sdk/tree/v4.12.1
[android_sdk_v4.12.2]: https://github.com/adjust/android_sdk/tree/v4.12.2
[android_sdk_v4.12.3]: https://github.com/adjust/android_sdk/tree/v4.12.3
[android_sdk_v4.12.4]: https://github.com/adjust/android_sdk/tree/v4.12.4
[android_sdk_v4.13.0]: https://github.com/adjust/android_sdk/tree/v4.13.0
[android_sdk_v4.14.0]: https://github.com/adjust/android_sdk/tree/v4.14.0
[android_sdk_v4.15.0]: https://github.com/adjust/android_sdk/tree/v4.15.0
[android_sdk_v4.17.0]: https://github.com/adjust/android_sdk/tree/v4.17.0
[android_sdk_v4.18.0]: https://github.com/adjust/android_sdk/tree/v4.18.0
[android_sdk_v4.18.3]: https://github.com/adjust/android_sdk/tree/v4.18.3
[android_sdk_v4.21.0]: https://github.com/adjust/android_sdk/tree/v4.21.0
[android_sdk_v4.21.1]: https://github.com/adjust/android_sdk/tree/v4.21.1
[android_sdk_v4.22.0]: https://github.com/adjust/android_sdk/tree/v4.22.0
[android_sdk_v4.24.0]: https://github.com/adjust/android_sdk/tree/v4.24.0
[android_sdk_v4.24.1]: https://github.com/adjust/android_sdk/tree/v4.24.1
[android_sdk_v4.26.2]: https://github.com/adjust/android_sdk/tree/v4.26.2
[android_sdk_v4.27.0]: https://github.com/adjust/android_sdk/tree/v4.27.0
[android_sdk_v4.28.2]: https://github.com/adjust/android_sdk/tree/v4.28.2
[android_sdk_v4.28.3]: https://github.com/adjust/android_sdk/tree/v4.28.3
[android_sdk_v4.28.4]: https://github.com/adjust/android_sdk/tree/v4.28.4
[android_sdk_v4.28.8]: https://github.com/adjust/android_sdk/tree/v4.28.8
[android_sdk_v4.28.9]: https://github.com/adjust/android_sdk/tree/v4.28.9
[android_sdk_v4.31.0]: https://github.com/adjust/android_sdk/tree/v4.31.0
[android_sdk_v4.32.0]: https://github.com/adjust/android_sdk/tree/v4.32.0
[android_sdk_v4.33.2]: https://github.com/adjust/android_sdk/tree/v4.33.2
[android_sdk_v4.35.0]: https://github.com/adjust/android_sdk/tree/v4.35.0
[android_sdk_v4.35.1]: https://github.com/adjust/android_sdk/tree/v4.35.1
[android_sdk_v4.38.1]: https://github.com/adjust/android_sdk/tree/v4.38.1
[android_sdk_v4.38.2]: https://github.com/adjust/android_sdk/tree/v4.38.2
[android_sdk_v4.38.3]: https://github.com/adjust/android_sdk/tree/v4.38.3
[android_sdk_v5.0.0]: https://github.com/adjust/android_sdk/tree/v5.0.0
[android_sdk_v5.0.1]: https://github.com/adjust/android_sdk/tree/v5.0.1
[android_sdk_v5.0.2]: https://github.com/adjust/android_sdk/tree/v5.0.2
