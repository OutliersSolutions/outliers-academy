"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import { Sun, Moon, ChevronDown } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const [isDark, setIsDark] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enabled = saved ? saved === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', enabled);
    setIsDark(enabled);

    const onClickOutside = (e: MouseEvent) => {
      if (langBtnRef.current && !langBtnRef.current.parentElement?.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
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

  const currentFlag = locale === 'es' ? '/icons/flags/spain-flag-icon.svg'
                      : locale === 'en' ? '/icons/flags/united-states-flag-icon.svg'
                      : locale === 'pt' ? '/icons/flags/brazil-flag-icon.svg'
                      : locale === 'de' ? '/icons/flags/deutsch-flag-icon.png'
                      : '/icons/flags/china-flag-icon.svg';

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
          <button aria-label="Toggle theme" onClick={toggleTheme} className="px-2 py-1 rounded text-sm font-semibold border border-muted bg-surface hover:opacity-90 flex items-center gap-1">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language dropdown */}
          <div className="relative">
            <button ref={langBtnRef} onClick={() => setLangOpen((v) => !v)} className="px-2 py-1 rounded text-sm font-semibold border border-muted bg-surface flex items-center gap-2">
              <img src={currentFlag} alt="lang" className="w-4 h-4" />
              <span className="uppercase">{locale}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-md border border-muted bg-white shadow-lg dark:bg-surface z-50">
                <ul className="py-1 text-sm">
                  <li>
                    <Link href={switchLocalePath('es')} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50" onClick={() => setLangOpen(false)}>
                      <img src="/icons/flags/spain-flag-icon.svg" alt="ES" className="w-4 h-4" /> ES
                    </Link>
                  </li>
                  <li>
                    <Link href={switchLocalePath('en')} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50" onClick={() => setLangOpen(false)}>
                      <img src="/icons/flags/united-states-flag-icon.svg" alt="EN" className="w-4 h-4" /> EN
                    </Link>
                  </li>
                  <li>
                    <Link href={switchLocalePath('pt')} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50" onClick={() => setLangOpen(false)}>
                      <img src="/icons/flags/brazil-flag-icon.svg" alt="PT" className="w-4 h-4" /> PT
                    </Link>
                  </li>
                  <li>
                    <Link href={switchLocalePath('de')} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50" onClick={() => setLangOpen(false)}>
                      <img src="/icons/flags/deutsch-flag-icon.png" alt="DE" className="w-4 h-4" /> DE
                    </Link>
                  </li>
                  <li>
                    <Link href={switchLocalePath('cn')} className="flex items-center gap-2 px-3 py-2 hover:bg-muted/50" onClick={() => setLangOpen(false)}>
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