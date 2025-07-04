import React from 'react';
import type { Demand } from '../../types/demand';

interface DemandBasicInfoProps {
  demand: Demand;
}

export const DemandBasicInfo: React.FC<DemandBasicInfoProps> = ({ demand }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-900">Informations de base</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre
          </label>
          <p className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg">
            {demand.title}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <div className="text-base text-gray-900 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
            {demand.description}
          </div>
        </div>
      </div>
    </div>
  );
};
