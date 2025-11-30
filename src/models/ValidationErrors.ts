import {
  All,
  Applied,
  DestroyContainer,
  Message,
  MessageType,
} from "silentium";
import { ValidationErrorType, ValidationItem } from "../types";

export function ValidationErrors(
  $form: MessageType<ValidationItem[]>,
): MessageType<ValidationErrorType> {
  return Message((resolve) => {
    const formDc = DestroyContainer();
    $form.then((form) => {
      formDc.destroy();
      const entries = form.map((i) => {
        return All(
          i.key,
          All(
            ...i.rules.map((rule) => {
              return formDc.add(rule(i.value));
            }),
          ),
        );
      });
      Applied(entries, (e: any) => Object.fromEntries(e)).then(resolve);
    });
  });
}
