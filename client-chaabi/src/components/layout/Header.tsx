import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const { user, logout } = useAuth();

    return (
      <header className="fixed md:ml-65 left-0 right-0 bg-white shadow-sm border-b border-gray-200 ">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-200"
              >
                <svg
                  className={`h-6 w-6 transform transition-transform duration-200 ${
                    sidebarOpen ? "rotate-90" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {sidebarOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
              <h1 className="text-base md:text-xl font-semibold text-gray-900">
                Welcome, {user?.name}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
          
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full capitalize">
                {user?.role}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md text-sm font-medium text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    );
};
