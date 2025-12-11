import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const Badge = ({
    children,
    className = '',
    ...props
}: BadgeProps) => {

    return (
        <div
            className={`badge relative inline-flex items-center justify-center border-2 px-2 py-0.5 ${className}`}
            {...props}
        >
            <span className="text-xs sm:text-sm font-bold tracking-widest lowercase">
                {children}
            </span>
        </div>
    );
};

export default Badge;