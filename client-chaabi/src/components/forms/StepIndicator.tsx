import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Step {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  steps, 
  currentStep, 
  onStepClick 
}) => {
  const theme = useTheme();
  const completedSteps = steps.filter(step => step.completed);

  return (
    <div className="w-full lg:w-80 bg-white border-r border-gray-200 lg:h-full">
      {/* Mobile Horizontal Steps */}
      <div className="lg:hidden border-b border-gray-200 p-4">
        <div className="flex items-center justify-between space-x-2">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div 
                className="flex flex-col items-center cursor-pointer flex-1"
                onClick={() => step.completed || step.id <= currentStep ? onStepClick(step.id) : null}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium mb-2 ${
                    step.id === currentStep
                      ? 'bg-orange-600 text-white'
                      : step.completed
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step.completed ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <span className={`text-xs font-medium text-center ${
                  step.id === currentStep ? 'text-orange-700' : step.completed ? 'text-green-700' : 'text-gray-700'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${step.completed ? 'bg-green-600' : 'bg-gray-300'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Desktop Vertical Steps */}
      <div className="hidden lg:block p-6 sticky top-0">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Créer votre demande</h2>
        <p className="text-sm text-gray-600 mb-8">
          Configurez facilement votre demande en seulement trois étapes : Définir les informations de base, ajouter des articles et joindre des fichiers en option.
        </p>
        
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                (step.completed || step.id <= currentStep) ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
              onClick={() => step.completed || step.id <= currentStep ? onStepClick(step.id) : null}
            >
              <div
                className={`flex items-center p-4 rounded-lg border transition-all duration-200 ${
                  step.id === currentStep
                    ? 'bg-orange-50 border-orange-200 shadow-sm'
                    : step.completed
                    ? 'bg-green-50 border-green-200 hover:bg-green-100'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium mr-4 ${
                    step.id === currentStep
                      ? 'bg-orange-600 text-white'
                      : step.completed
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step.completed ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                
                <div className="flex-1">
                  <h3
                    className={`text-sm font-medium ${
                      step.id === currentStep
                        ? 'text-orange-700'
                        : step.completed
                        ? 'text-green-700'
                        : 'text-gray-700'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 ${
                      step.id === currentStep
                        ? 'text-orange-600'
                        : step.completed
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Aperçu du progrès</h4>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Étapes terminées</span>
            <span className="font-medium">{completedSteps.length}/{steps.length}</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
