#!/bin/sh
# Tests and packs both technologies inside a container, as the pipeline does. The tarballs land in packages/.
set -eu
docker run --rm -v "$PWD":/repo -v gll-cursor-react-modules:/repo/react/node_modules -w /repo node:24-alpine sh -ceu '
  mkdir -p packages
  (cd angular1 && npm pack --silent --pack-destination ../packages)
  cd react
  npm install --no-audit --no-fund --silent
  npm run -s typecheck
  npm test --silent
  npm run -s build
  npm pack --silent --pack-destination ../packages
'
ls packages
