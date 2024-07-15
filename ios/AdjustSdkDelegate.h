//
//  AdjustSdkDelegate.h
//  AdjustSdk
//
//  Created by Aditi Agrawal on 15/07/24.
//  Copyright © 2016-Present Adjust GmbH. All rights reserved.
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
			  skadConversionValueUpdatedCallback:(BOOL)swizzleSkad4ConversionValueUpdatedCallback
                     shouldLaunchDeferredDeeplink:(BOOL)shouldLaunchDeferredDeeplink;

+ (void)teardown;

@end
