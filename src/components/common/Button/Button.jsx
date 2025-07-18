import React, { forwardRef } from 'react';
import clsx from 'clsx';
import './Button.css';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon: Icon = null,
  iconPosition = 'left',
  onClick,
  href,
  target,
  rel,
  type = 'button',
  className,
  ...props
}, ref) => {
  const baseClasses = 'btn';
  const variantClasses = `btn--${variant}`;
  const sizeClasses = `btn--${size}`;
  const stateClasses = clsx({
    'btn--disabled': disabled,
    'btn--loading': loading,
    'btn--full-width': fullWidth,
    'btn--icon-only': Icon && !children,
    'btn--icon-right': Icon && iconPosition === 'right',
  });

  const buttonClasses = clsx(
    baseClasses,
    variantClasses,
    sizeClasses,
    stateClasses,
    className
  );

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  const renderIcon = () => {
    if (loading) {
      return (
        <div className="btn-spinner" aria-hidden="true">
          <div className="spinner"></div>
        </div>
      );
    }
    if (Icon) {
      return <Icon className="btn-icon" size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />;
    }
    return null;
  };

  const renderContent = () => {
    if (loading && !children) {
      return <span className="sr-only">Loading...</span>;
    }
    
    return (
      <>
        {Icon && iconPosition === 'left' && renderIcon()}
        {children && <span className="btn-text">{children}</span>}
        {Icon && iconPosition === 'right' && renderIcon()}
      </>
    );
  };

  // Render as link if href is provided
  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        onClick={handleClick}
        aria-disabled={disabled || loading}
        {...props}
      >
        {renderContent()}
      </a>
    );
  }

  // Render as button
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;