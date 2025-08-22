'use client';
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { CookieBanner } from './CookieBanner';
import { CookiePreferences } from './CookiePreferences';
interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp?: string;
}
interface CookieContextType {
  consent: CookieConsent | null;
  showPreferences: () => void;
  updateConsent: (newConsent: CookieConsent) => void;
  hasConsent: (type: keyof CookieConsent) => boolean;
}
const CookieContext = createContext<CookieContextType | undefined>(undefined);
export function useCookies() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
}
interface CookieProviderProps {
  children: React.ReactNode;
}
export function CookieProvider({ children }: CookieProviderProps) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const initializeAnalytics = useCallback(() => {
    // Google Analytics 4 initialization
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => {
        window.gtag = window.gtag || function() {
          (window.gtag as any).q = (window.gtag as any).q || [];
          (window.gtag as any).q.push(arguments);
        };
        // @ts-expect-error: 'js' is a valid GA4 command but not in the type definition
        window.gtag('js', new Date());
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
          cookie_flags: 'SameSite=None;Secure',
          anonymize_ip: true,
          allow_google_signals: false, // Will be updated via consent
          allow_ad_personalization_signals: false // Will be updated via consent
        });
        // Set initial consent state as denied, will be updated later
        window.gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          functionality_storage: 'denied',
          personalization_storage: 'denied'
        });
      };
    }
    // Google Tag Manager initialization
    if (process.env.NEXT_PUBLIC_GTM_ID && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
      `;
      document.head.appendChild(script);
      // Add noscript fallback
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(noscript);
    }
  }, []); // Remove consent dependency

  useEffect(() => {
    setIsClient(true);
    // Load saved consent
    const savedConsent = localStorage.getItem('cookie-consent');
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
      } catch (error) {
        console.error('Error parsing saved consent:', error);
      }
    }
  }, []); // Remove initializeAnalytics from dependencies

  // Separate effect for initializing analytics when consent changes
  useEffect(() => {
    if (consent?.analytics && typeof window !== 'undefined') {
      initializeAnalytics();
    }
  }, [consent?.analytics, initializeAnalytics]); // Include both dependencies

  // Separate effect for updating Google Analytics consent when consent changes
  useEffect(() => {
    if (consent && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
        functionality_storage: consent.preferences ? 'granted' : 'denied',
        personalization_storage: consent.preferences ? 'granted' : 'denied'
      });
    }
  }, [consent]); // Update consent when any part of consent changes

  const updateConsent = (newConsent: CookieConsent) => {
    const consentWithTimestamp = {
      ...newConsent,
      timestamp: new Date().toISOString()
    };
    setConsent(consentWithTimestamp);
    localStorage.setItem('cookie-consent', JSON.stringify(consentWithTimestamp));
    // Initialize or update analytics based on new consent
    if (newConsent.analytics && !consent?.analytics) {
      initializeAnalytics();
    }
    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: newConsent.analytics ? 'granted' : 'denied',
        ad_storage: newConsent.marketing ? 'granted' : 'denied',
        functionality_storage: newConsent.preferences ? 'granted' : 'denied',
        personalization_storage: newConsent.preferences ? 'granted' : 'denied'
      });
    }
    // Trigger GTM event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'cookie_consent_update',
        cookie_consent: newConsent
      });
    }
  };
  const hasConsent = (type: keyof CookieConsent): boolean => {
    if (!consent) return false;
    return consent[type] === true;
  };
  const showPreferences = () => {
    setShowPreferencesModal(true);
  };
  const contextValue: CookieContextType = {
    consent,
    showPreferences,
    updateConsent,
    hasConsent
  };
  if (!isClient) {
    return <>{children}</>;
  }
  return (
    <CookieContext.Provider value={contextValue}>
      {children}
      {/* Cookie Banner - only show if no consent yet */}
      <CookieBanner
        onAccept={() => updateConsent({
          necessary: true,
          analytics: true,
          marketing: true,
          preferences: true
        })}
        onDecline={() => updateConsent({
          necessary: true,
          analytics: false,
          marketing: false,
          preferences: false
        })}
        onManagePreferences={showPreferences}
      />
      {/* Cookie Preferences Modal */}
      <CookiePreferences
        isOpen={showPreferencesModal}
        onClose={() => setShowPreferencesModal(false)}
        onSave={updateConsent}
      />
    </CookieContext.Provider>
  );
}
