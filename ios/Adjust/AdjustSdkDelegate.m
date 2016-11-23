//
//  adjustSdkDelegate.m
//  Adjust
//
//  Created by Abdullah Obaied on 2016-11-18.
//  Copyright (c) 2012-2016 adjust GmbH. All rights reserved.
//

#import "RCTEventDispatcher.h"
#import <objc/runtime.h>
#import "adjustSdkDelegate.h"

@implementation AdjustSdkDelegate

+ (id)getInstanceWithSwizzleOfAttributionCallback:(BOOL)swizzleAttributionCallback
                           eventSucceededCallback:(BOOL)swizzleEventSucceededCallback
                              eventFailedCallback:(BOOL)swizzleEventFailedCallback
                         sessionSucceededCallback:(BOOL)swizzleSessionSucceededCallback
                            sessionFailedCallback:(BOOL)swizzleSessionFailedCallback
                         deferredDeeplinkCallback:(BOOL)swizzleDeferredDeeplinkCallback
                     shouldLaunchDeferredDeeplink:(BOOL)shouldLaunchDeferredDeeplink
                                       withBridge:(RCTBridge *)bridge;

{
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

- (void)adjustAttributionChangedWannabe:(ADJAttribution *)attr {
    if (attr == nil) {
        return;
    }

    NSDictionary *dict = [[NSDictionary alloc] initWithObjectsAndKeys:
        attr.trackerToken, @"trackerToken", 
        attr.trackerName, @"trackerName", 
        attr.network, @"network", 
        attr.campaign, @"campaign", 
        attr.adgroup, @"adgroup", 
        attr.creative, @"creative", 
        attr.clickLabel, @"clickLabel", 
        nil];

    [self.bridge.eventDispatcher sendAppEventWithName:@"adjust_attribution" body:dict];
}

- (void)adjustEventTrackingSucceededWannabe:(ADJEventSuccess *)event {
    if (nil == event) {
        return;
    }

    NSError * err;
    NSData * jsonData = [NSJSONSerialization dataWithJSONObject:event.jsonResponse options:0 error:&err]; 

    if (err != nil || jsonData == nil) {
        NSLog(@"Adjust: Failed to parse jsonResponse in EventTrackingSucceeded callback");
        return;
    }

    NSString * jsonResponseStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

    NSDictionary *dict = [[NSDictionary alloc] initWithObjectsAndKeys:
        event.message, @"message", 
        event.timeStamp, @"timeStamp", 
        event.adid, @"adid", 
        event.eventToken, @"eventToken", 
        jsonResponseStr, @"jsonResponse", 
        nil];

    [self.bridge.eventDispatcher sendAppEventWithName:@"adjust_eventTrackingSucceeded" body:dict];

}

- (void)adjustEventTrackingFailedWannabe:(ADJEventFailure *)event {
    if (nil == event) {
        return;
    }

    NSError * err;
    NSString * jsonResponseStr = @"";
    if (event.jsonResponse != nil) {
        NSData * jsonData = [NSJSONSerialization dataWithJSONObject:event.jsonResponse options:0 error:&err];

    if (err != nil || jsonData == nil) {
        NSLog(@"Adjust: Failed to parse jsonResponse in EventTrackingFailed callback");
        return;
    }

        jsonResponseStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    }

    NSNumber *willRetryNum = [NSNumber numberWithBool:event.willRetry];

    NSDictionary *dict = [[NSDictionary alloc] initWithObjectsAndKeys:
        event.message, @"message", 
        event.timeStamp, @"timeStamp", 
        event.adid, @"adid", 
        event.eventToken, @"eventToken", 
        jsonResponseStr, @"jsonResponse", 
        willRetryNum, @"willRetry", 
        nil];

    [self.bridge.eventDispatcher sendAppEventWithName:@"adjust_eventTrackingFailed" body:dict];
}

- (void)adjustSessionTrackingSucceededWannabe:(ADJSessionSuccess *)session {
    if (nil == session) {
        return;
    }

    NSError * err;
    NSData * jsonData = [NSJSONSerialization dataWithJSONObject:session.jsonResponse options:0 error:&err]; 

    if (err != nil || jsonData == nil) {
        NSLog(@"Adjust: Failed to parse jsonResponse in SessionTrackingSucceeded callback");
        return;
    }

    NSString * jsonResponseStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

    NSDictionary *dict = [[NSDictionary alloc] initWithObjectsAndKeys:
        session.message, @"message", 
        session.timeStamp, @"timeStamp", 
        session.adid, @"adid", 
        jsonResponseStr, @"jsonResponse", 
        nil];

    [self.bridge.eventDispatcher sendAppEventWithName:@"adjust_sessionTrackingSucceeded" body:dict];
}

- (void)adjustSessionTrackingFailedWananbe:(ADJSessionFailure *)session {
    if (nil == session) {
        return;
    }

    NSError * err;
    NSData * jsonData = [NSJSONSerialization dataWithJSONObject:session.jsonResponse options:0 error:&err]; 

    if (err != nil || jsonData == nil) {
        NSLog(@"Adjust: Failed to parse jsonResponse in SessionTrackingFailed callback");
        return;
    }

    NSString * jsonResponseStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

    NSNumber *willRetryNum = [NSNumber numberWithBool:session.willRetry];

    NSDictionary *dict = [[NSDictionary alloc] initWithObjectsAndKeys:
        session.message, @"message", 
        session.timeStamp, @"timeStamp", 
        session.adid, @"adid", 
        jsonResponseStr, @"jsonResponse", 
        willRetryNum, @"willRetry", 
        nil];

    [self.bridge.eventDispatcher sendAppEventWithName:@"adjust_sessionTrackingFailed" body:dict];
}

- (BOOL)adjustDeeplinkResponseWannabe:(NSURL *)deeplink {
    NSString *path = [deeplink absoluteString];

    [self.bridge.eventDispatcher sendAppEventWithName:@"adjust_deferredDeeplink"
                                                 body:@{@"uri": path}];
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
