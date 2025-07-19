import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useDemands } from '../../hooks/useDemands';
import { useQuotes } from '../../hooks/useQuotes';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const { user, logout } = useAuth();
    const { data: demands = [] } = useDemands();
    const { data: quotes = [] } = useQuotes();
    const [showNotifications, setShowNotifications] = useState(false);

    // Close notifications when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (showNotifications && !target.closest('.notification-dropdown')) {
                setShowNotifications(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications]);

    const getRoleFrenchName = (role?: string) => {
        switch (role?.toLowerCase()) {
            case 'agent':
                return 'Agent';
            case 'responsible':
                return 'Responsable';
            case 'admin':
                return 'Admin';
            case 'technician':
                return 'Technicien';
            case 'provider':
                return 'Prestataire';
            case 'manager':
                return 'Gestionnaire';
            default:
                return role;
        }
    };

    // Get notifications based on user role
    const getNotifications = () => {
        const notifications: { id: string; message: string; time: string; type: 'demand' | 'quote' }[] = [];
        
        switch (user?.role) {
            case 'responsible':
                // Notif about new demands created by agents
                const newDemands = demands.filter(demand => 
                    demand.status === 'CREATED'
                );
                newDemands.forEach(demand => {
                    const creatorName = typeof demand.createdBy === 'object' && demand.createdBy
                        ? `${(demand.createdBy as any).firstName || ''} ${(demand.createdBy as any).lastName || ''}`.trim()
                        : 'Agent';
                    notifications.push({
                        id: `demand-${demand.id}`,
                        message: `Nouvelle demande "${demand.title}" créée par ${creatorName}`,
                        time: new Date(demand.createdAt).toLocaleString(),
                        type: 'demand'
                    });
                });
                break;

            case 'technician':
                // Notif about demands validated by responsible
                const responsibleApprovedDemands = demands.filter(demand => 
                    demand.status === 'RESPONSIBLE_APPROVED'
                );
                responsibleApprovedDemands.forEach(demand => {
                    notifications.push({
                        id: `demand-${demand.id}`,
                        message: `Demande "${demand.title}" validée par le responsable`,
                        time: new Date(demand.createdAt).toLocaleString(),
                        type: 'demand'
                    });
                });
                break;

            case 'provider':
                // Notif about demands validated by technician
                const technicianApprovedDemands = demands.filter(demand => 
                    demand.status === 'TECHNICIAN_APPROVED'
                );
                technicianApprovedDemands.forEach(demand => {
                    notifications.push({
                        id: `demand-${demand.id}`,
                        message: `Demande "${demand.title}" validée par le technicien`,
                        time: new Date(demand.createdAt).toLocaleString(),
                        type: 'demand'
                    });
                });

                // Notif about quotes with attached files by manager
                const quotesWithFiles = quotes.filter(quote => 
                    quote.attachedFiles && quote.attachedFiles.length > 0
                );
                quotesWithFiles.forEach(quote => {
                    notifications.push({
                        id: `quote-${quote.id}`,
                        message: `Fichier attaché au devis #${quote.id} par le gestionnaire`,
                        time: new Date(quote.createdAt).toLocaleString(),
                        type: 'quote'
                    });
                });
                break;

            case 'manager':
                // Notif about new quotes created by provider
                const newQuotes = quotes.filter(quote => 
                    quote.status === 'CREATED' || quote.status === 'APPROVED'
                );
                newQuotes.forEach(quote => {
                    const providerName = quote.createdBy && typeof quote.createdBy === 'object' 
                        ? `${(quote.createdBy as any).firstName || ''} ${(quote.createdBy as any).lastName || ''}`.trim()
                        : 'Prestataire';
                    notifications.push({
                        id: `quote-${quote.id}`,
                        message: `Nouveau devis #${quote.id} créé par ${providerName}`,
                        time: new Date(quote.createdAt).toLocaleString(),
                        type: 'quote'
                    });
                });
                break;
        }

        return notifications.slice(0, 5); // Limit to 5 most recent notifications
    };

    const notifications = getNotifications();
    const notificationCount = notifications.length;

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
                Bienvenue, {user?.name}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    {notifications.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                          <div key={notification.id} className="p-3 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                notification.type === 'demand' ? 'bg-blue-500' : 'bg-green-500'
                              }`}></div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 font-medium">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <p className="text-sm text-gray-500">Aucune notification</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full capitalize">
                {getRoleFrenchName(user?.role)}
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


 const getRoleFrenchName = (role?: string) => {
    switch (role?.toLowerCase()) {
      case 'agent':
        return 'Agent';
      case 'responsible':
        return 'Responsable';
      case 'admin':
        return 'Admin';
      case 'technician':
        return 'Technicien';
      case 'provider':
        return 'Prestataire';
      case 'manager':
        return 'Gestionnaire';
      default:
        return role;
    }
  };