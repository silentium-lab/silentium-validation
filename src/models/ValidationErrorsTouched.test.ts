import { describe, expect, test } from "vitest";
import { ValidationErrorsTouched } from "./ValidationErrorsTouched";
import { Computed, LateShared } from "silentium";
import { ValidationErrors } from "./ValidationErrors";
import { ValidationItems } from "./ValidationItems";

describe("ValidationErrorsTouched.test", () => {
  const required = (v: unknown) => !!v || "required";
  const number = (v: unknown) => Number.isInteger(v) || "must be integer";

  test("regular", async () => {
    expect(true).toBe(true);

    const $form = LateShared<any>({
      name: "",
      age: 0,
    });
    const rules = {
      name: [required],
      age: [number],
    };

    const $errors = ValidationErrors(Computed(ValidationItems, $form, rules));
    const $errorsTouched = ValidationErrorsTouched($form, $errors);
    expect(await $errorsTouched).toStrictEqual({});

    $form.use({
      age: "not int" as unknown as number,
    });
    expect(await $errorsTouched).toStrictEqual({
      age: ["must be integer"],
    });
  });
});
