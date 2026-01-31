import { ValidationErrorType } from "@/types";

/**
 * Overall array of all errors
 *
 * @url https://silentium.pw/article/validation-errors-summary/view
 */
export function ValidationErrorsSummary(errors: ValidationErrorType) {
  return Object.values(errors).flat();
}
