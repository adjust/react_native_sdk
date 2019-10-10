//
//  ASTEventEmitter.m
//  Adjust SDK Test
//
//  Created by Abdullah Obaied (@obaied) on 28th December 2017.
//  Copyright © 2017-2018 Adjust GmbH. All rights reserved.
//

#import "ASTEventEmitter.h"

@implementation ASTEventEmitter

RCT_EXPORT_MODULE();

+ (id)allocWithZone:(NSZone *)zone {
    static ASTEventEmitter *sharedInstance = nil;
    static dispatch_once_t onceToken;

    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });

    return sharedInstance;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"command"];
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
