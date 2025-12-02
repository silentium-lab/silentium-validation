import { describe, expect, test } from "vitest";
import { ValidationErrorsTouched } from "@/models/ValidationErrorsTouched";
import { Computed, LateShared } from "silentium";
import { ValidationErrors } from "@/models/ValidationErrors";
import { ValidationItems } from "@/models/ValidationItems";
import { Integer, Required } from "@/rules";

describe("ValidationErrorsTouched.test", () => {
  test("regular", async () => {
    expect(true).toBe(true);

    const $form = LateShared<any>({
      name: "",
      age: 0,
    });
    const rules = {
      name: [Required],
      age: [Integer],
    };

    const $errors = ValidationErrors(Computed(ValidationItems, $form, rules));
    const $errorsTouched = ValidationErrorsTouched($form, $errors);
    expect(await $errorsTouched).toStrictEqual({});

    $form.use({
      age: "not int" as unknown as number,
    });
    expect(await $errorsTouched).toStrictEqual({
      age: ["Must be integer"],
    });
  });
});
