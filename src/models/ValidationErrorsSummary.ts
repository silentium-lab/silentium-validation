import { ValidationErrorType } from "../types";

/**
 * Overall array of all errors
 */
export function ValidationErrorsSummary(errors: ValidationErrorType) {
  return Object.values(errors).flat();
}
