/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeEventEmitter,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  CommandExecutor
} from './command_executor.js';
import {
  Adjust,
  AdjustEvent,
  AdjustConfig
} from 'react-native-adjust';

const App: () => React$Node = () => {
  const {
    NativeModules,
  } = require('react-native');

  const AdjustSdkTest = NativeModules.AdjustSdkTest;

  let AdjustSdkTestEmitter = null;
  let emitterSubscription = null;
  if (Platform.OS === "android") {
    AdjustSdkTestEmitter = new NativeEventEmitter(NativeModules.AdjustSdkTest);
  } else if (Platform.OS === "ios") {
    AdjustSdkTestEmitter = new NativeEventEmitter(NativeModules.ASTEventEmitter);
  }

  var urlOverwrite = "";
  var ipAddress = "192.168.86.80";
  if (Platform.OS === "android") {
    urlOverwrite = "https://" + ipAddress + ":8443";
  } else if (Platform.OS === "ios") {
    urlOverwrite = "http://" + ipAddress + ":8080";
  }
  var controlUrl = "ws://" + ipAddress + ":1987";

  // AdjustSdkTest.addTestDirectory("tracking-domain");
  // AdjustSdkTest.addTest("Test_TrackingDomain_not_determined");
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
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
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
