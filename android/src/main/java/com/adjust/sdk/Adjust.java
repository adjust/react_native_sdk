package com.adjust.nativemodule;

import android.view.Gravity;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.*;
import android.util.Log;

import com.adjust.sdk.*;

public class Adjust extends ReactContextBaseJavaModule implements LifecycleEventListener {
    public Adjust(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Adjust";
    }

    @ReactMethod
    public void show() {
        Log.d("AdjustNativeModule", ">>> show() invoked from Android");
    }

    @Override
    public void initialize() {
        getReactApplicationContext().addLifecycleEventListener(this);
    }

    @Override
    public void onHostPause() {
        Log.d("AdjustNativeModule", ">>> onHostPause()");
    }

    @Override
    public void onHostResume() {
        Log.d("AdjustNativeModule", ">>> onHostResume()");
    }

    @Override
    public void onHostDestroy() {
        Log.d("AdjustNativeModule", ">>> onHostDestroy()");
    }
}
