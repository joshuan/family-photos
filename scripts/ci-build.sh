#!/bin/bash

echo "1. Lint:"
npm run lint || exit 2

echo "2. Build js:"
npm run prebuild || exit 3

echo "3. Compile:"
echo "OS: $TRAVIS_OS_NAME"
if [ "$TRAVIS_OS_NAME" == "linux" ]; then
    npm run build:win-linux || exit 4
else
    npm run build:mac || exit 4
fi

echo "4. Remove other files:"
sudo bash ./scripts/clean-extra.sh || exit 5