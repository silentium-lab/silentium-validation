import { ValidationErrorType } from "@/types";

/**
 * Check if there are any errors in the errors object
 * Returns a boolean type
 */
export function Validated(errors: ValidationErrorType) {
  return !Object.values(errors).some(
    (errorValues: any) => errorValues.length > 0,
  );
}
