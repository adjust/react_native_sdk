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
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <TouchableHighlight
                    style={styles.buttons}
                    onPress={this._onPress_trackSimpleEvent}>
                    <Text>Track Simple Event</Text>
                </TouchableHighlight>
            </View>
            );
    }

    _onPress_trackSimpleEvent() {
        console.log(">> trackSimpleEvent()");
        Adjust.test();

        //Adjust.isEnabled( (isEnabled) => {
            //if(isEnabled) {
                //var adjustEvent = new AdjustEvent("uqg17r");
                //Adjust.trackEvent(adjustEvent);
            //} else {
                //console.log(">> SDK is disabled");
            //}
        //});
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
