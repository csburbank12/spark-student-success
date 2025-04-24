
import { useState, useCallback } from 'react';

export type ValidationRules = {
  [field: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    message?: string;
    custom?: (value: any) => boolean;
    customMessage?: string;
  }
};

export type ValidationErrors = {
  [field: string]: string;
};

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T, 
  validationRules: ValidationRules
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate field on change if it's been touched
    if (touched[name]) {
      validateField(name, value);
    }
  }, [touched]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  }, []);

  const validateField = useCallback((field: string, value: any) => {
    const rules = validationRules[field];
    if (!rules) return;

    let errorMessage = '';

    if (rules.required && (!value || value.trim() === '')) {
      errorMessage = rules.message || 'This field is required';
    } else if (rules.minLength && value && value.length < rules.minLength) {
      errorMessage = rules.message || `Minimum length is ${rules.minLength} characters`;
    } else if (rules.maxLength && value && value.length > rules.maxLength) {
      errorMessage = rules.message || `Maximum length is ${rules.maxLength} characters`;
    } else if (rules.pattern && value && !rules.pattern.test(value)) {
      errorMessage = rules.message || 'Invalid format';
    } else if (rules.custom && !rules.custom(value)) {
      errorMessage = rules.customMessage || 'Invalid value';
    }

    setErrors(prev => ({
      ...prev,
      [field]: errorMessage
    }));
  }, [validationRules]);

  const validateForm = useCallback(() => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Mark all fields as touched
    const newTouched: Record<string, boolean> = {};
    Object.keys(validationRules).forEach(field => {
      newTouched[field] = true;
      validateField(field, values[field]);
      if (errors[field] || (validationRules[field].required && !values[field])) {
        isValid = false;
      }
    });

    setTouched(newTouched);
    
    // Perform validation of all fields
    Object.keys(validationRules).forEach(field => {
      const rules = validationRules[field];
      const value = values[field];
      
      if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        newErrors[field] = rules.message || 'This field is required';
        isValid = false;
      } else if (rules.minLength && value && value.length < rules.minLength) {
        newErrors[field] = rules.message || `Minimum length is ${rules.minLength} characters`;
        isValid = false;
      } else if (rules.maxLength && value && value.length > rules.maxLength) {
        newErrors[field] = rules.message || `Maximum length is ${rules.maxLength} characters`;
        isValid = false;
      } else if (rules.pattern && value && !rules.pattern.test(value)) {
        newErrors[field] = rules.message || 'Invalid format';
        isValid = false;
      } else if (rules.custom && !rules.custom(value)) {
        newErrors[field] = rules.customMessage || 'Invalid value';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    setValues,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm
  };
}
