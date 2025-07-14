import React, { useState } from 'react';
import { DataTable } from '../../common/DataTable';
import { useUsers, useDeleteUser } from '../../../hooks/useUsers';
import type { TableColumn } from '../../common/DataTable';
import type { UserResponseDTO } from '../../../services/userService';

export const UserManagement: React.FC = () => {
  const { data: users = [], isLoading, error } = useUsers();
  const deleteUserMutation = useDeleteUser();
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  console.log('UserManagement render:', { users, isLoading, error });

  const handleDeleteUser = async (user: UserResponseDTO) => {
    if (window.confirm(`Are you sure you want to delete user ${user.firstName} ${user.lastName}?`)) {
      setIsDeleting(user.id);
      try {
        await deleteUserMutation.mutateAsync(user.id);
        console.log('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'technician':
        return 'bg-green-100 text-green-800';
      case 'provider':
        return 'bg-purple-100 text-purple-800';
      case 'responsible':
        return 'bg-yellow-100 text-yellow-800';
      case 'agent':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: TableColumn[] = [
    { 
      key: 'id', 
      header: 'ID',
      render: (value: number) => `#${value}`
    },
    { 
      key: 'firstName', 
      header: 'First Name' 
    },
    { 
      key: 'lastName', 
      header: 'Last Name' 
    },
    { 
      key: 'email', 
      header: 'Email' 
    },
    { 
      key: 'role', 
      header: 'Role',
      render: (value: string) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(value)}`}>
          {value}
        </span>
      )
    },
    { 
      key: 'createdAt', 
      header: 'Created At',
      render: (value: string) => new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Loading users...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-600 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Users</h3>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
            <p className="text-sm text-gray-600 mt-1">View and manage all registered users</p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-blue-700">Total Users: {users.length}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <DataTable
          title=""
          columns={columns}
          data={users}
          actions={[
            {
              label: (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>{isDeleting ? 'Deleting...' : 'Remove'}</span>
                </div>
              ),
              onClick: (row: UserResponseDTO) => handleDeleteUser(row),
              variant: 'danger' as const,
              roles: ['admin'],
              condition: (row: UserResponseDTO) => row.role.toUpperCase() !== 'ADMIN' && isDeleting !== row.id
            }
          ]}
          emptyMessage="No users found"
        />
      </div>
    </div>
  );
};