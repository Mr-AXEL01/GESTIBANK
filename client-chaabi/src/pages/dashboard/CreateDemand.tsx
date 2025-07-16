import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ThemeProvider } from '../../context/ThemeContext';
import { DemandWizard } from '../../components/forms/DemandWizard';

export const CreateDemand: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Show success message for 3 seconds
    toast.success('Demande créée avec succès !', {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#10B981',
        color: '#FFFFFF',
        fontWeight: '500',
      },
      iconTheme: {
        primary: '#FFFFFF',
        secondary: '#10B981',
      },
    });
    
    // Navigate back to dashboard after showing the message
    setTimeout(() => {
      navigate('/dashboard');
    }, 500); // Small delay to let user see the toast
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
