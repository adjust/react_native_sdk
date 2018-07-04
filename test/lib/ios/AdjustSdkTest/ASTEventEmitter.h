//
//  ASTEventEmitter.h
//  AdjustSdkTest
//
//  Created by Abdullah Obaied (@obaied) on 28th December 2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#ifndef ASTEventEmitter_h
#define ASTEventEmitter_h

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#else
#import "RCTBridgeModule.h"
#import <RCTEventEmitter.h>
#endif

@interface ASTEventEmitter : RCTEventEmitter <RCTBridgeModule>

+ (void)dispatchEvent:(NSString *)eventName withDictionary:(NSDictionary *)dictionary;

@end

#endif /* ASTEventEmitter_h */
