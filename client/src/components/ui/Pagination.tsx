import React from 'react';
import { Button } from './Button';

interface PaginationProps {
    totalItems: number;
    itemsPerPage?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage = 10,
    currentPage = 1,
    onPageChange,
    className = ''
}) => {
    // This is currently a UI-focused implementation as per the existing code
    // Expanded logic can be added later as needed

    return (
        <div className={`px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between ${className}`}>
            <span className="text-sm text-gray-700">
                Showing <span className="font-semibold text-gray-900">1</span> to <span className="font-semibold text-gray-900">{Math.min(totalItems, itemsPerPage)}</span> of <span className="font-semibold text-gray-900">{totalItems}</span> results
            </span>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange && onPageChange(currentPage - 1)}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage * itemsPerPage >= totalItems} // Simplified check
                    onClick={() => onPageChange && onPageChange(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};
