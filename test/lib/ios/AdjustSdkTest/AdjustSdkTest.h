//
//  AdjustSdkTest.h
//  AdjustSdkTest
//
//  Created by Uglješa Erceg (@uerceg) on 11th June 2018.
//  Copyright © 2018 Adjust GmbH. All rights reserved.
//

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif

@interface AdjustSdkTest : NSObject <RCTBridgeModule>

@end
