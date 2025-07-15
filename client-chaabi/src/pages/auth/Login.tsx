/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading, isAuthenticated, error: authError, clearError } = useAuth();
    const { colors, gradients } = useTheme();
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
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Background Pattern - Same as Home page */}
            <div className="absolute inset-0">
                <div className="absolute top-20 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{backgroundColor: colors.primaryOpacity20}}></div>
                <div className="absolute top-40 -right-20 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{backgroundColor: colors.primaryOpacity30}}></div>
                <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full opacity-25 blur-3xl" style={{backgroundColor: colors.primaryOpacity20}}></div>
            </div>

            {/* Navigation */}
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-8 bg-white/80 backdrop-blur-sm border-b border-gray-100"
            >
                <div className="flex items-center space-x-3">
                    <Link to="/" className="text-xl font-bold" style={{color: colors.primary}}>
                        <img src='/logo.png' alt='chaabi-bank' className="h-8" />
                    </Link>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-gray-900 font-semibold transition-colors duration-200"
                    >
                        ← Retour à l'accueil
                    </Link>
                </motion.div>
            </motion.nav>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center px-6 lg:px-12 py-16 lg:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 lg:p-10"
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                                style={{background: gradients.primary}}
                            >
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </motion.div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Connexion
                            </h2>
                            <p className="text-gray-600">
                                Accédez à votre espace Chaabi Bank
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Adresse email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="votre@email.com"
                                        value={email}
                                        onChange={handleEmailChange}
                                        disabled={isLoading}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:border-transparent focus:ring-2 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${colors.primaryOpacity30}`}
                                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        disabled={isLoading}
                                        required
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:border-transparent focus:ring-2 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${colors.primaryOpacity30}`}
                                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.465 8.465M9.878 9.878L8.465 8.465m0 0L4.929 4.929m0 0l5.051 5.051M8.465 8.465L4.929 4.929m0 0l5.051 5.051M4.929 4.929L8.465 8.465" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </motion.div>

                            {/* Error Display */}
                            {displayError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-red-50 border border-red-200 rounded-xl p-4"
                                >
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-red-700 text-sm font-medium">{displayError}</span>
                                    </div>
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    style={{background: gradients.primary}}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                            Connexion en cours...
                                        </div>
                                    ) : (
                                        'Se connecter'
                                    )}
                                </motion.button>
                            </motion.div>
                        </form>

                        {/* Test Credentials */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="mt-8 pt-6 border-t border-gray-200"
                        >
                            <div className="text-center">
                                <p className="text-sm text-gray-600 mb-3 font-medium">Comptes de test :</p>
                                <div className="space-y-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Admin:</span>
                                        <span>admin@chaabi.com / 12345678</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

