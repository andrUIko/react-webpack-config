#!/bin/sh

npx concurrently \
    -c blue,magenta,yellow \
    -n "tsc,prettier,eslint" \
    --timings "npm run check-types" "npm run check-format" "npm run lint" \
&& npm run test && npm run build
