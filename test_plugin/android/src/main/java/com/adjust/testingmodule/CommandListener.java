//
//  CommandListener.java
//  Adjust
//
//  Created by Abdullah Obaied on 2018-02-23.
//  Copyright (c) 2018 Adjust GmbH. All rights reserved.
//  See the file MIT-LICENSE for copying permission.
//

package com.adjust.testingmodule;

import android.content.Context;
import android.util.Log;
import android.os.Bundle;

import org.json.JSONObject;
import org.json.JSONException;

import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.*;

import com.adjust.testlibrary.ICommandJsonListener;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import java.util.concurrent.atomic.AtomicInteger;

public class CommandListener implements ICommandJsonListener {
    private static String TAG = "CommandListener";
    private ReactContext mReactContext;
    private AtomicInteger orderCounter = new AtomicInteger(0);

    public CommandListener(ReactContext reactContext) {
        mReactContext = reactContext;
    }

    @Override
    public void executeCommand(String className, String functionName, String paramsJsonStr) {
        try {
        JSONObject paramsJsonObj = new JSONObject(paramsJsonStr);
        BundleJSONConverter bjc = new BundleJSONConverter();
        Bundle bundle = bjc.convertToBundle(paramsJsonObj);
        WritableMap params = Arguments.fromBundle(bundle);

        WritableMap map = Arguments.createMap();

        map.putString("className", className);
        map.putString("functionName", functionName);
        map.putMap("params", params);
        map.putInt("order", orderCounter.getAndIncrement());

        mReactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("command", map);
        } catch (Exception ex) {
            Log.e(TAG, "error occurred", ex);
            ex.printStackTrace();
        }
    }
}
