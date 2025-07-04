import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export interface TableColumn {
    key: string;
    header: string;
    render?: (value: any, row: any) => React.ReactNode;
}

export interface TableAction {
    label: string;
    onClick: (row: any) => void;
    variant: 'primary' | 'secondary' | 'danger';
    roles: string[];
    icon?: React.ReactNode;
}

interface DataTableProps {
    title: string;
    columns: TableColumn[];
    data: any[];
    actions?: TableAction[];
    emptyMessage?: string;
}

export const DataTable: React.FC<DataTableProps> = ({ 
    title, 
    columns, 
    data, 
    actions = [], 
    emptyMessage = "No data available" 
}) => {
    const { user } = useAuth();

    const getActionButtonClass = (variant: string) => {
        const classes = {
            primary: 'bg-orange-600 hover:bg-orange-700 text-white',
            secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
            danger: 'bg-red-600 hover:bg-red-700 text-white'
        };
        return classes[variant as keyof typeof classes] || classes.primary;
    };

    const canShowAction = (action: TableAction) => {
        return user?.role && action.roles.includes(user.role);
    };

    const visibleActions = actions.filter(canShowAction);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
            {data.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">{emptyMessage}</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-50">
                                {columns.map((column) => (
                                    <th key={column.key} className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                                        {column.header}
                                    </th>
                                ))}
                                {visibleActions.length > 0 && (
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-50">
                                    {columns.map((column) => (
                                        <td key={column.key} className="px-4 py-3 text-sm text-gray-600">
                                            {column.render 
                                                ? column.render(row[column.key], row) 
                                                : row[column.key]
                                            }
                                        </td>
                                    ))}
                                    {visibleActions.length > 0 && (
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex space-x-2">
                                                {visibleActions.map((action, actionIndex) => (
                                                    <button
                                                        key={actionIndex}
                                                        onClick={() => action.onClick(row)}
                                                        className={`px-3 py-1 rounded text-xs font-medium transition duration-200 flex items-center space-x-1 ${getActionButtonClass(action.variant)}`}
                                                    >
                                                        {action.icon && <span>{action.icon}</span>}
                                                        <span>{action.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
