//
//  Adjust.java
//  Adjust
//
//  Created by Abdullah Obaied on 2016-10-19.
//  Copyright (c) 2016 adjust GmbH. All rights reserved.
//  See the file MIT-LICENSE for copying permission.
//

package com.adjust.nativemodule;

import android.view.Gravity;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.*;
import javax.annotation.Nullable;
import android.util.Log;
import android.net.Uri;
import java.util.Map;
import java.util.HashMap;
import java.util.Map.Entry;

import com.adjust.sdk.*;

public class Adjust extends ReactContextBaseJavaModule 
    implements LifecycleEventListener,
               OnAttributionChangedListener, 
               OnEventTrackingSucceededListener,
               OnEventTrackingFailedListener,
               OnSessionTrackingSucceededListener,
               OnSessionTrackingFailedListener,
               OnDeeplinkResponseListener {
    public static final String TAG = "AdjustNativeModule";
    private boolean attributionCallback;
    private boolean eventTrackingSucceededCallback;
    private boolean eventTrackingFailedCallback;
    private boolean sessionTrackingSucceededCallback;
    private boolean sessionTrackingFailedCallback;
    private boolean deferredDeeplinkCallback;
    private boolean shouldLaunchDeeplink;

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
    }

    @Override
    public void onHostDestroy() {
    }

    @Override
    public void onHostResume() {
        Log.d(TAG, ">>> onHostResume()");
        com.adjust.sdk.Adjust.onResume();
    }

    @Override
    public void onAttributionChanged(AdjustAttribution attribution) {
        sendEvent(getReactApplicationContext(), "attribution", AdjustUtil.attributionToMap(attribution));
    }

    @Override
    public void onFinishedEventTrackingSucceeded(AdjustEventSuccess event) {
        sendEvent(getReactApplicationContext(), "eventTrackingSucceeded", AdjustUtil.eventSuccessToMap(event));
    }

    @Override
    public void onFinishedEventTrackingFailed(AdjustEventFailure event) {
        sendEvent(getReactApplicationContext(), "eventTrackingFailed", AdjustUtil.eventFailureToMap(event));
    }

    @Override
    public void onFinishedSessionTrackingSucceeded(AdjustSessionSuccess session) {
        sendEvent(getReactApplicationContext(), "sessionTrackingSucceeded", AdjustUtil.sessionSuccessToMap(session));
    }

    @Override
    public void onFinishedSessionTrackingFailed(AdjustSessionFailure session) {
        sendEvent(getReactApplicationContext(), "sessionTrackingFailed", AdjustUtil.sessionFailureToMap(session));
    }

    @Override
    public boolean launchReceivedDeeplink(Uri uri) {
        sendEvent(getReactApplicationContext(), "deferredDeeplink", AdjustUtil.deferredDeeplinkToMap(uri));
        return this.shouldLaunchDeeplink;
    }

    @ReactMethod
    public void create(ReadableMap mapConfig) {
        Log.d(TAG, ">>> create()");
        final String appToken               = mapConfig.getString("appToken");
        final String environment            = mapConfig.getString("environment");
        final String defaultTracker         = mapConfig.getString("defaultTracker");
        final String processName            = mapConfig.getString("processName");
        final String sdkPrefix              = mapConfig.getString("sdkPrefix");
        final String logLevel               = mapConfig.getString("logLevel");
        final Boolean eventBufferingEnabled = mapConfig.getBoolean("eventBufferingEnabled");
        final String userAgent              = mapConfig.getString("userAgent");
        final Boolean sendInBackground      = mapConfig.getBoolean("sendInBackground");
        final Boolean shouldLaunchDeeplink  = mapConfig.getBoolean("shouldLaunchDeeplink");
        final Double delayStart             = mapConfig.getDouble("delayStart");

        Log.d(TAG, ">>> appToken: " + appToken);
        Log.d(TAG, ">>> environment: " + environment);
        Log.d(TAG, ">>> delayStart: " + delayStart);

        boolean isLogLevelSuppress = false;
        if (AdjustUtil.isFieldValid(logLevel) && logLevel.equals("SUPPRESS")) {
            isLogLevelSuppress = true;
        }

        final AdjustConfig adjustConfig 
            = new AdjustConfig(
                    getReactApplicationContext(), 
                    appToken, 
                    environment, 
                    isLogLevelSuppress);

        if (adjustConfig.isValid()) {
            // Log level
            if (AdjustUtil.isFieldValid(logLevel)) {
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
            adjustConfig.setEventBufferingEnabled(eventBufferingEnabled);

            // SDK prefix
            if (AdjustUtil.isFieldValid(sdkPrefix)) {
                adjustConfig.setSdkPrefix(sdkPrefix);
            }

            // Main process name
            if (AdjustUtil.isFieldValid(processName)) {
                adjustConfig.setProcessName(processName);
            }

            // Default tracker
            if (AdjustUtil.isFieldValid(defaultTracker)) {
                adjustConfig.setDefaultTracker(defaultTracker);
            }

            // User agent
            if (AdjustUtil.isFieldValid(userAgent)) {
                adjustConfig.setUserAgent(userAgent);
            }

            // Background tracking
            adjustConfig.setSendInBackground(sendInBackground);

            // Launching deferred deep link
            this.shouldLaunchDeeplink = shouldLaunchDeeplink;

            // Delayed start
            adjustConfig.setDelayStart(delayStart);

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
    }

    @ReactMethod
    public void trackEvent(ReadableMap mapEvent) {
        Log.d(TAG, ">>> trackEvent()");

        //if(!com.adjust.sdk.Adjust.isEnabled() ) {
            //Log.d(TAG, ">>> SDK is not initialized");
            //return;
        //}

        final String eventToken = mapEvent.getString("eventToken");
        final Double revenue = mapEvent.getDouble("revenue");
        final String currency = mapEvent.getString("currency");
        final Map<String, Object> callbackParameters  = AdjustUtil.toMap(mapEvent.getMap("callbackParameters"));
        final Map<String, Object> partnerParameters  = AdjustUtil.toMap(mapEvent.getMap("partnerParameters"));

        AdjustEvent event = new AdjustEvent(eventToken);
        if(event.isValid()) {
            event.setRevenue(revenue, currency);

            if(callbackParameters != null) {
                for (Map.Entry<String, Object> entry : callbackParameters.entrySet()) {
                    event.addCallbackParameter(entry.getKey(), entry.getValue().toString());
                }
            }

            if(partnerParameters != null) {
                for (Map.Entry<String, Object> entry : partnerParameters.entrySet()) {
                    event.addPartnerParameter(entry.getKey(), entry.getValue().toString());
                }
            }

            com.adjust.sdk.Adjust.trackEvent(event);
        }
    }

    @ReactMethod
    public void setEnabled(Boolean enabled) {
        Log.d(TAG, ">>> setEnabled()");
        com.adjust.sdk.Adjust.setEnabled(enabled);
    }

    @ReactMethod
    public void isEnabled(Callback callback) {
        callback.invoke(com.adjust.sdk.Adjust.isEnabled());
    }

    @ReactMethod
    public void appWillOpenUrl(String strUri) {
        Log.d(TAG, ">>> appWillOpenUrl()");

        final Uri uri = Uri.parse(strUri);
        com.adjust.sdk.Adjust.appWillOpenUrl(uri);
    }

    @ReactMethod
    public void setReferrer(String referrer) {
        Log.d(TAG, ">>> setReferrer()");

        com.adjust.sdk.Adjust.setReferrer(referrer);
    }

    @ReactMethod
    public void setOfflineMode(Boolean enabled) {
        Log.d(TAG, ">>> setOfflineMode()");
        com.adjust.sdk.Adjust.setOfflineMode(enabled);
    }

    @ReactMethod
    public void sendFirstPackages() {
        Log.d(TAG, ">>> sendFirstPackages()");

        com.adjust.sdk.Adjust.sendFirstPackages();
    }

    @ReactMethod
    public void addSessionCallbackParameter(String key, String value) {
        Log.d(TAG, ">>> addSessionCallbackParameter()");

        com.adjust.sdk.Adjust.addSessionCallbackParameter(key, value);
    }

    @ReactMethod
    public void addSessionPartnerParameter(String key, String value) {
        Log.d(TAG, ">>> addSessionPartnerParameter()");

        com.adjust.sdk.Adjust.addSessionPartnerParameter(key, value);
    }

    @ReactMethod
    public void removeSessionCallbackParameter(String key) {
        Log.d(TAG, ">>> removeSessionCallbackParameter()");

        com.adjust.sdk.Adjust.removeSessionCallbackParameter(key);
    }

    @ReactMethod
    public void removeSessionPartnerParameter(String key) {
        Log.d(TAG, ">>> removeSessionPartnerParameter()");

        com.adjust.sdk.Adjust.removeSessionPartnerParameter(key);
    }

    @ReactMethod
    public void resetSessionCallbackParameters() {
        Log.d(TAG, ">>> resetSessionCallbackParameters()");

        com.adjust.sdk.Adjust.resetSessionCallbackParameters();
    }

    @ReactMethod
    public void resetSessionPartnerParameters() {
        Log.d(TAG, ">>> resetSessionPartnerParameters()");

        com.adjust.sdk.Adjust.resetSessionPartnerParameters();
    }

    @ReactMethod
    public void setPushToken(String token) {
        Log.d(TAG, ">>> setPushToken()");

        com.adjust.sdk.Adjust.setPushToken(token);
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

    @ReactMethod
    public void clearAttributionCallbackListener() {
        this.attributionCallback = false;
    }

    @ReactMethod
    public void clearEventTrackingSucceededCallbackListener() {
        this.eventTrackingSucceededCallback = false;
    }

    @ReactMethod
    public void clearEventTrackingFailedCallbackListener() {
        this.eventTrackingFailedCallback = false;
    }

    @ReactMethod
    public void clearSessionTrackingSucceededCallbackListener() {
        this.sessionTrackingSucceededCallback = false;
    }

    @ReactMethod
    public void clearSessionTrackingFailedCallbackListener() {
        this.sessionTrackingFailedCallback = false;
    }

    @ReactMethod
    public void clearDeferredDeeplinkCallbackListener() {
        this.deferredDeeplinkCallback = false;
    }

    private void sendEvent(ReactContext reactContext,
            String eventName,
            @Nullable WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }

}
