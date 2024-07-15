//
//  AdjustSdk.h
//  AdjustSdk
//
//  Created by Aditi Agrawal on 15/07/24.
//  Copyright © 2016-Present Adjust GmbH. All rights reserved.
//

#import "Adjust.h"

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif

@interface AdjustSdk : NSObject <RCTBridgeModule>

@end
