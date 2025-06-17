//
//  AdjustSdk.h
//  AdjustSdk
//
//  Created by Abdullah Obaied on 25th October 2016.
//  Copyright © 2016-Present Adjust GmbH. All rights reserved.
//


#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif

@interface AdjustSdk : NSObject <RCTBridgeModule>

@end
