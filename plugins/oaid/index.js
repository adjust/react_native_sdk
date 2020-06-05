'use strict';

import { 
    NativeEventEmitter,
    NativeModules,
    Platform,
} from 'react-native';

const module_adjust_oaid = NativeModules.AdjustOaid;

// AdjustOaid

var AdjustOaid = {};

AdjustOaid.readOaid = function() {
    if (Platform.OS === "android") {
        module_adjust_oaid.readOaid();
    }
};

AdjustOaid.doNotReadOaid = function() {
    if (Platform.OS === "android") {
        module_adjust_oaid.doNotReadOaid();
    }
};

module.exports = { AdjustOaid }
