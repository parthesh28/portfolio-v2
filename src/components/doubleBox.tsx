import React from 'react';

const DoubleSquareIcon = ({
    size = 24,
    color = 'currentColor',
    strokeWidth = 2,
    className = '',
    ...props
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <rect x="3" y="3" width="18" height="18" />
            <rect x="7" y="7" width="10" height="10" />
        </svg>
    );
};

export default DoubleSquareIcon;