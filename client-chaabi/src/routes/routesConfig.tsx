import type { RouteObject } from 'react-router-dom';
import { Home } from '../pages/public/Home';
import { Login } from '../pages/auth/Login';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { DevisPage } from '../pages/dashboard/DevisPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { PublicRoute } from '../components/PublicRoute';
import { RoleGuard } from '../components/common/RoleGuard';
import { CreateDemand } from '../pages/dashboard/CreateDemand';
import { DemandDetails } from '../pages/dashboard/DemandDetails';
import { Profile } from '../pages/profile/Profile';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const publicRoutes: RouteObject[] = [
    {
        path: '/',
        element: (
            <PublicRoute>
                <Home />
            </PublicRoute>
        ),
    },
    {
        path: '/login',
        element: (
            <PublicRoute restricted>
                <Login />
            </PublicRoute>
        ),
    },
];

export const protectedRoutes: RouteObject[] = [
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/devis',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['technician', 'provider']}>
                    <DevisPage />
                </RoleGuard>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/demands/create',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['agent', 'responsible']}>
                    <CreateDemand />
                </RoleGuard>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/demands/:id',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['agent', 'responsible']}>
                    <CreateDemand />
                </RoleGuard>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/demands/:id',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['agent', 'responsible']}>
                    <DemandDetails />
                </RoleGuard>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/demands/:id/edit',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['agent']}>
                    <DashboardLayout>
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Demand</h2>
                                <p className="text-gray-600">Edit demand details - Agent Only</p>
                            </div>
                        </div>
                    </DashboardLayout>
                </RoleGuard>
            </ProtectedRoute>
        ),
    },
   
    {
        path: '/dashboard/profile',
        element: (
            <ProtectedRoute>
                <RoleGuard allowedRoles={['agent', 'responsible', 'technician', 'provider', 'manager', 'admin']}>
                    <DashboardLayout>
                        <Profile />
                    </DashboardLayout>
                </RoleGuard>
            </ProtectedRoute>
        ),
    },
];

export const allRoutes: RouteObject[] = [
    ...publicRoutes,
    ...protectedRoutes,
];
