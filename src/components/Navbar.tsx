"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  Sun,
  Moon,
  ChevronDown,
  Search,
  User,
  LogOut,
  BarChart3,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { SearchOverlay } from "@/components/ui/SearchOverlay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderInline } from "@/components/ui/loader";
import { useNewAuth } from "@/components/providers/AuthProvider";

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const { isAuthenticated, loading: authLoading, user, logout } = useNewAuth();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // next-themes
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = (theme ?? resolvedTheme) === "dark";

  // cerrar dropdown al click fuera
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      
      // Language dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setOpen(false);
      }
      
      // User menu
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      
      // Mobile menu - more specific check
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    const handleDocumentClick = (e: MouseEvent) => {
      // Small delay to ensure proper event handling
      setTimeout(() => onClickOutside(e), 0);
    };

    if (typeof document !== 'undefined') {
      document.addEventListener("mousedown", handleDocumentClick, true);
      return () => document.removeEventListener("mousedown", handleDocumentClick, true);
    }
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const switchLocalePath = (target: string) => {
    // With localePrefix: 'always', we need to handle the locale switching differently
    const pathWithoutLocale = pathname.split('/').slice(2).join('/') || '';
    return `/${target}${pathWithoutLocale ? '/' + pathWithoutLocale : ''}`;
  };

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-solarized-base1 dark:border-gray-700 bg-solarized-base3/90 dark:bg-gray-900/90 shadow-sm backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 flex-shrink-0"
            >
              <img
                src="/icons/logo.png"
                alt="Outliers Academy"
                className="w-8 h-8 object-contain"
              />
              <span className="font-heading font-extrabold text-lg sm:text-xl">
                <span className="text-solarized-base01 dark:text-white">
                  Outliers
                </span>{" "}
                <span style={{ color: "var(--color-primary)" }}>Academy</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-solarized-base01 dark:text-gray-300">
              <Link
                href={`/${locale}/catalog`}
                className="hover:text-primary transition-colors"
              >
                {t("catalog")}
              </Link>
              {isAuthenticated && (
                <Link
                  href={`/${locale}/my-courses`}
                  className="hover:text-primary transition-colors"
                >
                  {t("myCourses")}
                </Link>
              )}
              <Link
                href={`/${locale}/pricing`}
                className="hover:text-primary transition-colors"
              >
                {t("pricing")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="hover:text-primary transition-colors"
              >
                {t("about")}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="hover:text-primary transition-colors"
              >
                {t("contact")}
              </Link>
            </nav>

            {/* Right Side - Desktop Utils + Auth Buttons + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Desktop-only: Theme Toggle and Language Selector */}
              <div className="hidden lg:flex items-center gap-2">
                {/* Theme Toggle */}
                <button
                  aria-label={tCommon("toggleTheme")}
                  onClick={toggleTheme}
                  className="p-2 text-solarized-base00 dark:text-gray-400 hover:text-solarized-base01 dark:hover:text-white hover:bg-solarized-base2 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>

                {/* Language Selector */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setOpen((v) => !v)}
                    className="flex items-center gap-2 px-3 py-2 text-solarized-base00 dark:text-gray-400 hover:text-solarized-base01 dark:hover:text-white hover:bg-solarized-base2 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <img
                      src={
                        locale === "es"
                          ? "/icons/flags/spain-flag-icon.svg"
                          : "/icons/flags/united-states-flag-icon.svg"
                      }
                      alt="flag"
                      className="w-5 h-5 rounded-sm"
                    />
                    <span className="text-sm font-medium">
                      {locale.toUpperCase()}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {open && (
                    <div className="absolute top-full right-0 mt-2 w-40 bg-solarized-base2 dark:bg-gray-800 rounded-lg shadow-lg border border-solarized-base1 dark:border-gray-700 z-50">
                      <Link
                        href={switchLocalePath("es")}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700"
                        onClick={() => setOpen(false)}
                      >
                        <img
                          src="/icons/flags/spain-flag-icon.svg"
                          alt="ES"
                          className="w-5 h-5 rounded-sm"
                        />
                        Español
                      </Link>
                      <Link
                        href={switchLocalePath("en")}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700"
                        onClick={() => setOpen(false)}
                      >
                        <img
                          src="/icons/flags/united-states-flag-icon.svg"
                          alt="EN"
                          className="w-5 h-5 rounded-sm"
                        />
                        English
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Auth Buttons - Always Visible */}
              {isAuthenticated && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 p-2 text-solarized-base00 dark:text-gray-400 hover:text-solarized-base01 dark:hover:text-white hover:bg-solarized-base2 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || undefined} />
                      <AvatarFallback>
                        {user.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") ||
                          user.email?.[0]?.toUpperCase() ||
                          "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-solarized-base2 dark:bg-gray-800 rounded-lg shadow-lg border border-solarized-base1 dark:border-gray-700 z-50">
                      <div className="px-4 py-3 border-b border-solarized-base1 dark:border-gray-700">
                        <p className="text-sm font-medium text-solarized-base01 dark:text-white truncate">
                          {user.name || user.email}
                        </p>
                        <p className="text-xs text-solarized-base00 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          href={`/${locale}/dashboard`}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700"
                        >
                          <BarChart3 className="w-4 h-4" />
                          {t("myCourses")}
                        </Link>
                        <Link
                          href={`/${locale}/profile`}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700"
                        >
                          <User className="w-4 h-4" />
                          {t("profile")}
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700"
                        >
                          <LogOut className="w-4 h-4" />
                          {t("signOut")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {authLoading ? (
                    <LoaderInline size="sm" />
                  ) : (
                    <>
                      <Link
                        href={`/${locale}/login`}
                        className="hidden sm:inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 text-sm font-medium text-primary border border-primary bg-transparent transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-md"
                      >
                        {t("signIn")}
                      </Link>
                      <Link
                        href={`/${locale}/signup`}
                        className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-heading font-semibold text-white transition-all duration-200 hover:brightness-110 hover:scale-105 hover:shadow-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                        }}
                      >
                        {t("signUp")}
                      </Link>
                    </>
                  )}
                </div>
              )}

              {/* Mobile Menu Button */}
              <div className="block lg:hidden ml-2" ref={mobileMenuRef}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMobileMenuOpen(prev => !prev);
                  }}
                  className="flex items-center justify-center p-3 w-11 h-11 text-solarized-base01 dark:text-gray-300 hover:text-primary dark:hover:text-white hover:bg-solarized-base2 dark:hover:bg-gray-800 rounded-lg transition-colors border border-solarized-base1 dark:border-gray-600 relative z-10"
                  aria-label="Toggle mobile menu"
                  aria-expanded={mobileMenuOpen}
                  type="button"
                >
                  <span className="sr-only">
                    {mobileMenuOpen ? 'Close menu' : 'Open menu'}
                  </span>
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 pointer-events-none" />
                  ) : (
                    <Menu className="w-5 h-5 pointer-events-none" />
                  )}
                </button>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                  <div className="absolute top-full right-4 mt-2 w-64 bg-solarized-base2 dark:bg-gray-800 rounded-lg shadow-lg border border-solarized-base1 dark:border-gray-700 z-50">
                    {/* Auth buttons for small screens */}
                    {!isAuthenticated && (
                      <div className="sm:hidden p-4 border-b border-solarized-base1 dark:border-gray-700">
                        <div className="space-y-2">
                          <Link
                            href={`/${locale}/login`}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-primary border border-primary bg-transparent transition-all duration-200 hover:bg-primary hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {t("signIn")}
                          </Link>
                          <Link
                            href={`/${locale}/signup`}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-heading font-semibold text-white transition-all duration-200 hover:brightness-110"
                            style={{
                              background:
                                "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                            }}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {t("signUp")}
                          </Link>
                        </div>
                      </div>
                    )}
                    {/* Navigation Links */}
                    <div className="py-2">
                      <Link
                        href={`/${locale}/catalog`}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700 transition-colors"
                      >
                        <BookOpen className="w-4 h-4" />
                        {t("catalog")}
                      </Link>
                      {isAuthenticated && (
                        <Link
                          href={`/${locale}/my-courses`}
                          className="flex items-center gap-2 px-4 py-3 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700 transition-colors"
                        >
                          <BarChart3 className="w-4 h-4" />
                          {t("myCourses")}
                        </Link>
                      )}
                      <Link
                        href={`/${locale}/pricing`}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700 transition-colors"
                      >
                        {t("pricing")}
                      </Link>
                      <Link
                        href={`/${locale}/about`}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700 transition-colors"
                      >
                        {t("about")}
                      </Link>
                      <Link
                        href={`/${locale}/contact`}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700 transition-colors"
                      >
                        {t("contact")}
                      </Link>
                    </div>

                    <hr className="border-solarized-base1 dark:border-gray-700" />

                    {/* Search */}
                    <button
                      onClick={() => {
                        setIsSearchOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Search className="w-4 h-4" />
                      {tCommon("search")}
                    </button>

                    {/* Theme Toggle */}
                    <button
                      onClick={() => {
                        toggleTheme();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700 transition-colors"
                    >
                      {isDark ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                      {tCommon("toggleTheme")}
                    </button>

                    <hr className="border-solarized-base1 dark:border-gray-700" />

                    {/* Language Selector */}
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs font-semibold text-solarized-base00 dark:text-gray-500 uppercase tracking-wide">
                        {locale === "es" ? "Idioma" : "Language"}
                      </div>
                      <Link
                        href={switchLocalePath("es")}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <img
                          src="/icons/flags/spain-flag-icon.svg"
                          alt="ES"
                          className="w-5 h-5 rounded-sm"
                        />
                        Español
                        {locale === "es" && (
                          <span className="ml-auto text-primary">✓</span>
                        )}
                      </Link>
                      <Link
                        href={switchLocalePath("en")}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <img
                          src="/icons/flags/united-states-flag-icon.svg"
                          alt="EN"
                          className="w-5 h-5 rounded-sm"
                        />
                        English
                        {locale === "en" && (
                          <span className="ml-auto text-primary">✓</span>
                        )}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
