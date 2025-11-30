import { describe, it, expect } from "vitest";
import { ValidationItems } from "./ValidationItems";

describe("ValidationItems", () => {
  it("should return a MessageRx for form fields", () => {
    const form = { name: "John", age: 30 };
    const rules = {
      name: [() => "required"],
      age: [() => "number"],
    };

    const result = ValidationItems(form, rules as any);

    expect(result).toHaveProperty("executor");
    expect(result).toHaveProperty("rejections");
    expect(result).toHaveProperty("dc");
  });

  it("should handle empty form", () => {
    const form = {};
    const rules = {};

    const result = ValidationItems(form, rules);

    expect(result).toHaveProperty("executor");
  });
});
