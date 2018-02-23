#!/usr/bin/env bash

# End script if one of the lines fails
set -e

# Get the current directory
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Traverse up to get to the root directory
ROOT_DIR="$(dirname "$ROOT_DIR")"
ROOT_DIR="$(dirname "$ROOT_DIR")"

SRC_DIR=ext/iOS/sdk
SCRIPT_DIR=scripts
SRC_OUT_DIR=test_plugin/ios

RED='\033[0;31m' # Red color
GREEN='\033[0;32m' # Green color
NC='\033[0m' # No Color

cd ${ROOT_DIR}
cp -Rv ${SRC_DIR}/AdjustTests/AdjustTestLibrary/* ${SRC_OUT_DIR}
