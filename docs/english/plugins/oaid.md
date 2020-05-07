## OAID plugin

OAID is a new advertising ID available in devices with HMS (Huawei Mobile Service) version 2.6.2 or later. You can  use it to attribute and track Android devices in markets where Google Play Services is not available. 

The OAID plugin lets the Adjust React Native SDK read a device’s OAID value *in addition* to the other device IDs it searches for by default. 

First, read the official [React Native SDK README][readme] and integrate the Adjust SDK into your app.

To let the Adjust SDK collect and track the OAID, follow these steps.

### Add the OAID plugin to your app

You can get the Adjust OAID plugin for React Native from `npm`:

```
npm install react-native-adjust-oaid --save
```

### Use the plugin

To read OAID values, call `AdjustOaid.ReadOaid()` before starting the SDK:

```js
import { AdjustOaid } from 'react-native-adjust-oaid';

AdjustOaid.readOaid();

// ...

Adjust.create(adjustConfig);
```

To stop the SDK from reading OAID values, call `AdjustOaid.doNotReadOaid()`.

[readme]:    ../../../README.md
