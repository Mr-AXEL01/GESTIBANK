import React from 'react';
import type { Quote } from '../../services/quoteService';

interface ReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: Quote | null;
}

export const ReasonModal: React.FC<ReasonModalProps> = ({ isOpen, onClose, quote }) => {
  if (!isOpen || !quote) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Rejection Reason</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quote ID</label>
              <p className="text-gray-900 bg-gray-50 p-2 rounded">{quote.id}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
              <p className="text-gray-900 bg-gray-50 p-2 rounded">${quote.totalAmount.toFixed(2)}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {quote.status}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason</label>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                {(() => {
                  // Get the most recent rejection comment
                  const lastRejectionComment = quote.comments?.filter(c => c.type === 'REJECTED')
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
                  
                  return (
                    <div>
                      <p className="text-red-800">
                        {quote.rejectionReason || lastRejectionComment?.content || 'No specific reason provided by the technician.'}
                      </p>
                      {lastRejectionComment?.createdBy && (
                        <p className="text-sm text-red-600 mt-2">
                          — {lastRejectionComment.createdBy.firstName} {lastRejectionComment.createdBy.lastName}
                        </p>
                      )}
                      {lastRejectionComment?.createdAt && (
                        <p className="text-xs text-red-500 mt-1">
                          {new Date(lastRejectionComment.createdAt).toLocaleDateString()} at {new Date(lastRejectionComment.createdAt).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rejected On</label>
              <p className="text-gray-600 bg-gray-50 p-2 rounded">
                {quote.updatedAt ? new Date(quote.updatedAt).toLocaleDateString() : 'N/A'}
              </p>
            </div> */}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
