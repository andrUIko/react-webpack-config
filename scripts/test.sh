#!/bin/bash

NODE_ENV=test \
TS_NODE_PROJECT=$(pwd)/configs/tsconfig.json \
jest --config $(pwd)/configs/jest.config.ts
