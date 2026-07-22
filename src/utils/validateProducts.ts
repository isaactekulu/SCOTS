import type { Product } from '../types/index';

export interface ValidationResult {
  valid: Product[];
  invalid: { entry: unknown; reason: string }[];
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function validateProducts(data: unknown): ValidationResult {
  const valid: Product[] = [];
  const invalid: { entry: unknown; reason: string }[] = [];

  if (!Array.isArray(data)) {
    return { valid, invalid: [{ entry: data, reason: 'Input is not an array' }] };
  }

  for (const entry of data) {
    if (!isObject(entry)) {
      invalid.push({ entry, reason: 'Entry is not an object' });
      continue;
    }

    const requiredStringFields = ['id', 'name', 'description', 'category', 'image', 'badge'] as const;
    let isValid = true;
    let reason = '';

    for (const field of requiredStringFields) {
      if (!isString(entry[field])) {
        isValid = false;
        reason = `Missing or invalid field: ${field}`;
        break;
      }
    }

    if (isValid && !isBoolean(entry.featured)) {
      isValid = false;
      reason = 'Missing or invalid field: featured';
    }

    if (isValid && isString(entry.name) && entry.name.length > 100) {
      isValid = false;
      reason = 'Name exceeds 100 characters';
    }

    if (isValid && isString(entry.description) && entry.description.length > 500) {
      isValid = false;
      reason = 'Description exceeds 500 characters';
    }

    if (isValid) {
      valid.push(entry as Product);
    } else {
      invalid.push({ entry, reason });
    }
  }

  return { valid, invalid };
}
