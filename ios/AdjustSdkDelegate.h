//
//  AdjustSdkDelegate.h
//  Adjust
//
//  Created by Abdullah on 2016-11-17
//  Copyright (c) 2012-2016 adjust GmbH. All rights reserved.
//

#import "AdjustSdk.h"
#if __has_include(<React/RCTAssert.h>)
#import <React/RCTBridge.h>
#else // back compatibility for RN version < 0.40
#import "RCTBridge.h"
#endif

@interface AdjustSdkDelegate : NSObject<AdjustDelegate>

@property (nonatomic) BOOL shouldLaunchDeferredDeeplink;
@property (nonatomic) RCTBridge *bridge;

+ (id)getInstanceWithSwizzleOfAttributionCallback:(BOOL)swizzleAttributionCallback
						   eventSucceededCallback:(BOOL)swizzleEventSucceededCallback
							  eventFailedCallback:(BOOL)swizzleEventFailedCallback
						 sessionSucceededCallback:(BOOL)swizzleSessionSucceededCallback
						    sessionFailedCallback:(BOOL)swizzleSessionFailedCallback
					     deferredDeeplinkCallback:(BOOL)swizzleDeferredDeeplinkCallback
                     shouldLaunchDeferredDeeplink:(BOOL)shouldLaunchDeferredDeeplink
                                       withBridge:(RCTBridge *)bridge;

@end
