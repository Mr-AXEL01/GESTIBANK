import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useUpdateDemand } from '../../hooks/useDemands';
import { useAuth } from '../../contexts/AuthContext';
import type { Demand, Article } from '../../types/demand';

const editDemandSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  articles: z.array(z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Article name is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    description: z.string().min(1, 'Article description is required'),
  })).min(1, 'At least one article is required'),
});

type EditDemandFormData = z.infer<typeof editDemandSchema>;

interface EditDemandDialogProps {
  isOpen: boolean;
  onClose: () => void;
  demand: Demand | null;
}

export const EditDemandDialog: React.FC<EditDemandDialogProps> = ({ 
  isOpen, 
  onClose, 
  demand
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const updateDemand = useUpdateDemand();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<EditDemandFormData>({
    resolver: zodResolver(editDemandSchema),
  });

  // Only allow agents and responsible users to edit demands
  if (user?.role !== 'agent' && user?.role !== 'responsible') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-red-600">
              Access Denied
            </DialogTitle>
            <DialogDescription>
              Only agents and responsible users can edit demands.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-4">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  useEffect(() => {
    if (demand && isOpen) {
      reset({
        title: demand.title,
        description: demand.description,
        articles: demand.articles
      });
      setArticles(demand.articles);
    }
  }, [demand, isOpen, reset]);

  const addArticle = () => {
    const newArticle: Article = {
      id: Date.now(),
      name: '',
      quantity: 1,
      description: ''
    };
    const updatedArticles = [...articles, newArticle];
    setArticles(updatedArticles);
    setValue('articles', updatedArticles);
  };

  const removeArticle = (index: number) => {
    const updatedArticles = articles.filter((_, i) => i !== index);
    setArticles(updatedArticles);
    setValue('articles', updatedArticles);
  };

  const updateArticle = (index: number, field: keyof Article, value: string | number) => {
    const updatedArticles = articles.map((article, i) => 
      i === index ? { ...article, [field]: value } : article
    );
    setArticles(updatedArticles);
    setValue('articles', updatedArticles);
  };

  const onSubmit = async (data: EditDemandFormData) => {
    if (!demand) return;
    
    try {
      const updateData = {
        id: demand.id,
        title: data.title,
        description: data.description,
        articles: data.articles.map(article => ({
          id: article.id || undefined, // Backend expects undefined for new articles
          name: article.name,
          description: article.description,
          quantity: article.quantity
        }))
      };
      
      await updateDemand.mutateAsync(updateData);
      toast.success('Demand updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating demand:', error);
      toast.error('Failed to update demand');
    }
  };

  const handleClose = () => {
    reset();
    setArticles([]);
    onClose();
  };

  if (!demand) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Modifier la demande #{demand.id}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Modifiez les détails de votre demande ci-dessous
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-4">Informations générales</h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre *
                </label>
                <input
                  {...register('title')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Entrez le titre de la demande"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Décrivez votre demande en détail"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Articles */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Articles demandés</h4>
              <Button
                type="button"
                onClick={addArticle}
                variant="outline"
                size="sm"
              >
                + Ajouter un article
              </Button>
            </div>

            <div className="space-y-4">
              {articles.map((article, index) => (
                <div key={article.id || index} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-medium text-gray-900">Article {index + 1}</h5>
                    {articles.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeArticle(index)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Supprimer
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom de l'article *
                      </label>
                      <input
                        value={article.name}
                        onChange={(e) => updateArticle(index, 'name', e.target.value)}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Ex: Papier A4"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantité *
                      </label>
                      <input
                        value={article.quantity}
                        onChange={(e) => updateArticle(index, 'quantity', parseInt(e.target.value) || 0)}
                        type="number"
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="1"
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <input
                        value={article.description}
                        onChange={(e) => updateArticle(index, 'description', e.target.value)}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Description de l'article"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {errors.articles && (
              <p className="mt-2 text-sm text-red-600">{errors.articles.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              disabled={updateDemand.isPending}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || updateDemand.isPending}
              className="bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50"
            >
              {isSubmitting || updateDemand.isPending ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enregistrement...
                </div>
              ) : (
                'Enregistrer les modifications'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
