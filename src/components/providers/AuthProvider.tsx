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
  console.log('🏗️ AuthProvider: Component rendering...');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  console.log('🏗️ AuthProvider: State initialized, loading =', loading, 'user =', user);

  // Simple initialization on mount
  useEffect(() => {
    console.log('🚀 AuthProvider: useEffect triggered - checking auth status...');
    checkAuthStatus();
  }, []);


  const checkAuthStatus = async () => {
    try {
      console.log('🔍 AuthProvider: Checking auth status...');
      console.log('🔍 AuthProvider: Current cookies:', document.cookie);
      console.log('🔍 AuthProvider: Making request to /api/auth/verify');
      
      const response = await fetch('/api/auth/verify', {
        credentials: 'include',
        cache: 'no-cache' // Force fresh request
      });
      
      console.log('🔍 AuthProvider: Auth verify response status:', response.status);
      console.log('🔍 AuthProvider: Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const data = await response.json();
        console.log('🔍 AuthProvider: Auth verify data:', JSON.stringify(data, null, 2));
        console.log('🔍 AuthProvider: data.authenticated =', data.authenticated);
        console.log('🔍 AuthProvider: data.user =', data.user);
        console.log('🔍 AuthProvider: Condition check result:', data.authenticated && data.user);
        
        if (data.authenticated && data.user) {
          console.log('✅ AuthProvider: User authenticated, updating state');
          const userData = {
            uid: data.user.uid,
            login: data.user.login,
            name: data.user.name,
            email: data.user.login, // login is typically the email
            id: data.user.uid,
            image: null,
            odooUserId: data.user.uid
          };
          setUser(userData);
          console.log('✅ AuthProvider: User state set to:', userData);
        } else {
          console.log('❌ AuthProvider: No authenticated user, clearing state');
          setUser(null);
        }
      } else {
        console.log('❌ AuthProvider: Auth verify failed with status:', response.status);
        setUser(null);
      }
    } catch (error) {
      console.error('❌ AuthProvider: Auth check error:', error);
      console.error('❌ AuthProvider: Error details:', {
        message: error.message,
        stack: error.stack
      });
      setUser(null);
    } finally {
      console.log('🔍 AuthProvider: Setting loading to false');
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
      
      // Call logout API
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      console.log('🔴 AuthProvider: Logout API called, reloading page...');
      
      // Simple approach: just reload the page completely
      // This will force a fresh AuthProvider initialization
      const currentLocale = window.location.pathname.split('/')[1] || 'es';
      window.location.href = `/${currentLocale}`;
      
    } catch (error) {
      console.error('🔴 AuthProvider: Logout error:', error);
      // Even if logout API fails, still redirect
      const currentLocale = window.location.pathname.split('/')[1] || 'es';
      window.location.href = `/${currentLocale}`;
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

