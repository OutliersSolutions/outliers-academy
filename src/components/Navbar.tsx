"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {useEffect, useRef, useState} from 'react';
import {Sun, Moon, ChevronDown} from 'lucide-react';
import {useTheme} from 'next-themes';

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
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
    <header className="sticky top-0 z-50 w-full border-b border-muted bg-white/70 backdrop-blur dark:bg-surface/70">
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <img src="/icons/logo.png" alt="Outliers Academy" className="w-8 h-8 object-contain" />
          <span className="font-extrabold text-xl">
            <span className="text-text">Outliers</span>{' '}
            <span style={{color: 'var(--color-primary)'}}>Academy</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <Link href={`/${locale}/catalog`}>{t('catalog')}</Link>
          <Link href={`/${locale}/about`}>{t('about')}</Link>
          <Link href={`/${locale}/pricing`}>{t('pricing')}</Link>
          <Link href={`/${locale}/contact`}>{t('contact')}</Link>
          <Link href={`/${locale}/login`} className="btn-secondary">{t('signIn')}</Link>
          <Link href={`/${locale}/signup`} className="btn-primary">{t('signUp')}</Link>
        </nav>

        <div className="flex items-center gap-2" ref={dropdownRef}>
          {/* Toggle tema */}
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="px-2 py-1 rounded text-sm font-semibold border border-muted bg-surface hover:opacity-90 flex items-center gap-1"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Idioma */}
          <div className="relative">
            <button onClick={() => setOpen(v => !v)} className="px-2 py-1 rounded text-sm font-semibold border border-muted bg-surface flex items-center gap-2">
              <img src={locale === 'es' ? '/icons/flags/spain-flag-icon.svg' : '/icons/flags/united-states-flag-icon.svg'} alt="flag" className="w-4 h-4" />
              <span className="uppercase">{locale}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-40 rounded-md border border-muted bg-white shadow-lg dark:bg-surface z-50">
                <ul className="py-1 text-sm">
                  <li>
                    <Link href={switchLocalePath('es')} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50" onClick={() => setOpen(false)}>
                      <img src="/icons/flags/spain-flag-icon.svg" className="w-4 h-4" alt="ES" /> ES
                    </Link>
                  </li>
                  <li>
                    <Link href={switchLocalePath('en')} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50" onClick={() => setOpen(false)}>
                      <img src="/icons/flags/united-states-flag-icon.svg" className="w-4 h-4" alt="EN" /> EN
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
