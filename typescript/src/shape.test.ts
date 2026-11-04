import { describe, expect, it } from "vitest";
import { approach, shapeFor } from "./shape.js";

const geometry = { dot: 18, caret: 3, offset: 6 };
const pointer = { x: 100, y: 200 };

describe("the shape of the cursor", () => {
  it("is a dot centred on the pointer at rest", () => {
    expect(shapeFor({ kind: "none" }, pointer, geometry)).toMatchObject({
      kind: "dot", left: 91, top: 191, width: 18, height: 18, label: null,
    });
  });

  it("is a caret as tall as the text under it", () => {
    expect(shapeFor({ kind: "text", fontSize: 40 }, pointer, geometry)).toMatchObject({
      kind: "caret", top: 180, width: 3, height: 40,
    });
  });

  it("wraps a block at the offset and takes its radius", () => {
    const box = { left: 10, top: 20, width: 100, height: 50 };
    expect(shapeFor({ kind: "block", box, radius: 12, label: null }, pointer, geometry)).toMatchObject({
      kind: "frame", left: 4, top: 14, width: 112, height: 62, radius: 18, label: null,
    });
  });

  it("carries a label only when the block declares one", () => {
    const box = { left: 0, top: 0, width: 1, height: 1 };
    expect(shapeFor({ kind: "block", box, radius: 0, label: "↗ github" }, pointer, geometry).label).toBe("↗ github");
  });
});

describe("the easing", () => {
  it("does not depend on how the time is cut into frames", () => {
    const once = approach(0, 100, 32, 120);
    const twice = approach(approach(0, 100, 16, 120), 100, 16, 120);
    expect(twice).toBeCloseTo(once, 6);
  });

  it("gets there", () => {
    expect(approach(0, 100, 5000, 120)).toBeCloseTo(100, 3);
  });
});
