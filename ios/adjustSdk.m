//
//  adjustSdk.m
//  Adjust
//
//  Created by Abdullah Obaied on 2016-10-25.
//  Copyright (c) 2012-2014 adjust GmbH. All rights reserved.
//
#import "adjustSdk.h"
#import "AdjustSdkDelegate.h"

@implementation adjustSdk

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(Adjust);

BOOL _shouldLaunchDeeplink = YES;
BOOL _isAttributionCallbackImplemented;
BOOL _isEventTrackingSucceededCallbackImplemented;
BOOL _isEventTrackingFailedCallbackImplemented;
BOOL _isSessionTrackingSucceededCallbackImplemented;
BOOL _isSessionTrackingFailedCallbackImplemented;
BOOL _isDeferredDeeplinkCallbackImplemented;

- (BOOL)isFieldValid:(NSObject *)field {
    if (![field isKindOfClass:[NSNull class]]) {
        if (field != nil) {
            return YES;
        }
    }
    
    return NO;
}

RCT_EXPORT_METHOD(create:(NSDictionary *)dict) {
    NSString *appToken = dict[@"appToken"];
    NSString *environment = dict[@"environment"];
    NSString *logLevel = dict[@"logLevel"];
    NSString *sdkPrefix = dict[@"sdkPrefix"];
    NSString *defaultTracker = dict[@"defaultTracker"];
    NSNumber *eventBufferingEnabled = dict[@"eventBufferingEnabled"];
    NSNumber *sendInBackground = dict[@"sendInBackground"];
    NSNumber *shouldLaunchDeeplink = dict[@"shouldLaunchDeeplink"];
    NSString *userAgent = dict[@"userAgent"];
    NSNumber *delayStart = dict[@"delayStart"];
    
    BOOL allowSuppressLogLevel = false;
    
    // Log level
    if ([self isFieldValid:logLevel]) {
        if ([ADJLogger LogLevelFromString:[logLevel lowercaseString]] == ADJLogLevelSuppress) {
            allowSuppressLogLevel = true;
        }
    }
    
    ADJConfig *adjustConfig = [ADJConfig configWithAppToken:appToken environment:environment allowSuppressLogLevel:allowSuppressLogLevel];
    
    if ([adjustConfig isValid]) {
        // Log level
        if ([self isFieldValid:logLevel]) {
            [adjustConfig setLogLevel:[ADJLogger LogLevelFromString:[logLevel lowercaseString]]];
        }
        
        // Event buffering
        if ([self isFieldValid:eventBufferingEnabled]) {
            [adjustConfig setEventBufferingEnabled:[eventBufferingEnabled boolValue]];
        }
        
        // SDK prefix
        if ([self isFieldValid:sdkPrefix]) {
            [adjustConfig setSdkPrefix:sdkPrefix];
        }
        
        // Default tracker
        if ([self isFieldValid:defaultTracker]) {
            [adjustConfig setDefaultTracker:defaultTracker];
        }
        
        // Attribution delegate & other delegates
        if (_isAttributionCallbackImplemented ||
            _isEventTrackingSucceededCallbackImplemented ||
            _isEventTrackingFailedCallbackImplemented ||
            _isSessionTrackingSucceededCallbackImplemented ||
            _isSessionTrackingFailedCallbackImplemented ||
            _isDeferredDeeplinkCallbackImplemented) {
            [adjustConfig setDelegate:
             [AdjustSdkDelegate getInstanceWithSwizzleOfAttributionCallback:_isAttributionCallbackImplemented
                                                     eventSucceededCallback:_isEventTrackingSucceededCallbackImplemented
                                                        eventFailedCallback:_isEventTrackingFailedCallbackImplemented
                                                   sessionSucceededCallback:_isSessionTrackingSucceededCallbackImplemented
                                                      sessionFailedCallback:_isSessionTrackingFailedCallbackImplemented
                                                   deferredDeeplinkCallback:_isDeferredDeeplinkCallbackImplemented
                                               shouldLaunchDeferredDeeplink:_shouldLaunchDeeplink
                                                                 withBridge:_bridge]];
        }
        
        // Send in background
        if ([self isFieldValid:sendInBackground]) {
            [adjustConfig setSendInBackground:[sendInBackground boolValue]];
        }
        
        // Should launch deeplink
        if ([self isFieldValid:shouldLaunchDeeplink]) {
            _shouldLaunchDeeplink = [shouldLaunchDeeplink boolValue];
        }
        
        // User agent
        if ([self isFieldValid:userAgent]) {
            [adjustConfig setUserAgent:userAgent];
        }
        
        // Delay start
        if ([self isFieldValid:delayStart]) {
            [adjustConfig setDelayStart:[delayStart doubleValue]];
        }
        
        [Adjust appDidLaunch:adjustConfig];
        [Adjust trackSubsessionStart];
    }
}

RCT_EXPORT_METHOD(trackEvent:(NSDictionary *)dict) {
    NSString *eventToken = dict[@"eventToken"];
    NSString *revenue = dict[@"revenue"];
    NSString *currency = dict[@"currency"];
    NSString *receipt = dict[@"receipt"];
    NSString *transactionId = dict[@"transactionId"];
    NSNumber *isReceiptSet = dict[@"isReceiptSet"];
    NSDictionary *callbackParameters = dict[@"callbackParameters"];
    NSDictionary *partnerParameters = dict[@"partnerParameters"];
    
    ADJEvent *adjustEvent = [ADJEvent eventWithEventToken:eventToken];
    
    if ([adjustEvent isValid]) {
        if ([self isFieldValid:revenue]) {
            double revenueValue = [revenue doubleValue];
            
            [adjustEvent setRevenue:revenueValue currency:currency];
        }
        
        if ([self isFieldValid:callbackParameters]) {
            for (NSString *key in callbackParameters) {
                NSString *value = [callbackParameters objectForKey:key];
                
                [adjustEvent addCallbackParameter:key value:value];
            }
        }
        
        if ([self isFieldValid:partnerParameters]) {
            for (NSString *key in partnerParameters) {
                NSString *value = [partnerParameters objectForKey:key];
                
                [adjustEvent addPartnerParameter:key value:value];
            }
        }
        
        BOOL isTransactionIdSet = false;
        
        if ([self isFieldValid:isReceiptSet]) {
            if ([isReceiptSet boolValue]) {
                [adjustEvent setReceipt:[receipt dataUsingEncoding:NSUTF8StringEncoding] transactionId:transactionId];
            } else {
                if ([self isFieldValid:transactionId]) {
                    [adjustEvent setTransactionId:transactionId];
                    
                    isTransactionIdSet = YES;
                }
            }
        }
        
        if ([self isFieldValid:transactionId]) {
            [adjustEvent setTransactionId:transactionId];
        }
        
        [Adjust trackEvent:adjustEvent];
    }
}

RCT_EXPORT_METHOD(setOfflineMode:(NSNumber * _Nonnull)isEnabled) {
    [Adjust setOfflineMode:[isEnabled boolValue]];
}

RCT_EXPORT_METHOD(appWillOpenUrl:(NSString *)urlStr) {
    if (urlStr == nil) {
        return;
    }
    
    NSURL *url = [NSURL URLWithString:[urlStr stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    
    [Adjust appWillOpenUrl:url];
}

RCT_EXPORT_METHOD(setEnabled:(NSNumber * _Nonnull)isEnabled) {
    [Adjust setEnabled:[isEnabled boolValue]];
}

RCT_EXPORT_METHOD(isEnabled:(RCTResponseSenderBlock)callback) {
    BOOL isEnabled = [Adjust isEnabled];
    NSNumber *boolNumber = [NSNumber numberWithBool:isEnabled];
    
    callback(@[boolNumber]);
}

RCT_EXPORT_METHOD(sendFirstPackages) {
    [Adjust sendFirstPackages];
}

RCT_EXPORT_METHOD(addSessionCallbackParameter:(NSString *)key value:(NSString *)value) {
    if (!([self isFieldValid:key]) || !([self isFieldValid:value])) {
        return;
    }
    
    [Adjust addSessionCallbackParameter:key value:value];
}

RCT_EXPORT_METHOD(removeSessionCallbackParameter:(NSString *)key) {
    if (!([self isFieldValid:key])) {
        return;
    }
    
    [Adjust removeSessionCallbackParameter:key];
}

RCT_EXPORT_METHOD(resetSessionCallbackParameters) {
    [Adjust resetSessionCallbackParameters];
}

RCT_EXPORT_METHOD(addSessionPartnerParameter:(NSString *)key value:(NSString *)value) {
    if (!([self isFieldValid:key]) || !([self isFieldValid:value])) {
        return;
    }
    
    [Adjust addSessionPartnerParameter:key value:value];
}

RCT_EXPORT_METHOD(removeSessionPartnerParameter:(NSString *)key) {
    if (!([self isFieldValid:key])) {
        return;
    }
    
    [Adjust removeSessionPartnerParameter:key];
}

RCT_EXPORT_METHOD(resetSessionPartnerParameters) {
    [Adjust resetSessionPartnerParameters];
}

RCT_EXPORT_METHOD(setPushToken:(NSString *)token) {
    if (!([self isFieldValid:token])) {
        return;
    }
    
    [Adjust setDeviceToken:[token dataUsingEncoding:NSUTF8StringEncoding]];
}

RCT_EXPORT_METHOD(setAttributionCallbackListener) {
    _isAttributionCallbackImplemented = true;
}

RCT_EXPORT_METHOD(setEventTrackingSucceededCallbackListener) {
    _isEventTrackingSucceededCallbackImplemented = true;
}

RCT_EXPORT_METHOD(setEventTrackingFailedCallbackListener) {
    _isEventTrackingFailedCallbackImplemented = true;
}

RCT_EXPORT_METHOD(setSessionTrackingSucceededCallbackListener) {
    _isSessionTrackingSucceededCallbackImplemented = true;
}

RCT_EXPORT_METHOD(setSessionTrackingFailedCallbackListener) {
    _isSessionTrackingFailedCallbackImplemented = true;
}

RCT_EXPORT_METHOD(setDeferredDeeplinkCallbackListener) {
    _isDeferredDeeplinkCallbackImplemented = true;
}

RCT_EXPORT_METHOD(clearAttributionCallbackListener) {
    _isAttributionCallbackImplemented = false;
}

RCT_EXPORT_METHOD(clearEventTrackingSucceededCallbackListener) {
    _isEventTrackingSucceededCallbackImplemented = false;
}

RCT_EXPORT_METHOD(clearEventTrackingFailedCallbackListener) {
    _isEventTrackingFailedCallbackImplemented = false;
}

RCT_EXPORT_METHOD(clearSessionTrackingSucceededCallbackListener) {
    _isSessionTrackingSucceededCallbackImplemented = false;
}

RCT_EXPORT_METHOD(clearSessionTrackingFailedCallbackListener) {
    _isSessionTrackingFailedCallbackImplemented = false;
}

RCT_EXPORT_METHOD(clearDeferredDeeplinkCallbackListener) {
    _isDeferredDeeplinkCallbackImplemented = false;
}

@end
