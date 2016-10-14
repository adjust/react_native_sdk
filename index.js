'use strict';

var ReactNative = require('react-native');
var {
    NativeModules
} = ReactNative;

var module_adjust = NativeModules.Adjust;
var Adjust = {};

Adjust.trackEvent = function (adjustEvent) {
    module_adjust.trackEvent(adjustEvent);
};

Adjust.setEnabled = function(enabled) {
    module_adjust.setEnabled(enabled);
};

Adjust.isEnabled = function(callback) {
    module_adjust.isEnabled(callback);
};

Adjust.appWillOpenUrl = function(uri) {
    module_adjust.appWillOpenUrl(uri);
};

Adjust.setReferrer = function(referrer) {
    module_adjust.setReferrer(referrer);
};

Adjust.setOfflineMode = function(enabled) {
    module_adjust.setOfflineMode(enabled);
};

Adjust.sendFirstPackages = function() {
    module_adjust.sendFirstPackages();
};

Adjust.isEnabled = function(callback) {
    module_adjust.isEnabled(callback);
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

Adjust.setPushToken = function(token) {
    module_adjust.setPushToken(token);
};

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
}

var AdjustConfig = function(appToken, environment) {
    this.appToken = appToken;
    this.environment = environment;

    this.sdkPrefix = "react_native4.10.0";

    this.logLevel = null;
    this.defaultTracker = null;

    this.attributionCallbackListener = null;
    this.eventTrackingSuccessfulCallbackListener = null;
    this.eventTrackingFailedCallbackListener = null;
    this.sessionTrackingSuccessfulCallbackListener = null;
    this.sessionTrackingFailedCallbackListener = null;
    this.deeplinkCallbackListener = null;

    this.eventBufferingEnabled = null;
    this.shouldLaunchDeeplink = null;
    this.referrer = null;
    this.sendInBackground = null;

    this.userAgent = null;
    this.delayStart = 0.0;

    // Android only
    this.processName = null;
}

AdjustConfig.EnvironmentSandbox    = "sandbox";
AdjustConfig.EnvironmentProduction = "production";

AdjustConfig.LogLevelVerbose       = "VERBOSE";
AdjustConfig.LogLevelDebug         = "DEBUG";
AdjustConfig.LogLevelInfo          = "INFO";
AdjustConfig.LogLevelWarn          = "WARN";
AdjustConfig.LogLevelError         = "ERROR";
AdjustConfig.LogLevelAssert        = "ASSERT";
AdjustConfig.LogLevelSuppress      = "SUPPRESS";

//GETTERS
//===========================
AdjustConfig.prototype.getAttributionCallback = function() {
    return this.attributionCallbackListener;
};

AdjustConfig.prototype.getEventTrackingSuccessfulCallback = function() {
    return this.eventTrackingSuccessfulCallbackListener;
};

AdjustConfig.prototype.getEventTrackingFailedCallback = function() {
    return this.eventTrackingFailedCallbackListener;
};

AdjustConfig.prototype.getSessionTrackingSuccessfulCallback = function() {
    return this.eventTrackingSuccessfulCallbackListener;
};

AdjustConfig.prototype.getSessionTrackingFailedCallback = function() {
    return this.eventTrackingFailedCallbackListener;
};

AdjustConfig.prototype.getDeeplinkCallback = function() {
    return this.deeplinkCallbackListener;
};

AdjustConfig.prototype.getUserAgent = function() {
    return this.userAgent;
}

AdjustConfig.prototype.getDelayStart = function() {
    return this.delayStart;
}

AdjustConfig.prototype.getReferrer = function() {
    return this.referrer;
}

AdjustConfig.prototype.getSendInBackground = function() {
    return this.sendInBackground;
}

AdjustConfig.prototype.getShouldLaunchDeeplink = function() {
    return this.shouldLaunchDeeplink;
}

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
}

AdjustConfig.prototype.setDelayStart = function(delayStart) {
    this.delayStart = delayStart;
}

AdjustConfig.prototype.setAttributionCallbackListener = function(attributionCallbackListener) {
    this.attributionCallbackListener = attributionCallbackListener;
};

AdjustConfig.prototype.setEventTrackingSuccessfulCallbackListener 
    = function(eventTrackingSuccessfulCallbackListener) {
        this.eventTrackingSuccessfulCallbackListener = eventTrackingSuccessfulCallbackListener;
    };

AdjustConfig.prototype.setEventTrackingFailedCallbackListener 
    = function(eventTrackingFailedCallbackListener) {
        this.eventTrackingFailedCallbackListener = eventTrackingFailedCallbackListener;
    };

AdjustConfig.prototype.setSessionTrackingSuccessfulCallbackListener 
    = function(eventTrackingSuccessfulCallbackListener) {
        this.eventTrackingSuccessfulCallbackListener = eventTrackingSuccessfulCallbackListener;
    };

AdjustConfig.prototype.setSessionTrackingFailedCallbackListener 
    = function(eventTrackingFailedCallbackListener) {
        this.eventTrackingFailedCallbackListener = eventTrackingFailedCallbackListener;
    };

AdjustConfig.prototype.setDeeplinkCallbackListener 
    = function(deeplinkCallbackListener) {
        this.deeplinkCallbackListener = deeplinkCallbackListener;
    };

AdjustConfig.prototype.setReferrer = function(referrer) {
    this.referrer = referrer;
}

AdjustConfig.prototype.setSendInBackground = function(sendInBackground) {
    this.sendInBackground = sendInBackground;
}

AdjustConfig.prototype.setShouldLaunchDeeplink = function(shouldLaunchDeeplink) {
    this.shouldLaunchDeeplink = shouldLaunchDeeplink;
}

//HAS
//=================================

AdjustConfig.prototype.hasAttributionListener = function() {
    return this.attributionCallbackListener != null;
};

AdjustConfig.prototype.hasEventTrackingSuccessfulListener = function() {
    return this.eventTrackingSuccessfulCallbackListener != null;
};

AdjustConfig.prototype.hasEventTrackingFailedListener = function() {
    return this.eventTrackingFailedCallbackListener != null;
};

AdjustConfig.prototype.hasSessionTrackingSuccessfulListener = function() {
    return this.eventTrackingSuccessfulCallbackListener != null;
};

AdjustConfig.prototype.hasSessionTrackingFailedListener = function() {
    return this.eventTrackingFailedCallbackListener != null;
};

AdjustConfig.prototype.hasDeeplinkCallbackListener = function() {
    return this.deeplinkCallbackListener != null;
};

module.exports = { Adjust, AdjustEvent, AdjustConfig }
