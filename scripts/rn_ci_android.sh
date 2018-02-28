#!/usr/bin/env bash

# Exit if any errors occur
set -e

# Get the current directory (/scripts/ directory)
SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Traverse up to get to the root directory
ROOT_DIR="$(dirname "$SCRIPTS_DIR")"
PROJECT_DIR=test_app
TEST_PLUGIN_DIR=test_plugin
SDK_PLUGIN_NAME=react-native-adjust
TEST_PLUGIN_NAME=react-native-adjust-testing

RED='\033[0;31m' # Red color
GREEN='\033[0;32m' # Green color
NC='\033[0m' # No Color

# Kill any previously running packager instances
#killall -9 node || true

echo -e "${GREEN}>>> Removing Android JARs ${NC}"
cd ${ROOT_DIR}
rm -rfv android/libs/*
rm -rfv test_plugin/android/libs/adjust-testing.jar

echo -e "${GREEN}>>> Removing app from device ${NC}"
adb uninstall com.adjust.testapp || true

echo -e "${GREEN}>>> Building the Android JARs ${NC}"
cd ${ROOT_DIR}
ext/android/build.sh release
ext/android/build_test_lib.sh 

echo -e "${GREEN}>>> Removing current module ${NC}"
cd ${ROOT_DIR}/${PROJECT_DIR}
react-native unlink ${SDK_PLUGIN_NAME}
react-native unlink ${TEST_PLUGIN_NAME}
react-native uninstall ${SDK_PLUGIN_NAME} || true
react-native uninstall ${TEST_PLUGIN_NAME} || true
rm -rfv node_modules/${SDK_PLUGIN_NAME}
rm -rfv node_modules/${TEST_PLUGIN_NAME}

echo -e "${GREEN}>>> Create new directory in node_modules ${NC}"
cd ${ROOT_DIR}/${PROJECT_DIR}
mkdir -p node_modules/${SDK_PLUGIN_NAME}
mkdir -p node_modules/${TEST_PLUGIN_NAME}

echo -e "${GREEN}>>> Copy modules to ${PROJECT_DIR}/node_modules/${SDK_PLUGIN_NAME} ${NC}"
cd ${ROOT_DIR}
rsync -a . ${PROJECT_DIR}/node_modules/${SDK_PLUGIN_NAME} --exclude=example --exclude=ext --exclude=scripts --exclude=test_plugin --exclude=test_app --exclude=.git

echo -e "${GREEN}>>> Copy modules to ${PROJECT_DIR}/node_modules/${TEST_PLUGIN_NAME} ${NC}"
cd ${ROOT_DIR}/${TEST_PLUGIN_DIR}
rsync -a . ${ROOT_DIR}/${PROJECT_DIR}/node_modules/${TEST_PLUGIN_NAME}

echo -e "${GREEN}>>> Establish linkages ${NC}"
cd ${ROOT_DIR}/${PROJECT_DIR}
react-native link ${SDK_PLUGIN_NAME}
react-native link ${TEST_PLUGIN_NAME}

echo -e "${GREEN}>>> Building & Running on Android ${NC}"
cd ${ROOT_DIR}/${PROJECT_DIR}
react-native run-android
