import { jwtDecode } from 'jwt-decode';

// Spring Boot API configuration
const API_BASE_URL = "http://localhost:8080/api/v1";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface BackendErrorResponse {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
    // Alternative format that your backend is using
    statusCode?: number;
    description?: string;
    errors?: string;
}

export interface JWTPayload {
    id: string;
    email: string;
    name: string;
    role: 'agent' | 'responsible' | 'technician' | 'provider' | 'manager';
    iat?: number;
    exp?: number;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'agent' | 'responsible' | 'technician' | 'provider' | 'manager';
}

export class AuthError extends Error {
    public status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = 'AuthError';
        this.status = status;
    }
}

class AuthService {
    private getAuthHeaders(): Record<string, string> {
        const token = localStorage.getItem('authToken');
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    private decodeToken(token: string): User {
        try {
            const decoded = jwtDecode<JWTPayload>(token);
            return {
                id: decoded.id,
                email: decoded.email,
                name: decoded.name,
                role: decoded.role?.toLocaleLowerCase() as any
            };
        } catch (error) {
            throw new AuthError('Invalid token format');
        }
    }

    private isTokenExpired(token: string): boolean {
        try {
            const decoded = jwtDecode<JWTPayload>(token);
            if (!decoded.exp) return false;
            
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            return true;
        }
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;
        
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Add common headers for Spring Boot
                'Cache-Control': 'no-cache',
                ...options.headers,
            },
            // Remove credentials: 'include' to avoid CORS issues with credentials
            ...options,
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({})) as Partial<BackendErrorResponse>;
                
                console.log('Backend error response:', errorData); // Debug log
                
                // Handle specific backend error format
                let errorMessage = `HTTP error! status: ${response.status}`;
                
                // Get the actual message from various possible fields
                const backendMessage = errorData.message || errorData.errors || errorData.error;
                
                if (backendMessage) {
                    // Handle Spring Boot Security exceptions
                    if (backendMessage === 'BadCredentialsException' || 
                        backendMessage === 'Bad credentials' ||
                        backendMessage.includes('Bad credentials')) {
                        errorMessage = 'Invalid email or password';
                    } else if (backendMessage.includes('UserNotFoundException') || 
                               backendMessage.includes('User not found')) {
                        errorMessage = 'User not found. Please check your email address';
                    } else if (backendMessage.includes('AccountExpiredException') ||
                               backendMessage.includes('Account expired')) {
                        errorMessage = 'Account has expired. Please contact support';
                    } else if (backendMessage.includes('CredentialsExpiredException') ||
                               backendMessage.includes('Credentials expired')) {
                        errorMessage = 'Password has expired. Please reset your password';
                    } else if (backendMessage.includes('AccountLockedException') || 
                               backendMessage.includes('Account locked')) {
                        errorMessage = 'Account is locked. Please contact support';
                    } else if (backendMessage.includes('DisabledException') ||
                               backendMessage.includes('Account disabled')) {
                        errorMessage = 'Account is disabled. Please contact support';
                    } else if (backendMessage.includes('InternalAuthenticationServiceException')) {
                        errorMessage = 'Authentication service error. Please try again later';
                    } else if (response.status === 401) {
                        errorMessage = 'Invalid email or password';
                    } else if (response.status === 403) {
                        errorMessage = 'Access denied. Insufficient permissions';
                    } else if (response.status === 404) {
                        errorMessage = 'Service not found. Please contact support';
                    } else if (response.status >= 500) {
                        errorMessage = 'Server error. Please try again later';
                    } else {
                        // Use the backend message directly if we don't have a specific handler
                        errorMessage = backendMessage;
                    }
                }
                
                throw new AuthError(errorMessage, response.status);
            }

            return await response.json();
        } catch (error) {
            if (error instanceof AuthError) {
                throw error;
            }
            
            // Handle network errors
            if (error instanceof TypeError) {
                if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
                    // This is likely a CORS error when the error message is generic
                    throw new AuthError('CORS error: Unable to connect to server. Please ensure the backend server is running and CORS is properly configured.');
                } else if (error.message.includes('NetworkError')) {
                    throw new AuthError('Network error occurred. Please try again');
                }
            }
            
            // Handle CORS errors (common with Spring Boot during development)
            if (error instanceof Error && (error.message.includes('CORS') || error.message.includes('cross-origin'))) {
                throw new AuthError('CORS error: Cross-origin request blocked. Please check server CORS configuration');
            }
            
            throw new AuthError(
                error instanceof Error ? error.message : 'Network error occurred'
            );
        }
    }

    async login(credentials: LoginRequest): Promise<{ token: string; user: User }> {
        try {
            const response = await this.request<LoginResponse>('/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
            });
            
            console.log('Login response:', response);
            
            if (!response.token) {
                throw new AuthError('No token received from server');
            }
            
            const user = this.decodeToken(response.token);
            
            return {
                token: response.token,
                user
            };
        } catch (error) {
            console.error('Login error:', error);
            
            // Handle JWT decode errors specifically
            if (error instanceof Error && error.message.includes('Invalid token format')) {
                throw new AuthError('Authentication failed. Please try again');
            }
            
            // Re-throw AuthErrors (including those from request method)
            if (error instanceof AuthError) {
                throw error;
            }
            
            // Generic fallback for unexpected errors
            throw new AuthError('Login failed. Please try again');
        }
    }

    async validateToken(token: string): Promise<User> {
        // Check if token is expired before making request
        if (this.isTokenExpired(token)) {
            throw new AuthError('Token has expired');
        }

        // Decode token locally since we have the security key
        return this.decodeToken(token);
    }

    async logout(): Promise<void> {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                await this.request('/auth/logout', {
                    method: 'POST',
                    headers: this.getAuthHeaders(),
                });
            } catch (error) {
                // If logout fails on server, we still want to clear local storage
                console.warn('Server logout failed:', error);
            }
        }
    }

    // Public method for other services to make authenticated requests
    async authenticatedRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            headers: {
                ...this.getAuthHeaders(),
                ...options.headers,
            },
        });
    }
}

export const authService = new AuthService();

// Helper function for other services to make authenticated API calls
export const authenticatedFetch = <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    return authService.authenticatedRequest<T>(endpoint, options);
};
