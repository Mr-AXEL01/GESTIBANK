import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface NavItem {
    name: string;
    href: string;
    icon: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const location = useLocation();

    const getNavigationItems = (): NavItem[] => {
        const commonItems: NavItem[] = [
            {
                name: 'Dashboard',
                href: '/dashboard',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10" />
                    </svg>
                ),
            },
        ];

        switch (user?.role) {
            case 'responsable':
                return [
                    ...commonItems,
             
                    {
                        name: 'Profile',
                        href: '/dashboard/profile',
                        icon: (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        ),
                    },
                ];
            case 'agent':
            default:
                return [
                    ...commonItems,
           
                    
                    {
                        name: 'Profile',
                        href: '/dashboard/profile',
                        icon: (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        ),
                    },
                ];
        }
    };

    const navigationItems = getNavigationItems();

    const isActivePath = (href: string) => {
        return location.pathname === href;
    };

    return (
        <div className="flex flex-col w-64 bg-gray-900 text-white h-full">
            <div className="flex items-center justify-between h-16 px-6 bg-white">
                <Link to="/dashboard" className="text-xl font-bold text-orange-500">
                    <img src='/public/logo.png' alt='chaabi-bank' ></img>
                </Link>
                <button
                    onClick={onClose}
                    className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 px-6 py-4 overflow-y-auto">
                <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-3">
                    Navigation
                </div>
                <nav className="space-y-1">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => {
                                onClose();
                            }}
                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActivePath(item.href)
                                ? 'bg-orange-600 text-white shadow-lg'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-6 border-t border-gray-700">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div className="ml-3">
                        <div className="text-sm font-medium text-white">{user?.name}</div>
                        <div className="text-xs text-gray-400 capitalize">{user?.role}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
