import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const basicInfoSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères').max(100, 'Le titre doit contenir moins de 100 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères').max(500, 'La description doit contenir moins de 500 caractères'),
});

type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

interface BasicInfoStepProps {
  data: { title: string; description: string };
  onDataChange: (data: Partial<{ title: string; description: string }>) => void;
  onNext: () => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ 
  data, 
  onDataChange, 
  onNext 
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: data,
  });

  const onSubmit = (formData: BasicInfoFormData) => {
    onDataChange(formData);
    onNext();
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre de la demande *
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Entrez un titre clair et descriptif pour votre demande"
                />
              )}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={4}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Fournissez une description détaillée de ce dont vous avez besoin ainsi que toute exigence ou préférence spécifique"
                />
              )}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4 sm:pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all"
          >
            Suivant
            <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};