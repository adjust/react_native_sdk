#!/usr/bin/env bash

# Exit if any errors occur
#set -e

# Get the current directory (/scripts/ directory)
SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# Traverse up to get to the root directory
ROOT_DIR="$(dirname "$SCRIPTS_DIR")"
EXAMPLE_DIR=example
SDK_NAME=react-native-adjust

RED='\033[0;31m' # Red color
GREEN='\033[0;32m' # Green color
NC='\033[0m' # No Color

# Kill any previously running packager instance
killall -9 node

#echo -e "${GREEN}>>> Updating Git submodules ${NC}"
#cd ${ROOT_DIR}
#git submodule update --init --recursive

echo -e "${GREEN}>>> Removing the Android JAR file ${NC}"
rm -rfv android/libs/*

echo -e "${GREEN}>>> Removing app from test device ${NC}"
adb uninstall com.adjust.examples

# Building the Android JAR file
echo -e "${GREEN}>>> Building the Android JAR file ${NC}"
${ROOT_DIR}/ext/android/build.sh release

# install node dependencies
echo -e "${GREEN}>>> Installing node dependencies [npm install] ${NC}"
cd ${ROOT_DIR}/${EXAMPLE_DIR}
npm install

# Remove node_modules from the example project
echo -e "${GREEN}>>> Removing current module ${NC}"
react-native uninstall ${SDK_NAME}
rm -rfv node_modules/${SDK_NAME}

# Create a new directory with SDK_NAME
echo -e "${GREEN}>>> Create new directory in node_modules ${NC}"
mkdir node_modules/${SDK_NAME}

# Copy things to it
echo -e "${GREEN}>>> Copy modules to ${EXAMPLE_DIR}/node_modules/${SDK_NAME} ${NC}"
cd ${ROOT_DIR}
rsync -a . ${EXAMPLE_DIR}/node_modules/${SDK_NAME} --exclude=example --exclude=ext --exclude=test --exclude=scripts

# Establish link
echo -e "${GREEN}>>> Establish linkage to ${SDK_NAME} ${NC}"
cd ${EXAMPLE_DIR}
react-native link ${SDK_NAME}

echo -e "${GREEN}>>> Building & Running on Android ${NC}"
react-native run-android
