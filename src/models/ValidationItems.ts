import {
  ActualMessage,
  All,
  Applied,
  ConstructorType,
  MaybeMessage,
} from "silentium";
import { ValidationRule } from "../types";

export type FormType = Record<string, unknown>;
export type FormRulesType = Record<
  string,
  ConstructorType<any, ValidationRule>[]
>;

/**
 * Получить набор всех правил валидации
 * на каждое поле формы
 */
export function ValidationItems(
  form: MaybeMessage<FormType>,
  rules: MaybeMessage<FormRulesType>,
) {
  const $form = ActualMessage(form);
  const $rules = ActualMessage(rules);
  return Applied(All($form, $rules), ([form, rules]) => {
    return Object.keys(form).map((key) => {
      return {
        key,
        value: form[key],
        rules: rules[key],
      };
    });
  });
}
