#!/bin/sh
# Tests and packs both technologies, inside a container. The tarballs land in release/packages/.
set -eu
docker run --rm -v "$PWD":/repo -v gll-cursor-ts-modules:/repo/typescript/node_modules -v gll-cursor-react-modules:/repo/react/node_modules -w /repo node:24-alpine sh -ceu '
  mkdir -p release/packages
  cd typescript
  npm install --no-audit --no-fund --silent
  npm run -s typecheck
  npm test --silent
  npm run -s build
  npm pack --silent --pack-destination ../release/packages
  cd ../react
  npm install --no-audit --no-fund --silent --legacy-peer-deps
  # The peer is not on a registry yet: unpack the one just built, exactly as a consumer would receive it.
  rm -rf node_modules/@sossiogll/gll-cursor
  mkdir -p node_modules/@sossiogll/gll-cursor
  tar -xzf ../release/packages/sossiogll-gll-cursor-*.tgz -C node_modules/@sossiogll/gll-cursor --strip-components=1
  npm run -s typecheck
  npm run -s build
  npm pack --silent --pack-destination ../release/packages
'
ls release/packages
