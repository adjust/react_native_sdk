#!/usr/bin/env bash

set -e

# ======================================== #

# Colors for output
NC='\033[0m'
RED='\033[0;31m'
CYAN='\033[1;36m'
GREEN='\033[0;32m'

# ======================================== #

# Directories and paths of interest for the script.
SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPTS_DIR")"
TEST_APP_DIR=test/app
TEST_PLUGIN_DIR=test/lib
SDK_PLUGIN_NAME=react-native-adjust
TEST_PLUGIN_NAME=react-native-adjust-test

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Invoking SDK and test library build scripts ... ${NC}"
cd ${ROOT_DIR}
ext/iOS/build-sdk.sh
ext/iOS/build-test.sh
echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Removing react-native-adjust and react-native-adjust-test modules from test app ... ${NC}"
cd ${ROOT_DIR}/${TEST_APP_DIR}
react-native unlink ${SDK_PLUGIN_NAME} || true
react-native unlink ${TEST_PLUGIN_NAME} || true
yarn remove ${SDK_PLUGIN_NAME} || true
yarn remove ${TEST_PLUGIN_NAME} || true
rm -rfv node_modules/${SDK_PLUGIN_NAME}
rm -rfv node_modules/${TEST_PLUGIN_NAME}
echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Modifying react-native-adjust content and putting it to temp folder ... ${NC}"
cd ${ROOT_DIR}; rm -rfv temp; mkdir -v temp; cp -Rv android temp; cp -Rv ios temp; cp -v package.json temp; cp -v react-native-adjust.podspec temp; cp -v index.js temp; cd temp
rm -rfv example ext scripts test .git
echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Adding react-native-adjust to test app ... ${NC}"
cd ${ROOT_DIR}/${TEST_APP_DIR}
yarn add ../../temp
echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Adding react-native-adjust-test to test app ... ${NC}"
cd ${ROOT_DIR}/${TEST_APP_DIR}
yarn add ../lib
echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Linking react-native-adjust ... ${NC}"
react-native link ${SDK_PLUGIN_NAME} || true
echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Linking react-native-adjust-test ... ${NC}"
react-native link ${TEST_PLUGIN_NAME} || true
echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Cleanup ... ${NC}"
rm -rfv ${ROOT_DIR}/temp
echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Run test app from Xcode. Project location ${ROOT_DIR}/${TEST_APP_DIR}/ios ... ${NC}"
echo -e "${CYAN}[ADJUST][TEST-IOS]:${GREEN} Script completed! ${NC}"
