import React from 'react';

export const DemandDetailsSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-50 min-h-full">
        <div className=" mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header skeleton */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
              <div className="flex-1">
                <div className="h-8 bg-gray-200 rounded w-96 mb-3"></div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-64"></div>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-col items-end space-y-2">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="flex space-x-3">
                  <div className="h-10 bg-gray-200 rounded w-20"></div>
                  <div className="h-10 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information skeleton */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="h-5 w-5 bg-gray-200 rounded mr-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-40"></div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-12 bg-gray-100 rounded-lg"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-32 bg-gray-100 rounded-lg"></div>
                  </div>
                </div>
              </div>
              
              {/* Articles skeleton */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="h-5 w-5 bg-gray-200 rounded mr-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
                
                {/* Mobile skeleton */}
                <div className="sm:hidden divide-y divide-gray-200">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 space-y-3">
                      <div>
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop table skeleton */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {[...Array(4)].map((_, i) => (
                          <th key={i} className="px-6 py-3">
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...Array(5)].map((_, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-32"></div>
                              <div className="h-3 bg-gray-200 rounded w-48"></div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-right">
                          <div className="h-4 bg-gray-200 rounded w-24 ml-auto"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-5 bg-gray-200 rounded w-20"></div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar skeleton */}
            <div className="lg:col-span-1 space-y-6">
              {/* File Attachment skeleton */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="h-5 w-5 bg-gray-200 rounded mr-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="h-8 w-8 bg-gray-200 rounded mr-3"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
              </div>

              {/* Additional Information skeleton */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}>
                      <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
