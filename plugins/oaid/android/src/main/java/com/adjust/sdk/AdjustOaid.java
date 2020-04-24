//
//  AdjustOaid.java
//  Adjust SDK
//
//  Created by Ugljesa Erceg (@uerceg) on 24th April 2020.
//  Copyright (c) 2020 Adjust GmbH. All rights reserved.
//

package com.adjust.oaid.nativemodule;

import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.*;
import com.adjust.sdk.oaid.*;

public class AdjustOaid extends ReactContextBaseJavaModule {
    public AdjustOaid(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AdjustOaid";
    }

    @Override
    public void initialize() {
    }

    @ReactMethod
    public void readOaid() {
        com.adjust.sdk.oaid.AdjustOaid.readOaid(getReactApplicationContext());
    }

    @ReactMethod
    public void doNotReadOaid() {
        com.adjust.sdk.oaid.AdjustOaid.doNotReadOaid();
    }
}
