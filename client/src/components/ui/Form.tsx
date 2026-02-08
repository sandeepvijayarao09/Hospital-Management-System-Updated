import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', id, ...props }) => {
    const generatedId = id || props.name || Math.random().toString(36).substr(2, 9);

    return (
        <div>
            {label && (
                <label htmlFor={generatedId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                id={generatedId}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 ${className}`}
                {...props}
            />
        </div>
    );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
}

export const Select: React.FC<SelectProps> = ({ label, className = '', id, children, ...props }) => {
    const generatedId = id || props.name || Math.random().toString(36).substr(2, 9);

    return (
        <div>
            {label && (
                <label htmlFor={generatedId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <select
                id={generatedId}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 ${className}`}
                {...props}
            >
                {children}
            </select>
        </div>
    );
};
