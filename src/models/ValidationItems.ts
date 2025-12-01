import { ConstructorType } from "silentium";
import { ValidationRule } from "../types";

export type FormType = Record<string, unknown>;
export type FormRulesType = Record<
  string,
  ConstructorType<any, ValidationRule>[]
>;

/**
 * Get a set of all validation rules
 * for each form field
 */
export function ValidationItems(form: FormType, rules: FormRulesType) {
  return Object.keys(form).map((key) => {
    return {
      key,
      value: form[key],
      rules: rules[key],
    };
  });
}
