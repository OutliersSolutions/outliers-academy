import { useEffect, useState } from "react";

interface LegacySession {
  uid: number;
  login: string;
  name?: string;
  issuedAt: number;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    id: string | number;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    odooUserId?: number;
  } | null;
}

export function useAuth(): AuthState {
  const [legacySession, setLegacySession] = useState<LegacySession | null>(null);
  const [isCheckingLegacy, setIsCheckingLegacy] = useState(true);

  useEffect(() => {
    // Check for legacy session
    const checkLegacyAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated && data.user) {
            setLegacySession(data.user);
          }
        }
      } catch (error) {
        console.log('No legacy session found');
      } finally {
        setIsCheckingLegacy(false);
      }
    };

      checkLegacyAuth();
  }, []);

  // If legacy session exists, use it
  if (legacySession) {
    return {
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: legacySession.uid,
        name: legacySession.name,
        email: legacySession.login,
        image: null,
        odooUserId: legacySession.uid,
      }
    };
  }

  // Loading state
  if (isCheckingLegacy) {
    return {
      isAuthenticated: false,
      isLoading: true,
      user: null
    };
  }

  // Not authenticated
  return {
    isAuthenticated: false,
    isLoading: false,
    user: null
  };
}