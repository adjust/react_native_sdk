//
//  AdjustPackage.java
//  Adjust
//
//  Created by Abdullah Obaied on 2018-02-23.
//  Copyright (c) 2018 Adjust GmbH. All rights reserved.
//  See the file MIT-LICENSE for copying permission.
//

package com.adjust.testingmodule;

import com.adjust.testlibrary.TestLibrary;

import android.util.Log;
import java.util.ArrayList;
import java.util.List;

import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.*;

public class AdjustTesting extends ReactContextBaseJavaModule {
    private static final String TAG = "AdjustTesting";

    private TestLibrary testLibrary;
    private List<String> selectedTests = new ArrayList<String>();
    private List<String> selectedTestDirs = new ArrayList<String>();

    public AdjustTesting(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AdjustTesting";
    }

    @ReactMethod
    public void startTestSession(String baseUrl) {
        Log.d(TAG, "startTestSession() with baseUrl[" + baseUrl + "]");

        testLibrary = new TestLibrary(baseUrl, new CommandListener(getReactApplicationContext()));

        for(int i = 0; i < selectedTests.size(); i++) {
            testLibrary.addTest(selectedTests.get(i));
        }

        for(int i = 0; i < selectedTestDirs.size(); i++) {
            testLibrary.addTestDirectory(selectedTestDirs.get(i));
        }

        testLibrary.startTestSession("react_native4.13.0@android4.13.0");
    }

    @ReactMethod
    public void addInfoToSend(String key, String value) {
        if (testLibrary != null) {
            Log.d(TAG, "AddInfoToSend() with key[" + key + "] and value[" + value + "]");
            testLibrary.addInfoToSend(key, value);
        }
    }

    @ReactMethod
    public void sendInfoToServer(String basePath) {
        Log.d(TAG, "sendInfoToServer(): " + basePath);
        if (testLibrary != null) {
            testLibrary.sendInfoToServer(basePath);
        }
    }

    @ReactMethod
    public void addTest(String test) {
        this.selectedTests.add(test);
    }

    @ReactMethod
    public void addTestDirectory(String testDir) {
        this.selectedTestDirs.add(testDir);
    }
}
