import React, { useState } from 'react';
import type { Quote } from '../../services/quoteService';

interface EditQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: Quote | null;
  onSave: (quoteId: number, totalAmount: number) => void;
  isLoading?: boolean;
}

export const EditQuoteModal: React.FC<EditQuoteModalProps> = ({ 
  isOpen, 
  onClose, 
  quote, 
  onSave, 
  isLoading = false 
}) => {
  const [totalAmount, setTotalAmount] = useState(quote?.totalAmount || 0);

  // Update local state when quote changes
  React.useEffect(() => {
    if (quote) {
      setTotalAmount(quote.totalAmount);
    }
  }, [quote]);

  if (!isOpen || !quote) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalAmount > 0) {
      onSave(quote.id, totalAmount);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Edit Rejected Quote</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quote ID</label>
              <p className="text-gray-900 bg-gray-50 p-2 rounded">{quote.id}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {quote.status}
              </span>
            </div>

            {quote.demand && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Demand</label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded">{quote.demand.title}</p>
              </div>
            )}

            <div>
              <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Total Amount *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  id="totalAmount"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex">
                <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> This quote was rejected by the technician. By editing and resubmitting, 
                    it will be sent back for review.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={isLoading || totalAmount <= 0}
              >
                {isLoading ? 'Saving...' : 'Update Quote'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
