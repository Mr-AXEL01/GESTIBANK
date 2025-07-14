import React from 'react';
import type { Quote } from '../../services/quoteService';

interface ViewDevisModalProps {
  isOpen: boolean;
  onClose: () => void;
  devis: Quote | null;
}

export const ViewDevisModal: React.FC<ViewDevisModalProps> = ({ isOpen, onClose, devis }) => {
  if (!isOpen || !devis) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white rounded-t-lg">
          <h2 className="text-xl font-semibold text-gray-900">Devis Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6 bg-white">
          {/* Devis Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Devis Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Devis ID</label>
                  <p className="mt-1 text-sm text-gray-900">#{devis.id}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                  <p className="mt-1 text-lg font-semibold text-green-600">€{devis.totalAmount.toFixed(2)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    devis.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    devis.status === 'CREATED' ? 'bg-yellow-100 text-yellow-800' :
                    devis.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {devis.status}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Created Date</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(devis.createdAt).toLocaleString()}
                  </p>
                </div>

                {devis.updatedAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(devis.updatedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Provider Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Provider Information</h3>
              <div className="space-y-3">
                {devis.provider ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Provider Name</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {devis.provider.firstName} {devis.provider.lastName}
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{devis.provider.email}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">No provider information available</p>
                )}
              </div>
            </div>
          </div>

          {/* Associated Demand Information */}
          {devis.demand && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Associated Demand</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Demand Title</label>
                  <p className="mt-1 text-sm text-gray-900">{devis.demand.title}</p>
                </div>
                
                {devis.demand.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="mt-1 text-sm text-gray-900">{devis.demand.description}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Demand Status</label>
                  <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    devis.demand.status === 'TECHNICIAN_APPROVED' ? 'bg-green-100 text-green-800' :
                    devis.demand.status === 'RESPONSIBLE_APPROVED' ? 'bg-blue-100 text-blue-800' :
                    devis.demand.status === 'CREATED' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {devis.demand.status}
                  </span>
                </div>

                {devis.demand.createdBy && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Requested By</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {devis.demand.createdBy.firstName} {devis.demand.createdBy.lastName} ({devis.demand.createdBy.email})
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end bg-white rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
