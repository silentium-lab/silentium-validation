/**
 * Validation rule, what requires truthy value
 */
export const Required = (v: unknown) => !!v || "Field required";

/**
 * Validation rule what requires integer value
 */
export const Integer = (v: unknown) => Number.isInteger(v) || "Must be integer";
