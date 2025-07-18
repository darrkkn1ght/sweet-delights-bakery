import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Performance monitoring (Web Vitals)
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      try {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      } catch (error) {
        console.warn('Web Vitals not available:', error);
      }
    }).catch(() => {
      console.warn('Web Vitals package not available');
    });
  }
};

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render app with error handling
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring
reportWebVitals(console.log);

// Service worker registration for PWA capabilities (commented out for now)
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then((registration) => {
//         console.log('SW registered: ', registration);
//       })
//       .catch((registrationError) => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// } 