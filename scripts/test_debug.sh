#!/bin/sh

node \
    --inspect-brk node_modules/.bin/jest \
    --config ./configs/jest.config.ts \
    --runInBand \
    --detectOpenHandles \
    --watch
