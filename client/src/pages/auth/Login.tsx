/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const { login, isLoading, isAuthenticated, error: authError, clearError } = useAuth();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page refresh
        setLocalError(''); // Clear local error
        clearError(); // Clear auth context error

        if (!email || !password) {
            setLocalError('Please enter both email and password');
            return;
        }

        try {
            await login(email, password);
            // If successful, navigation will happen automatically due to isAuthenticated change
        } catch (error) {
            // Error is already set in the auth context, but we can also handle it locally
            console.error('Login failed:', error);
            
            if (error instanceof Error) {
                setLocalError(error.message);
            } else {
                setLocalError('Login failed. Please try again.');
            }
        }
    };

    // Use auth context error or local error
    const displayError = authError || localError;

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (displayError) {
            setLocalError('');
            clearError();
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (displayError) {
            setLocalError('');
            clearError();
        }
    };

    // Auto-dismiss errors after 5 seconds
    useEffect(() => {
        if (displayError) {
            const timer = setTimeout(() => {
                setLocalError('');
                clearError();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [displayError, clearError]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Chaabi Bank Login
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                disabled={isLoading}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                disabled={isLoading}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>
                        {displayError && (
                            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md border border-red-200">
                                <div className="flex items-center justify-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {displayError}
                                </div>
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Logging in...
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <div className="text-sm text-gray-600 mb-2">Test Credentials:</div>
                        <div className="space-y-1 text-xs text-gray-500">
                            <div>Responsable: responsable@chaabi.com / password</div>
                            <div>Agent: agent@chaabi.com / password</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

