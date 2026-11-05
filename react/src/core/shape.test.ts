import { describe, expect, it } from "vitest";
import { shapeFor } from "./shape.js";

const geometry = { dot: 18, caret: 3, offset: 6 };
const pointer = { x: 100, y: 200 };

describe("the shape of the cursor", () => {
  it("is a dot on the pointer at rest", () => {
    expect(shapeFor({ kind: "none" }, pointer, geometry)).toMatchObject({
      kind: "dot", x: 100, y: 200, width: 18, height: 18, radius: 9, label: null,
    });
  });

  it("is a caret on the pointer, as tall as the text under it", () => {
    expect(shapeFor({ kind: "text", fontSize: 40 }, pointer, geometry)).toMatchObject({
      kind: "caret", x: 100, y: 200, width: 3, height: 40,
    });
  });

  it("stays on the centre of a block, whatever the pointer does, wraps it at the offset and takes its radius", () => {
    const box = { left: 10, top: 20, width: 100, height: 50 };
    expect(shapeFor({ kind: "block", box, radius: 12, label: null }, pointer, geometry)).toMatchObject({
      kind: "frame", x: 60, y: 45, width: 112, height: 62, radius: 18, label: null,
    });
  });

  it("carries a label only when the block declares one", () => {
    const box = { left: 0, top: 0, width: 1, height: 1 };
    expect(shapeFor({ kind: "block", box, radius: 0, label: "↗ github" }, pointer, geometry).label).toBe("↗ github");
  });
});
