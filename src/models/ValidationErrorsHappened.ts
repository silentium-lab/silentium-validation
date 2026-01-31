import { ValidationErrorType } from "@/types";

/**
 * Show only the errors that exist, fields without errors are not shown
 *
 * @url https://silentium.pw/article/validation-errors-happened/view
 */
export function ValidationErrorsHappened(base: ValidationErrorType) {
  return Object.fromEntries(
    Object.entries(base).filter((entry) => entry[1].length > 0),
  );
}
