'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface CookieBannerProps {
  onAccept?: () => void;
  onDecline?: () => void;
  onManagePreferences?: () => void;
}

export function CookieBanner({ onAccept, onDecline, onManagePreferences }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('cookies');

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
    onAccept?.();
    
    // Initialize analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
    onDecline?.();
    
    // Deny non-essential cookies
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied'
      });
    }
  };

  const handleManagePreferences = () => {
    onManagePreferences?.();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
      
      {/* Cookie Banner - Codecademy style */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              
              {/* Cookie Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {t('title') || 'We use cookies to enhance your experience'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('description') || 'We use cookies and similar technologies to provide, protect, and improve our services and to personalize content. By clicking "Accept All", you consent to our use of cookies.'}
                  {' '}
                  <button 
                    onClick={handleManagePreferences}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline underline-offset-2 transition-colors"
                  >
                    {t('learnMore') || 'Learn more'}
                  </button>
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 lg:order-2"
                >
                  {t('decline') || 'Decline'}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl lg:order-3"
                >
                  {t('acceptAll') || 'Accept All'}
                </button>
                <button
                  onClick={handleManagePreferences}
                  className="px-6 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 lg:order-1"
                >
                  {t('customize') || 'Customize'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Type definitions for global gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'set' | 'event' | 'consent',
      targetId: string | 'update',
      config?: any
    ) => void;
  }
}