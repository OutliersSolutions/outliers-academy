'use client';

import { createContext, useContext, ReactNode } from 'react';
import { toast } from 'sonner';
import { useAuth as useOriginalAuth } from '@/hooks/useAuth';

interface User {
  uid: number;
  login: string;
  name?: string;
}

interface LoginData {
  email?: string;
  login?: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export function useNewAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useNewAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Use the original auth hook as the source of truth
  const originalAuth = useOriginalAuth();

  const login = async (credentials: LoginData) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: credentials.email || credentials.login,
          password: credentials.password
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.requiresVerification) {
          toast.error('Tu cuenta necesita verificación de email');
        } else {
          toast.error(data.error || 'Error al iniciar sesión');
        }
        throw new Error(data.error || 'Login failed');
      }

      toast.success(`¡Bienvenido ${data.user?.name || data.user?.login || 'Usuario'}!`);
      
      // Force a page reload to ensure all components sync with new auth state
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      toast.success('Sesión cerrada correctamente');
      
      // Force a page reload to ensure all components sync
      setTimeout(() => {
        window.location.reload();
      }, 500);
      
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  // Transform the original auth data to match our interface
  const user: User | null = originalAuth.user ? {
    uid: originalAuth.user.odooUserId || Number(originalAuth.user.id) || 0,
    login: originalAuth.user.email || 'unknown@example.com',
    name: originalAuth.user.name || undefined
  } : null;

  const contextValue: AuthContextType = {
    user,
    loading: originalAuth.isLoading,
    login,
    logout,
    isAuthenticated: originalAuth.isAuthenticated
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

