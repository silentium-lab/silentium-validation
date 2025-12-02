import {
  ActualMessage,
  All,
  Applied,
  DestroyContainer,
  MaybeMessage,
  Message,
  MessageType,
} from "silentium";
import { ValidationErrorType, ValidationItem } from "@/types";

/**
 * Accepts a set of items that need to be validated
 * and when rules produce values, returns the overall set
 * of errors for the given configuration
 */
export function ValidationErrors(
  form: MaybeMessage<ValidationItem[]>,
): MessageType<ValidationErrorType> {
  const $form = ActualMessage(form);
  return Message((resolve, reject) => {
    const formDc = DestroyContainer();
    $form.then((form) => {
      formDc.destroy();
      const entries = form.map((i) => {
        return All(
          i.key,
          Applied(
            All(
              ...i.rules.map((rule) => {
                return formDc.add(rule(i.value));
              }),
            ),
            (items) => items.filter(ExcludeTrue).map(ErrorFormat),
          ) as MessageType<string[]>,
        );
      });
      Applied(All(...entries), (e: any) => Object.fromEntries(e))
        .catch(reject)
        .then(resolve);
    });
  });
}

function ErrorFormat(v: boolean | string) {
  return v === false ? "Error!" : v;
}

function ExcludeTrue(v: boolean | string) {
  return v !== true;
}
