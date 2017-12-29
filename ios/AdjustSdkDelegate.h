//
//  AdjustSdkDelegate.h
//  Adjust
//
//  Created by Abdullah on 2016-11-17
//  Copyright (c) 2012-2016 adjust GmbH. All rights reserved.
//

#import "AdjustSdk.h"
#import "AdjustEventEmitter.h"

@interface AdjustSdkDelegate : NSObject<AdjustDelegate>

@property (nonatomic) BOOL shouldLaunchDeferredDeeplink;

+ (id)getInstanceWithSwizzleOfAttributionCallback:(BOOL)swizzleAttributionCallback
						   eventSucceededCallback:(BOOL)swizzleEventSucceededCallback
							  eventFailedCallback:(BOOL)swizzleEventFailedCallback
						 sessionSucceededCallback:(BOOL)swizzleSessionSucceededCallback
						    sessionFailedCallback:(BOOL)swizzleSessionFailedCallback
					     deferredDeeplinkCallback:(BOOL)swizzleDeferredDeeplinkCallback
                     shouldLaunchDeferredDeeplink:(BOOL)shouldLaunchDeferredDeeplink;

@end
