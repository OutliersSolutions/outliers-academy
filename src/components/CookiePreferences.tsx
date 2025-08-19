'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
interface CookiePreference {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}
interface CookiePreferencesProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: CookiePreference) => void;
}
export function CookiePreferences({ isOpen, onClose, onSave }: CookiePreferencesProps) {
  const [preferences, setPreferences] = useState<CookiePreference>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });
  const t = useTranslations('cookies');
  useEffect(() => {
    // Load existing preferences
    const savedConsent = localStorage.getItem('cookie-consent');
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed);
      } catch (error) {
      }
    }
  }, [isOpen]);
  const handleSave = () => {
    const consentData = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
        functionality_storage: preferences.preferences ? 'granted' : 'denied',
        personalization_storage: preferences.preferences ? 'granted' : 'denied'
      });
    }
    onSave(preferences);
    onClose();
  };
  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setPreferences(allAccepted);
    const consentData = {
      ...allAccepted,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted'
      });
    }
    onSave(allAccepted);
    onClose();
  };
  const handleDeclineAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setPreferences(onlyNecessary);
    const consentData = {
      ...onlyNecessary,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied'
      });
    }
    onSave(onlyNecessary);
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('preferences.title') || 'Cookie Preferences'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {t('preferences.description') || 'Customize your cookie preferences. You can change these settings at any time.'}
          </p>
        </div>
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="space-y-6">
            {/* Necessary Cookies */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 bg-green-500 rounded border-2 border-green-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('preferences.necessary.title') || 'Necessary Cookies'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {t('preferences.necessary.description') || 'These cookies are essential for the website to function properly. They cannot be disabled.'}
                </p>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">Always active</span>
              </div>
            </div>
            {/* Analytics Cookies */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200 peer-checked:after:content-['✓'] peer-checked:after:text-white peer-checked:after:text-xs peer-checked:after:font-bold peer-checked:after:flex peer-checked:after:items-center peer-checked:after:justify-center"></div>
                </label>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('preferences.analytics.title') || 'Analytics Cookies'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('preferences.analytics.description') || 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.'}
                </p>
              </div>
            </div>
            {/* Marketing Cookies */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded peer-checked:bg-purple-500 peer-checked:border-purple-500 transition-all duration-200 peer-checked:after:content-['✓'] peer-checked:after:text-white peer-checked:after:text-xs peer-checked:after:font-bold peer-checked:after:flex peer-checked:after:items-center peer-checked:after:justify-center"></div>
                </label>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('preferences.marketing.title') || 'Marketing Cookies'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('preferences.marketing.description') || 'Used to track visitors across websites to display relevant and engaging advertisements.'}
                </p>
              </div>
            </div>
            {/* Preference Cookies */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={(e) => setPreferences(prev => ({ ...prev, preferences: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded peer-checked:bg-amber-500 peer-checked:border-amber-500 transition-all duration-200 peer-checked:after:content-['✓'] peer-checked:after:text-white peer-checked:after:text-xs peer-checked:after:font-bold peer-checked:after:flex peer-checked:after:items-center peer-checked:after:justify-center"></div>
                </label>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t('preferences.preferences.title') || 'Preference Cookies'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('preferences.preferences.description') || 'Enable the website to remember information that changes how it behaves or looks, like your preferred language or region.'}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={handleDeclineAll}
              className="px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
            >
              {t('preferences.declineAll') || 'Decline All'}
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
            >
              {t('preferences.savePreferences') || 'Save Preferences'}
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('preferences.acceptAll') || 'Accept All'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
