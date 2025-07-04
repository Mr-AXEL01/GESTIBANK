import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '../../../context/ThemeContext';
import type { Article } from '../../../types/demand';

const articleSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(50, "Le nom doit contenir moins de 50 caractères"),
  quantity: z.number().min(1, "La quantité doit être d'au moins 1").max(1000, "La quantité doit être inférieure à 1000"),
  price: z.number().min(0.01, "Le prix doit être supérieur à 0").max(999999, "Le prix doit être inférieur à 999999"),
  description: z.string().min(5, "La description doit contenir au moins 5 caractères").max(200, "La description doit contenir moins de 200 caractères"),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticlesStepProps {
  articles: Omit<Article, 'id'>[];
  onArticlesChange: (articles: Omit<Article, 'id'>[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ArticlesStep: React.FC<ArticlesStepProps> = ({ 
  articles, 
  onArticlesChange, 
  onNext, 
  onPrev 
}) => {
  const theme = useTheme();
  const [isAddingArticle, setIsAddingArticle] = useState(articles.length === 0);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      name: "",
      quantity: 1,
      price: 0,
      description: "",
    },
  });

  const onSubmit = (data: ArticleFormData) => {
    onArticlesChange([...articles, data]);
    reset();
    setIsAddingArticle(false);
  };

  const removeArticle = (index: number) => {
    onArticlesChange(articles.filter((_, i) => i !== index));
  };

  const getTotalAmount = () => {
    return articles.reduce((total, article) => total + (article.quantity * article.price), 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Add Article Section */}
      {isAddingArticle ? (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-xl font-medium text-gray-900">Ajouter un nouvel article</h3>
            <button
              type="button"
              onClick={() => {
                setIsAddingArticle(false);
                reset();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'article *
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Entrez le nom de l'article"
                    />
                  )}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.description ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Description brève"
                    />
                  )}
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantité *
                </label>
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <input
                      {...field}
                      type="number"
                      value={value}
                      onChange={(e) => onChange(parseInt(e.target.value) || 0)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.quantity ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="0"
                      min="1"
                    />
                  )}
                />
                {errors.quantity && (
                  <p className="mt-1 text-xs text-red-600">{errors.quantity.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix unitaire *
                </label>
                <Controller
                  name="price"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <input
                      {...field}
                      type="number"
                      step="0.01"
                      value={value}
                      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.price ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="0.00"
                      min="0.01"
                    />
                  )}
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsAddingArticle(false);
                  reset();
                }}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Ajouter l'article
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center py-6">
          <button
            onClick={() => setIsAddingArticle(true)}
            className="inline-flex items-center px-6 py-3 border-2 border-dashed border-orange-300 text-orange-600 rounded-lg hover:border-orange-400 hover:text-orange-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un article
          </button>
        </div>
      )}

      {/* Articles List */}
      {articles.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Articles ajoutés ({articles.length})
            </h3>
          </div>
          
          {/* Mobile Card View */}
          <div className="sm:hidden divide-y divide-gray-200">
            {articles.map((article, index) => (
              <div key={index} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{article.name}</h4>
                    <p className="text-sm text-gray-500">{article.description}</p>
                  </div>
                  <button
                    onClick={() => removeArticle(index)}
                    className="text-red-600 hover:text-red-900 font-medium text-sm ml-2"
                  >
                    Supprimer
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Qté :</span> {article.quantity}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Prix :</span> {formatPrice(article.price)}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Total :</span> {formatPrice(article.quantity * article.price)}
                  </div>
                </div>
              </div>
            ))}
            <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
              <span className="font-medium text-gray-900">Montant total :</span>
              <span className="text-lg font-bold text-orange-600">{formatPrice(getTotalAmount())}</span>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix unitaire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{article.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{article.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{article.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatPrice(article.price)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatPrice(article.quantity * article.price)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => removeArticle(index)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                    Montant total :
                  </td>
                  <td className="px-6 py-4 text-lg font-bold text-orange-600">
                    {formatPrice(getTotalAmount())}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-0">
        <button
          onClick={onPrev}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Précédent
        </button>
        <button
          onClick={onNext}
          disabled={articles.length === 0}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Suivant
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

