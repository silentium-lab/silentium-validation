import { Computed, Late } from "silentium";
import { describe, expect, test } from "vitest";
import { Validated } from "@/models/Validated";

describe("Validated.test", () => {
  test("should handle empty form", async () => {
    const $errors = Late<any>({
      name: ["too long"],
    });
    const $validated = Computed(Validated, $errors);
    expect(await $validated).toBe(false);

    $errors.use({});
    expect(await $validated).toBe(true);
  });
});
