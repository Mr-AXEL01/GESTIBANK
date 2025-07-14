import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { StatsGrid } from '../common/StatsGrid';
import { DataTable } from '../common/DataTable';
import { CreateButton } from '../common/CreateButton';
import { useDemands, useValidateDemand } from '../../hooks/useDemands';
import { useCreateQuote } from '../../hooks/useQuotes';
import { ViewDemandDialog } from '../demand/ViewDemandDialog';
import { EditDemandDialog } from '../demand/EditDemandDialog';
import { RejectDemandModal } from '../demand/RejectDemandModal';
import { RejectionReasonModal } from '../demand/RejectionReasonModal';
import { CreateDevisModal } from '../demand/CreateDevisModal';
import type { TableColumn, TableAction } from '../common/DataTable';
import type { Demand } from '../../types/demand';

// Main dashboard component - shows different content based on user role
export const DashboardOverview: React.FC = () => {
    const { user } = useAuth();
    const { data: demands = [], isLoading } = useDemands();
    const validateDemandMutation = useValidateDemand();
    const createQuoteMutation = useCreateQuote();
    const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
    const [isDevisModalOpen, setIsDevisModalOpen] = useState(false);

    const handleViewDemand = (demand: Demand) => {
        console.log('Viewing demand:', demand);
        setSelectedDemand(demand);
        setIsDialogOpen(true);
    };

    const handleEditDemand = (demand: Demand) => {
        console.log('Editing demand:', demand);
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

    const handleApproveDemand = (demand: Demand) => {
        console.log('Approving demand:', demand);
        
        // Send "APPROVED" status to the validate endpoint
        const validateData = {
            demandStatus: 'APPROVED',
            comment: {
                content: `Demande est valide d'apres ${user?.name || 'user'}`,
                type: 'APPROVED',
                demandId: demand.id,
                quoteId: undefined // Set to 0 if not applicable
            }
        };

        validateDemandMutation.mutate(validateData, {
            onSuccess: () => {
                console.log('Demand approved successfully');
                // TODO: Add toast notification
            },
            onError: (error) => {
                console.error('Failed to approve demand:', error);
                // TODO: Add error toast notification
            }
        });
    };

    const handleRejectDemand = (demand: Demand) => {
        console.log('Opening reject modal for demand:', demand);
        console.log('Setting selectedDemand to:', demand);
        setSelectedDemand(demand);
        console.log('Setting isRejectModalOpen to true');
        setIsRejectModalOpen(true);
        console.log('Current modal state after setting:', { isRejectModalOpen: true, selectedDemand: demand });
    };

    const handleConfirmReject = (rejectionReason: string) => {
        if (!selectedDemand) return;
        
        console.log('Rejecting demand with reason:', rejectionReason);
        
        // Send "REJECTED" status to the validate endpoint with custom reason
        const validateData = {
            demandStatus: 'REJECTED',
            comment: {
                content: rejectionReason,
                type: 'REJECTED',
                demandId: selectedDemand.id,
                quoteId: undefined
            }
        };

        validateDemandMutation.mutate(validateData, {
            onSuccess: () => {
                console.log('Demand rejected successfully');
                setIsRejectModalOpen(false);
                setSelectedDemand(null);
                // TODO: Add toast notification
            },
            onError: (error) => {
                console.error('Failed to reject demand:', error);
                // TODO: Add error toast notification
            }
        });
    };

    const handleCloseRejectModal = () => {
        setIsRejectModalOpen(false);
        setSelectedDemand(null);
    };

    const handleShowRejectionReason = (demand: Demand) => {
        setSelectedDemand(demand);
        setIsReasonModalOpen(true);
    };

    const handleCloseReasonModal = () => {
        setIsReasonModalOpen(false);
        setSelectedDemand(null);
    };

    const handleCreateDevis = (demand: Demand) => {
        console.log('Opening create devis modal for demand:', demand);
        setSelectedDemand(demand);
        setIsDevisModalOpen(true);
    };

    const handleConfirmCreateDevis = (totalAmount: number) => {
        if (!selectedDemand) return;
        
        console.log('Creating quote for demand:', selectedDemand, 'with amount:', totalAmount);
        
        const quoteData = {
            totalAmount,
            demandId: selectedDemand.id
        };

        createQuoteMutation.mutate(quoteData, {
            onSuccess: () => {
                console.log('Quote created successfully');
                setIsDevisModalOpen(false);
                setSelectedDemand(null);
                // TODO: Add toast notification
            },
            onError: (error) => {
                console.error('Failed to create quote:', error);
                // TODO: Add error toast notification
            }
        });
    };

    const handleCloseDevisModal = () => {
        setIsDevisModalOpen(false);
        setSelectedDemand(null);
    };

    // Table config changes based on user role
    const getTableData = () => {
        switch (user?.role) {
            case 'responsible':
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
                            render: (value: string) => new Date(value).toLocaleString()
                        }
                    ] as TableColumn[],
                    data: demands,
                    actions: [
                        {
                            label: 'View',
                            onClick: (row: Demand) => handleViewDemand(row),
                            variant: 'primary' as const,
                            roles: ['responsible', 'agent', 'technician']
                        },
                        {
                            label: 'Approve',
                            onClick: (row: Demand) => handleApproveDemand(row),
                            variant: 'secondary' as const,
                            roles: ['responsible'],
                            condition: (row: Demand) => row.status === 'CREATED'
                        },
                        {
                            label: 'Reject',
                            onClick: (row: Demand) => handleRejectDemand(row),
                            variant: 'danger' as const,
                            roles: ['responsible'],
                            condition: (row: Demand) => row.status === 'CREATED'
                        },
                        {
                            label: 'Edit',
                            onClick: (row: Demand) => handleEditDemand(row),
                            variant: 'secondary' as const,
                            roles: ['responsible'],
                            condition: (row: Demand) => 
                                row.status === 'RESPONSIBLE_REJECTED' ||
                                row.status === 'TECHNICIAN_REJECTED'
                        },
                        {
                            label: (
                                <div className="flex items-center gap-1">
                                    <svg 
                                        className="w-4 h-4" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" 
                                        />
                                    </svg>
                                    <span>Reason</span>
                                </div>
                            ),
                            onClick: (row: Demand) => handleShowRejectionReason(row),
                            variant: 'info' as const,
                            roles: ['responsible'],
                            condition: (row: Demand) => row.status === 'TECHNICIAN_REJECTED'
                        }
                    ] as TableAction[]
                };
            case 'technician':
                // Technician sees RESPONSIBLE_APPROVED demands and can approve/reject them
                return {
                    title: 'Demands for Technical Review',
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
                            render: (value: string) => (
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    value === 'TECHNICIAN_APPROVED' ? 'bg-green-100 text-green-800' : 
                                    value === 'RESPONSIBLE_APPROVED' ? 'bg-blue-100 text-blue-800' :
                                    value === 'TECHNICIAN_REJECTED' ? 'bg-red-100 text-red-800' : 
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {value}
                                </span>
                            )
                        },
                        { 
                            key: 'createdAt', 
                            header: 'Created At', 
                            render: (value: string) => new Date(value).toLocaleString()
                        }
                    ] as TableColumn[],
                    data: demands.filter(demand => demand.status === 'RESPONSIBLE_APPROVED'),
                    actions: [
                        {
                            label: 'View',
                            onClick: (row: Demand) => handleViewDemand(row),
                            variant: 'primary' as const,
                            roles: ['technician']
                        },
                        {
                            label: 'Approve',
                            onClick: (row: Demand) => handleApproveDemand(row),
                            variant: 'secondary' as const,
                            roles: ['technician'],
                            condition: (row: Demand) => row.status === 'RESPONSIBLE_APPROVED'
                        },
                        {
                            label: 'Reject',
                            onClick: (row: Demand) => handleRejectDemand(row),
                            variant: 'danger' as const,
                            roles: ['technician'],
                            condition: (row: Demand) => row.status === 'RESPONSIBLE_APPROVED'
                        }
                    ] as TableAction[]
                };
            case 'provider':
                // Provider sees approved demands and can create quotes/devis
                return {
                    title: 'Approved Demands - Create Quotes',
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
                            render: (value: string) => (
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    value === 'TECHNICIAN_APPROVED' ? 'bg-green-100 text-green-800' : 
                                    value === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                                    value === 'DONE' ? 'bg-purple-100 text-purple-800' : 
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {value}
                                </span>
                            )
                        },
                        { 
                            key: 'createdAt', 
                            header: 'Created At', 
                            render: (value: string) => new Date(value).toLocaleString()
                        }
                    ] as TableColumn[],
                    data: demands.filter(demand => demand.status === 'TECHNICIAN_APPROVED'),
                    actions: [
                        {
                            label: 'View',
                            onClick: (row: Demand) => handleViewDemand(row),
                            variant: 'primary' as const,
                            roles: ['provider']
                        },
                        {
                            label: 'Create Devis',
                            onClick: (row: Demand) => handleCreateDevis(row),
                            variant: 'secondary' as const,
                            roles: ['provider'],
                            condition: (row: Demand) => row.status === 'TECHNICIAN_APPROVED'
                        }
                    ] as TableAction[]
                };
            case 'agent':
            default:
                // Agent sees their own demands but not technician rejected ones
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
                            render: (value: string) => new Date(value).toLocaleString()
                        }
                    ] as TableColumn[],
                    data: demands, // Show all demands including technician rejected ones
                    actions: [
                        {
                            label: 'View',
                            onClick: (row: Demand) => handleViewDemand(row),
                            variant: 'primary' as const,
                            roles: ['agent', 'responsible', 'technician']
                        },
                        {
                            label: 'Edit',
                            onClick: (row: Demand) => handleEditDemand(row),
                            variant: 'secondary' as const,
                            roles: ['agent', 'responsible'],
                            condition: (row: Demand) => row.status === 'RESPONSIBLE_REJECTED'
                        },
                        {
                            label: (
                                <div className="flex items-center gap-1">
                                    <svg 
                                        className="w-4 h-4" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" 
                                        />
                                    </svg>
                                    <span>Reason</span>
                                </div>
                            ),
                            onClick: (row: Demand) => handleShowRejectionReason(row),
                            variant: 'info' as const,
                            roles: ['agent'],
                            condition: (row: Demand) => row.status === 'RESPONSIBLE_REJECTED'
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

            {/* Reject demand modal */}
            <RejectDemandModal
                isOpen={isRejectModalOpen}
                onClose={handleCloseRejectModal}
                onConfirm={handleConfirmReject}
                demand={selectedDemand}
                isLoading={validateDemandMutation.isPending}
            />

            {/* Rejection reason modal */}
            <RejectionReasonModal
                isOpen={isReasonModalOpen}
                onClose={handleCloseReasonModal}
                demand={selectedDemand}
            />

            {/* Create devis modal */}
            <CreateDevisModal
                isOpen={isDevisModalOpen}
                onClose={handleCloseDevisModal}
                onConfirm={handleConfirmCreateDevis}
                demand={selectedDemand}
                isLoading={createQuoteMutation.isPending}
            />
        </div>
    );
};