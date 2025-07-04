import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService, AuthError } from '../services/authService';
import type { User } from '../services/authService';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    isAuthenticated: boolean;
    hasRole: (role: string) => boolean;
    error: string | null;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        // Check if user is logged in on app start
        const token = localStorage.getItem('authToken');
        if (token) {
            // Validate token with server
            authService.validateToken(token)
                .then((userData) => {
                    setUser(userData);
                    setError(null); // Clear any previous errors
                })
                .catch((error) => {
                    console.error('Token validation failed:', error);
                    localStorage.removeItem('authToken');
                    
                    // Set error if it's not just an expired token
                    if (error instanceof AuthError && !error.message.includes('expired')) {
                        setError('Session validation failed. Please log in again.');
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null); // Clear any previous errors
        
        try {
            const response = await authService.login({ email, password });
            
            setUser(response.user);
            localStorage.setItem('authToken', response.token);
        } catch (error) {
            console.error('Login failed:', error);
            
            let errorMessage = 'Login failed. Please try again.';
            
            if (error instanceof AuthError) {
                errorMessage = error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            
            setError(errorMessage);
            throw new Error(errorMessage); // Re-throw for the component to handle
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('authToken');
        }
    };

    const hasRole = (role: string) => {
        return user?.role === role;
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user,
        hasRole,
        error,
        clearError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
