import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges utility classes and resolves conflicts", () => {
    expect(cn("p-2", "p-4", "text-sm")).toBe("p-4 text-sm");
  });

  it("handles conditional values", () => {
    const isHidden = false;
    expect(cn("base", isHidden && "hidden", null, undefined, "ok")).toBe("base ok");
  });
});
