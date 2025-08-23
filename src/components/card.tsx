import React from 'react';

const DutifulCard = () => {
    return (
        <div className="relative inline-block">
            <div className="card-1 absolute top-2 left-2 w-80 h-64 border-2 "></div>
            <div className="card-1 absolute top-1 left-1 w-80 h-64 border-2"></div>
            <div className="card-1 relative border-2 p-8 w-80 h-64">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-black font-bold text-lg">→</span>
                    <h2 className="text-black font-bold text-lg tracking-wide">DUTIFUL</h2>
                </div>
                <p className="text-black text-sm leading-relaxed">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Exercitationem doloremque vitae minima.
                </p>
            </div>
        </div>
    );
};

export default DutifulCard;