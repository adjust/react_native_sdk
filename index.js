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

Adjust.initSdk = function(adjustConfig) {
    module_adjust.initSdk(adjustConfig)
};

Adjust.enable = function() {
    module_adjust.enable();
};

Adjust.disable = function() {
    module_adjust.disable();
};

Adjust.isEnabled = function(callback) {
    module_adjust.isEnabled(callback);
};

Adjust.switchToOfflineMode = function() {
    module_adjust.switchToOfflineMode();
};

Adjust.switchBackToOnlineMode = function() {
    module_adjust.switchBackToOnlineMode();
};

Adjust.trackEvent = function(adjustEvent) {
    module_adjust.trackEvent(adjustEvent);
};

Adjust.trackAdRevenue = function(adjustAdrevenue) {
    module_adjust.trackAdRevenue(adjustAdrevenue);
};

Adjust.setPushToken = function(token) {
    module_adjust.setPushToken(token);
};

Adjust.processDeeplink = function(adjustDeeplink) {
    module_adjust.processDeeplink(adjustDeeplink);
};

Adjust.trackAppStoreSubscription = function(adjustAppStoreSubscription) {
    if (Platform.OS === "ios") {
        module_adjust.trackAppStoreSubscription(adjustAppStoreSubscription);
    }
};

Adjust.trackPlayStoreSubscription = function(adjustPlayStoreSubscription) {
    if (Platform.OS === "android") {
        module_adjust.trackPlayStoreSubscription(adjustPlayStoreSubscription);
    }
};

Adjust.addGlobalCallbackParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    module_adjust.addGlobalCallbackParameter(key, value);
};

Adjust.addGlobalPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    module_adjust.addGlobalPartnerParameter(key, value);
};

Adjust.removeGlobalCallbackParameter = function(key) {
    module_adjust.removeGlobalCallbackParameter(key);
};

Adjust.removeGlobalPartnerParameter = function(key) {
    module_adjust.removeGlobalPartnerParameter(key);
};

Adjust.removeGlobalCallbackParameters = function() {
    module_adjust.removeGlobalCallbackParameters();
};

Adjust.removeGlobalPartnerParameters = function() {
    module_adjust.removeGlobalPartnerParameters();
};

Adjust.gdprForgetMe = function() {
    module_adjust.gdprForgetMe();
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

Adjust.getGoogleAdId = function(callback) {
    if (Platform.OS === "android") {
        module_adjust.getGoogleAdId(callback);
    }
};

Adjust.getAdid = function(callback) {
    module_adjust.getAdid(callback);
};

Adjust.getAttribution = function(callback) {
    module_adjust.getAttribution(callback);
};

Adjust.getAmazonAdId = function(callback) {
    if (Platform.OS === "android") {
        module_adjust.getAmazonAdId(callback);
    }
};

Adjust.getSdkVersion = function(callback) {
    module_adjust.getSdkVersion("react-native5.0.0", callback);
};

Adjust.requestAppTrackingAuthorization = function(callback) {
    if (Platform.OS === "ios") {
        module_adjust.requestAppTrackingAuthorization(callback);
    }
};

Adjust.updateSkanConversionValue = function(conversionValue, coarseValue, lockWindow, callback) {
    if (Platform.OS === "ios") {
        module_adjust.updateSkanConversionValue(conversionValue, coarseValue, lockWindow, callback);
    }
};

Adjust.getAppTrackingAuthorizationStatus = function(callback) {
    if (Platform.OS === "ios") {
        module_adjust.getAppTrackingAuthorizationStatus(callback);
    }
};

Adjust.trackThirdPartySharing = function(adjustThirdPartySharing) {
    module_adjust.trackThirdPartySharing(adjustThirdPartySharing);
};

Adjust.trackMeasurementConsent = function(measurementConsent) {
    module_adjust.trackMeasurementConsent(measurementConsent);
};

Adjust.getLastDeeplink = function(callback) {
    module_adjust.getLastDeeplink(callback);
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

Adjust.processAndResolveDeeplink = function(adjustDeeplink, callback) {
    module_adjust.processAndResolveDeeplink(adjustDeeplink, callback);
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

// =========================================== //
// Adjust methods used for SDK testing only.   //
// Do NOT use any of these in production code. //
// =========================================== //

Adjust.teardown = function(testParam) {
    if (testParam === null || testParam === undefined || testParam !== 'test') {
        return;
    }
    Adjust.componentWillUnmount();
    module_adjust.teardown();
};

Adjust.setTestOptions = function(testOptions) {
    module_adjust.setTestOptions(testOptions);
};

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

// AdjustConfig

var AdjustConfig = function(appToken, environment) {
    this.sdkPrefix = "react-native5.0.0";
    this.appToken = appToken;
    this.environment = environment;
    this.logLevel = null;
    this.isDeferredDeeplinkOpeningEnabled = null;
    this.isSendingInBackgroundEnabled = null;
    this.isCostDataInAttributionEnabled = null;
    this.defaultTracker = null;
    this.externalDeviceId = null;
    this.isDeviceIdsReadingOnceEnabled = null;
    this.isCoppaComplianceEnabled = null;
    this.eventDeduplicationIdsMaxSize = null;
    this.isDataResidency = null;
    this.urlStrategyDomains = null;
    this.useSubdomains = null;

    // Android only
    this.processName = null;
    this.isPreinstallTrackingEnabled = null;
    this.preinstallFilePath = null;
    this.isPlayStoreKidsComplianceEnabled = null;
    this.fbAppId;

    // iOS only
    this.isAdServicesEnabled = null;
    this.isIdfaReadingAllowed = null;
    this.isIdfvReadingAllowed = null;
    this.isSkanAttributionEnabled = null;
    this.attConsentWaitingInterval = null;
    this.isLinkMeEnabled = null;
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

AdjustConfig.prototype.setSdkPrefix = function(sdkPrefix) {
    this.sdkPrefix = sdkPrefix;
};

AdjustConfig.prototype.setLogLevel = function(logLevel) {
    this.logLevel = logLevel;
};

AdjustConfig.prototype.disableDeferredDeeplinkOpening = function() {
    this.isDeferredDeeplinkOpeningEnabled = false;
};

AdjustConfig.prototype.enableSendingInBackground = function() {
    this.isSendingInBackgroundEnabled = true;
};

AdjustConfig.prototype.setDefaultTracker = function(defaultTracker) {
    this.defaultTracker = defaultTracker;
};

AdjustConfig.prototype.setExternalDeviceId = function(externalDeviceId) {
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

AdjustConfig.prototype.enablePreinstallTracking = function() {
    this.isPreinstallTrackingEnabled = true;
};

AdjustConfig.prototype.setPreinstallFilePath = function(preinstallFilePath) {
    this.preinstallFilePath = preinstallFilePath;
};

AdjustConfig.prototype.enablePlayStoreKidsCompliance = function() {
    this.isPlayStoreKidsComplianceEnabled = true;
};

AdjustConfig.prototype.setFbAppId = function(fbAppId) {
    this.fbAppId = fbAppId;
};

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

AdjustConfig.prototype.setAttConsentWaitingInterval = function(attConsentWaitingInterval) {
    this.attConsentWaitingInterval = attConsentWaitingInterval;
};

AdjustConfig.prototype.setEventDeduplicationIdsMaxSize = function(eventDeduplicationIdsMaxSize) {
    this.eventDeduplicationIdsMaxSize = eventDeduplicationIdsMaxSize;
};

AdjustConfig.prototype.setUrlStrategy = function(urlStrategyDomains, useSubdomains, isDataResidency) {
    this.urlStrategyDomains = urlStrategyDomains;
    this.useSubdomains = useSubdomains;
    this.isDataResidency = isDataResidency;
};

AdjustConfig.prototype.setAttributionCallback = function(attributionCallback) {
    if (null == AdjustConfig.AttributionCallback) {
        module_adjust.setAttributionCallbackImplemented();
        AdjustConfig.AttributionCallback = module_adjust_emitter.addListener(
            'adjust_attribution', attributionCallback
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
            'adjust_deferredDeeplink', deferredDeeplinkCallback
        );
    }
};

AdjustConfig.prototype.setSkanUpdatedCallback = function(skadUpdatedCallback) {
    if (Platform.OS === "ios") {
        if (null == AdjustConfig.SkanUpdatedCallback) {
            module_adjust.setSkanUpdatedCallbackImplemented();
            AdjustConfig.SkanUpdatedCallback = module_adjust_emitter.addListener(
                'adjust_skadConversionDataUpdated', skadUpdatedCallback
            );
        }
    }
};

// AdjustEvent

var AdjustEvent = function(eventToken) {
    this.eventToken = eventToken;
    this.revenue = null;
    this.currency = null;
    this.deduplicationId = null;
    this.productId = null;
    this.transactionId = null;
    this.purchaseToken = null;
    this.callbackId = null;
    this.callbackParameters = [];
    this.partnerParameters = [];
};

AdjustEvent.prototype.setRevenue = function(revenue, currency) {
    this.revenue = revenue;
    this.currency = currency;
};

AdjustEvent.prototype.addCallbackParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.callbackParameters.push(key);
    this.callbackParameters.push(value);
};

AdjustEvent.prototype.addPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.partnerParameters.push(key);
    this.partnerParameters.push(value);
};

AdjustEvent.prototype.setProductId = function(productId) {
    this.productId = productId;
};

AdjustEvent.prototype.setTransactionId = function(transactionId) {
    this.transactionId = transactionId;
};

AdjustEvent.prototype.setPurchaseToken = function(purchaseToken) {
    this.purchaseToken = purchaseToken;
};

AdjustEvent.prototype.setDeduplicationId = function(deduplicationId) {
    this.deduplicationId = deduplicationId;
};

AdjustEvent.prototype.setCallbackId = function(callbackId) {
    this.callbackId = callbackId;
};

// AdjustAppStoreSubscription

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
    this.transactionDate = transactionDate;
};

AdjustAppStoreSubscription.prototype.setSalesRegion = function(salesRegion) {
    this.salesRegion = salesRegion;
};

AdjustAppStoreSubscription.prototype.addCallbackParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.callbackParameters.push(key);
    this.callbackParameters.push(value);
};

AdjustAppStoreSubscription.prototype.addPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.partnerParameters.push(key);
    this.partnerParameters.push(value);
};

// AdjustPlayStoreSubscription

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
    this.purchaseTime = purchaseTime;
};

AdjustPlayStoreSubscription.prototype.addCallbackParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.callbackParameters.push(key);
    this.callbackParameters.push(value);
};

AdjustPlayStoreSubscription.prototype.addPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.partnerParameters.push(key);
    this.partnerParameters.push(value);
};

var AdjustThirdPartySharing = function(isEnabled) {
    this.isEnabled = isEnabled;
    this.granularOptions = [];
    this.partnerSharingSettings = [];
};

AdjustThirdPartySharing.prototype.addGranularOption = function(partnerName, key, value) {
    if (typeof partnerName !== 'string' || typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.granularOptions.push(partnerName);
    this.granularOptions.push(key);
    this.granularOptions.push(value);
};

AdjustThirdPartySharing.prototype.addPartnerSharingSetting = function(partnerName, key, value) {
    if (typeof partnerName !== 'string' || typeof key !== 'string' || typeof value !== 'boolean') {
        return;
    }
    this.partnerSharingSettings.push(partnerName);
    this.partnerSharingSettings.push(key);
    this.partnerSharingSettings.push(value);
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
    this.revenue = revenue;
    this.currency = currency;
};

AdjustAdRevenue.prototype.setAdImpressionsCount = function(adImpressionsCount) {
    this.adImpressionsCount = adImpressionsCount.toString();
};

AdjustAdRevenue.prototype.setAdRevenueNetwork = function(adRevenueNetwork) {
    this.adRevenueNetwork = adRevenueNetwork;
};

AdjustAdRevenue.prototype.setAdRevenueUnit = function(adRevenueUnit) {
    this.adRevenueUnit = adRevenueUnit;
};

AdjustAdRevenue.prototype.setAdRevenuePlacement = function(adRevenuePlacement) {
    this.adRevenuePlacement = adRevenuePlacement;
};

AdjustAdRevenue.prototype.addCallbackParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.callbackParameters.push(key);
    this.callbackParameters.push(value);
};

AdjustAdRevenue.prototype.addPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.partnerParameters.push(key);
    this.partnerParameters.push(value);
};

// AdjustAppStorePurchase

var AdjustAppStorePurchase = function(productId, transactionId) {
    this.productId = productId;
    this.transactionId = transactionId;
};

// AdjustPlayStorePurchase

var AdjustPlayStorePurchase = function(productId, purchaseToken) {
    this.productId = productId;
    this.purchaseToken = purchaseToken;
};

// AdjustDeeplink

var AdjustDeeplink = function(deeplink) {
    this.deeplink = deeplink;
};

module.exports = {
    Adjust,
    AdjustConfig,
    AdjustEvent,
    AdjustAdRevenue,
    AdjustThirdPartySharing,
    AdjustAppStoreSubscription,
    AdjustPlayStoreSubscription,
    AdjustAppStorePurchase,
    AdjustPlayStorePurchase,
    AdjustDeeplink
}
