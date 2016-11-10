## Summary

This is the React Native SDK of adjust™. You can read more about adjust™ at [adjust.com].

## Table of contents

* [Example app](#example-app)
* [Basic integration](#basic-integration)
   * [Get the SDK](#sdk-get)
   * [Add the SDK to your project](#sdk-add)
   * [Integrate the SDK into your app](#sdk-integrate)
   * [Adjust logging](#adjust-logging)
   * [Google Play Services](#google-play-services)
* [Additional features](#additional-features)
   * [Event tracking](#event-tracking)
      * [Revenue tracking](#revenue-tracking)
      * [Revenue deduplication](#revenue-deduplication)
      * [In-App Purchase verification](#iap-verification)
      * [Callback parameters](#callback-parameters)
      * [Partner parameters](#partner-parameters)
    * [Session parameters](#session-parameters)
      * [Session callback parameters](#session-callback-parameters)
      * [Session partner parameters](#session-partner-parameters)
      * [Delay start](#delay-start)
    * [Attribution callback](#attribution-callback)
    * [Session and event callbacks](#session-event-callbacks)
    * [Disable tracking](#disable-tracking)
    * [Offline mode](#offline-mode)
    * [Event buffering](#event-buffering)
    * [Background tracking](#background-tracking)
    * [Device IDs](#device-ids)
    * [Push token](#push-token)
    * [Pre-installed trackers](#pre-installed-trackers)
    * [Deep linking](#deeplinking)
        * [Deep linking](#deeplinking-standard)
        * [Deferred deep linking scenario](#deeplinking-deferred)
        * [Reattribution via deep links](#deeplinking-reattribution)
* [License](#license)

## Supported versions
- react-native-cli: 1.2.0
- react-native: 0.37.0

## <a id="example-apps"></a>Example apps

There is an example app inside the [`examples` directory][example]

## <a id="basic-integration"></a>Basic integration

We will describe the steps to integrate the adjust SDK into your React Native project. You can use any text editor or IDE for React Native development. There are no assumptions made regarding text editors.

### <a id="sdk-get"></a>Get the SDK

First, download the library from npm:

```
$ npm install react-native-adjust --save
```

Then you must install the native dependencies: You can use rnpm (now part of react-native core) to add native dependencies automatically then continue the directions below depending on your target OS.

```
$ react-native link
```

for **iOS**, you don't need to do much of anything else.

for **Android**, you need to include the native module's package manually.

- Go to your app's `MainApplication.java` class. It should be located in `./android/app/src/main/java/[your app]/MainApplication.java`
- There is a method called `getPackages()` that looks like this by default:
```java
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
      new MainReactPackage()
  );
}
```
- You'l have to add `new AdjustPackage()` to the list of packages like this:
```java
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new AdjustPackage()
  );
}
```
- Also, don't forget to add the import statement on top of the `MainApplication.java` file: 
```
import com.adjust.nativemodule.AdjustPackage;
```

### <a id="sdk-integrate"></a>Integrate the SDK into your app

You should use the following import statement on top of your `.js` file

```javascript
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';
```

In your `index.android.js` or `index.ios.js` file, add the following code to initialize the adjust SDK:

```javascript
componentWillMount() {
    var adjustConfig = new AdjustConfig("{YourAppToken}", AdjustConfig.EnvironmentSandbox);
    Adjust.create(adjustConfig);
}
```

Replace `{YourAppToken}` with your app token. You can find this in your dashboard.

Depending on whether you build your app for testing or for production, you must set environment with one of these values:

```
AdjustConfig.EnvironmentSandbox
AdjustConfig.EnvironmentProduction
```

**Important**: This value should be set to `AdjustConfig.EnvironmentSandbox` if and only if you or someone else is testing your app. Make sure to set the environment to `AdjustConfig.EnvironmentProduction` just before you publish the app. Set it back to `AdjustConfig.EnvironmentSandbox` when you start developing and testing it again.

We use this environment to distinguish between real traffic and test traffic from test devices. It is very important that you keep this value meaningful at all times! This is especially important if you are tracking revenue.


### <a id="sdk-logging"></a>Adjust logging

You can increase or decrease the amount of logs you see in tests by calling `setLogLevel` on your `AdjustConfig` instance with one of the following parameters:

```js
adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);   // enable all logging
adjustConfig.setLogLevel(AdjustConfig.LogLevelDebug);     // enable more logging
adjustConfig.setLogLevel(AdjustConfig.LogLevelInfo);      // the default
adjustConfig.setLogLevel(AdjustConfig.LogLevelWarn);      // disable info logging
adjustConfig.setLogLevel(AdjustConfig.LogLevelError);     // disable warnings as well
adjustConfig.setLogLevel(AdjustConfig.LogLevelAssert);    // disable errors as well
adjustConfig.setLogLevel(AdjustConfig.LogLevelSuppress);  // disable all logging
```

### <a id="google-play-services"></a>Google Play Services


## <a id="additional-features"></a>Additional features

You can take advantage of the following features once the adjust SDK is integrated into your project.

### <a id="event-tracking"></a>Event tracking

You can use adjust to track all kinds of events. Let's say you want to track every tap on a button. Simply create a new event token in your [dashboard]. Let's say that event token is `abc123`. You can add the following line in your button’s click handler method to track the click:

```js
var adjustEvent = new AdjustEvent("abc123");
Adjust.trackEvent(adjustEvent);
```

### <a id="revenue-tracking"></a>Revenue tracking

If your users can generate revenue by tapping on advertisements or making In-App Purchases, then you can track those revenues 
with events. Let's say a tap is worth €0.01. You could track the revenue event like this:

```js
var adjustEvent = new AdjustEvent("abc123");

adjustEvent.setRevenue(0.01, "EUR");

Adjust.trackEvent(adjustEvent);
```

When you set a currency token, adjust will automatically convert the incoming revenues into a reporting revenue of your 
choice. Read more about [currency conversion here][currency-conversion].


### <a id="revenue-deduplication"></a>Revenue deduplication

You can also add an optional transaction ID to avoid tracking duplicate revenues. The last ten transaction IDs are remembered, 
and revenue events with duplicate transaction IDs are skipped. This is especially useful for In-App Purchase tracking. You can 
see an example below.

If you want to track in-app purchases, please make sure to call the `trackEvent` only if the transaction is finished and an item 
is purchased. That way you can avoid tracking revenue that is not actually being generated.

```js
var adjustEvent = new AdjustEvent("abc123");

adjustEvent.setRevenue(0.01, "EUR");
adjustEvent.setTransactionId("{YourTransactionId}");

Adjust.trackEvent(adjustEvent);
```

**Note**: Transaction ID is the iOS term, unique identifier for successfully finished Android In-App-Purchases is named **Order ID**.

### <a id="iap-verification"></a>In-App Purchase verification

### <a id="callback-parameters"></a>Callback parameters

You can also register a callback URL for that event in your [dashboard][dashboard] and we will send a GET request to that URL 
whenever the event gets tracked. In that case you can also put some key-value pairs in an object and pass it to the `trackEvent` method. We will then append these named parameters to your callback URL.

For example, suppose you have registered the URL `http://www.adjust.com/callback` for your event with event token `abc123` and execute the following lines:

```js
var adjustEvent = new AdjustEvent("abc123");

adjustEvent.addCallbackParameter("key", "value");
adjustEvent.addCallbackParameter("foo", "bar");

Adjust.trackEvent(adjustEvent);
```

In that case we would track the event and send a request to:

```
http://www.adjust.com/callback?key=value&foo=bar
```

It should be mentioned that we support a variety of placeholders like `{idfa}` for iOS or `{gps_adid}` for Android that can be 
used as parameter values.  In the resulting callback the `{idfa}` placeholder would be replaced with the ID for Advertisers of 
the current device for iOS and the `{gps_adid}` would be replaced with the Google Advertising ID of the current device for 
Android. Also note that we don't store any of your custom parameters, but only append them to your callbacks. If you haven't 
registered a callback for an event, these parameters won't even be read.

You can read more about using URL callbacks, including a full list of available values, in our 
[callbacks guide][callbacks-guide].

### <a id="partner-parameters"></a>Partner parameters

Similarly to the callback parameters mentioned above, you can also add parameters that adjust will transmit to the network 
partners of your choice. You can activate these networks in your adjust dashboard.

This works similarly to the callback parameters mentioned above, but can be added by calling the `addPartnerParameter` method 
on your `AdjustEvent` instance.

```js
var adjustEvent = new AdjustEvent("abc123");

adjustEvent.addPartnerParameter("key", "value");
adjustEvent.addPartnerParameter("foo", "bar");

Adjust.trackEvent(adjustEvent);
```

You can read more about special partners and networks in our [guide to special partners][special-partners].

### <a id="session-parameters"></a>Session parameters

Some parameters are saved to be sent in every event and session of the adjust SDK. Once you have added any of these
parameters, you don't need to add them every time, since they will be saved locally. If you add the same parameter twice,
there will be no effect.

These session parameters can be called before the adjust SDK is launched to make sure they are sent even on install. If you
need to send them with an install, but can only obtain the needed values after launch, it's possible to [delay](#delay-start) 
the first launch of the adjust SDK to allow this behaviour.

### <a id="session-callback-parameters"></a>Session callback parameters

The same callback parameters that are registered for [events](#callback-parameters) can be also saved to be sent in every
event or session of the adjust SDK.

The session callback parameters have a similar interface of the event callback parameters. Instead of adding the key and
its value to an event, it's added through a call to method `addSessionCallbackParameter` of the `Adjust` instance:

```js
Adjust.addSessionCallbackParameter("foo", "bar");
```

The session callback parameters will be merged with the callback parameters added to an event. The callback parameters added 
to an event have precedence over the session callback parameters. Meaning that, when adding a callback parameter to an event 
with the same key to one added from the session, the value that prevails is the callback parameter added to the event.

It's possible to remove a specific session callback parameter by passing the desiring key to the method 
`removeSessionCallbackParameter` of the `Adjust` instance:

```js
Adjust.removeSessionCallbackParameter("foo");
```

If you wish to remove all key and values from the session callback parameters, you can reset it with the method
`resetSessionCallbackParameters` of the `Adjust` instance:

```js
Adjust.resetSessionCallbackParameters();
```

### <a id="session-partner-parameters"></a>Session partner parameters

In the same way that there are [session callback parameters](#session-callback-parameters) that are sent for every event or
session of the adjust SDK, there are also session partner parameters.

These will be transmitted to network partners, for the integrations that have been activated in your adjust [dashboard].

The session partner parameters have a similar interface to the event partner parameters. Instead of adding the key and its
value to an event, it's added through a call to method `addSessionPartnerParameter` of the `Adjust` instance:

```js
Adjust.addSessionPartnerParameter("foo", "bar");
```

The session partner parameters will be merged with the partner parameters added to an event. The partner parameters added to 
an event have precedence over the session partner parameters. Meaning that, when adding a partner parameter to an event with 
the same key to one added from the session, the value that prevails is the partner parameter added to the event.

It's possible to remove a specific session partner parameter by passing the desiring key to the method
`removeSessionPartnerParameter` of the `Adjust` instance:

```js
Adjust.removeSessionPartnerParameter("foo");
```

If you wish to remove all keys and values from the session partner parameters, you can reset it with the method
`resetSessionPartnerParameters` of the `Adjust` instance:

```js
Adjust.resetSessionPartnerParameters();
```

### <a id="delay-start"></a>Delay start

Delaying the start of the adjust SDK allows your app some time to obtain session parameters, such as unique identifiers, to
be sent on install.

Set the initial delay time in seconds with the `setDelayStart` field of the `AdjustConfig` instance:

```js
adjustConfig.setDelayStart(5.5);
```

In this case this will make the adjust SDK not send the initial install session and any event created for 5.5 seconds. After 
this time is expired or if you call `sendFirstPackages()` of the `Adjust` instance in the meanwhile, every session parameter 
will be added to the delayed install session and events and the adjust SDK will resume as usual.

**The maximum delay start time of the adjust SDK is 10 seconds**.

### <a id="attribution-callback"></a>Attribution callback

You can register a listener to be notified of tracker attribution changes. Due to the different sources considered for 
attribution, this information cannot by provided synchronously. The simplest way is to create a single anonymous listener 
which is going to be called **each time your user's attribution value changes**:

With the `AdjustConfig` instance, before starting the SDK, add the anonymous listener:

```js
var adjustConfig = new AdjustConfig(appToken, environment);

adjustConfig.setAttributionCallbackListener(function(attribution) {
    // Printing all attribution properties.
    console.log("Attribution changed!");
    console.log(attribution.trackerToken);
    console.log(attribution.trackerName);
    console.log(attribution.network);
    console.log(attribution.campaign);
    console.log(attribution.adgroup);
    console.log(attribution.creative);
    console.log(attribution.clickLabel);
});

Adjust.create(adjustConfig);
```

Within the listener function you have access to the `attribution` parameters. Here is a quick summary of its properties:

- `trackerToken`    the tracker token of the current install.
- `trackerName`     the tracker name of the current install.
- `network`         the network grouping level of the current install.
- `campaign`        the campaign grouping level of the current install.
- `adgroup`         the ad group grouping level of the current install.
- `creative`        the creative grouping level of the current install.
- `clickLabel`      the click label of the current install.

Please make sure to consider our [applicable attribution data policies][attribution-data].

### <a id="session-event-callbacks"></a>Session and event callbacks

You can register a callback to be notified of successful and failed tracked events and/or sessions.

Follow the same steps as for attribution callback to implement the following callback function for successfully tracked 
events:

```js
var adjustConfig = new AdjustConfig(appToken, environment);

adjustConfig.setEventTrackingSucceededCallbackListener(function(eventSuccess) {
    // Printing all event success properties.
    console.log("Event tracking succeeded!");
    console.log(eventSuccess.message);
    console.log(eventSuccess.timestamp);
    console.log(eventSuccess.eventToken);
    console.log(eventSuccess.adid);
    console.log(eventSuccess.jsonResponse);
});

Adjust.create(adjustConfig);
```

The following callback function for failed tracked events:

```js
var adjustConfig = new AdjustConfig(appToken, environment);

adjustConfig.setEventTrackingFailedCallbackListener(function(eventFailure) {
    // Printing all event failure properties.
    console.log("Event tracking failed!");
    console.log(eventSuccess.message);
    console.log(eventSuccess.timestamp);
    console.log(eventSuccess.eventToken);
    console.log(eventSuccess.adid);
    console.log(eventSuccess.willRetry);
    console.log(eventSuccess.jsonResponse);
});

Adjust.create(adjustConfig);
```

For successfully tracked sessions:

```js
var adjustConfig = new AdjustConfig(appToken, environment);

adjustConfig.setSessionTrackingSucceededCallbackListener(function(sessionSuccess) {
    // Printing all session success properties.
    console.log("Session tracking succeeded!");
    console.log(sessionSuccess.message);
    console.log(sessionSuccess.timestamp);
    console.log(sessionSuccess.adid);
    console.log(sessionSuccess.jsonResponse);
});

Adjust.create(adjustConfig);
```

And for failed tracked sessions:

```js
var adjustConfig = new AdjustConfig(appToken, environment);

adjustConfig.setSessionTrackingFailedCallbackListener(function(sessionFailure) {
    // Printing all session failure properties.
    console.log("Session tracking failed!");
    console.log(sessionSuccess.message);
    console.log(sessionSuccess.timestamp);
    console.log(sessionSuccess.adid);
    console.log(sessionSuccess.willRetry);
    console.log(sessionSuccess.jsonResponse);
});

Adjust.create(adjustConfig);
```

The callback functions will be called after the SDK tries to send a package to the server. Within the callback you have access 
to a response data object specifically for the callback. Here is a quick summary of the session response data properties:

- `var message` the message from the server or the error logged by the SDK.
- `var timestamp` timestamp from the server.
- `var adid` a unique device identifier provided by adjust.
- `var jsonResponse` the JSON object with the response from the server.

Both event response data objects contain:

- `var eventToken` the event token, if the package tracked was an event.

And both event and session failed objects also contain:

- `var willRetry` indicates there will be an attempt to resend the package at a later time.

### <a id="disable-tracking"></a>Disable tracking

You can disable the adjust SDK from tracking by invoking the method `setEnabled` of the `Adjust` instance with the enabled 
parameter as `false`. This setting is **remembered between sessions**, but it can only be activated after the first session.

```js
Adjust.setEnabled(false);
```

You can verify if the adjust SDK is currently active with the method `isEnabled` of the `Adjust` instance. It is always 
possible to activate the adjust SDK by invoking `setEnabled` with the parameter set to `true`.

### <a id="offline-mode"></a>Offline mode

You can put the adjust SDK in offline mode to suspend transmission to our servers while retaining tracked data to be sent 
later. When in offline mode, all information is saved in a file, so be careful not to trigger too many events while in offline 
mode.

You can activate offline mode by calling the method `setOfflineMode` of the `Adjust` instance with the parameter `true`.

```js
Adjust.setOfflineMode(true);
```

Conversely, you can deactivate offline mode by calling `setOfflineMode` with `false`. When the adjust SDK is put back in 
online mode, all saved information is send to our servers with the correct time information.

Unlike disabling tracking, **this setting is not remembered** between sessions. This means that the SDK is in online mode
whenever it is started, even if the app was terminated in offline mode.

### <a id="event-buffering"></a>Event buffering

If your app makes heavy use of event tracking, you might want to delay some HTTP requests in order to send them in one batch 
every minute. You can enable event buffering with your `AdjustConfig` instance by calling `setEventBufferingEnabled` method:

```js
var adjustConfig = new AdjustConfig(appToken, environment);

adjustConfig.setEventBufferingEnabled(true);

Adjust.create(adjustConfig);
```

### <a id="background-tracking"></a>Background tracking

The default behaviour of the adjust SDK is to **pause sending HTTP requests while the app is in the background**. You can 
change this in your `AdjustConfig` instance by calling `setSendInBackground` method:

```js
var adjustConfig = new AdjustConfig(appToken, environment);

adjustConfig.setSendInBackground(true);

Adjust.create(adjustConfig);
```

If nothing is set, sending in background is **disabled by default**.

### <a id="device-ids"></a>Device IDs

Certain services (such as Google Analytics) require you to coordinate Device and Client IDs in order to prevent duplicate
reporting.

### Android

If you need to obtain the Google Advertising ID, you can call the function `getGoogleAdId`. To get it in the callback method 
you pass to the call:

```js
Adjust.getGoogleAdId(function(googleAdId) {
    // Use googleAdId value.
});
```

Inside the callback method you will have access to the Google Advertising ID as the variable `googleAdId`.

### iOS

To obtain the IDFA, call the function `getIdfa` in the same way as the method `getGoogleAdId`:

```js
Adjust.getIdfa(function(idfa) {
    // Use idfa value.
});
```

### <a id="push-token"></a>Push token

To send us the push notification token, add the following call to Adjust **whenever you get your token in the app or 
when it gets updated**:

```js
Adjust.setPushToken("YourPushNotificationToken");
```

### <a id="pre-installed-trackers"></a>Pre-installed trackers

If you want to use the adjust SDK to recognize users that found your app pre-installed on their device, follow these steps.

1. Create a new tracker in your [dashboard].
2. Open your app delegate and add set the default tracker of your `AdjustConfig` instance:

    ```js
    var adjustConfig = new AdjustConfig(appToken, environment);

    adjustConfig.setDefaultTracker("{TrackerToken}");
    
    Adjust.create(adjustConfig);
    ```

  Replace `{TrackerToken}` with the tracker token you created in step 2. Please note that the dashboard displays a tracker 
  URL (including `http://app.adjust.com/`). In your source code, you should specify only the six-character token and not the
  entire URL.

3. Build and run your app. You should see a line like the following in the app's log output:

    ```
    Default tracker: 'abc123'
    ```

### <a id="deeplinking-standard"></a>Deep linking

To support deep linking in Android, the app's `AndroidManifest.xml` file will need to be modified. Please refer to this [page of our Android SDK][android-sdk-deeplink] for the needed modifications to `AndroidManifest.xml`.

To support deep linking in iOS, the app's `info.plist` file will need to be modified. Please refer to this [page of our iOS SDK][ios-sdk-deeplink] for the needed modifications to `info.plist`.

After that, please refer to this page of the [React Native offical docs][rn-linking] for instructions on how to support both platforms. In basic terms, your React component will have to add `Linking` component, as follows:
```js
import {
  StyleSheet,
  Platform,
  Text,
  View,
  ToolbarAndroid,
  Linking //This is important
} from 'react-native';
```

And then on your React component you'll be able to listen to the events on `Linking` as follows: 
```js
componentDidMount() {
  Linking.addEventListener('url', this._handleOpenURL);
},
componentWillUnmount() {
  Linking.removeEventListener('url', this._handleOpenURL);
},
_handleOpenURL(event) {
  console.log(event.url);
}
```

Please refer to the [React Native offical docs][rn-linking] for the detailed steps.

### <a id="deeplinking-deferred"></a>Deferred deep linking

While deferred deep linking is not supported out of the box on Android and iOS, our adjust SDK makes it possible.
 
In order to get info about the URL content in a deferred deep linking scenario, you should set a callback method on the 
`AdjustConfig` object which will receive one parameter where the content of the URL will be delivered. You should set this 
method on the config object by calling the method `setDeeplinkCallbackListener`:

```js
var adjustConfig = new AdjustConfig(appToken, environment);

adjustConfig.setDeferredDeeplinkCallbackListener(function(deeplink) {
    console.log("Deferred deep link URL content: " + deeplink);
});

Adjust.create(adjustConfig);
```

In deferred deep linking scenario, there is one additional setting which can be set on the `AdjustConfig` object. Once the 
adjust SDK gets the deferred deep link info, we are offering you the possibility to choose whether our SDK should open this 
URL or not. You can choose to set this option by calling the `setShouldLaunchDeeplink` method on the config object:


```js
var adjustConfig = new AdjustConfig(appToken, environment);

adjustConfig.setShouldLaunchDeeplink(true);
// or adjustConfig.setShouldLaunchDeeplink(false);

adjustConfig.setDeeplinkCallbackListener(function(deeplink) {
    console.log("Deferred deep link URL content: " + deeplink);
});

Adjust.create(adjustConfig);
```

If nothing is set, **the adjust SDK will always try to launch the URL by default**.

### <a id="deeplinking-reattribution"></a>Reattribution via deep links

Adjust enables you to run re-engagement campaigns by using deep links. For more information on this, please check our 
[official docs][reattribution-with-deeplinks].

If you are using this feature, in order for your user to be properly reattributed, you need to make one additional call to the 
adjust SDK in your app.

Once you have received deep link content information in your app, add a call to `appWillOpenUrl` method of the `Adjust` 
instance. By making this call, the adjust SDK will try to find if there is any new attribution info inside of the deep link 
and if any, it will be sent to the adjust backend. If your user should be reattributed due to a click on the adjust tracker 
URL with deep link content in it, you will see the [attribution callback](#attribution-callback) in your app being triggered 
with new attribution info for this user.

Call to the `appWillOpenUrl` method in a React component would look like this:

```js
componentDidMount() {
  Linking.addEventListener('url', this._handleOpenURL);
},
componentWillUnmount() {
  Linking.removeEventListener('url', this._handleOpenURL);
},
_handleOpenURL(event) {
  console.log(event.url);

  Adjust.appWillOpenUrl(event.url);
}
```

[dashboard]:    http://adjust.com
[adjust.com]:   http://adjust.com

[example]:      http://github.com/adjust/ios_sdk/tree/master/examples
[npm-repo]:     https://www.npmjs.com/package/react-native-adjust

[google-ad-id]:         https://developer.android.com/google/play-services/id.html
[enable-ulinks]:        https://github.com/adjust/ios_sdk#deeplinking-setup-new
[event-tracking]:       https://docs.adjust.com/en/event-tracking
[callbacks-guide]:      https://docs.adjust.com/en/callbacks
[attribution-data]:     https://github.com/adjust/sdks/blob/master/doc/attribution-data.md
[special-partners]:     https://docs.adjust.com/en/special-partners

[google-launch-modes]:    http://developer.android.com/guide/topics/manifest/activity-element.html#lmode
[currency-conversion]:    https://docs.adjust.com/en/event-tracking/#tracking-purchases-in-different-currencies
[google-play-services]:   http://developer.android.com/google/play-services/index.html

[android-sdk-deeplink]: https://github.com/adjust/android_sdk#deeplinking-standard
[reattribution-with-deeplinks]: https://docs.adjust.com/en/deeplinking/#manually-appending-attribution-data-to-a-deep-link
[rn-linking]: https://facebook.github.io/react-native/docs/linking.html

## <a id="license"></a>License

The adjust SDK is licensed under the MIT License.

Copyright (c) 2012-2016 adjust GmbH, 
http://www.adjust.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
