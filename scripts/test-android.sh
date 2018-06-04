#!/usr/bin/env bash

# Exit if any errors occur
set -e

POSITIONAL=()
BUILD_NATIVE=YES
BUILD_PLUGIN=YES

while [[ $# -gt 0 ]]
do
    key="$1"

    case $key in
        --skip-native)
            BUILD_NATIVE=NO
            shift # past argument
            ;;
        --skip-plugin)
            BUILD_PLUGIN=NO
            shift # past argument
            ;;
        --help)
            DISPLAY_HELP=YES
            shift # past argument
            ;;
        *)
            POSITIONAL+=("$1") # save it in an array for later
            shift # past argument
            ;;
    esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

# check for invalid arguments
if [[ -n $1 ]]; then
    echo "Argument invalid"
    exit 0
fi

if [ "${DISPLAY_HELP}" == YES ]; then
    echo "./rn_ci_android; runs ci build script"
    echo
    echo "# Make sure"
    echo "- Emulator is running"
    echo "- Test server is running"
    echo
    echo "# Arguments"
    echo "    --skip-native: Skips building the native libraries in ext/"
    echo "    --skip-plugin: Skips building plugin"
    echo "    --help: Displays help"
    exit 1
fi

# Get the current directory (/scripts/ directory)
SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Traverse up to get to the root directory
ROOT_DIR="$(dirname "$SCRIPTS_DIR")"
PROJECT_DIR=test/app
TEST_PLUGIN_DIR=test/lib
SDK_PLUGIN_NAME=react-native-adjust
TEST_PLUGIN_NAME=react-native-adjust-testing

RED='\033[0;31m' # Red color
GREEN='\033[0;32m' # Green color
NC='\033[0m' # No Color

# Kill any previously running packager instances
#killall -9 node || true

echo -e "${GREEN}>>> Removing app from device ${NC}"
adb uninstall com.adjust.testapp || true

if [ "$BUILD_NATIVE" = YES ]; then
    echo -e "${GREEN}>>> Removing Android JARs ${NC}"
    cd ${ROOT_DIR}
    rm -rfv android/libs/*
    rm -rfv test_plugin/android/libs/adjust-testing.jar

    echo -e "${GREEN}>>> Building the Android JARs ${NC}"
    cd ${ROOT_DIR}
    ext/android/build.sh release
    ext/android/build_test_lib.sh 
fi

if [ "$BUILD_PLUGIN" = YES ]; then
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
    rsync -a . ${PROJECT_DIR}/node_modules/${SDK_PLUGIN_NAME} --exclude=example --exclude=ext --exclude=scripts --exclude=test/lib --exclude=test/app --exclude=.git

    echo -e "${GREEN}>>> Copy modules to ${PROJECT_DIR}/node_modules/${TEST_PLUGIN_NAME} ${NC}"
    cd ${ROOT_DIR}/${TEST_PLUGIN_DIR}
    rsync -a . ${ROOT_DIR}/${PROJECT_DIR}/node_modules/${TEST_PLUGIN_NAME}

    echo -e "${GREEN}>>> Establish linkages ${NC}"
    cd ${ROOT_DIR}/${PROJECT_DIR}
    react-native link ${SDK_PLUGIN_NAME}
    react-native link ${TEST_PLUGIN_NAME}
fi

echo -e "${GREEN}>>> Building & Running on Android ${NC}"
cd ${ROOT_DIR}/${PROJECT_DIR}
react-native run-android
