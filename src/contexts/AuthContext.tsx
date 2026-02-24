import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import logger from '@/lib/logger';
import AuthService, { AuthUser } from '@/services/AuthService';

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial load
    const initAuth = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        logger.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = AuthService.onAuthStateChange((newUser) => {
      setUser(newUser);
      setIsLoading(false); // Ensure loading is cleared on change
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await AuthService.login({ email, password });
      // State will be updated by onAuthStateChange subscription
      return true;
    } catch (error) {
      logger.error('Login error:', error);
      setIsLoading(false); // Reset loading if error strictly (otherwise subscription might do it)
      return false;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      // State updated by subscription
    } catch (error) {
      logger.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
