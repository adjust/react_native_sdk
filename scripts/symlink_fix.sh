#!/usr/bin/env bash

# End script if one of the lines fails
set -e

# Get the current directory (/scripts/ directory)
SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# Traverse up to get to the root directory
SDK_DIR="$(dirname "$SCRIPTS_DIR")"

# Relative directories
SRC_DIR=ios/libs

echo ">>><<<"
echo ">>> Symlink_fix started"
echo ">>><<<"

# Go to framework folder
cd ${SDK_DIR}/${SRC_DIR}/AdjustSdk.framework

# Remove any existing symlinks
rm -rfv AdjustSdk
rm -rfv Headers

# Move library and headers
mv -v Versions/A/AdjustSdk .
mv -v Versions/A/Headers .

# Remove Versions folder
rm -rfv Versions

echo ">>><<<"
echo ">>> Symlink_fix finished"
echo ">>><<<"
