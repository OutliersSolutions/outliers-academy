"use client";

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocalePath = (target: string) => {
    const parts = pathname.split('/');
    parts[1] = target;
    return parts.join('/') || '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-muted bg-white/70 backdrop-blur">
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
        <div className="flex items-center gap-2">
          <Link href={switchLocalePath('es')} className="px-2 py-1 rounded text-sm font-semibold border border-muted bg-surface">ES</Link>
          <Link href={switchLocalePath('en')} className="px-2 py-1 rounded text-sm font-semibold border border-muted bg-surface">EN</Link>
        </div>
      </div>
    </header>
  );
} 