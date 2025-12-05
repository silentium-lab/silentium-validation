import { Computed, Late } from "silentium";
import { describe, expect, test } from "vitest";
import { ValidationErrorType } from "@/types";
import { ValidationErrorsSummary } from "@/models/ValidationErrorsSummary";

describe("ValidationErrorsSummary.test", () => {
  test("regular", async () => {
    const $errors = Late<ValidationErrorType>({});
    const $summary = Computed(ValidationErrorsSummary, $errors);
    expect(await $summary).toStrictEqual([]);

    $errors.use({
      name: ["Must be more 20 chars"],
      age: ["Must be adult"],
    });
    expect(await $summary).toStrictEqual([
      "Must be more 20 chars",
      "Must be adult",
    ]);
  });
});
