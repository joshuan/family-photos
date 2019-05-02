#!/bin/bash

echo "0. Install dependencies (OS - $TRAVIS_OS_NAME):"
if [ "$TRAVIS_OS_NAME" == "linux" ]; then
    npm ci --ignore-scripts
else
    npm ci
fi