//
//  Adjust.java
//  Adjust SDK
//
//  Created by Abdullah Obaied (@Obaied) on 19th October 2016.
//  Copyright (c) 2016-Present Adjust GmbH. All rights reserved.
//

package com.adjust.nativemodule;

import android.net.Uri;
import android.util.Log;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Map.Entry;
import javax.annotation.Nullable;
import org.json.JSONObject;
import org.json.JSONException;
import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.*;
import com.adjust.sdk.*;

public class Adjust extends ReactContextBaseJavaModule implements
                OnAttributionChangedListener,
                OnEventTrackingSucceededListener,
                OnEventTrackingFailedListener,
                OnSessionTrackingSucceededListener,
                OnSessionTrackingFailedListener,
                OnDeferredDeeplinkResponseListener {
    private static String TAG = "AdjustBridge";
    private boolean attributionCallback;
    private boolean eventTrackingSucceededCallback;
    private boolean eventTrackingFailedCallback;
    private boolean sessionTrackingSucceededCallback;
    private boolean sessionTrackingFailedCallback;
    private boolean deferredDeeplinkCallback;
    private boolean isDeferredDeeplinkOpeningEnabled = true;

    public Adjust(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Adjust";
    }

    @Override
    public void onAttributionChanged(AdjustAttribution attribution) {
        sendEvent(getReactApplicationContext(), "adjust_attribution", AdjustUtil.attributionToMap(attribution));
    }

    @Override
    public void onEventTrackingSucceeded(AdjustEventSuccess event) {
        sendEvent(getReactApplicationContext(), "adjust_eventTrackingSucceeded", AdjustUtil.eventSuccessToMap(event));
    }

    @Override
    public void onEventTrackingFailed(AdjustEventFailure event) {
        sendEvent(getReactApplicationContext(), "adjust_eventTrackingFailed", AdjustUtil.eventFailureToMap(event));
    }

    @Override
    public void onSessionTrackingSucceeded(AdjustSessionSuccess session) {
        sendEvent(getReactApplicationContext(), "adjust_sessionTrackingSucceeded", AdjustUtil.sessionSuccessToMap(session));
    }

    @Override
    public void onSessionTrackingFailed(AdjustSessionFailure session) {
        sendEvent(getReactApplicationContext(), "adjust_sessionTrackingFailed", AdjustUtil.sessionFailureToMap(session));
    }

    @Override
    public boolean launchReceivedDeeplink(Uri uri) {
        sendEvent(getReactApplicationContext(), "adjust_deferredDeeplink", AdjustUtil.deferredDeeplinkToMap(uri));
        return this.isDeferredDeeplinkOpeningEnabled;
    }

    @ReactMethod
    public void initSdk(final ReadableMap mapConfig) {
        if (mapConfig == null) {
            return;
        }

        String appToken = null;
        String environment = null;
        String logLevel = null;
        String sdkPrefix = null;
        String processName = null;
        String defaultTracker = null;
        String externalDeviceId = null;
        String preinstallFilePath = null;
        String fbAppId = null;
        Integer eventDeduplicationIdsMaxSize = -1;
        boolean isSendingInBackgroundEnabled = false;
        boolean isLogLevelSuppress = false;
        boolean isDeferredDeeplinkOpeningEnabled = false;
        boolean isPreinstallTrackingEnabled = false;
        boolean isCostDataInAttributionEnabled = false;
        boolean isPlayStoreKidsComplianceEnabled = false;
        boolean isCoppaComplianceEnabled = false;
        boolean isDeviceIdsReadingOnceEnabled = false;
        List<String> urlStrategyDomains = null;
        boolean useSubdomains = false;
        boolean isDataResidency = false;

        // Suppress log level
        if (checkKey(mapConfig, "logLevel")) {
            logLevel = mapConfig.getString("logLevel");
            if (logLevel.equals("SUPPRESS")) {
                isLogLevelSuppress = true;
            }
        }

        // App token
        if (checkKey(mapConfig, "appToken")) {
            appToken = mapConfig.getString("appToken");
        }

        // Environment
        if (checkKey(mapConfig, "environment")) {
            environment = mapConfig.getString("environment");
        }

        final AdjustConfig adjustConfig = new AdjustConfig(getReactApplicationContext(), appToken, environment, isLogLevelSuppress);

        // Log level
        if (checkKey(mapConfig, "logLevel")) {
            logLevel = mapConfig.getString("logLevel");
            if (logLevel.equals("VERBOSE")) {
                adjustConfig.setLogLevel(LogLevel.VERBOSE);
            } else if (logLevel.equals("DEBUG")) {
                adjustConfig.setLogLevel(LogLevel.DEBUG);
            } else if (logLevel.equals("INFO")) {
                adjustConfig.setLogLevel(LogLevel.INFO);
            } else if (logLevel.equals("WARN")) {
                adjustConfig.setLogLevel(LogLevel.WARN);
            } else if (logLevel.equals("ERROR")) {
                adjustConfig.setLogLevel(LogLevel.ERROR);
            } else if (logLevel.equals("ASSERT")) {
                adjustConfig.setLogLevel(LogLevel.ASSERT);
            } else if (logLevel.equals("SUPPRESS")) {
                adjustConfig.setLogLevel(LogLevel.SUPRESS);
            } else {
                adjustConfig.setLogLevel(LogLevel.INFO);
            }
        }

        // SDK prefix
        if (checkKey(mapConfig, "sdkPrefix")) {
            sdkPrefix = mapConfig.getString("sdkPrefix");
            adjustConfig.setSdkPrefix(sdkPrefix);
        }

        // Main process name
        if (checkKey(mapConfig, "processName")) {
            processName = mapConfig.getString("processName");
            adjustConfig.setProcessName(processName);
        }

        // Default tracker
        if (checkKey(mapConfig, "defaultTracker")) {
            defaultTracker = mapConfig.getString("defaultTracker");
            adjustConfig.setDefaultTracker(defaultTracker);
        }

        // External device ID
        if (checkKey(mapConfig, "externalDeviceId")) {
            externalDeviceId = mapConfig.getString("externalDeviceId");
            adjustConfig.setExternalDeviceId(externalDeviceId);
        }

         // URL strategy
        if (checkKey(mapConfig, "urlStrategyDomains")
            && checkKey(mapConfig, "useSubdomains") 
            && checkKey(mapConfig, "isDataResidency")) {
            urlStrategyDomains = AdjustUtil.toListString(mapConfig.getArray("urlStrategyDomains"));
            useSubdomains = mapConfig.getBoolean("useSubdomains");
            isDataResidency = mapConfig.getBoolean("isDataResidency");
            adjustConfig.setUrlStrategy(urlStrategyDomains, useSubdomains, isDataResidency);
        }
       
        // Preinstall file path
        if (checkKey(mapConfig, "preinstallFilePath")) {
            preinstallFilePath = mapConfig.getString("preinstallFilePath");
            adjustConfig.setPreinstallFilePath(preinstallFilePath);
        }

        // FB app ID (meta install referrer)
        if (checkKey(mapConfig, "fbAppId")) {
            fbAppId = mapConfig.getString("fbAppId");
            adjustConfig.setFbAppId(fbAppId);
        }

        // Background tracking
        if (checkKey(mapConfig, "isSendingInBackgroundEnabled")) {
            isSendingInBackgroundEnabled = mapConfig.getBoolean("isSendingInBackgroundEnabled");
            if (isSendingInBackgroundEnabled) {
               adjustConfig.enableSendingInBackground();
            }
        }

        // Preinstall tracking
        if (checkKey(mapConfig, "isPreinstallTrackingEnabled")) {
            isPreinstallTrackingEnabled = mapConfig.getBoolean("isPreinstallTrackingEnabled");
            if(isPreinstallTrackingEnabled) {
               adjustConfig.enablePreinstallTracking();
            }
        }

        // Cost data
        if (checkKey(mapConfig, "isCostDataInAttributionEnabled")) {
            isCostDataInAttributionEnabled = mapConfig.getBoolean("isCostDataInAttributionEnabled");
            if (isCostDataInAttributionEnabled) {
               adjustConfig.enableCostDataInAttribution();
            }
        }

        // Google Play Store kids app
        if (checkKey(mapConfig, "isPlayStoreKidsComplianceEnabled")) {
            isPlayStoreKidsComplianceEnabled = mapConfig.getBoolean("isPlayStoreKidsComplianceEnabled");
            if (isPlayStoreKidsComplianceEnabled) {
               adjustConfig.enablePlayStoreKidsCompliance();
            }
        }

        // Launching deferred deep link
        if (checkKey(mapConfig, "isDeferredDeeplinkOpeningEnabled")) {
            isDeferredDeeplinkOpeningEnabled = mapConfig.getBoolean("isDeferredDeeplinkOpeningEnabled");
            this.isDeferredDeeplinkOpeningEnabled = isDeferredDeeplinkOpeningEnabled;
        }

        // COPPA compliance
        if (checkKey(mapConfig, "isCoppaComplianceEnabled")) {
            isCoppaComplianceEnabled = mapConfig.getBoolean("isCoppaComplianceEnabled");
            if (isCoppaComplianceEnabled) {
               adjustConfig.enableCoppaCompliance();
            }
        }

        // Read device info only once
        if (checkKey(mapConfig, "isDeviceIdsReadingOnceEnabled")) {
            isDeviceIdsReadingOnceEnabled = mapConfig.getBoolean("isDeviceIdsReadingOnceEnabled");
            if (isDeviceIdsReadingOnceEnabled) {
                adjustConfig.enableDeviceIdsReadingOnce();
            }
         }

        // Attribution callback
        if (attributionCallback) {
            adjustConfig.setOnAttributionChangedListener(this);
        }

        // Event tracking succeeded callback
        if (eventTrackingSucceededCallback) {
            adjustConfig.setOnEventTrackingSucceededListener(this);
        }

        // Event tracking failed callback
        if (eventTrackingFailedCallback) {
            adjustConfig.setOnEventTrackingFailedListener(this);
        }

        // Session tracking succeeded callback
        if (sessionTrackingSucceededCallback) {
            adjustConfig.setOnSessionTrackingSucceededListener(this);
        }

        // Session tracking failed callback
        if (sessionTrackingFailedCallback) {
            adjustConfig.setOnSessionTrackingFailedListener(this);
        }

        // Deferred deeplink callback
        if (deferredDeeplinkCallback) {
            adjustConfig.setOnDeferredDeeplinkResponseListener(this);
        }

        // Init SDK
        com.adjust.sdk.Adjust.initSdk(adjustConfig);
    }

    @ReactMethod
    public void trackEvent(final ReadableMap mapEvent) {
        if (mapEvent == null) {
            return;
        }

        double revenue = -1.0;
        String eventToken = null;
        String currency = null;
        String transactionId = null;
        String productId = null;
        String purchaseToken = null;
        String callbackId = null;
        String deduplicationId = null;

        List<Object> callbackParameters = null;
        List<Object> partnerParameters = null;

        // Event token
        if (checkKey(mapEvent, "eventToken")) {
            eventToken = mapEvent.getString("eventToken");
        }

        final AdjustEvent event = new AdjustEvent(eventToken);

        // Revenue
        if (checkKey(mapEvent, "revenue") || checkKey(mapEvent, "currency")) {
            try {
                revenue = Double.parseDouble(mapEvent.getString("revenue"));
            } catch (NumberFormatException ignore) {}
            // temporary patch, needs to be made more generic
            // undefined from JS potentially ending as "null" value?
            // TODO: if needed, add more generic check
            if (mapEvent.getString("currency") != null && !mapEvent.getString("currency").equals("null")) {
                currency = mapEvent.getString("currency");
            }
            event.setRevenue(revenue, currency);
        }

        // Callback parameters
        if (checkKey(mapEvent, "callbackParameters")) {
            callbackParameters = AdjustUtil.toList(mapEvent.getArray("callbackParameters"));
            if (null != callbackParameters) {
                for (int i = 0; i < callbackParameters.size(); i += 2) {
                        event.addCallbackParameter(callbackParameters.get(i).toString(),
                        callbackParameters.get(i+1).toString());
                }
            }
        }

        // Partner parameters
        if (checkKey(mapEvent, "partnerParameters")) {
            partnerParameters = AdjustUtil.toList(mapEvent.getArray("partnerParameters"));
            if (null != partnerParameters) {
                for (int i = 0; i < partnerParameters.size(); i += 2) {
                        event.addPartnerParameter(partnerParameters.get(i).toString(),
                        partnerParameters.get(i+1).toString());
                }
            }
        }

        // Revenue deduplication
        if (checkKey(mapEvent, "transactionId")) {
            transactionId = mapEvent.getString("transactionId");
            if (null != transactionId) {
                event.setOrderId(transactionId);
            }
        }

        // Callback ID
        if (checkKey(mapEvent, "callbackId")) {
            callbackId = mapEvent.getString("callbackId");
            if (null != callbackId) {
                event.setCallbackId(callbackId);
            }
        }

        // Product ID
        if (checkKey(mapEvent, "productId")) {
            productId = mapEvent.getString("productId");
            if (null != productId) {
                event.setProductId(productId);
            }
        }

        // Purchase token
        if (checkKey(mapEvent, "purchaseToken")) {
            purchaseToken = mapEvent.getString("purchaseToken");
            if (null != purchaseToken) {
                event.setPurchaseToken(purchaseToken);
            }
        }

         // Deduplication ID
        if (checkKey(mapEvent, "deduplicationId")) {
            deduplicationId = mapEvent.getString("deduplicationId");
            if (null != deduplicationId) {
                event.setDeduplicationId(deduplicationId);
            }
        }

        // Track event
        com.adjust.sdk.Adjust.trackEvent(event);
    }

    @ReactMethod
    public void enable() {
        com.adjust.sdk.Adjust.enable();
    }

    @ReactMethod
    public void disable() {
        com.adjust.sdk.Adjust.disable();
    }

    @ReactMethod
    public void switchToOfflineMode() {
        com.adjust.sdk.Adjust.switchToOfflineMode();
    }

    @ReactMethod
    public void switchBackToOnlineMode() {
        com.adjust.sdk.Adjust.switchBackToOnlineMode();
    }

    @ReactMethod
    public void setPushToken(final String token) {
        com.adjust.sdk.Adjust.setPushToken(token, getReactApplicationContext());
    }

    @ReactMethod
    public void processDeeplink(final ReadableMap mapDeeplink) {
        if (mapDeeplink == null) {
            return;
        }

        String deeplink = null;

        if (checkKey(mapDeeplink, "deeplink")) {
            deeplink = mapDeeplink.getString("deeplink");
        }

        final Uri uri = Uri.parse(deeplink);
        com.adjust.sdk.Adjust.processDeeplink(new AdjustDeeplink(uri), getReactApplicationContext());
    }

    @ReactMethod
    public void trackAdRevenue(final ReadableMap mapAdRevenue) {
        if (mapAdRevenue == null) {
            return;
        }

        double revenue = -1.0;
        int adImpressionsCount = -1;
        String source = null;
        String currency = null;
        String adRevenueNetwork = null;
        String adRevenueUnit = null;
        String adRevenuePlacement = null;
        List<Object> callbackParameters = null;
        List<Object> partnerParameters = null;

        // Source
        if (checkKey(mapAdRevenue, "source")) {
            source = mapAdRevenue.getString("source");
        }

        final AdjustAdRevenue adRevenue = new AdjustAdRevenue(source);

        // Revenue
        if (checkKey(mapAdRevenue, "revenue") || checkKey(mapAdRevenue, "currency")) {
            try {
                revenue = Double.parseDouble(mapAdRevenue.getString("revenue"));
            } catch (NumberFormatException ignore) {}
            currency = mapAdRevenue.getString("currency");
            adRevenue.setRevenue(revenue, currency);
        }

        // Ad impressions count
        if (checkKey(mapAdRevenue, "adImpressionsCount")) {
            try {
                adImpressionsCount = Integer.parseInt(mapAdRevenue.getString("adImpressionsCount"));
            } catch (NumberFormatException ignore) {}
            adRevenue.setAdImpressionsCount(adImpressionsCount);
        }

        // Ad revenue network
        if (checkKey(mapAdRevenue, "adRevenueNetwork")) {
            adRevenueNetwork = mapAdRevenue.getString("adRevenueNetwork");
            if (null != adRevenueNetwork) {
                adRevenue.setAdRevenueNetwork(adRevenueNetwork);
            }
        }

        // Ad revenue unit
        if (checkKey(mapAdRevenue, "adRevenueUnit")) {
            adRevenueUnit = mapAdRevenue.getString("adRevenueUnit");
            if (null != adRevenueUnit) {
                adRevenue.setAdRevenueUnit(adRevenueUnit);
            }
        }

        // Ad revenue placement
        if (checkKey(mapAdRevenue, "adRevenuePlacement")) {
            adRevenuePlacement = mapAdRevenue.getString("adRevenuePlacement");
            if (null != adRevenuePlacement) {
                adRevenue.setAdRevenuePlacement(adRevenuePlacement);
            }
        }

        // Callback parameters
        if (checkKey(mapAdRevenue, "callbackParameters")) {
            callbackParameters = AdjustUtil.toList(mapAdRevenue.getArray("callbackParameters"));
            if (null != callbackParameters) {
                for (int i = 0; i < callbackParameters.size(); i += 2) {
                        adRevenue.addCallbackParameter(callbackParameters.get(i).toString(),
                        callbackParameters.get(i+1).toString());
                }
            }
        }

        // Partner parameters
        if (checkKey(mapAdRevenue, "partnerParameters")) {
            partnerParameters = AdjustUtil.toList(mapAdRevenue.getArray("partnerParameters"));
            if (null != partnerParameters) {
                for (int i = 0; i < partnerParameters.size(); i += 2) {
                        adRevenue.addPartnerParameter(partnerParameters.get(i).toString(),
                        partnerParameters.get(i+1).toString());
                }
            }
        }

        // Track ad revenue
        com.adjust.sdk.Adjust.trackAdRevenue(adRevenue);
    }

    @ReactMethod
    public void trackPlayStoreSubscription(final ReadableMap mapEvent) {
        if (mapEvent == null) {
            return;
        }

        long price = -1;
        String currency = null;
        String sku = null;
        String orderId = null;
        String signature = null;
        String purchaseToken = null;
        long purchaseTime = -1;
        List<Object> callbackParameters = null;
        List<Object> partnerParameters = null;

        // Price
        if (checkKey(mapEvent, "price")) {
            try {
                price = Long.parseLong(mapEvent.getString("price"));
            } catch (NumberFormatException ignore) {}
        }

        // Currency
        if (checkKey(mapEvent, "currency")) {
            currency = mapEvent.getString("currency");
        }

        // SKU
        if (checkKey(mapEvent, "sku")) {
            sku = mapEvent.getString("sku");
        }

        // Order ID
        if (checkKey(mapEvent, "orderId")) {
            orderId = mapEvent.getString("orderId");
        }

        // Signature
        if (checkKey(mapEvent, "signature")) {
            signature = mapEvent.getString("signature");
        }

        // Purchase token
        if (checkKey(mapEvent, "purchaseToken")) {
            purchaseToken = mapEvent.getString("purchaseToken");
        }

        AdjustPlayStoreSubscription subscription = new AdjustPlayStoreSubscription(
                price,
                currency,
                sku,
                orderId,
                signature,
                purchaseToken);

        // Purchase time
        if (checkKey(mapEvent, "purchaseTime")) {
            try {
                purchaseTime = Long.parseLong(mapEvent.getString("purchaseTime"));
                subscription.setPurchaseTime(purchaseTime);
            } catch (NumberFormatException ignore) {}
        }

        // Callback parameters
        if (checkKey(mapEvent, "callbackParameters")) {
            callbackParameters = AdjustUtil.toList(mapEvent.getArray("callbackParameters"));
            if (null != callbackParameters) {
                for (int i = 0; i < callbackParameters.size(); i += 2) {
                        subscription.addCallbackParameter(callbackParameters.get(i).toString(),
                        callbackParameters.get(i+1).toString());
                }
            }
        }

        // Partner parameters
        if (checkKey(mapEvent, "partnerParameters")) {
            partnerParameters = AdjustUtil.toList(mapEvent.getArray("partnerParameters"));
            if (null != partnerParameters) {
                for (int i = 0; i < partnerParameters.size(); i += 2) {
                        subscription.addPartnerParameter(partnerParameters.get(i).toString(),
                        partnerParameters.get(i+1).toString());
                }
            }
        }

        // Track subscription
        com.adjust.sdk.Adjust.trackPlayStoreSubscription(subscription);
    }

    @ReactMethod
    public void addGlobalCallbackParameter(final String key, final String value) {
        com.adjust.sdk.Adjust.addGlobalCallbackParameter(key, value);
    }

    @ReactMethod
    public void addGlobalPartnerParameter(final String key, final String value) {
        com.adjust.sdk.Adjust.addGlobalPartnerParameter(key, value);
    }

    @ReactMethod
    public void removeGlobalCallbackParameter(final String key) {
        com.adjust.sdk.Adjust.removeGlobalCallbackParameter(key);
    }

    @ReactMethod
    public void removeGlobalPartnerParameter(final String key) {
        com.adjust.sdk.Adjust.removeGlobalPartnerParameter(key);
    }

    @ReactMethod
    public void removeGlobalCallbackParameters() {
        com.adjust.sdk.Adjust.removeGlobalCallbackParameters();
    }

    @ReactMethod
    public void removeGlobalPartnerParameters() {
        com.adjust.sdk.Adjust.removeGlobalPartnerParameters();
    }

    @ReactMethod
    public void gdprForgetMe() {
        com.adjust.sdk.Adjust.gdprForgetMe(getReactApplicationContext());
    }

    @ReactMethod
    public void getAdid(final Callback callback) {
        com.adjust.sdk.Adjust.getAdid(new com.adjust.sdk.OnAdidReadListener() {
            @Override
            public void onAdidRead(String adid) {
                callback.invoke(adid);
            }
        });
    }

    @ReactMethod
    public void getGoogleAdId(final Callback callback) {
        com.adjust.sdk.Adjust.getGoogleAdId(getReactApplicationContext(), new com.adjust.sdk.OnGoogleAdIdReadListener() {
            @Override
            public void onGoogleAdIdRead(String googleAdId) {
                callback.invoke(googleAdId);
            }
        });
    }

    @ReactMethod
    public void getAmazonAdId(final Callback callback) {
        com.adjust.sdk.Adjust.getAmazonAdId(getReactApplicationContext(), new com.adjust.sdk.OnAmazonAdIdReadListener() {
            @Override
            public void onAmazonAdIdRead(String amazonAdId) {
                callback.invoke(amazonAdId);
            }
        });
    }

    @ReactMethod
    public void getAttribution(final Callback callback) {
        com.adjust.sdk.Adjust.getAttribution(new com.adjust.sdk.OnAttributionReadListener() {
            @Override
            public void onAttributionRead(AdjustAttribution attribution) {
                callback.invoke(AdjustUtil.attributionToMap(attribution));
            }
        });
    }

    @ReactMethod
    public void isEnabled(final Callback callback) {
        com.adjust.sdk.Adjust.isEnabled(getReactApplicationContext(), new com.adjust.sdk.OnIsEnabledListener() {
            @Override
            public void onIsEnabledRead(boolean isEnabled) {
                callback.invoke(isEnabled);
            }
        });
    }

    @ReactMethod
    public void getSdkVersion(final String sdkPrefix, final Callback callback) {
        com.adjust.sdk.Adjust.getSdkVersion(new com.adjust.sdk.OnSdkVersionReadListener() {
            @Override
            public void onSdkVersionRead(String sdkVersion) {
                if (sdkVersion == null) {
                    callback.invoke("");
                } else {
                    callback.invoke(sdkPrefix + "@" + sdkVersion);
                }
            }
        });
    }

    @ReactMethod
    public void trackThirdPartySharing(final ReadableMap mapThirdPartySharing) {
        if (mapThirdPartySharing == null) {
            return;
        }

        Boolean isEnabled = null;
        List<Object> granularOptions = null;
        List<Object> partnerSharingSettings = null;

        // Enabled
        if (checkKey(mapThirdPartySharing, "isEnabled")) {
            isEnabled = mapThirdPartySharing.getBoolean("isEnabled");
        }

        final AdjustThirdPartySharing thirdPartySharing = new AdjustThirdPartySharing(isEnabled);

        // Granular options
        if (checkKey(mapThirdPartySharing, "granularOptions")) {
            granularOptions = AdjustUtil.toList(mapThirdPartySharing.getArray("granularOptions"));
            if (null != granularOptions) {
                for (int i = 0; i < granularOptions.size(); i += 3) {
                    thirdPartySharing.addGranularOption(
                        granularOptions.get(i).toString(),
                        granularOptions.get(i+1).toString(),
                        granularOptions.get(i+2).toString());
                }
            }
        }

        // Partner sharing settings
        if (checkKey(mapThirdPartySharing, "partnerSharingSettings")) {
            partnerSharingSettings = AdjustUtil.toList(mapThirdPartySharing.getArray("partnerSharingSettings"));
            if (null != partnerSharingSettings) {
                for (int i = 0; i < partnerSharingSettings.size(); i += 3) {
                    thirdPartySharing.addPartnerSharingSetting(
                        partnerSharingSettings.get(i).toString(),
                        partnerSharingSettings.get(i+1).toString(),
                        Boolean.parseBoolean(partnerSharingSettings.get(i+2).toString()));
                }
            }
        }

        // Track third party sharing.
        com.adjust.sdk.Adjust.trackThirdPartySharing(thirdPartySharing);
    }

    @ReactMethod
    public void trackMeasurementConsent(final boolean measurementConsent) {
        com.adjust.sdk.Adjust.trackMeasurementConsent(measurementConsent);
    }

    @ReactMethod
    public void verifyPlayStorePurchase(final ReadableMap mapEvent, final Callback callback) {
        if (mapEvent == null) {
            return;
        }

        String productId = null;
        String purchaseToken = null;

        // Product ID
        if (checkKey(mapEvent, "productId")) {
            productId = mapEvent.getString("productId");
        }

        // Purchase token
        if (checkKey(mapEvent, "purchaseToken")) {
            purchaseToken = mapEvent.getString("purchaseToken");
        }

        // Create purchase instance
        final AdjustPlayStorePurchase purchase = new AdjustPlayStorePurchase(productId, purchaseToken);

        // Verify purchase
        com.adjust.sdk.Adjust.verifyPlayStorePurchase(purchase, new OnPurchaseVerificationFinishedListener() {
            @Override
            public void onVerificationFinished(AdjustPurchaseVerificationResult verificationResult) {
                if (callback != null) {
                    WritableMap map = Arguments.createMap();
                    if (null == verificationResult) {
                        callback.invoke(map);
                        return;
                    }
                    map.putString("verificationStatus", null != verificationResult.getVerificationStatus() ? verificationResult.getVerificationStatus() : "");
                    map.putString("code", String.valueOf(verificationResult.getCode()));
                    map.putString("message", null != verificationResult.getMessage() ? verificationResult.getMessage() : "");
                    callback.invoke(map);
                }
            }
        });
    }

    @ReactMethod
    public void verifyAndTrackPlayStorePurchase(final ReadableMap mapEvent, final Callback callback) {
        if (mapEvent == null) {
            return;
        }

        double revenue = -1.0;
        String eventToken = null;
        String currency = null;
        String transactionId = null;
        String productId = null;
        String purchaseToken = null;
        String callbackId = null;
        String deduplicationId = null;

        List<Object> callbackParameters = null;
        List<Object> partnerParameters = null;

        // Event token
        if (checkKey(mapEvent, "eventToken")) {
            eventToken = mapEvent.getString("eventToken");
        }

        final AdjustEvent event = new AdjustEvent(eventToken);

        // Revenue
        if (checkKey(mapEvent, "revenue") || checkKey(mapEvent, "currency")) {
            try {
                revenue = Double.parseDouble(mapEvent.getString("revenue"));
            } catch (NumberFormatException ignore) {}
            // temporary patch, needs to be made more generic
            // undefined from JS potentially ending as "null" value?
            // TODO: if needed, add more generic check
            if (mapEvent.getString("currency") != null && !mapEvent.getString("currency").equals("null")) {
                currency = mapEvent.getString("currency");
            }
            event.setRevenue(revenue, currency);
        }

        // Callback parameters
        if (checkKey(mapEvent, "callbackParameters")) {
            callbackParameters = AdjustUtil.toList(mapEvent.getArray("callbackParameters"));
            if (null != callbackParameters) {
                for (int i = 0; i < callbackParameters.size(); i += 2) {
                        event.addCallbackParameter(callbackParameters.get(i).toString(),
                        callbackParameters.get(i+1).toString());
                }
            }
        }

        // Partner parameters
        if (checkKey(mapEvent, "partnerParameters")) {
            partnerParameters = AdjustUtil.toList(mapEvent.getArray("partnerParameters"));
            if (null != partnerParameters) {
                for (int i = 0; i < partnerParameters.size(); i += 2) {
                        event.addPartnerParameter(partnerParameters.get(i).toString(),
                        partnerParameters.get(i+1).toString());
                }
            }
        }

        // Revenue deduplication
        if (checkKey(mapEvent, "transactionId")) {
            transactionId = mapEvent.getString("transactionId");
            if (null != transactionId) {
                event.setOrderId(transactionId);
            }
        }

        // Callback ID
        if (checkKey(mapEvent, "callbackId")) {
            callbackId = mapEvent.getString("callbackId");
            if (null != callbackId) {
                event.setCallbackId(callbackId);
            }
        }

        // Product ID
        if (checkKey(mapEvent, "productId")) {
            productId = mapEvent.getString("productId");
            if (null != productId) {
                event.setProductId(productId);
            }
        }

        // Purchase token
        if (checkKey(mapEvent, "purchaseToken")) {
            purchaseToken = mapEvent.getString("purchaseToken");
            if (null != purchaseToken) {
                event.setPurchaseToken(purchaseToken);
            }
        }

         // Deduplication ID
        if (checkKey(mapEvent, "deduplicationId")) {
            deduplicationId = mapEvent.getString("deduplicationId");
            if (null != deduplicationId) {
                event.setDeduplicationId(deduplicationId);
            }
        }

        // Verify and track purrchase
        com.adjust.sdk.Adjust.verifyAndTrackPlayStorePurchase(event, new OnPurchaseVerificationFinishedListener() {
            @Override
            public void onVerificationFinished(AdjustPurchaseVerificationResult verificationResult) {
                if (callback != null) {
                    WritableMap map = Arguments.createMap();
                    if (null == verificationResult) {
                        callback.invoke(map);
                        return;
                    }
                    map.putString("verificationStatus", null != verificationResult.getVerificationStatus() ? verificationResult.getVerificationStatus() : "");
                    map.putString("code", String.valueOf(verificationResult.getCode()));
                    map.putString("message", null != verificationResult.getMessage() ? verificationResult.getMessage() : "");
                    callback.invoke(map);
                }
            }
        });
    }

    @ReactMethod
    public void processAndResolveDeeplink(final ReadableMap mapDeeplink, final Callback callback) {
        if (mapDeeplink == null) {
            return;
        }

        String deeplink = null;

        if (checkKey(mapDeeplink, "deeplink")) {
            deeplink = mapDeeplink.getString("deeplink");
        }

        final Uri uri = Uri.parse(deeplink);
        // Process and resolve deeplink
        com.adjust.sdk.Adjust.processAndResolveDeeplink(new AdjustDeeplink(uri), getReactApplicationContext(), new OnDeeplinkResolvedListener() {
            @Override
            public void onDeeplinkResolved(String resolvedLink) {
                callback.invoke(resolvedLink);
            }
        });
    }

    @ReactMethod
    public void getLastDeeplink(final Callback callback) {
        com.adjust.sdk.Adjust.getLastDeeplink(getReactApplicationContext(), new OnLastDeeplinkReadListener() {
            @Override
            public void onLastDeeplinkRead(Uri uri) {
                String strUri = (uri != null) ? uri.toString() : "";
                callback.invoke(strUri);
            }
        });
    }

    @ReactMethod
    public void setAttributionListener() {
        this.attributionCallback = true;
    }

    @ReactMethod
    public void setEventTrackingSucceededListener() {
        this.eventTrackingSucceededCallback = true;
    }

    @ReactMethod
    public void setEventTrackingFailedListener() {
        this.eventTrackingFailedCallback = true;
    }

    @ReactMethod
    public void setSessionTrackingSucceededListener() {
        this.sessionTrackingSucceededCallback = true;
    }

    @ReactMethod
    public void setSessionTrackingFailedListener() {
        this.sessionTrackingFailedCallback = true;
    }

    @ReactMethod
    public void setDeferredDeeplinkListener() {
        this.deferredDeeplinkCallback = true;
    }

    @ReactMethod
    public void teardown() {
        this.attributionCallback = false;
        this.eventTrackingSucceededCallback = false;
        this.eventTrackingFailedCallback = false;
        this.sessionTrackingSucceededCallback = false;
        this.sessionTrackingFailedCallback = false;
        this.deferredDeeplinkCallback = false;
    }

    @ReactMethod
    public void setTestOptions(final ReadableMap mapTest) {
        if (mapTest == null) {
            return;
        }

        final AdjustTestOptions testOptions = new AdjustTestOptions();
        if (checkKey(mapTest, "baseUrl")) {
            String value = mapTest.getString("baseUrl");
            testOptions.baseUrl = value;
        }
        if (checkKey(mapTest, "gdprUrl")) {
            String value = mapTest.getString("gdprUrl");
            testOptions.gdprUrl = value;
        }
        if (checkKey(mapTest, "subscriptionUrl")) {
            String value = mapTest.getString("subscriptionUrl");
            testOptions.subscriptionUrl = value;
        }
        if (checkKey(mapTest, "purchaseVerificationUrl")) {
            String value = mapTest.getString("purchaseVerificationUrl");
            testOptions.purchaseVerificationUrl = value;
        }
        if (checkKey(mapTest, "basePath")) {
            String value = mapTest.getString("basePath");
            testOptions.basePath = value;
        }
        if (checkKey(mapTest, "gdprPath")) {
            String value = mapTest.getString("gdprPath");
            testOptions.gdprPath = value;
        }
        if (checkKey(mapTest, "subscriptionPath")) {
            String value = mapTest.getString("subscriptionPath");
            testOptions.subscriptionPath = value;
        }
        if (checkKey(mapTest, "purchaseVerificationPath")) {
            String value = mapTest.getString("purchaseVerificationPath");
            testOptions.purchaseVerificationPath = value;
        }
        // if (checkKey(mapTest, "useTestConnectionOptions")) {
        //     boolean value = mapTest.getBoolean("useTestConnectionOptions");
        //     testOptions.useTestConnectionOptions = value;
        // }
        if (checkKey(mapTest, "timerIntervalInMilliseconds")) {
            try {
                Long value = Long.parseLong(mapTest.getString("timerIntervalInMilliseconds"));
                testOptions.timerIntervalInMilliseconds = value;
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
                Log.d(TAG, "Can't format number");
            }
        }
        if (checkKey(mapTest, "timerStartInMilliseconds")) {
            try {
                Long value = Long.parseLong(mapTest.getString("timerStartInMilliseconds"));
                testOptions.timerStartInMilliseconds = value;
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
                Log.d(TAG, "Can't format number");
            }
        }
        if (checkKey(mapTest, "sessionIntervalInMilliseconds")) {
            try {
                Long value = Long.parseLong(mapTest.getString("sessionIntervalInMilliseconds"));
                testOptions.sessionIntervalInMilliseconds = value;
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
                Log.d(TAG, "Can't format number");
            }
        }
        if (checkKey(mapTest, "subsessionIntervalInMilliseconds")) {
            try {
                Long value = Long.parseLong(mapTest.getString("subsessionIntervalInMilliseconds"));
                testOptions.subsessionIntervalInMilliseconds = value;
            } catch (NumberFormatException ex) {
                ex.printStackTrace();
                Log.d(TAG, "Can't format number");
            }
        }
        if (checkKey(mapTest, "noBackoffWait")) {
            boolean value = mapTest.getBoolean("noBackoffWait");
            testOptions.noBackoffWait = value;
        }
        if (checkKey(mapTest, "teardown")) {
            boolean value = mapTest.getBoolean("teardown");
            testOptions.teardown = value;
        }
        if (checkKey(mapTest, "deleteState")) {
            boolean value = mapTest.getBoolean("deleteState");
            if (value == true) {
                testOptions.context = getReactApplicationContext();
            }
        }
        if (checkKey(mapTest, "ignoreSystemLifecycleBootstrap")) {
            boolean value = mapTest.getBoolean("ignoreSystemLifecycleBootstrap");
            testOptions.ignoreSystemLifecycleBootstrap = value;
        }

        com.adjust.sdk.Adjust.setTestOptions(testOptions);
    }

    @ReactMethod
    public void onResume() {
        com.adjust.sdk.Adjust.onResume();
    }

    @ReactMethod
    public void onPause() {
        com.adjust.sdk.Adjust.onPause();
    }

    private void sendEvent(final ReactContext reactContext, final String eventName, final @Nullable WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }

    private boolean checkKey(final ReadableMap map, final String key) {
        return map.hasKey(key) && !map.isNull(key);
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    public void removeListeners(double count) {
        // Keep: Required for RN built in Event Emitter Calls.
    }
}
