//
//  Adjust.java
//  Adjust
//
//  Created by Abdullah Obaied on 2016-10-19.
//  Copyright (c) 2016 adjust GmbH. All rights reserved.
//  See the file MIT-LICENSE for copying permission.
//

package com.adjust.nativemodule;

import java.util.Map;
import java.util.HashMap;
import java.util.Map.Entry;

import android.net.Uri;
import javax.annotation.Nullable;

import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.*;
import android.util.Log;

import com.adjust.sdk.*;

public class Adjust extends ReactContextBaseJavaModule implements LifecycleEventListener, 
                OnAttributionChangedListener, 
                OnEventTrackingSucceededListener,
                OnEventTrackingFailedListener,
                OnSessionTrackingSucceededListener,
                OnSessionTrackingFailedListener,
                OnDeeplinkResponseListener {
    private boolean attributionCallback;
    private boolean eventTrackingSucceededCallback;
    private boolean eventTrackingFailedCallback;
    private boolean sessionTrackingSucceededCallback;
    private boolean sessionTrackingFailedCallback;
    private boolean deferredDeeplinkCallback;
    private boolean shouldLaunchDeeplink = true;

    public Adjust(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Adjust";
    }

    @Override
    public void initialize() {
        getReactApplicationContext().addLifecycleEventListener(this);
    }

    @Override
    public void onHostPause() {
        com.adjust.sdk.Adjust.onPause();
    }

    @Override
    public void onHostResume() {
        com.adjust.sdk.Adjust.onResume();
    }

    @Override
    public void onHostDestroy() {}

    @Override
    public void onAttributionChanged(AdjustAttribution attribution) {
        sendEvent(getReactApplicationContext(), "adjust_attribution", AdjustUtil.attributionToMap(attribution));
    }

    @Override
    public void onFinishedEventTrackingSucceeded(AdjustEventSuccess event) {
        sendEvent(getReactApplicationContext(), "adjust_eventTrackingSucceeded", AdjustUtil.eventSuccessToMap(event));
    }

    @Override
    public void onFinishedEventTrackingFailed(AdjustEventFailure event) {
        sendEvent(getReactApplicationContext(), "adjust_eventTrackingFailed", AdjustUtil.eventFailureToMap(event));
    }

    @Override
    public void onFinishedSessionTrackingSucceeded(AdjustSessionSuccess session) {
        sendEvent(getReactApplicationContext(), "adjust_sessionTrackingSucceeded", AdjustUtil.sessionSuccessToMap(session));
    }

    @Override
    public void onFinishedSessionTrackingFailed(AdjustSessionFailure session) {
        sendEvent(getReactApplicationContext(), "adjust_sessionTrackingFailed", AdjustUtil.sessionFailureToMap(session));
    }

    @Override
    public boolean launchReceivedDeeplink(Uri uri) {
        sendEvent(getReactApplicationContext(), "adjust_deferredDeeplink", AdjustUtil.deferredDeeplinkToMap(uri));
        return this.shouldLaunchDeeplink;
    }

    @ReactMethod
    public void create(ReadableMap mapConfig) {
        String environment            = null;
        String appToken               = null;
        String defaultTracker         = null;
        String processName            = null;
        String sdkPrefix              = null;
        String logLevel               = null;
        boolean eventBufferingEnabled = false;
        String userAgent              = null;
        long secretId                 = 0L;
        long info1                    = 0L;
        long info2                    = 0L;
        long info3                    = 0L;
        long info4                    = 0L;
        boolean sendInBackground      = false;
        boolean shouldLaunchDeeplink  = false;
        double delayStart             = 0.0;
        boolean isLogLevelSuppress    = false;
        boolean isUserKnown           = false;

        // Check for isLogLevelSuppress.
        if (!mapConfig.isNull("logLevel")) {
            logLevel = mapConfig.getString("logLevel");

            if (logLevel.equals("SUPPRESS")) {
                isLogLevelSuppress = true;
            }
        }

        // Check for appToken and environment.
        appToken    = mapConfig.getString("appToken");
        environment = mapConfig.getString("environment");

        final AdjustConfig adjustConfig = new AdjustConfig(getReactApplicationContext(), appToken, environment, isLogLevelSuppress);

        if (!adjustConfig.isValid()) {
            return;
        }

        // Log level
        if (!mapConfig.isNull("logLevel")) {
            logLevel = mapConfig.getString("logLevel");

            if (logLevel.equals("VERBOSE")) {
                adjustConfig.setLogLevel(LogLevel.VERBOSE);
            } else if (logLevel.equals("DEBUG")) {
                adjustConfig.setLogLevel(LogLevel.DEBUG);
            } else if (logLevel.equals("INFO")) {
                adjustConfig.setLogLevel(LogLevel.INFO);
            } else if (logLevel.equals("WARN")) {
                adjustConfig.setLogLevel(LogLevel.WARN);
            } else if (logLevel.equals("ERROR")) {
                adjustConfig.setLogLevel(LogLevel.ERROR);
            } else if (logLevel.equals("ASSERT")) {
                adjustConfig.setLogLevel(LogLevel.ASSERT);
            } else if (logLevel.equals("SUPPRESS")) {
                adjustConfig.setLogLevel(LogLevel.SUPRESS);
            } else {
                adjustConfig.setLogLevel(LogLevel.INFO);
            }
        }

        // Event buffering
        if(!mapConfig.isNull("eventBufferingEnabled")) {
            eventBufferingEnabled = mapConfig.getBoolean("eventBufferingEnabled");
            adjustConfig.setEventBufferingEnabled(eventBufferingEnabled);
        }

        // SDK prefix
        if (!mapConfig.isNull("sdkPrefix")) {
            sdkPrefix = mapConfig.getString("sdkPrefix");
            adjustConfig.setSdkPrefix(sdkPrefix);
        }

        // Main process name
        if (!mapConfig.isNull("processName")) {
            processName = mapConfig.getString("processName");
            adjustConfig.setProcessName(processName);
        }

        // Default tracker
        if (!mapConfig.isNull("defaultTracker")) {
            defaultTracker = mapConfig.getString("defaultTracker");
            adjustConfig.setDefaultTracker(defaultTracker);
        }

        // User agent
        if (!mapConfig.isNull("userAgent") ) {
            userAgent = mapConfig.getString("userAgent");
            adjustConfig.setUserAgent(userAgent);
        }

        // App secret
        if (!mapConfig.isNull("secretId") 
                && !mapConfig.isNull("info1")
                && !mapConfig.isNull("info2")
                && !mapConfig.isNull("info3")
                && !mapConfig.isNull("info4")
                ) {
            try {
                secretId = Long.parseLong(mapConfig.getString("secretId"), 10);
                info1    = Long.parseLong(mapConfig.getString("info1"), 10);
                info2    = Long.parseLong(mapConfig.getString("info2"), 10);
                info3    = Long.parseLong(mapConfig.getString("info3"), 10);
                info4    = Long.parseLong(mapConfig.getString("info4"), 10);
                //Log.d("AdjustBridge", ": " + info1 + ": " + info2 + ": " + info3 + ": " + info4);
                adjustConfig.setAppSecret(secretId, info1, info2, info3, info4);
            } catch(NumberFormatException ignore) { }
        }

        // Background tracking
        if (!mapConfig.isNull("sendInBackground")) {
            sendInBackground = mapConfig.getBoolean("sendInBackground");
            adjustConfig.setSendInBackground(sendInBackground);
        }

        // Set User Known
        if (!mapConfig.isNull("isUserKnown")) {
            isUserKnown = mapConfig.getBoolean("isUserKnown");
            adjustConfig.setUserKnown(isUserKnown);
        }

        // Launching deferred deep link
        if (!mapConfig.isNull("shouldLaunchDeeplink")) {
            shouldLaunchDeeplink = mapConfig.getBoolean("shouldLaunchDeeplink");
            this.shouldLaunchDeeplink = shouldLaunchDeeplink;
        }

        // Delayed start
        if (!mapConfig.isNull("delayStart")) {
            delayStart = mapConfig.getDouble("delayStart");
            adjustConfig.setDelayStart(delayStart);
        }

        // Attribution callback
        if (attributionCallback) {
            adjustConfig.setOnAttributionChangedListener(this);
        }

        // Event tracking succeeded callback
        if (eventTrackingSucceededCallback) {
            adjustConfig.setOnEventTrackingSucceededListener(this);
        }

        // Event tracking failed callback
        if (eventTrackingFailedCallback) {
            adjustConfig.setOnEventTrackingFailedListener(this);
        }

        // Session tracking succeeded callback
        if (sessionTrackingSucceededCallback) {
            adjustConfig.setOnSessionTrackingSucceededListener(this);
        }

        // Session tracking failed callback
        if (sessionTrackingFailedCallback) {
            adjustConfig.setOnSessionTrackingFailedListener(this);
        }

        // Deferred deeplink callback listener
        if (deferredDeeplinkCallback) {
            adjustConfig.setOnDeeplinkResponseListener(this);
        }

        com.adjust.sdk.Adjust.onCreate(adjustConfig);
        com.adjust.sdk.Adjust.onResume();
    }

    @ReactMethod
    public void trackEvent(ReadableMap mapEvent) {
        final String eventToken = mapEvent.getString("eventToken");
        final String currency = mapEvent.getString("currency");
        final String transactionId = mapEvent.getString("transactionId");
        final Map<String, Object> callbackParameters  = AdjustUtil.toMap(mapEvent.getMap("callbackParameters"));
        final Map<String, Object> partnerParameters  = AdjustUtil.toMap(mapEvent.getMap("partnerParameters"));

        AdjustEvent event = new AdjustEvent(eventToken);
        
        if (event.isValid()) {
            if (!mapEvent.isNull("revenue")) {
                event.setRevenue(mapEvent.getDouble("revenue"), currency);
            }

            if (null != callbackParameters) {
                for (Map.Entry<String, Object> entry : callbackParameters.entrySet()) {
                    event.addCallbackParameter(entry.getKey(), entry.getValue().toString());
                }
            }

            if (null != partnerParameters) {
                for (Map.Entry<String, Object> entry : partnerParameters.entrySet()) {
                    event.addPartnerParameter(entry.getKey(), entry.getValue().toString());
                }
            }

            if (null != transactionId) {
                event.setOrderId(transactionId);
            }

            com.adjust.sdk.Adjust.trackEvent(event);
        }
    }

    @ReactMethod
    public void setEnabled(Boolean enabled) {
        com.adjust.sdk.Adjust.setEnabled(enabled);
    }

    @ReactMethod
    public void isEnabled(Callback callback) {
        callback.invoke(com.adjust.sdk.Adjust.isEnabled());
    }

    @ReactMethod
    public void setReferrer(String referrer) {
        com.adjust.sdk.Adjust.setReferrer(
                referrer,
                getReactApplicationContext()
                );
    }

    @ReactMethod
    public void setOfflineMode(Boolean enabled) {
        com.adjust.sdk.Adjust.setOfflineMode(enabled);
    }

    @ReactMethod
    public void setPushToken(String token) {
        com.adjust.sdk.Adjust.setPushToken(token);
    }

    @ReactMethod
    public void appWillOpenUrl(String strUri) {
        final Uri uri = Uri.parse(strUri);
        com.adjust.sdk.Adjust.appWillOpenUrl(uri);
    }

    @ReactMethod
    public void sendFirstPackages() {
        com.adjust.sdk.Adjust.sendFirstPackages();
    }

    @ReactMethod
    public void addSessionCallbackParameter(String key, String value) {
        com.adjust.sdk.Adjust.addSessionCallbackParameter(key, value);
    }

    @ReactMethod
    public void addSessionPartnerParameter(String key, String value) {
        com.adjust.sdk.Adjust.addSessionPartnerParameter(key, value);
    }

    @ReactMethod
    public void removeSessionCallbackParameter(String key) {
        com.adjust.sdk.Adjust.removeSessionCallbackParameter(key);
    }

    @ReactMethod
    public void removeSessionPartnerParameter(String key) {
        com.adjust.sdk.Adjust.removeSessionPartnerParameter(key);
    }

    @ReactMethod
    public void resetSessionCallbackParameters() {
        com.adjust.sdk.Adjust.resetSessionCallbackParameters();
    }

    @ReactMethod
    public void resetSessionPartnerParameters() {
        com.adjust.sdk.Adjust.resetSessionPartnerParameters();
    }

    @ReactMethod
    public void getIdfa(Callback callback) {
        callback.invoke("");
    }

    @ReactMethod
    public void getGoogleAdId(final Callback callback) {
        com.adjust.sdk.Adjust.getGoogleAdId(getReactApplicationContext(), new com.adjust.sdk.OnDeviceIdsRead() {
            @Override
            public void onGoogleAdIdRead(String googleAdId) {
                callback.invoke(googleAdId);
            }
        });
    }

    @ReactMethod
    public void getAdid(Callback callback) {
        callback.invoke(com.adjust.sdk.Adjust.getAdid());
    }

    @ReactMethod
    public void getAmazonAdId(Callback callback) {
        callback.invoke(com.adjust.sdk.Adjust.getAmazonAdId(getReactApplicationContext()));
    }

    @ReactMethod
    public void getAttribution(Callback callback) {
        callback.invoke(AdjustUtil.attributionToMap(com.adjust.sdk.Adjust.getAttribution()));
    }

    @ReactMethod
    public void setAttributionCallbackListener() {
        this.attributionCallback = true;
    }

    @ReactMethod
    public void setEventTrackingSucceededCallbackListener() {
        this.eventTrackingSucceededCallback = true;
    }

    @ReactMethod
    public void setEventTrackingFailedCallbackListener() {
        this.eventTrackingFailedCallback = true;
    }

    @ReactMethod
    public void setSessionTrackingSucceededCallbackListener() {
        this.sessionTrackingSucceededCallback = true;
    }

    @ReactMethod
    public void setSessionTrackingFailedCallbackListener() {
        this.sessionTrackingFailedCallback = true;
    }

    @ReactMethod
    public void setDeferredDeeplinkCallbackListener() {
        this.deferredDeeplinkCallback = true;
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }
}
