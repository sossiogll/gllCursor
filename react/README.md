# @sossiogll/gll-cursor-react

The React adapter of [`@sossiogll/gll-cursor`](../typescript), which is its peer dependency.

```tsx
import { CursorProvider } from "@sossiogll/gll-cursor-react";
import "@sossiogll/gll-cursor/cursor.css";

<CursorProvider>
  <h1 data-cursor="text">Hello</h1>
  <a data-cursor="block" data-cursor-label="↗ github" href="https://github.com">GitHub</a>
</CursorProvider>;
```

`useCursor()` gives `active`, and `refresh()` to call after a client-side navigation, when the element under the pointer
changes although the pointer did not move.
