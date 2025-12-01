import { describe, expect, it } from "vitest";
import { ValidationItem } from "../types";
import { ValidationErrors } from "./ValidationErrors";
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
});
