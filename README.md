# Silentium Validation

A reactive validation library built on the Silentium framework for TypeScript applications. Provides asynchronous and reactive validation capabilities with a simple, composable API.

## Features

- Reactive validation with asynchronous support
- Composable validation rules
- TypeScript-first design
- Built-in common validation rules
- Integration with Silentium reactive primitives

## Installation

```bash
npm install silentium-validation
```

## Basic Usage

### Validation Rules

Create validation items with rules:

```typescript
import { Required, Integer } from 'silentium-validation';

const validationItems = [
  {
    key: 'username',
    value: 'john_doe',
    rules: [Required],
  },
  {
    key: 'age',
    value: 25,
    rules: [Required, Integer],
  },
];
```

### Custom Rules

Define custom validation rules:

```typescript
const MinLength = (min: number) => (value: string) =>
  value.length >= min || `Must be at least ${min} characters`;

const validationItems = [
  {
    key: 'password',
    value: 'secret',
    rules: [Required, MinLength(8)],
  },
];
```

### Running Validation

Use `ValidationErrors` to get validation results:

```typescript
import { ValidationErrors } from 'silentium-validation';

const $errors = ValidationErrors(validationItems);
const errors = await $errors;

// Result: { username: [], age: [], password: ['Must be at least 8 characters'] }
```

### Checking Validation Status

Use `Validated` to check if form is valid:

```typescript
import { Validated, Computed, LateShared } from 'silentium';
import { Validated } from 'silentium-validation';

const $errors = LateShared(errors);
const $isValid = Computed(Validated, $errors);

const isValid = await $isValid; // false if any errors exist
```

## API Reference

### Types

```typescript
type ValidationErrorType = Record<string, string[]>;

interface ValidationItem {
  value: unknown;
  key: string;
  rules: ConstructorType<any, ValidationRule>[];
}

type ValidationRule = MaybeMessage<string | boolean>;
```

### Functions

#### ValidationErrors(items: ValidationItem[])

Returns a `MessageType<ValidationErrorType>` containing all validation errors.

#### Validated(errors: ValidationErrorType)

Returns `true` if no validation errors exist, `false` otherwise.

### Built-in Rules

#### Required

Validates that a value is truthy.

```typescript
Required(value) // Returns true or "Field required"
```

#### Integer

Validates that a value is an integer.

```typescript
Integer(value) // Returns true or "Must be integer"
```

## Advanced Usage

### Reactive Validation

Combine with Silentium's reactive primitives for real-time validation:

```typescript
import { Computed, LateShared } from 'silentium';
import { ValidationErrors, Validated } from 'silentium-validation';

const $form = LateShared({
  email: '',
  password: '',
});

const $validationItems = Computed(ValidationItems, $form, {
    email: [Required, (v) => /\S+@\S+\.\S+/.test(v) || 'Invalid email'],
    password: [Required, MinLength(8)]
});

const $errors = ValidationErrors($validationItems);
const $isValid = Computed(Validated, $errors);

// Reactively update validation as form data changes
$form.use({ email: 'user@example.com', password: 'newpassword' });
```

## License

MIT
