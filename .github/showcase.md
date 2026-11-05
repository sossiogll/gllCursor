---
title: gll-cursor
claim: Your cursor should know what it's pointing at.
summary: A cursor that changes shape with what's under it and tells you what a click will do. You're using it right now.
color: "#D4FF3A"
since: 2022
features:
  - title: It changes shape
    text: Dot, caret, frame. Each element tells it what to become.
    icon: shapes
  - title: It says what happens
    text: "Open, copy, leave the site: you know before you click."
    icon: label
  - title: It steps aside
    text: Off on touch and with reduced motion. Nothing hides behind it.
    icon: aside
decisions:
  - what: A CSS transition that restarts at each target
    why: The code only says where the cursor should be. Restarting from where it is makes it trail the pointer and come away from a block as if stuck to it.
  - what: A core with no framework inside
    why: Plain TypeScript at the heart and a thin React adapter on top, so others can follow.
  - what: Data attributes, not class names
    why: data-cursor="text" says what an element is, without colliding with your CSS.
  - what: One folder per technology
    why: AngularJS and React live side by side, each with its own version, and a pipeline publishes a release when a tag names one of them.
---

<!-- gll:story -->

> The arrow cursor hasn't changed since the '80s. It doesn't have to stay that way.

In 2022 I was building b5srl.eu and wanted a cursor that reacted to the page instead of floating over it. I wrote it as an AngularJS module, inspired by SmartCursor.

AngularJS is gone. The idea stayed. This is the rewrite: no framework inside, small, and polite enough to switch itself off when it isn't wanted.
