import React from 'react';

// 1. Define Props Interface extending standard HTML Button props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'sm' | 'default' | 'lg';
}

const Button = ({
  children,
  size = 'default',
  className = '',
  disabled = false,
  ...props
}: ButtonProps) => {

  const sizes = {
    sm: "py-1 px-3 text-xs sm:text-sm",
    default: "py-2 px-4 sm:px-6 text-sm sm:text-base",
    lg: "py-3 px-6 sm:px-8 text-lg sm:text-xl"
  };

  return (
    <button
      disabled={disabled}
      className={`
        button flex items-center justify-center font-bold tracking-widest lowercase transition-none
        border-2 
        ${sizes[size]} 
        ${disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer active:translate-y-1 active:shadow-none"
        } 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;