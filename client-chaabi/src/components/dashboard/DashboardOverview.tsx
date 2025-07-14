import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { StatsGrid } from '../common/StatsGrid';
import { DataTable } from '../common/DataTable';
import { CreateButton } from '../common/CreateButton';
import { useDemands } from '../../hooks/useDemands';
import { ViewDemandDialog } from '../demand/ViewDemandDialog';
import { EditDemandDialog } from '../demand/EditDemandDialog';
import type { TableColumn, TableAction } from '../common/DataTable';
import type { Demand } from '../../types/demand';

// Main dashboard component - shows different content based on user role
export const DashboardOverview: React.FC = () => {
    const { user } = useAuth();
    const { data: demands = [], isLoading } = useDemands();
    const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleViewDemand = (demand: Demand) => {
        console.log('Viewing demand:', demand);
        setSelectedDemand(demand);
        setIsDialogOpen(true);
    };

    const handleEditDemand = (demand: Demand) => {
        setSelectedDemand(demand);
        setIsEditDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedDemand(null);
    };

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
        setSelectedDemand(null);
    };

    // Table config changes based on user role
    const getTableData = () => {
        switch (user?.role) {
            case 'responsable':
                // Responsable sees all demands and can approve them
                return {
                    title: 'Recent Demands',
                    columns: [
                        { key: 'title', header: 'Title' },
                        { 
                            key: 'createdBy', 
                            header: 'Created By',
                            render: (value: any) => {
                                if (typeof value === 'string') return value;
                                if (typeof value === 'object' && value !== null) {
                                    return `${value.firstName || ''} ${value.lastName || ''}`.trim() || value.email || 'Unknown';
                                }
                                return 'N/A';
                            }
                        },
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
                            onClick: (row: Demand) => handleViewDemand(row),
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
                            onClick: (row: Demand) => handleViewDemand(row),
                            variant: 'primary' as const,
                            roles: ['agent', 'responsable']
                        },
                        {
                            label: 'Edit',
                            onClick: (row: Demand) => handleEditDemand(row),
                            variant: 'secondary' as const,
                            roles: ['agent'],
                            condition: (row: Demand) => 
                                row.status === 'RESPONSIBLE_REJECTED' || 
                                row.status === 'TECHNICIAN_REJECTED'
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

            {/* View demand dialog */}
            <ViewDemandDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                demand={selectedDemand}
            />

            {/* Edit demand dialog */}
            <EditDemandDialog
                isOpen={isEditDialogOpen}
                onClose={handleCloseEditDialog}
                demand={selectedDemand}
            />
        </div>
    );
};