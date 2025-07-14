import React from 'react';
import type { Demand } from '../../types/demand';

interface RejectionReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  demand: Demand | null;
}

export const RejectionReasonModal: React.FC<RejectionReasonModalProps> = ({
  isOpen,
  onClose,
  demand
}) => {
  if (!isOpen || !demand) return null;

  const rejectionType = demand.status === 'RESPONSIBLE_REJECTED' ? 'Responsible' : 'Technician';

  // Try to get the rejection reason from various possible fields
  const rejectionReason = 
    // First try the specific rejection comment field
    demand.rejectionComment ||
    // Check if there's a comments array and get the latest rejection comment
    (demand as any).comments?.filter((c: any) => c.type === 'REJECTED')?.slice(-1)?.[0]?.content ||
    // Check if there's a comments array and get the latest comment
    (demand as any).comments?.slice(-1)?.[0]?.content ||
    // Try the comment field directly
    (demand as any).comment?.content ||
    // Try other possible field names
    (demand as any).lastComment ||
    (demand as any).rejectionReason ||
    // Try to get the latest comment from any comment-related field
    (demand as any).latestComment?.content ||
    // Check for technician or responsible specific comment fields
    (demand as any).technicianComment ||
    (demand as any).responsibleComment ||
    null;

  // Debug: Log the demand object to see what data is available
  console.log('Demand object in RejectionReasonModal:', demand);
  console.log('Available fields:', Object.keys(demand));
  console.log('Found rejection reason:', rejectionReason);

  return (
    <div 
      className="fixed inset-0 z-[9999] overflow-y-auto"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)' 
      }}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="rounded-lg shadow-xl max-w-md w-full p-6"
          style={{ backgroundColor: 'white' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Rejection Reason
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Demand:</strong> {demand.title}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Rejected by:</strong> {rejectionType}
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <h3 className="text-sm font-medium text-red-800 mb-2">Reason:</h3>
              <p className="text-sm text-red-700">
                {rejectionReason || 'The rejection reason is not available. This is likely a backend issue where rejection comments are not being stored or returned properly.'}
              </p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
