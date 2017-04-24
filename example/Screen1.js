/**
 * Example React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';
import { AppRegistry, StyleSheet, Text, TouchableHighlight, View, Linking, Navigator } from 'react-native';

export default class Screen1 extends Component {
    componentDidMount() {
        Linking.addEventListener('url', this.handleDeepLink);
        Linking.getInitialURL().then((url) => {
            if (url) {
                this.handleDeepLink({ url });
            }
        })
    }

    componentWillMount() {
        this._onPress_trackSimpleEvent   = this._onPress_trackSimpleEvent.bind(this);
        this._onPress_trackRevenueEvent  = this._onPress_trackRevenueEvent.bind(this);
        this._onPress_trackCallbackEvent = this._onPress_trackCallbackEvent.bind(this);
        this._onPress_trackPartnerEvent  = this._onPress_trackPartnerEvent.bind(this);
        this._onPress_toggleOfflineMode  = this._onPress_toggleOfflineMode.bind(this);
        this._onPress_toggleSdk          = this._onPress_toggleSdk.bind(this);
        this._onPress_isSdkEnabled       = this._onPress_isSdkEnabled.bind(this);
        this._onPress_jumpToNextPage     = this._onPress_jumpToNextPage.bind(this);
        this._onPress_getIds             = this._onPress_getIds.bind(this);
        this._onPress_sendPushToken      = this._onPress_sendPushToken.bind(this);

        this.isOffline = false;

        var adjustConfig = new AdjustConfig("2fm9gkqubvpc", AdjustConfig.EnvironmentSandbox);
        adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
        adjustConfig.setDelayStart(6.0);
        adjustConfig.setShouldLaunchDeeplink(true);
        adjustConfig.setSendInBackground(true);

        // adjustConfig.setEventBufferingEnabled(true);
        // adjustConfig.setUserAgent("little_bunny_foo_foo");

        adjustConfig.setAttributionCallbackListener(function(attribution) {
            console.log(">>> Attribution callback received");

            console.log("Tracker token = " + attribution.trackerToken);
            console.log("Tracker name = " + attribution.trackerName);
            console.log("Network = " + attribution.network);
            console.log("Campaign = " + attribution.campaign);
            console.log("Adgroup = " + attribution.adgroup);
            console.log("Creative = " + attribution.creative);
            console.log("Click label = " + attribution.clickLabel);
            console.log("Adid = " + attribution.adid);
        });

        adjustConfig.setEventTrackingSucceededCallbackListener(function(eventSuccess) {
            console.log(">>> Event tracking succeeded callback received");

            console.log("Message: " + eventSuccess.message);
            console.log("Timestamp: " + eventSuccess.timestamp);
            console.log("Adid: " + eventSuccess.adid);
            console.log("Event token: " + eventSuccess.eventToken);
            console.log("JSON response: " + eventSuccess.jsonResponse );
        });

        adjustConfig.setEventTrackingFailedCallbackListener(function(eventFailed) {
            console.log(">>> Event tracking failed callback received");

            console.log("Message: " + eventFailed.message);
            console.log("Timestamp: " + eventFailed.timestamp);
            console.log("Adid: " + eventFailed.adid);
            console.log("Event token: " + eventFailed.eventToken);
            console.log("Will retry: " + eventFailed.willRetry);
            console.log("JSON response: " + eventFailed.jsonResponse);
        });

        adjustConfig.setSessionTrackingSucceededCallbackListener(function(sessionSuccess) {
            console.log(">>> Session tracking succeeded callback received");

            console.log("Message: " + sessionSuccess.message);
            console.log("Timestamp: " + sessionSuccess.timestamp);
            console.log("Adid: " + sessionSuccess.adid);
            console.log("JSON response: " + sessionSuccess.jsonResponse);
        });

        adjustConfig.setSessionTrackingFailedCallbackListener(function(sessionFailed) {
            console.log(">>> Session tracking failed callback received");

            console.log("Message: " + sessionFailed.message);
            console.log("Timestamp: " + sessionFailed.timestamp);
            console.log("Adid: " + sessionFailed.adid);
            console.log("Will retry: " + sessionFailed.willRetry);
            console.log("JSON response: " + sessionFailed.jsonResponse);
        });

        adjustConfig.setDeferredDeeplinkCallbackListener(function(uri) {
            console.log(">>> Deferred Deeplink Callback received");

            console.log("URL: " + uri.uri);

            Adjust.appWillOpenUrl(uri.uri);
        });

        Adjust.addSessionCallbackParameter("dummy_foo", "dummy_bar");
        Adjust.addSessionCallbackParameter("dummy_foo_foo", "dummy_bar");

        Adjust.addSessionPartnerParameter("dummy_foo", "dummy_bar");
        Adjust.addSessionPartnerParameter("dummy_foo_foo", "dummy_bar");

        Adjust.removeSessionCallbackParameter("dummy_foo");
        Adjust.removeSessionPartnerParameter("dummy_foo");

        // Adjust.resetSessionCallbackParameters();
        // Adjust.resetSessionPartnerParameters();

        // Adjust.setPushToken("bunny_foo_foo");

        Adjust.create(adjustConfig);

        Adjust.sendFirstPackages();
    } 

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleDeepLink);
    }

    handleDeepLink(e) {
        Adjust.appWillOpenUrl(e.url);
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

                <TouchableHighlight
                    style={styles.buttons}
                    onPress={this._onPress_sendPushToken}>
                    <Text>Send Push Token</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.buttons}
                    onPress={this._onPress_getIds}>
                    <Text>Get Ids</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.buttons}
                    onPress={this._onPress_jumpToNextPage}>
                    <Text>Jump to Next Page</Text>
                </TouchableHighlight>
            </View>
            );
    }

    _onPress_trackSimpleEvent() {
        Adjust.isEnabled((isEnabled) => {
            if (isEnabled) {
                var adjustEvent = new AdjustEvent("g3mfiw");
                Adjust.trackEvent(adjustEvent);
            } else {
                console.log(">>> SDK is disabled");
            }
        });
    }

    _onPress_trackRevenueEvent() {
        Adjust.isEnabled((isEnabled) => {
            if (isEnabled) {
                var adjustEvent = new AdjustEvent("a4fd35");

                adjustEvent.setRevenue(10.0, "USD");
                adjustEvent.setTransactionId("DUMMY_TRANSACTION_ID");

                Adjust.trackEvent(adjustEvent);
            } else {
                console.log(">>> SDK is disabled");
            }
        });
    }

    _onPress_trackCallbackEvent() {
        Adjust.isEnabled((isEnabled) => {
            if (isEnabled) {
                var adjustEvent = new AdjustEvent("34vgg9");

                adjustEvent.addCallbackParameter("DUMMY_KEY", "DUMMY_VALUE");
                adjustEvent.addCallbackParameter("DUMMY_KEY_2", "DUMMY_VALUE_2");

                Adjust.trackEvent(adjustEvent);
            } else {
                console.log(">>> SDK is disabled");
            }
        });
    }

    _onPress_trackPartnerEvent() {
        Adjust.isEnabled((isEnabled) => {
            if (isEnabled) {
                var adjustEvent = new AdjustEvent("w788qs");

                adjustEvent.addPartnerParameter("DUMMY_KEY", "DUMMY_VALUE");
                adjustEvent.addPartnerParameter("DUMMY_KEY_2", "DUMMY_VALUE_2");

                Adjust.trackEvent(adjustEvent);
            } else {
                console.log(">>> SDK is disabled");
            }
        });
    }

    _onPress_toggleOfflineMode() {
        Adjust.isEnabled((isEnabled) => {
            if (isEnabled) {
                this.isOffline = !this.isOffline;
                Adjust.setOfflineMode(this.isOffline);
            } else {
                console.log(">>> SDK is disabled");
            }
        });
    }

    _onPress_toggleSdk() {
        Adjust.isEnabled( (isEnabled) => {
            if (isEnabled) {
                Adjust.setEnabled(false);
                console.log(">>> SDK disabled");
            } else {
                Adjust.setEnabled(true);
                console.log(">>> SDK enabled");
            }
        });
    }

    _onPress_isSdkEnabled() {
        Adjust.isEnabled( (isEnabled) => {
            if (isEnabled) {
                console.log(">>> SDK is enabled");
            } else {
                console.log(">>> SDK is disabled");
            }
        });
    }

    _onPress_sendPushToken() {
        Adjust.isEnabled((isEnabled) => {
            if (isEnabled) {
                Adjust.setPushToken("bunny_foo_foo");
            } else {
                console.log(">>> SDK is disabled");
            }
        });
    }

    _onPress_getIds() {
        Adjust.isEnabled((isEnabled) => {
            if (isEnabled) {
                Adjust.getAdid((adid) => {
                    console.log(">>> Adid = " + adid);
                });

                Adjust.getIdfa((idfa) => {
                    console.log(">>> IDFA = " + idfa);
                });

                Adjust.getGoogleAdId((googleAdId) => {
                    console.log(">>> Google Ad Id = " + googleAdId);
                });

                Adjust.getAttribution((attribution) => {
                    console.log(">>> Attribution:");
                    console.log("Tracker token = " + attribution.trackerToken);
                    console.log("Tracker name = " + attribution.trackerName);
                    console.log("Network = " + attribution.network);
                    console.log("Campaign = " + attribution.campaign);
                    console.log("Adgroup = " + attribution.adgroup);
                    console.log("Creative = " + attribution.creative);
                    console.log("Click label = " + attribution.clickLabel);
                    console.log("Adid = " + attribution.adid);
                });
            } else {
                console.log(">>> SDK is disabled");
            }
        });
    }

    _onPress_jumpToNextPage() {
        this.props.navigator.push({
            name: 'screen_2',
            data: {}
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
        margin: 9,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    buttons: {
        margin: 5,
        padding: 5
    }
});
