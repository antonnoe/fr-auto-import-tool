#!/usr/bin/env bash
set -euo pipefail

rm -rf .test-dist
./node_modules/.bin/tsc -p tsconfig.test.json
find .test-dist/tests -name '*.test.js' -print0 | xargs -0 node --test
