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
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$ROOT_DIR")"
ROOT_DIR="$(dirname "$ROOT_DIR")"
BUILD_DIR=ext/android/sdk/Adjust
JAR_OUT_DIR=test/lib/android/libs
JAR_IN_DIR=ext/android/sdk/Adjust/testlibrary/build/outputs

# ======================================== #

echo -e "${CYAN}[ADJUST][BUILD-TEST-ANDROID]:${GREEN} Running makeJar Gradle task ... ${NC}"
cd ${ROOT_DIR}/${BUILD_DIR}
./gradlew clean :testlibrary:makeJar
echo -e "${CYAN}[ADJUST][BUILD-TEST-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][BUILD-TEST-ANDROID]:${GREEN} Moving Android SDK test JAR from ${JAR_IN_DIR} to ${JAR_OUT_DIR} ... ${NC}"
cd ${ROOT_DIR}
mkdir -p ${JAR_OUT_DIR}
mv -v ${ROOT_DIR}/${JAR_IN_DIR}/*.jar ${ROOT_DIR}/${JAR_OUT_DIR}/adjust-testing.jar
echo -e "${CYAN}[ADJUST][BUILD-TEST-ANDROID]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][BUILD-TEST-ANDROID]:${GREEN} Script completed! ${NC}"