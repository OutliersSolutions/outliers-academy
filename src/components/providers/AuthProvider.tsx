'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  uid: number;
  login: string;
  name?: string;
  email?: string;
  id?: string | number;
  image?: string | null;
  odooUserId?: number;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated && data.user) {
          setUser({
            uid: data.user.uid,
            login: data.user.login,
            name: data.user.name,
            email: data.user.login, // login is typically the email
            id: data.user.uid,
            image: null,
            odooUserId: data.user.uid
          });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

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

      // Update user state immediately
      if (data.user) {
        setUser({
          uid: data.user.uid,
          login: data.user.login,
          name: data.user.name,
          email: data.user.login, // login is typically the email
          id: data.user.uid,
          image: null,
          odooUserId: data.user.uid
        });
      }

      toast.success(`¡Bienvenido ${data.user?.name || data.user?.login || 'Usuario'}!`);
      
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
      
      // Clear user state immediately
      setUser(null);
      
      // Clear any localStorage/sessionStorage if used
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
      
      toast.success('Sesión cerrada correctamente');
      
      // Redirect to home page
      window.location.href = '/';
      
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

