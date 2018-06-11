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
SRC_DIR=ext/iOS/sdk
SCRIPT_DIR=scripts
SRC_OUT_DIR=test/lib/ios

# ======================================== #

echo -e "${CYAN}[ADJUST][BUILD-TEST-IOS]:${GREEN} Copying iOS SDK test source files from ${ROOT_DIR}/${SRC_DIR} to ${ROOT_DIR}/${SRC_OUT_DIR} ... ${NC}"
cd ${ROOT_DIR}
cp -Rv ${SRC_DIR}/AdjustTests/AdjustTestLibrary/AdjustTestLibrary/* ${SRC_OUT_DIR}/AdjustTestLibrary/
echo -e "${CYAN}[ADJUST][BUILD-TEST-IOS]:${GREEN} Done! ${NC}"

# ======================================== #

echo -e "${CYAN}[ADJUST][BUILD-TEST-IOS]:${GREEN} Script completed! ${NC}"
