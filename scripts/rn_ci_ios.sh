#!/usr/bin/env bash

# Exit if any errors occur
set -e

# Get the current directory (/scripts/ directory)
SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# Traverse up to get to the root directory
ROOT_DIR="$(dirname "$SCRIPTS_DIR")"
PROJECT_DIR=test_app
SDK_PLUGIN_NAME=react-native-adjust
TEST_PLUGIN_DIR=test_plugin
SDK_PLUGIN_NAME=react-native-adjust
TEST_PLUGIN_NAME=react-native-adjust-testing

RED='\033[0;31m' # Red color
GREEN='\033[0;32m' # Green color
NC='\033[0m' # No Color

echo -e "${GREEN}>>> Copying iOS files ${NC}"
cd ${ROOT_DIR}
ext/ios/build.sh

echo -e "${GREEN}>>> Removing current module ${NC}"
cd ${ROOT_DIR}/${PROJECT_DIR}
react-native unlink ${SDK_PLUGIN_NAME} || true
react-native unlink ${TEST_PLUGIN_NAME} || true
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
react-native link ${SDK_PLUGIN_NAME} || true
react-native link ${TEST_PLUGIN_NAME} || true

echo -e "${GREEN}>>> Building & Running on Android ${NC}"
cd ${ROOT_DIR}/${PROJECT_DIR}
echo success. Run it from Xcode
