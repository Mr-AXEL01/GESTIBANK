import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import type { Demand } from '../../types/demand';

interface ViewDemandDialogProps {
  isOpen: boolean;
  onClose: () => void;
  demand: Demand | null;
}

export const ViewDemandDialog: React.FC<ViewDemandDialogProps> = ({ 
  isOpen, 
  onClose, 
  demand 
}) => {
  console.log('ViewDemandDialog rendered with:', { isOpen, demand });
  
  if (!demand) {
    console.log('No demand data provided');
    return null;
  }

  const getCreatedByName = (createdBy: any) => {
    try {
      if (typeof createdBy === 'string') {
        return createdBy;
      }
      if (typeof createdBy === 'object' && createdBy !== null) {
        return `${createdBy.firstName || ''} ${createdBy.lastName || ''}`.trim() || createdBy.email || 'Unknown';
      }
      return 'N/A';
    } catch (error) {
      console.error('Error processing createdBy:', error);
      return 'N/A';
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'N/A' : date.toLocaleString('fr-FR');
    } catch (error) {
      return 'N/A';
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { color: 'bg-orange-400 text-white border-yellow-200', label: 'En attente' },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Approuvée' },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejetée' }
    };
    const statusConfig = config[status as keyof typeof config] || config.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
        {statusConfig.label}
      </span>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Détails de la demande
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                ID: {demand.id}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-4">Informations générales</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <p className="text-sm text-gray-900 p-3 bg-white rounded border">{demand.title || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <div className="p-3 bg-white rounded border">
                  {getStatusBadge(demand.status)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Créé par</label>
                <p className="text-sm text-gray-900 p-3 bg-white rounded border">{getCreatedByName(demand.createdBy)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de création</label>
                <p className="text-sm text-gray-900 p-3 bg-white rounded border">{formatDateTime(demand.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Description</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">{demand.description || 'Aucune description disponible'}</p>
            </div>
          </div>

          {/* Articles */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Articles demandés</h4>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {demand.articles && demand.articles.length > 0 ? (
                <div>
                  {/* Desktop Table View */}
                  <div className="hidden sm:block">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Article
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantité
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {demand.articles.map((article, index) => (
                          <tr key={article.id || index} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">{article.name || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-500">{article.description || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{article.quantity || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="sm:hidden divide-y divide-gray-200">
                    {demand.articles.map((article, index) => (
                      <div key={article.id || index} className="p-4 space-y-3">
                        <div>
                          <h5 className="font-medium text-gray-900">{article.name || 'N/A'}</h5>
                          <p className="text-sm text-gray-500">{article.description || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Quantité: </span>
                          <span className="text-sm text-gray-900">{article.quantity || 0}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                    <span className="font-medium text-gray-900">Total d'articles :</span>
                    <span className="text-lg font-bold text-orange-600">
                      {demand.articles.reduce((total, article) => total + article.quantity, 0)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  Aucun article dans cette demande
                </div>
              )}
            </div>
          </div>

          {/* Attached File */}
          {demand.fileName && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Fichier joint</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{demand.fileName}</p>
                  </div>
                  {demand.fileUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(demand.fileUrl, '_blank')}
                      className="flex-shrink-0"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Télécharger
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Rejection Comment */}
          {demand.status === 'rejected' && demand.rejectionComment && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Commentaire de rejet</h4>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800 whitespace-pre-wrap leading-relaxed">{demand.rejectionComment}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
