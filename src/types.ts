import { ConstructorType, MessageType } from "silentium";

export type ValidationErrorType = Record<string, string[]>;

export type ValidationRule = MessageType<string | boolean>;

export interface ValidationItem {
  value: unknown;
  key: string;
  rules: ConstructorType<any, ValidationRule>[];
}
