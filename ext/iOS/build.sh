#!/usr/bin/env bash

# End script if one of the lines fails
# set -e

# Get the current directory
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Traverse up to get to the root directory
ROOT_DIR="$(dirname "$ROOT_DIR")"
ROOT_DIR="$(dirname "$ROOT_DIR")"

SRC_DIR=ext/iOS/sdk
SCRIPT_DIR=scripts
SRC_OUT_DIR=ios
# LIB_OUT_DIR=ios/libs

RED='\033[0;31m' # Red color
GREEN='\033[0;32m' # Green color
NC='\033[0m' # No Color

cd ${ROOT_DIR}
cp -Rv ${SRC_DIR}/Adjust ${SRC_OUT_DIR}

# Not needed for now, since we're not using AdjustSdk.framework, but source files.
# cd ${ROOT_DIR}
# echo -e "${GREEN}>>> Removing old framework ${NC}"
# rm -rfv ${LIB_OUT_DIR}/AdjustSdk.framework

# echo -e "${GREEN}>>> building new framework ${NC}"
# cd ${ROOT_DIR}/${SRC_DIR}
# xcodebuild -target AdjustStatic -configuration Release clean build

# echo -e "${GREEN}>>> Copy built framework to designated location ${NC}"
# cd ${ROOT_DIR}
# mv -v ${SRC_DIR}/Frameworks/Static/AdjustSdk.framework ${LIB_OUT_DIR}

# echo -e "${GREEN}>>> Running symlink fix ${NC}"
# ${SCRIPT_DIR}/symlink_fix.sh
