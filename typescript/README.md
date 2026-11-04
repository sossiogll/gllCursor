# @sossiogll/gll-cursor

A cursor that changes shape with what is under it: a dot at rest, a caret over text, a frame around anything clickable,
and a label when a click's result is not obvious. No framework inside. For React, see [`react/`](../react).

```ts
import { createCursor, cursorWanted } from "@sossiogll/gll-cursor";
import "@sossiogll/gll-cursor/cursor.css";

if (cursorWanted()) createCursor();
```

Elements declare what they are:

```html
<h1 data-cursor="text">Hello</h1>
<a data-cursor="block" href="/projects">Projects</a>
<a data-cursor="block" data-cursor-label="↗ github" href="https://github.com">GitHub</a>
<section data-cursor-tone="dark">…a surface where the cursor's colour would not show…</section>
```

It adds information and never hides it. `cursorWanted()` is false on touch screens and with
`prefers-reduced-motion`: what a label says must also be in the page for those visitors.

## Theme

CSS variables, all optional:

| Variable | For |
| --- | --- |
| `--gll-cursor-colour`, `-text`, `-fill`, `-edge` | The cursor, its label's text, the dot's fill, a thin edge for light grounds |
| `--gll-cursor-dark-colour`, `-dark-text` | The same over `data-cursor-tone="dark"` |
| `--gll-cursor-dot`, `-caret`, `-ring`, `-offset` | Sizes |
| `--gll-cursor-move`, `-morph` | Lag of position and shape, in ms |
| `--gll-cursor-label-font`, `-label-radius` | The label |
