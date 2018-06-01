//
//  AdjustSdk.h
//  Adjust SDK
//
//  Created by Abdullah Obaied (@obaied) on 25th October 2016.
//  Copyright © 2012-2018 Adjust GmbH. All rights reserved.
//

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif

@interface AdjustTesting : NSObject <RCTBridgeModule>

@end
