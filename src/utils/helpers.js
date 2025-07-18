// src/utils/helpers.js

import { format, addDays, isToday, isTomorrow, isThisWeek } from 'date-fns';

/**
 * Helper utility functions for Sweet Delights Bakery
 * Provides common functionality used throughout the application
 */

/**
 * Formats currency values with proper locale and currency symbol
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale code (default: 'en-US')
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0.00';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Formats phone numbers for display
 * @param {string} phone - Phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Format as +X (XXX) XXX-XXXX for international numbers
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  // Return original if format is unrecognized
  return phone;
};

/**
 * Formats dates for display with relative time when appropriate
 * @param {Date|string} date - Date to format
 * @param {string} formatString - Format string for date-fns (default: 'MMM d, yyyy')
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, formatString = 'MMM d, yyyy') => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return '';
  
  // Use relative time for recent dates
  if (isToday(dateObj)) return 'Today';
  if (isTomorrow(dateObj)) return 'Tomorrow';
  if (isThisWeek(dateObj)) return format(dateObj, 'EEEE'); // Day of week
  
  return format(dateObj, formatString);
};

/**
 * Truncates text to a specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @param {string} suffix - Suffix to add when truncated (default: '...')
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength, suffix = '...') => {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  
  return text.slice(0, maxLength - suffix.length).trim() + suffix;
};

/**
 * Capitalizes the first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalize = (str) => {
  if (!str || typeof str !== 'string') return '';
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Converts string to URL-friendly slug
 * @param {string} str - String to convert
 * @returns {string} - URL slug
 */
export const slugify = (str) => {
  if (!str || typeof str !== 'string') return '';
  
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Generates a random ID string
 * @param {number} length - Length of the ID (default: 8)
 * @returns {string} - Random ID string
 */
export const generateId = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  
  return function (...args) {
    const context = this;
    
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
};

/**
 * Throttles a function call
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, delay) => {
  let inThrottle;
  
  return function (...args) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, delay);
    }
  };
};

/**
 * Calculates cake price based on size and options
 * @param {Object} options - Cake options
 * @param {string} options.size - Cake size
 * @param {string} options.flavor - Cake flavor
 * @param {array} options.addons - Array of addons
 * @param {boolean} options.rush - Rush order flag
 * @returns {number} - Calculated price
 */
export const calculateCakePrice = (options) => {
  const { size, flavor, addons = [], rush = false } = options;
  
  // Base prices by size
  const basePrices = {
    '6-inch': 35,
    '8-inch': 55,
    '10-inch': 85,
    '12-inch': 125,
    'custom': 150
  };
  
  // Flavor price modifiers
  const flavorModifiers = {
    'vanilla': 0,
    'chocolate': 0,
    'strawberry': 5,
    'red-velvet': 10,
    'carrot': 8,
    'lemon': 5,
    'custom': 15
  };
  
  // Addon prices
  const addonPrices = {
    'chocolate-chips': 3,
    'fresh-berries': 8,
    'cream-cheese-frosting': 5,
    'fondant': 15,
    'custom-decorations': 20,
    'edible-flowers': 12,
    'gold-leaf': 25
  };
  
  let totalPrice = basePrices[size] || 0;
  totalPrice += flavorModifiers[flavor] || 0;
  
  // Add addon prices
  addons.forEach(addon => {
    totalPrice += addonPrices[addon] || 0;
  });
  
  // Apply rush order multiplier
  if (rush) {
    totalPrice *= 1.5;
  }
  
  return Math.round(totalPrice * 100) / 100; // Round to 2 decimal places
};

/**
 * Validates and formats form data for submission
 * @param {Object} formData - Raw form data
 * @returns {Object} - Formatted form data
 */
export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  Object.keys(formData).forEach(key => {
    let value = formData[key];
    
    // Trim strings
    if (typeof value === 'string') {
      value = value.trim();
    }
    
    // Convert empty strings to null
    if (value === '') {
      value = null;
    }
    
    // Convert string numbers to numbers
    if (typeof value === 'string' && !isNaN(value) && value !== '') {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        value = num;
      }
    }
    
    sanitized[key] = value;
  });
  
  return sanitized;
};

/**
 * Checks if an element is in the viewport
 * @param {Element} element - DOM element to check
 * @param {number} threshold - Threshold percentage (0-1)
 * @returns {boolean} - True if element is in viewport
 */
export const isInViewport = (element, threshold = 0.1) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const verticalInView = rect.top <= windowHeight * (1 - threshold) && rect.bottom >= windowHeight * threshold;
  const horizontalInView = rect.left <= windowWidth * (1 - threshold) && rect.right >= windowWidth * threshold;
  
  return verticalInView && horizontalInView;
};

/**
 * Smooth scrolls to an element
 * @param {string|Element} target - Element or selector to scroll to
 * @param {number} offset - Offset from target in pixels
 * @param {number} duration - Animation duration in milliseconds
 */
export const smoothScrollTo = (target, offset = 0, duration = 500) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  
  const targetPosition = element.offsetTop - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;
  
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    
    window.scrollTo(0, run);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  
  requestAnimationFrame(animation);
};

/**
 * Handles image loading with fallback
 * @param {string} src - Image source URL
 * @param {string} fallback - Fallback image URL
 * @returns {Promise} - Promise that resolves with image URL
 */
export const loadImage = (src, fallback = '/images/placeholder.jpg') => {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => resolve(src);
    img.onerror = () => resolve(fallback);
    
    img.src = src;
  });
};

/**
 * Gets business hours status
 * @param {Object} hours - Business hours object
 * @returns {Object} - Status object with isOpen, nextOpen, and message
 */
export const getBusinessHoursStatus = (hours) => {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const currentTime = now.getHours() * 100 + now.getMinutes();
  
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayHours = hours[dayNames[currentDay]];
  
  if (!todayHours || todayHours.closed) {
    return {
      isOpen: false,
      message: 'Closed today',
      nextOpen: getNextOpenTime(hours, currentDay)
    };
  }
  
  const openTime = parseInt(todayHours.open.replace(':', ''));
  const closeTime = parseInt(todayHours.close.replace(':', ''));
  
  if (currentTime >= openTime && currentTime < closeTime) {
    return {
      isOpen: true,
      message: `Open until ${todayHours.close}`,
      nextOpen: null
    };
  }
  
  return {
    isOpen: false,
    message: currentTime < openTime ? `Opens at ${todayHours.open}` : 'Closed',
    nextOpen: getNextOpenTime(hours, currentDay)
  };
};

/**
 * Helper function to get next opening time
 * @param {Object} hours - Business hours object
 * @param {number} currentDay - Current day index
 * @returns {string} - Next opening time description
 */
const getNextOpenTime = (hours, currentDay) => {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  for (let i = 1; i <= 7; i++) {
    const nextDay = (currentDay + i) % 7;
    const nextDayHours = hours[dayNames[nextDay]];
    
    if (nextDayHours && !nextDayHours.closed) {
      const dayName = dayNames[nextDay];
      const openTime = nextDayHours.open;
      
      if (i === 1) {
        return `Tomorrow at ${openTime}`;
      } else {
        return `${capitalize(dayName)} at ${openTime}`;
      }
    }
  }
  
  return 'Check back soon';
};