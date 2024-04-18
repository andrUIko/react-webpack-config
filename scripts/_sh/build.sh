#!/bin/bash

TS_NODE_PROJECT=$(pwd)/configs/tsconfig.json \
NODE_ENV=production \
webpack --mode=production --config=$(pwd)/configs/webpack/webpack.config.ts
