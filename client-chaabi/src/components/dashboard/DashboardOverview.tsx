import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { StatsGrid } from '../common/StatsGrid';
import { DataTable } from '../common/DataTable';
import { CreateButton } from '../common/CreateButton';
import { useDemands, useValidateDemand } from '../../hooks/useDemands';
import { useCreateQuote, useQuotes, useManageQuote } from '../../hooks/useQuotes';
import { ViewDemandDialog } from '../demand/ViewDemandDialog';
import { EditDemandDialog } from '../demand/EditDemandDialog';
import { RejectDemandModal } from '../demand/RejectDemandModal';
import { RejectionReasonModal } from '../demand/RejectionReasonModal';
import { CreateDevisModal } from '../demand/CreateDevisModal';
import { AttachFileModal } from '../demand/AttachFileModal';
import { AttachFileToQuoteModal } from '../demand/AttachFileToQuoteModal';
import { ViewQuoteModal } from '../demand/ViewQuoteModal';
import { AdminDashboard } from './admin/AdminDashboard';
import type { TableColumn, TableAction } from '../common/DataTable';
import type { Demand } from '../../types/demand';
import type { Quote } from '../../services/quoteService';

// Main dashboard component - shows different content based on user role
export const DashboardOverview: React.FC = () => {
    const { user } = useAuth();
    const { data: demands = [], isLoading } = useDemands();
    const { data: quotes = [] } = useQuotes();
    const validateDemandMutation = useValidateDemand();
    const createQuoteMutation = useCreateQuote();
    const manageQuoteMutation = useManageQuote();
    const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
    const [isDevisModalOpen, setIsDevisModalOpen] = useState(false);
    const [isViewQuoteModalOpen, setIsViewQuoteModalOpen] = useState(false);
    const [isAttachFileModalOpen, setIsAttachFileModalOpen] = useState(false);
    const [isGeneralAttachModalOpen, setIsGeneralAttachModalOpen] = useState(false);
    const [isAttachingFile, setIsAttachingFile] = useState(false);
    const [prefilledQuoteId, setPrefilledQuoteId] = useState<number | undefined>(undefined);

    // Debug logs
    console.log('DashboardOverview - User:', user);
    console.log('DashboardOverview - User role:', user?.role);
    console.log('DashboardOverview - Role type:', typeof user?.role);
    console.log('DashboardOverview - Quotes available:', quotes);
    console.log('DashboardOverview - Demands available:', demands);

    // Debug modal state
    React.useEffect(() => {
        if (isAttachFileModalOpen) {
            console.log('Modal opened - selectedQuote:', selectedQuote);
            console.log('Modal opened - selectedDemand:', selectedDemand);
            console.log('Modal opened - selectedQuote type:', typeof selectedQuote);
            console.log('Modal opened - selectedQuote ID:', selectedQuote?.id);
        }
    }, [isAttachFileModalOpen, selectedQuote, selectedDemand]);

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

    const handleViewQuote = (quote: Quote) => {
        console.log('Viewing quote:', quote);
        setSelectedQuote(quote);
        setIsViewQuoteModalOpen(true);
    };

    const handleCloseAttachFileModal = () => {
        // Prevent closing while file is being attached
        if (isAttachingFile) return;
        
        setIsAttachFileModalOpen(false);
        setSelectedDemand(null);
        setSelectedQuote(null);
    };

    const handleCloseGeneralAttachModal = () => {
        setIsGeneralAttachModalOpen(false);
        setSelectedDemand(null);
        setPrefilledQuoteId(undefined);
    };

    const handleConfirmAttachFile = async (quoteId: number, file: File) => {
        try {
            setIsAttachingFile(true);
            console.log('Attaching file to quote:', quoteId, 'File:', file.name);
            
            await manageQuoteMutation.mutateAsync({
                quoteId,
                attachedFile: file
            });
            
            console.log('File attached successfully');
            
            // Close modal immediately after successful upload
            setIsAttachFileModalOpen(false);
            setSelectedDemand(null);
            setSelectedQuote(null);
        } catch (error) {
            console.error('Error attaching file:', error);
            alert('Failed to attach file. Please try again.');
        } finally {
            setIsAttachingFile(false);
        }
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
            case 'manager':
                // Manager sees approved quotes/devis and can attach files to them
                return {
                    title: 'Approved Quotes/Devis',
                    columns: [
                        { 
                            key: 'id', 
                            header: 'Quote ID',
                            render: (value: number) => `#${value}`
                        },
                        { 
                            key: 'totalAmount', 
                            header: 'Total Amount',
                            render: (value: number) => `$${value.toFixed(2)}`
                        },
                        { 
                            key: 'demand', 
                            header: 'Demand Title',
                            render: (value: any) => value?.title || 'N/A'
                        },
                        { 
                            key: 'provider', 
                            header: 'Provider',
                            render: (value: any) => {
                                if (value) {
                                    return `${value.firstName || ''} ${value.lastName || ''}`.trim() || value.email || 'N/A';
                                }
                                return 'N/A';
                            }
                        },
                        { 
                            key: 'status', 
                            header: 'Status', 
                            render: (value: string) => (
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    value === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                                    value === 'CREATED' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
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
                    data: quotes.filter(quote => quote.status === 'APPROVED'),
                    actions: [
                        {
                            label: 'View',
                            onClick: (row: Quote) => handleViewQuote(row),
                            variant: 'primary' as const,
                            roles: ['manager']
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
                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" 
                                        />
                                    </svg>
                                    <span>Attach File</span>
                                </div>
                            ),
                            onClick: (row: Quote) => {
                                setSelectedQuote(row);
                                setIsAttachFileModalOpen(true);
                            },
                            variant: 'secondary' as const,
                            roles: ['manager']
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
            case 'admin':
                // Admin can see all users and manage them
                return {
                    title: 'All Users',
                    columns: [],
                    data: [],
                    actions: []
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
            {user?.role === 'admin' ? (
                // Admin sees the AdminDashboard component
                <AdminDashboard />
            ) : user?.role === 'manager' ? (
                // Manager Dashboard - Shows approved demands with quotes ready for file attachment
                <>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Manager Dashboard</h1>
                        <p className="text-gray-600">Manage approved demands and attach files to quotes</p>
                    </div>

                    {/* Stats for Manager */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Approved Demands</h3>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {demands.filter(d => d.status === 'TECHNICIAN_APPROVED').length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Quotes with Files</h3>
                                    <p className="text-2xl font-bold text-green-600">
                                        {quotes.filter(q => q.attachedFiles && q.attachedFiles.length > 0).length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Pending Files</h3>
                                    <p className="text-2xl font-bold text-yellow-600">
                                        {quotes.filter(q => !q.attachedFiles || q.attachedFiles.length === 0).length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Approved Demands Table */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Approved Demands Ready for File Attachment</h2>
                            <p className="text-sm text-gray-600 mt-1">Demands approved by technicians with quotes that need file attachments</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demand</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {demands
                                        .filter(demand => demand.status === 'TECHNICIAN_APPROVED')
                                        .map((demand) => {
                                            const demandQuotes = quotes.filter(q => q.demandId === demand.id);
                                            return demandQuotes.length > 0 ? demandQuotes.map((quote) => (
                                                <tr key={`${demand.id}-${quote.id}`} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{demand.title}</div>
                                                            <div className="text-sm text-gray-500">{demand.description.length > 50 ? demand.description.substring(0, 50) + '...' : demand.description}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            {demand.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        #{quote.id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {quote.attachedFiles && quote.attachedFiles.length > 0 ? (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                File Attached
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                Needs File
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                        <button
                                                            onClick={() => handleViewDemand(demand)}
                                                            className="text-blue-600 hover:text-blue-900 transition-colors"
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                console.log('Attach button clicked - Quote:', quote);
                                                                console.log('Attach button clicked - Demand:', demand);
                                                                setSelectedDemand(demand);
                                                                setSelectedQuote(quote);
                                                                setIsAttachFileModalOpen(true);
                                                            }}
                                                            className="text-orange-600 hover:text-orange-900 transition-colors inline-flex items-center gap-1"
                                                        >
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
                                                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" 
                                                                />
                                                            </svg>
                                                            {quote.attachedFiles && quote.attachedFiles.length > 0 ? 'Re-attach' : 'Attach File'}
                                                        </button>
                                                        {quote.attachedFiles && quote.attachedFiles.length > 0 && (
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedQuote(quote);
                                                                    setIsViewQuoteModalOpen(true);
                                                                }}
                                                                className="text-purple-600 hover:text-purple-900 transition-colors"
                                                            >
                                                                View Quote
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr key={demand.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{demand.title}</div>
                                                            <div className="text-sm text-gray-500">{demand.description.length > 50 ? demand.description.substring(0, 50) + '...' : demand.description}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            {demand.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        No quotes yet
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            Waiting for quotes
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                        <button
                                                            onClick={() => handleViewDemand(demand)}
                                                            className="text-blue-600 hover:text-blue-900 transition-colors"
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedDemand(demand);
                                                                // Create a temporary quote ID based on demand ID for demonstration
                                                                const tempQuoteId = demand.id;
                                                                console.log(`Using quote ID ${tempQuoteId} for demand ${demand.id}`);
                                                                setPrefilledQuoteId(tempQuoteId);
                                                                setIsGeneralAttachModalOpen(true);
                                                            }}
                                                            className="text-orange-600 hover:text-orange-900 transition-colors"
                                                        >
                                                            Attach
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    {demands.filter(d => d.status === 'TECHNICIAN_APPROVED').length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center">
                                                <div className="text-gray-500">
                                                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    <p className="text-lg font-medium">No approved demands found</p>
                                                    <p className="text-sm">Approved demands by technicians will appear here</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <>
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
                </>
            )}

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

            {/* Attach file modal - automatically uses quote ID when selectedQuote is available */}
            {isAttachFileModalOpen && selectedQuote ? (
                <AttachFileToQuoteModal
                    isOpen={isAttachFileModalOpen}
                    onClose={handleCloseAttachFileModal}
                    quote={selectedQuote}
                    onSave={handleConfirmAttachFile}
                    isLoading={isAttachingFile}
                />
            ) : isAttachFileModalOpen ? (
                <AttachFileModal
                    isOpen={isAttachFileModalOpen}
                    onClose={handleCloseAttachFileModal}
                    demand={selectedDemand}
                    onSave={handleConfirmAttachFile}
                    isLoading={isAttachingFile}
                />
            ) : null}

            {/* General Attach File Modal (for demands without specific quotes) */}
            <AttachFileModal
                isOpen={isGeneralAttachModalOpen}
                onClose={handleCloseGeneralAttachModal}
                demand={selectedDemand}
                onSave={handleConfirmAttachFile}
                isLoading={isAttachingFile}
                prefilledQuoteId={prefilledQuoteId}
            />

            {/* View Quote Modal */}
            <ViewQuoteModal
                isOpen={isViewQuoteModalOpen}
                onClose={() => {
                    setIsViewQuoteModalOpen(false);
                    setSelectedQuote(null);
                }}
                quote={selectedQuote}
            />
        </div>
    );
};
