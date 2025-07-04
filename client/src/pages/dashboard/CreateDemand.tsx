import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ThemeProvider } from '../../context/ThemeContext';
import { DemandWizard } from '../../components/forms/DemandWizard';

export const CreateDemand: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <DashboardLayout>
      <ThemeProvider>
        <div className="min-h-full">
          <DemandWizard onSuccess={handleSuccess} onBack={() => navigate('/dashboard')} />
        </div>
      </ThemeProvider>
    </DashboardLayout>
  );
};
