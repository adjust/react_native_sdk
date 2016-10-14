package com.adjust.nativemodule;

import android.view.Gravity;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.*;
import android.util.Log;
import android.net.Uri;
import java.util.Map;
import java.util.Map.Entry;

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
    public void trackEvent(ReadableMap map) {
        Log.d(TAG, ">>> trackEvent()");

        final String eventToken = map.getString("eventToken");
        final Double revenue = map.getDouble("revenue");
        final String currency = map.getString("currency");
        final Map<String, Object> callbackParameters  = AdjustUtil.toMap(map.getMap("callbackParameters"));
        final Map<String, Object> partnerParameters  = AdjustUtil.toMap(map.getMap("partnerParameters"));
        //Log.d(TAG, ">>> trackEvent(): eventToken: " + eventToken);
        //Log.d(TAG, ">>> trackEvent(): revenue: " + revenue);
        //Log.d(TAG, ">>> trackEvent(): currency: " + currency);
        //Log.d(TAG, ">>> trackEvent(): first CallbackParam value: " + callbackParameters.get("DUMMY_KEY"));
        //Log.d(TAG, ">>> trackEvent(): second CallbackParam value: " + callbackParameters.get("DUMMY_KEY_2"));
        //Log.d(TAG, ">>> trackEvent(): first partnerParam value: " + partnerParameters.get("DUMMY_KEY"));
        //Log.d(TAG, ">>> trackEvent(): second partnerParam value: " + partnerParameters.get("DUMMY_KEY_2"));

        AdjustEvent event = new AdjustEvent(eventToken);
        event.setRevenue(revenue, currency);

        for (Map.Entry<String, Object> entry : callbackParameters.entrySet()) {
            event.addCallbackParameter(entry.getKey(), entry.getValue().toString());
        }

        for (Map.Entry<String, Object> entry : partnerParameters.entrySet()) {
            event.addPartnerParameter(entry.getKey(), entry.getValue().toString());
        }
    }

    @ReactMethod
    public void setEnabled(Boolean enabled) {
        Log.d(TAG, ">>> setEnabled()");
    }

    @ReactMethod
    public void isEnabled(Callback callback) {
        callback.invoke(true);
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
