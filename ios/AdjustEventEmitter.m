//
//  AdjustEventEmitter.m
//  AdjustSdk
//
//  Created by Abdullah Obaied on 28th December 2017.
//  Copyright © 2016-Present Adjust GmbH. All rights reserved.
//

#import "AdjustEventEmitter.h"

@implementation AdjustEventEmitter

RCT_EXPORT_MODULE();

+ (id)allocWithZone:(NSZone *)zone {
    static AdjustEventEmitter *sharedInstance = nil;
    static dispatch_once_t onceToken;

    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });

    return sharedInstance;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"adjust_attributionChanged",
             @"adjust_eventTrackingSucceeded",
             @"adjust_eventTrackingFailed",
             @"adjust_sessionTrackingSucceeded",
             @"adjust_sessionTrackingFailed",
             @"adjust_deferredDeeplinkReceived",
             @"adjust_skanUpdated"];
}

- (void)startObserving {
    NSNotificationCenter *center = [NSNotificationCenter defaultCenter];
    for (NSString *notificationName in [self supportedEvents]) {
        [center addObserver:self
                   selector:@selector(emitEventInternal:)
                       name:notificationName
                     object:nil];
    }
}

- (void)stopObserving {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)emitEventInternal:(NSNotification *)notification {
    [self sendEventWithName:notification.name
                       body:notification.userInfo];
}

+ (void)dispatchEvent:(NSString *)eventName withDictionary:(NSDictionary *)dictionary {
    [[NSNotificationCenter defaultCenter] postNotificationName:eventName
                                                        object:self
                                                      userInfo:dictionary];
}

@end
