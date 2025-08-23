import React from 'react';

const CheckboxIcon = ({
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
            strokeLinecap="square"
            strokeLinejoin="miter"
            className={className}
            {...props}
        >
            {/* Back square - filled */}
            <rect x="6" y="3" width="15" height="15" fill={color} />

            {/* Front square - outline only */}
            <rect x="3" y="6" width="15" height="15" fill="none" stroke={color} strokeWidth={strokeWidth} />
        </svg>
    );
};

export default CheckboxIcon; 
