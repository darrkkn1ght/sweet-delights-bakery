// src/hooks/useFormValidation.js

import { useState, useCallback, useEffect } from 'react';
import { 
  validateCustomOrderForm, 
  validateContactForm, 
  validateNewsletterForm,
  isValidEmail,
  isValidPhone,
  isValidName,
  isRequired
} from '../utils/validation';

/**
 * Custom hook for form validation with real-time feedback
 * Provides comprehensive form state management and validation
 * 
 * @param {Object} initialValues - Initial form values
 * @param {Function} validationFunction - Validation function to use
 * @param {Object} options - Configuration options
 * @returns {Object} - Form state and handlers
 */
export const useFormValidation = (initialValues = {}, validationFunction = null, options = {}) => {
  const {
    validateOnChange = false,
    validateOnBlur = true,
    resetOnSubmit = false,
    debounceValidation = 300
  } = options;

  // Form state
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Debounced validation
  const [validationTimeout, setValidationTimeout] = useState(null);

  /**
   * Validates the entire form
   * @returns {Object} - Validation result
   */
  const validate = useCallback(() => {
    if (!validationFunction) return { isValid: true, errors: {} };
    
    const result = validationFunction(values);
    setErrors(result.errors || {});
    return result;
  }, [values, validationFunction]);

  /**
   * Validates a single field
   * @param {string} fieldName - Name of the field to validate
   * @param {any} value - Value to validate
   * @returns {string|null} - Error message or null if valid
   */
  const validateField = useCallback((fieldName, value) => {
    let error = null;

    switch (fieldName) {
      case 'email':
        if (!isRequired(value)) {
          error = 'Email is required';
        } else if (!isValidEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (!isRequired(value)) {
          error = 'Phone number is required';
        } else if (!isValidPhone(value)) {
          error = 'Please enter a valid phone number';
        }
        break;

      case 'name':
      case 'customerName':
      case 'firstName':
      case 'lastName':
        if (!isRequired(value)) {
          error = 'Name is required';
        } else if (!isValidName(value)) {
          error = 'Please enter a valid name';
        }
        break;

      case 'message':
      case 'description':
        if (!isRequired(value)) {
          error = `${fieldName === 'message' ? 'Message' : 'Description'} is required`;
        } else if (typeof value === 'string' && value.trim().length < 10) {
          error = `${fieldName === 'message' ? 'Message' : 'Description'} must be at least 10 characters long`;
        }
        break;

      case 'subject':
        if (!isRequired(value)) {
          error = 'Subject is required';
        } else if (typeof value === 'string' && value.trim().length < 5) {
          error = 'Subject must be at least 5 characters long';
        }
        break;

      default:
        // Use full form validation if no specific field validation is found
        if (validationFunction) {
          const result = validationFunction({ ...values, [fieldName]: value });
          error = result.errors?.[fieldName] || null;
        }
        break;
    }

    return error;
  }, [values, validationFunction]);

  /**
   * Handles input change events
   * @param {Event|Object} e - Event object or custom object with name and value
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target || e;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on change if enabled
    if (validateOnChange || (isSubmitted && touched[name])) {
      // Clear existing timeout
      if (validationTimeout) {
        clearTimeout(validationTimeout);
      }

      // Set new timeout for debounced validation
      const timeout = setTimeout(() => {
        const fieldError = validateField(name, fieldValue);
        setErrors(prev => ({
          ...prev,
          [name]: fieldError
        }));
      }, debounceValidation);

      setValidationTimeout(timeout);
    }
  }, [validateOnChange, isSubmitted, touched, validationTimeout, debounceValidation, validateField]);

  /**
   * Handles input blur events
   * @param {Event} e - Blur event
   */
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;

    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur if enabled
    if (validateOnBlur) {
      const fieldError = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  }, [validateOnBlur, validateField]);

  /**
   * Handles form submission
   * @param {Event} e - Submit event
   * @param {Function} onSubmit - Submit callback function
   */
  const handleSubmit = useCallback(async (e, onSubmit) => {
    if (e) {
      e.preventDefault();
    }

    setIsSubmitting(true);
    setIsSubmitted(true);
    setSubmitCount(prev => prev + 1);

    // Mark all fields as touched
    const allFieldsTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allFieldsTouched);

    // Validate the entire form
    const validationResult = validate();

    if (validationResult.isValid) {
      try {
        if (onSubmit) {
          await onSubmit(values);
        }

        // Reset form if configured to do so
        if (resetOnSubmit) {
          reset();
        }
      } catch (error) {
        console.error('Form submission error:', error);
        // You might want to set a general error here
        setErrors(prev => ({
          ...prev,
          submit: 'An error occurred while submitting the form. Please try again.'
        }));
      }
    }

    setIsSubmitting(false);
  }, [values, validate, resetOnSubmit]);

  /**
   * Sets a specific field value
   * @param {string} fieldName - Name of the field
   * @param {any} value - Value to set
   */
  const setFieldValue = useCallback((fieldName, value) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Validate the field if form has been submitted
    if (isSubmitted) {
      const fieldError = validateField(fieldName, value);
      setErrors(prev => ({
        ...prev,
        [fieldName]: fieldError
      }));
    }
  }, [isSubmitted, validateField]);

  /**
   * Sets a specific field error
   * @param {string} fieldName - Name of the field
   * @param {string} error - Error message
   */
  const setFieldError = useCallback((fieldName, error) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  }, []);

  /**
   * Clears a specific field error
   * @param {string} fieldName - Name of the field
   */
  const clearFieldError = useCallback((fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  /**
   * Clears all form errors
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  /**
   * Resets the entire form to initial state
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsSubmitted(false);
    setSubmitCount(0);
  }, [initialValues]);

  /**
   * Resets a specific field to its initial value
   * @param {string} fieldName - Name of the field to reset
   */
  const resetField = useCallback((fieldName) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: initialValues[fieldName] || ''
    }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
    setTouched(prev => ({
      ...prev,
      [fieldName]: false
    }));
  }, [initialValues]);

  /**
   * Gets the props for an input field
   * @param {string} fieldName - Name of the field
   * @returns {Object} - Props object for the input
   */
  const getFieldProps = useCallback((fieldName) => {
    return {
      name: fieldName,
      value: values[fieldName] || '',
      onChange: handleChange,
      onBlur: handleBlur,
      error: errors[fieldName],
      hasError: !!errors[fieldName],
      isTouched: touched[fieldName]
    };
  }, [values, errors, touched, handleChange, handleBlur]);

  /**
   * Checks if the form is valid
   * @returns {boolean} - True if form is valid
   */
  const isValid = useCallback(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  /**
   * Checks if the form is dirty (has changes)
   * @returns {boolean} - True if form has changes
   */
  const isDirty = useCallback(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  /**
   * Gets field-specific validation state
   * @param {string} fieldName - Name of the field
   * @returns {Object} - Field state object
   */
  const getFieldState = useCallback((fieldName) => {
    return {
      value: values[fieldName],
      error: errors[fieldName],
      hasError: !!errors[fieldName],
      isTouched: touched[fieldName],
      isValid: !errors[fieldName]
    };
  }, [values, errors, touched]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (validationTimeout) {
        clearTimeout(validationTimeout);
      }
    };
  }, [validationTimeout]);

  // Return form state and handlers
  return {
    // Form state
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    submitCount,

    // Form handlers
    handleChange,
    handleBlur,
    handleSubmit,

    // Field manipulation
    setFieldValue,
    setFieldError,
    clearFieldError,
    resetField,
    getFieldProps,
    getFieldState,

    // Form utilities
    validate,
    validateField,
    clearErrors,
    reset,
    isValid,
    isDirty
  };
};

/**
 * Specialized hook for custom order form validation
 * @param {Object} initialValues - Initial form values
 * @param {Object} options - Configuration options
 * @returns {Object} - Form state and handlers
 */
export const useCustomOrderForm = (initialValues = {}, options = {}) => {
  const defaultValues = {
    customerName: '',
    email: '',
    phone: '',
    cakeType: '',
    cakeSize: '',
    flavor: '',
    servings: '',
    eventDate: '',
    eventTime: '',
    budget: '',
    description: '',
    addons: [],
    deliveryMethod: 'pickup',
    deliveryAddress: '',
    specialInstructions: '',
    referenceImages: [],
    ...initialValues
  };

  return useFormValidation(defaultValues, validateCustomOrderForm, {
    validateOnChange: true,
    validateOnBlur: true,
    debounceValidation: 500,
    ...options
  });
};

/**
 * Specialized hook for contact form validation
 * @param {Object} initialValues - Initial form values
 * @param {Object} options - Configuration options
 * @returns {Object} - Form state and handlers
 */
export const useContactForm = (initialValues = {}, options = {}) => {
  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    ...initialValues
  };

  return useFormValidation(defaultValues, validateContactForm, {
    validateOnBlur: true,
    debounceValidation: 300,
    ...options
  });
};

/**
 * Specialized hook for newsletter form validation
 * @param {Object} initialValues - Initial form values
 * @param {Object} options - Configuration options
 * @returns {Object} - Form state and handlers
 */
export const useNewsletterForm = (initialValues = {}, options = {}) => {
  const defaultValues = {
    email: '',
    name: '',
    preferences: [],
    ...initialValues
  };

  return useFormValidation(defaultValues, validateNewsletterForm, {
    validateOnChange: true,
    debounceValidation: 500,
    ...options
  });
};

export default useFormValidation;