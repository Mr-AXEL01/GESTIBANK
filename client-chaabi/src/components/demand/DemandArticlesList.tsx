import React from 'react';
import type { Article } from '../../types/demand';

interface DemandArticlesListProps {
  articles: Article[];
}

export const DemandArticlesList: React.FC<DemandArticlesListProps> = ({ articles }) => {
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900">
            Articles ({articles.length})
          </h2>
        </div>
      </div>
      
      {articles.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-500">
          Aucun article trouvé dans cette demande.
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="sm:hidden divide-y divide-gray-200">
            {articles.map((article) => (
              <div key={article.id} className="p-4 space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">{article.name}</h4>
                  <p className="text-sm text-gray-500">{article.description}</p>
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
                    Quantité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix unitaire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{article.name}</div>
                        <div className="text-sm text-gray-500">{article.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{article.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatPrice(article.price)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatPrice(article.quantity * article.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                    Montant total :
                  </td>
                  <td className="px-6 py-4 text-lg font-bold text-orange-600">
                    {formatPrice(getTotalAmount())}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
