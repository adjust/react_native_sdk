#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "adjustSdk.h"

@implementation adjustSdk

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(Adjust);

BOOL _shouldLaunchDeeplink;
BOOL _attributionCallback;
BOOL _eventTrackingSucceededCallback;
BOOL _eventTrackingFailedCallback;
BOOL _sessionTrackingSucceededCallback;
BOOL _sessionTrackingFailedCallback;
BOOL _deferredDeeplinkCallback;

RCT_EXPORT_METHOD(test)
{
    NSLog(@"Test works");
}

- (BOOL)isFieldValid:(NSObject *)field {
    if (![field isKindOfClass:[NSNull class]]) {
        if (field != nil) {
            return YES;
        }
    }

    return NO;
}

RCT_EXPORT_METHOD(create:(NSDictionary *)dict)
{
    NSLog(@">>> create");
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

    NSLog(@">>> appToken: %@", appToken);
    NSLog(@">>> environment: %@", environment);
    NSLog(@">>> logLevel: %@", logLevel);
    NSLog(@">>> sdkPrefix: %@", sdkPrefix);
    NSLog(@">>> defaultTracker: %@", defaultTracker);

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
        if (_attributionCallback
                || _eventTrackingSucceededCallback
                || _eventTrackingFailedCallback
                || _sessionTrackingSucceededCallback
                || _sessionTrackingFailedCallback
                || _deferredDeeplinkCallback) {
            [adjustConfig setDelegate:self];
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

RCT_EXPORT_METHOD(trackEvent:(NSDictionary *)dict)
{
    NSString *eventToken = dict[@"eventToken"];
    NSString *revenue = dict[@"revenue"];
    NSString *currency = dict[@"currency"];
    NSString *receipt = dict[@"receipt"];
    NSString *transactionId = dict[@"transactionId"];
    NSNumber *isReceiptSet = dict[@"isReceiptSet"];
    NSDictionary *callbackParameters = dict[@"callbackParameters"];
    NSDictionary *partnerParameters = dict[@"partnerParameters"];

    NSLog(@">>> eventToken: %@", eventToken);

    ADJEvent *adjustEvent = [ADJEvent eventWithEventToken:eventToken];

    if ([adjustEvent isValid]) {
        if ([self isFieldValid:revenue]) {
            double revenueValue = [revenue doubleValue];

            [adjustEvent setRevenue:revenueValue currency:currency];
        }

        if ([self isFieldValid:callbackParameters]) {
            NSLog(@">>> size of callbackParameters: %lu: " , [callbackParameters count]);
            for (NSString *key in callbackParameters) {
                NSLog(@">>> Hello <<<");
                NSString *value = [callbackParameters objectForKey:key];

                NSLog(@">>> <<<");
                NSLog(@">>> callbackParameter: key: %@", key);
                NSLog(@">>> callbackParameter: value: %@", value);
                NSLog(@">>> <<<");
                [adjustEvent addCallbackParameter:key value:value];
            }
        }

        if ([self isFieldValid:partnerParameters]) {
            NSLog(@">>> size of partnerParameters: %lu: " , [partnerParameters count]);
            for (NSString *key in partnerParameters) {
                NSString *value = [partnerParameters objectForKey:key];

                NSLog(@">>> <<<");
                NSLog(@">>> partnerParameter: key: %@", key);
                NSLog(@">>> partnerParameter: value: %@", value);
                NSLog(@">>> <<<");
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

        if (NO == isTransactionIdSet) {
            if ([self isFieldValid:transactionId]) {
                [adjustEvent setTransactionId:transactionId];
            }
        }

        [Adjust trackEvent:adjustEvent];
    }
}

RCT_EXPORT_METHOD(setOfflineMode:(NSNumber * _Nonnull)isEnabled)
{
    [Adjust setOfflineMode:[isEnabled boolValue]];
}

RCT_EXPORT_METHOD(appWillOpenUrl:(NSString *)urlStr)
{
    if (urlStr == nil) {
        return;
    }

    NSURL *url = [NSURL URLWithString:[urlStr stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];

    [Adjust appWillOpenUrl:url];
}

RCT_EXPORT_METHOD(setEnabled:(NSNumber * _Nonnull)isEnabled)
{
    [Adjust setEnabled:[isEnabled boolValue]];
}

RCT_EXPORT_METHOD(isEnabled:(RCTResponseSenderBlock)callback) 
{
    BOOL isEnabled = [Adjust isEnabled];
    NSNumber *boolNumber = [NSNumber numberWithBool:isEnabled];

    callback(@[boolNumber]);
}

RCT_EXPORT_METHOD(sendFirstPackages)
{
    [Adjust sendFirstPackages];
}

RCT_EXPORT_METHOD(addSessionCallbackParameter:(NSString *)key value:(NSString *)value)
{
    if (!([self isFieldValid:key]) || !([self isFieldValid:value])) {
        return;
    }

    [Adjust addSessionCallbackParameter:key value:value];
}

RCT_EXPORT_METHOD(removeSessionCallbackParameter:(NSString *)key)
{
    if (!([self isFieldValid:key])) {
        return;
    }

    [Adjust removeSessionCallbackParameter:key];
}

RCT_EXPORT_METHOD(resetSessionCallbackParameters)
{
    [Adjust resetSessionCallbackParameters];
}

RCT_EXPORT_METHOD(addSessionPartnerParameter:(NSString *)key value:(NSString *)value)
{
    if (!([self isFieldValid:key]) || !([self isFieldValid:value])) {
        return;
    }

    [Adjust addSessionPartnerParameter:key value:value];
}

RCT_EXPORT_METHOD(removeSessionPartnerParameter:(NSString *)key)
{
    if (!([self isFieldValid:key])) {
        return;
    }

    [Adjust removeSessionPartnerParameter:key];
}

RCT_EXPORT_METHOD(resetSessionPartnerParameters)
{
    [Adjust resetSessionPartnerParameters];
}

RCT_EXPORT_METHOD(setPushToken:(NSString *)token)
{
    NSLog(@">>> setPushToken");

    if (!([self isFieldValid:token])) {
        return;
    }

    [Adjust setDeviceToken:token];
}

RCT_EXPORT_METHOD(setAttributionCallbackListener)
{
    _attributionCallback = true;
}

RCT_EXPORT_METHOD(setEventTrackingSucceededCallbackListener)
{
    _eventTrackingSucceededCallback = true;
}

RCT_EXPORT_METHOD(setEventTrackingFailedCallbackListener)
{
    _eventTrackingFailedCallback = true;
}

RCT_EXPORT_METHOD(setSessionTrackingSucceededCallbackListener)
{
    _sessionTrackingSucceededCallback = true;
}

RCT_EXPORT_METHOD(setSessionTrackingFailedCallbackListener)
{
    _sessionTrackingFailedCallback = true;
}

RCT_EXPORT_METHOD(setDeferredDeeplinkCallbackListener)
{
    _deferredDeeplinkCallback = true;
}

RCT_EXPORT_METHOD(clearAttributionCallbackListener)
{
    _attributionCallback = false;
}

RCT_EXPORT_METHOD(clearEventTrackingSucceededCallbackListener)
{
    _eventTrackingSucceededCallback = false;
}

RCT_EXPORT_METHOD(clearEventTrackingFailedCallbackListener)
{
    _eventTrackingFailedCallback = false;
}

RCT_EXPORT_METHOD(clearSessionTrackingSucceededCallbackListener)
{
    _sessionTrackingSucceededCallback = false;
}

RCT_EXPORT_METHOD(clearSessionTrackingFailedCallbackListener)
{
    _sessionTrackingFailedCallback = false;
}

RCT_EXPORT_METHOD(clearDeferredDeeplinkCallbackListener)
{
    _deferredDeeplinkCallback = false;
}

- (void)adjustAttributionChanged:(ADJAttribution *)attr {
    NSDictionary *dict = [[NSDictionary alloc] initWithObjectsAndKeys:
        @"trackerToken", attr.trackerToken,
        @"trackerName", attr.trackerName,
        @"network", attr.network,
        @"campaign", attr.campaign,
        @"adgroup", attr.adgroup,
        @"creative", attr.creative,
        @"clickLabel", attr.clickLabel,
        nil];

    [self.bridge.eventDispatcher sendAppEventWithName:@"attribution" body:dict];
}

- (void)adjustEventTrackingSucceeded:(ADJEventSuccess *)event {
    NSError * err;
    NSData * jsonData = [NSJSONSerialization dataWithJSONObject:event.jsonResponse options:0 error:&err]; 
    NSString * jsonResponseStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

    NSDictionary *dict = [[NSDictionary alloc] initWithObjectsAndKeys:
        @"message", event.message,
        @"timeStamp", event.timeStamp,
        @"adid", event.adid,
        @"eventToken", event.eventToken,
        @"jsonResponse", jsonResponseStr,
        nil];

    [self.bridge.eventDispatcher sendAppEventWithName:@"eventTrackingSucceeded" body:dict];
}

- (void)adjustEventTrackingFailed:(ADJEventFailure *)event {
    NSError * err;
    NSData * jsonData = [NSJSONSerialization dataWithJSONObject:event.jsonResponse options:0 error:&err]; 
    NSString * jsonResponseStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

    NSNumber *willRetryNum = [NSNumber numberWithBool:event.willRetry];

    NSDictionary *dict = [[NSDictionary alloc] initWithObjectsAndKeys:
        @"message", event.message,
        @"timeStamp", event.timeStamp,
        @"adid", event.adid,
        @"eventToken", event.eventToken,
        @"willRetry", willRetryNum,
        @"jsonResponse", jsonResponseStr,
        nil];

    [self.bridge.eventDispatcher sendAppEventWithName:@"eventTrackingFailed" body:dict];
}

- (void)adjustSessionTrackingSucceeded:(ADJSessionSuccess *)session {
    NSError * err;
    NSData * jsonData = [NSJSONSerialization dataWithJSONObject:session.jsonResponse options:0 error:&err]; 
    NSString * jsonResponseStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

    NSDictionary *dict = [[NSDictionary alloc] initWithObjectsAndKeys:
        @"message", session.message,
        @"timeStamp", session.timeStamp,
        @"adid", session.adid,
        @"jsonResponse", jsonResponseStr,
        nil];

    [self.bridge.eventDispatcher sendAppEventWithName:@"sessionTrackingSucceeded" body:dict];
}

- (void)adjustSessionTrackingFailed:(ADJSessionFailure *)session {
    NSError * err;
    NSData * jsonData = [NSJSONSerialization dataWithJSONObject:session.jsonResponse options:0 error:&err]; 
    NSString * jsonResponseStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

    NSNumber *willRetryNum = [NSNumber numberWithBool:session.willRetry];

    NSDictionary *dict = [[NSDictionary alloc] initWithObjectsAndKeys:
        @"message", session.message,
        @"timeStamp", session.timeStamp,
        @"willRetry", willRetryNum,
        @"adid", session.adid,
        @"jsonResponse", jsonResponseStr,
        nil];

    [self.bridge.eventDispatcher sendAppEventWithName:@"sessionTrackingFailed" body:dict];
}

- (BOOL)adjustDeeplinkResponse:(NSURL *)deeplink {
    NSString *path = [deeplink absoluteString];

    [self.bridge.eventDispatcher sendAppEventWithName:@"deferredDeeplink"
                                                 body:@{@"uri": path}];
    return _shouldLaunchDeeplink;
}

@end
