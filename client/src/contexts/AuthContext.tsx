import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
    role: 'agent' | 'responsable';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
    hasRole: (role: string) => boolean;
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

    useEffect(() => {
        // Check if user is logged in on app start
        const token = localStorage.getItem('authToken');
        if (token) {
            // Simulate token validation
            setTimeout(() => {
                setUser({
                    id: '1',
                    email: 'user@example.com',
                    name: 'John Doe',
                    role: 'agent'
                });
                setIsLoading(false);
            }, 1000);
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // here i added simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            let userData: User;
            if (email === 'responsable@chaabi.com' && password === 'password') {
                userData = {
                    id: '1',
                    email,
                    name: 'Responsable User',
                    role: 'responsable'
                };
            } else if (email === 'agent@chaabi.com' && password === 'password') {
                userData = {
                    id: '2',
                    email,
                    name: 'Agent User',
                    role: 'agent'
                };
            } else {
                throw new Error('Invalid credentials');
            }
            
            setUser(userData);
            localStorage.setItem('authToken', 'mock-token-123');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
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
        hasRole
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
