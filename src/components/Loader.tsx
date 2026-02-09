import React from 'react';

interface LoaderProps {
    size?: number | string;
    color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 8, color = 'primary' }) => {
    const sizeClass = typeof size === 'number' ? `w-${size} h-${size}` : size;
    const colorClass = color === 'primary' ? 'border-primary' : `border-${color}`;

    return (
        <div className="flex items-center justify-center h-full">
            <div className={`${sizeClass} border-4 border-t-transparent ${colorClass} rounded-full animate-spin`}></div>
        </div>
    );
};
