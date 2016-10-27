/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    Text,
    View
} from 'react-native';

export default class sample extends Component {
    componentWillMount() {

        this._onPress_trackSimpleEvent   = this._onPress_trackSimpleEvent.bind(this);
        this._onPress_trackRevenueEvent  = this._onPress_trackRevenueEvent.bind(this);
        this._onPress_trackCallbackEvent = this._onPress_trackCallbackEvent.bind(this);
        this._onPress_trackPartnerEvent  = this._onPress_trackPartnerEvent.bind(this);
        this._onPress_toggleOfflineMode  = this._onPress_toggleOfflineMode.bind(this);
        this._onPress_toggleSdk          = this._onPress_toggleSdk.bind(this);
        this._onPress_isSdkEnabled       = this._onPress_isSdkEnabled.bind(this);

        this.isOffline = false;

        var adjustConfig = new AdjustConfig("rb4g27fje5ej", AdjustConfig.EnvironmentSandbox);

        adjustConfig.setAttributionCallbackListener(function(attribution) {
        console.log(">>> attribution callback received");

        console.log("Tracker token = " + attribution.trackerToken);
        console.log("Tracker name = " + attribution.trackerName);
        console.log("Network = " + attribution.network);
        console.log("Campaign = " + attribution.campaign);
        console.log("Adgroup = " + attribution.adgroup);
        console.log("Creative = " + attribution.creative);
        console.log("Click label = " + attribution.clickLabel);
        });

        adjustConfig.setEventTrackingSucceededCallbackListener(function(eventSuccess) {
        console.log(">>> event tracking succeeded callback received");

        console.log("message: " + eventSuccess.message);
        console.log("timestamp: " + eventSuccess.timestamp);
        console.log("adid: " + eventSuccess.adid);
        console.log("eventToken: " + eventSuccess.eventToken);
        console.log("json response: " + eventSuccess.jsonResponse );
        });

        adjustConfig.setEventTrackingFailedCallbackListener(function(eventFailed) {
        console.log(">>> event tracking failed callback received");

        console.log("message: " + eventFailed.message);
        console.log("timestamp: " + eventFailed.timestamp);
        console.log("adid: " + eventFailed.adid);
        console.log("eventToken: " + eventFailed.eventToken);
        console.log("will retry: " + eventFailed.willRetry);
        console.log("json response: " + eventFailed.jsonResponse);
        });

        adjustConfig.setSessionTrackingSucceededCallbackListener(function(sessionSuccess) {
        console.log(">>> session tracking succeeded callback received");

        console.log("message: " + sessionSuccess.message);
        console.log("timestamp: " + sessionSuccess.timestamp);
        console.log("adid: " + sessionSuccess.adid);
        console.log("json response: " + sessionSuccess.jsonResponse);
        });

        adjustConfig.setSessionTrackingFailedCallbackListener(function(sessionFailed) {
        console.log(">>> session tracking failed callback received");

        console.log("message: " + sessionFailed.message);
        console.log("timestamp: " + sessionFailed.timestamp);
        console.log("adid: " + sessionFailed.adid);
        console.log("will retry: " + sessionFailed.willRetry);
        console.log("json response: " + sessionFailed.jsonResponse);
        });

        adjustConfig.setDeferredDeeplinkCallbackListener(function(uri) {
        console.log(">>> Deferred Deeplink Callback received");

        console.log("uri: " + uri.uri);
        });

        //adjustConfig.setShouldLaunchDeeplink(true);
        //adjustConfig.setEventBufferingEnabled(true);

        Adjust.addSessionCallbackParameter("dummy_foo", "dummy_bar");
        Adjust.addSessionCallbackParameter("dummy_foo_foo", "dummy_bar");

        Adjust.addSessionPartnerParameter("dummy_foo", "dummy_bar");
        Adjust.addSessionPartnerParameter("dummy_foo_foo", "dummy_bar");

        Adjust.removeSessionCallbackParameter("dummy_foo");
        Adjust.removeSessionPartnerParameter("dummy_foo");

        //Adjust.resetSessionCallbackParameters();
        //Adjust.resetSessionPartnerParameters();
        //Adjust.setPushToken("bunny_foo_foo");

        adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);

        adjustConfig.setDelayStart(3.0);
        adjustConfig.setUserAgent("little_bunny_foo_foo");

        Adjust.create(adjustConfig);

        //Adjust.sendFirstPackages();
    }

    componentWillUnmount() {
        console.log(">>> componentWillUnmount");
        //Adjust.componentWillUnmount();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Adjust SDK
                </Text>

                <TouchableHighlight
                    style={styles.buttons}
                    onPress={this._onPress_trackSimpleEvent}>
                    <Text>Track Simple Event</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.buttons}
                    onPress={this._onPress_trackRevenueEvent}>
                    <Text>Track Revenue Event</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.buttons}
                    onPress={this._onPress_trackCallbackEvent}>
                    <Text>Track Callback Event</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.buttons}
                    onPress={this._onPress_trackPartnerEvent}>
                    <Text>Track Partner Event</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.buttons}
                    onPress={this._onPress_toggleOfflineMode}>
                    <Text>Toggle Offline Mode</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.buttons}
                    onPress={this._onPress_toggleSdk}>
                    <Text>Toggle SDK</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.buttons}
                    onPress={this._onPress_isSdkEnabled}>
                    <Text>is SDK Enabled?</Text>
                </TouchableHighlight>
            </View>
            );
    }

    _onPress_trackSimpleEvent() {
        console.log(">> trackSimpleEvent()");

        Adjust.isEnabled( (isEnabled) => {
            if(isEnabled) {
                var adjustEvent = new AdjustEvent("uqg17r");

                Adjust.trackEvent(adjustEvent);
            } else {
                console.log(">> SDK is disabled");
            }
        });
    }

    _onPress_trackRevenueEvent() {
        console.log(">> trackRevenueEvent()");

        Adjust.isEnabled( (isEnabled) => {
            if(isEnabled) {
                var adjustEvent = new AdjustEvent("71iltz");
                adjustEvent.setRevenue(10.0, "USD");
                Adjust.trackEvent(adjustEvent);
            } else {
                console.log(">> SDK is disabled");
            }
        });
    }

    _onPress_trackCallbackEvent() {
        console.log(">> trackCallbackEvent()");

        Adjust.isEnabled( (isEnabled) => {
            if(isEnabled) {
                var adjustEvent = new AdjustEvent("1ziip1");
                var callbackParams = { "DUMMY_KEY": "DUMMY_VALUE", 
                    "DUMMY_KEY_2": "DUMMY_VALUE_2" };

                adjustEvent.setCallbackParameters(callbackParams);
                Adjust.trackEvent(adjustEvent);
            } else {
                console.log(">> SDK is disabled");
            }
        });
    }

    _onPress_trackPartnerEvent() {
        console.log(">> trackPartnerEvent()");

        Adjust.isEnabled( (isEnabled) => {
            if(isEnabled) {
                var adjustEvent = new AdjustEvent("9s4lqn");
                var partnerParams = { "DUMMY_KEY": "DUMMY_VALUE", 
                    "DUMMY_KEY_2": "DUMMY_VALUE_2" };

                adjustEvent.setPartnerParameters(partnerParams);
                Adjust.trackEvent(adjustEvent);
            } else {
                console.log(">> SDK is disabled");
            }
        });
    }

    _onPress_toggleOfflineMode() {
        Adjust.isEnabled( (isEnabled) => {
            if(isEnabled) {
                this.isOffline = !this.isOffline;
                console.log(">> toggleOfflineMode(): SDK is " + this.isOffline);
                Adjust.setOfflineMode(this.isOffline);
            } else {
                console.log(">> SDK is disabled");
            }
        });
    }

    _onPress_toggleSdk() {
        Adjust.isEnabled( (isEnabled) => {
            if(isEnabled) {
                console.log(">> toggleSdk(): SDK Disabled");
                Adjust.setEnabled(false);
            } else {
                console.log(">> toggleSdk(): SDK Enabled");
                Adjust.setEnabled(true);
                Adjust.setOfflineMode(false);
            }
        });
    }

    _onPress_isSdkEnabled() {
        Adjust.isEnabled( (isEnabled) => {
            if(isEnabled) {
                console.log(">> isSdkEnabled(): SDK is enabled");
            } else {
                console.log(">> isSdkEnabled(): SDK is disabled");
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    buttons: {
        margin: 10,
        padding: 10
    }
});

AppRegistry.registerComponent('sample', () => sample);
