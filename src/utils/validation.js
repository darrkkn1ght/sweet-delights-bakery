// src/utils/validation.js

/**
 * Validation utility functions for Sweet Delights Bakery
 * Provides comprehensive validation for forms and user inputs
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone number validation regex (supports various formats)
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

// Name validation regex (allows letters, spaces, hyphens, apostrophes)
const NAME_REGEX = /^[a-zA-Z\s\-\']+$/;

/**
 * Validates email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Validates phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return PHONE_REGEX.test(cleanPhone) && cleanPhone.length >= 10;
};

/**
 * Validates name format (first name, last name)
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidName = (name) => {
  if (!name || typeof name !== 'string') return false;
  const trimmedName = name.trim();
  return trimmedName.length >= 2 && trimmedName.length <= 50 && NAME_REGEX.test(trimmedName);
};

/**
 * Validates required field
 * @param {any} value - Value to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * Validates minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum required length
 * @returns {boolean} - True if valid, false otherwise
 */
export const hasMinLength = (value, minLength) => {
  if (!value || typeof value !== 'string') return false;
  return value.trim().length >= minLength;
};

/**
 * Validates maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum allowed length
 * @returns {boolean} - True if valid, false otherwise
 */
export const hasMaxLength = (value, maxLength) => {
  if (!value || typeof value !== 'string') return true;
  return value.trim().length <= maxLength;
};

/**
 * Validates date format and ensures it's in the future
 * @param {string} date - Date string to validate
 * @returns {boolean} - True if valid future date, false otherwise
 */
export const isValidFutureDate = (date) => {
  if (!date) return false;
  const inputDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return inputDate instanceof Date && !isNaN(inputDate) && inputDate >= today;
};

/**
 * Validates file upload
 * @param {File} file - File object to validate
 * @param {Object} options - Validation options
 * @param {number} options.maxSize - Maximum file size in bytes
 * @param {string[]} options.allowedTypes - Array of allowed MIME types
 * @returns {Object} - Validation result with isValid and error properties
 */
export const validateFile = (file, options = {}) => {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/gif'] } = options;
  
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: `File size must be less than ${maxSize / 1024 / 1024}MB` };
  }

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Invalid file type. Please upload an image file.' };
  }

  return { isValid: true, error: null };
};

/**
 * Validates cake size selection
 * @param {string} size - Cake size to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidCakeSize = (size) => {
  const validSizes = ['6-inch', '8-inch', '10-inch', '12-inch', 'custom'];
  return validSizes.includes(size);
};

/**
 * Validates number of servings
 * @param {number} servings - Number of servings to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidServings = (servings) => {
  const num = parseInt(servings, 10);
  return !isNaN(num) && num >= 1 && num <= 200;
};

/**
 * Validates budget range
 * @param {number} budget - Budget amount to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidBudget = (budget) => {
  const num = parseFloat(budget);
  return !isNaN(num) && num >= 25 && num <= 5000;
};

/**
 * Comprehensive form validation for custom order form
 * @param {Object} formData - Form data object
 * @returns {Object} - Validation result with errors object
 */
export const validateCustomOrderForm = (formData) => {
  const errors = {};

  // Required fields validation
  if (!isRequired(formData.customerName)) {
    errors.customerName = 'Name is required';
  } else if (!isValidName(formData.customerName)) {
    errors.customerName = 'Please enter a valid name';
  }

  if (!isRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!isRequired(formData.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!isRequired(formData.cakeType)) {
    errors.cakeType = 'Please select a cake type';
  }

  if (!isRequired(formData.cakeSize)) {
    errors.cakeSize = 'Please select a cake size';
  } else if (!isValidCakeSize(formData.cakeSize)) {
    errors.cakeSize = 'Please select a valid cake size';
  }

  if (!isRequired(formData.servings)) {
    errors.servings = 'Number of servings is required';
  } else if (!isValidServings(formData.servings)) {
    errors.servings = 'Please enter a valid number of servings (1-200)';
  }

  if (!isRequired(formData.eventDate)) {
    errors.eventDate = 'Event date is required';
  } else if (!isValidFutureDate(formData.eventDate)) {
    errors.eventDate = 'Please select a future date';
  }

  if (!isRequired(formData.budget)) {
    errors.budget = 'Budget is required';
  } else if (!isValidBudget(formData.budget)) {
    errors.budget = 'Please enter a valid budget ($25-$5000)';
  }

  if (!isRequired(formData.description)) {
    errors.description = 'Cake description is required';
  } else if (!hasMinLength(formData.description, 10)) {
    errors.description = 'Description must be at least 10 characters long';
  } else if (!hasMaxLength(formData.description, 500)) {
    errors.description = 'Description must be less than 500 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates contact form
 * @param {Object} formData - Contact form data
 * @returns {Object} - Validation result with errors object
 */
export const validateContactForm = (formData) => {
  const errors = {};

  if (!isRequired(formData.name)) {
    errors.name = 'Name is required';
  } else if (!isValidName(formData.name)) {
    errors.name = 'Please enter a valid name';
  }

  if (!isRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!isRequired(formData.subject)) {
    errors.subject = 'Subject is required';
  } else if (!hasMinLength(formData.subject, 5)) {
    errors.subject = 'Subject must be at least 5 characters long';
  }

  if (!isRequired(formData.message)) {
    errors.message = 'Message is required';
  } else if (!hasMinLength(formData.message, 10)) {
    errors.message = 'Message must be at least 10 characters long';
  } else if (!hasMaxLength(formData.message, 1000)) {
    errors.message = 'Message must be less than 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates newsletter subscription
 * @param {Object} formData - Newsletter form data
 * @returns {Object} - Validation result with errors object
 */
export const validateNewsletterForm = (formData) => {
  const errors = {};

  if (!isRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (formData.name && !isValidName(formData.name)) {
    errors.name = 'Please enter a valid name';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};