import { ValidationErrors } from "@/models/ValidationErrors";
import { ValidationItems } from "@/models/ValidationItems";
import { Integer, Required } from "@/rules";
import { Computed, Late } from "silentium";
import { describe, expect, test } from "vitest";

describe("ValidationItems", () => {
  test("should return a MessageRx for form fields", () => {
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

  test("reactive variant", async () => {
    const form = Late({ name: "John", age: 30 });
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

  test("should handle empty form", () => {
    const form = {};
    const rules = {};

    const result = ValidationItems(form, rules);

    expect(result).toStrictEqual([]);
  });

  test("Integration with errors component", async () => {
    const form = { name: "John", age: 11.1, norule: "Norule" };
    const rules = {
      name: [Required],
      age: [Integer],
    };

    const $errors = ValidationErrors(ValidationItems(form, rules as any));
    expect(await $errors).toStrictEqual({
      age: ["Must be integer"],
      name: [],
    });
  });
});
