import React from 'react';
import type { Quote } from '../../services/quoteService';

interface ViewQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: Quote | null;
}

export const ViewQuoteModal: React.FC<ViewQuoteModalProps> = ({
  isOpen,
  onClose,
  quote
}) => {
  if (!isOpen || !quote) return null;

  // Debug: Log quote data to see what we're receiving
  console.log('ViewQuoteModal - Quote data:', quote);
  console.log('ViewQuoteModal - bonCommand:', quote.bonCommand);
  console.log('ViewQuoteModal - attachedFiles:', quote.attachedFiles);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Quote Details</h3>
            <p className="text-sm text-gray-600 mt-1">Quote ID: #{quote.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6">
          {/* Quote Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Quote Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                <p className="mt-1 text-lg font-semibold text-green-600">${quote.totalAmount.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`mt-1 inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                  {quote.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Created At</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(quote.createdAt)}</p>
              </div>
              {quote.updatedAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Updated At</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(quote.updatedAt)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Demand Information */}
          {quote.demand && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Related Demand</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="mt-1 text-sm text-gray-900">{quote.demand.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{quote.demand.description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Requested By</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {quote.demand.createdBy && quote.demand.createdBy.firstName ? 
                      `${quote.demand.createdBy.firstName} ${quote.demand.createdBy.lastName}` : 
                      'Unknown User'
                    }
                    {quote.demand.createdBy && quote.demand.createdBy.email && (
                      <span className="text-gray-500 ml-2">({quote.demand.createdBy.email})</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Provider Information */}
          {quote.provider && (
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Provider Information</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Provider Name</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {quote.provider.firstName && quote.provider.lastName ? 
                      `${quote.provider.firstName} ${quote.provider.lastName}` : 
                      quote.provider.email || 'Unknown Provider'
                    }
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{quote.provider.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Rejection Reason */}
          {quote.rejectionReason && (
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="text-lg font-medium text-red-800 mb-2">Rejection Reason</h4>
              <p className="text-sm text-red-700">{quote.rejectionReason}</p>
            </div>
          )}

          {/* Comments */}
          {quote.comments && quote.comments.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Comments</h4>
              <div className="space-y-3">
                {quote.comments.map((comment) => (
                  <div key={comment.id} className="bg-white rounded p-3 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {comment.createdBy && comment.createdBy.firstName ? 
                            `${comment.createdBy.firstName} ${comment.createdBy.lastName}` : 
                            'Unknown User'
                          }
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          comment.type === 'REJECTION' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {comment.type}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attached Files Section */}
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Attached Files</h4>
            <div className="space-y-3">
              {/* Display bonCommand file if it exists */}
              {quote.bonCommand ? (
                <div className="flex items-center justify-between bg-white p-3 rounded border">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {(() => {
                          const urlParts = quote.bonCommand.split('/');
                          const filename = urlParts[urlParts.length - 1];
                          // Try to extract a meaningful name, fallback to generic name
                          return filename.includes('.') ? filename : `Attachment_${quote.id}.pdf`;
                        })()}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>Attached File • Manager Upload</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href={quote.bonCommand}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </a>
                    <a
                      href={quote.bonCommand}
                      download
                      className="inline-flex items-center px-3 py-1 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download
                    </a>
                  </div>
                </div>
              ) : quote.attachedFiles && quote.attachedFiles.length > 0 ? (
                quote.attachedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-white p-3 rounded border">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.fileName}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>
                            Uploaded {formatDate(file.uploadedAt)}
                          </span>
                          {file.uploadedBy && (
                            <>
                              <span>•</span>
                              <span>
                                {file.uploadedBy.firstName && file.uploadedBy.lastName ? 
                                  `${file.uploadedBy.firstName} ${file.uploadedBy.lastName}` : 
                                  'Unknown User'
                                }
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </a>
                      <a
                        href={file.fileUrl}
                        download={file.fileName}
                        className="inline-flex items-center px-3 py-1 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <svg className="w-12 h-12 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm">No files attached to this quote</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};