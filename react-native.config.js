const path = require('path');

module.exports = {
  dependency: {
    platforms: {
      ios: { podspecPath: path.join(__dirname, 'react-native-adjust.podspec') },
      android: {
        packageImportPath: 'import com.adjust.nativemodule.AdjustPackage;',
        packageInstance: 'new AdjustPackage()',
      },
    },
  },
};
