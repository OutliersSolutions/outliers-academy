"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sun, Menu, X, Languages, ChevronDown, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export const Header: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const t = useTranslations('header');

    const SERVICES_SUBMENU = [
        { name: t('digitalMarketing'), path: "/services/marketing" },
        { name: t('systemDevelopment'), path: "/services/systems" },
        { name: t('aiAgents'), path: "/services/ai-agents" },
    ];

    const MENU_ITEMS = [
        { name: t('home'), path: "/" },
        { name: t('services'), path: "#", submenu: SERVICES_SUBMENU },
        { name: t('catalog'), path: "/catalog" },
        { name: t('about'), path: "/about" }
    ];

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openMobileSubmenus, setOpenMobileSubmenus] = useState<Record<string, boolean>>({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleDarkMode = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const toggleSubmenu = (name: string) => {
        setOpenMobileSubmenus(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setOpenMobileSubmenus({});
    };

    const [openLanguageMenu, setOpenLanguageMenu] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('ES');
    const languageMenuRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'en', name: 'English', flag: '🇺🇸' }
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
                setOpenLanguageMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!mounted) return null;

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled ? "glass-effect" : "bg-transparent"}`}>
            <div className="container flex items-center justify-between bg-white py-2 sm:py-2 md:py-2 lg:py-4 xl:py-4 dark:bg-gray-800 dark:text-white shadow-sm xl:rounded-md">
                <Link href="/">
                    <img src="/icons/logo.png" alt="Outliers Academy Logo" className="h-8 sm:h-8 md:h-8 lg:h-10 xl:h-10 w-auto" />
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex">
                    <ul className="flex items-center gap-6">
                        {MENU_ITEMS.map(item => (
                            <li key={item.name} className="relative group">
                                {item.submenu ? (
                                    <>
                                        <div className="flex items-center gap-1 font-sans font-semibold text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary cursor-pointer">
                                            {item.name}
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                            <ul className="py-2">
                                                {item.submenu.map(subItem => (
                                                    <li key={subItem.name}>
                                                        <Link
                                                            href={subItem.path}
                                                            className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={item.path}
                                        className="header-link font-inter font-semibold text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className="relative" ref={languageMenuRef}>
                        <button
                            onClick={() => setOpenLanguageMenu(!openLanguageMenu)}
                            className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Languages className="w-4 h-4" />
                            <span className="text-sm font-medium">{currentLanguage}</span>
                            <ChevronDown className="w-3 h-3" />
                        </button>

                        {openLanguageMenu && (
                            <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
                                <ul className="py-1">
                                    {languages.map(lang => (
                                        <li key={lang.code}>
                                            <button
                                                onClick={() => {
                                                    setCurrentLanguage(lang.code.toUpperCase());
                                                    setOpenLanguageMenu(false);
                                                }}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                                            >
                                                <span>{lang.flag}</span>
                                                <span>{lang.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={handleDarkMode}
                        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>

                    {/* CTA Button */}
                    <Link
                        href="/pricing"
                        className="btn-primary btn-lg"
                    >
                        {t('start')}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg md:hidden">
                        <nav className="container py-4">
                            <ul className="space-y-2">
                                {MENU_ITEMS.map(item => (
                                    <li key={item.name}>
                                        {item.submenu ? (
                                            <>
                                                <button
                                                    onClick={() => toggleSubmenu(item.name)}
                                                    className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                                                >
                                                    <span>{item.name}</span>
                                                    <ChevronDown className={`w-4 h-4 transform transition-transform ${openMobileSubmenus[item.name] ? 'rotate-180' : ''}`} />
                                                </button>
                                                {openMobileSubmenus[item.name] && (
                                                    <ul className="pl-4 mt-2 space-y-1">
                                                        {item.submenu.map(subItem => (
                                                            <li key={subItem.name}>
                                                                <Link
                                                                    href={subItem.path}
                                                                    onClick={closeMobileMenu}
                                                                    className="block py-2 px-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </>
                                        ) : (
                                            <Link
                                                href={item.path}
                                                onClick={closeMobileMenu}
                                                className="block py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                                <li className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Link
                                        href="/pricing"
                                        onClick={closeMobileMenu}
                                        className="block w-full btn-primary text-center"
                                    >
                                        {t('start')}
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};