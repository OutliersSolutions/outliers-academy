"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';
import { useEffect, useState, useRef } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const [isDark, setIsDark] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize theme from localStorage
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enabled = saved ? saved === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', enabled);
    setIsDark(enabled);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const switchLocalePath = (target: string) => {
    const parts = pathname.split('/');
    parts[1] = target;
    return parts.join('/') || '/';
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-muted bg-white/70 backdrop-blur dark:bg-surface/70">
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <img src="/icons/logo.png" alt="Outliers Academy" className="w-8 h-8 object-contain" />
          <span className="font-extrabold text-xl">
            <span className="text-text">Outliers</span> <span style={{color: 'var(--color-primary)'}}>Academy</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <Link href={`/${locale}/catalog`}>Catalog</Link>
          <Link href={`/${locale}/about`}>About</Link>
          <Link href={`/${locale}/pricing`}>Pricing</Link>
          <Link href={`/${locale}/contact`}>Contact</Link>
          <Link href={`/${locale}/login`} className="btn-secondary">Sign in</Link>
          <Link href={`/${locale}/signup`} className="btn-primary">Sign up</Link>
        </nav>
        <div className="flex items-center gap-2 relative">
          {/* Dark mode toggle */}
          <button aria-label="Toggle theme" onClick={toggleTheme} className="px-2 py-1 rounded text-sm font-semibold border border-muted bg-surface hover:opacity-90">
            {isDark ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Language dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setLangOpen((v) => !v)} className="px-2 py-1 rounded text-sm font-semibold border border-muted bg-surface flex items-center gap-2 hover:opacity-90 transition-opacity">
              <img src={locale === 'es' ? '/icons/flags/spain-flag-icon.svg' : '/icons/flags/united-states-flag-icon.svg'} alt="lang" className="w-4 h-4" />
              <span className="uppercase">{locale}</span>
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" /></svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-md border border-muted bg-white shadow-lg dark:bg-surface">
                <ul className="py-1 text-sm">
                  <li>
                    <Link onClick={() => setLangOpen(false)} href={switchLocalePath('es')} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50">
                      <img src="/icons/flags/spain-flag-icon.svg" alt="ES" className="w-4 h-4" /> ES
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setLangOpen(false)} href={switchLocalePath('en')} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50">
                      <img src="/icons/flags/united-states-flag-icon.svg" alt="EN" className="w-4 h-4" /> EN
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setLangOpen(false)} href={switchLocalePath('pt')} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50">
                      <img src="/icons/flags/brazil-flag-icon.svg" alt="PT" className="w-4 h-4" /> PT
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setLangOpen(false)} href={switchLocalePath('de')} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50">
                      <img src="/icons/flags/deutsch-flag-icon.png" alt="DE" className="w-4 h-4" /> DE
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => setLangOpen(false)} href={switchLocalePath('cn')} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50">
                      <img src="/icons/flags/china-flag-icon.svg" alt="CN" className="w-4 h-4" /> CN
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 