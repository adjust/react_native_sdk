//
//  AdjustSdk.h
//  Adjust
//
//  Created by Abdullah Obaied on 2016-10-25.
//  Copyright (c) 2012-2014 adjust GmbH. All rights reserved.
//

#import "Adjust.h"
#if __has_include(<React/RCTAssert.h>)
#import <React/RCTBridgeModule.h>
#else // back compatibility for RN version < 0.40
#import "RCTBridgeModule.h"
#endif

@interface AdjustSdk : NSObject <RCTBridgeModule>

@end
