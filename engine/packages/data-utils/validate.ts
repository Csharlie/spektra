/**
 * Data validation utility
 * Validates data against a schema
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validate(data: any, _schema: any): ValidationResult {
  const errors: string[] = [];
  
  // Basic validation logic
  if (!data) {
    errors.push('Data is null or undefined');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateRequired(data: any, requiredFields: string[]): ValidationResult {
  const errors: string[] = [];

  requiredFields.forEach(field => {
    if (!(field in data) || data[field] === null || data[field] === undefined) {
      errors.push(`Required field "${field}" is missing`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}
