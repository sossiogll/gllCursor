export type Point = { x: number; y: number };
export type Box = { left: number; top: number; width: number; height: number };
export type Geometry = { dot: number; caret: number; offset: number };

/** What is under the pointer, as the page declares it. */
export type Hit =
  | { kind: "none" }
  | { kind: "text"; fontSize: number }
  | { kind: "block"; box: Box; radius: number; label: string | null };

/** Placed by its centre, so that it grows and shrinks around the same point as it changes form. */
export type Shape = {
  kind: "dot" | "caret" | "frame";
  x: number;
  y: number;
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
        x: hit.box.left + hit.box.width / 2,
        y: hit.box.top + hit.box.height / 2,
        width: hit.box.width + 2 * geometry.offset,
        height: hit.box.height + 2 * geometry.offset,
        radius: hit.radius + geometry.offset,
        label: hit.label,
      };
    case "text":
      return {
        kind: "caret",
        x: pointer.x,
        y: pointer.y,
        width: geometry.caret,
        height: hit.fontSize,
        radius: geometry.caret,
        label: null,
      };
    case "none":
      return {
        kind: "dot",
        x: pointer.x,
        y: pointer.y,
        width: geometry.dot,
        height: geometry.dot,
        radius: geometry.dot / 2,
        label: null,
      };
  }
}
