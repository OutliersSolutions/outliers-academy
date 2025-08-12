"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {useEffect, useRef, useState} from 'react';
import {Sun, Moon, ChevronDown, Search} from 'lucide-react';
import {useTheme} from 'next-themes';
import {SearchOverlay} from '@/components/ui/SearchOverlay';

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // next-themes
  const {theme, resolvedTheme, setTheme} = useTheme();
  const isDark = (theme ?? resolvedTheme) === 'dark';

  // cerrar dropdown al click fuera
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, []);

  const switchLocalePath = (target: string) => {
    // si tu routing es "/[locale]/..." esto sustituye el segmento 1
    const parts = pathname.split('/');
    parts[1] = target;
    const next = parts.join('/') || '/';
    return next.replace(/\/+/g, '/');
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3 flex-shrink-0">
              <img src="/icons/logo.png" alt="Outliers Academy" className="w-8 h-8 object-contain" />
              <span className="font-extrabold text-xl">
                <span className="text-gray-900 dark:text-white">Outliers</span>{' '}
                <span style={{color: 'var(--color-primary)'}}>Academy</span>
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Link href={`/${locale}/catalog`} className="hover:text-primary transition-colors">
                {t('catalog')}
              </Link>
              <Link href={`/${locale}/about`} className="hover:text-primary transition-colors">
                {t('about')}
              </Link>
              <Link href={`/${locale}/pricing`} className="hover:text-primary transition-colors">
                {t('pricing')}
              </Link>
              <Link href={`/${locale}/contact`} className="hover:text-primary transition-colors">
                {t('contact')}
              </Link>
            </nav>

            {/* Search Button */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm font-medium">Search</span>
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                aria-label="Toggle theme"
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Language Selector */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setOpen(v => !v)} 
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <img 
                    src={locale === 'es' ? '/icons/flags/spain-flag-icon.svg' : '/icons/flags/united-states-flag-icon.svg'} 
                    alt="flag" 
                    className="w-4 h-4" 
                  />
                  <span className="text-sm font-medium uppercase">{locale}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg z-50">
                    <ul className="py-1">
                      <li>
                        <Link 
                          href={switchLocalePath('es')} 
                          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" 
                          onClick={() => setOpen(false)}
                        >
                          <img src="/icons/flags/spain-flag-icon.svg" className="w-4 h-4" alt="ES" /> 
                          <span>Español</span>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href={switchLocalePath('en')} 
                          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" 
                          onClick={() => setOpen(false)}
                        >
                          <img src="/icons/flags/united-states-flag-icon.svg" className="w-4 h-4" alt="EN" /> 
                          <span>English</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <Link 
                  href={`/${locale}/login`} 
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {t('signIn')}
                </Link>
                <Link 
                  href={`/${locale}/signup`} 
                  className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {t('signUp')}
                </Link>
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
