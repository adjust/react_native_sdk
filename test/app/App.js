/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';
import {
  CommandExecutor
} from './command_executor.js';
import {
  Adjust
} from 'react-native-adjust';

const App: () => React$Node = () => {
  const AdjustSdkTest = NativeModules.AdjustSdkTest;

  let AdjustSdkTestEmitter = null;
  let emitterSubscription = null;
  if (Platform.OS === "android") {
    AdjustSdkTestEmitter = new NativeEventEmitter(NativeModules.AdjustSdkTest);
  } else if (Platform.OS === "ios") {
    AdjustSdkTestEmitter = new NativeEventEmitter(NativeModules.ASTEventEmitter);
  }

  var urlOverwrite = "";
  var ipAddress = "192.168.21.38";
  if (Platform.OS === "android") {
    urlOverwrite = "https://" + ipAddress + ":8443";
  } else if (Platform.OS === "ios") {
    urlOverwrite = "http://" + ipAddress + ":8080";
  }
  var controlUrl = "ws://" + ipAddress + ":1987";

  // AdjustSdkTest.addTestDirectory("third-party-sharing");
  // AdjustSdkTest.addTest("Test_Getters_tps_settings_bursts");
  // AdjustSdkTest.addTest("Test_VerifyTrack_delayed");
  // AdjustSdkTest.addTest("Test_SessionBackoff");
  // AdjustSdkTest.addTest("Test_RetryIn_sdk_click_queue");
  // AdjustSdkTest.addTest("Test_RetryIn_main_queue");
  // AdjustSdkTest.addTest("Test_Event_Status2xx4xx5xx_Without_ResponseMessage");
  Adjust.getSdkVersion(function (sdkVersion) {
    AdjustSdkTest.startTestSession(urlOverwrite, controlUrl, sdkVersion);
  });

  const commandExecutor = new CommandExecutor(urlOverwrite);
  emitterSubscription = AdjustSdkTestEmitter.addListener('command', (json) => {
    const className = json["className"];
    const functionName = json["functionName"];
    const params = json["params"];
    const order = json["order"];
    commandExecutor.scheduleCommand(className, functionName, params, order);
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native - Adjust SDK Test App!
        </Text>
      </View>
    </>
  );
};

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
});

export default App;
