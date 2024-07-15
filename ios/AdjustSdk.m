//
//  AdjustSdk.h
//  AdjustSdk
//
//  Created by Aditi Agrawal on 15/07/24.
//  Copyright © 2016-Present Adjust GmbH. All rights reserved.
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
BOOL _isSkadConversionValueUpdatedCallbackImplemented;

#pragma mark - Public methods

RCT_EXPORT_METHOD(initSdk:(NSDictionary *)dict) {
    NSString *appToken = [dict objectForKey:@"appToken"];
    NSString *environment = [dict objectForKey:@"environment"];
    NSString *allowSuppressLogLevel = [dict objectForKey:@"allowSuppressLogLevel"];
    NSString *sdkPrefix = [dict objectForKey:@"sdkPrefix"];
    NSString *defaultTracker = [dict objectForKey:@"defaultTracker"];
    NSString *externalDeviceId = [dict objectForKey:@"externalDeviceId"];
    NSString *logLevel = [dict objectForKey:@"logLevel"];
    NSNumber *sendInBackground = [dict objectForKey:@"sendInBackground"];
    NSNumber *isLinkMeEnabled = [dict objectForKey:@"linkMeEnabled"];
    NSNumber *isCostDataInAttributionEnabled = [dict objectForKey:@"isCostDataInAttributionEnabled"];
    NSNumber *isAdServicesEnabled = [dict objectForKey:@"isAdServicesEnabled"];
    NSNumber *isIdfaReadingAllowed = [dict objectForKey:@"isIdfaReadingAllowed"];
    NSNumber *isSkanAttributionHandlingEnabled = [dict objectForKey:@"isSkanAttributionHandlingEnabled"];
    NSNumber *isDeferredDeeplinkOpeningEnabled = [dict objectForKey:@"isDeferredDeeplinkOpeningEnabled"];
    NSNumber *shouldReadDeviceInfoOnce = [dict objectForKey:@"shouldReadDeviceInfoOnce"];
    NSNumber *attConsentWaitingSeconds = [dict objectForKey:@"attConsentWaitingSeconds"];
    NSNumber *eventDeduplicationIdsMaxSize = [dict objectForKey:@"eventDeduplicationIdsMaxSize"];
    id urlStrategyDomains = [dict objectForKey:@"urlStrategyDomains"];
    NSNumber *useSubdomains = [dict objectForKey:@"useSubdomains"];
    NSNumber *isDataResidency = [dict objectForKey:@"isDataResidency"];

    ADJConfig *adjustConfig;
    if ([self isFieldValid:allowSuppressLogLevel]) {
        adjustConfig = [[ADJConfig alloc] initWithAppToken:appToken
                                               environment:environment
                                       andSuppressLogLevel:[allowSuppressLogLevel boolValue]];
    } else {
        adjustConfig = [[ADJConfig alloc] initWithAppToken:appToken
                                            andEnvironment:environment];
    }

    if (![adjustConfig isValid]) {
        return;
    }

    // Log level
    if ([self isFieldValid:logLevel]) {
        [adjustConfig setLogLevel:[ADJLogger logLevelFromString:[logLevel lowercaseString]]];
    }

    // SDK prefix
    if ([self isFieldValid:sdkPrefix]) {
        [adjustConfig setSdkPrefix:sdkPrefix];
    }

    // Default tracker
    if ([self isFieldValid:defaultTracker]) {
        [adjustConfig setDefaultTracker:defaultTracker];
    }

    // External device ID
    if ([self isFieldValid:externalDeviceId]) {
        [adjustConfig setExternalDeviceId:externalDeviceId];
    }

    NSMutableArray *urlStrategyDomainsArray;
    // URL strategy
    if (urlStrategyDomains != nil && [urlStrategyDomains count] > 0) {
        urlStrategyDomainsArray = [[NSMutableArray alloc] initWithCapacity:[urlStrategyDomains count]];
        for (int i = 0; i < [urlStrategyDomains count]; i += 1) {
            NSString *domain = [[urlStrategyDomains objectAtIndex:i] description];
            [urlStrategyDomainsArray addObject:domain];
        }
    }
    if ([self isFieldValid:useSubdomains] && [self isFieldValid:isDataResidency]) {
        [adjustConfig setUrlStrategy:(NSArray *)urlStrategyDomainsArray
                      withSubdomains:[useSubdomains boolValue]
                    andDataResidency:[isDataResidency boolValue]];
    }

    // Send in background
    if ([self isFieldValid:sendInBackground]) {
        if ([sendInBackground boolValue] == YES) {
            [adjustConfig enableSendingInBackground];
        }
    }

    // Cost data
    if ([self isFieldValid:isCostDataInAttributionEnabled]) {
        if ([isCostDataInAttributionEnabled boolValue] == YES) {
            [adjustConfig enableCostDataInAttribution];
        }
    }

    // AdServices info reading
    if ([self isFieldValid:isAdServicesEnabled]) {
        if ([isAdServicesEnabled boolValue] == NO) {
            [adjustConfig disableAdServices];
        }
    }

    // IDFA reading
    if ([self isFieldValid:isIdfaReadingAllowed]) {
        if ([isIdfaReadingAllowed boolValue] == NO) {
            [adjustConfig disableIdfaReading];
        }
    }

    // SKAdNetwork handling
    if ([self isFieldValid:isSkanAttributionHandlingEnabled]) {
        if ([isSkanAttributionHandlingEnabled boolValue] == NO) {
            [adjustConfig disableSkanAttribution];
        }
    }

    // LinkMe
    if ([self isFieldValid:isLinkMeEnabled]) {
        if ([isLinkMeEnabled boolValue] == YES) {
            [adjustConfig enableLinkMe];
        }
    }

    // ATT consent delay
    if ([self isFieldValid:attConsentWaitingSeconds]) {
        [adjustConfig setAttConsentWaitingInterval:[attConsentWaitingSeconds intValue]];
    }

    // Read device info just once
    if ([self isFieldValid:shouldReadDeviceInfoOnce]) {
        if ([shouldReadDeviceInfoOnce boolValue] == YES) {
            [adjustConfig enableDeviceIdsReadingOnce];
        }
    }

    // Set event Deduplication ids
    if ([self isFieldValid:eventDeduplicationIdsMaxSize]) {
        [adjustConfig setEventDeduplicationIdsMaxSize:[eventDeduplicationIdsMaxSize integerValue]];
    }

    // Attribution delegate & other delegates
    BOOL shouldLaunchDeferredDeeplink = [self isFieldValid:isDeferredDeeplinkOpeningEnabled] ? [isDeferredDeeplinkOpeningEnabled boolValue] : YES;
    if (_isAttributionCallbackImplemented
        || _isEventTrackingSucceededCallbackImplemented
        || _isEventTrackingFailedCallbackImplemented
        || _isSessionTrackingSucceededCallbackImplemented
        || _isSessionTrackingFailedCallbackImplemented
        || _isDeferredDeeplinkCallbackImplemented
        || _isSkadConversionValueUpdatedCallbackImplemented) {
        [adjustConfig setDelegate:
         [AdjustSdkDelegate getInstanceWithSwizzleOfAttributionCallback:_isAttributionCallbackImplemented
                                                 eventSucceededCallback:_isEventTrackingSucceededCallbackImplemented
                                                    eventFailedCallback:_isEventTrackingFailedCallbackImplemented
                                               sessionSucceededCallback:_isSessionTrackingSucceededCallbackImplemented
                                                  sessionFailedCallback:_isSessionTrackingFailedCallbackImplemented
                                               deferredDeeplinkCallback:_isDeferredDeeplinkCallbackImplemented
                                     skadConversionValueUpdatedCallback:_isSkadConversionValueUpdatedCallbackImplemented
                                           shouldLaunchDeferredDeeplink:shouldLaunchDeferredDeeplink]];
    }

    // Start SDK
    [Adjust initSdk:adjustConfig];
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

    ADJEvent *adjustEvent = [[ADJEvent alloc] initWithEventToken:eventToken];
    if (![adjustEvent isValid]) {
        return;
    }

    // Revenue
    if ([self isFieldValid:revenue]) {
        double revenueValue = [revenue doubleValue];
        [adjustEvent setRevenue:revenueValue currency:currency];
    }

    // Callback parameters
    if ([self isFieldValid:callbackParameters]) {
        for (NSString *key in callbackParameters) {
            NSString *value = [callbackParameters objectForKey:key];
            [adjustEvent addCallbackParameter:key value:value];
        }
    }

    // Partner parameters
    if ([self isFieldValid:partnerParameters]) {
        for (NSString *key in partnerParameters) {
            NSString *value = [partnerParameters objectForKey:key];
            [adjustEvent addPartnerParameter:key value:value];
        }
    }

    // Transaction ID
    if ([self isFieldValid:transactionId]) {
        [adjustEvent setTransactionId:transactionId];
    }

    // Callback ID
    if ([self isFieldValid:callbackId]) {
        [adjustEvent setCallbackId:callbackId];
    }

    // Receipt
    if ([self isFieldValid:receipt]) {
        [adjustEvent setReceipt:[receipt dataUsingEncoding:NSUTF8StringEncoding]];
    }

    // Product ID
    if ([self isFieldValid:productId]) {
        [adjustEvent setProductId:productId];
    }

    // Transaction ID
    if ([self isFieldValid:transactionId]) {
        [adjustEvent setTransactionId:transactionId];
    }

    // Track event
    [Adjust trackEvent:adjustEvent];
}

RCT_EXPORT_METHOD(switchToOfflineMode) {
    [Adjust switchToOfflineMode];
}

RCT_EXPORT_METHOD(switchBackToOnlineMode) {
    [Adjust switchBackToOnlineMode];
}

RCT_EXPORT_METHOD(enable) {
    [Adjust enable];
}

RCT_EXPORT_METHOD(disable) {
    [Adjust disable];
}

RCT_EXPORT_METHOD(enableCoppaCompliance) {
    [Adjust enableCoppaCompliance];
}

RCT_EXPORT_METHOD(disableCoppaCompliance) {
    [Adjust disableCoppaCompliance];
}

RCT_EXPORT_METHOD(isEnabled:(RCTResponseSenderBlock)callback) {
    [Adjust isEnabledWithCompletionHandler:^(BOOL isEnabled) {
        NSNumber *boolNumber = [NSNumber numberWithBool:isEnabled];
        callback(@[boolNumber]);
    }];
}

RCT_EXPORT_METHOD(setPushToken:(NSString *)token) {
    if (!([self isFieldValid:token])) {
        return;
    }
    [Adjust setPushTokenAsString:token];
}

RCT_EXPORT_METHOD(processDeeplink:(NSString *)urlStr) {
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
    [Adjust processDeeplink:url];
}

RCT_EXPORT_METHOD(trackAdRevenue:(NSDictionary *)dict) {
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

    // Ad impressions count
    if ([self isFieldValid:adImpressionsCount]) {
        int adImpressionsCountValue = [adImpressionsCount intValue];
        [adjustAdRevenue setAdImpressionsCount:adImpressionsCountValue];
    }

    // Ad revenue network
    if ([self isFieldValid:adRevenueNetwork]) {
        [adjustAdRevenue setAdRevenueNetwork:adRevenueNetwork];
    }

    // Ad revenue unit
    if ([self isFieldValid:adRevenueUnit]) {
        [adjustAdRevenue setAdRevenueUnit:adRevenueUnit];
    }

    // Ad revenue placement
    if ([self isFieldValid:adRevenuePlacement]) {
        [adjustAdRevenue setAdRevenuePlacement:adRevenuePlacement];
    }

    // Callback parameters
    if ([self isFieldValid:callbackParameters]) {
        for (NSString *key in callbackParameters) {
            NSString *value = [callbackParameters objectForKey:key];
            [adjustAdRevenue addCallbackParameter:key value:value];
        }
    }

    // Partner parameters
    if ([self isFieldValid:partnerParameters]) {
        for (NSString *key in partnerParameters) {
            NSString *value = [partnerParameters objectForKey:key];
            [adjustAdRevenue addPartnerParameter:key value:value];
        }
    }

    // Track ad revenue
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

    // Price
    NSDecimalNumber *priceValue;
    if ([self isFieldValid:price]) {
        priceValue = [NSDecimalNumber decimalNumberWithString:price];
    }

    // Receipt
    NSData *receiptValue;
    if ([self isFieldValid:receipt]) {
        receiptValue = [receipt dataUsingEncoding:NSUTF8StringEncoding];
    }

    ADJAppStoreSubscription *subscription = [[ADJAppStoreSubscription alloc]
                                             initWithPrice:priceValue
                                             currency:currency
                                             transactionId:transactionId
                                             andReceipt:receiptValue];

    // Transaction date
    if ([self isFieldValid:transactionDate]) {
        NSTimeInterval transactionDateInterval = [transactionDate doubleValue] / 1000.0;
        NSDate *oTransactionDate = [NSDate dateWithTimeIntervalSince1970:transactionDateInterval];
        [subscription setTransactionDate:oTransactionDate];
    }

    // Sales region
    if ([self isFieldValid:salesRegion]) {
        [subscription setSalesRegion:salesRegion];
    }

    // Callback parameters
    if ([self isFieldValid:callbackParameters]) {
        for (NSString *key in callbackParameters) {
            NSString *value = [callbackParameters objectForKey:key];
            [subscription addCallbackParameter:key value:value];
        }
    }

    // Partner parameters
    if ([self isFieldValid:partnerParameters]) {
        for (NSString *key in partnerParameters) {
            NSString *value = [partnerParameters objectForKey:key];
            [subscription addPartnerParameter:key value:value];
        }
    }

    // Track subscription
    [Adjust trackAppStoreSubscription:subscription];
}

RCT_EXPORT_METHOD(addGlobalCallbackParameter:(NSString *)value forKey:(NSString *)key) {
    if (!([self isFieldValid:key]) || !([self isFieldValid:value])) {
        return;
    }
    [Adjust addGlobalCallbackParameter:value forKey:key];
}

RCT_EXPORT_METHOD(removeGlobalCallbackParameter:(NSString *)key) {
    if (!([self isFieldValid:key])) {
        return;
    }
    [Adjust removeGlobalCallbackParameterForKey:key];
}

RCT_EXPORT_METHOD(removeGlobalCallbackParameters) {
    [Adjust removeGlobalCallbackParameters];
}

RCT_EXPORT_METHOD(addGlobalPartnerParameter:(NSString *)value forKey:(NSString *)key) {
    if (!([self isFieldValid:key]) || !([self isFieldValid:value])) {
        return;
    }
    [Adjust addGlobalPartnerParameter:value forKey:key];
}

RCT_EXPORT_METHOD(removeGlobalPartnerParameter:(NSString *)key) {
    if (!([self isFieldValid:key])) {
        return;
    }
    [Adjust removeGlobalPartnerParameterForKey:key];
}

RCT_EXPORT_METHOD(removeGlobalPartnerParameters) {
    [Adjust removeGlobalPartnerParameters];
}

RCT_EXPORT_METHOD(gdprForgetMe) {
    [Adjust gdprForgetMe];
}

RCT_EXPORT_METHOD(requestAppTrackingAuthorizationWithCompletionHandler:(RCTResponseSenderBlock)callback) {
    [Adjust requestAppTrackingAuthorizationWithCompletionHandler:^(NSUInteger status) {
        callback(@[@(status)]);
    }];
}

RCT_EXPORT_METHOD(updateSkanConversionValue:(NSNumber * _Nonnull)conversionValue
                  coarseValue:(NSString * _Nonnull)coarseValue
                  lockWindow:(NSNumber * _Nonnull)lockWindow
                  errorCallback:(RCTResponseSenderBlock)callback) {

    [Adjust updateSkanConversionValue:[conversionValue intValue]
                          coarseValue:coarseValue
                           lockWindow:lockWindow
                withCompletionHandler:^(NSError * _Nullable error) {
        callback(@[[error localizedDescription]]);
    }];
}

RCT_EXPORT_METHOD(getAppTrackingAuthorizationStatus:(RCTResponseSenderBlock)callback) {
    callback(@[@([Adjust appTrackingAuthorizationStatus])]);
}

RCT_EXPORT_METHOD(getIdfa:(RCTResponseSenderBlock)callback) {
    [Adjust idfaWithCompletionHandler:^(NSString * _Nullable idfa) {
        if (nil == idfa) {
            callback(@[@""]);
        } else {
            callback(@[idfa]);
        }
    }];
}

RCT_EXPORT_METHOD(getIdfv:(RCTResponseSenderBlock)callback) {
    [Adjust idfvWithCompletionHandler:^(NSString * _Nullable idfv) {
        if (nil == idfv) {
            callback(@[@""]);
        } else {
            callback(@[idfv]);
        }
    }];
}

RCT_EXPORT_METHOD(getGoogleAdId:(RCTResponseSenderBlock)callback) {
    callback(@[@""]);
}

RCT_EXPORT_METHOD(getAmazonAdId:(RCTResponseSenderBlock)callback) {
    callback(@[@""]);
}

RCT_EXPORT_METHOD(getAdid:(RCTResponseSenderBlock)callback) {
    [Adjust adidWithCompletionHandler:^(NSString * _Nullable adid) {
        if (nil == adid) {
            callback(@[@""]);
        } else {
            callback(@[adid]);
        }
    }];
}

RCT_EXPORT_METHOD(getSdkVersion:(NSString *)sdkPrefix callback:(RCTResponseSenderBlock)callback) {
    [Adjust sdkVersionWithCompletionHandler:^(NSString * _Nullable sdkVersion) {
        if (nil == sdkVersion) {
            callback(@[@""]);
        } else {
            callback(@[[NSString stringWithFormat:@"%@@%@", sdkPrefix, sdkVersion]]);
        }
    }];
}

RCT_EXPORT_METHOD(setReferrer:(NSString *)referrer) {}

RCT_EXPORT_METHOD(trackPlayStoreSubscription:(NSDictionary *)dict) {}

RCT_EXPORT_METHOD(verifyPlayStorePurchase:(NSDictionary *)dict callback:(RCTResponseSenderBlock)callback) {
    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
    callback(@[dictionary]);
}

RCT_EXPORT_METHOD(getAttribution:(RCTResponseSenderBlock)callback) {
    [Adjust attributionWithCompletionHandler:^(ADJAttribution * _Nullable attribution) {
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
        [self addValueOrEmpty:dictionary key:@"costType" value:attribution.costType];
        [self addValueOrEmpty:dictionary key:@"costAmount" value:attribution.costAmount];
        [self addValueOrEmpty:dictionary key:@"costCurrency" value:attribution.costCurrency];
        callback(@[dictionary]);
    }];
}

RCT_EXPORT_METHOD(convertUniversalLink:(NSString *)urlString withScheme:(NSString *)scheme callback:(RCTResponseSenderBlock)callback) {
    NSURL *url = [[NSURL alloc] initWithString:urlString];
    NSURL *converted = [Adjust convertUniversalLink:url withScheme:scheme];

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

    ADJThirdPartySharing *adjustThirdPartySharing = [[ADJThirdPartySharing alloc]
                                                     initWithIsEnabled:isEnabled];

    // Granular options
    if ([self isFieldValid:granularOptions]) {
        for (int i = 0; i < [granularOptions count]; i += 3) {
            NSString *partnerName = [granularOptions objectAtIndex:i];
            NSString *key = [granularOptions objectAtIndex:i+1];
            NSString *value = [granularOptions objectAtIndex:i+2];
            [adjustThirdPartySharing addGranularOption:partnerName key:key value:value];
        }
    }

    // Partner sharing settings
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

RCT_EXPORT_METHOD(getLastDeeplink:(RCTResponseSenderBlock)callback) {
    [Adjust lastDeeplinkWithCompletionHandler:^(NSURL * _Nullable lastDeeplink) {
        if (nil == lastDeeplink) {
            callback(@[@""]);
        } else {
            callback(@[[lastDeeplink absoluteString]]);
        }
    }];
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

    // Create purchase instance
    ADJAppStorePurchase *purchase = [[ADJAppStorePurchase alloc] initWithTransactionId:transactionId
                                                                             productId:productId
                                                                            andReceipt:receiptValue];

    // Verify purchase
    [Adjust verifyAppStorePurchase:purchase
             withCompletionHandler:^(ADJPurchaseVerificationResult * _Nonnull verificationResult) {
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

RCT_EXPORT_METHOD(processAndResolveDeeplink:(NSString *)urlStr callback:(RCTResponseSenderBlock)callback) {
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

    // Process deeplink
    [Adjust processAndResolveDeeplink:url withCompletionHandler:^(NSString * _Nonnull resolvedLink) {
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

RCT_EXPORT_METHOD(setSkadConversionValueUpdatedCallbackListener) {
    _isSkadConversionValueUpdatedCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setTestOptions:(NSDictionary *)dict) {

    NSString *urlOverwrite = [dict objectForKey:@"urlOverwrite"];
    NSString *extraPath = [dict objectForKey:@"extraPath"];
    NSNumber *timerIntervalInMilliseconds = [dict objectForKey:@"timerIntervalInMilliseconds"];
    NSNumber *timerStartInMilliseconds = [dict objectForKey:@"timerStartInMilliseconds"];
    NSNumber *sessionIntervalInMilliseconds = [dict objectForKey:@"sessionIntervalInMilliseconds"];
    NSNumber *subsessionIntervalInMilliseconds = [dict objectForKey:@"subsessionIntervalInMilliseconds"];
    NSNumber *deleteState = [dict objectForKey:@"deleteState"];
    NSNumber *noBackoffWait = [dict objectForKey:@"noBackoffWait"];
    NSNumber *adServicesFrameworkEnabled = [dict objectForKey:@"adServicesFrameworkEnabled"];
    NSNumber *attStatus = [dict objectForKey:@"attStatus"];
    NSString *idfa = [dict objectForKey:@"idfa"];

    NSMutableDictionary *testOptions = [NSMutableDictionary dictionary];

    if ([self isFieldValid:urlOverwrite]) {
        [testOptions setObject:urlOverwrite forKey:@"testUrlOverwrite"];
    }
    if ([self isFieldValid:extraPath]) {
        [testOptions setObject:extraPath forKey:@"extraPath"];
    }
    if ([self isFieldValid:timerIntervalInMilliseconds]) {
        [testOptions setObject:timerIntervalInMilliseconds forKey:@"timerIntervalInMilliseconds"];
    }
    if ([self isFieldValid:timerStartInMilliseconds]) {
        [testOptions setObject:timerStartInMilliseconds forKey:@"timerStartInMilliseconds"];
    }
    if ([self isFieldValid:sessionIntervalInMilliseconds]) {
        [testOptions setObject:sessionIntervalInMilliseconds forKey:@"sessionIntervalInMilliseconds"];
    }
    if ([self isFieldValid:subsessionIntervalInMilliseconds]) {
        [testOptions setObject:subsessionIntervalInMilliseconds forKey:@"subsessionIntervalInMilliseconds"];
    }
    if ([self isFieldValid:attStatus]) {
        [testOptions setObject:attStatus forKey:@"attStatusInt"];
    }
    if ([self isFieldValid:idfa]) {
        [testOptions setObject:idfa forKey:@"idfa"];
    }
    if ([self isFieldValid:deleteState]) {
        [testOptions setObject:deleteState forKey:@"deleteState"];
    }
    if ([self isFieldValid:noBackoffWait]) {
        [testOptions setObject:noBackoffWait forKey:@"noBackoffWait"];
    }
    if ([self isFieldValid:adServicesFrameworkEnabled]) {
        [testOptions setObject:adServicesFrameworkEnabled forKey:@"adServicesFrameworkEnabled"];
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
    _isSkadConversionValueUpdatedCallbackImplemented = NO;
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


