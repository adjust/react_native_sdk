'use strict';

import { DeviceEventEmitter } from 'react-native';
var ReactNative = require('react-native');
var {
    NativeModules
} = ReactNative;

var module_adjust = NativeModules.Adjust;
var Adjust = {};

//testing iOS
Adjust.test = function() {
    module_adjust.test();
};

Adjust.create = function(adjustConfig) {
    module_adjust.create(adjustConfig);
};

Adjust.trackEvent = function (adjustEvent) {
    module_adjust.trackEvent(adjustEvent);
};

//Adjust.setEnabled = function(enabled) {
    //module_adjust.setEnabled(enabled);
//};

//Adjust.isEnabled = function(callback) {
    //module_adjust.isEnabled(callback);
//};

//Adjust.appWillOpenUrl = function(uri) {
    //module_adjust.appWillOpenUrl(uri);
//};

//Adjust.setReferrer = function(referrer) {
    //module_adjust.setReferrer(referrer);
//};

//Adjust.setOfflineMode = function(enabled) {
    //module_adjust.setOfflineMode(enabled);
//};

//Adjust.sendFirstPackages = function() {
    //module_adjust.sendFirstPackages();
//};

//Adjust.isEnabled = function(callback) {
    //module_adjust.isEnabled(callback);
//};

//Adjust.addSessionCallbackParameter = function(key, value) {
    //module_adjust.addSessionCallbackParameter(key, value);
//};

//Adjust.addSessionPartnerParameter = function(key, value) {
    //module_adjust.addSessionPartnerParameter(key, value);
//};

//Adjust.removeSessionCallbackParameter = function(key) {
    //module_adjust.removeSessionCallbackParameter(key);
//};

//Adjust.removeSessionPartnerParameter = function(key) {
    //module_adjust.removeSessionPartnerParameter(key);
//};

//Adjust.resetSessionCallbackParameters = function() {
    //module_adjust.resetSessionCallbackParameters();
//};

//Adjust.resetSessionPartnerParameters = function() {
    //module_adjust.resetSessionPartnerParameters();
//};

//Adjust.setPushToken = function(token) {
    //module_adjust.setPushToken(token);
//};

var AdjustEvent = function (eventToken) {
    this.eventToken = eventToken;
    this.revenue = 0.0;
    this.currency = null;
    this.callbackParameters = null;
    this.partnerParameters = null;

    this.setRevenue = function(revenue, currency) {
        this.revenue = revenue;
        this.currency = currency;
    };

    this.setCallbackParameters = function(callbackParameters) {
        this.callbackParameters = callbackParameters;
    };

    this.setPartnerParameters = function(partnerParameters) {
        this.partnerParameters = partnerParameters;
    };
};

var AdjustConfig = function(appToken, environment) {
    this.appToken = appToken;
    this.environment = environment;

    this.sdkPrefix = "react_native4.10.0";
    this.logLevel = AdjustConfig.LogLevelInfo;

    this.eventBufferingEnabled = false;
    this.shouldLaunchDeeplink = false;
    this.sendInBackground = false;

    this.delayStart = 0.0;

    this.defaultTracker = null;
    this.referrer = null;
    this.userAgent = null;

    // Android only
    this.processName = null;
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

AdjustConfig.prototype.getUserAgent = function() {
    return this.userAgent;
};

AdjustConfig.prototype.getDelayStart = function() {
    return this.delayStart;
};

AdjustConfig.prototype.getReferrer = function() {
    return this.referrer;
};

AdjustConfig.prototype.getSendInBackground = function() {
    return this.sendInBackground;
};

AdjustConfig.prototype.getShouldLaunchDeeplink = function() {
    return this.shouldLaunchDeeplink;
};

//SETTERS
//===========================
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

AdjustConfig.prototype.setDelayStart = function(delayStart) {
    this.delayStart = delayStart;
};

AdjustConfig.prototype.setReferrer = function(referrer) {
    this.referrer = referrer;
};

AdjustConfig.prototype.setSendInBackground = function(sendInBackground) {
    this.sendInBackground = sendInBackground;
};

AdjustConfig.prototype.setShouldLaunchDeeplink = function(shouldLaunchDeeplink) {
    this.shouldLaunchDeeplink = shouldLaunchDeeplink;
};

AdjustConfig.prototype.setAttributionCallbackListener 
    = function(attributionCallbackListener) {
        module_adjust.test();
        module_adjust.setAttributionCallbackListener();
        AdjustConfig.AttributionSubscription = DeviceEventEmitter.addListener('attribution', attributionCallbackListener);
    };

AdjustConfig.prototype.setEventTrackingSucceededCallbackListener 
    = function(eventTrackingSucceededCallbackListener) {
        module_adjust.setEventTrackingSucceededCallbackListener();
        AdjustConfig.EventTrackingSucceededSubscription = DeviceEventEmitter.addListener('eventTrackingSucceeded', eventTrackingSucceededCallbackListener);
    };

AdjustConfig.prototype.setEventTrackingFailedCallbackListener 
    = function(eventTrackingFailedCallbackListener) {
        module_adjust.setEventTrackingFailedCallbackListener();
        AdjustConfig.EventTrackingFailedSubscription = DeviceEventEmitter.addListener('eventTrackingFailed', eventTrackingFailedCallbackListener);
    };

AdjustConfig.prototype.setSessionTrackingSucceededCallbackListener 
    = function(sessionTrackingSucceededCallbackListener) {
        module_adjust.setSessionTrackingSucceededCallbackListener();
        AdjustConfig.SessionTrackingSucceededSubscription = DeviceEventEmitter.addListener('sessionTrackingSucceeded', sessionTrackingSucceededCallbackListener);
    };

AdjustConfig.prototype.setSessionTrackingFailedCallbackListener 
    = function(sessionTrackingFailedCallbackListener) {
        module_adjust.setSessionTrackingFailedCallbackListener();
        AdjustConfig.SessionTrackingFailedSubscription = DeviceEventEmitter.addListener('sessionTrackingFailed', sessionTrackingFailedCallbackListener);
    };

AdjustConfig.prototype.setDeferredDeeplinkCallbackListener 
    = function(deferredDeeplinkCallbackListener) {
        module_adjust.setDeferredDeeplinkCallbackListener();
        AdjustConfig.DeferredDeeplinkSubscription = DeviceEventEmitter.addListener('deferredDeeplink', deferredDeeplinkCallbackListener);
    };

Adjust.componentWillUnmount = function() {

    if (AdjustConfig.AttributionSubscription) {
        AdjustConfig.AttributionSubscription.remove();
        module_adjust.clearAttributionCallbackListener();
    }

    if (AdjustConfig.EventTrackingSucceededSubscription) {
        AdjustConfig.EventTrackingSucceededSubscription.remove();
        module_adjust.clearEventTrackingSucceededListener();
    }

    if (AdjustConfig.EventTrackingFailedSubscription) {
        AdjustConfig.EventTrackingFailedSubscription.remove();
        module_adjust.clearEventTrackingFailedListener();
    }

    if (AdjustConfig.SessionTrackingSucceededSubscription) {
        AdjustConfig.SessionTrackingSucceededSubscription.remove();
        module_adjust.clearSessionTrackingSucceededListener();
    }

    if (AdjustConfig.SessionTrackingFailedSubscription) {
        AdjustConfig.SessionTrackingFailedSubscription.remove();
        module_adjust.clearSessionTrackingFailedListener();
    }

    if (AdjustConfig.DeferredDeeplinkSubscription) {
        AdjustConfig.DeferredDeeplinkSubscription.remove();
        module_adjust.clearDeferredDeeplinkCallbackListener();
    }
};

module.exports = { Adjust, AdjustEvent, AdjustConfig }
