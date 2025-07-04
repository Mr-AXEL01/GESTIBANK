import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

import { useCreateDemand } from '../../hooks/useDemands';
import type { Article } from '../../types/demand';
import { ArticleTable } from './ArticleTable';
import { FileUpload } from './FileUpload';

const demandSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
});

type DemandFormData = z.infer<typeof demandSchema>;

interface DemandFormProps {
  onSuccess?: () => void;
}

export const DemandForm: React.FC<DemandFormProps> = ({ onSuccess }) => {
  const createDemandMutation = useCreateDemand();
  const [articles, setArticles] = React.useState<Omit<Article, 'id'>[]>([]);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DemandFormData>({
    resolver: zodResolver(demandSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: DemandFormData) => {
    if (articles.length === 0) {
      toast.error('Please add at least one article');
      return;
    }

    try {
      await createDemandMutation.mutateAsync({
        ...data,
        articles,
        file: uploadedFile || undefined,
      });

      toast.success('Demand created successfully!');
      reset();
      setArticles([]);
      setUploadedFile(null);
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create demand');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {createDemandMutation.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {createDemandMutation.error.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Demand Title *
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter demand title"
              />
            )}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
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
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter demand description"
              />
            )}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Articles</h3>
        <ArticleTable articles={articles} setArticles={setArticles} />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Attachment</h3>
        <FileUpload onFileSelect={setUploadedFile} selectedFile={uploadedFile} />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => {
            reset();
            setArticles([]);
            setUploadedFile(null);
          }}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={createDemandMutation.isPending}
          className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createDemandMutation.isPending ? 'Creating...' : 'Create Demand'}
        </button>
      </div>
    </form>
  );
};
