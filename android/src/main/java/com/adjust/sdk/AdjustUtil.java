//
//  AdjustUtil.java
//  Adjust SDK
//
//  Created by Abdullah Obaied (@Obaied) on 19th October 2016.
//  Copyright (c) 2016-Present Adjust GmbH. All rights reserved.
//

package com.adjust.nativemodule;

import java.util.Map;
import java.util.List;
import java.util.HashMap;
import java.util.ArrayList;
import android.net.Uri;
import javax.annotation.Nullable;
import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.*;
import com.adjust.sdk.*;

final class AdjustUtil {
    private static final String ATTRIBUTION_TRACKER_TOKEN = "trackerToken";
    private static final String ATTRIBUTION_TRACKER_NAME = "trackerName";
    private static final String ATTRIBUTION_NETWORK = "network";
    private static final String ATTRIBUTION_CAMPAIGN = "campaign";
    private static final String ATTRIBUTION_ADGROUP = "adgroup";
    private static final String ATTRIBUTION_CREATIVE = "creative";
    private static final String ATTRIBUTION_CLICK_LABEL = "clickLabel";
    private static final String ATTRIBUTION_COST_TYPE = "costType";
    private static final String ATTRIBUTION_COST_AMOUNT = "costAmount";
    private static final String ATTRIBUTION_COST_CURRENCY = "costCurrency";
    private static final String ATTRIBUTION_FB_INSTALL_REFERRER = "fbInstallReferrer";

    private static final String EVENT_SUCCESS_MESSAGE = "message";
    private static final String EVENT_SUCCESS_TIMESTAMP = "timestamp";
    private static final String EVENT_SUCCESS_ADID = "adid";
    private static final String EVENT_SUCCESS_EVENT_TOKEN = "eventToken";
    private static final String EVENT_SUCCESS_CALLBACK_ID = "callbackId";
    private static final String EVENT_SUCCESS_JSON_RESPONSE = "jsonResponse";

    private static final String EVENT_FAILED_MESSAGE = "message";
    private static final String EVENT_FAILED_TIMESTAMP = "timestamp";
    private static final String EVENT_FAILED_ADID = "adid";
    private static final String EVENT_FAILED_EVENT_TOKEN = "eventToken";
    private static final String EVENT_FAILED_CALLBACK_ID = "callbackId";
    private static final String EVENT_FAILED_WILL_RETRY = "willRetry";
    private static final String EVENT_FAILED_JSON_RESPONSE = "jsonResponse";

    private static final String SESSION_SUCCESS_MESSAGE = "message";
    private static final String SESSION_SUCCESS_TIMESTAMP = "timestamp";
    private static final String SESSION_SUCCESS_ADID = "adid";
    private static final String SESSION_SUCCESS_JSON_RESPONSE = "jsonResponse";

    private static final String SESSION_FAILED_MESSAGE = "message";
    private static final String SESSION_FAILED_TIMESTAMP = "timestamp";
    private static final String SESSION_FAILED_ADID = "adid";
    private static final String SESSION_FAILED_WILL_RETRY = "willRetry";
    private static final String SESSION_FAILED_JSON_RESPONSE = "jsonResponse";

    public static final String PURCHASE_VERIFICATION_STATUS = "verificationStatus";
    public static final String PURCHASE_VERIFICATION_CODE = "code";
    public static final String PURCHASE_VERIFICATION_MESSAGE = "message";

    public static WritableMap attributionToMap(AdjustAttribution attribution) {
        WritableMap map = Arguments.createMap();
        if (null == attribution) {
            return map;
        }

        map.putString(ATTRIBUTION_TRACKER_TOKEN, null != attribution.trackerToken ? attribution.trackerToken : "");
        map.putString(ATTRIBUTION_TRACKER_NAME, null != attribution.trackerName ? attribution.trackerName : "");
        map.putString(ATTRIBUTION_NETWORK, null != attribution.network ? attribution.network : "");
        map.putString(ATTRIBUTION_CAMPAIGN, null != attribution.campaign ? attribution.campaign : "");
        map.putString(ATTRIBUTION_ADGROUP, null != attribution.adgroup ? attribution.adgroup : "");
        map.putString(ATTRIBUTION_CREATIVE, null != attribution.creative ? attribution.creative : "");
        map.putString(ATTRIBUTION_CLICK_LABEL, null != attribution.clickLabel ? attribution.clickLabel : "");
        map.putString(ATTRIBUTION_COST_TYPE, null != attribution.costType ? attribution.costType : "");
        map.putDouble(ATTRIBUTION_COST_AMOUNT, null != attribution.costAmount && !attribution.costAmount.isNaN() ? attribution.costAmount : 0);
        map.putString(ATTRIBUTION_COST_CURRENCY, null != attribution.costCurrency ? attribution.costCurrency : "");
        map.putString(ATTRIBUTION_FB_INSTALL_REFERRER, null != attribution.fbInstallReferrer ? attribution.fbInstallReferrer : "");
        return map;
    }

    public static WritableMap eventSuccessToMap(AdjustEventSuccess eventSuccess) {
        WritableMap map = Arguments.createMap();
        if (null == eventSuccess) {
            return map;
        }

        map.putString(EVENT_SUCCESS_MESSAGE, null != eventSuccess.message ? eventSuccess.message : "");
        map.putString(EVENT_SUCCESS_TIMESTAMP, null != eventSuccess.timestamp ? eventSuccess.timestamp : "");
        map.putString(EVENT_SUCCESS_ADID, null != eventSuccess.adid ? eventSuccess.adid : "");
        map.putString(EVENT_SUCCESS_EVENT_TOKEN, null != eventSuccess.eventToken ? eventSuccess.eventToken : "");
        map.putString(EVENT_SUCCESS_CALLBACK_ID, null != eventSuccess.callbackId ? eventSuccess.callbackId : "");
        map.putString(EVENT_SUCCESS_JSON_RESPONSE, null != eventSuccess.jsonResponse ? eventSuccess.jsonResponse.toString() : "");
        return map;
    }

    public static WritableMap eventFailureToMap(AdjustEventFailure eventFailure) {
        WritableMap map = Arguments.createMap();
        if (null == eventFailure) {
            return map;
        }

        map.putString(EVENT_FAILED_MESSAGE, null != eventFailure.message ? eventFailure.message : "");
        map.putString(EVENT_FAILED_TIMESTAMP, null != eventFailure.timestamp ? eventFailure.timestamp : "");
        map.putString(EVENT_FAILED_ADID, null != eventFailure.adid ? eventFailure.adid : "");
        map.putString(EVENT_FAILED_EVENT_TOKEN, null != eventFailure.eventToken ? eventFailure.eventToken : "");
        map.putString(EVENT_FAILED_CALLBACK_ID, null != eventFailure.callbackId ? eventFailure.callbackId : "");
        map.putString(EVENT_FAILED_WILL_RETRY, eventFailure.willRetry ? "true" : "false");
        map.putString(EVENT_FAILED_JSON_RESPONSE, null != eventFailure.jsonResponse ? eventFailure.jsonResponse.toString() : "");
        return map;
    }

    public static WritableMap sessionSuccessToMap(AdjustSessionSuccess sessionSuccess) {
        WritableMap map = Arguments.createMap();
        if (null == sessionSuccess) {
            return map;
        }

        map.putString(SESSION_SUCCESS_MESSAGE, null != sessionSuccess.message ? sessionSuccess.message : "");
        map.putString(SESSION_SUCCESS_TIMESTAMP, null != sessionSuccess.timestamp ? sessionSuccess.timestamp : "");
        map.putString(SESSION_SUCCESS_ADID, null != sessionSuccess.adid ? sessionSuccess.adid : "");
        map.putString(SESSION_SUCCESS_JSON_RESPONSE, null != sessionSuccess.jsonResponse ? sessionSuccess.jsonResponse.toString() : "");
        return map;
    }

    public static WritableMap sessionFailureToMap(AdjustSessionFailure sessionFailure) {
        WritableMap map = Arguments.createMap();
        if (null == sessionFailure) {
            return map;
        }

        map.putString(SESSION_FAILED_MESSAGE, null != sessionFailure.message ? sessionFailure.message : "");
        map.putString(SESSION_FAILED_TIMESTAMP, null != sessionFailure.timestamp ? sessionFailure.timestamp : "");
        map.putString(SESSION_FAILED_ADID, null != sessionFailure.adid ? sessionFailure.adid : "");
        map.putString(SESSION_FAILED_WILL_RETRY, sessionFailure.willRetry ? "true" : "false");
        map.putString(SESSION_FAILED_JSON_RESPONSE, null != sessionFailure.jsonResponse ? sessionFailure.jsonResponse.toString() : "");
        return map;
    }

    public static WritableMap deferredDeeplinkToMap(Uri uri) {
        WritableMap map = Arguments.createMap();
        if (null == uri) {
            return map;
        }

        map.putString("uri", uri.toString());
        return map;
    }

    public static boolean isFieldValid(String field) {
        if (field != null) {
            if (!field.equals("") && !field.equals("null")) {
                return true;
            }
        }
        return false;
    }

    /** 
     * toMap converts a {@link ReadableMap} into a HashMap. 
     * 
     * @param readableMap The ReadableMap to be conveted. 
     * @return A HashMap containing the data that was in the ReadableMap. 
     */ 
    public static Map<String, Object> toMap(@Nullable ReadableMap readableMap) {
        if (readableMap == null) {
            return null; 
        }

        com.facebook.react.bridge.ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        if (!iterator.hasNextKey()) {
            return null; 
        }

        Map<String, Object> result = new HashMap<>();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            String value = toObject(readableMap, key).toString();
            if (value == null) {
                AdjustFactory.getLogger().warn("Null parameter inside key-value pair with key: " + key);
                continue;
            }
            result.put(key, value);
        }

        return result;
    }

    /** 
     * toList converts a {@link ReadableArray} into an ArrayList. 
     * 
     * @param readableArray The ReadableArray to be converted. 
     * @return An ArrayList containing the data that was in the ReadableArray. 
     */ 
    public static List<Object> toList(@Nullable ReadableArray readableArray) {
        if (readableArray == null) {
            return null; 
        }

        List<Object> result = new ArrayList<>(readableArray.size());
        for (int index = 0; index < readableArray.size(); index++) {
            ReadableType readableType = readableArray.getType(index);
            switch (readableType) {
                case Null:
                    result.add(null);
                    break;
                case Boolean:
                    result.add(readableArray.getBoolean(index));
                    break;
                case Number:
                    // Can be int or double. 
                    double tmp = readableArray.getDouble(index);
                    if (tmp == (int)tmp) {
                        result.add((int)tmp);
                    } else { 
                        result.add(tmp);
                    }
                    break;
                case String:
                    result.add(readableArray.getString(index));
                    break;
                case Map:
                    result.add(toMap(readableArray.getMap(index)));
                    break;
                case Array:
                    result = toList(readableArray.getArray(index));
                    break;
                default:
                    AdjustFactory.getLogger().error("Could not convert object with index: " + index + ".");
            } 
        } 

        return result;
    }

    /** 
     * toObject extracts a value from a {@link ReadableMap} by its key, 
     * and returns a POJO representing that object. 
     * 
     * @param readableMap The Map to containing the value to be converted 
     * @param key The key for the value to be converted 
     * @return The converted POJO 
     */ 
    private static Object toObject(@Nullable ReadableMap readableMap, String key) {
        if (readableMap == null) {
            return null; 
        }

        Object result = null;
        ReadableType readableType = readableMap.getType(key);
        switch (readableType) {
            case Null:
                result = null;
                break;
            case Boolean:
                result = readableMap.getBoolean(key);
                break;
            case Number:
                // Can be int or double. 
                double tmp = readableMap.getDouble(key);
                if (tmp == (int)tmp) {
                    result = (int)tmp;
                } else { 
                    result = tmp;
                }
                break;
            case String:
                result = readableMap.getString(key);
                break;
            case Map:
                result = toMap(readableMap.getMap(key));
                break;
            case Array:
                result = toList(readableMap.getArray(key));
                break;
            default:
                AdjustFactory.getLogger().error("Could not convert object with key: " + key + ".");
        }

        return result;
    }
}
