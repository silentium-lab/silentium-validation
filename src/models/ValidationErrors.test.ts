import { describe, expect, it } from "vitest";
import { ValidationItem } from "@/types";
import { ValidationErrors } from "@/models/ValidationErrors";
import { Of } from "silentium";

describe("ValidationErrors", () => {
  it("should return a MessageType for validation errors", async () => {
    const mockForm: ValidationItem[] = [
      {
        key: "name",
        value: "John",
        rules: [() => "required"],
      },
      {
        key: "age",
        value: 30,
        rules: [() => "must be number", (age) => age > 18 || "must be adult"],
      },
      {
        key: "balance",
        value: 5,
        rules: [(v) => v > 3 || "low balance"],
      },
      {
        key: "salary",
        value: 100,
        rules: [() => Of("not enough async or reactive")],
      },
    ];

    const $errors = ValidationErrors(mockForm);
    const errors = await $errors;

    expect(errors).toStrictEqual({
      age: ["must be number"],
      balance: [],
      name: ["required"],
      salary: ["not enough async or reactive"],
    });
  });

  it("should handle empty form", async () => {
    const $errors = ValidationErrors([]);
    const errors = await $errors;
    expect(errors).toStrictEqual({});
  });

  it("should handle items with no rules", async () => {
    const mockForm: ValidationItem[] = [
      {
        key: "name",
        value: "John",
        rules: [],
      },
    ];
    const $errors = ValidationErrors(mockForm);
    const errors = await $errors;
    expect(errors).toStrictEqual({
      name: [],
    });
  });

  it("should filter out true results from rules", async () => {
    const mockForm: ValidationItem[] = [
      {
        key: "age",
        value: 25,
        rules: [() => true, () => "error"],
      },
    ];
    const $errors = ValidationErrors(mockForm);
    const errors = await $errors;
    expect(errors).toStrictEqual({
      age: ["error"],
    });
  });

  it("should convert false results to 'Error!'", async () => {
    const mockForm: ValidationItem[] = [
      {
        key: "balance",
        value: 0,
        rules: [() => false],
      },
    ];
    const $errors = ValidationErrors(mockForm);
    const errors = await $errors;
    expect(errors).toStrictEqual({
      balance: ["Error!"],
    });
  });

  it("should handle duplicate keys, keeping the last", async () => {
    const mockForm: ValidationItem[] = [
      {
        key: "field",
        value: "first",
        rules: [() => "first error"],
      },
      {
        key: "field",
        value: "second",
        rules: [() => "second error"],
      },
    ];
    const $errors = ValidationErrors(mockForm);
    const errors = await $errors;
    expect(errors).toStrictEqual({
      field: ["second error"],
    });
  });
});
