//
//  AdjustEventEmitter.h
//  AdjustSdk
//
//  Created by Aditi Agrawal on 15/07/24.
//  Copyright © 2016-Present Adjust GmbH. All rights reserved.
//

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#else
#import "RCTBridgeModule.h"
#import <RCTEventEmitter.h>
#endif

@interface AdjustEventEmitter : RCTEventEmitter <RCTBridgeModule>

+ (void)dispatchEvent:(NSString *)eventName withDictionary:(NSDictionary *)dictionary;

@end
