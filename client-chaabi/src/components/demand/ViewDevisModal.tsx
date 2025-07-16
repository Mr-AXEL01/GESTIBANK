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
                  <label className="block text-sm font-medium text-gray-700">Prix Total</label>
                  <p className="mt-1 text-lg font-semibold text-green-600">{devis.totalAmount.toFixed(2)} MAD</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className="mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                    {getStatusBadge(devis.status)}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date de création</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(devis.createdAt).toLocaleString()}
                  </p>
                </div>

                {devis.updatedAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dernière mise à jour</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(devis.updatedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Provider Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informations sur le Prestataire</h3>
              <div className="space-y-3">
                {(() => {
                  const providerInfo = devis.provider || devis.createdBy;
                  if (providerInfo) {
                    return (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Nom du Prestataire</label>
                          <p className="mt-1 text-sm text-gray-900">
                            {providerInfo.firstName && providerInfo.lastName 
                              ? `${providerInfo.firstName} ${providerInfo.lastName}`
                              : providerInfo.email || 'Prestataire Inconnu'
                            }
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email</label>
                          <p className="mt-1 text-sm text-gray-900">{providerInfo.email || 'N/A'}</p>
                        </div>
                      </>
                    );
                  } else {
                    return <p className="text-sm text-gray-500">Aucune information sur le prestataire disponible</p>;
                  }
                })()}
              </div>
            </div>
          </div>

          {/* Associated Demand Information */}
          {devis.demand && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Demande Associée</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Demande Titre</label>
                  <p className="mt-1 text-sm text-gray-900">{devis.demand.title}</p>
                </div>
                
                {devis.demand.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="mt-1 text-sm text-gray-900">{devis.demand.description}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Demande Status</label>
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
                    <label className="block text-sm font-medium text-gray-700">Demandé par</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {devis.demand.createdBy.firstName} {devis.demand.createdBy.lastName} ({devis.demand.createdBy.email})
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Attached Files Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">fichiers joints</h4>
            <div className="space-y-3">
              {devis.bonCommand ? (
                <div className="flex items-center justify-between bg-white p-3 rounded border">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        Bon de Commande
                      </p>
                      <p className="text-sm text-gray-500">
                        Joint par le Responsable
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href={devis.bonCommand}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Télécharger
                    </a>
                  </div>
                </div>
              ) : devis.attachedFiles && devis.attachedFiles.length > 0 ? (
                devis.attachedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-white p-3 rounded border">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {file.fileName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Téléchargé le {new Date(file.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Télécharger
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm">no fichiers joints à ce devis</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end bg-white rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

const getStatusBadge = (status: string) => {
    const config = {
  CREATED: { color: 'bg-orange-400 text-white border-yellow-200', label: 'Créée' },
  APPROVED: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Approuvée (Responsable)' },
  REJECTED: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejetée (Responsable)' },
  IN_PROGRESS: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'En cours' },
  DONE: { color: 'bg-green-200 text-green-900 border-green-300', label: 'Terminée' }
};

const statusConfig = config[status as keyof typeof config] || config.CREATED;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
        {statusConfig.label}
      </span>
    );
  };