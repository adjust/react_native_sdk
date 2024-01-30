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

Adjust.create = function(adjustConfig) {
    module_adjust.create(adjustConfig);
};

Adjust.trackEvent = function(adjustEvent) {
    module_adjust.trackEvent(adjustEvent);
};

Adjust.setEnabled = function(enabled) {
    module_adjust.setEnabled(enabled);
};

Adjust.isEnabled = function(callback) {
    module_adjust.isEnabled(callback);
};

Adjust.setOfflineMode = function(enabled) {
    module_adjust.setOfflineMode(enabled);
};

Adjust.setPushToken = function(token) {
    module_adjust.setPushToken(token);
};

Adjust.appWillOpenUrl = function(uri) {
    module_adjust.appWillOpenUrl(uri);
};

Adjust.sendFirstPackages = function() {
    module_adjust.sendFirstPackages();
};

Adjust.trackAdRevenue = function(source, payload = undefined) {
    if (payload === undefined) {
        // new API
        module_adjust.trackAdRevenueNew(source);
    } else {
        // old API
        module_adjust.trackAdRevenue(source, payload);
    }
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

Adjust.addSessionCallbackParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    module_adjust.addSessionCallbackParameter(key, value);
};

Adjust.addSessionPartnerParameter = function(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
        return;
    }
    module_adjust.addSessionPartnerParameter(key, value);
};

Adjust.removeSessionCallbackParameter = function(key) {
    module_adjust.removeSessionCallbackParameter(key);
};

Adjust.removeSessionPartnerParameter = function(key) {
    module_adjust.removeSessionPartnerParameter(key);
};

Adjust.resetSessionCallbackParameters = function() {
    module_adjust.resetSessionCallbackParameters();
};

Adjust.resetSessionPartnerParameters = function() {
    module_adjust.resetSessionPartnerParameters();
};

Adjust.gdprForgetMe = function() {
    module_adjust.gdprForgetMe();
};

Adjust.disableThirdPartySharing = function() {
    module_adjust.disableThirdPartySharing();
};

Adjust.getIdfa = function(callback) {
    module_adjust.getIdfa(callback);
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
    module_adjust.getSdkVersion("react-native4.37.0", callback);
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

Adjust.requestTrackingAuthorizationWithCompletionHandler = function(callback) {
    module_adjust.requestTrackingAuthorizationWithCompletionHandler(callback);
};

Adjust.updateConversionValue = function(conversionValue) {
    module_adjust.updateConversionValue(conversionValue);
};

Adjust.updateConversionValueWithErrorCallback = function(conversionValue, callback) {
    module_adjust.updateConversionValueWithErrorCallback(conversionValue, callback);
};

Adjust.updateConversionValueWithSkad4ErrorCallback = function(conversionValue, coarseValue, lockWindow, callback) {
    module_adjust.updateConversionValueWithSkad4ErrorCallback(conversionValue, coarseValue, lockWindow, callback);
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

Adjust.checkForNewAttStatus = function() {
    module_adjust.checkForNewAttStatus();
};

Adjust.getLastDeeplink = function(callback) {
    module_adjust.getLastDeeplink(callback);
};

Adjust.verifyAppStorePurchase = function(purchase, callback) {
    if (Platform.OS === "ios") {
        module_adjust.verifyAppStorePurchase(purchase, callback);
    }
};

Adjust.verifyPlayStorePurchase = function(purchase, callback) {
    if (Platform.OS === "android") {
        module_adjust.verifyPlayStorePurchase(purchase, callback);
    }
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

    if (AdjustConfig.ConversionValueUpdatedSubscription != null) {
        AdjustConfig.ConversionValueUpdatedSubscription.remove();
        AdjustConfig.ConversionValueUpdatedSubscription = null;
    }

    if (AdjustConfig.Skad4ConversionValueUpdatedSubscription != null) {
        AdjustConfig.Skad4ConversionValueUpdatedSubscription.remove();
        AdjustConfig.Skad4ConversionValueUpdatedSubscription = null;
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
    this.sdkPrefix = "react-native4.37.0";
    this.appToken = appToken;
    this.environment = environment;
    this.logLevel = null;
    this.eventBufferingEnabled = null;
    this.shouldLaunchDeeplink = null;
    this.sendInBackground = null;
    this.needsCost = null;
    this.delayStart = null;
    this.userAgent = null;
    this.isDeviceKnown = null;
    this.defaultTracker = null;
    this.externalDeviceId = null;
    this.secretId = null;
    this.info1 = null;
    this.info2 = null;
    this.info3 = null;
    this.info4 = null;
    this.urlStrategy = null;
    this.coppaCompliantEnabled = null;
    this.readDeviceInfoOnceEnabled = null;
    // Android only
    this.processName = null;
    this.readMobileEquipmentIdentity = null;
    this.preinstallTrackingEnabled = null;
    this.preinstallFilePath = null;
    this.playStoreKidsAppEnabled = null;
    this.finalAndroidAttributionEnabled = null;
    this.fbAppId;
    // iOS only
    this.allowiAdInfoReading = null;
    this.allowAdServicesInfoReading = null;
    this.allowIdfaReading = null;
    this.skAdNetworkHandling = null;
    this.linkMeEnabled = null;
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
AdjustConfig.ConversionValueUpdatedSubscription = null;
AdjustConfig.Skad4ConversionValueUpdatedSubscription = null;

AdjustConfig.UrlStrategyChina = "china";
AdjustConfig.UrlStrategyIndia = "india";
AdjustConfig.UrlStrategyCn = "cn";
AdjustConfig.UrlStrategyCnOnly = "cn-only";

AdjustConfig.DataResidencyEU = "data-residency-eu";
AdjustConfig.DataResidencyTR = "data-residency-tr";
AdjustConfig.DataResidencyUS = "data-residency-us";

AdjustConfig.AdRevenueSourceAppLovinMAX = "applovin_max_sdk";
AdjustConfig.AdRevenueSourceMopub = "mopub";
AdjustConfig.AdRevenueSourceAdmob = "admob_sdk";
AdjustConfig.AdRevenueSourceIronSource = "ironsource_sdk";
AdjustConfig.AdRevenueSourceAdmost = "admost_sdk";
AdjustConfig.AdRevenueSourcePublisher = "publisher_sdk";
AdjustConfig.AdRevenueSourceTopOn = "topon_sdk";
AdjustConfig.AdRevenueSourceAdx = "adx_sdk";

AdjustConfig.prototype.setEventBufferingEnabled = function(isEnabled) {
    this.eventBufferingEnabled = isEnabled;
};

AdjustConfig.prototype.setLogLevel = function(logLevel) {
    this.logLevel = logLevel;
};

AdjustConfig.prototype.setProcessName = function(processName) {
    this.processName = processName;
};

AdjustConfig.prototype.setDefaultTracker = function(defaultTracker) {
    this.defaultTracker = defaultTracker;
};

AdjustConfig.prototype.setExternalDeviceId = function(externalDeviceId) {
    this.externalDeviceId = externalDeviceId;
};

AdjustConfig.prototype.setUserAgent = function(userAgent) {
    this.userAgent = userAgent;
};

AdjustConfig.prototype.setAppSecret = function(secretId, info1, info2, info3, info4) {
    if (secretId != null) {
        this.secretId = secretId.toString();
    }
    if (info1 != null) {
        this.info1 = info1.toString();
    }
    if (info2 != null) {
        this.info2 = info2.toString();
    }
    if (info3 != null) {
        this.info3 = info3.toString();
    }
    if (info4 != null) {
        this.info4 = info4.toString();
    }
};

AdjustConfig.prototype.setDelayStart = function(delayStart) {
    this.delayStart = delayStart;
};

AdjustConfig.prototype.setSendInBackground = function(sendInBackground) {
    this.sendInBackground = sendInBackground;
};

AdjustConfig.prototype.setDeviceKnown = function(isDeviceKnown) {
    this.isDeviceKnown = isDeviceKnown;
};

AdjustConfig.prototype.setNeedsCost = function(needsCost) {
    this.needsCost = needsCost;
};

AdjustConfig.prototype.setSdkPrefix = function(sdkPrefix) {
    this.sdkPrefix = sdkPrefix;
};

AdjustConfig.prototype.setUrlStrategy = function(urlStrategy) {
    this.urlStrategy = urlStrategy;
};

AdjustConfig.prototype.setCoppaCompliantEnabled = function(coppaCompliantEnabled) {
    this.coppaCompliantEnabled = coppaCompliantEnabled;
};

AdjustConfig.prototype.setReadDeviceInfoOnceEnabled = function(readDeviceInfoOnceEnabled) {
    this.readDeviceInfoOnceEnabled = readDeviceInfoOnceEnabled;
};

AdjustConfig.prototype.setReadMobileEquipmentIdentity = function(readMobileEquipmentIdentity) {
    // this.readMobileEquipmentIdentity = readMobileEquipmentIdentity;
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

AdjustConfig.prototype.setAllowiAdInfoReading = function(allowiAdInfoReading) {
    this.allowiAdInfoReading = allowiAdInfoReading;
};

AdjustConfig.prototype.setAllowAdServicesInfoReading = function(allowAdServicesInfoReading) {
    this.allowAdServicesInfoReading = allowAdServicesInfoReading;
};

AdjustConfig.prototype.setAllowIdfaReading = function(allowIdfaReading) {
    this.allowIdfaReading = allowIdfaReading;
};

AdjustConfig.prototype.setShouldLaunchDeeplink = function(shouldLaunchDeeplink) {
    this.shouldLaunchDeeplink = shouldLaunchDeeplink;
};

AdjustConfig.prototype.deactivateSKAdNetworkHandling = function() {
    this.skAdNetworkHandling = false;
};

AdjustConfig.prototype.setLinkMeEnabled = function(linkMeEnabled) {
    this.linkMeEnabled = linkMeEnabled;
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

AdjustConfig.prototype.setConversionValueUpdatedCallbackListener = function(conversionValueUpdatedCallbackListener) {
    if (Platform.OS === "ios") {
        if (null == AdjustConfig.ConversionValueUpdatedSubscription) {
            module_adjust.setConversionValueUpdatedCallbackListener();
            AdjustConfig.ConversionValueUpdatedSubscription = module_adjust_emitter.addListener(
                'adjust_conversionValueUpdated', conversionValueUpdatedCallbackListener
            );
        }
    }
};

AdjustConfig.prototype.setSkad4ConversionValueUpdatedCallbackListener = function(skad4ConversionValueUpdatedCallbackListener) {
    if (Platform.OS === "ios") {
        if (null == AdjustConfig.Skad4ConversionValueUpdatedSubscription) {
            module_adjust.setSkad4ConversionValueUpdatedCallbackListener();
            AdjustConfig.Skad4ConversionValueUpdatedSubscription = module_adjust_emitter.addListener(
                'adjust_skad4ConversionValueUpdated', skad4ConversionValueUpdatedCallbackListener
            );
        }
    }
};

// AdjustEvent

var AdjustEvent = function(eventToken) {
    this.eventToken = eventToken;
    this.revenue = null;
    this.currency = null;
    this.receipt = null;
    this.productId = null;
    this.transactionId = null;
    this.purchaseToken = null;
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

AdjustEvent.prototype.setReceipt = function(receipt) {
    this.receipt = receipt;
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

AdjustEvent.prototype.setCallbackId = function(callbackId) {
    this.callbackId = callbackId;
};

// AdjustAppStoreSubscription

var AdjustAppStoreSubscription = function(price, currency, transactionId, receipt) {
    this.price = price;
    this.currency = currency;
    this.transactionId = transactionId;
    this.receipt = receipt;
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

// AdjustThirdPartySharing

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

var AdjustAppStorePurchase = function(receipt, productId, transactionId) {
    this.receipt = receipt;
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
    AdjustEvent,
    AdjustConfig,
    AdjustAppStoreSubscription,
    AdjustPlayStoreSubscription,
    AdjustThirdPartySharing,
    AdjustAdRevenue,
    AdjustAppStorePurchase,
    AdjustPlayStorePurchase
}
