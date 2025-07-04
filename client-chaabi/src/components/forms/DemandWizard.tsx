import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';
import { useCreateDemand } from '../../hooks/useDemands';
import type { Article, CreateDemandRequest } from '../../types/demand';
import { StepIndicator } from './StepIndicator';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { ArticlesStep } from './steps/ArticlesStep';
import { FileUploadStep } from './steps/FileUploadStep';


interface WizardData {
  title: string;
  description: string;
  articles: Omit<Article, 'id'>[];
  file?: File;
}

interface DemandWizardProps {
  onSuccess?: () => void;
  onBack?: () => void;
}

export const DemandWizard: React.FC<DemandWizardProps> = ({ onSuccess, onBack }) => {
  const theme = useTheme();
  const createDemandMutation = useCreateDemand();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<WizardData>({
    title: '',
    description: '',
    articles: [],
    file: undefined,
  });

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 1,
      title: 'Informations de base',
      description: 'Définissez le nom et la description de votre demande',
      completed: completedSteps.includes(1),
    },
    {
      id: 2,
      title: 'Articles et éléments',
      description: 'Ajoutez des articles et spécifiez les quantités',
      completed: completedSteps.includes(2),
    },
    {
      id: 3,
      title: 'Téléchargement de fichier',
      description: 'Configurez les pièces jointes et finalisez',
      completed: completedSteps.includes(3),
    },
  ];

  const updateWizardData = (stepData: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...stepData }));
  };

  const markStepCompleted = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
    }
  };

  const canNavigateToStep = (stepId: number) => {
    if (stepId === 1) return true;
    if (stepId === 2) return completedSteps.includes(1);
    if (stepId === 3) return completedSteps.includes(1) && completedSteps.includes(2);
    return false;
  };

  const handleStepClick = (stepId: number) => {
    if (canNavigateToStep(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitDemand = async () => {
    try {
      const demandData: CreateDemandRequest = {
        title: wizardData.title,
        description: wizardData.description,
        articles: wizardData.articles,
        file: wizardData.file,
      };

      await createDemandMutation.mutateAsync(demandData);
      toast.success('Demande créée avec succès !');
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || 'Échec de la création de la demande');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            data={{ title: wizardData.title, description: wizardData.description }}
            onDataChange={updateWizardData}
            onNext={() => {
              markStepCompleted(1);
              nextStep();
            }}
          />
        );
      case 2:
        return (
          <ArticlesStep
            articles={wizardData.articles}
            onArticlesChange={(articles) => updateWizardData({ articles })}
            onNext={() => {
              markStepCompleted(2);
              nextStep();
            }}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <FileUploadStep
            file={wizardData.file}
            onFileChange={(file) => updateWizardData({ file })}
            onSubmit={submitDemand}
            onPrev={prevStep}
            isSubmitting={createDemandMutation.isPending}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-80 w-full">
          <StepIndicator 
            steps={steps} 
            currentStep={currentStep} 
            onStepClick={handleStepClick}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header with Back Button */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                <button
                  onClick={onBack}
                  className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-4 sm:mb-0"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Retour au tableau de bord
                </button>
                <div className="text-sm text-gray-500">
                  Étape {currentStep} sur {steps.length}
                </div>
              </div>
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {steps.find(step => step.id === currentStep)?.title}
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  {steps.find(step => step.id === currentStep)?.description}
                </p>
              </div>
            </div>

            {/* Error Display */}
            {createDemandMutation.error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-700 text-sm">{createDemandMutation.error.message}</span>
                </div>
              </div>
            )}
            
            {/* Step Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
