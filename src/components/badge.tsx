import React from 'react';


const Badge = ({
    children,
    className = '',
    ...props
}) => {
    const baseStyles = "relative bg-zinc-200 border-2 border-black badge-shadow inline-block";


    return (
        <div className="relative border-2 badge inline-block">
        <div className="px-2">
            <p className="text-sm pt-0.5 font-bold ">
                {children}
            </p>
        </div>
    </div>
    );
};

export default Badge; 