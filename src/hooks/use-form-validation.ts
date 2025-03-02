import { useState, useEffect } from 'react';
import { FormConfig } from '@/components/FormBuilder/types';

interface ValidationResult {
  isValid: boolean;
  errors: {
    [key: string]: string;
  };
}

export const useFormValidation = (formConfig: FormConfig): ValidationResult => {
  const [validation, setValidation] = useState<ValidationResult>({
    isValid: true,
    errors: {},
  });

  useEffect(() => {
    const errors: { [key: string]: string } = {};

    // Validate form name
    if (!formConfig.name.trim()) {
      errors.name = 'Form name is required';
    }

    // Validate form elements
    if (formConfig.elements.length === 0) {
      errors.elements = 'Form must have at least one element';
    }

    // Validate element properties
    formConfig.elements.forEach((element, index) => {
      if (!element.label.trim()) {
        errors[`element_${index}_label`] = `Element ${index + 1} must have a label`;
      }
      if (element.required && !element.name) {
        errors[`element_${index}_name`] = `Required element ${index + 1} must have a name`;
      }
    });

    // Check for duplicate element names
    const elementNames = formConfig.elements
      .filter(e => e.name)
      .map(e => e.name);
    const duplicateNames = elementNames.filter(
      (name, index) => elementNames.indexOf(name) !== index
    );
    if (duplicateNames.length > 0) {
      errors.duplicateNames = `Duplicate element names found: ${duplicateNames.join(', ')}`;
    }

    setValidation({
      isValid: Object.keys(errors).length === 0,
      errors,
    });
  }, [formConfig]);

  return validation;
};
