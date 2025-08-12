"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {useEffect, useRef, useState} from 'react';
import {Sun, Moon, ChevronDown, Search, User, LogOut, BarChart3, BookOpen} from 'lucide-react';
import {useTheme} from 'next-themes';
import {useSession, signOut} from 'next-auth/react';
import {SearchOverlay} from '@/components/ui/SearchOverlay';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // next-themes
  const {theme, resolvedTheme, setTheme} = useTheme();
  const isDark = (theme ?? resolvedTheme) === 'dark';

  // cerrar dropdown al click fuera
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
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
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 shadow-sm backdrop-blur-md">
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

              {/* Auth Section */}
              <div className="hidden md:flex items-center gap-2">
                {status === "loading" ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : session ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image || undefined} />
                        <AvatarFallback>
                          {session.user.name?.split(' ').map(n => n[0]).join('') || session.user.email?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg z-50">
                        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {session.user.name || session.user.email}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {session.user.email}
                          </p>
                        </div>
                        <ul className="py-1">
                          <li>
                            <Link
                              href={`/${locale}/dashboard`}
                              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <BarChart3 className="w-4 h-4" />
                              <span>Dashboard</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/${locale}/my-courses`}
                              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <BookOpen className="w-4 h-4" />
                              <span>My Courses</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/${locale}/profile`}
                              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <User className="w-4 h-4" />
                              <span>Profile</span>
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setUserMenuOpen(false);
                                signOut({ callbackUrl: `/${locale}` });
                              }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Sign out</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
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
                  </>
                )}
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
