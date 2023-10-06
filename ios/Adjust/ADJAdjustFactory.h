//
//  ADJAdjustFactory.h
//  Adjust
//
//  Created by Pedro Filipe on 07/02/14.
//  Copyright (c) 2014 adjust GmbH. All rights reserved.
//
#import <Foundation/Foundation.h>

#import "ADJLogger.h"
#import "ADJActivityPackage.h"
#import "ADJBackoffStrategy.h"
#import "ADJSdkClickHandler.h"

@interface ADJAdjustFactory : NSObject

+ (id<ADJLogger>)logger;
+ (double)sessionInterval;
+ (double)subsessionInterval;
+ (double)requestTimeout;
+ (NSTimeInterval)timerInterval;
+ (NSTimeInterval)timerStart;
+ (ADJBackoffStrategy *)packageHandlerBackoffStrategy;
+ (ADJBackoffStrategy *)sdkClickHandlerBackoffStrategy;
+ (ADJBackoffStrategy *)installSessionBackoffStrategy;

+ (BOOL)testing;
+ (NSTimeInterval)maxDelayStart;
+ (NSString *)baseUrl;
+ (NSString *)gdprUrl;
+ (NSString *)subscriptionUrl;
+ (NSString *)purchaseVerificationUrl;
+ (BOOL)adServicesFrameworkEnabled;

+ (void)setLogger:(id<ADJLogger>)logger;
+ (void)setSessionInterval:(double)sessionInterval;
+ (void)setSubsessionInterval:(double)subsessionInterval;
+ (void)setRequestTimeout:(double)requestTimeout;
+ (void)setTimerInterval:(NSTimeInterval)timerInterval;
+ (void)setTimerStart:(NSTimeInterval)timerStart;
+ (void)setPackageHandlerBackoffStrategy:(ADJBackoffStrategy *)backoffStrategy;
+ (void)setSdkClickHandlerBackoffStrategy:(ADJBackoffStrategy *)backoffStrategy;
+ (void)setTesting:(BOOL)testing;
+ (void)setAdServicesFrameworkEnabled:(BOOL)adServicesFrameworkEnabled;
+ (void)setMaxDelayStart:(NSTimeInterval)maxDelayStart;
+ (void)setBaseUrl:(NSString *)baseUrl;
+ (void)setGdprUrl:(NSString *)gdprUrl;
+ (void)setSubscriptionUrl:(NSString *)subscriptionUrl;
+ (void)setPurchaseVerificationUrl:(NSString *)purchaseVerificationUrl;

+ (void)enableSigning;
+ (void)disableSigning;

+ (void)teardown:(BOOL)deleteState;
@end
