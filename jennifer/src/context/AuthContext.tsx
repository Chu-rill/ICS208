import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types/auth';
import { getUserByEmail } from '../data/users';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('siwes_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('siwes_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Demo login function - in a real app, this would make an API call
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (password !== 'password123') {
        throw new Error('Invalid credentials');
      }

      const foundUser = getUserByEmail(email);
      if (!foundUser) {
        throw new Error('User not found');
      }

      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('siwes_user', JSON.stringify(foundUser));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('siwes_user');
  };

  const value: AuthState = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};