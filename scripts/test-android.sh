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

echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Uninstalling test app from device/emulator ... ${NC}"
adb uninstall com.adjust.testapp || true
echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Cleaning up previous SDK and test library binaries ... ${NC}"
cd ${ROOT_DIR}
rm -rfv android/libs/*
rm -rfv ${TEST_PLUGIN_DIR}/android/libs/adjust-testing.jar
echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Invoking SDK and test library build scripts ... ${NC}"
cd ${ROOT_DIR}
ext/android/build-sdk.sh release
ext/android/build-test.sh
echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Removing react-native-adjust and react-native-adjust-test modules from test app ... ${NC}"
cd ${ROOT_DIR}/${TEST_APP_DIR}
react-native unlink ${SDK_PLUGIN_NAME} || true
react-native unlink ${TEST_PLUGIN_NAME} || true
yarn remove ${SDK_PLUGIN_NAME} || true
yarn remove ${TEST_PLUGIN_NAME} || true
rm -rfv node_modules/${SDK_PLUGIN_NAME}
rm -rfv node_modules/${TEST_PLUGIN_NAME}
echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Modifying react-native-adjust content and putting it to temp folder ... ${NC}"
cd ${ROOT_DIR}; rm -rfv temp; mkdir -v temp; cp -Rv android temp; cp -Rv ios temp; cp -v package.json temp; cp -v react-native-adjust.podspec temp; cp -v index.js temp; cd temp
rm -rfv example ext scripts test .git
echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Adding react-native-adjust to test app ... ${NC}"
cd ${ROOT_DIR}/${TEST_APP_DIR}
yarn add ../../temp
echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Adding react-native-adjust-test to test app ... ${NC}"
cd ${ROOT_DIR}/${TEST_APP_DIR}
yarn add ../lib
echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Linking react-native-adjust ... ${NC}"
react-native link ${SDK_PLUGIN_NAME} || true
echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Linking react-native-adjust-test ... ${NC}"
react-native link ${TEST_PLUGIN_NAME} || true
echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Cleanup ... ${NC}"
rm -rfv ${ROOT_DIR}/temp
echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Building and running test app on device/emulator ... ${NC}"
cd ${ROOT_DIR}/${TEST_APP_DIR}
react-native run-android
echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][TEST-ANDROID]:${GREEN} Script completed! ${NC}"
