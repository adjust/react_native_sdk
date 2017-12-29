//
//  AdjustEventEmitter.h
//  AdjustSdk
//
//  Created by Abdullah Obaied on 28.12.17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#ifndef AdjustEventEmitter_h
#define AdjustEventEmitter_h

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

#endif /* AdjustEventEmitter_h */
