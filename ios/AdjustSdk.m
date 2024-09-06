//
//  AdjustSdk.h
//  AdjustSdk
//
//  Created by Abdullah Obaied (@obaied) on 25th October 2016.
//  Copyright © 2016-Present Adjust GmbH. All rights reserved.
//

#import "AdjustSdk.h"
#import <AdjustSdk/AdjustSdk.h>
#import "AdjustSdkDelegate.h"

@implementation AdjustSdk

RCT_EXPORT_MODULE(Adjust);

BOOL _isAttributionCallbackImplemented;
BOOL _isEventTrackingSucceededCallbackImplemented;
BOOL _isEventTrackingFailedCallbackImplemented;
BOOL _isSessionTrackingSucceededCallbackImplemented;
BOOL _isSessionTrackingFailedCallbackImplemented;
BOOL _isDeferredDeeplinkCallbackImplemented;
BOOL _isSkanUpdatedCallbackImplemented;

#pragma mark - Public methods

RCT_EXPORT_METHOD(initSdk:(NSDictionary *)dict) {
    NSString *appToken = [dict objectForKey:@"appToken"];
    NSString *environment = [dict objectForKey:@"environment"];
    NSString *sdkPrefix = [dict objectForKey:@"sdkPrefix"];
    NSString *defaultTracker = [dict objectForKey:@"defaultTracker"];
    NSString *externalDeviceId = [dict objectForKey:@"externalDeviceId"];
    NSString *logLevel = [dict objectForKey:@"logLevel"];
    NSNumber *isSendingInBackgroundEnabled = [dict objectForKey:@"isSendingInBackgroundEnabled"];
    NSNumber *isLinkMeEnabled = [dict objectForKey:@"isLinkMeEnabled"];
    NSNumber *isCostDataInAttributionEnabled = [dict objectForKey:@"isCostDataInAttributionEnabled"];
    NSNumber *isAdServicesEnabled = [dict objectForKey:@"isAdServicesEnabled"];
    NSNumber *isIdfaReadingAllowed = [dict objectForKey:@"isIdfaReadingAllowed"];
    NSNumber *isIdfvReadingAllowed = [dict objectForKey:@"isIdfvReadingAllowed"];
    NSNumber *isSkanAttributionEnabled = [dict objectForKey:@"isSkanAttributionEnabled"];
    NSNumber *isDeferredDeeplinkOpeningEnabled = [dict objectForKey:@"isDeferredDeeplinkOpeningEnabled"];
    NSNumber *isDeviceIdsReadingOnceEnabled = [dict objectForKey:@"isDeviceIdsReadingOnceEnabled"];
    NSNumber *attConsentWaitingInterval = [dict objectForKey:@"attConsentWaitingInterval"];
    NSNumber *eventDeduplicationIdsMaxSize = [dict objectForKey:@"eventDeduplicationIdsMaxSize"];
    NSNumber *isCoppaComplianceEnabled = [dict objectForKey:@"isCoppaComplianceEnabled"];
    id urlStrategyDomains = [dict objectForKey:@"urlStrategyDomains"];
    NSNumber *useSubdomains = [dict objectForKey:@"useSubdomains"];
    NSNumber *isDataResidency = [dict objectForKey:@"isDataResidency"];
    BOOL isLogLevelSuppress = NO;

    // suppress log level
    if ([self isFieldValid:logLevel]) {
        if ([logLevel isEqualToString:@"SUPPRESS"]) {
            isLogLevelSuppress = YES;
        }
    }

    ADJConfig *adjustConfig = [[ADJConfig alloc] initWithAppToken:appToken
                                                      environment:environment
                                                      suppressLogLevel:isLogLevelSuppress];

    // log level
    if ([self isFieldValid:logLevel]) {
        [adjustConfig setLogLevel:[ADJLogger logLevelFromString:[logLevel lowercaseString]]];
    }

    // SDK prefix
    if ([self isFieldValid:sdkPrefix]) {
        [adjustConfig setSdkPrefix:sdkPrefix];
    }

    // default tracker
    if ([self isFieldValid:defaultTracker]) {
        [adjustConfig setDefaultTracker:defaultTracker];
    }

    // external device ID
    if ([self isFieldValid:externalDeviceId]) {
        [adjustConfig setExternalDeviceId:externalDeviceId];
    }

    // URL strategy
    NSMutableArray *urlStrategyDomainsArray;
    if ([self isFieldValid:urlStrategyDomains] && [urlStrategyDomains count] > 0) {
        urlStrategyDomainsArray = [[NSMutableArray alloc] initWithCapacity:[urlStrategyDomains count]];
        for (int i = 0; i < [urlStrategyDomains count]; i += 1) {
            NSString *domain = [[urlStrategyDomains objectAtIndex:i] description];
            [urlStrategyDomainsArray addObject:domain];
        }
        if ([self isFieldValid:useSubdomains] && [self isFieldValid:isDataResidency]) {
            [adjustConfig setUrlStrategy:(NSArray *)urlStrategyDomainsArray
                           useSubdomains:[useSubdomains boolValue]
                         isDataResidency:[isDataResidency boolValue]];
        }
    }

    // sending in background
    if ([self isFieldValid:isSendingInBackgroundEnabled]) {
        if ([isSendingInBackgroundEnabled boolValue] == YES) {
            [adjustConfig enableSendingInBackground];
        }
    }

    // cost data in attribution
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

    // IDFV reading
    if ([self isFieldValid:isIdfvReadingAllowed]) {
        if ([isIdfvReadingAllowed boolValue] == NO) {
            [adjustConfig disableIdfvReading];
        }
    }

    // SKAdNetwork handling
    if ([self isFieldValid:isSkanAttributionEnabled]) {
        if ([isSkanAttributionEnabled boolValue] == NO) {
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
    if ([self isFieldValid:attConsentWaitingInterval]) {
        [adjustConfig setAttConsentWaitingInterval:[attConsentWaitingInterval intValue]];
    }

    // read device info just once
    if ([self isFieldValid:isDeviceIdsReadingOnceEnabled]) {
        if ([isDeviceIdsReadingOnceEnabled boolValue] == YES) {
            [adjustConfig enableDeviceIdsReadingOnce];
        }
    }

    // max number of deduplication IDs
    if ([self isFieldValid:eventDeduplicationIdsMaxSize]) {
        [adjustConfig setEventDeduplicationIdsMaxSize:[eventDeduplicationIdsMaxSize integerValue]];
    }

    // COPPA compliance
    if ([self isFieldValid:isCoppaComplianceEnabled]) {
        if ([isCoppaComplianceEnabled boolValue] == YES) {
            [adjustConfig enableCoppaCompliance];
        }
    }

    // callbacks
    BOOL shouldLaunchDeferredDeeplink = [self isFieldValid:isDeferredDeeplinkOpeningEnabled] ? [isDeferredDeeplinkOpeningEnabled boolValue] : YES;
    if (_isAttributionCallbackImplemented
        || _isEventTrackingSucceededCallbackImplemented
        || _isEventTrackingFailedCallbackImplemented
        || _isSessionTrackingSucceededCallbackImplemented
        || _isSessionTrackingFailedCallbackImplemented
        || _isDeferredDeeplinkCallbackImplemented
        || _isSkanUpdatedCallbackImplemented) {
        [adjustConfig setDelegate:
         [AdjustSdkDelegate getInstanceWithSwizzleOfAttributionCallback:_isAttributionCallbackImplemented
                                                 eventSucceededCallback:_isEventTrackingSucceededCallbackImplemented
                                                    eventFailedCallback:_isEventTrackingFailedCallbackImplemented
                                               sessionSucceededCallback:_isSessionTrackingSucceededCallbackImplemented
                                                  sessionFailedCallback:_isSessionTrackingFailedCallbackImplemented
                                               deferredDeeplinkCallback:_isDeferredDeeplinkCallbackImplemented
                                      skanUpdatedCallback:_isSkanUpdatedCallbackImplemented
                                           shouldLaunchDeferredDeeplink:shouldLaunchDeferredDeeplink]];
    }

    // init SDK
    [Adjust initSdk:adjustConfig];
}

RCT_EXPORT_METHOD(trackEvent:(NSDictionary *)dict) {
    NSString *eventToken = dict[@"eventToken"];
    NSNumber *revenue = dict[@"revenue"];
    NSString *currency = dict[@"currency"];
    NSString *productId = dict[@"productId"];
    NSString *transactionId = dict[@"transactionId"];
    NSString *deduplicationId = dict[@"deduplicationId"];
    NSString *callbackId = dict[@"callbackId"];
    NSArray *callbackParameters = dict[@"callbackParameters"];
    NSArray *partnerParameters = dict[@"partnerParameters"];

    ADJEvent *adjustEvent = [[ADJEvent alloc] initWithEventToken:eventToken];

    // revenue and currency
    if ([self isFieldValid:revenue] && [self isFieldValid:currency]) {
        [adjustEvent setRevenue:[revenue doubleValue] currency:currency];
    }

    // callback parameters
    if ([self isFieldValid:callbackParameters]) {
        for (int i = 0; i < [callbackParameters count]; i += 2) {
            NSString *key = [callbackParameters objectAtIndex:i];
            NSString *value = [callbackParameters objectAtIndex:i+1];
            [adjustEvent addCallbackParameter:key value:value];
        }
    }

    // partner parameters
    if ([self isFieldValid:partnerParameters]) {
        for (int i = 0; i < [partnerParameters count]; i += 2) {
            NSString *key = [partnerParameters objectAtIndex:i];
            NSString *value = [partnerParameters objectAtIndex:i+1];
            [adjustEvent addPartnerParameter:key value:value];
        }
    }

    // transaction ID
    if ([self isFieldValid:transactionId]) {
        [adjustEvent setTransactionId:transactionId];
    }

    // callback ID
    if ([self isFieldValid:callbackId]) {
        [adjustEvent setCallbackId:callbackId];
    }

    // product ID
    if ([self isFieldValid:productId]) {
        [adjustEvent setProductId:productId];
    }

    // event deduplication
    if ([self isFieldValid:deduplicationId]) {
        [adjustEvent setDeduplicationId:deduplicationId];
    }

    // track event
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

RCT_EXPORT_METHOD(processDeeplink:(NSDictionary *)dict) {
    NSString *strUrl = dict[@"deeplink"];
    if (strUrl == nil) {
        return;
    }

    NSURL *url;
    if ([NSString instancesRespondToSelector:@selector(stringByAddingPercentEncodingWithAllowedCharacters:)]) {
        url = [NSURL URLWithString:[strUrl stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLFragmentAllowedCharacterSet]]];
    } else {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
        url = [NSURL URLWithString:[strUrl stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    }
#pragma clang diagnostic pop
    [Adjust processDeeplink:[[ADJDeeplink alloc] initWithDeeplink:url]];
}

RCT_EXPORT_METHOD(trackAdRevenue:(NSDictionary *)dict) {
    NSString *source = dict[@"source"];
    NSNumber *revenue = dict[@"revenue"];
    NSString *currency = dict[@"currency"];
    NSNumber *adImpressionsCount = dict[@"adImpressionsCount"];
    NSString *adRevenueNetwork = dict[@"adRevenueNetwork"];
    NSString *adRevenueUnit = dict[@"adRevenueUnit"];
    NSString *adRevenuePlacement = dict[@"adRevenuePlacement"];
    NSArray *callbackParameters = dict[@"callbackParameters"];
    NSArray *partnerParameters = dict[@"partnerParameters"];

    ADJAdRevenue *adjustAdRevenue = [[ADJAdRevenue alloc] initWithSource:source];

    // revenue and currency
    if ([self isFieldValid:revenue] && [self isFieldValid:currency]) {
        [adjustAdRevenue setRevenue:[revenue doubleValue] currency:currency];
    }

    // ad impressions count
    if ([self isFieldValid:adImpressionsCount]) {
        int adImpressionsCountValue = [adImpressionsCount intValue];
        [adjustAdRevenue setAdImpressionsCount:adImpressionsCountValue];
    }

    // ad revenue network
    if ([self isFieldValid:adRevenueNetwork]) {
        [adjustAdRevenue setAdRevenueNetwork:adRevenueNetwork];
    }

    // ad revenue unit
    if ([self isFieldValid:adRevenueUnit]) {
        [adjustAdRevenue setAdRevenueUnit:adRevenueUnit];
    }

    // ad revenue placement
    if ([self isFieldValid:adRevenuePlacement]) {
        [adjustAdRevenue setAdRevenuePlacement:adRevenuePlacement];
    }

    // callback parameters
    if ([self isFieldValid:callbackParameters]) {
        for (int i = 0; i < [callbackParameters count]; i += 2) {
            NSString *key = [callbackParameters objectAtIndex:i];
            NSString *value = [callbackParameters objectAtIndex:i+1];
            [adjustAdRevenue addCallbackParameter:key value:value];
        }
    }

    // partner parameters
    if ([self isFieldValid:partnerParameters]) {
        for (int i = 0; i < [partnerParameters count]; i += 2) {
            NSString *key = [partnerParameters objectAtIndex:i];
            NSString *value = [partnerParameters objectAtIndex:i+1];
            [adjustAdRevenue addPartnerParameter:key value:value];
        }
    }

    // track ad revenue
    [Adjust trackAdRevenue:adjustAdRevenue];
}

RCT_EXPORT_METHOD(trackAppStoreSubscription:(NSDictionary *)dict) {
    NSString *price = dict[@"price"];
    NSString *currency = dict[@"currency"];
    NSString *transactionId = dict[@"transactionId"];
    NSString *transactionDate = dict[@"transactionDate"];
    NSString *salesRegion = dict[@"salesRegion"];
    NSArray *callbackParameters = dict[@"callbackParameters"];
    NSArray *partnerParameters = dict[@"partnerParameters"];

    // price
    NSDecimalNumber *priceValue;
    if ([self isFieldValid:price]) {
        priceValue = [NSDecimalNumber decimalNumberWithString:price];
    }

    ADJAppStoreSubscription *subscription = [[ADJAppStoreSubscription alloc]
                                             initWithPrice:priceValue
                                             currency:currency
                                             transactionId:transactionId];

    // transaction date
    if ([self isFieldValid:transactionDate]) {
        NSTimeInterval transactionDateInterval = [transactionDate doubleValue] / 1000.0;
        NSDate *oTransactionDate = [NSDate dateWithTimeIntervalSince1970:transactionDateInterval];
        [subscription setTransactionDate:oTransactionDate];
    }

    // sales region
    if ([self isFieldValid:salesRegion]) {
        [subscription setSalesRegion:salesRegion];
    }

    // callback parameters
    if ([self isFieldValid:callbackParameters]) {
        for (int i = 0; i < [callbackParameters count]; i += 2) {
            NSString *key = [callbackParameters objectAtIndex:i];
            NSString *value = [callbackParameters objectAtIndex:i+1];
            [subscription addCallbackParameter:key value:value];
        }
    }

    // partner parameters
    if ([self isFieldValid:partnerParameters]) {
        for (int i = 0; i < [partnerParameters count]; i += 2) {
            NSString *key = [partnerParameters objectAtIndex:i];
            NSString *value = [partnerParameters objectAtIndex:i+1];
            [subscription addPartnerParameter:key value:value];
        }
    }

    // track subscription
    [Adjust trackAppStoreSubscription:subscription];
}

RCT_EXPORT_METHOD(addGlobalCallbackParameter:(NSString *)key value:(NSString *)value) {
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

RCT_EXPORT_METHOD(addGlobalPartnerParameter:(NSString *)key value:(NSString *)value) {
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

RCT_EXPORT_METHOD(requestAppTrackingAuthorization:(RCTResponseSenderBlock)callback) {
    [Adjust requestAppTrackingAuthorizationWithCompletionHandler:^(NSUInteger status) {
        callback(@[@(status)]);
    }];
}

RCT_EXPORT_METHOD(updateSkanConversionValue:(NSNumber * _Nonnull)conversionValue
                  coarseValue:(NSString * _Nonnull)coarseValue
                  lockWindow:(NSNumber * _Nonnull)lockWindow
                  errorCallback:(RCTResponseSenderBlock)callback) {
    if ([self isFieldValid:conversionValue]) {
        [Adjust updateSkanConversionValue:[conversionValue intValue]
                              coarseValue:coarseValue
                               lockWindow:lockWindow
                    withCompletionHandler:^(NSError * _Nullable error) {
            if (nil == error) {
                callback(@[@""]);
            } else {
                callback(@[[error localizedDescription]]);
            }
        }];
    } else {
        callback(@[@"Invalid conversion value passed."]);
    }
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

RCT_EXPORT_METHOD(trackThirdPartySharing:(NSDictionary *)dict) {
    NSNumber *isEnabled = dict[@"isEnabled"];
    NSArray *granularOptions = dict[@"granularOptions"];
    NSArray *partnerSharingSettings = dict[@"partnerSharingSettings"];

    // is third party sharing enabled
    if (isEnabled != nil && [isEnabled isKindOfClass:[NSNull class]]) {
        isEnabled = nil;
    }

    ADJThirdPartySharing *adjustThirdPartySharing = [[ADJThirdPartySharing alloc]
                                                     initWithIsEnabled:isEnabled];

    // granular options
    if ([self isFieldValid:granularOptions]) {
        for (int i = 0; i < [granularOptions count]; i += 3) {
            NSString *partnerName = [granularOptions objectAtIndex:i];
            NSString *key = [granularOptions objectAtIndex:i+1];
            NSString *value = [granularOptions objectAtIndex:i+2];
            [adjustThirdPartySharing addGranularOption:partnerName key:key value:value];
        }
    }

    // partner sharing settings
    if ([self isFieldValid:partnerSharingSettings]) {
        for (int i = 0; i < [partnerSharingSettings count]; i += 3) {
            NSString *partnerName = [partnerSharingSettings objectAtIndex:i];
            NSString *key = [partnerSharingSettings objectAtIndex:i+1];
            NSString *value = [partnerSharingSettings objectAtIndex:i+2];
            [adjustThirdPartySharing addPartnerSharingSetting:partnerName key:key value:[value boolValue]];
        }
    }

    // track third party sharing.
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
    NSString *productId = dict[@"productId"];
    NSString *transactionId = dict[@"transactionId"];

    ADJAppStorePurchase *purchase = [[ADJAppStorePurchase alloc] initWithTransactionId:transactionId
                                                                             productId:productId];

    // verify purchase
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

RCT_EXPORT_METHOD(verifyAndTrackAppStorePurchase:(NSDictionary *)dict callback:(RCTResponseSenderBlock)callback) {
    NSString *eventToken = dict[@"eventToken"];
    NSNumber *revenue = dict[@"revenue"];
    NSString *currency = dict[@"currency"];
    NSString *productId = dict[@"productId"];
    NSString *transactionId = dict[@"transactionId"];
    NSString *deduplicationId = dict[@"deduplicationId"];
    NSString *callbackId = dict[@"callbackId"];
    NSArray *callbackParameters = dict[@"callbackParameters"];
    NSArray *partnerParameters = dict[@"partnerParameters"];

    ADJEvent *adjustEvent = [[ADJEvent alloc] initWithEventToken:eventToken];

    // revenue and currency
    if ([self isFieldValid:revenue] && [self isFieldValid:currency]) {
        [adjustEvent setRevenue:[revenue doubleValue] currency:currency];
    }

    // callback parameters
    if ([self isFieldValid:callbackParameters]) {
        for (int i = 0; i < [callbackParameters count]; i += 2) {
            NSString *key = [callbackParameters objectAtIndex:i];
            NSString *value = [callbackParameters objectAtIndex:i+1];
            [adjustEvent addCallbackParameter:key value:value];
        }
    }

    // partner parameters
    if ([self isFieldValid:partnerParameters]) {
        for (int i = 0; i < [partnerParameters count]; i += 2) {
            NSString *key = [partnerParameters objectAtIndex:i];
            NSString *value = [partnerParameters objectAtIndex:i+1];
            [adjustEvent addPartnerParameter:key value:value];
        }
    }

    // transaction ID
    if ([self isFieldValid:transactionId]) {
        [adjustEvent setTransactionId:transactionId];
    }

    // callback ID
    if ([self isFieldValid:callbackId]) {
        [adjustEvent setCallbackId:callbackId];
    }

    // product ID
    if ([self isFieldValid:productId]) {
        [adjustEvent setProductId:productId];
    }

    // event deduplication
    if ([self isFieldValid:deduplicationId]) {
        [adjustEvent setDeduplicationId:deduplicationId];
    }

    // verify and track
    [Adjust verifyAndTrackAppStorePurchase:adjustEvent
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

RCT_EXPORT_METHOD(processAndResolveDeeplink:(NSDictionary *)dict callback:(RCTResponseSenderBlock)callback) {
    NSString *strUrl = dict[@"deeplink"];
    if (strUrl == nil) {
        return;
    }

    NSURL *url;
    if ([NSString instancesRespondToSelector:@selector(stringByAddingPercentEncodingWithAllowedCharacters:)]) {
        url = [NSURL URLWithString:[strUrl stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLFragmentAllowedCharacterSet]]];
    } else {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
        url = [NSURL URLWithString:[strUrl stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    }
#pragma clang diagnostic pop

    // process deeplink
    [Adjust processAndResolveDeeplink:[[ADJDeeplink alloc] initWithDeeplink:url] withCompletionHandler:^(NSString * _Nonnull resolvedLink) {
        if (resolvedLink == nil) {
            callback(@[@""]);
        } else {
            callback(@[resolvedLink]);
        }
    }];
}

RCT_EXPORT_METHOD(setAttributionCallbackImplemented) {
    _isAttributionCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setEventTrackingSucceededCallbackImplemented) {
    _isEventTrackingSucceededCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setEventTrackingFailedCallbackImplemented) {
    _isEventTrackingFailedCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setSessionTrackingSucceededCallbackImplemented) {
    _isSessionTrackingSucceededCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setSessionTrackingFailedCallbackImplemented) {
    _isSessionTrackingFailedCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setDeferredDeeplinkCallbackImplemented) {
    _isDeferredDeeplinkCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setSkanUpdatedCallbackImplemented) {
    _isSkanUpdatedCallbackImplemented = YES;
}

RCT_EXPORT_METHOD(setTestOptions:(NSDictionary *)dict) {
    NSString *urlOverwrite = [dict objectForKey:@"testUrlOverwrite"];
    NSString *extraPath = [dict objectForKey:@"extraPath"];
    NSNumber *teardown = [dict objectForKey:@"teardown"];
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
    if ([self isFieldValid:teardown]) {
        [testOptions setObject:teardown forKey:@"teardown"];
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
    _isSkanUpdatedCallbackImplemented = NO;
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

    // check if its an instance of the singleton NSNull
    if ([field isKindOfClass:[NSNull class]]) {
        return NO;
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


