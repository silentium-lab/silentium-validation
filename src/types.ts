import { ConstructorType, MaybeMessage } from "silentium";

export type ValidationErrorType = Record<string, string[]>;

export type ValidationRule = MaybeMessage<string | boolean>;

export interface ValidationItem {
  value: unknown;
  key: string;
  rules: ConstructorType<any, ValidationRule>[];
}
