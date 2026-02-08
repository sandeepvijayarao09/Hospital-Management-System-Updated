import React from 'react';

export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({ className = '', children, ...props }) => {
    return (
        <div className="overflow-x-auto">
            <table className={`min-w-full leading-normal ${className}`} {...props}>
                {children}
            </table>
        </div>
    );
};

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className = '', children, ...props }) => {
    return (
        <thead className={className} {...props}>
            {children}
        </thead>
    );
};

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className = '', children, ...props }) => {
    return (
        <tbody className={`divide-y divide-gray-100 ${className}`} {...props}>
            {children}
        </tbody>
    );
};

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ className = '', children, ...props }) => {
    return (
        <tr className={`hover:bg-gray-50 transition-colors ${className}`} {...props}>
            {children}
        </tr>
    );
};

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ className = '', children, ...props }) => {
    return (
        <th className={`px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${className}`} {...props}>
            {children}
        </th>
    );
};

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ className = '', children, ...props }) => {
    return (
        <td className={`px-6 py-4 text-sm ${className}`} {...props}>
            {children}
        </td>
    );
};
