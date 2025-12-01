import { describe, it, expect } from "vitest";
import { ValidationItems } from "./ValidationItems";

describe("ValidationItems", () => {
  it("should return a MessageRx for form fields", () => {
    const required = () => "required";
    const number = () => "number";
    const form = { name: "John", age: 30 };
    const rules = {
      name: [required],
      age: [number],
    };

    const result = ValidationItems(form, rules as any);

    expect(result).toStrictEqual([
      {
        key: "name",
        rules: [required],
        value: "John",
      },
      {
        key: "age",
        rules: [number],
        value: 30,
      },
    ]);
  });

  it("should handle empty form", () => {
    const form = {};
    const rules = {};

    const result = ValidationItems(form, rules);

    expect(result).toStrictEqual([]);
  });
});
