/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var Adjust = require('react-native-adjust');
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

export default class sample extends Component {
    constructor(props) {
        super(props);

        this._onPress_trackSimpleEvent   = this._onPress_trackSimpleEvent.bind(this);
        this._onPress_trackRevenueEvent  = this._onPress_trackRevenueEvent.bind(this);
        this._onPress_trackCallbackEvent = this._onPress_trackCallbackEvent.bind(this);
        this._onPress_trackPartnerEvent  = this._onPress_trackPartnerEvent.bind(this);
        this._onPress_toggleOfflineMode  = this._onPress_toggleOfflineMode.bind(this);
        this._onPress_toggleSdk          = this._onPress_toggleSdk.bind(this);
        this._onPress_isSdkEnabled       = this._onPress_isSdkEnabled.bind(this);

        this.isOffline = false;
    } 

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Adjust SDK
                </Text>

                <TouchableHighlight
                    onPress={this._onPress_trackSimpleEvent}>
                    <Text>Track Simple Event</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this._onPress_trackRevenueEvent}>
                    <Text>Track Revenue Event</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this._onPress_trackCallbackEvent}>
                    <Text>Track Callback Event</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this._onPress_trackPartnerEvent}>
                    <Text>Track Partner Event</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this._onPress_toggleOfflineMode}>
                    <Text>Toggle Offline Mode</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this._onPress_toggleSdk}>
                    <Text>Toggle SDK</Text>
                </TouchableHighlight>

                <TouchableHighlight
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
                //var adjustEvent = new AdjustEvent("uqg17r");
                //Adjust.trackEvent(adjustEvent);
                Adjust.trackEvent(null);
            } else {
                console.log(">> SDK is disabled");
            }
        });
    }

    _onPress_trackRevenueEvent() {
        console.log(">> trackRevenueEvent()");

        Adjust.isEnabled( (isEnabled) => {
            if(isEnabled) {
                //var adjustEvent = new AdjustEvent("71iltz");
                //Adjust.trackEvent(adjustEvent);
                Adjust.trackEvent(null);
            } else {
                console.log(">> SDK is disabled");
            }
        });
    }

    _onPress_trackCallbackEvent() {
        console.log(">> trackCallbackEvent()");

        Adjust.isEnabled( (isEnabled) => {
            if(isEnabled) {
                //var adjustEvent = new AdjustEvent("1ziip1");
                //Adjust.trackEvent(adjustEvent);
                Adjust.trackEvent(null);
            } else {
                console.log(">> SDK is disabled");
            }
        });
    }

    _onPress_trackPartnerEvent() {
        console.log(">> trackPartnerEvent()");

        Adjust.isEnabled( (isEnabled) => {
            if(isEnabled) {
                //var adjustEvent = new AdjustEvent("9s4lqn");
                //Adjust.trackEvent(adjustEvent);
                Adjust.trackEvent(null);
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
});

AppRegistry.registerComponent('sample', () => sample);
