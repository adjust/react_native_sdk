const path = require('path');

module.exports = {
  dependency: {
    platforms: {
      ios: {},
      android: {
        packageImportPath: 'import com.adjust.nativemodule.AdjustPackage;',
        packageInstance: 'new AdjustPackage()',
      },
    },
  },
};
