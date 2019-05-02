#!/bin/bash

echo "1. Lint:"
npm run lint

echo "2. Build js:"
npm run prebuild

echo "3. Compile:"
echo "OS: $TRAVIS_OS_NAME"
if [ "$TRAVIS_OS_NAME" == "linux" ]; then
    npm run build:win-linux
else
    npm run build:mac
fi

echo "4. Remove other files:"
sudo bash ./scripts/clean-extra.sh