import React, { useState } from 'react';
import type { Demand } from '../../types/demand';

interface CreateDevisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (totalAmount: number) => void;
  demand: Demand | null;
  isLoading?: boolean;
}

export const CreateDevisModal: React.FC<CreateDevisModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  demand,
  isLoading = false
}) => {
  const [totalAmount, setTotalAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isOpen || !demand) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const amount = parseFloat(totalAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    setError('');
    onConfirm(amount);
  };

  const handleClose = () => {
    setTotalAmount('');
    setError('');
    onClose();
  };

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
          className="rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: 'white' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Create Quote/Devis
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Demand Information */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Demand Details</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Title:</span>
                  <span className="ml-2 text-gray-900">{demand.title}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Description:</span>
                  <p className="ml-2 text-gray-900 mt-1">{demand.description}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {demand.status}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Created:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(demand.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Articles List */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Articles</h3>
              <div className="bg-gray-50 rounded-md overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {demand.articles.map((article, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">{article.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{article.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{article.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quote Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quote Information</h3>
                <div>
                  <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    Total Amount (MAD)
                  </label>
                  <input
                    type="number"
                    id="totalAmount"
                    step="0.01"
                    min="0"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter total amount"
                    disabled={isLoading}
                    required
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Quote'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
