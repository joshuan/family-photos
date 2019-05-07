#!/bin/bash

echo "0. Install dependencies (OS - $TRAVIS_OS_NAME):"
if [ "$TRAVIS_OS_NAME" == "linux" ]; then
    npm ci --ignore-scripts || exit 2
else
    npm ci || exit 2
fi
