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
  TouchableOpacity,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import {
  Adjust,
  AdjustEvent,
  AdjustConfig,
  AdjustDeeplink
} from 'react-native-adjust';
import { AdjustOaid } from 'react-native-adjust-oaid';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      toggleButtonText: 'Toggle SDK'
    };

    // Initialize the Adjust SDK
    this.initializeAdjustSdk();
  }

  initializeAdjustSdk = () => {
    console.log("[AdjustExample]: Initializing SDK...");
    
    const adjustConfig = new AdjustConfig("2fm9gkqubvpc", AdjustConfig.EnvironmentSandbox);
    adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
    
    adjustConfig.setAttributionCallback(function(attribution) {
      console.log("Attribution callback received");
      console.log("Tracker token = " + attribution.trackerToken);
      console.log("Tracker name = " + attribution.trackerName);
      console.log("Campaign = " + attribution.campaign);
      console.log("Network = " + attribution.network);
      console.log("Creative = " + attribution.creative);
      console.log("Adgroup = " + attribution.adgroup);
      console.log("Click label = " + attribution.clickLabel);
      console.log("Cost type = " + attribution.costType);
      console.log("Cost amount = " + attribution.costAmount);
      console.log("Cost currency = " + attribution.costCurrency);
      console.log("JSON response = " + attribution.jsonResponse);
    });

    adjustConfig.setSessionTrackingSucceededCallback(function(sessionSuccess) {
      console.log("Session success callback received");
      console.log("Message: " + sessionSuccess.message);
      console.log("Timestamp: " + sessionSuccess.timestamp);
      console.log("Adid: " + sessionSuccess.adid);
      console.log("JSON response: " + sessionSuccess.jsonResponse);
    });

    adjustConfig.setSessionTrackingFailedCallback(function(sessionFailure) {
      console.log("Session failure callback received");
      console.log("Message: " + sessionFailure.message);
      console.log("Timestamp: " + sessionFailure.timestamp);
      console.log("Adid: " + sessionFailure.adid);
      console.log("Will retry: " + sessionFailure.willRetry);
      console.log("JSON response: " + sessionFailure.jsonResponse);
    });

    adjustConfig.setEventTrackingSucceededCallback(function(eventSuccess) {
      console.log("Event success callback received");
      console.log("Event token: " + eventSuccess.eventToken);
      console.log("Message: " + eventSuccess.message);
      console.log("Timestamp: " + eventSuccess.timestamp);
      console.log("Adid: " + eventSuccess.adid);
      console.log("Callback ID: " + eventSuccess.callbackId);
      console.log("JSON response: " + eventSuccess.jsonResponse);
    });

    adjustConfig.setEventTrackingFailedCallback(function(eventFailure) {
      console.log("Event failure callback received");
      console.log("Event token: " + eventFailure.eventToken);
      console.log("Message: " + eventFailure.message);
      console.log("Timestamp: " + eventFailure.timestamp);
      console.log("Adid: " + eventFailure.adid);
      console.log("Callback ID: " + eventFailure.callbackId);
      console.log("Will retry: " + eventFailure.willRetry);
      console.log("JSON response: " + eventFailure.jsonResponse);
    });

    adjustConfig.setDeferredDeeplinkCallback(function(deeplink) {
      console.log("Received deferred deeplink: " + deeplink.deeplink);
    });

    adjustConfig.setRemoteTriggerCallback(function(remoteTrigger) {
      console.log("Remote trigger callback received");
      console.log("Label: " + remoteTrigger.label);
      console.log("Payload JSON: " + remoteTrigger.payloadJson);
    });

    adjustConfig.setSkanUpdatedCallback(function(skanData) {
      console.log("Received SKAN update information:");
      if (skanData.conversionValue != null) {
        console.log("Conversion value: " + skanData.conversionValue);
      }
      if (skanData.coarseValue != null) {
        console.log("Coarse value: " + skanData.coarseValue);
      }
      if (skanData.lockWindow != null) {
        console.log("Lock window: " + skanData.lockWindow);
      }
      if (skanData.error != null) {
        console.log("Error: " + skanData.error);
      }
    });

    Adjust.requestAppTrackingAuthorization(function(status) {
      console.log("Authorization status update");
      switch (status) {
        case 0:
          console.log("Authorization status: ATTrackingManagerAuthorizationStatusNotDetermined");
          break;
        case 1:
          console.log("Authorization status: ATTrackingManagerAuthorizationStatusRestricted");
          break;
        case 2:
          console.log("Authorization status: ATTrackingManagerAuthorizationStatusDenied");
          break;
        case 3:
          console.log("Authorization status: ATTrackingManagerAuthorizationStatusAuthorized");
          break;
      }
    });

    if (Platform.OS === "android") {
      AdjustOaid.readOaid();
    }
    
    Adjust.initSdk(adjustConfig);
    console.log("[AdjustExample]: SDK initialized successfully");
  };

  componentDidMount() {
    // Deep link handling
    Linking.addEventListener('url', this.handleDeepLink);
    
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleDeepLink({ url });
      }
    }).catch(err => {
      console.log('[AdjustExample]: Error getting initial URL:', err);
    });

    // Update toggle button text
    setTimeout(() => {
      try {
        Adjust.isEnabled((isEnabled) => {
          this.setState({
            toggleButtonText: isEnabled ? 'Disable SDK' : 'Enable SDK'
          });
        });
      } catch (error) {
        console.log("[AdjustExample]: Could not check SDK state");
      }
    }, 1000);
  }

  componentWillUnmount() {
    Adjust.componentWillUnmount();
    Linking.removeEventListener('url', this.handleDeepLink);
  }

  handleDeepLink = (e) => {
    Adjust.processDeeplink(new AdjustDeeplink(e.url));
  };

  trackSimpleEvent = () => {
    const adjustEvent = new AdjustEvent('g3mfiw');
    Adjust.trackEvent(adjustEvent);
    console.log("Simple event tracked");
  };

  trackRevenueEvent = () => {
    const adjustEvent = new AdjustEvent('a4fd35');
    adjustEvent.setRevenue(100.0, "EUR");
    adjustEvent.setTransactionId("DummyTransactionId");
    Adjust.trackEvent(adjustEvent);
    console.log("Revenue event tracked");
  };

  trackCallbackEvent = () => {
    const adjustEvent = new AdjustEvent('34vgg9');
    adjustEvent.addCallbackParameter("key1", "value1");
    adjustEvent.addCallbackParameter("key2", "value2");
    Adjust.trackEvent(adjustEvent);
    console.log("Callback event tracked");
  };

  trackPartnerEvent = () => {
    const adjustEvent = new AdjustEvent('w788qs');
    adjustEvent.addPartnerParameter("foo1", "bar1");
    adjustEvent.addPartnerParameter("foo2", "bar2");
    Adjust.trackEvent(adjustEvent);
    console.log("Partner event tracked");
  };

  getGoogleAdId = () => {
    Adjust.getGoogleAdId((googleAdId) => {
      Alert.alert('Google Advertising ID', `Received Google Advertising Id:\n${googleAdId}`);
    });
  };

  getAdjustIdentifier = () => {
    Adjust.getAdid((adid) => {
      Alert.alert('Adjust Identifier', `Received Adjust identifier:\n${adid}`);
    });
  };

  getIdfa = () => {
    Adjust.getIdfa((idfa) => {
      Alert.alert('IDFA', `Received IDFA:\n${idfa}`);
    });
  };

  getAttribution = () => {
    Adjust.getAttribution((attribution) => {
      let attributionInfo = 'Attribution data:\n\n';
      if (attribution.trackerToken != null) {
        attributionInfo += `Tracker token: ${attribution.trackerToken}\n`;
      }
      if (attribution.trackerName != null) {
        attributionInfo += `Tracker name: ${attribution.trackerName}\n`;
      }
      if (attribution.campaign != null) {
        attributionInfo += `Campaign: ${attribution.campaign}\n`;
      }
      if (attribution.network != null) {
        attributionInfo += `Network: ${attribution.network}\n`;
      }
      Alert.alert('Attribution', attributionInfo);
    });
  };

  toggleSdkState = () => {
    try {
      Adjust.isEnabled((isEnabled) => {
        if (isEnabled) {
          Adjust.disable();
          Alert.alert('SDK State', 'Adjust SDK has been disabled');
          this.setState({ toggleButtonText: 'Enable SDK' });
        } else {
          Adjust.enable();
          Alert.alert('SDK State', 'Adjust SDK has been enabled');
          this.setState({ toggleButtonText: 'Disable SDK' });
        }
      });
    } catch (error) {
      Alert.alert('Toggle SDK', 'No such method found in plugin: isEnabled');
    }
  };

  checkIfSdkEnabled = () => {
    try {
      Adjust.isEnabled((isEnabled) => {
        Alert.alert('SDK Enabled?', `Adjust is enabled = ${isEnabled}`);
      });
    } catch (error) {
      Alert.alert('SDK Enabled?', 'No such method found in plugin: isEnabled');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <View style={styles.appIcon}>
                <Text style={styles.iconText}>📊</Text>
              </View>
              <Text style={styles.appTitle}>Adjust SDK Demo</Text>
              <Text style={styles.appDescription}>
                Explore the full functionality of the Adjust SDK{'\n'}with this example application
              </Text>
            </View>
            
            <View style={styles.headerSpacing} />
            
            {/* Event Tracking Section */}
            <Text style={styles.sectionHeader}>Event Tracking</Text>
            <View style={styles.buttonSpacing} />
            
            <TouchableOpacity style={styles.actionButton} onPress={this.trackSimpleEvent}>
              <Text style={styles.actionButtonText}>Track Simple Event</Text>
            </TouchableOpacity>
            <View style={styles.smallSpacing} />
            
            <TouchableOpacity style={styles.actionButton} onPress={this.trackRevenueEvent}>
              <Text style={styles.actionButtonText}>Track Revenue Event</Text>
            </TouchableOpacity>
            <View style={styles.smallSpacing} />
            
            <TouchableOpacity style={styles.actionButton} onPress={this.trackCallbackEvent}>
              <Text style={styles.actionButtonText}>Track Callback Event</Text>
            </TouchableOpacity>
            <View style={styles.smallSpacing} />
            
            <TouchableOpacity style={styles.actionButton} onPress={this.trackPartnerEvent}>
              <Text style={styles.actionButtonText}>Track Partner Event</Text>
            </TouchableOpacity>
            
            <View style={styles.sectionSpacing} />
            
            {/* Device Information Section */}
            <Text style={styles.sectionHeader}>Device Information</Text>
            <View style={styles.buttonSpacing} />
            
            <TouchableOpacity style={styles.actionButton} onPress={this.getGoogleAdId}>
              <Text style={styles.actionButtonText}>Get Google AdId</Text>
            </TouchableOpacity>
            <View style={styles.smallSpacing} />
            
            <TouchableOpacity style={styles.actionButton} onPress={this.getAdjustIdentifier}>
              <Text style={styles.actionButtonText}>Get Adjust Identifier</Text>
            </TouchableOpacity>
            <View style={styles.smallSpacing} />
            
            <TouchableOpacity style={styles.actionButton} onPress={this.getIdfa}>
              <Text style={styles.actionButtonText}>Get IDFA</Text>
            </TouchableOpacity>
            <View style={styles.smallSpacing} />
            
            <TouchableOpacity style={styles.actionButton} onPress={this.getAttribution}>
              <Text style={styles.actionButtonText}>Get Attribution</Text>
            </TouchableOpacity>
            
            <View style={styles.sectionSpacing} />
            
            {/* SDK Control Section */}
            <Text style={styles.sectionHeader}>SDK Control</Text>
            <View style={styles.buttonSpacing} />
            
            <TouchableOpacity style={styles.actionButton} onPress={this.toggleSdkState}>
              <Text style={styles.actionButtonText}>{this.state.toggleButtonText}</Text>
            </TouchableOpacity>
            <View style={styles.smallSpacing} />
            
            <TouchableOpacity style={styles.actionButton} onPress={this.checkIfSdkEnabled}>
              <Text style={styles.actionButtonText}>Is SDK Enabled?</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2951',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  
  // Header styles
  headerSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  appIcon: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 40,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  
  // Section header styles
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 0,
  },
  
  // Button styles
  actionButton: {
    width: '100%',
    height: 56,
    backgroundColor: 'white',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B2951',
  },
  
  // Spacing styles
  headerSpacing: {
    height: 32,
  },
  sectionSpacing: {
    height: 32,
  },
  buttonSpacing: {
    height: 16,
  },
  smallSpacing: {
    height: 12,
  },
});

export default App;
