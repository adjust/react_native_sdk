#!/usr/bin/env bash

# End script if one of the lines fails
set -e

# Get the current directory
SDK_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# Traverse up to get to the root directory
SDK_DIR="$(dirname "$SDK_DIR")"
SDK_DIR="$(dirname "$SDK_DIR")"

SRC_DIR=ext/iOS/sdk
LIB_OUT_DIR=ios/libs
SCRIPT_DIR=scripts

RED='\033[0;31m' # Red color
GREEN='\033[0;32m' # Green color
NC='\033[0m' # No Color

cd ${SDK_DIR}
echo -e "${GREEN}>>> Removing old framework ${NC}"
rm -rfv ${LIB_OUT_DIR}/AdjustSdk.framework

echo -e "${GREEN}>>> building new framework ${NC}"
cd ${SDK_DIR}/${SRC_DIR}
xcodebuild -target AdjustStatic -configuration Release

echo -e "${GREEN}>>> Copy built framework to designated location ${NC}"
cd ${SDK_DIR}
mv -v ${SRC_DIR}/Frameworks/Static/AdjustSdk.framework ${LIB_OUT_DIR}

echo -e "${GREEN}>>> Running symlink fix ${NC}"
#${SCRIPT_DIR}/symlink_fix.sh
