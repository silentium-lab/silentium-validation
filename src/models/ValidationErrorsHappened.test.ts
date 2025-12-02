import { Computed } from "silentium";
import { describe, expect, test } from "vitest";
import { ValidationErrorsHappened } from "./ValidationErrorsHappened";

describe("ValidationErrorsHappened.test", () => {
  test("regular", async () => {
    const errors = {
      name: ["required"],
      age: [],
    };
    const $happened = Computed(ValidationErrorsHappened, errors);
    expect(await $happened).toStrictEqual({
      name: ["required"],
    });
  });
});
