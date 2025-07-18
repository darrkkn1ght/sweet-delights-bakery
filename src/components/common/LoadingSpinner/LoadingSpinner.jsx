import React from 'react';
import clsx from 'clsx';
import './LoadingSpinner.css';

/**
 * LoadingSpinner Component
 * Elegant loading spinner with multiple size and color variants
 * @param {Object} props - Component props
 * @param {string} props.size - Size variant: 'small', 'medium', 'large', 'xlarge'
 * @param {string} props.color - Color variant: 'primary', 'secondary', 'accent', 'white'
 * @param {string} props.type - Animation type: 'spin', 'pulse', 'bounce', 'dots'
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.text - Optional loading text
 * @param {boolean} props.overlay - Whether to show as overlay
 * @param {boolean} props.fullScreen - Whether to show as full screen overlay
 * @returns {JSX.Element} LoadingSpinner component
 */
const LoadingSpinner = ({
  size = 'medium',
  color = 'primary',
  type = 'spin',
  className,
  text,
  overlay = false,
  fullScreen = false,
  ...props
}) => {
  const spinnerClasses = clsx(
    'loading-spinner',
    `loading-spinner--${size}`,
    `loading-spinner--${color}`,
    `loading-spinner--${type}`,
    {
      'loading-spinner--overlay': overlay,
      'loading-spinner--fullscreen': fullScreen,
    },
    className
  );

  const renderSpinner = () => {
    switch (type) {
      case 'dots':
        return (
          <div className="loading-spinner__dots">
            <div className="loading-spinner__dot"></div>
            <div className="loading-spinner__dot"></div>
            <div className="loading-spinner__dot"></div>
          </div>
        );
      case 'pulse':
        return <div className="loading-spinner__pulse"></div>;
      case 'bounce':
        return (
          <div className="loading-spinner__bounce">
            <div className="loading-spinner__bounce-dot"></div>
            <div className="loading-spinner__bounce-dot"></div>
            <div className="loading-spinner__bounce-dot"></div>
          </div>
        );
      case 'spin':
      default:
        return <div className="loading-spinner__spin"></div>;
    }
  };

  const content = (
    <div className={spinnerClasses} {...props}>
      <div className="loading-spinner__container">
        {renderSpinner()}
        {text && <div className="loading-spinner__text">{text}</div>}
      </div>
    </div>
  );

  return content;
};

/**
 * LoadingButton Component
 * Button with integrated loading state
 */
export const LoadingButton = ({
  loading = false,
  disabled = false,
  children,
  className,
  loadingText = 'Loading...',
  ...props
}) => {
  const buttonClasses = clsx(
    'loading-button',
    {
      'loading-button--loading': loading,
      'loading-button--disabled': disabled || loading,
    },
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <LoadingSpinner
          size="small"
          color="white"
          type="spin"
          className="loading-button__spinner"
        />
      )}
      <span className="loading-button__text">
        {loading ? loadingText : children}
      </span>
    </button>
  );
};

/**
 * LoadingCard Component
 * Skeleton card for loading states
 */
export const LoadingCard = ({ className, ...props }) => {
  return (
    <div className={clsx('loading-card', className)} {...props}>
      <div className="loading-card__image"></div>
      <div className="loading-card__content">
        <div className="loading-card__title"></div>
        <div className="loading-card__description"></div>
        <div className="loading-card__price"></div>
      </div>
    </div>
  );
};

/**
 * LoadingText Component
 * Skeleton text for loading states
 */
export const LoadingText = ({ 
  lines = 1, 
  width = '100%', 
  className,
  ...props 
}) => {
  const renderLines = () => {
    const lineArray = Array.from({ length: lines }, (_, index) => (
      <div
        key={index}
        className="loading-text__line"
        style={{
          width: Array.isArray(width) ? width[index] || '100%' : width,
        }}
      ></div>
    ));
    return lineArray;
  };

  return (
    <div className={clsx('loading-text', className)} {...props}>
      {renderLines()}
    </div>
  );
};

export default LoadingSpinner;