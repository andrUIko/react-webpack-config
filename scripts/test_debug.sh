#!/bin/bash

./scripts/fix_jest.sh && \
node \
    --inspect-brk \
    node_modules/jest/bin/jest \
    --config ./configs/jest.config.ts \
    --runInBand \
    --detectOpenHandles \
    --watchAll
