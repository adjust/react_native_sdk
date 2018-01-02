'use strict';

import { NativeEventEmitter, NativeModules } from 'react-native';

const module_adjust = NativeModules.Adjust;
const module_adjust_emitter = new NativeEventEmitter(NativeModules.AdjustEventEmitter);
var Adjust = {};

Adjust.create = function(adjustConfig) {
    module_adjust.create(adjustConfig);
};

Adjust.trackEvent = function (adjustEvent) {
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

Adjust.addSessionCallbackParameter = function(key, value) {
    module_adjust.addSessionCallbackParameter(key, value);
};

Adjust.addSessionPartnerParameter = function(key, value) {
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

Adjust.componentWillUnmount = function() {
    if(AdjustConfig.AttributionSubscription != null) {
        AdjustConfig.AttributionSubscription.remove();
        AdjustConfig.AttributionSubscription = null;
    }

    if(AdjustConfig.EventTrackingSucceededSubscription != null) {
        AdjustConfig.EventTrackingSucceededSubscription.remove();
        AdjustConfig.EventTrackingSucceededSubscription = null;
    }

    if(AdjustConfig.EventTrackingFailedSubscription != null) {
        AdjustConfig.EventTrackingFailedSubscription.remove();
        AdjustConfig.EventTrackingFailedSubscription = null;
    }

    if(AdjustConfig.SessionTrackingSucceededSubscription != null) {
        AdjustConfig.SessionTrackingSucceededSubscription.remove();
        AdjustConfig.SessionTrackingSucceededSubscription = null;
    }

    if(AdjustConfig.SessionTrackingFailedSubscription != null) {
        AdjustConfig.SessionTrackingFailedSubscription.remove();
        AdjustConfig.SessionTrackingFailedSubscription = null;
    }

    if(AdjustConfig.DeferredDeeplinkSubscription != null) {
        AdjustConfig.DeferredDeeplinkSubscription.remove();
        AdjustConfig.DeferredDeeplinkSubscription = null;
    }
};

var AdjustEvent = function (eventToken) {
    this.eventToken = eventToken;
    this.revenue = null;
    this.currency = null;
    this.transactionId = null;
    this.callbackParameters = {};
    this.partnerParameters = {};

    this.setRevenue = function(revenue, currency) {
        this.revenue = revenue;
        this.currency = currency;
    };

    this.addCallbackParameter = function(key, value) {
        this.callbackParameters[key] = value;
    };

    this.addPartnerParameter = function(key, value) {
        this.partnerParameters[key] = value;
    };

    this.setTransactionId = function(transactionId) {
        this.transactionId = transactionId;
    };
};

var AdjustConfig = function(appToken, environment) {
    this.appToken = appToken;
    this.environment = environment;

    this.sdkPrefix = "react_native4.12.0";
    this.logLevel = null;

    this.eventBufferingEnabled = null;
    this.shouldLaunchDeeplink = null;
    this.sendInBackground = null;

    this.delayStart = null;

    this.referrer = null;
    this.userAgent = null;
    this.isDeviceKnown = null;
    this.defaultTracker = null;

    this.secretId = null;
    this.info1 = null;
    this.info2 = null;
    this.info3 = null;
    this.info4 = null;

    // Android only
    this.processName = null;
    this.readMobileEquipmentIdentity = null;
};

AdjustConfig.EnvironmentSandbox                   = "sandbox";
AdjustConfig.EnvironmentProduction                = "production";

AdjustConfig.LogLevelVerbose                      = "VERBOSE";
AdjustConfig.LogLevelDebug                        = "DEBUG";
AdjustConfig.LogLevelInfo                         = "INFO";
AdjustConfig.LogLevelWarn                         = "WARN";
AdjustConfig.LogLevelError                        = "ERROR";
AdjustConfig.LogLevelAssert                       = "ASSERT";
AdjustConfig.LogLevelSuppress                     = "SUPPRESS";
AdjustConfig.AttributionSubscription              = null;
AdjustConfig.EventTrackingSucceededSubscription   = null;
AdjustConfig.EventTrackingFailedSubscription      = null;
AdjustConfig.SessionTrackingSucceededSubscription = null;
AdjustConfig.SessionTrackingFailedSubscription    = null;
AdjustConfig.DeferredDeeplinkSubscription         = null;

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

AdjustConfig.prototype.setUserAgent = function(userAgent) {
    this.userAgent = userAgent;
};

AdjustConfig.prototype.setAppSecret = function(secretId, info1, info2, info3, info4) {
    this.secretId = secretId.toString();
    this.info1 = info1.toString();
    this.info2 = info2.toString();
    this.info3 = info3.toString();
    this.info4 = info4.toString();
};

AdjustConfig.prototype.setDelayStart = function(delayStart) {
    this.delayStart = delayStart;
};

AdjustConfig.prototype.setReferrer = function(referrer) {
    this.referrer = referrer;
};

AdjustConfig.prototype.setSendInBackground = function(sendInBackground) {
    this.sendInBackground = sendInBackground;
};

AdjustConfig.prototype.setDeviceKnown = function(isDeviceKnown) {
    this.isDeviceKnown = isDeviceKnown;
};

AdjustConfig.prototype.setReadMobileEquipmentIdentity = function(readMobileEquipmentIdentity) {
    this.readMobileEquipmentIdentity = readMobileEquipmentIdentity;
};

AdjustConfig.prototype.setShouldLaunchDeeplink = function(shouldLaunchDeeplink) {
    this.shouldLaunchDeeplink = shouldLaunchDeeplink;
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

module.exports = { Adjust, AdjustEvent, AdjustConfig }
