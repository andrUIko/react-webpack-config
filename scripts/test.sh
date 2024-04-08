#!/bin/bash

./scripts/fix_jest.sh && \
npx jest --config ./configs/jest.config.ts
