import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DashboardOverview } from '../../components/dashboard/DashboardOverview';

export const Dashboard: React.FC = () => {
    return (
        <DashboardLayout>
            <DashboardOverview />
        </DashboardLayout>
    );}

