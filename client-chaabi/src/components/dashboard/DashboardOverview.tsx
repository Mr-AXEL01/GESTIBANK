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
import { ViewDevisModal } from '../demand/ViewDevisModal';

// Main dashboard component - shows different content based on user role
export const DashboardOverview: React.FC = () => {
    const { user } = useAuth();
    const { data: demands = [], isLoading } = useDemands();
    const { data: quotes = [] } = useQuotes();
    const [selectedDevis, setSelectedDevis] = useState<Quote | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const [isAttachingFile, setIsAttachingFile] = useState(false);

    // Debug logs
    console.log('DashboardOverview - quotes:', quotes);
    console.log('DashboardOverview - User:', user);
    console.log('DashboardOverview - User role:', user?.role);
    console.log('DashboardOverview - Role type:', typeof user?.role);

    const handleViewDetails = (devis: Quote) => {
        console.log('Viewing devis details:', devis);
        setSelectedDevis(devis);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDevis(null);
      };

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
                    title: 'Demandes Récentes',
                    columns: [
                        { key: 'title', header: 'Titre' },
                        { 
                            key: 'createdBy', 
                            header: 'Créé par',
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
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                    {getStatusBadge(value)}
                                </span>
                            )
                        },
                        { 
                            key: 'createdAt', 
                            header: 'Créé le', 
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
                            label: 'Valider',
                            onClick: (row: Demand) => handleApproveDemand(row),
                            variant: 'secondary' as const,
                            roles: ['responsible'],
                            condition: (row: Demand) => row.status === 'CREATED'
                        },
                        {
                            label: 'Rejeter',
                            onClick: (row: Demand) => handleRejectDemand(row),
                            variant: 'danger' as const,
                            roles: ['responsible'],
                            condition: (row: Demand) => row.status === 'CREATED'
                        },
                        {
                            label: 'Modifier',
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
                                    <span>Raison</span>
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
                    title: 'Demandes en Attente de Révision',
                    columns: [
                        { key: 'title', header: 'Titre' },
                        { 
                            key: 'createdBy', 
                            header: 'Créé Par',
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
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                    {getStatusBadge(value)}
                                </span>
                            )
                        },
                        { 
                            key: 'createdAt', 
                            header: 'Créé le', 
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
                            label: 'Valider',
                            onClick: (row: Demand) => handleApproveDemand(row),
                            variant: 'secondary' as const,
                            roles: ['technician'],
                            condition: (row: Demand) => row.status === 'RESPONSIBLE_APPROVED'
                        },
                        {
                            label: 'Rejeter',
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
                    title: 'Attacher Bons de Commande aux Devis',
                    columns: [
                        { 
                            key: 'id', 
                            header: 'ID du Devis',
                            render: (value: number) => `#${value}`
                        },
                        { 
                            key: 'totalAmount', 
                            header: 'Montant Total',
                            render: (value: number) => `$${value.toFixed(2)}`
                        },
                        { 
                            key: 'demand', 
                            header: 'Titre de la Demande',
                            render: (value: any) => value?.title || 'N/A'
                        },
                        { 
                            key: 'provider', 
                            header: 'Prestataire',
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
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                    {getStatusBadge(value)}
                                </span>
                            )
                        },
                        { 
                            key: 'createdAt', 
                            header: 'Créé le', 
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
                                    <span>Attacher un Fichier</span>
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
                    title: 'Demandes Approuvées - Créer Devis',
                    columns: [
                        { key: 'title', header: 'Titre' },
                        { 
                            key: 'createdBy', 
                            header: 'Créé Par',
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
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                    {getStatusBadge(value)}
                                </span>
                            )
                        },
                        { 
                            key: 'createdAt', 
                            header: 'Créé le', 
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
                            label: 'Créer Devis',
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
                    title: 'Tous les Utilisateurs',
                    columns: [],
                    data: [],
                    actions: []
                };
            case 'agent':
            default:
                // Agent sees their own demands but not technician rejected ones
                return {
                    title: 'Mes Demandes Récentes',
                    columns: [
                        { key: 'title', header: 'Titre' },
                        { 
                            key: 'status', 
                            header: 'Status', 
                            render: (value: string) => (
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                    {getStatusBadge(value)}
                                </span>
                            )
                        },
                        { 
                            key: 'createdAt', 
                            header: 'Créé le', 
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
                            label: 'Modifier',
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
                                    <span>Raison</span>
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
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Gestionnaire Dashboard</h1>
                        <p className="text-gray-600">Gérer les demandes approuvées et joindre des fichiers aux devis</p>
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
                                    <h3 className="text-lg font-semibold text-gray-900">Demandes approuvées</h3>
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
                                    <h3 className="text-lg font-semibold text-gray-900">Devis avec fichiers</h3>
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
                                    <h3 className="text-lg font-semibold text-gray-900">Fichiers en attente</h3>
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
                            <h2 className="text-lg font-semibold text-gray-900">Demandes approuvées prêtes pour la pièce jointe de fichiers</h2>
                            <p className="text-sm text-gray-600 mt-1">Demandes approuvées par les techniciens avec des devis nécessitant des pièces jointes</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demande</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID de devis</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut du fichier</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {demands
                                        .filter(demand => demand.status === 'TECHNICIAN_APPROVED')
                                        .map((demand) => {
                                            const demandQuotes = quotes.filter(q => q.demand?.id === demand.id);
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
                                                                Fichiers attachés
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                En attente de fichiers
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                        <button
                                                            onClick={() => handleViewDetails(quote)}
                                                            className="text-blue-600 hover:text-blue-900 transition-colors"
                                                        >
                                                            View
                                                        </button>
                                                        {(!quote.attachedFiles || quote.attachedFiles.length === 0) && (
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedDemand(demand);
                                                                    setSelectedQuote(quote);
                                                                    setIsAttachFileModalOpen(true);
                                                                }}
                                                                className="text-green-600 hover:text-green-900 transition-colors"
                                                            >
                                                                Ajouter Fichier
                                                            </button>
                                                        )}
                                                        {quote.attachedFiles && quote.attachedFiles.length > 0 && (
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedQuote(quote);
                                                                    setIsViewQuoteModalOpen(true);
                                                                }}
                                                                className="text-purple-600 hover:text-purple-900 transition-colors"
                                                            >
                                                                Voir le devis
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
                                                        Pas de devis pour le moment
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            En attente de devis
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            onClick={() => handleViewDemand(demand)}
                                                            className="text-blue-600 hover:text-blue-900 transition-colors"
                                                        >
                                                            View
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
                                                    <p className="text-lg font-medium">Aucune demande approuvée trouvée</p>
                                                    <p className="text-sm">Les demandes approuvées par les techniciens apparaîtront ici</p>
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


            {/* View quote dialog */}
            <ViewDevisModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                devis={selectedDevis}
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

            {/* Attach file modal */}
            {user?.role === 'manager' && selectedQuote ? (
                <AttachFileToQuoteModal
                    isOpen={isAttachFileModalOpen}
                    onClose={handleCloseAttachFileModal}
                    quote={selectedQuote}
                    onSave={handleConfirmAttachFile}
                    isLoading={isAttachingFile}
                />
            ) : (
                <AttachFileModal
                    isOpen={isAttachFileModalOpen}
                    onClose={handleCloseAttachFileModal}
                    demand={selectedDemand}
                    onSave={handleConfirmAttachFile}
                    isLoading={isAttachingFile}
                />
            )}

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


const getStatusBadge = (status: string) => {
    const config = {
  CREATED: { color: 'bg-orange-400 text-white border-yellow-200', label: 'Créée' },
  RESPONSIBLE_APPROVED: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Approuvée (Responsable)' },
  RESPONSIBLE_REJECTED: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejetée (Responsable)' },
  TECHNICIAN_APPROVED: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Approuvée (Technicien)' },
  TECHNICIAN_REJECTED: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejetée (Technicien)' },
  IN_PROGRESS: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'En cours' },
  DONE: { color: 'bg-green-200 text-green-900 border-green-300', label: 'Terminée' }
};

const statusConfig = config[status as keyof typeof config] || config.CREATED;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
        {statusConfig.label}
      </span>
    );
  };