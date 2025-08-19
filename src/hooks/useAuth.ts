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
    console.log('🔍 useAuth hook initializing...');
    // Check for legacy session using API verification
    const checkLegacyAuth = async () => {
      try {
        console.log('🔍 Making fetch to /api/auth/verify...');
        // Always use API to verify authentication - this validates the JWT properly
        const response = await fetch('/api/auth/verify', {
          credentials: 'include'
        });
        
        console.log('🔍 Fetch response status:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('🔍 useAuth - API response:', data);
          if (data.authenticated && data.user) {
            console.log('✅ Setting legacySession to:', data.user);
            setLegacySession(data.user);
          } else {
            console.log('❌ useAuth - API returned not authenticated');
            setLegacySession(null);
          }
        } else {
          console.log('❌ useAuth - API request failed with status:', response.status);
          setLegacySession(null);
        }
      } catch (error) {
        console.log('❌ No legacy session found:', error);
        setLegacySession(null);
      } finally {
        console.log('🔍 Setting isCheckingLegacy to false');
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