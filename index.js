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

Adjust.trackAdRevenue = function(source, payload) {
    module_adjust.trackAdRevenue(source, payload);
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
    module_adjust.getSdkVersion("react-native4.26.0", callback);
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
    this.sdkPrefix = "react-native4.26.0";
    this.appToken = appToken;
    this.environment = environment;
    this.logLevel = null;
    this.eventBufferingEnabled = null;
    this.shouldLaunchDeeplink = null;
    this.sendInBackground = null;
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
    // Android only
    this.processName = null;
    this.readMobileEquipmentIdentity = null;
    // iOS only
    this.allowiAdInfoReading = null;
    this.allowIdfaReading = null;
    this.skAdNetworkHandling = null;
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
AdjustConfig.UrlStrategyChina = "china";
AdjustConfig.UrlStrategyIndia = "india";

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

AdjustConfig.prototype.setSdkPrefix = function(sdkPrefix) {
    this.sdkPrefix = sdkPrefix;
};

AdjustConfig.prototype.setUrlStrategy = function(urlStrategy) {
    this.urlStrategy = urlStrategy;
};

AdjustConfig.prototype.setReadMobileEquipmentIdentity = function(readMobileEquipmentIdentity) {
    // this.readMobileEquipmentIdentity = readMobileEquipmentIdentity;
};

AdjustConfig.prototype.setAllowiAdInfoReading = function(allowiAdInfoReading) {
    this.allowiAdInfoReading = allowiAdInfoReading;
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

// AdjustEvent

var AdjustEvent = function(eventToken) {
    this.eventToken = eventToken;
    this.revenue = null;
    this.currency = null;
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

AdjustEvent.prototype.setTransactionId = function(transactionId) {
    this.transactionId = transactionId;
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

module.exports = { Adjust, AdjustEvent, AdjustConfig, AdjustAppStoreSubscription, AdjustPlayStoreSubscription }
