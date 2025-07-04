import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface CreateButtonProps {
  className?: string;
}

export const CreateButton: React.FC<CreateButtonProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const canCreateDemand = user?.role === 'responsable' || user?.role === 'agent';

  if (!canCreateDemand) {
    return null;
  }

  return (
    <button
      onClick={() => navigate('/dashboard/demands/create')}
      className={`bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center space-x-2 ${className}`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      <span>Create Demand</span>
    </button>
  );
};
