  import React, { Component } from 'react';
  import { AppRegistry, StyleSheet, Text, View, Linking, TouchableHighlight } from 'react-native';
  import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';

  type Props = {};
  export default class App extends Component<Props> {
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
      this._onPress_enableOfflineMode  = this._onPress_enableOfflineMode.bind(this);
      this._onPress_disableOfflineMode = this._onPress_disableOfflineMode.bind(this);
      this._onPress_enableSdk          = this._onPress_enableSdk.bind(this);
      this._onPress_disableSdk         = this._onPress_disableSdk.bind(this);
      this._onPress_getIds             = this._onPress_getIds.bind(this);
      this._onPress_isSdkEnabled       = this._onPress_isSdkEnabled.bind(this);

      var adjustConfig = new AdjustConfig("2fm9gkqubvpc", AdjustConfig.EnvironmentSandbox);
      adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
      adjustConfig.setShouldLaunchDeeplink(true);
      adjustConfig.setSendInBackground(true);

      // adjustConfig.setDelayStart(6.0);
      // adjustConfig.setEventBufferingEnabled(true);
      // adjustConfig.setUserAgent("Custom Adjust User Agent");

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
        console.log("Callback Id: " + eventSuccess.callbackId);
        console.log("JSON response: " + eventSuccess.jsonResponse );
      });

      adjustConfig.setEventTrackingFailedCallbackListener(function(eventFailed) {
        console.log(">>> Event tracking failed callback received");

        console.log("Message: " + eventFailed.message);
        console.log("Timestamp: " + eventFailed.timestamp);
        console.log("Adid: " + eventFailed.adid);
        console.log("Event token: " + eventFailed.eventToken);
        console.log("Callback Id: " + eventFailed.callbackId);
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
      });

      Adjust.addSessionCallbackParameter("scpk1", "scpv1");
      Adjust.addSessionCallbackParameter("scpk2", "scpv2");

      Adjust.addSessionPartnerParameter("sppk1", "sppv1");
      Adjust.addSessionPartnerParameter("sppk2", "sppv2");

      Adjust.removeSessionCallbackParameter("scpk1");
      Adjust.removeSessionPartnerParameter("sppk2");

      // Adjust.resetSessionCallbackParameters();
      // Adjust.resetSessionPartnerParameters();

      Adjust.create(adjustConfig);

      // Adjust.sendFirstPackages();
    }

    componentWillUnmount() {
      Adjust.componentWillUnmount();
      Linking.removeEventListener('url', this.handleDeepLink);
    }

    handleDeepLink(e) {
      Adjust.appWillOpenUrl(e.url);
    }

    _onPress_trackSimpleEvent() {
      var adjustEvent = new AdjustEvent("g3mfiw");
      Adjust.trackEvent(adjustEvent);
    }

    _onPress_trackRevenueEvent() {
      var adjustEvent = new AdjustEvent("a4fd35");

      adjustEvent.setRevenue(10.0, "USD");
      adjustEvent.setTransactionId("DUMMY_TRANSACTION_ID");

      Adjust.trackEvent(adjustEvent);
    }

    _onPress_trackCallbackEvent() {
      var adjustEvent = new AdjustEvent("34vgg9");

      adjustEvent.addCallbackParameter("DUMMY_KEY_1", "DUMMY_VALUE_1");
      adjustEvent.addCallbackParameter("DUMMY_KEY_2", "DUMMY_VALUE_2");

      Adjust.trackEvent(adjustEvent);
    }

    _onPress_trackPartnerEvent() {
      var adjustEvent = new AdjustEvent("w788qs");

      adjustEvent.addPartnerParameter("DUMMY_KEY_1", "DUMMY_VALUE_1");
      adjustEvent.addPartnerParameter("DUMMY_KEY_2", "DUMMY_VALUE_2");

      Adjust.trackEvent(adjustEvent);
    }

    _onPress_enableOfflineMode() {
      Adjust.setOfflineMode(true);
    }

    _onPress_disableOfflineMode() {
      Adjust.setOfflineMode(false);
    }

    _onPress_enableSdk() {
      Adjust.setEnabled(true);
    }

    _onPress_disableSdk() {
      Adjust.setEnabled(false);
    }

    _onPress_getIds() {
      Adjust.getAdid((adid) => {
        console.log(">>> Adid = " + adid);
      });

      Adjust.getIdfa((idfa) => {
        console.log(">>> IDFA = " + idfa);
      });

      Adjust.getGoogleAdId((googleAdId) => {
        console.log(">>> Google Ad Id = " + googleAdId);
      });

      Adjust.getAmazonAdId((amazonAdId) => {
        console.log(">>> Amazon Ad Id = " + amazonAdId);
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

    render() {
      return (
        <View style={styles.container}>
        <TouchableHighlight
        style={styles.button}
        onPress={this._onPress_trackSimpleEvent}>
        <Text>Track Simple Event</Text>
        </TouchableHighlight>
        <TouchableHighlight
        style={styles.button}
        onPress={this._onPress_trackRevenueEvent}>
        <Text>Track Revenue Event</Text>
        </TouchableHighlight>
        <TouchableHighlight
        style={styles.button}
        onPress={this._onPress_trackCallbackEvent}>
        <Text>Track Callback Event</Text>
        </TouchableHighlight>
        <TouchableHighlight
        style={styles.button}
        onPress={this._onPress_trackPartnerEvent}>
        <Text>Track Partner Event</Text>
        </TouchableHighlight>
        <TouchableHighlight
        style={styles.button}
        onPress={this._onPress_enableOfflineMode}>
        <Text>Enable Offline Mode</Text>
        </TouchableHighlight>
        <TouchableHighlight
        style={styles.button}
        onPress={this._onPress_disableOfflineMode}>
        <Text>Disable Offline Mode</Text>
        </TouchableHighlight>
        <TouchableHighlight
        style={styles.button}
        onPress={this._onPress_enableSdk}>
        <Text>Enable SDK</Text>
        </TouchableHighlight>
        <TouchableHighlight
        style={styles.button}
        onPress={this._onPress_disableSdk}>
        <Text>Disable SDK</Text>
        </TouchableHighlight>
        <TouchableHighlight
        style={styles.button}
        onPress={this._onPress_getIds}>
        <Text>Get Ids</Text>
        </TouchableHighlight>
        <TouchableHighlight
        style={styles.button}
        onPress={this._onPress_isSdkEnabled}>
        <Text>is SDK Enabled?</Text>
        </TouchableHighlight>
        </View>
        );
      }
    }

    const styles = StyleSheet.create({
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
