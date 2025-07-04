import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { FileUpload } from '../FileUpload';

interface FileUploadStepProps {
  file?: File;
  onFileChange: (file?: File) => void;
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

export const FileUploadStep: React.FC<FileUploadStepProps> = ({ 
  file, 
  onFileChange, 
  onSubmit, 
  onPrev, 
  isSubmitting 
}) => {
  const theme = useTheme();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Pièce jointe optionnelle</h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Ajoutez des documents de support pour fournir plus de contexte à votre demande
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <FileUpload 
          onFileSelect={(selectedFile) => onFileChange(selectedFile || undefined)} 
          selectedFile={file || null} 
        />
      </div>

      {!file && (
        <div className="max-w-lg mx-auto text-center p-4 sm:p-6 bg-blue-50 rounded-lg border border-blue-200">
          <svg className="mx-auto h-10 sm:h-12 w-10 sm:w-12 text-blue-400 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Aucune pièce jointe requise
          </h4>
          <p className="text-sm text-blue-700">
            Vous pouvez soumettre votre demande sans aucun fichier. Cette étape est complètement facultative.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-0">
        <button
          onClick={onPrev}
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Précédent
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Création en cours...
            </>
          ) : (
            <>
              Créer la demande
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
