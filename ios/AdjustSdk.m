//
//  AdjustSdk.h
//  Adjust SDK
//
//  Created by Abdullah Obaied (@obaied) on 25th October 2016.
//  Copyright © 2016-2021 Adjust GmbH. All rights reserved.
//

#import "AdjustSdk.h"
#import "AdjustSdkDelegate.h"

@implementation AdjustSdk

RCT_EXPORT_MODULE(Adjust);

BOOL _isAttributionCallbackImplemented;
BOOL _isEventTrackingSucceededCallbackImplemented;
BOOL _isEventTrackingFailedCallbackImplemented;
BOOL _isSessionTrackingSucceededCallbackImplemented;
BOOL _isSessionTrackingFailedCallbackImplemented;
BOOL _isDeferredDeeplinkCallbackImplemented;
BOOL _isConversionValueUpdatedCallbackImplemented;
BOOL _isSkad4ConversionValueUpdatedCallbackImplemented;

#pragma mark - Public methods

RCT_EXPORT_METHOD(create:(NSDictionary *)dict) {
    NSString *appToken = dict[@"appToken"];
    NSString *environment = dict[@"environment"];
    NSString *secretId = dict[@"secretId"];
    NSString *info1 = dict[@"info1"];
    NSString *info2 = dict[@"info2"];
    NSString *info3 = dict[@"info3"];
    NSString *info4 = dict[@"info4"];
    NSString *logLevel = dict[@"logLevel"];
    NSString *sdkPrefix = dict[@"sdkPrefix"];
    NSString *userAgent = dict[@"userAgent"];
    NSString *defaultTracker = dict[@"defaultTracker"];
    NSString *externalDeviceId = dict[@"externalDeviceId"];
    NSString *urlStrategy = dict[@"urlStrategy"];
    NSNumber *eventBufferingEnabled = dict[@"eventBufferingEnabled"];
    NSNumber *sendInBackground = dict[@"sendInBackground"];
    NSNumber *needsCost = dict[@"needsCost"];
    NSNumber *shouldLaunchDeeplink = dict[@"shouldLaunchDeeplink"];
    NSNumber *delayStart = dict[@"delayStart"];
    NSNumber *isDeviceKnown = dict[@"isDeviceKnown"];
    NSNumber *allowiAdInfoReading = dict[@"allowiAdInfoReading"];
    NSNumber *allowAdServicesInfoReading = dict[@"allowAdServicesInfoReading"];
    NSNumber *allowIdfaReading = dict[@"allowIdfaReading"];
    NSNumber *skAdNetworkHandling = dict[@"skAdNetworkHandling"];
    NSNumber *coppaCompliantEnabled = dict[@"coppaCompliantEnabled"];
    NSNumber *linkMeEnabled = dict[@"linkMeEnabled"];
    NSNumber *attConsentWaitingInterval = dict[@"attConsentWaitingInterval"];
    NSNumber *readDeviceInfoOnceEnabled = dict[@"readDeviceInfoOnceEnabled"];
    BOOL allowSuppressLogLevel = NO;

    // Suppress log level.
    if ([self isFieldValid:logLevel]) {
        if ([logLevel isEqualToString:@"SUPPRESS"]) {
            allowSuppressLogLevel = YES;
        }
    }

    ADJConfig *adjustConfig = [ADJConfig configWithAppToken:appToken environment:environment allowSuppressLogLevel:allowSuppressLogLevel];
    if (![adjustConfig isValid]) {
        return;
    }

    // Log level.
    if ([self isFieldValid:logLevel]) {
        [adjustConfig setLogLevel:[ADJLogger logLevelFromString:[logLevel lowercaseString]]];
    }

    // Event buffering.
    if ([self isFieldValid:eventBufferingEnabled]) {
        [adjustConfig setEventBufferingEnabled:[eventBufferingEnabled boolValue]];
    }

    // SDK prefix.
    if ([self isFieldValid:sdkPrefix]) {
        [adjustConfig setSdkPrefix:sdkPrefix];
    }

    // Default tracker.
    if ([self isFieldValid:defaultTracker]) {
        [adjustConfig setDefaultTracker:defaultTracker];
    }

    // External device ID.
    if ([self isFieldValid:externalDeviceId]) {
        [adjustConfig setExternalDeviceId:externalDeviceId];
    }

    // URL strategy.
    if ([self isFieldValid:urlStrategy]) {
        if ([urlStrategy isEqualToString:@"china"]) {
            [adjustConfig setUrlStrategy:ADJUrlStrategyChina];
        } else if ([urlStrategy isEqualToString:@"india"]) {
            [adjustConfig setUrlStrategy:ADJUrlStrategyIndia];
        } else if ([urlStrategy isEqualToString:@"cn"]) {
            [adjustConfig setUrlStrategy:ADJUrlStrategyCn];
        } else if ([urlStrategy isEqualToString:@"cn-only"]) {
            [adjustConfig setUrlStrategy:ADJUrlStrategyCnOnly];
        } else if ([urlStrategy isEqualToString:@"data-residency-eu"]) {
            [adjustConfig setUrlStrategy:ADJDataResidencyEU];
        } else if ([urlStrategy isEqualToString:@"data-residency-tr"]) {
            [adjustConfig setUrlStrategy:ADJDataResidencyTR];
        } else if ([urlStrategy isEqualToString:@"data-residency-us"]) {
            [adjustConfig setUrlStrategy:ADJDataResidencyUS];
        }
    }

    // Attribution delegate & other delegates
    BOOL shouldLaunchDeferredDeeplink = [self isFieldValid:shouldLaunchDeeplink] ? [shouldLaunchDeeplink boolValue] : YES;
    if (_isAttributionCallbackImplemented
        || _isEventTrackingSucceededCallbackImplemented
        || _isEventTrackingFailedCallbackImplemented
        || _isSessionTrackingSucceededCallbackImplemented
        || _isSessionTrackingFailedCallbackImplemented
        || _isDeferredDeeplinkCallbackImplemented
        || _isConversionValueUpdatedCallbackImplemented
        || _isSkad4ConversionValueUpdatedCallbackImplemented) {
        [adjustConfig setDelegate:
         [AdjustSdkDelegate getInstanceWithSwizzleOfAttributionCallback:_isAttributionCallbackImplemented
                                                 eventSucceededCallback:_isEventTrackingSucceededCallbackImplemented
                                                    eventFailedCallback:_isEventTrackingFailedCallbackImplemented
                                               sessionSucceededCallback:_isSessionTrackingSucceededCallbackImplemented
                                                  sessionFailedCallback:_isSessionTrackingFailedCallbackImplemented
                                               deferredDeeplinkCallback:_isDeferredDeeplinkCallbackImplemented
                                         conversionValueUpdatedCallback:_isConversionValueUpdatedCallbackImplemented
                                    skad4ConversionValueUpdatedCallback:_isSkad4ConversionValueUpdatedCallbackImplemented
                                           shouldLaunchDeferredDeeplink:shouldLaunchDeferredDeeplink]];
    }

    // Send in background.
    if ([self isFieldValid:sendInBackground]) {
        [adjustConfig setSendInBackground:[sendInBackground boolValue]];
    }

    // User agent.
    if ([self isFieldValid:userAgent]) {
        [adjustConfig setUserAgent:userAgent];
    }

    // App secret.
    if ([self isFieldValid:secretId]
        && [self isFieldValid:info1]
        && [self isFieldValid:info2]
        && [self isFieldValid:info3]
        && [self isFieldValid:info4]) {
        [adjustConfig setAppSecret:[[NSNumber numberWithLongLong:[secretId longLongValue]] unsignedIntegerValue]
                         info1:[[NSNumber numberWithLongLong:[info1 longLongValue]] unsignedIntegerValue]
                         info2:[[NSNumber numberWithLongLong:[info2 longLongValue]] unsignedIntegerValue]
                         info3:[[NSNumber numberWithLongLong:[info3 longLongValue]] unsignedIntegerValue]
                         info4:[[NSNumber numberWithLongLong:[info4 longLongValue]] unsignedIntegerValue]];
    }

    // Device known.
    if ([self isFieldValid:isDeviceKnown]) {
        [adjustConfig setIsDeviceKnown:[isDeviceKnown boolValue]];
    }

    // Cost data.
    if ([self isFieldValid:needsCost]) {
        [adjustConfig setNeedsCost:[needsCost boolValue]];
    }

    // iAd info reading.
    if ([self isFieldValid:allowiAdInfoReading]) {
        [adjustConfig setAllowiAdInfoReading:[allowiAdInfoReading boolValue]];
    }

    // AdServices info reading.
    if ([self isFieldValid:allowAdServicesInfoReading]) {
        [adjustConfig setAllowAdServicesInfoReading:[allowAdServicesInfoReading boolValue]];
    }

    // IDFA reading.
    if ([self isFieldValid:allowIdfaReading]) {
        [adjustConfig setAllowIdfaReading:[allowIdfaReading boolValue]];
    }

    // SKAdNetwork handling.
    if ([self isFieldValid:skAdNetworkHandling]) {
        if ([skAdNetworkHandling boolValue] == NO) {
            [adjustConfig deactivateSKAdNetworkHandling];
        }
    }

    // Delay start.
    if ([self isFieldValid:delayStart]) {
        [adjustConfig setDelayStart:[delayStart doubleValue]];
    }

    // COPPA compliance.
    if ([self isFieldValid:coppaCompliantEnabled]) {
        [adjustConfig setCoppaCompliantEnabled:[coppaCompliantEnabled boolValue]];
    }

    // LinkMe.
    if ([self isFieldValid:linkMeEnabled]) {
        [adjustConfig setLinkMeEnabled:[linkMeEnabled boolValue]];
    }

    // ATT consent delay.
    if ([self isFieldValid:attConsentWaitingInterval]) {
        [adjustConfig setAttConsentWaitingInterval:[attConsentWaitingInterval intValue]];
    }

    // Read device info just once.
    if ([self isFieldValid:readDeviceInfoOnceEnabled]) {
        [adjustConfig setReadDeviceInfoOnceEnabled:[readDeviceInfoOnceEnabled boolValue]];
    }

    // Start SDK.
    [Adjust appDidLaunch:adjustConfig];
    [Adjust trackSubsessionStart];
}

RCT_EXPORT_METHOD(trackEvent:(NSDictionary *)dict) {
    NSString *eventToken = dict[@"eventToken"];
    NSString *revenue = dict[@"revenue"];
    NSString *currency = dict[@"currency"];
    NSString *receipt = dict[@"receipt"];
    NSString *productId = dict[@"productId"];
    NSString *transactionId = dict[@"transactionId"];
    NSString *callbackId = dict[@"callbackId"];
    NSDictionary *callbackParameters = dict[@"callbackParameters"];
    NSDictionary *partnerParameters = dict[@"partnerParameters"];

    ADJEvent *adjustEvent = [ADJEvent eventWithEventToken:eventToken];
    if (![adjustEvent isValid]) {
        return;
    }

    // Revenue.
    if ([self isFieldValid:revenue]) {
        double revenueValue = [revenue doubleValue];
        [adjustEvent setRevenue:revenueValue currency:currency];
    }

    // Callback parameters.
    if ([self isFieldValid:callbackParameters]) {
        for (NSString *key in callbackParameters) {
            NSString *value = [callbackParameters objectForKey:key];
            [adjustEvent addCallbackParameter:key value:value];
        }
    }

    // Partner parameters.
    if ([self isFieldValid:partnerParameters]) {
        for (NSString *key in partnerParameters) {
            NSString *value = [partnerParameters objectForKey:key];
            [adjustEvent addPartnerParameter:key value:value];
        }
    }

    // Transaction ID.
    if ([self isFieldValid:transactionId]) {
        [adjustEvent setTransactionId:transactionId];
    }

    // Callback ID.
    if ([self isFieldValid:callbackId]) {
        [adjustEvent setCallbackId:callbackId];
    }

    // Receipt.
    if ([self isFieldValid:receipt]) {
        [adjustEvent setReceipt:[receipt dataUsingEncoding:NSUTF8StringEncoding]];
    }

    // Product ID.
    if ([self isFieldValid:productId]) {
        [adjustEvent setProductId:productId];
    }

    // Transaction ID.
    if ([self isFieldValid:transactionId]) {
        [adjustEvent setTransactionId:transactionId];
    }

    // Track event.
    [Adjust trackEvent:adjustEvent];
}

RCT_EXPORT_METHOD(setOfflineMode:(NSNumber * _Nonnull)isEnabled) {
    [Adjust setOfflineMode:[isEnabled boolValue]];
}

RCT_EXPORT_METHOD(setEnabled:(NSNumber * _Nonnull)isEnabled) {
    [Adjust setEnabled:[isEnabled boolValue]];
}

RCT_EXPORT_METHOD(isEnabled:(RCTResponseSenderBlock)callback) {
    BOOL isEnabled = [Adjust isEnabled];
    NSNumber *boolNumber = [NSNumber numberWithBool:isEnabled];
    callback(@[boolNumber]);
}

RCT_EXPORT_METHOD(setPushToken:(NSString *)token) {
    if (!([self isFieldValid:token])) {
        return;
    }
    [Adjust setPushToken:token];
}

RCT_EXPORT_METHOD(appWillOpenUrl:(NSString *)urlStr) {
    if (urlStr == nil) {
        return;
    }

    NSURL *url;
    if ([NSString instancesRespondToSelector:@selector(stringByAddingPercentEncodingWithAllowedCharacters:)]) {
        url = [NSURL URLWithString:[urlStr stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLFragmentAllowedCharacterSet]]];
    } else {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
        url = [NSURL URLWithString:[urlStr stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    }
#pragma clang diagnostic pop
    [Adjust appWillOpenUrl:url];
}

RCT_EXPORT_METHOD(sendFirstPackages) {
    [Adjust sendFirstPackages];
}

RCT_EXPORT_METHOD(trackAdRevenue:(NSString *)source payload:(NSString *)payload) {
    NSData *dataPayload = [payload dataUsingEncoding:NSUTF8StringEncoding];
    [Adjust trackAdRevenue:source payload:dataPayload];
}

RCT_EXPORT_METHOD(trackAdRevenueNew:(NSDictionary *)dict) {
    NSString *source = dict[@"source"];
    NSString *revenue = dict[@"revenue"];
    NSString *currency = dict[@"currency"];
    NSString *adImpressionsCount = dict[@"adImpressionsCount"];
    NSString *adRevenueNetwork = dict[@"adRevenueNetwork"];
    NSString *adRevenueUnit = dict[@"adRevenueUnit"];
    NSString *adRevenuePlacement = dict[@"adRevenuePlacement"];
    NSDictionary *callbackParameters = dict[@"callbackParameters"];
    NSDictionary *partnerParameters = dict[@"partnerParameters"];

    if ([source isKindOfClass:[NSNull class]]) {
        return;
    }
    ADJAdRevenue *adjustAdRevenue = [[ADJAdRevenue alloc] initWithSource:source];

    // Revenue.
    if ([self isFieldValid:revenue]) {
        double revenueValue = [revenue doubleValue];
        [adjustAdRevenue setRevenue:revenueValue currency:currency];
    }

    // Ad impressions count.
    if ([self isFieldValid:adImpressionsCount]) {
        int adImpressionsCountValue = [adImpressionsCount intValue];
        [adjustAdRevenue setAdImpressionsCount:adImpressionsCountValue];
    }

    // Ad revenue network.
    if ([self isFieldValid:adRevenueNetwork]) {
        [adjustAdRevenue setAdRevenueNetwork:adRevenueNetwork];
    }

    // Ad revenue unit.
    if ([self isFieldValid:adRevenueUnit]) {
        [adjustAdRevenue setAdRevenueUnit:adRevenueUnit];
    }

    // Ad revenue placement.
    if ([self isFieldValid:adRevenuePlacement]) {
        [adjustAdRevenue setAdRevenuePlacement:adRevenuePlacement];
    }

    // Callback parameters.
    if ([self isFieldValid:callbackParameters]) {
        for (NSString *key in callbackParameters) {
            NSString *value = [callbackParameters objectForKey:key];
            [adjustAdRevenue addCallbackParameter:key value:value];
        }
    }

    // Partner parameters.
    if ([self isFieldValid:partnerParameters]) {
        for (NSString *key in partnerParameters) {
            NSString *value = [partnerParameters objectForKey:key];
            [adjustAdRevenue addPartnerParameter:key value:value];
        }
    }

    // Track ad revenue.
    [Adjust trackAdRevenue:adjustAdRevenue];
}

RCT_EXPORT_METHOD(trackAppStoreSubscription:(NSDictionary *)dict) {
    NSString *price = dict[@"price"];
    NSString *currency = dict[@"currency"];
    NSString *transactionId = dict[@"transactionId"];
    NSString *receipt = dict[@"receipt"];
    NSString *transactionDate = dict[@"transactionDate"];
    NSString *salesRegion = dict[@"salesRegion"];
    NSDictionary *callbackParameters = dict[@"callbackParameters"];
    NSDictionary *partnerParameters = dict[@"partnerParameters"];

    // Price.
    NSDecimalNumber *priceValue;
    if ([self isFieldValid:price]) {
        priceValue = [NSDecimalNumber decimalNumberWithString:price];
    }

    // Receipt.
    NSData *receiptValue;
    if ([self isFieldValid:receipt]) {
        receiptValue = [receipt dataUsingEncoding:NSUTF8StringEncoding];
    }

    ADJSubscription *subscription = [[ADJSubscription alloc] initWithPrice:priceValue
                                                                  currency:currency
                                                             transactionId:transactionId
                                                                andReceipt:receiptValue];

    // Transaction date.
    if ([self isFieldValid:transactionDate]) {
        NSTimeInterval transactionDateInterval = [transactionDate doubleValue] / 1000.0;
        NSDate *oTransactionDate = [NSDate dateWithTimeIntervalSince1970:transactionDateInterval];
        [subscription setTransactionDate:oTransactionDate];
    }

    // Sales region.
    if ([self isFieldValid:salesRegion]) {
        [subscription setSalesRegion:salesRegion];
    }

    // Callback parameters.
    if ([self isFieldValid:callbackParameters]) {
        for (NSString *key in callbackParameters) {
            NSString *value = [callbackParameters objectForKey:key];
            [subscription addCallbackParameter:key value:value];
        }
    }

    // Partner parameters.
    if ([self isFieldValid:partnerParameters]) {
        for (NSString *key in partnerParameters) {
            NSString *value = [partnerParameters objectForKey:key];
            [subscription addPartnerParameter:key value:value];
        }
    }

    // Track subscription.
    [Adjust trackSubscription:subscription];
}

RCT_EXPORT_METHOD(addSessionCallbackParameter:(NSString *)key value:(NSString *)value) {
    if (!([self isFieldValid:key]) || !([self isFieldValid:value])) {
        return;
    }
    [Adjust addSessionCallbackParameter:key value:value];
}

RCT_EXPORT_METHOD(removeSessionCallbackParameter:(NSString *)key) {
    if (!([self isFieldValid:key])) {
        return;
    }
    [Adjust removeSessionCallbackParameter:key];
}

RCT_EXPORT_METHOD(resetSessionCallbackParameters) {
    [Adjust resetSessionCallbackParameters];
}

RCT_EXPORT_METHOD(addSessionPartnerParameter:(NSString *)key value:(NSString *)value) {
    if (!([self isFieldValid:key]) || !([self isFieldValid:value])) {
        return;
    }
    [Adjust addSessionPartnerParameter:key value:value];
}

RCT_EXPORT_METHOD(removeSessionPartnerParameter:(NSString *)key) {
    if (!([self isFieldValid:key])) {
        return;
    }
    [Adjust removeSessionPartnerParameter:key];
}

RCT_EXPORT_METHOD(resetSessionPartnerParameters) {
    [Adjust resetSessionPartnerParameters];
}

RCT_EXPORT_METHOD(gdprForgetMe) {
    [Adjust gdprForgetMe];
}

RCT_EXPORT_METHOD(disableThirdPartySharing) {
    [Adjust disableThirdPartySharing];
}

RCT_EXPORT_METHOD(requestTrackingAuthorizationWithCompletionHandler:(RCTResponseSenderBlock)callback) {
    [Adjust requestTrackingAuthorizationWithCompletionHandler:^(NSUInteger status) {
        callback(@[@(status)]);
    }];
}

RCT_EXPORT_METHOD(updateConversionValue:(NSNumber * _Nonnull)conversionValue) {
    [Adjust updateConversionValue:[conversionValue intValue]];
}

RCT_EXPORT_METHOD(updateConversionValueWithErrorCallback:(NSNumber * _Nonnull)conversionValue
                                           errorCallback:(RCTResponseSenderBlock)callback) {
    [Adjust updatePostbackConversionValue:[conversionValue intValue]
                        completionHandler:^(NSError * _Nullable error) {
        callback(@[[error localizedDescription]]);
    }];
}

RCT_EXPORT_METHOD(updateConversionValueWithSkad4ErrorCallback:(NSNumber * _Nonnull)conversionValue
                                                  coarseValue:(NSString * _Nonnull)coarseValue
                                                   lockWindow:(NSNumber * _Nonnull)lockWindow
                                                errorCallback:(RCTResponseSenderBlock)callback) {
    [Adjust updatePostbackConversionValue:[conversionValue intValue]
                              coarseValue:coarseValue
                               lockWindow:[lockWindow boolValue]
                        completionHandler:^(NSError * _Nullable error) {
        callback(@[[error localizedDescription]]);
    }];
}

RCT_EXPORT_METHOD(getAppTrackingAuthorizationStatus:(RCTResponseSenderBlock)callback) {
    callback(@[@([Adjust appTrackingAuthorizationStatus])]);
}

RCT_EXPORT_METHOD(getIdfa:(RCTResponseSenderBlock)callback) {
    NSString *idfa = [Adjust idfa];
    if (nil == idfa) {
        callback(@[@""]);
    } else {
        callback(@[idfa]);
    }
}

RCT_EXPORT_METHOD(getIdfv:(RCTResponseSenderBlock)callback) {
    NSString *idfv = [Adjust idfv];
    if (nil == idfv) {
        callback(@[@""]);
    } else {
        callback(@[idfv]);
    }
}

RCT_EXPORT_METHOD(getGoogleAdId:(RCTResponseSenderBlock)callback) {
    callback(@[@""]);
}

RCT_EXPORT_METHOD(getAmazonAdId:(RCTResponseSenderBlock)callback) {
    callback(@[@""]);
}

RCT_EXPORT_METHOD(getAdid:(RCTResponseSenderBlock)callback) {
    NSString *adid = [Adjust adid];
    if (nil == adid) {
        callback(@[@""]);
    } else {
        callback(@[adid]);
    }
}

RCT_EXPORT_METHOD(getSdkVersion:(NSString *)sdkPrefix callback:(RCTResponseSenderBlock)callback) {
    NSString *sdkVersion = [Adjust sdkVersion];
    if (nil == sdkVersion) {
        callback(@[@""]);
    } else {
        callback(@[[NSString stringWithFormat:@"%@@%@", sdkPrefix, sdkVersion]]);
    }
}

RCT_EXPORT_METHOD(setReferrer:(NSString *)referrer) {}

RCT_EXPORT_METHOD(trackPlayStoreSubscription:(NSDictionary *)dict) {}

RCT_EXPORT_METHOD(verifyPlayStorePurchase:(NSDictionary *)dict callback:(RCTResponseSenderBlock)callback) {
    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
    callback(@[dictionary]);
}

RCT_EXPORT_METHOD(getAttribution:(RCTResponseSenderBlock)callback) {
    ADJAttribution *attribution = [Adjust attribution];
    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
    if (attribution == nil) {
        callback(@[dictionary]);
        return;
    }

    [self addValueOrEmpty:dictionary key:@"trackerToken" value:attribution.trackerToken];
    [self addValueOrEmpty:dictionary key:@"trackerName" value:attribution.trackerName];
    [self addValueOrEmpty:dictionary key:@"network" value:attribution.network];
    [self addValueOrEmpty:dictionary key:@"campaign" value:attribution.campaign];
    [self addValueOrEmpty:dictionary key:@"creative" value:attribution.creative];
    [self addValueOrEmpty:dictionary key:@"adgroup" value:attribution.adgroup];
    [self addValueOrEmpty:dictionary key:@"clickLabel" value:attribution.clickLabel];
    [self addValueOrEmpty:dictionary key:@"adid" value:attribution.adid];
    [self addValueOrEmpty:dictionary key:@"costType" value:attribution.costType];
    [self addValueOrEmpty:dictionary key:@"costAmount" value:attribution.costAmount];
    [self addValueOrEmpty:dictionary key:@"costCurrency" value:attribution.costCurrency];
    callback(@[dictionary]);
}

RCT_EXPORT_METHOD(convertUniversalLink:(NSString *)urlString scheme:(NSString *)scheme callback:(RCTResponseSenderBlock)callback) {
    NSURL *url = [[NSURL alloc] initWithString:urlString];
    NSURL *converted = [Adjust convertUniversalLink:url scheme:scheme];
    
    if (converted != nil && converted.absoluteString != nil && converted.absoluteString.length > 0) {
        callback(@[converted.absoluteString]);
    } else {
        callback(nil);
    }
}

RCT_EXPORT_METHOD(trackThirdPartySharing:(NSDictionary *)dict) {
    NSNumber *isEnabled = dict[@"isEnabled"];
    NSArray *granularOptions = dict[@"granularOptions"];
    NSArray *partnerSharingSettings = dict[@"partnerSharingSettings"];

    if (isEnabled != nil && [isEnabled isKindOfClass:[NSNull class]]) {
        isEnabled = nil;
    }
    ADJThirdPartySharing *adjustThirdPartySharing = [[ADJThirdPartySharing alloc] initWithIsEnabledNumberBool:isEnabled];

    // Granular options.
    if ([self isFieldValid:granularOptions]) {
        for (int i = 0; i < [granularOptions count]; i += 3) {
            NSString *partnerName = [granularOptions objectAtIndex:i];
            NSString *key = [granularOptions objectAtIndex:i+1];
            NSString *value = [granularOptions objectAtIndex:i+2];
            [adjustThirdPartySharing addGranularOption:partnerName key:key value:value];
        }
    }

    // Partner sharing settings.
    if ([self isFieldValid:partnerSharingSettings]) {
        for (int i = 0; i < [partnerSharingSettings count]; i += 3) {
            NSString *partnerName = [partnerSharingSettings objectAtIndex:i];
            NSString *key = [partnerSharingSettings objectAtIndex:i+1];
            NSString *value = [partnerSharingSettings objectAtIndex:i+2];
            [adjustThirdPartySharing addPartnerSharingSetting:partnerName key:key value:[value boolValue]];
        }
    }

    // Track third party sharing.
    [Adjust trackThirdPartySharing:adjustThirdPartySharing];
}

RCT_EXPORT_METHOD(trackMeasurementConsent:(NSNumber * _Nonnull)measurementConsent) {
    [Adjust trackMeasurementConsent:[measurementConsent boolValue]];
}

RCT_EXPORT_METHOD(checkForNewAttStatus) {
    [Adjust checkForNewAttStatus];
}

RCT_EXPORT_METHOD(getLastDeeplink:(RCTResponseSenderBlock)callback) {
    NSURL *lastDeeplink = [Adjust lastDeeplink];
    if (nil == lastDeeplink) {
        callback(@[@""]);
    } else {
        callback(@[[lastDeeplink absoluteString]]);
    }
}

RCT_EXPORT_METHOD(verifyAppStorePurchase:(NSDictionary *)dict callback:(RCTResponseSenderBlock)callback) {
    NSString *receipt = dict[@"receipt"];
    NSString *productId = dict[@"productId"];
    NSString *transactionId = dict[@"transactionId"];

    // Receipt.
    NSData *receiptValue;
    if ([self isFieldValid:receipt]) {
        receiptValue = [receipt dataUsingEncoding:NSUTF8StringEncoding];
    }

    // Create purchase instance.
    ADJPurchase *purchase = [[ADJPurchase alloc] initWithTransactionId:transactionId
                                                             productId:productId
                                                            andReceipt:receiptValue];

    // Verify purchase.
    [Adjust verifyPurchase:purchase 
         completionHandler:^(ADJPurchaseVerificationResult * _Nonnull verificationResult) {
        NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
        if (verificationResult == nil) {
            callback(@[dictionary]);
            return;
        }

        [self addValueOrEmpty:dictionary key:@"verificationStatus" value:verificationResult.verificationStatus];
        [self addValueOrEmpty:dictionary key:@"code" value:[NSString stringWithFormat:@"%d", verificationResult.code]];
        [self addValueOrEmpty:dictionary key:@"message" value:verificationResult.message];

        callback(@[dictionary]);
    }];
}

RCT_EXPORT_METHOD(processDeeplink:(NSString *)urlStr callback:(RCTResponseSenderBlock)callback) {
    if (urlStr == nil) {
        return;
    }

    NSURL *url;
    if ([NSString instancesRespondToSelector:@selector(stringByAddingPercentEncodingWithAllowedCharacters:)]) {
        url = [NSURL URLWithString:[urlStr stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLFragmentAllowedCharacterSet]]];
    } else {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
        url = [NSURL URLWithString:[urlStr stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    }
#pragma clang diagnostic pop

    // Process deeplink.
    [Adjust processDeeplink:url completionHandler:^(NSString * _Nonnull resolvedLink) {
        if (resolvedLink == nil) {
            callback(@[@""]);
        } else {
            callback(@[resolvedLink]);
        }
    }];
}

RCT_EXPORT_METHOD(setAttributionCallbackListener) {
    _isAttributionCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setEventTrackingSucceededCallbackListener) {
    _isEventTrackingSucceededCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setEventTrackingFailedCallbackListener) {
    _isEventTrackingFailedCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setSessionTrackingSucceededCallbackListener) {
    _isSessionTrackingSucceededCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setSessionTrackingFailedCallbackListener) {
    _isSessionTrackingFailedCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setDeferredDeeplinkCallbackListener) {
    _isDeferredDeeplinkCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setConversionValueUpdatedCallbackListener) {
    _isConversionValueUpdatedCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setSkad4ConversionValueUpdatedCallbackListener) {
    _isSkad4ConversionValueUpdatedCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setTestOptions:(NSDictionary *)dict) {
    AdjustTestOptions *testOptions = [[AdjustTestOptions alloc] init];
    if ([dict objectForKey:@"hasContext"]) {
        NSString *value = dict[@"hasContext"];
        if ([self isFieldValid:value]) {
            testOptions.deleteState = [value boolValue];
        }
    }
    if ([dict objectForKey:@"urlOverwrite"]) {
        NSString *value = dict[@"urlOverwrite"];
        if ([self isFieldValid:value]) {
            testOptions.urlOverwrite = value;
        }
    }
    if ([dict objectForKey:@"extraPath"]) {
        NSString *value = dict[@"extraPath"];
        if ([self isFieldValid:value]) {
            testOptions.extraPath = value;
        }
    }
    if ([dict objectForKey:@"timerIntervalInMilliseconds"]) {
        NSString *value = dict[@"timerIntervalInMilliseconds"];
        if ([self isFieldValid:value]) {
            testOptions.timerIntervalInMilliseconds = [self convertMilliStringToNumber:value];
        }
    }
    if ([dict objectForKey:@"timerStartInMilliseconds"]) {
        NSString *value = dict[@"timerStartInMilliseconds"];
        if ([self isFieldValid:value]) {
            testOptions.timerStartInMilliseconds = [self convertMilliStringToNumber:value];
        }
    }
    if ([dict objectForKey:@"sessionIntervalInMilliseconds"]) {
        NSString *value = dict[@"sessionIntervalInMilliseconds"];
        if ([self isFieldValid:value]) {
            testOptions.sessionIntervalInMilliseconds = [self convertMilliStringToNumber:value];
        }
    }
    if ([dict objectForKey:@"subsessionIntervalInMilliseconds"]) {
        NSString *value = dict[@"subsessionIntervalInMilliseconds"];
        if ([self isFieldValid:value]) {
            testOptions.subsessionIntervalInMilliseconds = [self convertMilliStringToNumber:value];
        }
    }
    if ([dict objectForKey:@"teardown"]) {
        NSString *value = dict[@"teardown"];
        if ([self isFieldValid:value]) {
            testOptions.teardown = [value boolValue];
        }
    }
    if ([dict objectForKey:@"noBackoffWait"]) {
        NSString *value = dict[@"noBackoffWait"];
        if ([self isFieldValid:value]) {
            testOptions.noBackoffWait = [value boolValue];
        }
    }
    if ([dict objectForKey:@"adServicesFrameworkEnabled"]) {
        NSString *value = dict[@"adServicesFrameworkEnabled"];
        if ([self isFieldValid:value]) {
            testOptions.adServicesFrameworkEnabled = [value boolValue];
        }
    }
    if ([dict objectForKey:@"attStatus"]) {
        NSString *value = dict[@"attStatus"];
        if ([self isFieldValid:value]) {
            testOptions.attStatusInt = [NSNumber numberWithInt:[value intValue]];
        }
    }
    if ([dict objectForKey:@"idfa"]) {
        NSString *value = dict[@"idfa"];
        if ([self isFieldValid:value]) {
            testOptions.idfa = value;
        }
    }

    [Adjust setTestOptions:testOptions];
}

RCT_EXPORT_METHOD(teardown) {
    _isAttributionCallbackImplemented = NO;
    _isEventTrackingSucceededCallbackImplemented = NO;
    _isEventTrackingFailedCallbackImplemented = NO;
    _isSessionTrackingSucceededCallbackImplemented = NO;
    _isSessionTrackingFailedCallbackImplemented = NO;
    _isDeferredDeeplinkCallbackImplemented = NO;
    _isConversionValueUpdatedCallbackImplemented = NO;
    _isSkad4ConversionValueUpdatedCallbackImplemented = NO;
    [AdjustSdkDelegate teardown];
}

RCT_EXPORT_METHOD(onResume) {
    [Adjust trackSubsessionStart];
}

RCT_EXPORT_METHOD(onPause) {
    [Adjust trackSubsessionEnd];
}

#pragma mark - Private & helper methods

- (BOOL)isFieldValid:(NSObject *)field {
    if (field == nil) {
        return NO;
    }

    // Check if its an instance of the singleton NSNull.
    if ([field isKindOfClass:[NSNull class]]) {
        return NO;
    }

    // If 'field' can be converted to a string, check if it has any content.
    NSString *str = [NSString stringWithFormat:@"%@", field];
    if (str != nil) {
        if ([str length] == 0) {
            return NO;
        }
        if ([str isEqualToString:@"null"]) {
            return NO;
        }
    }

    return YES;
}

- (void)addValueOrEmpty:(NSMutableDictionary *)dictionary
                    key:(NSString *)key
                  value:(NSObject *)value {
    if (nil != value) {
        [dictionary setObject:[NSString stringWithFormat:@"%@", value] forKey:key];
    } else {
        [dictionary setObject:@"" forKey:key];
    }
}

- (NSNumber *)convertMilliStringToNumber:(NSString *)milliS {
    NSNumber *number = [NSNumber numberWithInt:[milliS intValue]];
    return number;
}

@end
