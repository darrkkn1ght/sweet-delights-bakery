// src/hooks/useAnalytics.js
import { useEffect, useCallback, useRef } from 'react';
import { trackEvent, trackPageView, trackUserInteraction, trackFormSubmission, trackError } from '../utils/analytics';

/**
 * Custom hook for analytics tracking
 * Provides methods to track various user interactions and events
 */
const useAnalytics = () => {
  const isInitialized = useRef(false);
  const sessionStartTime = useRef(Date.now());
  const pageViewStartTime = useRef(Date.now());

  // Initialize analytics on first use
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      
      // Track session start
      trackEvent('session_start', {
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        referrer: document.referrer || 'direct',
        language: navigator.language,
      });
    }

    // Track page view when component mounts
    const handlePageView = () => {
      pageViewStartTime.current = Date.now();
      trackPageView(window.location.pathname);
    };

    handlePageView();

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackEvent('page_hidden', {
          time_on_page: Date.now() - pageViewStartTime.current,
          page: window.location.pathname,
        });
      } else {
        trackEvent('page_visible', {
          page: window.location.pathname,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track page unload
    const handleBeforeUnload = () => {
      trackEvent('page_unload', {
        time_on_page: Date.now() - pageViewStartTime.current,
        session_duration: Date.now() - sessionStartTime.current,
        page: window.location.pathname,
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Track custom events
  const track = useCallback((eventName, properties = {}) => {
    trackEvent(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    });
  }, []);

  // Track button clicks
  const trackButtonClick = useCallback((buttonName, properties = {}) => {
    trackUserInteraction('button_click', {
      button_name: buttonName,
      ...properties,
    });
  }, []);

  // Track link clicks
  const trackLinkClick = useCallback((linkName, url, properties = {}) => {
    trackUserInteraction('link_click', {
      link_name: linkName,
      destination_url: url,
      ...properties,
    });
  }, []);

  // Track form interactions
  const trackFormStart = useCallback((formName, properties = {}) => {
    trackFormSubmission('form_start', {
      form_name: formName,
      ...properties,
    });
  }, []);

  const trackFormSubmit = useCallback((formName, formData, properties = {}) => {
    trackFormSubmission('form_submit', {
      form_name: formName,
      form_data: formData,
      ...properties,
    });
  }, []);

  const trackFormError = useCallback((formName, errorDetails, properties = {}) => {
    trackFormSubmission('form_error', {
      form_name: formName,
      error_details: errorDetails,
      ...properties,
    });
  }, []);

  // Track user engagement
  const trackScroll = useCallback((scrollDepth, properties = {}) => {
    trackUserInteraction('scroll', {
      scroll_depth: scrollDepth,
      ...properties,
    });
  }, []);

  const trackTimeOnPage = useCallback((timeSpent, properties = {}) => {
    trackUserInteraction('time_on_page', {
      time_spent: timeSpent,
      ...properties,
    });
  }, []);

  // Track e-commerce events
  const trackProductView = useCallback((productName, productData, properties = {}) => {
    trackEvent('product_view', {
      product_name: productName,
      product_data: productData,
      ...properties,
    });
  }, []);

  const trackAddToCart = useCallback((productName, productData, properties = {}) => {
    trackEvent('add_to_cart', {
      product_name: productName,
      product_data: productData,
      ...properties,
    });
  }, []);

  const trackOrderStart = useCallback((orderData, properties = {}) => {
    trackEvent('order_start', {
      order_data: orderData,
      ...properties,
    });
  }, []);

  const trackOrderComplete = useCallback((orderData, properties = {}) => {
    trackEvent('order_complete', {
      order_data: orderData,
      order_value: orderData.total_amount,
      ...properties,
    });
  }, []);

  // Track search
  const trackSearch = useCallback((searchTerm, results, properties = {}) => {
    trackEvent('search', {
      search_term: searchTerm,
      results_count: results.length,
      ...properties,
    });
  }, []);

  // Track gallery interactions
  const trackGalleryInteraction = useCallback((interactionType, itemData, properties = {}) => {
    trackUserInteraction('gallery_interaction', {
      interaction_type: interactionType,
      item_data: itemData,
      ...properties,
    });
  }, []);

  // Track filter usage
  const trackFilterUsage = useCallback((filterType, filterValue, properties = {}) => {
    trackUserInteraction('filter_usage', {
      filter_type: filterType,
      filter_value: filterValue,
      ...properties,
    });
  }, []);

  // Track contact interactions
  const trackContactInteraction = useCallback((interactionType, contactData, properties = {}) => {
    trackUserInteraction('contact_interaction', {
      interaction_type: interactionType,
      contact_data: contactData,
      ...properties,
    });
  }, []);

  // Track errors
  const trackErrorEvent = useCallback((error, errorInfo, properties = {}) => {
    trackError(error, {
      error_info: errorInfo,
      ...properties,
    });
  }, []);

  // Track social sharing
  const trackSocialShare = useCallback((platform, contentType, contentId, properties = {}) => {
    trackEvent('social_share', {
      platform: platform,
      content_type: contentType,
      content_id: contentId,
      ...properties,
    });
  }, []);

  // Track newsletter signup
  const trackNewsletterSignup = useCallback((email, properties = {}) => {
    trackEvent('newsletter_signup', {
      email: email,
      ...properties,
    });
  }, []);

  // Track download
  const trackDownload = useCallback((fileName, fileType, properties = {}) => {
    trackEvent('download', {
      file_name: fileName,
      file_type: fileType,
      ...properties,
    });
  }, []);

  // Track modal interactions
  const trackModalInteraction = useCallback((modalName, action, properties = {}) => {
    trackUserInteraction('modal_interaction', {
      modal_name: modalName,
      action: action,
      ...properties,
    });
  }, []);

  // Track performance metrics
  const trackPerformance = useCallback((metricName, value, properties = {}) => {
    trackEvent('performance_metric', {
      metric_name: metricName,
      metric_value: value,
      ...properties,
    });
  }, []);

  return {
    // Core tracking methods
    track,
    trackButtonClick,
    trackLinkClick,
    trackScroll,
    trackTimeOnPage,
    trackErrorEvent,
    
    // Form tracking
    trackFormStart,
    trackFormSubmit,
    trackFormError,
    
    // E-commerce tracking
    trackProductView,
    trackAddToCart,
    trackOrderStart,
    trackOrderComplete,
    
    // Content tracking
    trackSearch,
    trackGalleryInteraction,
    trackFilterUsage,
    trackContactInteraction,
    trackSocialShare,
    trackNewsletterSignup,
    trackDownload,
    trackModalInteraction,
    
    // Performance tracking
    trackPerformance,
  };
};

export default useAnalytics;