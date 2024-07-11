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
  TouchableHighlight,
  Platform,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  Adjust,
  AdjustEvent,
  AdjustConfig
} from 'react-native-adjust';
import { AdjustOaid } from 'react-native-adjust-oaid';

const App: () => React$Node = () => {
  Adjust.getSdkVersion(function(sdkVersion) {
    console.log("Adjust SDK version: " + sdkVersion);
  });

  const adjustConfig = new AdjustConfig("2fm9gkqubvpc", AdjustConfig.EnvironmentSandbox);
  adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
  // adjustConfig.deactivateSKAdNetworkHandling();
  // adjustConfig.setNeedsCost(true);
  // adjustConfig.setAttConsentWaitingInterval(16);
  // adjustConfig.setFinalAndroidAttributionEnabled(true);

  adjustConfig.setAttributionCallbackListener(function(attribution) {
    console.log("Attribution callback received");
    console.log("Tracker token = " + attribution.trackerToken);
    console.log("Tracker name = " + attribution.trackerName);
    console.log("Network = " + attribution.network);
    console.log("Campaign = " + attribution.campaign);
    console.log("Adgroup = " + attribution.adgroup);
    console.log("Creative = " + attribution.creative);
    console.log("Click label = " + attribution.clickLabel);
    console.log("Cost type = " + attribution.costType);
    console.log("Cost amount = " + attribution.costAmount);
    console.log("Cost currency = " + attribution.costCurrency);
  });

  adjustConfig.setEventTrackingSucceededCallbackListener(function(eventSuccess) {
    console.log("Event tracking succeeded callback received");
    console.log("Message: " + eventSuccess.message);
    console.log("Timestamp: " + eventSuccess.timestamp);
    console.log("Adid: " + eventSuccess.adid);
    console.log("Event token: " + eventSuccess.eventToken);
    console.log("Callback Id: " + eventSuccess.callbackId);
    console.log("JSON response: " + eventSuccess.jsonResponse );
  });

  adjustConfig.setEventTrackingFailedCallbackListener(function(eventFailed) {
    console.log("Event tracking failed callback received");
    console.log("Message: " + eventFailed.message);
    console.log("Timestamp: " + eventFailed.timestamp);
    console.log("Adid: " + eventFailed.adid);
    console.log("Event token: " + eventFailed.eventToken);
    console.log("Callback Id: " + eventFailed.callbackId);
    console.log("Will retry: " + eventFailed.willRetry);
    console.log("JSON response: " + eventFailed.jsonResponse);
  });

  adjustConfig.setSessionTrackingSucceededCallbackListener(function(sessionSuccess) {
    console.log("Session tracking succeeded callback received");
    console.log("Message: " + sessionSuccess.message);
    console.log("Timestamp: " + sessionSuccess.timestamp);
    console.log("Adid: " + sessionSuccess.adid);
    console.log("JSON response: " + sessionSuccess.jsonResponse);
  });

  adjustConfig.setSessionTrackingFailedCallbackListener(function(sessionFailed) {
    console.log("Session tracking failed callback received");
    console.log("Message: " + sessionFailed.message);
    console.log("Timestamp: " + sessionFailed.timestamp);
    console.log("Adid: " + sessionFailed.adid);
    console.log("Will retry: " + sessionFailed.willRetry);
    console.log("JSON response: " + sessionFailed.jsonResponse);
  });

  adjustConfig.setDeferredDeeplinkCallbackListener(function(uri) {
    console.log("Deferred Deeplink Callback received");
    console.log("URL: " + uri.uri);
  });

  adjustConfig.setSkadConversionValueUpdatedCallbackListener(function(conversionValue) {
    console.log("Conversion value updated callback recveived");
    console.log("Conversion value: " + conversionValue.conversionValue);
  });

  Adjust.addGlobalCallbackParameter("scpk1", "scpv1");
  Adjust.addGlobalCallbackParameter("scpk2", "scpv2");

  Adjust.addGlobalPartnerParameter("sppk1", "sppv1");
  Adjust.addGlobalPartnerParameter("sppk2", "sppv2");

  Adjust.removeGlobalCallbackParameter("scpk1");
  Adjust.removeGlobalPartnerParameter("sppk2");

  // Adjust.removeGlobalCallbackParameters();
  // Adjust.removeGlobalPartnerParameters();

  Adjust.requestAppTrackingAuthorizationWithCompletionHandler(function(status) {
    console.log("Authorization status update");
    switch (status) {
        case 0:
            // ATTrackingManagerAuthorizationStatusNotDetermined case
            console.log("Authorization status: ATTrackingManagerAuthorizationStatusNotDetermined");
            break;
        case 1:
            // ATTrackingManagerAuthorizationStatusRestricted case
            console.log("Authorization status: ATTrackingManagerAuthorizationStatusRestricted");
            break;
        case 2:
            // ATTrackingManagerAuthorizationStatusDenied case
            console.log("Authorization status: ATTrackingManagerAuthorizationStatusDenied");
            break;
        case 3:
            // ATTrackingManagerAuthorizationStatusAuthorized case
            console.log("Authorization status: ATTrackingManagerAuthorizationStatusAuthorized");
            break;
    }
  });

  if (Platform.OS === "android") {
    AdjustOaid.readOaid();
  }
  Adjust.initSdk(adjustConfig);

  function componentDidMount() {
    Linking.addEventListener('url', this.handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleDeepLink({ url });
      }
    })
  }

  function componentWillUnmount() {
    Adjust.componentWillUnmount();
    Linking.removeEventListener('url', this.handleDeepLink);
  }

  function handleDeepLink(e) {
    Adjust.processDeeplink(e.url);
  }

  function _onPress_trackSimpleEvent() {
    var adjustEvent = new AdjustEvent("g3mfiw");
    Adjust.trackEvent(adjustEvent);
    Adjust.updateConversionValue(6);
    Adjust.getAppTrackingAuthorizationStatus(function(status) {
      console.log("Authorization status = " + status);
    });
  }

  function _onPress_trackRevenueEvent() {
    var adjustEvent = new AdjustEvent("a4fd35");
    adjustEvent.setRevenue(10.0, "USD");
    adjustEvent.setTransactionId("DUMMY_TRANSACTION_ID");
    Adjust.trackEvent(adjustEvent);
  }

  function _onPress_trackCallbackEvent() {
    var adjustEvent = new AdjustEvent("34vgg9");
    adjustEvent.addCallbackParameter("DUMMY_KEY_1", "DUMMY_VALUE_1");
    adjustEvent.addCallbackParameter("DUMMY_KEY_2", "DUMMY_VALUE_2");
    Adjust.trackEvent(adjustEvent);
  }

  function _onPress_trackPartnerEvent() {
    var adjustEvent = new AdjustEvent("w788qs");
    adjustEvent.addPartnerParameter("DUMMY_KEY_1", "DUMMY_VALUE_1");
    adjustEvent.addPartnerParameter("DUMMY_KEY_2", "DUMMY_VALUE_2");
    Adjust.trackEvent(adjustEvent);
  }

  function _onPress_enableOfflineMode() {
    Adjust.switchToOfflineMode();
  }

  function _onPress_disableOfflineMode() {
    Adjust.switchBackToOnlineMode();
  }

  function _onPress_enableSdk() {
    Adjust.enable();
  }

  function _onPress_disableSdk() {
    Adjust.disable();
  }

  function _onPress_getIds() {
    Adjust.getAdid((adid) => {
      console.log("Adid = " + adid);
    });

    Adjust.getIdfa((idfa) => {
      console.log("IDFA = " + idfa);
    });

    Adjust.getIdfv((idfv) => {
      console.log("IDFV = " + idfv);
    });

    Adjust.getGoogleAdId((googleAdId) => {
      console.log("Google Ad Id = " + googleAdId);
    });

    Adjust.getAmazonAdId((amazonAdId) => {
      console.log("Amazon Ad Id = " + amazonAdId);
    });

    Adjust.getAttribution((attribution) => {
      console.log("Attribution:");
      console.log("Tracker token = " + attribution.trackerToken);
      console.log("Tracker name = " + attribution.trackerName);
      console.log("Network = " + attribution.network);
      console.log("Campaign = " + attribution.campaign);
      console.log("Adgroup = " + attribution.adgroup);
      console.log("Creative = " + attribution.creative);
      console.log("Click label = " + attribution.clickLabel);
      console.log("Adid = " + attribution.adid);
    });
  }

  function _onPress_isSdkEnabled() {
    Adjust.isEnabled( (isEnabled) => {
      if (isEnabled) {
        console.log("SDK is enabled");
      } else {
        console.log("SDK is disabled");
      }
    });
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={_onPress_trackSimpleEvent}>
          <Text>Track Simple Event</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={_onPress_trackRevenueEvent}>
          <Text>Track Revenue Event</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={_onPress_trackCallbackEvent}>
          <Text>Track Callback Event</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={_onPress_trackPartnerEvent}>
          <Text>Track Partner Event</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={_onPress_enableOfflineMode}>
          <Text>Enable Offline Mode</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={_onPress_disableOfflineMode}>
          <Text>Disable Offline Mode</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={_onPress_enableSdk}>
          <Text>Enable SDK</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={_onPress_disableSdk}>
          <Text>Disable SDK</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={_onPress_getIds}>
          <Text>Get Ids</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={_onPress_isSdkEnabled}>
          <Text>is SDK Enabled?</Text>
        </TouchableHighlight>
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
  button: {
    alignItems: 'center',
    backgroundColor: '#61D4FB',
    padding: 10,
    width: '60%',
    height: 40,
    margin: 10,
  },
});

export default App;
