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
} from "lucide-react";
import { useTheme } from "next-themes";
import { SearchOverlay } from "@/components/ui/SearchOverlay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderInline } from "@/components/ui/loader";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // next-themes
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = (theme ?? resolvedTheme) === "dark";

  // cerrar dropdown al click fuera
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  const switchLocalePath = (target: string) => {
    // si tu routing es "/[locale]/..." esto sustituye el segmento 1
    const parts = pathname.split("/");
    parts[1] = target;
    const next = parts.join("/") || "/";
    return next.replace(/\/+/g, "/");
  };

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = `/${locale}`;
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = `/${locale}`;
    }
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
              <span className="font-heading font-extrabold text-xl">
                <span className="text-solarized-base01 dark:text-white">
                  Outliers
                </span>{" "}
                <span style={{ color: "var(--color-primary)" }}>Academy</span>
              </span>
            </Link>

            {/* Navigation Links */}
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

            {/* Search Button */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-solarized-base00 dark:text-gray-400 hover:text-solarized-base01 dark:hover:text-white transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm font-medium">{tCommon("search")}</span>
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
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
                  <div className="absolute top-full right-0 mt-2 w-40 bg-solarized-base2 dark:bg-gray-800 rounded-lg shadow-lg border border-solarized-base1 dark:border-gray-700">
                    <Link
                      href={switchLocalePath("es")}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-solarized-base01 dark:text-gray-300 hover:bg-solarized-base3 dark:hover:bg-gray-700"
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

              {/* User Menu */}
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
                    <div className="absolute top-full right-0 mt-2 w-48 bg-solarized-base2 dark:bg-gray-800 rounded-lg shadow-lg border border-solarized-base1 dark:border-gray-700">
                      <div className="px-4 py-3 border-b border-solarized-base1 dark:border-gray-700">
                        <p className="text-sm font-medium text-solarized-base01 dark:text-white">
                          {user.name || user.email}
                        </p>
                        <p className="text-xs text-solarized-base00 dark:text-gray-400">
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
                <div className="flex items-center gap-4">
                  {authLoading ? (
                    <LoaderInline size="sm" />
                  ) : (
                    <>
                      <Link
                        href={`/${locale}/login`}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-medium text-primary border border-primary bg-transparent transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-md"
                      >
                        {t("signIn")}
                      </Link>
                      <Link
                        href={`/${locale}/signup`}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-heading font-semibold text-white transition-all duration-200 hover:brightness-110 hover:scale-105 hover:shadow-lg"
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
