import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage with React state
 * @param {string} key - The localStorage key
 * @param {any} initialValue - The initial value if no stored value exists
 * @returns {[any, function]} - Returns [storedValue, setValue] tuple
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Remove value from localStorage and reset to initial value
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Listen for changes to localStorage from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook for managing cart items in localStorage
 * @returns {object} - Cart management functions and state
 */
export const useCartStorage = () => {
  const [cartItems, setCartItems, removeCart] = useLocalStorage('bakery_cart', []);

  const addToCart = (item) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return currentItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    removeCart();
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };
};

/**
 * Hook for managing user preferences in localStorage
 * @returns {object} - Preferences management functions and state
 */
export const usePreferencesStorage = () => {
  const [preferences, setPreferences] = useLocalStorage('bakery_preferences', {
    theme: 'light',
    notifications: true,
    newsletter: false,
    favoriteCategory: 'all'
  });

  const updatePreference = (key, value) => {
    setPreferences(current => ({
      ...current,
      [key]: value
    }));
  };

  const resetPreferences = () => {
    setPreferences({
      theme: 'light',
      notifications: true,
      newsletter: false,
      favoriteCategory: 'all'
    });
  };

  return {
    preferences,
    updatePreference,
    resetPreferences
  };
};

/**
 * Hook for managing recently viewed items
 * @returns {object} - Recent items management functions and state
 */
export const useRecentlyViewedStorage = () => {
  const [recentItems, setRecentItems] = useLocalStorage('bakery_recent_items', []);

  const addRecentItem = (item) => {
    setRecentItems(currentItems => {
      // Remove item if it already exists
      const filteredItems = currentItems.filter(recentItem => recentItem.id !== item.id);
      // Add to beginning of array
      const newItems = [item, ...filteredItems];
      // Keep only last 10 items
      return newItems.slice(0, 10);
    });
  };

  const clearRecentItems = () => {
    setRecentItems([]);
  };

  return {
    recentItems,
    addRecentItem,
    clearRecentItems
  };
};

export default useLocalStorage;