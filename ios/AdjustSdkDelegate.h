//
//  AdjustSdkDelegate.h
//  Adjust
//
//  Created by Abdullah on 2016-11-17
//  Copyright (c) 2012-2016 adjust GmbH. All rights reserved.
//

#if __has_include("RCTBridge.h")
#import "RCTBridge.h"
#else
#import <React/RCTBridge.h>
#endif
#import "AdjustSdk.h"

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
