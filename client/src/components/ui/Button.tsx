import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg";

    // Minimal Design: Primary Blue + Neutral Grays
    const variants = {
        primary: "bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-sm",
        secondary: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 focus:ring-primary-500",
        danger: "bg-white hover:bg-gray-50 text-red-600 border border-gray-200 focus:ring-red-500", // Keep semantic red for danger but minimal
        outline: "border border-primary-200 bg-transparent hover:bg-primary-50 text-primary-600 focus:ring-primary-500"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
