import { Computed, LateShared } from "silentium";
import { describe, expect, it } from "vitest";
import { ValidationItems } from "@/models/ValidationItems";
import { Integer, Required } from "@/rules";

describe("ValidationItems", () => {
  it("should return a MessageRx for form fields", () => {
    const form = { name: "John", age: 30 };
    const rules = {
      name: [Required],
      age: [Integer],
    };

    const result = ValidationItems(form, rules as any);

    expect(result).toStrictEqual([
      {
        key: "name",
        rules: [Required],
        value: "John",
      },
      {
        key: "age",
        rules: [Integer],
        value: 30,
      },
    ]);
  });

  it("reactive variant", async () => {
    const form = LateShared({ name: "John", age: 30 });
    const rules = {
      name: [Required],
      age: [Integer],
    };

    const $result = Computed(ValidationItems, form, rules);

    expect(await $result).toStrictEqual([
      {
        key: "name",
        rules: [Required],
        value: "John",
      },
      {
        key: "age",
        rules: [Integer],
        value: 30,
      },
    ]);

    form.use({
      name: "Happy",
      age: 5,
    });

    expect(await $result).toStrictEqual([
      {
        key: "name",
        rules: [Required],
        value: "Happy",
      },
      {
        key: "age",
        rules: [Integer],
        value: 5,
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
