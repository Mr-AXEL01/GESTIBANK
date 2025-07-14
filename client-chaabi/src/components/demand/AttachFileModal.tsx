import React, { useState } from 'react';
import type { Demand } from '../../types/demand';

interface AttachFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  demand: Demand | null;
  onSave: (quoteId: number, file: File) => void;
  isLoading?: boolean;
}

export const AttachFileModal: React.FC<AttachFileModalProps> = ({ 
  isOpen, 
  onClose, 
  demand, 
  onSave, 
  isLoading = false 
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quoteId, setQuoteId] = useState<number>(0);

  // Reset form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedFile(null);
      setQuoteId(0);
    }
  }, [isOpen]);

  if (!isOpen || !demand) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile && quoteId > 0) {
      onSave(quoteId, selectedFile);
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-[9999]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Attach File to Quote</h2>
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
            {/* Demand Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Demand</label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-gray-900">{demand.title}</p>
                <p className="text-sm text-gray-600 mt-1">{demand.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Status: <span className="font-medium">{demand.status}</span>
                </p>
              </div>
            </div>

            {/* Quote ID Input */}
            <div>
              <label htmlFor="quoteId" className="block text-sm font-medium text-gray-700 mb-1">
                Quote ID *
              </label>
              <input
                type="number"
                id="quoteId"
                value={quoteId || ''}
                onChange={(e) => setQuoteId(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Quote ID"
                min="1"
                required
                disabled={isLoading}
              />
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="attachedFile" className="block text-sm font-medium text-gray-700 mb-1">
                Attached File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  id="attachedFile"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  required
                  disabled={isLoading}
                />
                <label 
                  htmlFor="attachedFile" 
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  {selectedFile ? (
                    <div className="text-sm">
                      <p className="text-gray-900 font-medium">{selectedFile.name}</p>
                      <p className="text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      <p>Click to upload or drag and drop</p>
                      <p>PDF, DOC, TXT, Images (max 10MB)</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Action Buttons */}
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
                disabled={isLoading || !selectedFile || quoteId <= 0}
              >
                {isLoading ? 'Uploading...' : 'Attach File'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
