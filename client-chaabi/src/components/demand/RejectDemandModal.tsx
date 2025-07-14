import React, { useState } from 'react';
import type { Demand } from '../../types/demand';

interface RejectDemandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  demand: Demand | null;
  isLoading?: boolean;
}

export const RejectDemandModal: React.FC<RejectDemandModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  demand,
  isLoading = false
}) => {
  const [rejectionReason, setRejectionReason] = useState('');

  // Debug logging

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rejectionReason.trim()) {
      onConfirm(rejectionReason.trim());
      setRejectionReason(''); // Clear form after submission
    }
  };

  const handleClose = () => {
    setRejectionReason(''); // Clear form when closing
    onClose();
  };

  // Early return check with detailed logging
  if (!isOpen) {
    return null;
  }


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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Reject Demand: {demand?.title}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                id="rejectionReason"
                name="rejectionReason"
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please explain why this demand is being rejected..."
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!rejectionReason.trim() || isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Rejecting...' : 'Reject Demand'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
