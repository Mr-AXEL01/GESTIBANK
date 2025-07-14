import React, { useState } from 'react';
import type { Quote } from '../../services/quoteService';

interface AttachFileToQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: Quote | null;
  onSave: (quoteId: number, file: File) => void;
  isLoading?: boolean;
}

export const AttachFileToQuoteModal: React.FC<AttachFileToQuoteModalProps> = ({ 
  isOpen, 
  onClose, 
  quote, 
  onSave, 
  isLoading = false 
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Reset form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedFile(null);
    }
  }, [isOpen]);

  if (!isOpen || !quote) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile && quote.id) {
      onSave(quote.id, selectedFile);
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
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
            {/* Quote Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quote Information</label>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-blue-900">Quote #{quote.id}</p>
                    <p className="text-sm text-blue-700 mt-1">Amount: ${quote.totalAmount.toFixed(2)}</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {quote.status}
                  </span>
                </div>
                
                {quote.demand && (
                  <div className="mt-2 pt-2 border-t border-blue-200">
                    <p className="text-sm text-blue-700">
                      <strong>Demand:</strong> {quote.demand.title}
                    </p>
                  </div>
                )}
                
                {quote.provider && (
                  <div className="mt-1">
                    <p className="text-sm text-blue-700">
                      <strong>Provider:</strong> {quote.provider.firstName} {quote.provider.lastName}
                    </p>
                  </div>
                )}
              </div>
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
                disabled={isLoading || !selectedFile}
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
