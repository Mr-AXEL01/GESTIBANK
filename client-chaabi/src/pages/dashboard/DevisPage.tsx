import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DataTable } from '../../components/common/DataTable';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useQuotes } from '../../hooks/useQuotes';
import { ViewDevisModal } from '../../components/demand/ViewDevisModal';
import type { TableColumn } from '../../components/common/DataTable';
import type { Quote } from '../../services/quoteService';

export const DevisPage: React.FC = () => {
  const { user } = useAuth();
  const { data: quotes = [], isLoading, error } = useQuotes();
  const [selectedDevis, setSelectedDevis] = useState<Quote | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
    
  // Debug information
//   console.log('DevisPage - User:', user);
//   console.log('DevisPage - User role:', user?.role);
  console.log('DevisPage - Quotes:', quotes);
//   console.log('DevisPage - Quotes with CREATED status:', quotes.filter(q => q.status === 'CREATED'));
//   console.log('DevisPage - Quotes with PENDING status:', quotes.filter(q => q.status === 'PENDING'));

  // Check if user has access to this page
  if (!user || !['technician', 'provider'].includes(user.role)) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const handleApproveQuote = (quote: any) => {
    console.log('Approving quote:', quote);
    // TODO: Implement approve quote API call
    // You can add the API call here similar to how demands are approved
  };

  const handleRejectQuote = (quote: any) => {
    console.log('Rejecting quote:', quote);
    // TODO: Implement reject quote API call
    // You can add the API call here similar to how demands are rejected
  };

  const handleViewDetails = (devis: Quote) => {
    console.log('Viewing devis details:', devis);
    setSelectedDevis(devis);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDevis(null);
  };

  const getTableConfig = () => {
    const columns: TableColumn[] = [
      { 
        key: 'demand', 
        header: 'Demand Title',
        render: (demand: any) => demand?.title || 'N/A'
      },
      {
        key: 'totalAmount',
        header: 'Total Amount',
        render: (value: number) => `€${value.toFixed(2)}`
      },
      {
        key: 'status',
        header: 'Status',
        render: (value: string) => (
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === 'APPROVED' ? 'bg-green-100 text-green-800' :
            value === 'CREATED' ? 'bg-yellow-100 text-yellow-800' :
            value === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {value}
          </span>
        )
      },
      { 
        key: 'provider', 
        header: 'Provider Name',
        render: (provider: any) => {
          if (provider) {
            return `${provider.firstName} ${provider.lastName}`;
          }
          return 'N/A';
        }
      }
    ];

    // Filter quotes based on user role
    const filteredQuotes = user.role === 'technician' 
      ? quotes // Technician sees all quotes
      : quotes.filter(quote => {
          // Provider sees only their own quotes
          // This assumes the quote has a provider field matching current user
          return quote.provider?.email === user.email;
        });

    return {
      title: user.role === 'technician' ? 'All Quotes/Devis' : 'My Quotes/Devis',
      columns: columns,
      data: filteredQuotes,
      actions: [
        {
          label: 'Approve',
          onClick: (row: any) => {
            console.log('User role:', user.role);
            console.log('Quote status:', row.status);
            handleApproveQuote(row);
          },
          variant: 'secondary' as const,
          roles: ['technician'],
          condition: (row: any) => {
            console.log('Checking approve condition - Status:', row.status, 'User role:', user.role);
            return row.status === 'CREATED'; // Changed from 'PENDING' to 'CREATED'
          }
        },
        {
          label: 'Reject',
          onClick: (row: any) => {
            console.log('User role:', user.role);
            console.log('Quote status:', row.status);
            handleRejectQuote(row);
          },
          variant: 'danger' as const,
          roles: ['technician'],
          condition: (row: any) => {
            console.log('Checking reject condition - Status:', row.status, 'User role:', user.role);
            return row.status === 'CREATED'; // Changed from 'PENDING' to 'CREATED'
          }
        },
        {
          label: 'View Details',
          onClick: (row: Quote) => handleViewDetails(row),
          variant: 'primary' as const,
          roles: ['technician', 'provider']
        }
      ]
    };
  };

  const tableConfig = getTableConfig();

  // Calculate stats from real quotes data
  const pendingCount = quotes.filter(q => q.status === 'CREATED' || q.status === 'PENDING').length;
  const approvedCount = quotes.filter(q => q.status === 'APPROVED').length;
  const rejectedCount = quotes.filter(q => q.status === 'REJECTED').length;
  const totalValue = quotes.reduce((sum, q) => sum + q.totalAmount, 0);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading quotes...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="text-center py-8">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Quotes</h3>
            <p className="text-gray-600">There was an error loading the quotes data. Please try again later.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Pending Devis */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-orange-800">Pending Devis</h3>
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-orange-900 mb-1">
              {pendingCount}
            </div>
            <div className="text-sm text-orange-600">Awaiting review</div>
          </div>

          {/* Approved Devis */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-green-800">Approved Devis</h3>
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-green-900 mb-1">
              {approvedCount}
            </div>
            <div className="text-sm text-green-600">Successfully approved</div>
          </div>

          {/* Rejected Devis */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-red-800">Rejected Devis</h3>
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-red-900 mb-1">
              {rejectedCount}
            </div>
            <div className="text-sm text-red-600">Need revision</div>
          </div>

          {/* Total Value */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-blue-800">Total Value</h3>
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-900 mb-1">
              €{totalValue.toFixed(2)}
            </div>
            <div className="text-sm text-blue-600">Combined total</div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {user.role === 'technician' ? 'All Quotes Management' : 'My Quotes/Devis'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {user.role === 'technician' 
                ? 'Review and manage all quotes from providers'
                : 'Track your submitted quotes and their approval status'
              }
            </p>
          </div>
          
          <div className="p-6">
            <DataTable
              title=""
              columns={tableConfig.columns}
              data={tableConfig.data}
              actions={tableConfig.actions}
              emptyMessage="No quotes found"
            />
          </div>
        </div>

        {/* View Devis Details Modal */}
        <ViewDevisModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          devis={selectedDevis}
        />
      </div>
    </DashboardLayout>
  );
};
