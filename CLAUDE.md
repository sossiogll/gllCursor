# gll-cursor

A cursor that changes shape with what is under it. It adds information and never hides it.

## Two technologies, two folders, two releases

| Folder | Package | Technology | Tag of a release |
| --- | --- | --- | --- |
| `typescript/` | `@sossiogll/gll-cursor` | TypeScript, no dependencies | `gll-cursor@X.Y.Z` |
| `react/` | `@sossiogll/gll-cursor-react` | React adapter | `gll-cursor-react@X.Y.Z` |

- Each folder is its own package, with its own version and `CHANGELOG.md`. They are released separately.
- The dependency goes one way: `react/` depends on `typescript/`, as a peer, and holds no cursor logic.
- `typescript/` knows no framework and no site: colours and sizes are CSS variables.
- At the root, `GllCursor.js` and `release/GllCursor.js` are the AngularJS module of 2022, kept as they are until it is
  decided what happens to them.

## Rules

- Elements declare themselves (`data-cursor`, `data-cursor-label`, `data-cursor-tone`), never by class.
- Off on touch and with `prefers-reduced-motion`.
- No library without a reason. A comment says why, never what.
- Everything runs in Docker: `scripts/pack.sh` tests, builds and packs both.
- Branch and pull request, never directly on `master`. No mention of AI tools and no `Co-Authored-By` lines.
