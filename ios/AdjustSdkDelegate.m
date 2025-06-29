//
//  AdjustSdkDelegate.m
//  AdjustSdk
//
//  Created by Abdullah Obaied on 17th November 2016.
//  Copyright © 2016-Present Adjust GmbH. All rights reserved.
//

#import <objc/runtime.h>
#import "AdjustSdkDelegate.h"

#if __has_include(<React/RCTAssert.h>)
#import <React/RCTEventDispatcher.h>
#else // backwards compatibility for RN version < 0.40
#import "RCTEventDispatcher.h"
#endif

static dispatch_once_t onceToken;
static AdjustSdkDelegate *defaultInstance = nil;

@implementation AdjustSdkDelegate

#pragma mark - Object lifecycle methods

- (id)init {
    self = [super init];
    if (nil == self) {
        return nil;
    }
    return self;
}

#pragma mark - Public methods

+ (id)getInstanceWithSwizzleOfAttributionCallback:(BOOL)swizzleAttributionCallback
                           eventSucceededCallback:(BOOL)swizzleEventSucceededCallback
                              eventFailedCallback:(BOOL)swizzleEventFailedCallback
                         sessionSucceededCallback:(BOOL)swizzleSessionSucceededCallback
                            sessionFailedCallback:(BOOL)swizzleSessionFailedCallback
                         deferredDeeplinkCallback:(BOOL)swizzleDeferredDeeplinkCallback
                              skanUpdatedCallback:(BOOL)swizzleSkanUpdatedCallback
                     shouldLaunchDeferredDeeplink:(BOOL)shouldLaunchDeferredDeeplink {
    dispatch_once(&onceToken, ^{
        defaultInstance = [[AdjustSdkDelegate alloc] init];

        // do the swizzling where and if needed
        if (swizzleAttributionCallback) {
            [defaultInstance swizzleCallbackMethod:@selector(adjustAttributionChanged:)
                                  swizzledSelector:@selector(adjustAttributionChangedWannabe:)];
        }
        if (swizzleEventSucceededCallback) {
            [defaultInstance swizzleCallbackMethod:@selector(adjustEventTrackingSucceeded:)
                                  swizzledSelector:@selector(adjustEventTrackingSucceededWannabe:)];
        }
        if (swizzleEventFailedCallback) {
            [defaultInstance swizzleCallbackMethod:@selector(adjustEventTrackingFailed:)
                                  swizzledSelector:@selector(adjustEventTrackingFailedWannabe:)];
        }
        if (swizzleSessionSucceededCallback) {
            [defaultInstance swizzleCallbackMethod:@selector(adjustSessionTrackingSucceeded:)
                                  swizzledSelector:@selector(adjustSessionTrackingSucceededWannabe:)];
        }
        if (swizzleSessionFailedCallback) {
            [defaultInstance swizzleCallbackMethod:@selector(adjustSessionTrackingFailed:)
                                  swizzledSelector:@selector(adjustSessionTrackingFailedWananbe:)];
        }
        if (swizzleDeferredDeeplinkCallback) {
            [defaultInstance swizzleCallbackMethod:@selector(adjustDeferredDeeplinkReceived:)
                                  swizzledSelector:@selector(adjustDeferredDeeplinkReceivedWannabe:)];
        }
        if (swizzleSkanUpdatedCallback) {
            [defaultInstance swizzleCallbackMethod:@selector(adjustSkanUpdatedWithConversionData:)
                                  swizzledSelector:@selector(adjustSkanUpdatedWithConversionDataWannabe:)];
        }
        [defaultInstance setShouldLaunchDeferredDeeplink:shouldLaunchDeferredDeeplink];
    });

    return defaultInstance;
}

+ (void)teardown {
    defaultInstance = nil;
    onceToken = 0;
}

#pragma mark - Private & helper methods

- (void)adjustAttributionChangedWannabe:(ADJAttribution *)attribution {
    if (attribution == nil) {
        return;
    }

    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
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
    if (attribution.jsonResponse != nil) {
        NSData *dataJsonResponse = [NSJSONSerialization dataWithJSONObject:attribution.jsonResponse
                                                                   options:0 error:nil];
        NSString *stringJsonResponse = [[NSString alloc] initWithBytes:[dataJsonResponse bytes]
                                                                length:[dataJsonResponse length]
                                                              encoding:NSUTF8StringEncoding];
        [self addValueOrEmpty:dictionary key:@"jsonResponse" value:stringJsonResponse];
    }
    [AdjustEventEmitter dispatchEvent:@"adjust_attributionChanged" withDictionary:dictionary];
}

- (void)adjustEventTrackingSucceededWannabe:(ADJEventSuccess *)eventSuccessResponseData {
    if (nil == eventSuccessResponseData) {
        return;
    }

    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
    [self addValueOrEmpty:dictionary key:@"message" value:eventSuccessResponseData.message];
    [self addValueOrEmpty:dictionary key:@"timestamp" value:eventSuccessResponseData.timestamp];
    [self addValueOrEmpty:dictionary key:@"adid" value:eventSuccessResponseData.adid];
    [self addValueOrEmpty:dictionary key:@"eventToken" value:eventSuccessResponseData.eventToken];
    [self addValueOrEmpty:dictionary key:@"callbackId" value:eventSuccessResponseData.callbackId];
    if (eventSuccessResponseData.jsonResponse != nil) {
        NSData *dataJsonResponse = [NSJSONSerialization dataWithJSONObject:eventSuccessResponseData.jsonResponse options:0 error:nil];
        NSString *stringJsonResponse = [[NSString alloc] initWithBytes:[dataJsonResponse bytes]
                                                                length:[dataJsonResponse length]
                                                              encoding:NSUTF8StringEncoding];
        [self addValueOrEmpty:dictionary key:@"jsonResponse" value:stringJsonResponse];
    }
    [AdjustEventEmitter dispatchEvent:@"adjust_eventTrackingSucceeded" withDictionary:dictionary];
}

- (void)adjustEventTrackingFailedWannabe:(ADJEventFailure *)eventFailureResponseData {
    if (nil == eventFailureResponseData) {
        return;
    }

    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
    [self addValueOrEmpty:dictionary key:@"message" value:eventFailureResponseData.message];
    [self addValueOrEmpty:dictionary key:@"timestamp" value:eventFailureResponseData.timestamp];
    [self addValueOrEmpty:dictionary key:@"adid" value:eventFailureResponseData.adid];
    [self addValueOrEmpty:dictionary key:@"eventToken" value:eventFailureResponseData.eventToken];
    [self addValueOrEmpty:dictionary key:@"callbackId" value:eventFailureResponseData.callbackId];
    [dictionary setObject:(eventFailureResponseData.willRetry ? @"true" : @"false") forKey:@"willRetry"];
    if (eventFailureResponseData.jsonResponse != nil) {
        NSData *dataJsonResponse = [NSJSONSerialization dataWithJSONObject:eventFailureResponseData.jsonResponse options:0 error:nil];
        NSString *stringJsonResponse = [[NSString alloc] initWithBytes:[dataJsonResponse bytes]
                                                                length:[dataJsonResponse length]
                                                              encoding:NSUTF8StringEncoding];
        [self addValueOrEmpty:dictionary key:@"jsonResponse" value:stringJsonResponse];
    }
    [AdjustEventEmitter dispatchEvent:@"adjust_eventTrackingFailed" withDictionary:dictionary];
}


- (void)adjustSessionTrackingSucceededWannabe:(ADJSessionSuccess *)sessionSuccessResponseData {
    if (nil == sessionSuccessResponseData) {
        return;
    }

    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
    [self addValueOrEmpty:dictionary key:@"message" value:sessionSuccessResponseData.message];
    [self addValueOrEmpty:dictionary key:@"timestamp" value:sessionSuccessResponseData.timestamp];
    [self addValueOrEmpty:dictionary key:@"adid" value:sessionSuccessResponseData.adid];
    if (sessionSuccessResponseData.jsonResponse != nil) {
        NSData *dataJsonResponse = [NSJSONSerialization dataWithJSONObject:sessionSuccessResponseData.jsonResponse options:0 error:nil];
        NSString *stringJsonResponse = [[NSString alloc] initWithBytes:[dataJsonResponse bytes]
                                                                length:[dataJsonResponse length]
                                                              encoding:NSUTF8StringEncoding];
        [self addValueOrEmpty:dictionary key:@"jsonResponse" value:stringJsonResponse];
    }
    [AdjustEventEmitter dispatchEvent:@"adjust_sessionTrackingSucceeded" withDictionary:dictionary];
}

- (void)adjustSessionTrackingFailedWananbe:(ADJSessionFailure *)sessionFailureResponseData {
    if (nil == sessionFailureResponseData) {
        return;
    }

    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
    [self addValueOrEmpty:dictionary key:@"message" value:sessionFailureResponseData.message];
    [self addValueOrEmpty:dictionary key:@"timestamp" value:sessionFailureResponseData.timestamp];
    [self addValueOrEmpty:dictionary key:@"adid" value:sessionFailureResponseData.adid];
    [dictionary setObject:(sessionFailureResponseData.willRetry ? @"true" : @"false") forKey:@"willRetry"];
    if (sessionFailureResponseData.jsonResponse != nil) {
        NSData *dataJsonResponse = [NSJSONSerialization dataWithJSONObject:sessionFailureResponseData.jsonResponse options:0 error:nil];
        NSString *stringJsonResponse = [[NSString alloc] initWithBytes:[dataJsonResponse bytes]
                                                                length:[dataJsonResponse length]
                                                              encoding:NSUTF8StringEncoding];
        [self addValueOrEmpty:dictionary key:@"jsonResponse" value:stringJsonResponse];
    }
    [AdjustEventEmitter dispatchEvent:@"adjust_sessionTrackingFailed" withDictionary:dictionary];
}

- (BOOL)adjustDeferredDeeplinkReceivedWannabe:(NSURL *)deeplink {
    NSString *path = [deeplink absoluteString];
    [AdjustEventEmitter dispatchEvent:@"adjust_deferredDeeplinkReceived" withDictionary:@{@"deeplink": path}];
    return _shouldLaunchDeferredDeeplink;
}

- (void)adjustSkanUpdatedWithConversionDataWannabe:(nonnull NSDictionary<NSString *, NSString *> *)data {
    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
    [self addValueOrEmpty:dictionary key:@"conversionValue" value:data[@"conversion_value"]];
    [self addValueOrEmpty:dictionary key:@"coarseValue" value:data[@"coarse_value"]];
    [self addValueOrEmpty:dictionary key:@"lockWindow" value:data[@"lock_window"]];
    [self addValueOrEmpty:dictionary key:@"lastSkanUpdate" value:data[@"last_skan_update"]];
    [self addValueOrEmpty:dictionary key:@"error" value:data[@"error"]];
    [AdjustEventEmitter dispatchEvent:@"adjust_skanUpdated" withDictionary:dictionary];
}

- (void)swizzleCallbackMethod:(SEL)originalSelector
             swizzledSelector:(SEL)swizzledSelector {
    Class class = [self class];
    Method originalMethod = class_getInstanceMethod(class, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);
    BOOL didAddMethod = class_addMethod(class,
                                        originalSelector,
                                        method_getImplementation(swizzledMethod),
                                        method_getTypeEncoding(swizzledMethod));
    if (didAddMethod) {
        class_replaceMethod(class,
                            swizzledSelector,
                            method_getImplementation(originalMethod),
                            method_getTypeEncoding(originalMethod));
    } else {
        method_exchangeImplementations(originalMethod, swizzledMethod);
    }
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

@end
