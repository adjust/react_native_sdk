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
EXAMPLE_APP_DIR=example
SDK_PLUGIN_NAME=react-native-adjust

# ======================================== #

echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Uninstalling example app from device/emulator ... ${NC}"
adb uninstall com.adjust.examples || true
echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Cleaning up previous SDK binary ... ${NC}"
rm -rfv android/libs/*
echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Invoking SDK build script ... ${NC}"
${ROOT_DIR}/ext/android/build-sdk.sh release
echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

# This step is needed, since existence of "../temp" path for react-native-adjust is hostile towards "npm install".
# Removing plugin with yarn in here makes it disappear from package.json of the example app.
echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Removing react-native-adjust from example app ... ${NC}"
cd ${ROOT_DIR}/${EXAMPLE_APP_DIR}
yarn remove ${SDK_PLUGIN_NAME} || true
echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Installing node dependencies [npm install] ... ${NC}"
npm install
echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Removing and unlinking react-native-adjust from example app ... ${NC}"
react-native unlink ${SDK_PLUGIN_NAME} || true
yarn remove ${SDK_PLUGIN_NAME} || true
rm -rfv node_modules/${SDK_PLUGIN_NAME}
echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Modifying react-native-adjust content and putting it to temp folder ... ${NC}"
cd ${ROOT_DIR}; rm -rfv temp; mkdir -v temp; cp -Rv android temp; cp -Rv ios temp; cp -v package.json temp; cp -v react-native-adjust.podspec temp; cp -v index.js temp; cd temp
rm -rfv example ext scripts test .git
echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Adding react-native-adjust to test app ... ${NC}"
cd ${ROOT_DIR}/${EXAMPLE_APP_DIR}
yarn add ../temp
echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Linking react-native-adjust ... ${NC}"
react-native link ${SDK_PLUGIN_NAME} || true
echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Cleanup ... ${NC}"
rm -rfv ${ROOT_DIR}/temp
echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Building and running test app on device/emulator ... ${NC}"
cd ${ROOT_DIR}/${EXAMPLE_APP_DIR}
react-native run-android
echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][EXAMPLE-ANDROID]:${GREEN} Script completed! ${NC}"
