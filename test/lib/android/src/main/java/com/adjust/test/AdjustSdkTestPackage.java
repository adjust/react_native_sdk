//
//  AdjustSdkTestPackage.java
//  Adjust SDK Test
//
//  Created by Abdullah Obaied (@obaied) on 23rd February 2018.
//  Copyright (c) 2018 Adjust GmbH. All rights reserved.
//

package com.adjust.test;

import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collections;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

public class AdjustSdkTestPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new AdjustSdkTest(reactContext));
        return modules;
    }

    // Deprecated in RN 0.47
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
