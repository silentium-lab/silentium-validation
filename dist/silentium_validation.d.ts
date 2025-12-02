import * as silentium from 'silentium';
import { ConstructorType, MaybeMessage, MessageType } from 'silentium';

type ValidationErrorType = Record<string, string[]>;
type ValidationRule = MaybeMessage<string | boolean>;
interface ValidationItem {
    value: unknown;
    key: string;
    rules: ConstructorType<any, ValidationRule>[];
}

/**
 * Check if there are any errors in the errors object
 * Returns a boolean type
 */
declare function Validated(errors: ValidationErrorType): boolean;

/**
 * Accepts a set of items that need to be validated
 * and when rules produce values, returns the overall set
 * of errors for the given configuration
 */
declare function ValidationErrors(form: MaybeMessage<ValidationItem[]>): MessageType<ValidationErrorType>;

/**
 * Show only the errors that exist, fields without errors are not shown
 */
declare function ValidationErrorsHappened(base: ValidationErrorType): {
    [k: string]: string[];
};

/**
 * Overall array of all errors
 */
declare function ValidationErrorsSummary(errors: ValidationErrorType): string[];

/**
 * Validation errors are only those that correspond to changed form fields
 */
declare function ValidationErrorsTouched($form: MessageType<Record<string, unknown>>, $errors: MessageType<ValidationErrorType>): silentium.MessageRx<{
    [k: string]: string[];
}>;

type FormType = Record<string, unknown>;
type FormRulesType = Record<string, ConstructorType<any, ValidationRule>[]>;
/**
 * Get a set of all validation rules
 * for each form field
 */
declare function ValidationItems(form: FormType, rules: FormRulesType): {
    key: string;
    value: unknown;
    rules: ConstructorType<any, ValidationRule>[];
}[];

/**
 * Validation rule, what requires truthy value
 */
declare const Required: (v: unknown) => true | "Field required";
/**
 * Validation rule what requires integer value
 */
declare const Integer: (v: unknown) => true | "Must be integer";

export { Integer, Required, Validated, ValidationErrors, ValidationErrorsHappened, ValidationErrorsSummary, ValidationErrorsTouched, ValidationItems };
export type { FormRulesType, FormType, ValidationErrorType, ValidationItem, ValidationRule };
