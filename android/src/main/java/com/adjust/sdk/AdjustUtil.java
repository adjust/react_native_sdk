//
//  AdjustUtil.java
//  Adjust
//
//  Created by Abdullah Obaied on 2016-10-19.
//  Copyright (c) 2016 adjust GmbH. All rights reserved.
//  See the file MIT-LICENSE for copying permission.
//

package com.adjust.nativemodule;

import com.facebook.react.modules.core.*;
import com.facebook.react.bridge.*;

import java.util.ArrayList;
import android.net.Uri;
import android.util.Log;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.adjust.sdk.*;

import javax.annotation.Nullable; 

/** 
 * toMap converts a {@link ReadableMap} into a HashMap. 
 * 
 * @param readableMap The ReadableMap to be conveted. 
 * @return A HashMap containing the data that was in the ReadableMap. 
 */ 

final class AdjustUtil { 
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
     * @param readableArray The ReadableArray to be conveted. 
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

    public static boolean isFieldValid(String field) {
        if (field != null) {
            if (!field.equals("") && !field.equals("null")) {
                return true;
            }
        }

        return false;
    }

    public static WritableMap attributionToMap(AdjustAttribution attribution) {
        WritableMap map = Arguments.createMap();

        map.putString("trackerToken", attribution.trackerToken);
        map.putString("trackerName", attribution.trackerName);
        map.putString("network", attribution.network);
        map.putString("campaign", attribution.campaign);
        map.putString("adgroup", attribution.adgroup);
        map.putString("creative", attribution.creative);
        map.putString("clickLabel", attribution.clickLabel);

        return map;
    }

    public static WritableMap eventSuccessToMap(AdjustEventSuccess eventSuccess) {
        WritableMap map = Arguments.createMap();

        map.putString("message", eventSuccess.message);
        map.putString("timestamp", eventSuccess.timestamp);
        map.putString("adid", eventSuccess.adid);
        map.putString("eventToken", eventSuccess.eventToken);

        if (eventSuccess.jsonResponse != null) {
            map.putString("jsonResponse", eventSuccess.jsonResponse.toString());
        }

        return map;
    }

    public static WritableMap eventFailureToMap(AdjustEventFailure eventFailure) {
        WritableMap map = Arguments.createMap();
        
        map.putString("message", eventFailure.message);
        map.putString("timestamp", eventFailure.timestamp);
        map.putString("adid", eventFailure.adid);
        map.putString("eventToken", eventFailure.eventToken);
        map.putBoolean("willRetry", eventFailure.willRetry);

        if (eventFailure.jsonResponse != null) {
            map.putString("jsonResponse", eventFailure.jsonResponse.toString());
        }

        return map;
    }

    public static WritableMap sessionSuccessToMap(AdjustSessionSuccess sessionSuccess) {
        WritableMap map = Arguments.createMap();
        
        map.putString("message", sessionSuccess.message);
        map.putString("timestamp", sessionSuccess.timestamp);
        map.putString("adid", sessionSuccess.adid);

        if (sessionSuccess.jsonResponse != null) {
            map.putString("jsonResponse", sessionSuccess.jsonResponse.toString());
        }

        return map;
    }

    public static WritableMap sessionFailureToMap(AdjustSessionFailure sessionFailure) {
        WritableMap map = Arguments.createMap();
        
        map.putString("message", sessionFailure.message);
        map.putString("timestamp", sessionFailure.timestamp);
        map.putString("adid", sessionFailure.adid);
        map.putBoolean("willRetry", sessionFailure.willRetry);

        if (sessionFailure.jsonResponse != null) {
            map.putString("jsonResponse", sessionFailure.jsonResponse.toString());
        }

        return map;
    }

    public static WritableMap deferredDeeplinkToMap(Uri uri) {
        WritableMap map = Arguments.createMap();

        map.putString("uri", uri.toString());

        return map;
    }
}
