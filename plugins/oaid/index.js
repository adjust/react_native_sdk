'use strict';

import { 
    NativeEventEmitter,
    NativeModules,
    Platform,
} from 'react-native';

const module_adjust_oaid = NativeModules.AdjustOaid;

let module_adjust_oaid_emitter = null;
if (Platform.OS === "android") {
    module_adjust_oaid_emitter = new NativeEventEmitter(NativeModules.AdjustOaid);
}

// AdjustOaid

var AdjustOaid = {};

AdjustOaid.readOaid = function() {
    module_adjust_oaid.readOaid();
};

AdjustOaid.doNotReadOaid = function() {
    module_adjust_oaid.doNotReadOaid();
};

module.exports = { AdjustOaid }
