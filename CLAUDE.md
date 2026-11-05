# gll-cursor

A cursor that changes shape with what is under it. It adds information and never hides it.

## One repository, one folder per technology

| Folder | Package | Technology | Tag of a release |
| --- | --- | --- | --- |
| `angular1/` | `@sossiogll/gll-cursor-angular1` | AngularJS 1 | `angular1/vX.Y.Z` |
| `react/` | `@sossiogll/gll-cursor-react` | React | `react/vX.Y.Z` |

- Each folder has its own version and `CHANGELOG.md`, and is released on its own by `.github/workflows/release.yml`,
  which refuses a tag that differs from the folder's version. Nothing is published by hand.
- `react/src/core/` knows nothing of React: colours and sizes are CSS variables, and it knows no site.

## Rules

- Elements declare themselves (`data-cursor`, `data-cursor-label`, `data-cursor-tone`), never by class. The AngularJS
  module keeps its `gllText` and `gllBlock` classes.
- Off on touch and with `prefers-reduced-motion`.
- Movement belongs to the CSS transition, in both technologies: code says where the cursor should be, and each new target
  restarts the transition. That is the "stuck, then comes away" feel; a React version must keep it.
- No library without a reason. A comment says why, never what.
- Everything runs in Docker: `scripts/pack.sh` tests and packs both into `packages/`.
- Branch and pull request, never directly on `master`. No mention of AI tools and no `Co-Authored-By` lines.
