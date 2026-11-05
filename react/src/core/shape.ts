export type Point = { x: number; y: number };
export type Box = { left: number; top: number; width: number; height: number };
export type Geometry = { dot: number; caret: number; offset: number };

/** What is under the pointer, as the page declares it. */
export type Hit =
  | { kind: "none" }
  | { kind: "text"; fontSize: number }
  | { kind: "block"; box: Box; radius: number; label: string | null };

export type Shape = {
  kind: "dot" | "caret" | "frame";
  left: number;
  top: number;
  width: number;
  height: number;
  radius: number;
  label: string | null;
};

export function shapeFor(hit: Hit, pointer: Point, geometry: Geometry): Shape {
  switch (hit.kind) {
    case "block":
      return {
        kind: "frame",
        left: hit.box.left - geometry.offset,
        top: hit.box.top - geometry.offset,
        width: hit.box.width + 2 * geometry.offset,
        height: hit.box.height + 2 * geometry.offset,
        radius: hit.radius + geometry.offset,
        label: hit.label,
      };
    case "text":
      return {
        kind: "caret",
        left: pointer.x - geometry.caret / 2,
        top: pointer.y - hit.fontSize / 2,
        width: geometry.caret,
        height: hit.fontSize,
        radius: geometry.caret,
        label: null,
      };
    case "none":
      return {
        kind: "dot",
        left: pointer.x - geometry.dot / 2,
        top: pointer.y - geometry.dot / 2,
        width: geometry.dot,
        height: geometry.dot,
        radius: geometry.dot / 2,
        label: null,
      };
  }
}

/** Frame-rate independent easing: after `lag` ms, about two thirds of the way there. */
export function approach(current: number, target: number, elapsed: number, lag: number): number {
  return target + (current - target) * Math.exp(-elapsed / lag);
}
