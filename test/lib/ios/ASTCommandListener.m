//
//  ASTCommandListener.m
//  Adjust SDK Test
//
//  Created by Abdullah Obaied (@obaied) on 20th February 2018.
//  Copyright © 2018 Adjust GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ASTCommandListener.h"
#import "ASTEventEmitter.h"

@implementation ASTCommandListener {
    int orderCounter;
}

- (id)init {
    self = [super init];
    if (self == nil) {
        return nil;
    }

    orderCounter = 0;
    return self;
}

- (void)executeCommandRawJson:(NSString *)json {
    NSError *jsonError;
    NSData *objectData = [json dataUsingEncoding:NSUTF8StringEncoding];
    NSMutableDictionary *dict = [NSJSONSerialization JSONObjectWithData:objectData
                                                                options:NSJSONReadingMutableContainers
                                                                  error:&jsonError];

    // Order of packages sent through PluginResult is not reliable, this is solved
    // through a scheduling mechanism in command_executor.js#scheduleCommand() side.
    // The 'order' entry is used to schedule commands
    NSNumber *_num = [NSNumber numberWithInt:orderCounter];
    [dict setObject:_num forKey:@"order"];
    orderCounter++;

    // Dispatch command.
    [ASTEventEmitter dispatchEvent:@"command" withDictionary:dict];
}

@end
