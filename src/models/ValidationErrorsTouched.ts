import { All, Applied, Chainable, MessageType } from "silentium";
import { ValidationErrorType } from "@/types";
import { Dirty, MergeAccumulation } from "silentium-components";

/**
 * Validation errors are only those that correspond to changed form fields
 *
 * @url https://silentium.pw/article/validation-errors-touched/view
 */
export function ValidationErrorsTouched(
  $form: MessageType<Record<string, unknown>>,
  $errors: MessageType<ValidationErrorType>,
) {
  const dirtyForm = Dirty($form);
  Chainable(dirtyForm).chain($form);
  const touchedForm = MergeAccumulation(dirtyForm);
  const errorsTouched = All(Applied(touchedForm, Object.keys), $errors);
  return Applied(errorsTouched, ([touched, errors]) => {
    return Object.fromEntries(
      Object.entries(errors).filter((entry) => touched.includes(entry[0])),
    );
  });
}
