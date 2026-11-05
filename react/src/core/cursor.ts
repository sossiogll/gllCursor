import { approach, shapeFor, type Geometry, type Hit, type Point } from "./shape.js";

const ACTIVE_CLASS = "gll-cursor-active";
const MOVABLE = "(hover: hover) and (pointer: fine)";
const REDUCED = "(prefers-reduced-motion: reduce)";
const SETTLED = 0.1;
const LABEL_GAP = 8;
const DEFAULTS = { dot: 18, caret: 3, offset: 6, move: 120, morph: 180 };

type Animated = { left: number; top: number; width: number; height: number; radius: number };

export type Cursor = { refresh(): void; destroy(): void };

export function cursorWanted(): boolean {
  return matchMedia(MOVABLE).matches && !matchMedia(REDUCED).matches;
}

/** Sizes are CSS variables, so a site can set them from its own design tokens. */
function setting(styles: CSSStyleDeclaration, name: keyof typeof DEFAULTS): number {
  const value = Number.parseFloat(styles.getPropertyValue(`--gll-cursor-${name}`));
  return Number.isNaN(value) ? DEFAULTS[name] : value;
}

function hitAt(target: Element | null): Hit {
  const declared = target?.closest<HTMLElement>("[data-cursor]");
  if (!declared) return { kind: "none" };

  const styles = getComputedStyle(declared);
  if (declared.dataset.cursor === "text") {
    return { kind: "text", fontSize: Number.parseFloat(styles.fontSize) };
  }
  return {
    kind: "block",
    box: declared.getBoundingClientRect(),
    radius: Number.parseFloat(styles.borderTopLeftRadius) || 0,
    label: declared.dataset.cursorLabel ?? null,
  };
}

/** One object on the page that takes the shape of what is under the pointer. It adds information and hides none. */
export function createCursor(): Cursor {
  const styles = getComputedStyle(document.documentElement);
  const geometry: Geometry = {
    dot: setting(styles, "dot"),
    caret: setting(styles, "caret"),
    offset: setting(styles, "offset"),
  };
  const lag = { move: setting(styles, "move"), morph: setting(styles, "morph") };

  const body = document.createElement("div");
  body.className = "gll-cursor";
  const label = document.createElement("div");
  label.className = "gll-cursor-label";
  for (const element of [body, label]) {
    element.setAttribute("aria-hidden", "true");
    document.body.append(element);
  }

  let pointer: Point | null = null;
  let current: Animated | null = null;
  let frame = 0;
  let lastTime = 0;

  function target() {
    if (!pointer) return null;
    const under = document.elementFromPoint(pointer.x, pointer.y);
    const tone = under?.closest<HTMLElement>("[data-cursor-tone]")?.dataset.cursorTone ?? "signal";
    return { shape: shapeFor(hitAt(under), pointer, geometry), tone };
  }

  function paint(now: number) {
    frame = 0;
    const wanted = target();
    if (!wanted) return;
    const { shape, tone } = wanted;

    const elapsed = lastTime ? now - lastTime : 0;
    lastTime = now;
    const from: Animated = current ?? shape;
    current = {
      left: approach(from.left, shape.left, elapsed, lag.move / 2),
      top: approach(from.top, shape.top, elapsed, lag.move / 2),
      width: approach(from.width, shape.width, elapsed, lag.morph / 2),
      height: approach(from.height, shape.height, elapsed, lag.morph / 2),
      radius: approach(from.radius, shape.radius, elapsed, lag.morph / 2),
    };

    body.dataset.shape = shape.kind;
    body.dataset.tone = tone;
    body.style.transform = `translate3d(${current.left}px, ${current.top}px, 0)`;
    body.style.width = `${current.width}px`;
    body.style.height = `${current.height}px`;
    body.style.borderRadius = `${current.radius}px`;

    label.dataset.tone = tone;
    label.dataset.visible = String(shape.label !== null);
    if (shape.label !== null) {
      label.textContent = shape.label;
      const x = current.left + current.width - label.offsetWidth;
      const y = current.top - label.offsetHeight - LABEL_GAP;
      label.style.transform = `translate3d(${Math.max(LABEL_GAP, x)}px, ${Math.max(LABEL_GAP, y)}px, 0)`;
    }

    const moving = (["left", "top", "width", "height"] as const).some(
      (side) => Math.abs(current![side] - shape[side]) > SETTLED,
    );
    if (moving) schedule();
    else lastTime = 0;
  }

  function schedule() {
    if (frame === 0) frame = requestAnimationFrame(paint);
  }

  function onMove(event: PointerEvent) {
    if (event.pointerType === "touch") return;
    pointer = { x: event.clientX, y: event.clientY };
    document.documentElement.classList.add(ACTIVE_CLASS);
    body.dataset.visible = "true";
    schedule();
  }

  function onLeave() {
    body.dataset.visible = "false";
    label.dataset.visible = "false";
    current = null;
    pointer = null;
    lastTime = 0;
  }

  const options = { passive: true } as const;
  addEventListener("pointermove", onMove, options);
  document.documentElement.addEventListener("pointerleave", onLeave, options);
  addEventListener("scroll", schedule, { passive: true, capture: true });
  addEventListener("resize", schedule, options);

  return {
    refresh: schedule,
    destroy() {
      cancelAnimationFrame(frame);
      removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      removeEventListener("scroll", schedule, { capture: true });
      removeEventListener("resize", schedule);
      document.documentElement.classList.remove(ACTIVE_CLASS);
      body.remove();
      label.remove();
    },
  };
}

/** Calls back when the answer to "is a cursor wanted here?" may have changed. */
export function watchCursorConditions(onChange: () => void): () => void {
  const queries = [matchMedia(MOVABLE), matchMedia(REDUCED)];
  for (const query of queries) query.addEventListener("change", onChange);
  return () => {
    for (const query of queries) query.removeEventListener("change", onChange);
  };
}
