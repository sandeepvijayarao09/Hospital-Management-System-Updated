import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral' }) => {
    // Minimal Design: Primary Blue + Neutral Grays
    const variants = {
        // Success -> Solid Primary
        success: "bg-primary-100 text-primary-800 border border-primary-200",
        // Warning -> Lighter Primary
        warning: "bg-primary-50 text-primary-600 border border-primary-100",
        // Error -> Gray/Neutrals (minimalist approach)
        error: "bg-gray-100 text-gray-600 border border-gray-200",
        // Info -> Standard Primary
        info: "bg-primary-50 text-primary-700 border border-primary-200",
        // Neutral -> White/Gray
        neutral: "bg-white text-gray-600 border border-gray-200"
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
            {children}
        </span>
    );
};
