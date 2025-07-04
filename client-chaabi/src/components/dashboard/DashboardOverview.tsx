import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { StatsGrid } from '../common/StatsGrid';
import { DataTable } from '../common/DataTable';
import { CreateButton } from '../common/CreateButton';
import { useDemands } from '../../hooks/useDemands';
import type { TableColumn, TableAction } from '../common/DataTable';

// Main dashboard component - shows different content based on user role
export const DashboardOverview: React.FC = () => {
    const { user } = useAuth();
    const { data: demands = [], isLoading, error } = useDemands();

    // Table config changes based on user role
    const getTableData = () => {
        switch (user?.role) {
            case 'responsable':
                // Responsable sees all demands and can approve them
                return {
                    title: 'Recent Demands',
                    columns: [
                        { key: 'title', header: 'Title' },
                        { key: 'createdBy', header: 'Created By' },
                        { 
                            key: 'status', 
                            header: 'Status', 
                            // Status badge with colors
                            render: (value: string) => (
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    value === 'approved' ? 'bg-green-100 text-green-800' : 
                                    value === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {value}
                                </span>
                            )
                        },
                        { 
                            key: 'createdAt', 
                            header: 'Created At', 
                            render: (value: string) => new Date(value).toLocaleDateString()
                        }
                    ] as TableColumn[],
                    data: demands,
                    actions: [
                        {
                            label: 'View',
                            onClick: (row: any) => console.log('View demand:', row), // TODO: Navigate to detail page
                            variant: 'primary' as const,
                            roles: ['responsable', 'agent']
                        },
                        {
                            label: 'Approve',
                            onClick: (row: any) => console.log('Approve demand:', row), // TODO: Implement approval
                            variant: 'secondary' as const,
                            roles: ['responsable']
                        }
                    ] as TableAction[]
                };
            case 'agent':
            default:
                // Agent sees their own demands and can edit them
                return {
                    title: 'My Recent Demands',
                    columns: [
                        { key: 'title', header: 'Title' },
                        { 
                            key: 'status', 
                            header: 'Status', 
                            render: (value: string) => (
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    value === 'approved' ? 'bg-green-100 text-green-800' : 
                                    value === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {value}
                                </span>
                            )
                        },
                        { 
                            key: 'createdAt', 
                            header: 'Created At', 
                            render: (value: string) => new Date(value).toLocaleDateString()
                        }
                    ] as TableColumn[],
                    data: demands, // TODO: Filter to show only user's demands
                    actions: [
                        {
                            label: 'View',
                            onClick: (row: any) => console.log('View demand:', row), // TODO: Navigate to detail
                            variant: 'primary' as const,
                            roles: ['agent', 'responsable']
                        },
                        {
                            label: 'Edit',
                            onClick: (row: any) => console.log('Edit demand:', row), // TODO: Navigate to edit
                            variant: 'secondary' as const,
                            roles: ['agent']
                        }
                    ] as TableAction[]
                };
        }
    };

    const tableConfig = getTableData();

    return (
        <div className="space-y-6">
            {/* Stats cards */}
            <StatsGrid />
            
            {/* Table header with create button */}
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">{tableConfig.title}</h3>
                <CreateButton />
            </div>
            
            {/* Demands table */}
            <DataTable
                title=""
                columns={tableConfig.columns}
                data={tableConfig.data}
                actions={tableConfig.actions}
                emptyMessage={isLoading ? "Loading demands..." : "No demands found"}
            />
        </div>
    );
};