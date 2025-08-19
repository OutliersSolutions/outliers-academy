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
      console.log('🔍 AuthProvider: Checking auth status...');
      const response = await fetch('/api/auth/verify', {
        credentials: 'include'
      });
      
      console.log('🔍 AuthProvider: Auth verify response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('🔍 AuthProvider: Auth verify data:', data);
        
        if (data.authenticated && data.user) {
          console.log('✅ AuthProvider: Setting user as authenticated');
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
          console.log('❌ AuthProvider: No authenticated user found, clearing state');
          setUser(null);
        }
      } else {
        console.log('❌ AuthProvider: Auth verify failed, clearing state');
        setUser(null);
      }
    } catch (error) {
      console.error('❌ AuthProvider: Auth check error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginData) => {
    try {
      setLoading(true); // Set loading state during login
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
      
      // Re-check auth status after successful login to ensure sync
      // Don't await this to avoid blocking the UI
      checkAuthStatus();
      
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('🔴 AuthProvider: Starting logout...');
      
      // Clear user state immediately FIRST to update UI
      setUser(null);
      console.log('🔴 AuthProvider: User state cleared');
      
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      console.log('🔴 AuthProvider: Logout API called');
      
      // Clear any localStorage/sessionStorage if used
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
        
        // Manually delete cookies from client side as well
        document.cookie = 'oa_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=; secure=false; samesite=lax;';
        document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=;';
        
        console.log('🔴 AuthProvider: Storage and cookies cleared');
      }
      
      toast.success('Sesión cerrada correctamente');
      
      // Use a small delay to allow React to update the UI before redirect
      setTimeout(() => {
        const currentLocale = window.location.pathname.split('/')[1] || 'es';
        console.log('🔴 AuthProvider: Redirecting to:', `/${currentLocale}`);
        window.location.href = `/${currentLocale}`;
      }, 300);
      
    } catch (error) {
      console.error('🔴 AuthProvider: Logout error:', error);
      toast.error('Error al cerrar sesión');
      // Even if logout API fails, clear user state locally
      setUser(null);
      
      setTimeout(() => {
        const currentLocale = window.location.pathname.split('/')[1] || 'es';
        window.location.href = `/${currentLocale}`;
      }, 300);
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

