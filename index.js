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

Adjust.processDeeplink = function(deeplink) {
    module_adjust.processDeeplink(deeplink);
};

Adjust.trackAppStoreSubscription = function(subscription) {
    if (Platform.OS === "ios") {
        module_adjust.trackAppStoreSubscription(subscription);
    }
};

Adjust.trackPlayStoreSubscription = function(subscription) {
    if (Platform.OS === "android") {
        module_adjust.trackPlayStoreSubscription(subscription);
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
    module_adjust.getIdfa(callback);
};

Adjust.getIdfv = function(callback) {
    module_adjust.getIdfv(callback);
};

Adjust.getGoogleAdId = function(callback) {
    module_adjust.getGoogleAdId(callback);
};

Adjust.getAdid = function(callback) {
    module_adjust.getAdid(callback);
};

Adjust.getAttribution = function(callback) {
    module_adjust.getAttribution(callback);
};

Adjust.getAmazonAdId = function(callback) {
    module_adjust.getAmazonAdId(callback);
};

Adjust.getSdkVersion = function(callback) {
    module_adjust.getSdkVersion("react-native5.0.0", callback);
};

Adjust.setReferrer = function(referrer) {
    if (Platform.OS === "android") {
        module_adjust.setReferrer(referrer);
    }
};

Adjust.convertUniversalLink = function(url, scheme, callback) {
    if (!url || !scheme || !callback) {
        return;
    }
    module_adjust.convertUniversalLink(url, scheme, callback);
};

Adjust.requestAppTrackingAuthorizationWithCompletionHandler = function(callback) {
    module_adjust.requestAppTrackingAuthorizationWithCompletionHandler(callback);
};

Adjust.updateSkanConversionValueWithErrorCallback = function(conversionValue, coarseValue, lockWindow, callback) {
    module_adjust.updateSkanConversionValueWithErrorCallback(conversionValue, coarseValue, lockWindow, callback);
};

Adjust.getAppTrackingAuthorizationStatus = function(callback) {
    module_adjust.getAppTrackingAuthorizationStatus(callback);
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

Adjust.verifyAppStorePurchase = function(purchase, callback) {
    if (Platform.OS === "ios") {
        module_adjust.verifyAppStorePurchase(purchase, callback);
    }
};

Adjust.verifyAndTrackAppStorePurchase = function(adjustEvent, callback) {
     if (Platform.OS === "ios") {
        module_adjust.verifyAndTrackAppStorePurchase(adjustEvent, callback);
    }
};

Adjust.verifyPlayStorePurchase = function(purchase, callback) {
    if (Platform.OS === "android") {
        module_adjust.verifyPlayStorePurchase(purchase, callback);
    }
};

Adjust.processAndResolveDeeplink = function(deeplink, callback) {
    module_adjust.processAndResolveDeeplink(deeplink, callback);
};

Adjust.componentWillUnmount = function() {
    if (AdjustConfig.AttributionSubscription != null) {
        AdjustConfig.AttributionSubscription.remove();
        AdjustConfig.AttributionSubscription = null;
    }

    if (AdjustConfig.EventTrackingSucceededSubscription != null) {
        AdjustConfig.EventTrackingSucceededSubscription.remove();
        AdjustConfig.EventTrackingSucceededSubscription = null;
    }

    if (AdjustConfig.EventTrackingFailedSubscription != null) {
        AdjustConfig.EventTrackingFailedSubscription.remove();
        AdjustConfig.EventTrackingFailedSubscription = null;
    }

    if (AdjustConfig.SessionTrackingSucceededSubscription != null) {
        AdjustConfig.SessionTrackingSucceededSubscription.remove();
        AdjustConfig.SessionTrackingSucceededSubscription = null;
    }

    if (AdjustConfig.SessionTrackingFailedSubscription != null) {
        AdjustConfig.SessionTrackingFailedSubscription.remove();
        AdjustConfig.SessionTrackingFailedSubscription = null;
    }

    if (AdjustConfig.DeferredDeeplinkSubscription != null) {
        AdjustConfig.DeferredDeeplinkSubscription.remove();
        AdjustConfig.DeferredDeeplinkSubscription = null;
    }

    if (AdjustConfig.SkadConversionDataUpdatedSubscription != null) {
        AdjustConfig.SkadConversionDataUpdatedSubscription.remove();
        AdjustConfig.SkadConversionDataUpdatedSubscription = null;
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
    this.sendInBackground = null;
    this.isCostDataInAttributionEnabled = null;
    this.defaultTracker = null;
    this.externalDeviceId = null;
    this.shouldReadDeviceInfoOnce = null;
    this.isCoppaComplianceEnabled = null;

    // Android only
    this.processName = null;
    this.readMobileEquipmentIdentity = null;
    this.preinstallTrackingEnabled = null;
    this.preinstallFilePath = null;
    this.playStoreKidsAppEnabled = null;
    this.finalAndroidAttributionEnabled = null;
    this.fbAppId;
    // iOS only
    this.isAdServicesEnabled = null;
    this.isIdfaReadingAllowed = null;
    this.isSkanAttributionHandlingEnabled = null;
    this.attConsentWaitingInterval = null;
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

AdjustConfig.AttributionSubscription = null;
AdjustConfig.EventTrackingSucceededSubscription = null;
AdjustConfig.EventTrackingFailedSubscription = null;
AdjustConfig.SessionTrackingSucceededSubscription = null;
AdjustConfig.SessionTrackingFailedSubscription = null;
AdjustConfig.DeferredDeeplinkSubscription = null;
AdjustConfig.SkadConversionDataUpdatedSubscription = null

AdjustConfig.prototype.setSdkPrefix = function(sdkPrefix) {
    this.sdkPrefix = sdkPrefix;
};

AdjustConfig.prototype.setLogLevel = function(logLevel) {
    this.logLevel = logLevel;
};

AdjustConfig.prototype.setDeferredDeeplinkOpeningEnabled = function(isDeferredDeeplinkOpeningEnabled) {
    this.isDeferredDeeplinkOpeningEnabled = isDeferredDeeplinkOpeningEnabled;
};

AdjustConfig.prototype.enableSendingInBackground = function() {
    this.sendInBackground = true;
};

AdjustConfig.prototype.setDefaultTracker= function(defaultTracker) {
    this.defaultTracker = defaultTracker;
};

AdjustConfig.prototype.setExternalDeviceId = function(externalDeviceId) {
    this.externalDeviceId = externalDeviceId;
};

AdjustConfig.prototype.readDeviceInfoOnce = function() {
    this.shouldReadDeviceInfoOnce = true;
};

AdjustConfig.prototype.enableCoppaCompliance = function() {
    this.isCoppaComplianceEnabled = true;
};

AdjustConfig.prototype.enableCostDataInAttribution = function() {
    this.isCostDataInAttributionEnabled = true;
};

AdjustConfig.prototype.setPreinstallTrackingEnabled = function(isEnabled) {
    this.preinstallTrackingEnabled = isEnabled;
};

AdjustConfig.prototype.setPreinstallFilePath = function(preinstallFilePath) {
    this.preinstallFilePath = preinstallFilePath;
};

AdjustConfig.prototype.setPlayStoreKidsAppEnabled = function(isEnabled) {
    this.playStoreKidsAppEnabled = isEnabled;
};

AdjustConfig.prototype.setFinalAndroidAttributionEnabled = function(isEnabled) {
    this.finalAndroidAttributionEnabled = isEnabled;
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

AdjustConfig.prototype.disableSkanAttribution = function() {
    this.isSkanAttributionHandlingEnabled = false;
};

AdjustConfig.prototype.setAttConsentWaitingInterval = function(attConsentWaitingInterval) {
    this.attConsentWaitingInterval = attConsentWaitingInterval;
};

AdjustConfig.prototype.setAttributionCallbackListener = function(attributionCallbackListener) {
    if (null == AdjustConfig.AttributionSubscription) {
        module_adjust.setAttributionCallbackListener();
        AdjustConfig.AttributionSubscription = module_adjust_emitter.addListener(
            'adjust_attribution', attributionCallbackListener
        );
    }
};

AdjustConfig.prototype.setEventTrackingSucceededCallbackListener = function(eventTrackingSucceededCallbackListener) {
    if (null == AdjustConfig.EventTrackingSucceededSubscription) {
        module_adjust.setEventTrackingSucceededCallbackListener();
        AdjustConfig.EventTrackingSucceededSubscription = module_adjust_emitter.addListener(
            'adjust_eventTrackingSucceeded', eventTrackingSucceededCallbackListener
        );
    }
};

AdjustConfig.prototype.setEventTrackingFailedCallbackListener = function(eventTrackingFailedCallbackListener) {
    if (null == AdjustConfig.EventTrackingFailedSubscription) {
        module_adjust.setEventTrackingFailedCallbackListener();
        AdjustConfig.EventTrackingFailedSubscription = module_adjust_emitter.addListener(
            'adjust_eventTrackingFailed', eventTrackingFailedCallbackListener
        );
    }
};

AdjustConfig.prototype.setSessionTrackingSucceededCallbackListener = function(sessionTrackingSucceededCallbackListener) {
    if (null == AdjustConfig.SessionTrackingSucceededSubscription) {
        module_adjust.setSessionTrackingSucceededCallbackListener();
        AdjustConfig.SessionTrackingSucceededSubscription = module_adjust_emitter.addListener(
            'adjust_sessionTrackingSucceeded', sessionTrackingSucceededCallbackListener
        );
    }
};

AdjustConfig.prototype.setSessionTrackingFailedCallbackListener = function(sessionTrackingFailedCallbackListener) {
    if (null == AdjustConfig.SessionTrackingFailedSubscription) {
        module_adjust.setSessionTrackingFailedCallbackListener();
        AdjustConfig.SessionTrackingFailedSubscription = module_adjust_emitter.addListener(
            'adjust_sessionTrackingFailed', sessionTrackingFailedCallbackListener
        );
    }
};

AdjustConfig.prototype.setDeferredDeeplinkCallbackListener = function(deferredDeeplinkCallbackListener) {
    if (null == AdjustConfig.DeferredDeeplinkSubscription) {
        module_adjust.setDeferredDeeplinkCallbackListener();
        AdjustConfig.DeferredDeeplinkSubscription = module_adjust_emitter.addListener(
            'adjust_deferredDeeplink', deferredDeeplinkCallbackListener
        );
    }
};

AdjustConfig.prototype.setSkadConversionDataUpdatedCallbackListener = function(skadConversionDataUpdatedCallbackListener) {
    if (Platform.OS === "ios") {
        if (null == AdjustConfig.SkadConversionDataUpdatedSubscription) {
            module_adjust.setSkadConversionDataUpdatedCallbackListener();
            AdjustConfig.SkadConversionDataUpdatedSubscription = module_adjust_emitter.addListener(
                'adjust_skadConversionDataUpdated', skadConversionDataUpdatedCallbackListener
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
    this.callbackId = null;
    this.callbackParameters = {};
    this.partnerParameters = {};
};

AdjustEvent.prototype.setRevenue = function(revenue, currency) {
    if (revenue != null) {
        this.revenue = revenue.toString();
        this.currency = currency;
    }
};

AdjustEvent.prototype.addCallbackParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.callbackParameters[key] = value;
};

AdjustEvent.prototype.addPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.partnerParameters[key] = value;
};

AdjustEvent.prototype.setProductId = function(productId) {
    this.productId = productId;
};

AdjustEvent.prototype.setTransactionId = function(transactionId) {
    this.transactionId = transactionId;
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
    this.callbackParameters = {};
    this.partnerParameters = {};
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
    this.callbackParameters[key] = value;
};

AdjustAppStoreSubscription.prototype.addPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.partnerParameters[key] = value;
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
    this.callbackParameters = {};
    this.partnerParameters = {};
};

AdjustPlayStoreSubscription.prototype.setPurchaseTime = function(purchaseTime) {
    this.purchaseTime = purchaseTime;
};

AdjustPlayStoreSubscription.prototype.addCallbackParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.callbackParameters[key] = value;
};

AdjustPlayStoreSubscription.prototype.addPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.partnerParameters[key] = value;
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
    this.callbackParameters = {};
    this.partnerParameters = {};
};

AdjustAdRevenue.prototype.setRevenue = function(revenue, currency) {
    if (revenue != null) {
        this.revenue = revenue.toString();
        this.currency = currency;
    }
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
    this.callbackParameters[key] = value;
};

AdjustAdRevenue.prototype.addPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    this.partnerParameters[key] = value;
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

module.exports = {
    Adjust,
    AdjustConfig,
    AdjustEvent,
    AdjustAdRevenue,
    AdjustThirdPartySharing,
    AdjustAppStoreSubscription,
    AdjustPlayStoreSubscription,
    AdjustAppStorePurchase,
    AdjustPlayStorePurchase
}
