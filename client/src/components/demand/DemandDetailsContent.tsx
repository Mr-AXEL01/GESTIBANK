import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useUpdateDemandStatus } from '../../hooks/useDemands';
import { toast } from 'react-hot-toast';
import type { Demand } from '../../types/demand';
import { DemandBasicInfo } from './DemandBasicInfo';
import { DemandArticlesList } from './DemandArticlesList';
import { DemandFileAttachment } from './DemandFileAttachment';
import { DemandStatusBadge } from './DemandStatusBadge';
import { RejectModal } from './RejectModal';

interface DemandDetailsContentProps {
  demand: Demand;
}

export const DemandDetailsContent: React.FC<DemandDetailsContentProps> = ({ demand }) => {
  const theme = useTheme();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  
  // Commented out real API call
  // const updateStatusMutation = useUpdateDemandStatus();

  // Mock update status function
  const handleAccept = async () => {
    try {
      // await updateStatusMutation.mutateAsync({
      //   id: demand.id.toString(),
      //   statusData: { status: 'approved' }
      // });
      
      // Mock success
      toast.success('Demande approuvée avec succès !');
    } catch (error: any) {
      toast.error(error.message || 'Échec de l\'approbation de la demande');
    }
  };

  const handleReject = async (comment: string) => {
    try {
      // await updateStatusMutation.mutateAsync({
      //   id: demand.id.toString(),
      //   statusData: { 
      //     status: 'rejected',
      //     comment 
      //   }
      // });
      
      // Mock success
      toast.success('Demande rejetée avec succès !');
      setIsRejectModalOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Échec du rejet de la demande');
    }
  };

  const canUpdateStatus = demand.status === 'pending';

  return (
    <div className="bg-gray-50 min-h-full">
      <div className=" mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {demand.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <DemandStatusBadge status={demand.status} />
                <div className="text-sm text-gray-500">
                  Créé par {demand.createdBy} • {new Date(demand.createdAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col items-end space-y-2">
              <div className="text-sm text-gray-500">
                ID: #{demand.id}
              </div>
              
              {/* Action Buttons */}
              {canUpdateStatus && (
                <div className="flex space-x-3">
                  <button
                    onClick={handleAccept}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Accepter
                  </button>
                  <button
                    onClick={() => setIsRejectModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Rejeter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <DemandBasicInfo demand={demand} />
            
            {/* Articles */}
            <DemandArticlesList articles={demand.articles} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* File Attachment */}
            <DemandFileAttachment 
              fileName={demand.fileName} 
              fileUrl={demand.fileUrl} 
            />

            {/* Additional Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informations supplémentaires</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Créé le :</span>
                  <p className="text-sm text-gray-900">
                    {new Date(demand.createdAt).toLocaleString('fr-FR')}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Créé par :</span>
                  <p className="text-sm text-gray-900">{demand.createdBy}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Statut :</span>
                  <div className="mt-1">
                    <DemandStatusBadge status={demand.status} />
                  </div>
                </div>
                {demand.rejectionComment && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Raison du rejet :</span>
                    <p className="text-sm text-gray-900 mt-1 p-3 bg-red-50 rounded-lg border border-red-200">
                      {demand.rejectionComment}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleReject}
      />
    </div>
  );
};
