import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("the core", () => {
  const files = readdirSync("src/core").filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"));

  it("is what this test reads", () => {
    expect(files).toEqual(expect.arrayContaining(["cursor.ts", "shape.ts"]));
  });

  // So another adapter can be added next to the React one without touching it.
  it("knows nothing of React", () => {
    expect(files.filter((f) => /from "react"/.test(readFileSync(`src/core/${f}`, "utf8")))).toEqual([]);
  });
});
