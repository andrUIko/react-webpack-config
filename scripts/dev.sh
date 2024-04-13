#!/bin/bash

TS_NODE_PROJECT=$(pwd)/configs/tsconfig.json \
NODE_ENV=development \
webpack-dev-server --mode=development --config=$(pwd)/configs/webpack/webpack.config.ts
