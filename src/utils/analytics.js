// src/utils/analytics.js

/**
 * Analytics utility functions for tracking user interactions and events
 * This module provides a centralized way to handle all analytics tracking
 */

// Configuration
const ANALYTICS_CONFIG = {
    debug: process.env.NODE_ENV === 'development',
    batchSize: 10,
    flushInterval: 5000, // 5 seconds
    maxRetries: 3,
    storageKey: 'sweet_delights_analytics',
    sessionKey: 'sweet_delights_session',
  };
  
  // Event queue for batching
  let eventQueue = [];
  let sessionId = null;
  let userId = null;
  
  /**
   * Initialize analytics system
   */
  export const initAnalytics = () => {
    // Generate or retrieve session ID
    sessionId = generateSessionId();
    
    // Generate or retrieve user ID
    userId = generateUserId();
    
    // Start batch processing
    startBatchProcessor();
    
    // Initialize performance tracking
    initPerformanceTracking();
    
    if (ANALYTICS_CONFIG.debug) {
      console.log('Analytics initialized', { sessionId, userId });
    }
  };
  
  /**
   * Generate unique session ID
   */
  const generateSessionId = () => {
    const stored = sessionStorage.getItem(ANALYTICS_CONFIG.sessionKey);
    if (stored) {
      return stored;
    }
    
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(ANALYTICS_CONFIG.sessionKey, newSessionId);
    return newSessionId;
  };
  
  /**
   * Generate unique user ID
   */
  const generateUserId = () => {
    const stored = localStorage.getItem('sweet_delights_user_id');
    if (stored) {
      return stored;
    }
    
    const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sweet_delights_user_id', newUserId);
    return newUserId;
  };
  
  /**
   * Core event tracking function
   */
  export const trackEvent = (eventName, properties = {}) => {
    const event = {
      id: generateEventId(),
      event: eventName,
      properties: {
        ...properties,
        session_id: sessionId,
        user_id: userId,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        page_title: document.title,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    
    addToQueue(event);
    
    if (ANALYTICS_CONFIG.debug) {
      console.log('Event tracked:', event);
    }
  };
  
  /**
   * Track page views
   */
  export const trackPageView = (path, properties = {}) => {
    trackEvent('page_view', {
      page_path: path,
      page_title: document.title,
      ...properties,
    });
  };
  
  /**
   * Track user interactions
   */
  export const trackUserInteraction = (interactionType, properties = {}) => {
    trackEvent('user_interaction', {
      interaction_type: interactionType,
      ...properties,
    });
  };
  
  /**
   * Track form submissions
   */
  export const trackFormSubmission = (eventType, properties = {}) => {
    trackEvent(eventType, {
      category: 'form',
      ...properties,
    });
  };
  
  /**
   * Track errors
   */
  export const trackError = (error, properties = {}) => {
    trackEvent('error', {
      error_message: error.message,
      error_stack: error.stack,
      error_name: error.name,
      category: 'error',
      ...properties,
    });
  };
  
  /**
   * Track conversion events
   */
  export const trackConversion = (conversionType, value, properties = {}) => {
    trackEvent('conversion', {
      conversion_type: conversionType,
      conversion_value: value,
      category: 'conversion',
      ...properties,
    });
  };
  
  /**
   * Track engagement metrics
   */
  export const trackEngagement = (engagementType, value, properties = {}) => {
    trackEvent('engagement', {
      engagement_type: engagementType,
      engagement_value: value,
      category: 'engagement',
      ...properties,
    });
  };
  
  /**
   * Generate unique event ID
   */
  const generateEventId = () => {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };
  
  /**
   * Add event to queue
   */
  const addToQueue = (event) => {
    eventQueue.push(event);
    
    if (eventQueue.length >= ANALYTICS_CONFIG.batchSize) {
      flushQueue();
    }
  };
  
  /**
   * Flush event queue
   */
  const flushQueue = () => {
    if (eventQueue.length === 0) return;
    
    const events = [...eventQueue];
    eventQueue = [];
    
    sendEvents(events);
  };
  
  /**
   * Send events to analytics service
   */
  const sendEvents = async (events) => {
    // In a real application, this would send to your analytics service
    // For now, we'll store locally and log
    
    try {
      // Store events locally for debugging
      const storedEvents = JSON.parse(localStorage.getItem(ANALYTICS_CONFIG.storageKey) || '[]');
      storedEvents.push(...events);
      
      // Keep only last 1000 events
      if (storedEvents.length > 1000) {
        storedEvents.splice(0, storedEvents.length - 1000);
      }
      
      localStorage.setItem(ANALYTICS_CONFIG.storageKey, JSON.stringify(storedEvents));
      
      if (ANALYTICS_CONFIG.debug) {
        console.log('Events sent:', events);
      }
      
      // Here you would typically send to your analytics service:
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ events })
      // });
      
    } catch (error) {
      console.error('Failed to send analytics events:', error);
      
      // Re-queue events for retry
      eventQueue.unshift(...events);
    }
  };
  
  /**
   * Start batch processor
   */
  const startBatchProcessor = () => {
    setInterval(() => {
      flushQueue();
    }, ANALYTICS_CONFIG.flushInterval);
    
    // Flush on page unload
    window.addEventListener('beforeunload', flushQueue);
  };
  
  /**
   * Initialize performance tracking
   */
  const initPerformanceTracking = () => {
    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          trackEvent('page_performance', {
            load_time: navigation.loadEventEnd - navigation.loadEventStart,
            dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            dns_lookup: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp_connection: navigation.connectEnd - navigation.connectStart,
            server_response: navigation.responseEnd - navigation.responseStart,
            dom_processing: navigation.domComplete - navigation.domLoading,
            category: 'performance',
          });
        }
      }, 0);
    });
    
    // Track Core Web Vitals
    if ('web-vital' in window) {
      trackWebVitals();
    }
  };
  
  /**
   * Track Core Web Vitals
   */
  const trackWebVitals = () => {
    // This would integrate with web-vitals library
    // For now, we'll track basic metrics
    
    // Track First Contentful Paint
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach(entry => {
      if (entry.name === 'first-contentful-paint') {
        trackEvent('web_vital', {
          metric: 'FCP',
          value: entry.startTime,
          category: 'performance',
        });
      }
    });
    
    // Track Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        trackEvent('web_vital', {
          metric: 'LCP',
          value: lastEntry.startTime,
          category: 'performance',
        });
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  };
  
  /**
   * Track scroll depth
   */
  export const trackScrollDepth = () => {
    let maxScrollDepth = 0;
    let scrollDepthThresholds = [25, 50, 75, 100];
    let thresholdsReached = new Set();
    
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Check if we've reached any new thresholds
        scrollDepthThresholds.forEach(threshold => {
          if (scrollPercent >= threshold && !thresholdsReached.has(threshold)) {
            thresholdsReached.add(threshold);
            trackEvent('scroll_depth', {
              depth_percentage: threshold,
              category: 'engagement',
            });
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Track final scroll depth on page unload
    window.addEventListener('beforeunload', () => {
      trackEvent('scroll_depth_final', {
        max_depth_percentage: maxScrollDepth,
        category: 'engagement',
      });
    });
  };
  
  /**
   * Track time on page
   */
  export const trackTimeOnPage = () => {
    const startTime = Date.now();
    let isVisible = true;
    let totalActiveTime = 0;
    let lastActiveTime = startTime;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isVisible) {
          totalActiveTime += Date.now() - lastActiveTime;
          isVisible = false;
        }
      } else {
        if (!isVisible) {
          lastActiveTime = Date.now();
          isVisible = true;
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Track time intervals
    const timeIntervals = [10, 30, 60, 120, 300]; // seconds
    const intervalsReached = new Set();
    
    const checkTimeIntervals = () => {
      const currentTime = Date.now();
      const activeTime = isVisible ? totalActiveTime + (currentTime - lastActiveTime) : totalActiveTime;
      const timeOnPageSeconds = Math.floor(activeTime / 1000);
      
      timeIntervals.forEach(interval => {
        if (timeOnPageSeconds >= interval && !intervalsReached.has(interval)) {
          intervalsReached.add(interval);
          trackEvent('time_on_page', {
            time_seconds: interval,
            category: 'engagement',
          });
        }
      });
    };
    
    const intervalId = setInterval(checkTimeIntervals, 1000);
    
    // Track final time on page
    window.addEventListener('beforeunload', () => {
      clearInterval(intervalId);
      const currentTime = Date.now();
      const finalActiveTime = isVisible ? totalActiveTime + (currentTime - lastActiveTime) : totalActiveTime;
      
      trackEvent('time_on_page_final', {
        total_time_seconds: Math.floor((currentTime - startTime) / 1000),
        active_time_seconds: Math.floor(finalActiveTime / 1000),
        category: 'engagement',
      });
    });
  };
  
  /**
   * Track click heatmap data
   */
  export const trackClickHeatmap = () => {
    const handleClick = (event) => {
      const rect = document.documentElement.getBoundingClientRect();
      const x = event.clientX;
      const y = event.clientY;
      const percentX = Math.round((x / window.innerWidth) * 100);
      const percentY = Math.round((y / window.innerHeight) * 100);
      
      trackEvent('click_heatmap', {
        x_percent: percentX,
        y_percent: percentY,
        x_absolute: x,
        y_absolute: y,
        element_tag: event.target.tagName,
        element_id: event.target.id,
        element_class: event.target.className,
        category: 'heatmap',
      });
    };
    
    document.addEventListener('click', handleClick, { passive: true });
  };
  
  /**
   * Track form analytics
   */
  export const trackFormAnalytics = (formElement, formName) => {
    let formStartTime = null;
    let fieldsInteracted = new Set();
    
    const trackFieldInteraction = (event) => {
      if (!formStartTime) {
        formStartTime = Date.now();
        trackEvent('form_start', {
          form_name: formName,
          category: 'form',
        });
      }
      
      const fieldName = event.target.name || event.target.id;
      if (fieldName && !fieldsInteracted.has(fieldName)) {
        fieldsInteracted.add(fieldName);
        trackEvent('form_field_interaction', {
          form_name: formName,
          field_name: fieldName,
          field_type: event.target.type,
          category: 'form',
        });
      }
    };
    
    const trackFormSubmission = (event) => {
      const completionTime = formStartTime ? Date.now() - formStartTime : 0;
      
      trackEvent('form_submit', {
        form_name: formName,
        completion_time_ms: completionTime,
        fields_interacted: fieldsInteracted.size,
        category: 'form',
      });
    };
    
    const trackFormAbandon = () => {
      if (formStartTime && fieldsInteracted.size > 0) {
        const abandonTime = Date.now() - formStartTime;
        trackEvent('form_abandon', {
          form_name: formName,
          abandon_time_ms: abandonTime,
          fields_interacted: fieldsInteracted.size,
          category: 'form',
        });
      }
    };
    
    // Add event listeners
    formElement.addEventListener('input', trackFieldInteraction);
    formElement.addEventListener('focus', trackFieldInteraction);
    formElement.addEventListener('submit', trackFormSubmission);
    
    // Track form abandon on page unload
    window.addEventListener('beforeunload', trackFormAbandon);
    
    return () => {
      formElement.removeEventListener('input', trackFieldInteraction);
      formElement.removeEventListener('focus', trackFieldInteraction);
      formElement.removeEventListener('submit', trackFormSubmission);
      window.removeEventListener('beforeunload', trackFormAbandon);
    };
  };
  
  /**
   * Track search analytics
   */
  export const trackSearchAnalytics = (searchTerm, results, searchTime) => {
    trackEvent('search_query', {
      search_term: searchTerm,
      results_count: results.length,
      search_time_ms: searchTime,
      has_results: results.length > 0,
      category: 'search',
    });
  };
  
  /**
   * Track e-commerce analytics
   */
  export const trackEcommerceAnalytics = {
    viewProduct: (product) => {
      trackEvent('product_view', {
        product_id: product.id,
        product_name: product.name,
        product_category: product.category,
        product_price: product.price,
        category: 'ecommerce',
      });
    },
    
    addToCart: (product, quantity = 1) => {
      trackEvent('add_to_cart', {
        product_id: product.id,
        product_name: product.name,
        product_category: product.category,
        product_price: product.price,
        quantity: quantity,
        cart_value: product.price * quantity,
        category: 'ecommerce',
      });
    },
    
    removeFromCart: (product, quantity = 1) => {
      trackEvent('remove_from_cart', {
        product_id: product.id,
        product_name: product.name,
        quantity: quantity,
        category: 'ecommerce',
      });
    },
    
    purchase: (orderData) => {
      trackEvent('purchase', {
        order_id: orderData.id,
        order_total: orderData.total,
        order_items: orderData.items.length,
        payment_method: orderData.paymentMethod,
        category: 'ecommerce',
      });
    },
  };
  
  /**
   * Get analytics data for debugging
   */
  export const getAnalyticsData = () => {
    const storedEvents = JSON.parse(localStorage.getItem(ANALYTICS_CONFIG.storageKey) || '[]');
    return {
      events: storedEvents,
      sessionId,
      userId,
      queueSize: eventQueue.length,
    };
  };
  
  /**
   * Clear analytics data
   */
  export const clearAnalyticsData = () => {
    localStorage.removeItem(ANALYTICS_CONFIG.storageKey);
    localStorage.removeItem('sweet_delights_user_id');
    sessionStorage.removeItem(ANALYTICS_CONFIG.sessionKey);
    eventQueue = [];
  };
  
  /**
   * Export analytics data
   */
  export const exportAnalyticsData = () => {
    const data = getAnalyticsData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sweet-delights-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Initialize analytics when module is loaded
  if (typeof window !== 'undefined') {
    initAnalytics();
    
    // Auto-track common interactions
    trackScrollDepth();
    trackTimeOnPage();
    trackClickHeatmap();
  }
  
  export default {
    trackEvent,
    trackPageView,
    trackUserInteraction,
    trackFormSubmission,
    trackError,
    trackConversion,
    trackEngagement,
    trackSearchAnalytics,
    trackEcommerceAnalytics,
    trackFormAnalytics,
    getAnalyticsData,
    clearAnalyticsData,
    exportAnalyticsData,
  };