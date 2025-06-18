'use strict';

import {
    NativeEventEmitter,
    NativeModules,
    Platform,
} from 'react-native';

const module_adjust = NativeModules.Adjust;

let module_adjust_emitter = null;
if (Platform.OS === "android") {
    module_adjust_emitter = new NativeEventEmitter(NativeModules.Adjust);
} else if (Platform.OS === "ios") {
    module_adjust_emitter = new NativeEventEmitter(NativeModules.AdjustEventEmitter);
}

// Adjust

var Adjust = {};

// common

Adjust.initSdk = function(adjustConfig) {
    module_adjust.initSdk(adjustConfig);
};

Adjust.trackEvent = function(adjustEvent) {
    module_adjust.trackEvent(adjustEvent);
};

Adjust.trackAdRevenue = function(adjustAdrevenue) {
    module_adjust.trackAdRevenue(adjustAdrevenue);
};

Adjust.trackThirdPartySharing = function(adjustThirdPartySharing) {
    module_adjust.trackThirdPartySharing(adjustThirdPartySharing);
};

Adjust.trackMeasurementConsent = function(measurementConsent) {
    if (typeof measurementConsent !== 'boolean') {
        console.log("[Adjust] Measurement consent is not of type boolean");
        return;
    }
    module_adjust.trackMeasurementConsent(measurementConsent);
};

Adjust.processDeeplink = function(adjustDeeplink) {
    module_adjust.processDeeplink(adjustDeeplink);
};

Adjust.processAndResolveDeeplink = function(adjustDeeplink, callback) {
    module_adjust.processAndResolveDeeplink(adjustDeeplink, callback);
};

Adjust.setPushToken = function(token) {
    if (typeof token !== 'string') {
        console.log("[Adjust] Push token is not of type string");
        return;
    }
    module_adjust.setPushToken(token);
};

Adjust.gdprForgetMe = function() {
    module_adjust.gdprForgetMe();
};

Adjust.enable = function() {
    module_adjust.enable();
};

Adjust.disable = function() {
    module_adjust.disable();
};

Adjust.switchToOfflineMode = function() {
    module_adjust.switchToOfflineMode();
};

Adjust.switchBackToOnlineMode = function() {
    module_adjust.switchBackToOnlineMode();
};

Adjust.addGlobalCallbackParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        console.log("[Adjust] Global callback parameter key or value is not of type string");
        return;
    }
    module_adjust.addGlobalCallbackParameter(key, value);
};

Adjust.addGlobalPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        console.log("[Adjust] Global partner parameter key or value is not of type string");
        return;
    }
    module_adjust.addGlobalPartnerParameter(key, value);
};

Adjust.removeGlobalCallbackParameter = function(key) {
    if (typeof key !== 'string') {
        console.log("[Adjust] Global callback parameter key is not of type string");
        return;
    }
    module_adjust.removeGlobalCallbackParameter(key);
};

Adjust.removeGlobalPartnerParameter = function(key) {
    if (typeof key !== 'string') {
        console.log("[Adjust] Global partner parameter key is not of type string");
        return;
    }
    module_adjust.removeGlobalPartnerParameter(key);
};

Adjust.removeGlobalCallbackParameters = function() {
    module_adjust.removeGlobalCallbackParameters();
};

Adjust.removeGlobalPartnerParameters = function() {
    module_adjust.removeGlobalPartnerParameters();
};

Adjust.endFirstSessionDelay = function() {
    module_adjust.endFirstSessionDelay();
};

Adjust.enableCoppaComplianceInDelay = function() {
    module_adjust.enableCoppaComplianceInDelay();
};

Adjust.disableCoppaComplianceInDelay = function() {
    module_adjust.disableCoppaComplianceInDelay();
};

Adjust.setExternalDeviceIdInDelay = function(externalDeviceId) {
    module_adjust.setExternalDeviceIdInDelay(externalDeviceId);
};

Adjust.isEnabled = function(callback) {
    module_adjust.isEnabled(callback);
};

Adjust.getAttribution = function(callback) {
    module_adjust.getAttribution(callback);
};

Adjust.getAdid = function(callback) {
    module_adjust.getAdid(callback);
};

Adjust.getLastDeeplink = function(callback) {
    module_adjust.getLastDeeplink(callback);
};

Adjust.getSdkVersion = function(callback) {
    module_adjust.getSdkVersion("react-native5.4.0", callback);
};

Adjust.componentWillUnmount = function() {
    if (AdjustConfig.AttributionCallback != null) {
        AdjustConfig.AttributionCallback.remove();
        AdjustConfig.AttributionCallback = null;
    }

    if (AdjustConfig.EventTrackingSucceededCallback != null) {
        AdjustConfig.EventTrackingSucceededCallback.remove();
        AdjustConfig.EventTrackingSucceededCallback = null;
    }

    if (AdjustConfig.EventTrackingFailedCallback != null) {
        AdjustConfig.EventTrackingFailedCallback.remove();
        AdjustConfig.EventTrackingFailedCallback = null;
    }

    if (AdjustConfig.SessionTrackingSucceededCallback != null) {
        AdjustConfig.SessionTrackingSucceededCallback.remove();
        AdjustConfig.SessionTrackingSucceededCallback = null;
    }

    if (AdjustConfig.SessionTrackingFailedCallback != null) {
        AdjustConfig.SessionTrackingFailedCallback.remove();
        AdjustConfig.SessionTrackingFailedCallback = null;
    }

    if (AdjustConfig.DeferredDeeplinkCallback != null) {
        AdjustConfig.DeferredDeeplinkCallback.remove();
        AdjustConfig.DeferredDeeplinkCallback = null;
    }

    if (AdjustConfig.SkanUpdatedCallback != null) {
        AdjustConfig.SkanUpdatedCallback.remove();
        AdjustConfig.SkanUpdatedCallback = null;
    }
};

// ios only

Adjust.trackAppStoreSubscription = function(adjustAppStoreSubscription) {
    if (Platform.OS === "ios") {
        module_adjust.trackAppStoreSubscription(adjustAppStoreSubscription);
    }
};

Adjust.verifyAppStorePurchase = function(adjustAppStorePurchase, callback) {
    if (Platform.OS === "ios") {
        module_adjust.verifyAppStorePurchase(adjustAppStorePurchase, callback);
    }
};

Adjust.verifyAndTrackAppStorePurchase = function(adjustEvent, callback) {
    if (Platform.OS === "ios") {
        module_adjust.verifyAndTrackAppStorePurchase(adjustEvent, callback);
    }
};

Adjust.requestAppTrackingAuthorization = function(callback) {
    if (Platform.OS === "ios") {
        module_adjust.requestAppTrackingAuthorization(callback);
    }
};

Adjust.updateSkanConversionValue = function(conversionValue, coarseValue, lockWindow, callback) {
    if (Platform.OS === "ios") {
        if (!Number.isInteger(conversionValue) || 
            typeof coarseValue !== 'string' || 
            typeof lockWindow !== 'boolean') {
            console.log("[Adjust] SKAN parameters are not of a proper data types");
            return;
        }
        module_adjust.updateSkanConversionValue(conversionValue, coarseValue, lockWindow, callback);
    }
};

Adjust.getIdfa = function(callback) {
    if (Platform.OS === "ios") {
        module_adjust.getIdfa(callback);
    }
};

Adjust.getIdfv = function(callback) {
    if (Platform.OS === "ios") {
        module_adjust.getIdfv(callback);
    }
};

Adjust.getAppTrackingAuthorizationStatus = function(callback) {
    if (Platform.OS === "ios") {
        module_adjust.getAppTrackingAuthorizationStatus(callback);
    }
};

// android only

Adjust.trackPlayStoreSubscription = function(adjustPlayStoreSubscription) {
    if (Platform.OS === "android") {
        module_adjust.trackPlayStoreSubscription(adjustPlayStoreSubscription);
    }
};

Adjust.verifyPlayStorePurchase = function(adjustPlayStorePurchase, callback) {
    if (Platform.OS === "android") {
        module_adjust.verifyPlayStorePurchase(adjustPlayStorePurchase, callback);
    }
};

Adjust.verifyAndTrackPlayStorePurchase = function(adjustEvent, callback) {
    if (Platform.OS === "android") {
        module_adjust.verifyAndTrackPlayStorePurchase(adjustEvent, callback);
    }
};

Adjust.enablePlayStoreKidsComplianceInDelay = function() {
    if (Platform.OS === "android") {
    module_adjust.enablePlayStoreKidsComplianceInDelay();
    }
};

Adjust.disablePlayStoreKidsComplianceInDelay = function() {
    if (Platform.OS === "android") {
    module_adjust.disablePlayStoreKidsComplianceInDelay();
    }
};

Adjust.getGoogleAdId = function(callback) {
    if (Platform.OS === "android") {
        module_adjust.getGoogleAdId(callback);
    }
};

Adjust.getAmazonAdId = function(callback) {
    if (Platform.OS === "android") {
        module_adjust.getAmazonAdId(callback);
    }
};

// =========================================== //
// Adjust methods used for SDK testing only.   //
// Do NOT use any of these in production code. //
// =========================================== //

Adjust.onResume = function(testParam) {
    if (testParam === null || testParam === undefined || testParam !== 'test') {
        return;
    }
    module_adjust.onResume();
};

Adjust.onPause = function(testParam) {
    if (testParam === null || testParam === undefined || testParam !== 'test') {
        return;
    }
    module_adjust.onPause();
};

Adjust.setTestOptions = function(testOptions) {
    module_adjust.setTestOptions(testOptions);
};

Adjust.teardown = function(testParam) {
    if (testParam === null || testParam === undefined || testParam !== 'test') {
        return;
    }
    Adjust.componentWillUnmount();
    module_adjust.teardown();
};

// AdjustConfig

var AdjustConfig = function(appToken, environment) {
    // common
    this.sdkPrefix = "react-native5.4.0";
    this.appToken = appToken;
    this.environment = environment;
    this.logLevel = null;
    this.isDeferredDeeplinkOpeningEnabled = null;
    this.isSendingInBackgroundEnabled = null;
    this.isCostDataInAttributionEnabled = null;
    this.isFirstSessionDelayEnabled = null;
    this.defaultTracker = null;
    this.externalDeviceId = null;
    this.isDeviceIdsReadingOnceEnabled = null;
    this.isCoppaComplianceEnabled = null;
    this.eventDeduplicationIdsMaxSize = null;
    this.isDataResidency = null;
    this.urlStrategyDomains = null;
    this.useSubdomains = null;
    this.storeInfo = null;

    // ios only
    this.isAdServicesEnabled = null;
    this.isIdfaReadingAllowed = null;
    this.isIdfvReadingAllowed = null;
    this.isSkanAttributionEnabled = null;
    this.attConsentWaitingInterval = null;
    this.isLinkMeEnabled = null;
    this.isAppTrackingTransparencyUsageEnabled = null;

    // android only
    this.processName = null;
    this.isPreinstallTrackingEnabled = null;
    this.preinstallFilePath = null;
    this.isPlayStoreKidsComplianceEnabled = null;
    this.fbAppId;

    
};

AdjustConfig.EnvironmentSandbox = "sandbox";
AdjustConfig.EnvironmentProduction = "production";

AdjustConfig.LogLevelVerbose = "VERBOSE";
AdjustConfig.LogLevelDebug = "DEBUG";
AdjustConfig.LogLevelInfo = "INFO";
AdjustConfig.LogLevelWarn = "WARN";
AdjustConfig.LogLevelError = "ERROR";
AdjustConfig.LogLevelAssert = "ASSERT";
AdjustConfig.LogLevelSuppress = "SUPPRESS";

AdjustConfig.AttributionCallback = null;
AdjustConfig.EventTrackingSucceededCallback = null;
AdjustConfig.EventTrackingFailedCallback = null;
AdjustConfig.SessionTrackingSucceededCallback = null;
AdjustConfig.SessionTrackingFailedCallback = null;
AdjustConfig.DeferredDeeplinkCallback = null;
AdjustConfig.SkanUpdatedCallback = null

// common

AdjustConfig.prototype.setSdkPrefix = function(sdkPrefix) {
    if (typeof sdkPrefix !== 'string') {
        console.log("[Adjust] SDK prefix is not of type string");
        return;
    }
    this.sdkPrefix = sdkPrefix;
};

AdjustConfig.prototype.setLogLevel = function(logLevel) {
    if (typeof logLevel !== 'string') {
        console.log("[Adjust] Log level is not of type string");
        return;
    }
    this.logLevel = logLevel;
};

AdjustConfig.prototype.disableDeferredDeeplinkOpening = function() {
    this.isDeferredDeeplinkOpeningEnabled = false;
};

AdjustConfig.prototype.enableSendingInBackground = function() {
    this.isSendingInBackgroundEnabled = true;
};

AdjustConfig.prototype.setDefaultTracker = function(defaultTracker) {
    if (typeof defaultTracker !== 'string') {
        console.log("[Adjust] Default tracker is not of type string");
        return;
    }
    this.defaultTracker = defaultTracker;
};

AdjustConfig.prototype.setExternalDeviceId = function(externalDeviceId) {
    if (typeof externalDeviceId !== 'string') {
        console.log("[Adjust] External device ID is not of type string");
        return;
    }
    this.externalDeviceId = externalDeviceId;
};

AdjustConfig.prototype.enableDeviceIdsReadingOnce = function() {
    this.isDeviceIdsReadingOnceEnabled = true;
};

AdjustConfig.prototype.enableCoppaCompliance = function() {
    this.isCoppaComplianceEnabled = true;
};

AdjustConfig.prototype.enableCostDataInAttribution = function() {
    this.isCostDataInAttributionEnabled = true;
};

AdjustConfig.prototype.setEventDeduplicationIdsMaxSize = function(eventDeduplicationIdsMaxSize) {
    if (!Number.isInteger(eventDeduplicationIdsMaxSize)) {
        console.log("[Adjust] Maximum number of event deduplication IDs is not of type integer");
        return;
    }
    this.eventDeduplicationIdsMaxSize = eventDeduplicationIdsMaxSize;
};

AdjustConfig.prototype.setUrlStrategy = function(urlStrategyDomains, useSubdomains, isDataResidency) {
    if (!Array.isArray(urlStrategyDomains) ||
        typeof useSubdomains !== 'boolean' ||
        typeof isDataResidency !== 'boolean') {
        console.log("[Adjust] URL strategy parameters are not of a proper data types");
        return;
    }
    this.urlStrategyDomains = urlStrategyDomains;
    this.useSubdomains = useSubdomains;
    this.isDataResidency = isDataResidency;
};

AdjustConfig.prototype.enableFirstSessionDelay = function() {
    this.isFirstSessionDelayEnabled = true;
};

AdjustConfig.prototype.setStoreInfo = function(storeInfo) {
    this.storeInfo = storeInfo;
};

AdjustConfig.prototype.setAttributionCallback = function(attributionCallback) {
    if (null == AdjustConfig.AttributionCallback) {
        module_adjust.setAttributionCallbackImplemented();
        AdjustConfig.AttributionCallback = module_adjust_emitter.addListener(
            'adjust_attributionChanged', attributionCallback
        );
    }
};

AdjustConfig.prototype.setEventTrackingSucceededCallback = function(eventTrackingSucceededCallback) {
    if (null == AdjustConfig.EventTrackingSucceededCallback) {
        module_adjust.setEventTrackingSucceededCallbackImplemented();
        AdjustConfig.EventTrackingSucceededCallback = module_adjust_emitter.addListener(
            'adjust_eventTrackingSucceeded', eventTrackingSucceededCallback
        );
    }
};

AdjustConfig.prototype.setEventTrackingFailedCallback = function(eventTrackingFailedCallback) {
    if (null == AdjustConfig.EventTrackingFailedCallback) {
        module_adjust.setEventTrackingFailedCallbackImplemented();
        AdjustConfig.EventTrackingFailedCallback = module_adjust_emitter.addListener(
            'adjust_eventTrackingFailed', eventTrackingFailedCallback
        );
    }
};

AdjustConfig.prototype.setSessionTrackingSucceededCallback = function(sessionTrackingSucceededCallback) {
    if (null == AdjustConfig.SessionTrackingSucceededCallback) {
        module_adjust.setSessionTrackingSucceededCallbackImplemented();
        AdjustConfig.SessionTrackingSucceededCallback = module_adjust_emitter.addListener(
            'adjust_sessionTrackingSucceeded', sessionTrackingSucceededCallback
        );
    }
};

AdjustConfig.prototype.setSessionTrackingFailedCallback = function(sessionTrackingFailedCallback) {
    if (null == AdjustConfig.SessionTrackingFailedCallback) {
        module_adjust.setSessionTrackingFailedCallbackImplemented();
        AdjustConfig.SessionTrackingFailedCallback = module_adjust_emitter.addListener(
            'adjust_sessionTrackingFailed', sessionTrackingFailedCallback
        );
    }
};

AdjustConfig.prototype.setDeferredDeeplinkCallback = function(deferredDeeplinkCallback) {
    if (null == AdjustConfig.DeferredDeeplinkCallback) {
        module_adjust.setDeferredDeeplinkCallbackImplemented();
        AdjustConfig.DeferredDeeplinkCallback = module_adjust_emitter.addListener(
            'adjust_deferredDeeplinkReceived', deferredDeeplinkCallback
        );
    }
};

// ios only

AdjustConfig.prototype.disableAdServices = function() {
    this.isAdServicesEnabled = false;
};

AdjustConfig.prototype.disableIdfaReading = function() {
    this.isIdfaReadingAllowed = false;
};

AdjustConfig.prototype.disableIdfvReading = function() {
    this.isIdfvReadingAllowed = false;
};

AdjustConfig.prototype.disableSkanAttribution = function() {
    this.isSkanAttributionEnabled = false;
};

AdjustConfig.prototype.enableLinkMe = function() {
    this.isLinkMeEnabled = true;
};

AdjustConfig.prototype.disableAppTrackingTransparencyUsage = function() {
    this.isAppTrackingTransparencyUsageEnabled = false;
};

AdjustConfig.prototype.setAttConsentWaitingInterval = function(attConsentWaitingInterval) {
    if (!Number.isInteger(attConsentWaitingInterval)) {
        console.log("[Adjust] ATT consent waiting interval is not of type integer");
        return;
    }
    this.attConsentWaitingInterval = attConsentWaitingInterval;
};

AdjustConfig.prototype.setSkanUpdatedCallback = function(skanUpdatedCallback) {
    if (Platform.OS === "ios") {
        if (null == AdjustConfig.SkanUpdatedCallback) {
            module_adjust.setSkanUpdatedCallbackImplemented();
            AdjustConfig.SkanUpdatedCallback = module_adjust_emitter.addListener(
                'adjust_skanUpdated', skanUpdatedCallback
            );
        }
    }
};

// android only

AdjustConfig.prototype.enablePreinstallTracking = function() {
    this.isPreinstallTrackingEnabled = true;
};

AdjustConfig.prototype.setPreinstallFilePath = function(preinstallFilePath) {
    if (typeof preinstallFilePath !== 'string') {
        console.log("[Adjust] Preinstall file path is not of type string");
        return;
    }
    this.preinstallFilePath = preinstallFilePath;
};

AdjustConfig.prototype.enablePlayStoreKidsCompliance = function() {
    this.isPlayStoreKidsComplianceEnabled = true;
};

AdjustConfig.prototype.setFbAppId = function(fbAppId) {
    if (typeof fbAppId !== 'string') {
        console.log("[Adjust] FB app ID is not of type string");
        return;
    }
    this.fbAppId = fbAppId;
};

// AdjustEvent

var AdjustEvent = function(eventToken) {
    // common
    this.eventToken = eventToken;
    this.revenue = null;
    this.currency = null;
    this.deduplicationId = null;
    this.callbackId = null;
    this.productId = null;
    this.callbackParameters = [];
    this.partnerParameters = [];

    // ios only
    this.transactionId = null;

    // android only
    this.purchaseToken = null;
};

// common

AdjustEvent.prototype.setRevenue = function(revenue, currency) {
    if (typeof revenue !== 'number' || typeof currency !== 'string') {
        console.log("[Adjust] Event revenue or currency is not of a proper data type");
    }
    this.revenue = revenue;
    this.currency = currency;
};

AdjustEvent.prototype.setProductId = function(productId) {
    if (typeof productId !== 'string') {
        console.log("[Adjust] Event product ID is not of type string");
        return;
    }
    this.productId = productId;
};

AdjustEvent.prototype.setDeduplicationId = function(deduplicationId) {
    if (typeof deduplicationId !== 'string') {
        console.log("[Adjust] Event deduplication ID is not of type string");
        return;
    }
    this.deduplicationId = deduplicationId;
};

AdjustEvent.prototype.setCallbackId = function(callbackId) {
    if (typeof callbackId !== 'string') {
        console.log("[Adjust] Event callback ID is not of type string");
        return;
    }
    this.callbackId = callbackId;
};

AdjustEvent.prototype.addCallbackParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        console.log("[Adjust] Event callback parameter key or value is not of type string");
        return;
    }
    this.callbackParameters.push(key);
    this.callbackParameters.push(value);
};

AdjustEvent.prototype.addPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        console.log("[Adjust] Event partner parameter key or value is not of type string");
        return;
    }
    this.partnerParameters.push(key);
    this.partnerParameters.push(value);
};

// ios only

AdjustEvent.prototype.setTransactionId = function(transactionId) {
    if (typeof transactionId !== 'string') {
        console.log("[Adjust] Event transaction ID is not of type string");
        return;
    }
    this.transactionId = transactionId;
};

// android only

AdjustEvent.prototype.setPurchaseToken = function(purchaseToken) {
    if (typeof purchaseToken !== 'string') {
        console.log("[Adjust] Event purchase token is not of type string");
        return;
    }
    this.purchaseToken = purchaseToken;
};

// AdjustAdRevenue

var AdjustAdRevenue = function(source) {
    this.source = source;
    this.revenue = null;
    this.currency = null;
    this.adImpressionsCount = null;
    this.adRevenueNetwork = null;
    this.adRevenueUnit = null;
    this.adRevenuePlacement = null;
    this.callbackParameters = [];
    this.partnerParameters = [];
};

AdjustAdRevenue.prototype.setRevenue = function(revenue, currency) {
    if (typeof revenue !== 'number' || typeof currency !== 'string') {
        console.log("[Adjust] Ad revenue or currency is not of a proper data type");
    }
    this.revenue = revenue;
    this.currency = currency;
};

AdjustAdRevenue.prototype.setAdImpressionsCount = function(adImpressionsCount) {
    if (!Number.isInteger(adImpressionsCount)) {
        console.log("[Adjust] Ad impressions count is not of type integer");
        return;
    }
    this.adImpressionsCount = adImpressionsCount;
};

AdjustAdRevenue.prototype.setAdRevenueNetwork = function(adRevenueNetwork) {
    if (typeof adRevenueNetwork !== 'string') {
        console.log("[Adjust] Ad revenue network is not of type string");
        return;
    }
    this.adRevenueNetwork = adRevenueNetwork;
};

AdjustAdRevenue.prototype.setAdRevenueUnit = function(adRevenueUnit) {
    if (typeof adRevenueUnit !== 'string') {
        console.log("[Adjust] Ad revenue unit is not of type string");
        return;
    }
    this.adRevenueUnit = adRevenueUnit;
};

AdjustAdRevenue.prototype.setAdRevenuePlacement = function(adRevenuePlacement) {
    if (typeof adRevenuePlacement !== 'string') {
        console.log("[Adjust] Ad revenue placement is not of type string");
        return;
    }
    this.adRevenuePlacement = adRevenuePlacement;
};

AdjustAdRevenue.prototype.addCallbackParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        console.log("[Adjust] Ad revenue callback parameter key or value is not of type string");
        return;
    }
    this.callbackParameters.push(key);
    this.callbackParameters.push(value);
};

AdjustAdRevenue.prototype.addPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        console.log("[Adjust] Ad revenue partner parameter key or value is not of type string");
        return;
    }
    this.partnerParameters.push(key);
    this.partnerParameters.push(value);
};

// AdjustThirdPartySharing

var AdjustThirdPartySharing = function(isEnabled) {
    this.isEnabled = isEnabled;
    this.granularOptions = [];
    this.partnerSharingSettings = [];
};

AdjustThirdPartySharing.prototype.addGranularOption = function(partnerName, key, value) {
    if (typeof partnerName !== 'string' || typeof key !== 'string' || typeof value !== 'string') {
        console.log("[Adjust] Granular option parameterName, key or value is not of a type string");
        return;
    }
    this.granularOptions.push(partnerName);
    this.granularOptions.push(key);
    this.granularOptions.push(value);
};

AdjustThirdPartySharing.prototype.addPartnerSharingSetting = function(partnerName, key, value) {
    if (typeof partnerName !== 'string' || typeof key !== 'string' || typeof value !== 'boolean') {
        console.log("[Adjust] Partner sharing setting parameters are not of a proper data type");
        return;
    }
    this.partnerSharingSettings.push(partnerName);
    this.partnerSharingSettings.push(key);
    this.partnerSharingSettings.push(value);
};

// AdjustDeeplink

var AdjustDeeplink = function(deeplink) {
    this.deeplink = deeplink;
    this.referrer = null;
};

AdjustDeeplink.prototype.setReferrer = function(referrer) {
    this.referrer = referrer;
};

// AdjustStoreInfo

var AdjustStoreInfo = function(storeName) {
    this.storeName = storeName;
    this.storeAppId = null;
};

AdjustStoreInfo.prototype.setStoreAppId = function(storeAppId) {
    this.storeAppId = storeAppId;
};

// AdjustAppStoreSubscription [ios]

var AdjustAppStoreSubscription = function(price, currency, transactionId) {
    this.price = price;
    this.currency = currency;
    this.transactionId = transactionId;
    this.transactionDate = null;
    this.salesRegion = null;
    this.callbackParameters = [];
    this.partnerParameters = [];
};

AdjustAppStoreSubscription.prototype.setTransactionDate = function(transactionDate) {
    if (typeof transactionDate !== 'string') {
        console.log("[Adjust] App Store subscription transaction date is not of type string");
        return;
    }
    this.transactionDate = transactionDate;
};

AdjustAppStoreSubscription.prototype.setSalesRegion = function(salesRegion) {
    if (typeof salesRegion !== 'string') {
        console.log("[Adjust] App Store subscription sales region is not of type string");
        return;
    }
    this.salesRegion = salesRegion;
};

AdjustAppStoreSubscription.prototype.addCallbackParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        console.log("[Adjust] App Store subscription callback parameter key or value is not of type string");
        return;
    }
    this.callbackParameters.push(key);
    this.callbackParameters.push(value);
};

AdjustAppStoreSubscription.prototype.addPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        console.log("[Adjust] App Store subscription partner parameter key or value is not of type string");
        return;
    }
    this.partnerParameters.push(key);
    this.partnerParameters.push(value);
};

// AdjustAppStorePurchase [ios]

var AdjustAppStorePurchase = function(productId, transactionId) {
    this.productId = productId;
    this.transactionId = transactionId;
};

// AdjustPlayStoreSubscription [android]

var AdjustPlayStoreSubscription = function(price, currency, sku, orderId, signature, purchaseToken) {
    this.price = price;
    this.currency = currency;
    this.sku = sku;
    this.orderId = orderId;
    this.signature = signature;
    this.purchaseToken = purchaseToken;
    this.purchaseTime = null;
    this.callbackParameters = [];
    this.partnerParameters = [];
};

AdjustPlayStoreSubscription.prototype.setPurchaseTime = function(purchaseTime) {
    if (!Number.isInteger(purchaseTime)) {
        console.log("[Adjust] Play Store subscription purchase time is not of type integer");
        return;
    }
    this.purchaseTime = purchaseTime;
};

AdjustPlayStoreSubscription.prototype.addCallbackParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        console.log("[Adjust] Play Store subscription callback parameter key or value is not of type string");
        return;
    }
    this.callbackParameters.push(key);
    this.callbackParameters.push(value);
};

AdjustPlayStoreSubscription.prototype.addPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        console.log("[Adjust] Play Store subscription partner parameter key or value is not of type string");
        return;
    }
    this.partnerParameters.push(key);
    this.partnerParameters.push(value);
};

// AdjustPlayStorePurchase [android]

var AdjustPlayStorePurchase = function(productId, purchaseToken) {
    this.productId = productId;
    this.purchaseToken = purchaseToken;
};

module.exports = {
    Adjust,
    AdjustConfig,
    AdjustEvent,
    AdjustAdRevenue,
    AdjustThirdPartySharing,
    AdjustDeeplink,
    AdjustStoreInfo,
    AdjustAppStoreSubscription,
    AdjustAppStorePurchase,
    AdjustPlayStoreSubscription,
    AdjustPlayStorePurchase
} 
