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

import org.json.JSONObject;
import org.json.JSONException;

import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.*;

import com.adjust.testlibrary.ICommandRawJsonListener;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import java.util.concurrent.atomic.AtomicInteger;

public class CommandListener implements ICommandRawJsonListener {
    private ReactContext mReactContext;
    private AtomicInteger orderCounter = new AtomicInteger(0);

    public CommandListener(ReactContext reactContext) {
        mReactContext = reactContext;
    }

    @Override
    public void executeCommand(String jsonStr) {
        try {
            JSONObject jsonObj = new JSONObject(jsonStr);

            // Order of packages sent through PluginResult is not reliable, this is solved
            //  through a scheduling mechanism in command_executor.js#scheduleCommand() side.
            // The 'order' entry is used to schedule commands
            jsonObj.put("order", orderCounter.getAndIncrement());

            mReactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("command", jsonObj.toString());

        } catch(JSONException ex) {
            ex.printStackTrace();
        }
    }
}
