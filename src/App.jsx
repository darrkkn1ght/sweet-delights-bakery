import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h2>Oops! Something went wrong</h2>
            <p>We're sorry for the inconvenience. Please refresh the page or try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="error-button"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
    <p>Loading Sweet Delights...</p>
  </div>
);

// Lazy load components for better performance
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const ThankYouPage = React.lazy(() => import('./pages/ThankYouPage/ThankYouPage'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

// 404 Not Found Component
const NotFoundPage = () => (
  <div className="not-found">
    <div className="not-found-content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className="back-home-button">
        Back to Home
      </a>
    </div>
  </div>
);

export default App;