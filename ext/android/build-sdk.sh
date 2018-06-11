#!/usr/bin/env bash

set -e

# ======================================== #

# Colors for output
NC='\033[0m'
RED='\033[0;31m'
CYAN='\033[1;36m'
GREEN='\033[0;32m'

# ======================================== #

# Usage hint in case of wrong invocation.
if [ $# -ne 1 ]; then
    echo $0: "${CYAN}[ADJUST][BUILD-SDK-ANDROID]:${GREEN} Usage: ./build.sh [debug || release] ${NC}"
    exit 1
fi

BUILD_TYPE=$1

# ======================================== #

# Directories and paths of interest for the script.
SDK_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SDK_DIR="$(dirname "$SDK_DIR")"
SDK_DIR="$(dirname "$SDK_DIR")"
BUILD_DIR=sdk/Adjust
JAR_OUT_DIR=android/libs

# ======================================== #

# Move to Adjust directory.
cd $(dirname $0); cd $BUILD_DIR

# ======================================== #

if [ "$BUILD_TYPE" == "debug" ]; then
	echo -e "${CYAN}[ADJUST][BUILD-SDK-ANDROID]:${GREEN} Running makeDebugJar Gradle task ... ${NC}"
    JAR_IN_DIR=adjust/build/intermediates/bundles/debug
    ./gradlew makeDebugJar
    echo -e "${CYAN}[ADJUST][BUILD-SDK-ANDROID]:${GREEN} Done! ${NC}"
elif [ "$BUILD_TYPE" == "release" ]; then
	echo -e "${CYAN}[ADJUST][BUILD-SDK-ANDROID]:${GREEN} Running makeReleaseJar Gradle task ... ${NC}"
    JAR_IN_DIR=adjust/build/intermediates/bundles/release
    ./gradlew makeReleaseJar
    echo -e "${CYAN}[ADJUST][BUILD-SDK-ANDROID]:${GREEN} Done! ${NC}"
fi

# ======================================== #

echo -e "${CYAN}[ADJUST][BUILD-SDK-ANDROID]:${GREEN} Moving Android SDK JAR from ${JAR_IN_DIR} to ${JAR_OUT_DIR} ... ${NC}"
rm -rf ${SDK_DIR}/${JAR_OUT_DIR}
mkdir -pv ${SDK_DIR}/${JAR_OUT_DIR}
mv -v ${JAR_IN_DIR}/*.jar ${SDK_DIR}/${JAR_OUT_DIR}/adjust-android.jar
echo -e "${CYAN}[ADJUST][BUILD-SDK-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][BUILD-SDK-ANDROID]:${GREEN} Script completed! ${NC}"