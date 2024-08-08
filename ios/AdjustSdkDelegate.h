//
//  AdjustSdkDelegate.h
//  AdjustSdk
//
//  Created by Abdullah Obaied (@obaied) on 17th November 2016.
//  Copyright © 2016-Present Adjust GmbH. All rights reserved.
//

#import <AdjustSdk/Adjust.h>
#import "AdjustEventEmitter.h"

@interface AdjustSdkDelegate : NSObject

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
