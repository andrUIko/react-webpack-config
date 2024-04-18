#!/bin/bash

TS_NODE_PROJECT=$(pwd)/configs/tsconfig.json \
NODE_ENV=test \
node \
    --inspect-brk \
    node_modules/jest/bin/jest \
    --config $(pwd)/configs/jest.config.ts \
    --runInBand \
    --detectOpenHandles \
    --watchAll
