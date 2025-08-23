import React from 'react';

const Button = ({
  children,
  size = 'default',
  className = '',
  disabled = false,
  onClick,
  ...props
}) => {

  const sizes = {
    sm: "py-1 px-2 text-sm",
    default: "py-2 px-4 text-lg",
    lg: "py-3 px-6 text-xl"
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <div className="button">
      <button
        className={`button border-2 ${sizes[size]} ${disabledStyles} ${className}`}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button; 