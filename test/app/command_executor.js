'use strict';
let {
    NativeModules
} = require('react-native');
import { Platform } from 'react-native';
import {
    Adjust,
    AdjustEvent,
    AdjustConfig,
    AdjustAppStoreSubscription,
    AdjustPlayStoreSubscription,
    AdjustThirdPartySharing,
    AdjustAdRevenue,
    AdjustAppStorePurchase,
    AdjustPlayStorePurchase
} from 'react-native-adjust';
import { AdjustTestOptions } from './test_options.js';
const AdjustSdkTest = NativeModules.AdjustSdkTest;

/* 
 * A note on scheduling:
 *
 * Callbacks sent from Java -> Javascript through PluginResult are by nature not ordered.
 *  scheduleCommand(command) tries to receive commands and schedule them in an array (this.savedCommand)
 *  that would be executed based on what `this.nextToSendCounter` specifies.
 * 
 * Sorting mechanism goes as follows
 * - When receiving a new command...
 *   * if the new command is in order, send it immediately.
 *   * If the new command is not in order
 *     * Store it in a list
 *     * Check the list if it contains the next command to send
 * - After sending a command...
 *     * Check the list if it contains the next command to send
 * 
 * So this system is rechecking the list for items to send on two events:
 * - When a new not-in-order object is added.
 * - After a successful send
 */

// A wrapper for a command received from test server
function AdjustCommand(functionName, params, order) {
    this.functionName = functionName;
    this.params = params;
    this.order = order;
};

export function CommandExecutor(urlOverwrite) {
    this.adjustCommandExecutor = new AdjustCommandExecutor(urlOverwrite);
};

CommandExecutor.prototype.scheduleCommand = function(className, functionName, params, order) {
    switch (className) {
        case 'Adjust':
            var command = new AdjustCommand(functionName, params, order);
            this.adjustCommandExecutor.scheduleCommand(command);
            break;
    }
};

function AdjustCommandExecutor(urlOverwrite) {
    this.urlOverwrite = urlOverwrite;
    this.extraPath = null;
    this.savedEvents = {};
    this.savedConfigs = {};
    this.savedCommands = [];
    this.nextToSendCounter = 0;
};

// First point of entry for scheduling commands. Takes a 'AdjustCommand {command}' parameter
AdjustCommandExecutor.prototype.scheduleCommand = function(command) {
    // If the command is in order, send in immediately
    if (command.order === this.nextToSendCounter) {
        this.executeCommand(command, -1);
        return;
    }

    // Not in order, schedule it
    this.savedCommands.push(command);

    // Recheck list
    this.checkList();
};

// Check the list of commands to see which one is in order
AdjustCommandExecutor.prototype.checkList = function() {
    for (var i = 0; i < this.savedCommands.length; i++) {
        var command = this.savedCommands[i];
        if (command.order === this.nextToSendCounter) {
            this.executeCommand(command, i);
            return;
        }
    }
};

// Execute the command. This will always be invoked either from:
//  - checkList() after scheduling a command
//  - scheduleCommand() only if the package was in order
//
// (AdjustCommand {command}) : The command to be executed
// (Number {idx})            : index of the command in the schedule list. -1 if it was sent directly
AdjustCommandExecutor.prototype.executeCommand = function(command, idx) {
    console.log(`[*] executeCommand(): ${JSON.stringify(command)}`);
    switch (command.functionName) {
        case 'testOptions': this.testOptions(command.params); break;
        case 'config': this.config(command.params); break;
        case 'start': this.start(command.params); break;
        case 'event': this.event(command.params); break;
        case 'trackEvent': this.trackEvent(command.params); break;
        case 'resume': this.resume(command.params); break;
        case 'pause': this.pause(command.params); break;
        case 'setEnabled': this.setEnabled(command.params); break;
        case 'setOfflineMode': this.setOfflineMode(command.params); break;
        case 'addGlobalCallbackParameter': this.addGlobalCallbackParameter(command.params); break;
        case 'addGlobalPartnerParameter': this.addGlobalPartnerParameter(command.params); break;
        case 'removeGlobalCallbackParameter': this.removeGlobalCallbackParameter(command.params); break;
        case 'removeGlobalPartnerParameter': this.removeGlobalPartnerParameter(command.params); break;
        case 'removeGlobalCallbackParameters': this.removeGlobalCallbackParameters(command.params); break;
        case 'removeGlobalPartnerParameters': this.removeGlobalPartnerParameters(command.params); break;
        case 'setPushToken': this.setPushToken(command.params); break;
        case 'openDeeplink': this.openDeeplink(command.params); break;
        case 'sendReferrer': this.sendReferrer(command.params); break;
        case 'gdprForgetMe': this.gdprForgetMe(command.params); break;
        case 'thirdPartySharing': this.trackThirdPartySharing(command.params); break;
        case 'measurementConsent': this.trackMeasurementConsent(command.params); break;
        case 'trackSubscription': this.trackAppStoreSubscription(command.params); break;
        case 'trackAdRevenue': this.trackAdRevenue(command.params); break;
        case 'getLastDeeplink': this.getLastDeeplink(command.params); break;
        case 'verifyPurchase': this.verifyPurchase(command.params); break;
        case 'verifyTrack': this.verifyTrack(command.params); break;
        case 'processDeeplink': this.processDeeplink(command.params); break;
        case 'attributionGetter': this.attributionGetter(command.params); break;
    }

    this.nextToSendCounter++;

    // If idx != -1, it means it was not sent directly. Delete its instance from the scheduling array
    if (idx != -1) {
        this.savedCommands.splice(idx, 1);
    }

    // Recheck the list
    this.checkList();
};

AdjustCommandExecutor.prototype.testOptions = function(params) {
    var testOptions = new AdjustTestOptions();
    testOptions.testUrlOverwrite = this.urlOverwrite;

    if ('basePath' in params) {
        this.extraPath = getFirstParameterValue(params, 'basePath');
    }
    if ('timerInterval' in params) {
        testOptions.timerIntervalInMilliseconds = getFirstParameterValue(params, 'timerInterval').toString();
    }
    if ('timerStart' in params) {
        testOptions.timerStartInMilliseconds = getFirstParameterValue(params, 'timerStart').toString();
    }
    if ('sessionInterval' in params) {
        testOptions.sessionIntervalInMilliseconds = getFirstParameterValue(params, 'sessionInterval').toString();
    }
    if ('subsessionInterval' in params) {
        testOptions.subsessionIntervalInMilliseconds = getFirstParameterValue(params, 'subsessionInterval').toString();
    }
    if ('noBackoffWait' in params) {
        testOptions.noBackoffWait = getFirstParameterValue(params, 'noBackoffWait').toString() === 'true';
    }
    if ('adServicesFrameworkEnabled' in params) {
        testOptions.adServicesFrameworkEnabled = getFirstParameterValue(params, 'adServicesFrameworkEnabled').toString() === 'true';
    }
    if ('attStatus' in params) {
        testOptions.attStatus = getFirstParameterValue(params, 'attStatus').toString();
    }
    if ('idfa' in params) {
        testOptions.idfa = getFirstParameterValue(params, 'idfa').toString();
    }

    if ('teardown' in params) {
        var teardownOptions = getValueFromKey(params, 'teardown');
        for (var i = 0; i < teardownOptions.length; i++) {
            var option = teardownOptions[i];
            if ('resetSdk' === option) {
                testOptions.teardown = true;
                testOptions.extraPath = this.extraPath;
                Adjust.teardown('test');
            }
            if ('deleteState' === option) {
                testOptions.deleteState = true;
            }
            if ('resetTest' === option) {
                this.savedEvents = {};
                this.savedConfigs = {};
                testOptions.timerIntervalInMilliseconds = (-1).toString();
                testOptions.timerStartInMilliseconds = (-1).toString();
                testOptions.sessionIntervalInMilliseconds = (-1).toString();
                testOptions.subsessionIntervalInMilliseconds = (-1).toString();
            }
            if ('sdk' === option) {
                testOptions.teardown = true;
                testOptions.extraPath = null;
                Adjust.teardown('test');
            }
            if ('test' === option) {
                this.savedEvents = null;
                this.savedConfigs = null;
                this.extraPath = null;
                testOptions.timerIntervalInMilliseconds = (-1).toString();
                testOptions.timerStartInMilliseconds = (-1).toString();
                testOptions.sessionIntervalInMilliseconds = (-1).toString();
                testOptions.subsessionIntervalInMilliseconds = (-1).toString();
            }
        }
    }

    Adjust.setTestOptions(testOptions);
};

AdjustCommandExecutor.prototype.config = function(params) {
    var configNumber = 0;
    if ('configName' in params) {
        var configName = getFirstParameterValue(params, 'configName');
        configNumber = parseInt(configName.substr(configName.length - 1))
    }

    var adjustConfig;
    if (configNumber in this.savedConfigs) {
        adjustConfig = this.savedConfigs[configNumber];
    } else {
        var environment = getFirstParameterValue(params, 'environment');
        var appToken = getFirstParameterValue(params, 'appToken');
        adjustConfig = new AdjustConfig(appToken, environment);
        adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
        this.savedConfigs[configNumber] = adjustConfig;
    }

    if ('logLevel' in params) {
        var logLevelS = getFirstParameterValue(params, 'logLevel');
        var logLevel = null;
        switch (logLevelS) {
            case 'verbose':
                logLevel = AdjustConfig.LogLevelVerbose;
                break;
            case 'debug':
                logLevel = AdjustConfig.LogLevelDebug;
                break;
            case 'info':
                logLevel = AdjustConfig.LogLevelInfo;
                break;
            case 'warn':
                logLevel = AdjustConfig.LogLevelWarn;
                break;
            case 'error':
                logLevel = AdjustConfig.LogLevelError;
                break;
            case 'assert':
                logLevel = AdjustConfig.LogLevelAssert;
                break;
            case 'suppress':
                logLevel = AdjustConfig.LogLevelSuppress;
                break;
        }

        adjustConfig.setLogLevel(logLevel);
    }

    if ('sdkPrefix' in params) {
        var sdkPrefix = getFirstParameterValue(params, 'sdkPrefix');
        adjustConfig.setSdkPrefix(sdkPrefix);
    }

    if ('defaultTracker' in params) {
        var defaultTracker = getFirstParameterValue(params, 'defaultTracker');
        adjustConfig.setDefaultTracker(defaultTracker);
    }

    if ('needsCost' in params) {
        var defaultTracker = getFirstParameterValue(params, 'needsCost');
        adjustConfig.enableCostDataInAttribution();
    }

    if ('sendInBackground' in params) {
        var sendInBackgroundS = getFirstParameterValue(params, 'sendInBackground');
        if (sendInBackgroundS == 'true') {
            adjustConfig.enableSendingInBackground();
        }
    }

    if ('allowIdfaReading' in params) {
        var allowIdfaReadingS = getFirstParameterValue(params, 'allowIdfaReading');
        if (allowIdfaReadingS != 'true') {
            adjustConfig.disableIdfaReading();
        }
    }

    if ('allowAdServicesInfoReading' in params) {
        var allowAdServicesInfoReadingS = getFirstParameterValue(params, 'allowAdServicesInfoReading');
        if (allowAdServicesInfoReadingS != 'true') {
            adjustConfig.disableAdServices();
        }
    }

    if ('allowSkAdNetworkHandling' in params) {
        var allowSkAdNetworkHandlingS = getFirstParameterValue(params, 'allowSkAdNetworkHandling');
        if (allowSkAdNetworkHandlingS != 'true') {
            adjustConfig.disableSkanAttribution();
        }
    }

    if ('externalDeviceId' in params) {
        var externalDeviceId = getFirstParameterValue(params, 'externalDeviceId');
        adjustConfig.setExternalDeviceId(externalDeviceId);
    }

    if ('attributionCallbackSendAll' in params) {
        var _this = this;
        adjustConfig.setAttributionCallbackListener(function(attribution) {
            AdjustSdkTest.addInfoToSend('tracker_token', attribution.trackerToken);
            AdjustSdkTest.addInfoToSend('tracker_name', attribution.trackerName);
            AdjustSdkTest.addInfoToSend('network', attribution.network);
            AdjustSdkTest.addInfoToSend('campaign', attribution.campaign);
            AdjustSdkTest.addInfoToSend('adgroup', attribution.adgroup);
            AdjustSdkTest.addInfoToSend('creative', attribution.creative);
            AdjustSdkTest.addInfoToSend('click_label', attribution.clickLabel);
            AdjustSdkTest.addInfoToSend('adid', attribution.adid);
            AdjustSdkTest.addInfoToSend('cost_type', attribution.costType);
            AdjustSdkTest.addInfoToSend('cost_amount', attribution.costAmount.toString());
            AdjustSdkTest.addInfoToSend('cost_currency', attribution.costCurrency);
            AdjustSdkTest.addInfoToSend('fbInstallReferrer', attribution.fbInstallReferrer);
            AdjustSdkTest.sendInfoToServer(_this.extraPath);
        });
    }

    if ('sessionCallbackSendSuccess' in params) {
        var _this = this;
        adjustConfig.setSessionTrackingSucceededCallbackListener(function(sessionSuccess) {
            AdjustSdkTest.addInfoToSend('message', sessionSuccess.message);
            AdjustSdkTest.addInfoToSend('timestamp', sessionSuccess.timestamp);
            AdjustSdkTest.addInfoToSend('adid', sessionSuccess.adid);
            if (sessionSuccess.jsonResponse != null) {
                AdjustSdkTest.addInfoToSend('jsonResponse', sessionSuccess.jsonResponse.toString());
            }
            AdjustSdkTest.sendInfoToServer(_this.extraPath);
        });
    }

    if ('sessionCallbackSendFailure' in params) {
        var _this = this;
        adjustConfig.setSessionTrackingFailedCallbackListener(function(sessionFailed) {
            AdjustSdkTest.addInfoToSend('message', sessionFailed.message);
            AdjustSdkTest.addInfoToSend('timestamp', sessionFailed.timestamp);
            AdjustSdkTest.addInfoToSend('adid', sessionFailed.adid);
            AdjustSdkTest.addInfoToSend('willRetry', sessionFailed.willRetry);
            if (sessionFailed.jsonResponse != null) {
                AdjustSdkTest.addInfoToSend('jsonResponse', sessionFailed.jsonResponse.toString());
            }
            AdjustSdkTest.sendInfoToServer(_this.extraPath);
        });
    }

    if ('eventCallbackSendSuccess' in params) {
        var _this = this;
        adjustConfig.setEventTrackingSucceededCallbackListener(function(eventSuccess) {
            AdjustSdkTest.addInfoToSend('message', eventSuccess.message);
            AdjustSdkTest.addInfoToSend('timestamp', eventSuccess.timestamp);
            AdjustSdkTest.addInfoToSend('adid', eventSuccess.adid);
            AdjustSdkTest.addInfoToSend('eventToken', eventSuccess.eventToken);
            AdjustSdkTest.addInfoToSend('callbackId', eventSuccess.callbackId);
            if (eventSuccess.jsonResponse != null) {
                AdjustSdkTest.addInfoToSend('jsonResponse', eventSuccess.jsonResponse.toString());
            }
            AdjustSdkTest.sendInfoToServer(_this.extraPath);
        });
    }

    if ('eventCallbackSendFailure' in params) {
        var _this = this;
        adjustConfig.setEventTrackingFailedCallbackListener(function(eventFailed) {
            AdjustSdkTest.addInfoToSend('message', eventFailed.message);
            AdjustSdkTest.addInfoToSend('timestamp', eventFailed.timestamp);
            AdjustSdkTest.addInfoToSend('adid', eventFailed.adid);
            AdjustSdkTest.addInfoToSend('eventToken', eventFailed.eventToken);
            AdjustSdkTest.addInfoToSend('callbackId', eventFailed.callbackId);
            AdjustSdkTest.addInfoToSend('willRetry', eventFailed.willRetry);
            if (eventFailed.jsonResponse != null) {
                AdjustSdkTest.addInfoToSend('jsonResponse', eventFailed.jsonResponse.toString());
            }
            AdjustSdkTest.sendInfoToServer(_this.extraPath);
        });
    }

    if ('deferredDeeplinkCallback' in params) {
        var _this = this;
        var launchDeferredDeeplinkS = getFirstParameterValue(params, 'deferredDeeplinkCallback');
        var launchDeferredDeeplink = launchDeferredDeeplinkS === 'true';
        console.log(`[*] Launch deferred deeplink set to: ${launchDeferredDeeplink}`);
        adjustConfig.setShouldLaunchDeeplink(launchDeferredDeeplink);
        adjustConfig.setDeferredDeeplinkCallbackListener(function(uri) {
            AdjustSdkTest.addInfoToSend('deeplink', uri);
            AdjustSdkTest.sendInfoToServer(_this.extraPath);
        });
    }

    if ('skanCallback' in params) {
        var _this = this;
        adjustConfig.setSkanUpdatedCallbackListener(function(data) {
            var jsonObject = JSON.parse(JSON.stringify(data));
            for (let [key, value] of Object.entries(jsonObject)) {
                AdjustSdkTest.addInfoToSend(key, value);
            }
            AdjustSdkTest.sendInfoToServer(_this.extraPath);
        });
    }

    if ('attConsentWaitingSeconds' in params) {
        var attConsentWaitingSecondsS = getFirstParameterValue(params, 'attConsentWaitingSeconds');
        var attConsentWaitingSeconds = parseFloat(attConsentWaitingSecondsS);
        adjustConfig.setAttConsentWaitingInterval(attConsentWaitingSeconds);
    }

    if ('eventDeduplicationIdsMaxSize' in params) {
        var eventDeduplicationIdsMaxSizeS = getFirstParameterValue(params, 'eventDeduplicationIdsMaxSize');
        var eventDeduplicationIdsMaxSize = parseInt(eventDeduplicationIdsMaxSizeS);
        adjustConfig.setEventDeduplicationIdsMaxSize(eventDeduplicationIdsMaxSize);
    }

    if ('coppaCompliant' in params) {
        var coppaCompliantEnabledS = getFirstParameterValue(params, 'coppaCompliant');
        if (coppaCompliantEnabledS == 'true') {
            adjustConfig.enableCoppaCompliance();
        }
    }

    if ('playStoreKids' in params) {
        var playStoreKidsEnabledS = getFirstParameterValue(params, 'playStoreKids');
        var playStoreKidsEnabled = playStoreKidsEnabledS == 'true';
        adjustConfig.enablePlayStoreKidsCompliance();
    }
};

AdjustCommandExecutor.prototype.start = function(params) {
    this.config(params);
    var configNumber = 0;
    if ('configName' in params) {
        var configName = getFirstParameterValue(params, 'configName');
        configNumber = parseInt(configName.substr(configName.length - 1))
    }

    var adjustConfig = this.savedConfigs[configNumber];
    Adjust.initSdk(adjustConfig);

    delete this.savedConfigs[0];
};

AdjustCommandExecutor.prototype.event = function(params) {
    var eventNumber = 0;
    if ('eventName' in params) {
        var eventName = getFirstParameterValue(params, 'eventName');
        eventNumber = parseInt(eventName.substr(eventName.length - 1))
    }

    var adjustEvent;
    if (eventNumber in this.savedEvents) {
        adjustEvent = this.savedEvents[eventNumber];
    } else {
        var eventToken = getFirstParameterValue(params, 'eventToken');
        // weird behaviour with null value
        // double check this later to handle it on event instance level
        if (typeof eventToken !== 'string') {
            return;
        }
        adjustEvent = new AdjustEvent(eventToken);
        this.savedEvents[eventNumber] = adjustEvent;
    }

    if ('revenue' in params) {
        var revenueParams = getValueFromKey(params, 'revenue');
        var currency = revenueParams[0];
        var revenue = parseFloat(revenueParams[1]);
        adjustEvent.setRevenue(revenue, currency);
    }

    if ('callbackParams' in params) {
        var callbackParams = getValueFromKey(params, 'callbackParams');
        for (var i = 0; i < callbackParams.length; i += 2) {
            var key = callbackParams[i];
            var value = callbackParams[i + 1];
            adjustEvent.addCallbackParameter(key, value);
        }
    }

    if ('partnerParams' in params) {
        var partnerParams = getValueFromKey(params, 'partnerParams');
        for (var i = 0; i < partnerParams.length; i += 2) {
            var key = partnerParams[i];
            var value = partnerParams[i + 1];
            adjustEvent.addPartnerParameter(key, value);
        }
    }

    if ('orderId' in params) {
        var orderId = getFirstParameterValue(params, 'orderId');
        adjustEvent.setTransactionId(orderId);
    }

    if ('callbackId' in params) {
        var callbackId = getFirstParameterValue(params, 'callbackId');
        adjustEvent.setCallbackId(callbackId);
    }

    if ('productId' in params) {
        var productId = getFirstParameterValue(params, 'productId');
        adjustEvent.setProductId(productId);
    }

    if (Platform.OS === 'android') {
        if ('purchaseToken' in params) {
            var purchaseToken = getFirstParameterValue(params, 'purchaseToken');
            adjustEvent.setPurchaseToken(purchaseToken);
        }
    }

    if ('transactionId' in params) {
        var transactionId = getFirstParameterValue(params, 'transactionId');
        adjustEvent.setTransactionId(transactionId);
    }

    if ('deduplicationId' in params) {
        var deduplicationId = getFirstParameterValue(params, 'deduplicationId');
        adjustEvent.setDeduplicationId(deduplicationId);
    }
};

AdjustCommandExecutor.prototype.trackEvent = function(params) {
    this.event(params);
    var eventNumber = 0;
    if ('eventName' in params) {
        var eventName = getFirstParameterValue(params, 'eventName');
        eventNumber = parseInt(eventName.substr(eventName.length - 1))
    }

    var adjustEvent = this.savedEvents[eventNumber];
    Adjust.trackEvent(adjustEvent);

    delete this.savedEvents[0];
};

AdjustCommandExecutor.prototype.setReferrer = function(params) {
    var referrer = getFirstParameterValue(params, 'referrer');
    Adjust.setReferrer(referrer);
};

AdjustCommandExecutor.prototype.pause = function(params) {
    Adjust.onPause('test');
};

AdjustCommandExecutor.prototype.resume = function(params) {
    Adjust.onResume('test');
};

AdjustCommandExecutor.prototype.setEnabled = function(params) {
    if (getFirstParameterValue(params, 'enabled') == 'true') {
        Adjust.enable();
    } else {
        Adjust.disable();
    }
};

AdjustCommandExecutor.prototype.setOfflineMode = function(params) {
    if (getFirstParameterValue(params, 'enabled') == 'true') {
        Adjust.switchToOfflineMode();
    } else {
        Adjust.switchBackToOnlineMode();
    }
};

AdjustCommandExecutor.prototype.addGlobalCallbackParameter = function(params) {
    var list = getValueFromKey(params, 'KeyValue');
    for (var i = 0; i < list.length; i += 2) {
        var key = list[i];
        var value = list[i + 1];
        Adjust.addGlobalCallbackParameter(key, value);
    }
};

AdjustCommandExecutor.prototype.addGlobalPartnerParameter = function(params) {
    var list = getValueFromKey(params, 'KeyValue');
    for (var i = 0; i < list.length; i += 2) {
        var key = list[i];
        var value = list[i + 1];
        Adjust.addGlobalPartnerParameter(key, value);
    }
};

AdjustCommandExecutor.prototype.removeGlobalCallbackParameter = function(params) {
    if ('key' in params) {
        var list = getValueFromKey(params, 'key');
        for (var i = 0; i < list.length; i += 1) {
            Adjust.removeGlobalCallbackParameter(list[i]);
        }
    }
};

AdjustCommandExecutor.prototype.removeGlobalPartnerParameter = function(params) {
    if ('key' in params) {
        var list = getValueFromKey(params, 'key');
        for (var i = 0; i < list.length; i += 1) {
            Adjust.removeGlobalPartnerParameter(list[i]);
        }
    }
};

AdjustCommandExecutor.prototype.removeGlobalCallbackParameters = function(params) {
    Adjust.removeGlobalCallbackParameters();
};

AdjustCommandExecutor.prototype.removeGlobalPartnerParameters = function(params) {
    Adjust.removeGlobalPartnerParameters();
};

AdjustCommandExecutor.prototype.setPushToken = function(params) {
    var token = getFirstParameterValue(params, 'pushToken');
    Adjust.setPushToken(token);
};

AdjustCommandExecutor.prototype.openDeeplink = function(params) {
    var deeplink = getFirstParameterValue(params, 'deeplink');
    Adjust.processDeeplink(deeplink);
};

AdjustCommandExecutor.prototype.gdprForgetMe = function(params) {
    Adjust.gdprForgetMe();
};

AdjustCommandExecutor.prototype.sendReferrer = function(params) {
    var referrer = getFirstParameterValue(params, 'referrer');
    Adjust.setReferrer(referrer);
};

AdjustCommandExecutor.prototype.trackThirdPartySharing = function(params) {
    var isEnabled = null;
    if ('isEnabled' in params) {
        isEnabled = getFirstParameterValue(params, 'isEnabled') == 'true';
    }
    var adjustThirdPartySharing = new AdjustThirdPartySharing(isEnabled);

    if ('granularOptions' in params) {
        var granularOptions = getValueFromKey(params, 'granularOptions');
        for (var i = 0; i < granularOptions.length; i += 3) {
            var partnerName = granularOptions[i];
            var key = granularOptions[i + 1];
            var value = granularOptions[i + 2];
            adjustThirdPartySharing.addGranularOption(partnerName, key, value);
        }
    }

    if ('partnerSharingSettings' in params) {
        var partnerSharingSettings = getValueFromKey(params, 'partnerSharingSettings');
        for (var i = 0; i < partnerSharingSettings.length; i += 3) {
            var partnerName = partnerSharingSettings[i];
            var key = partnerSharingSettings[i + 1];
            var value = partnerSharingSettings[i + 2] === 'true';
            adjustThirdPartySharing.addPartnerSharingSetting(partnerName, key, value);
        }
    }

    Adjust.trackThirdPartySharing(adjustThirdPartySharing);
};

AdjustCommandExecutor.prototype.trackMeasurementConsent = function(params) {
    var isEnabled = getFirstParameterValue(params, 'isEnabled') == 'true';
    Adjust.trackMeasurementConsent(isEnabled);
};

AdjustCommandExecutor.prototype.trackAppStoreSubscription = function(params) {
    if (Platform.OS === 'ios') {
        var price = getFirstParameterValue(params, 'revenue');
        var currency = getFirstParameterValue(params, 'currency');
        var transactionId = getFirstParameterValue(params, 'transactionId');
        var transactionDate = getFirstParameterValue(params, 'transactionDate');
        var salesRegion = getFirstParameterValue(params, 'salesRegion');

        var subscription = new AdjustAppStoreSubscription(price, currency, transactionId);
        subscription.setTransactionDate(transactionDate);
        subscription.setSalesRegion(salesRegion);

        if ('callbackParams' in params) {
            var callbackParams = getValueFromKey(params, 'callbackParams');
            for (var i = 0; i < callbackParams.length; i += 2) {
                var key = callbackParams[i];
                var value = callbackParams[i + 1];
                subscription.addCallbackParameter(key, value);
            }
        }

        if ('partnerParams' in params) {
            var partnerParams = getValueFromKey(params, 'partnerParams');
            for (var i = 0; i < partnerParams.length; i += 2) {
                var key = partnerParams[i];
                var value = partnerParams[i + 1];
                subscription.addPartnerParameter(key, value);
            }
        }

        Adjust.trackAppStoreSubscription(subscription);

    } else if (Platform.OS === 'android') {
        var price = getFirstParameterValue(params, 'revenue');
        var currency = getFirstParameterValue(params, 'currency');
        var sku = getFirstParameterValue(params, 'productId');
        var purchaseToken = getFirstParameterValue(params, 'purchaseToken');
        var orderId = getFirstParameterValue(params, 'transactionId');
        var purchaseTime = getFirstParameterValue(params, 'transactionDate');

        var subscription = new AdjustPlayStoreSubscription(price, currency, sku, orderId, signature, purchaseToken);
        subscription.setPurchaseTime(purchaseTime);

        if ('callbackParams' in params) {
            var callbackParams = getValueFromKey(params, 'callbackParams');
            for (var i = 0; i < callbackParams.length; i += 2) {
                var key = callbackParams[i];
                var value = callbackParams[i + 1];
                subscription.addCallbackParameter(key, value);
            }
        }

        if ('partnerParams' in params) {
            var partnerParams = getValueFromKey(params, 'partnerParams');
            for (var i = 0; i < partnerParams.length; i += 2) {
                var key = partnerParams[i];
                var value = partnerParams[i + 1];
                subscription.addPartnerParameter(key, value);
            }
        }

        Adjust.trackPlayStoreSubscription(subscription);
    }
};

AdjustCommandExecutor.prototype.trackAdRevenue = function(params) {
    var adjustAdRevenue;
    var source = getFirstParameterValue(params, 'adRevenueSource');
    // weird behaviour with null value
    // double check this later to handle it on event instance level
    if (typeof source !== 'string') {
        return;
    }
    adjustAdRevenue = new AdjustAdRevenue(source);

    if ('revenue' in params) {
        var revenueParams = getValueFromKey(params, 'revenue');
        var currency = revenueParams[0];
        var revenue = parseFloat(revenueParams[1]);
        adjustAdRevenue.setRevenue(revenue, currency);
    }

    if ('adImpressionsCount' in params) {
        var adImpressionsCount = getFirstParameterValue(params, 'adImpressionsCount');
        var adImpressionsCountValue = parseInt(adImpressionsCount);
        adjustAdRevenue.setAdImpressionsCount(adImpressionsCountValue);
    }

    if ('adRevenueUnit' in params) {
        var adRevenueUnit = getFirstParameterValue(params, 'adRevenueUnit');

        // test server might set adRevenueUnit to be undefined/null, which gets
        // serialized/deserialized as string 'null', leading to failed test
        if (adRevenueUnit === 'null') {
            adRevenueUnit = null;
        }

        adjustAdRevenue.setAdRevenueUnit(adRevenueUnit);
    }

    if ('adRevenuePlacement' in params) {
        var adRevenuePlacement = getFirstParameterValue(params, 'adRevenuePlacement');

        // test server might set adRevenuePlacement to be undefined/null, which gets
        // serialized/deserialized as string 'null', leading to failed test
        if (adRevenuePlacement === 'null') {
            adRevenuePlacement = null;
        }

        adjustAdRevenue.setAdRevenuePlacement(adRevenuePlacement);
    }

    if ('adRevenueNetwork' in params) {
        var adRevenueNetwork = getFirstParameterValue(params, 'adRevenueNetwork');

        // test server might set adRevenueNetwork to be undefined/null, which gets
        // serialized/deserialized as string 'null', leading to failed test
        if (adRevenueNetwork === 'null') {
            adRevenueNetwork = null;
        }

        adjustAdRevenue.setAdRevenueNetwork(adRevenueNetwork);
    }

    if ('callbackParams' in params) {
        var callbackParams = getValueFromKey(params, 'callbackParams');
        for (var i = 0; i < callbackParams.length; i += 2) {
            var key = callbackParams[i];
            var value = callbackParams[i + 1];
            adjustAdRevenue.addCallbackParameter(key, value);
        }
    }

    if ('partnerParams' in params) {
        var partnerParams = getValueFromKey(params, 'partnerParams');
        for (var i = 0; i < partnerParams.length; i += 2) {
            var key = partnerParams[i];
            var value = partnerParams[i + 1];
            adjustAdRevenue.addPartnerParameter(key, value);
        }
    }
    Adjust.trackAdRevenue(adjustAdRevenue);
};

AdjustCommandExecutor.prototype.getLastDeeplink = function(params) {
    if (Platform.OS === 'iOS') {
        var _this = this;
        Adjust.getLastDeeplink(function(lastDeeplink) {
            AdjustSdkTest.addInfoToSend('last_deeplink', lastDeeplink);
            AdjustSdkTest.sendInfoToServer(_this.extraPath);
        });
    }
};

AdjustCommandExecutor.prototype.verifyPurchase = function(params) {
    if (Platform.OS === 'ios') {
        var productId = getFirstParameterValue(params, 'productId');
        var transactionId = getFirstParameterValue(params, 'transactionId');
        var purchase = new AdjustAppStorePurchase(productId, transactionId);

        var _this = this;
        Adjust.verifyAppStorePurchase(purchase, function(verificationInfo) {
            AdjustSdkTest.addInfoToSend('verification_status', verificationInfo.verificationStatus);
            AdjustSdkTest.addInfoToSend('code', verificationInfo.code);
            AdjustSdkTest.addInfoToSend('message', verificationInfo.message);
            AdjustSdkTest.sendInfoToServer(_this.extraPath);
        });
    } else if (Platform.OS === 'android') {
        var productId = getFirstParameterValue(params, 'productId');
        var purchaseToken = getFirstParameterValue(params, 'purchaseToken');
        var purchase = new AdjustPlayStorePurchase(productId, purchaseToken);

        var _this = this;
        Adjust.verifyPlayStorePurchase(purchase, function(verificationInfo) {
            AdjustSdkTest.addInfoToSend('verification_status', verificationInfo.verificationStatus);
            AdjustSdkTest.addInfoToSend('code', verificationInfo.code);
            AdjustSdkTest.addInfoToSend('message', verificationInfo.message);
            AdjustSdkTest.sendInfoToServer(_this.extraPath);
        });
    }
};

AdjustCommandExecutor.prototype.verifyTrack = function(params) {
    var _this = this;
    this.event(params);
    var eventNumber = 0;
    if (Platform.OS === 'ios') {
        if ('eventName' in params) {
            var eventName = getFirstParameterValue(params, 'eventName');
            eventNumber = parseInt(eventName.substr(eventName.length - 1))
        }
        var adjustEvent = this.savedEvents[eventNumber];
        Adjust.verifyAndTrackAppStorePurchase(adjustEvent, function(verificationResult) {
            AdjustSdkTest.addInfoToSend('verification_status', verificationResult.verificationStatus);
            AdjustSdkTest.addInfoToSend('code', verificationResult.code);
            AdjustSdkTest.addInfoToSend('message', verificationResult.message);
            AdjustSdkTest.sendInfoToServer(_this.extraPath);
        });

    } else if (Platform.OS === 'android') {
        if ('eventName' in params) {
            var eventName = getFirstParameterValue(params, 'eventName');
            eventNumber = parseInt(eventName.substr(eventName.length - 1))
        }
        var adjustEvent = this.savedEvents[eventNumber];
        Adjust.verifyAndTrackPlayStorePurchase(adjustEvent, function(verificationResult) {
            AdjustSdkTest.addInfoToSend('verification_status', verificationResult.verificationStatus);
            AdjustSdkTest.addInfoToSend('code', verificationResult.code);
            AdjustSdkTest.addInfoToSend('message', verificationResult.message);
            AdjustSdkTest.sendInfoToServer(_this.extraPath);
        });
    }
   
    delete this.savedEvents[0];
};


AdjustCommandExecutor.prototype.processDeeplink = function(params) {
    var deeplink = getFirstParameterValue(params, 'deeplink');
    var _this = this;
    Adjust.processAndResolveDeeplink(deeplink, function(resolvedLink) {
        AdjustSdkTest.addInfoToSend('resolved_link', resolvedLink);
        AdjustSdkTest.sendInfoToServer(_this.extraPath);
    });
};

AdjustCommandExecutor.prototype.attributionGetter = function(params) {
    var _this = this;
    Adjust.getAttribution(function(attribution) {
        AdjustSdkTest.addInfoToSend('tracker_token', attribution.trackerToken);
        AdjustSdkTest.addInfoToSend('tracker_name', attribution.trackerName);
        AdjustSdkTest.addInfoToSend('network', attribution.network);
        AdjustSdkTest.addInfoToSend('campaign', attribution.campaign);
        AdjustSdkTest.addInfoToSend('adgroup', attribution.adgroup);
        AdjustSdkTest.addInfoToSend('creative', attribution.creative);
        AdjustSdkTest.addInfoToSend('click_label', attribution.clickLabel);
        AdjustSdkTest.addInfoToSend('cost_type', attribution.costType);
        AdjustSdkTest.addInfoToSend('cost_amount', attribution.costAmount);
        AdjustSdkTest.addInfoToSend('cost_currency', attribution.costCurrency);
        AdjustSdkTest.addInfoToSend('fbInstallReferrer', attribution.fbInstallReferrer);
        AdjustSdkTest.sendInfoToServer(_this.extraPath);
    });
};

// Util methods
function getValueFromKey(params, key) {
    if (key in params) {
        return params[key];
    }

    return null;
}

function getFirstParameterValue(params, key) {
    if (key in params) {
        var param = params[key];

        if (param != null && param.length >= 1) {
            return param[0];
        }
    }

    return null;
}