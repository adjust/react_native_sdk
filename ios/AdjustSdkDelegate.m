//
//  AdjustSdkDelegate.m
//  Adjust
//
//  Created by Abdullah Obaied on 2016-11-18.
//  Copyright (c) 2012-2016 adjust GmbH. All rights reserved.
//

#import <objc/runtime.h>

#import "AdjustSdkDelegate.h"
#if __has_include(<React/RCTAssert.h>)
#import <React/RCTEventDispatcher.h>
#else // back compatibility for RN version < 0.40
#import "RCTEventDispatcher.h"
#endif

@implementation AdjustSdkDelegate

+ (id)getInstanceWithSwizzleOfAttributionCallback:(BOOL)swizzleAttributionCallback
                           eventSucceededCallback:(BOOL)swizzleEventSucceededCallback
                              eventFailedCallback:(BOOL)swizzleEventFailedCallback
                         sessionSucceededCallback:(BOOL)swizzleSessionSucceededCallback
                            sessionFailedCallback:(BOOL)swizzleSessionFailedCallback
                         deferredDeeplinkCallback:(BOOL)swizzleDeferredDeeplinkCallback
                     shouldLaunchDeferredDeeplink:(BOOL)shouldLaunchDeferredDeeplink
                                       withBridge:(RCTBridge *)bridge {
    static dispatch_once_t onceToken;
    static AdjustSdkDelegate *defaultInstance = nil;
    
    dispatch_once(&onceToken, ^{
        defaultInstance = [[AdjustSdkDelegate alloc] init];
        
        // Do the swizzling where and if needed.
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
            [defaultInstance swizzleCallbackMethod:@selector(adjustDeeplinkResponse:)
                                  swizzledSelector:@selector(adjustDeeplinkResponseWannabe:)];
        }
        
        [defaultInstance setShouldLaunchDeferredDeeplink:shouldLaunchDeferredDeeplink];
        [defaultInstance setBridge:bridge];
    });
    
    return defaultInstance;
}

- (id)init {
    self = [super init];
    
    if (nil == self) {
        return nil;
    }
    
    return self;
}

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
    [self addValueOrEmpty:dictionary key:@"adid" value:attribution.adid];

    [self.bridge.eventDispatcher sendAppEventWithName:@"adjust_attribution" body:dictionary];
}

- (void)adjustEventTrackingSucceededWannabe:(ADJEventSuccess *)eventSuccessResponseData {
    if (nil == eventSuccessResponseData) {
        return;
    }

    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];

    [self addValueOrEmpty:dictionary key:@"message" value:eventSuccessResponseData.message];
    [self addValueOrEmpty:dictionary key:@"timestamp" value:eventSuccessResponseData.timeStamp];
    [self addValueOrEmpty:dictionary key:@"adid" value:eventSuccessResponseData.adid];
    [self addValueOrEmpty:dictionary key:@"eventToken" value:eventSuccessResponseData.eventToken];
    [self addValueOrEmpty:dictionary key:@"jsonResponse" value:eventSuccessResponseData.jsonResponse];

    [self.bridge.eventDispatcher sendAppEventWithName:@"adjust_eventTrackingSucceeded" body:dictionary];
}

- (void)adjustEventTrackingFailedWannabe:(ADJEventFailure *)eventFailureResponseData {
    if (nil == eventFailureResponseData) {
        return;
    }

    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];

    [self addValueOrEmpty:dictionary key:@"message" value:eventFailureResponseData.message];
    [self addValueOrEmpty:dictionary key:@"timestamp" value:eventFailureResponseData.timeStamp];
    [self addValueOrEmpty:dictionary key:@"adid" value:eventFailureResponseData.adid];
    [self addValueOrEmpty:dictionary key:@"eventToken" value:eventFailureResponseData.eventToken];
    [dictionary setObject:(eventFailureResponseData.willRetry ? @"true" : @"false") forKey:@"willRetry"];
    [self addValueOrEmpty:dictionary key:@"jsonResponse" value:eventFailureResponseData.jsonResponse];

    [self.bridge.eventDispatcher sendAppEventWithName:@"adjust_eventTrackingFailed" body:dictionary];
}


- (void)adjustSessionTrackingSucceededWannabe:(ADJSessionSuccess *)sessionSuccessResponseData {
    if (nil == sessionSuccessResponseData) {
        return;
    }

    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];

    [self addValueOrEmpty:dictionary key:@"message" value:sessionSuccessResponseData.message];
    [self addValueOrEmpty:dictionary key:@"timestamp" value:sessionSuccessResponseData.timeStamp];
    [self addValueOrEmpty:dictionary key:@"adid" value:sessionSuccessResponseData.adid];
    [self addValueOrEmpty:dictionary key:@"jsonResponse" value:sessionSuccessResponseData.jsonResponse];

    [self.bridge.eventDispatcher sendAppEventWithName:@"adjust_sessionTrackingSucceeded" body:dictionary];
}

- (void)adjustSessionTrackingFailedWananbe:(ADJSessionFailure *)sessionFailureResponseData {
    if (nil == sessionFailureResponseData) {
        return;
    }

    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];

    [self addValueOrEmpty:dictionary key:@"message" value:sessionFailureResponseData.message];
    [self addValueOrEmpty:dictionary key:@"timestamp" value:sessionFailureResponseData.timeStamp];
    [self addValueOrEmpty:dictionary key:@"adid" value:sessionFailureResponseData.adid];
    [dictionary setObject:(sessionFailureResponseData.willRetry ? @"true" : @"false") forKey:@"willRetry"];
    [self addValueOrEmpty:dictionary key:@"jsonResponse" value:sessionFailureResponseData.jsonResponse];

    [self.bridge.eventDispatcher sendAppEventWithName:@"adjust_sessionTrackingFailed" body:dictionary];
}

- (BOOL)adjustDeeplinkResponseWannabe:(NSURL *)deeplink {
    NSString *path = [deeplink absoluteString];
    
    [self.bridge.eventDispatcher sendAppEventWithName:@"adjust_deferredDeeplink" body:@{@"uri": path}];

    return _shouldLaunchDeferredDeeplink;
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
