#import "adjustSdk.h"

@implementation adjustSdk

RCT_EXPORT_MODULE(Adjust)

    BOOL _shouldLaunchDeeplink;

RCT_EXPORT_METHOD(test)
{
    NSLog(@"Test works");

    NSLog(@">>> isEnabled callback()");
    BOOL isEnabled = [Adjust isEnabled];
    NSNumber *boolNumber = [NSNumber numberWithBool:isEnabled];

    NSLog(@">>> SDK is %@", [boolNumber stringValue]);
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
        //if (attributionCallbackId != nil
        //|| eventSucceededCallbackId != nil
        //|| eventFailedCallbackId != nil
        //|| sessionSucceededCallbackId != nil
        //|| sessionFailedCallbackId != nil
        //|| deferredDeeplinkCallbackId != nil) {
        //[adjustConfig setDelegate:self];
        //}

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

        for (NSString *key in callbackParameters) {
            NSString *value = [callbackParameters objectForKey:key];

            NSLog(@">>> <<<");
            NSLog(@">>> callbackParameter: key: %@", key);
            NSLog(@">>> callbackParameter: value: %@", value);
            NSLog(@">>> <<<");
            [adjustEvent addCallbackParameter:key value:value];
        }

        for (NSString *key in partnerParameters) {
            NSString *value = [partnerParameters objectForKey:key];

            NSLog(@">>> <<<");
            NSLog(@">>> partnerParameter: key: %@", key);
            NSLog(@">>> partnerParameter: value: %@", value);
            NSLog(@">>> <<<");
            [adjustEvent addPartnerParameter:key value:value];
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

- (BOOL)isFieldValid:(NSObject *)field {
    if (![field isKindOfClass:[NSNull class]]) {
        if (field != nil) {
            return YES;
        }
    }

    return NO;
}

@end
