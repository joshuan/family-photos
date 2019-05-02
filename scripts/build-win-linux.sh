#!/bin/bash

docker run --rm \
    --env-file <(env | grep -E 'DEBUG|CI|TRAVIS') \
    -v ${PWD}:/project \
    -v ~/.cache/electron:/root/.cache/electron \
    -v ~/.cache/electron-builder:/root/.cache/electron-builder \
    electronuserland/builder:wine \
    /bin/bash -c "npm run rebuild && ./node_modules/.bin/electron-builder --linux --win"