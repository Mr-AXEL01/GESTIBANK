import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { UserManagement } from './UserManagement';

export const AdminDashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            
            <UserManagement />
        </div>
    );
};
