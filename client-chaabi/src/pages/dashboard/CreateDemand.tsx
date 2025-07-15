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

  const handleBack = () => {
    console.log('Back button clicked, navigating to dashboard');
    try {
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback: try without replace option
      window.location.href = '/dashboard';
    }
  };

  return (
    <DashboardLayout>
      <ThemeProvider>
        <div className="min-h-full">
          <DemandWizard onSuccess={handleSuccess} onBack={handleBack} />
        </div>
      </ThemeProvider>
    </DashboardLayout>
  );
};
