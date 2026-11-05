import { shapeFor, type Geometry, type Hit, type Point } from "./shape.js";

const ACTIVE_CLASS = "gll-cursor-active";
const MOVABLE = "(hover: hover) and (pointer: fine)";
const REDUCED = "(prefers-reduced-motion: reduce)";
const LABEL_GAP = 8;
const DEFAULTS = { dot: 18, caret: 3, offset: 6 };

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

/**
 * One object on the page that takes the shape of what is under the pointer. It adds information and hides none.
 *
 * This only says where the cursor should be. The stylesheet's transition does the rest: each new target restarts it from
 * wherever the cursor is, and that is what makes it trail the pointer and come away from a block as if stuck to it.
 */
export function createCursor(): Cursor {
  const styles = getComputedStyle(document.documentElement);
  const geometry: Geometry = {
    dot: setting(styles, "dot"),
    caret: setting(styles, "caret"),
    offset: setting(styles, "offset"),
  };

  const body = document.createElement("div");
  body.className = "gll-cursor";
  const label = document.createElement("div");
  label.className = "gll-cursor-label";
  for (const element of [body, label]) {
    element.setAttribute("aria-hidden", "true");
    document.body.append(element);
  }

  let pointer: Point | null = null;
  let frame = 0;

  /** The transitions apply only once visible: the cursor must not fly in from where it last was. */
  function showAt(element: HTMLElement, place: () => void) {
    place();
    if (element.dataset.visible !== "true") {
      void element.offsetWidth;
      element.dataset.visible = "true";
    }
  }

  function paint() {
    frame = 0;
    if (!pointer) return;
    const under = document.elementFromPoint(pointer.x, pointer.y);
    const tone = under?.closest<HTMLElement>("[data-cursor-tone]")?.dataset.cursorTone ?? "signal";
    const shape = shapeFor(hitAt(under), pointer, geometry);

    showAt(body, () => {
      body.dataset.shape = shape.kind;
      body.dataset.tone = tone;
      body.style.transform = `translate3d(${shape.x}px, ${shape.y}px, 0) translate(-50%, -50%)`;
      body.style.width = `${shape.width}px`;
      body.style.height = `${shape.height}px`;
      body.style.borderRadius = `${shape.radius}px`;
    });

    label.dataset.tone = tone;
    if (shape.label === null) {
      label.dataset.visible = "false";
      return;
    }
    showAt(label, () => {
      label.textContent = shape.label;
      const right = Math.max(label.offsetWidth + LABEL_GAP, shape.x + shape.width / 2);
      const top = Math.max(label.offsetHeight + LABEL_GAP, shape.y - shape.height / 2 - LABEL_GAP);
      label.style.transform = `translate3d(${right}px, ${top}px, 0) translate(-100%, -100%)`;
    });
  }

  function schedule() {
    if (frame === 0) frame = requestAnimationFrame(paint);
  }

  function onMove(event: PointerEvent) {
    if (event.pointerType === "touch") return;
    pointer = { x: event.clientX, y: event.clientY };
    document.documentElement.classList.add(ACTIVE_CLASS);
    schedule();
  }

  function onLeave() {
    body.dataset.visible = "false";
    label.dataset.visible = "false";
    pointer = null;
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
