# @sossiogll/gll-cursor-react

A cursor that changes shape with what is under it: a dot at rest, a caret over text, a frame around anything clickable,
and a label when a click's result is not obvious.

```tsx
import { CursorProvider } from "@sossiogll/gll-cursor-react";
import "@sossiogll/gll-cursor-react/cursor.css";

<CursorProvider>
  <h1 data-cursor="text">Hello</h1>
  <a data-cursor="block" href="/projects">Projects</a>
  <a data-cursor="block" data-cursor-label="↗ github" href="https://github.com">GitHub</a>
  <section data-cursor-tone="dark">…a surface where the cursor's colour would not show…</section>
</CursorProvider>;
```

`useCursor()` gives `active`, and `refresh()` to call after a client-side navigation, when the element under the pointer
changes although the pointer did not move.

It adds information and never hides it. `active` is false on touch screens and with `prefers-reduced-motion`: what a
label says must also be in the page for those visitors.

## Theme

CSS variables, all optional:

| Variable | For |
| --- | --- |
| `--gll-cursor-colour`, `-text`, `-fill`, `-edge` | The cursor, its label's text, the dot's fill, a thin edge for light grounds |
| `--gll-cursor-dark-colour`, `-dark-text` | The same over `data-cursor-tone="dark"` |
| `--gll-cursor-dot`, `-caret`, `-ring`, `-offset` | Sizes |
| `--gll-cursor-move`, `-morph` | How long position and form take to catch up, 200ms by default |
| `--gll-cursor-label-font`, `-label-radius` | The label |
