import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { AdminStats } from './AdminStats';
import { UserManagement } from './UserManagement';
import { SystemOverview } from './SystemOverview';

export const AdminDashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
      

            <AdminStats />
            <UserManagement />
            <SystemOverview />
        </div>
    );
};
