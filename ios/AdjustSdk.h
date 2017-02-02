//
//  AdjustSdk.h
//  Adjust
//
//  Created by Abdullah Obaied on 2016-10-25.
//  Copyright (c) 2012-2014 adjust GmbH. All rights reserved.
//

#import "Adjust.h"
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface AdjustSdk : NSObject <RCTBridgeModule>

@end
