package com.adjust.nativemodule;

import android.view.Gravity;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.*;
import android.util.Log;
import android.net.Uri;

import com.adjust.sdk.*;

public class Adjust extends ReactContextBaseJavaModule implements LifecycleEventListener {
    public static final String TAG = "AdjustNativeModule";
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
        Log.d(TAG, ">>> onHostPause()");
    }

    @Override
    public void onHostResume() {
        Log.d(TAG, ">>> onHostResume()");
    }

    @Override
    public void onHostDestroy() {
        Log.d(TAG, ">>> onHostDestroy()");
    }

    @ReactMethod
    public void trackEvent(ReadableMap event) {
        Log.d(TAG, ">>> trackEvent()");
    }

    @ReactMethod
    public void setEnabled(Boolean enabled) {
        Log.d(TAG, ">>> setEnabled()");
    }

    @ReactMethod
    public void isEnabled(Callback callback) {
        callback.invoke(false);
    }

    @ReactMethod
    public void appWillOpenUrl(String uri) {
        Log.d(TAG, ">>> appWillOpenUrl()");
    }

    @ReactMethod
    public void setReferrer(String referrer) {
        Log.d(TAG, ">>> setReferrer()");
    }

    @ReactMethod
    public void setOfflineMode(Boolean enabled) {
        Log.d(TAG, ">>> setOfflineMode()");
    }

    @ReactMethod
    public void sendFirstPackages() {
        Log.d(TAG, ">>> sendFirstPackages()");
    }

    @ReactMethod
    public void addSessionCallbackParameter(String key, String value) {
        Log.d(TAG, ">>> addSessionCallbackParameter()");
    }

    @ReactMethod
    public void addSessionPartnerParameter(String key, String value) {
        Log.d(TAG, ">>> addSessionPartnerParameter()");
    }

    @ReactMethod
    public void removeSessionCallbackParameter(String key) {
        Log.d(TAG, ">>> removeSessionCallbackParameter()");
    }

    @ReactMethod
    public void removeSessionPartnerParameter(String key) {
        Log.d(TAG, ">>> removeSessionPartnerParameter()");
    }

    @ReactMethod
    public void resetSessionCallbackParameters() {
        Log.d(TAG, ">>> resetSessionCallbackParameters()");
    }

    @ReactMethod
    public void resetSessionPartnerParameters() {
        Log.d(TAG, ">>> resetSessionPartnerParameters()");
    }

    @ReactMethod
    public void setPushToken(String token) {
        Log.d(TAG, ">>> setPushToken()");
    }
}
