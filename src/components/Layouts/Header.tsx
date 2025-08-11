import React, { useState, useEffect, useRef } from "react";
import { Sun, Menu, X, Languages, ChevronDown, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export const Header: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const SERVICES_SUBMENU = [
        { name: "Marketing Digital", path: "/services/marketing" },
        { name: "Desarrollo de Sistemas", path: "/services/systems" },
        { name: "Agentes IA", path: "/services/ai-agents" },
    ];

    const MENU_ITEMS = [
        { name: "Inicio", path: "/" },
        { name: "Servicios", path: "#", submenu: SERVICES_SUBMENU },
        { name: "Catálogo", path: "/catalog" },
        { name: "Nosotros", path: "/about" }
    ];

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openMobileSubmenus, setOpenMobileSubmenus] = useState<Record<string, boolean>>({});
    const [onDarkMode, setOnDarkMode] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleDarkMode = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        setOnDarkMode(newTheme === 'dark');
    };

    const toggleSubmenu = (name: string) => {
        setOpenMobileSubmenus(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setOpenMobileSubmenus({});
    };


    const [openLanguageMenu, setOpenLanguageMenu] = useState(false);
    const [openMobileLanguageMenu, setOpenMobileLanguageMenu] = useState(false);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setOpenLanguageMenu(false);
        localStorage.setItem('i18nextLng', lng);
    };

    const languageMenuRef = useRef<HTMLLIElement>(null);

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

    const mobileLanguageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                mobileLanguageRef.current &&
                !mobileLanguageRef.current.contains(event.target as Node)
            ) {
                setOpenMobileLanguageMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled ? "glass-effect" : "bg-transparent"}`}>
            <div className="container flex items-center justify-between bg-white py-2 sm:py-2 md:py-2 lg:py-4 xl:py-4 dark:bg-gray-800 dark:text-white shadow-sm xl:rounded-md">
                <NavLink to="/">
                    <img src="/icons/logo.png" alt="Logo" className="h-8 sm:h-8 md:h-8 lg:h-10 xl:h-10 w-auto" />
                </NavLink>

                {/* Desktop Menu */}
                <nav className="hidden md:flex">
                    <ul className="flex items-center gap-6">
                        {MENU_ITEMS.map(item => (
                            <li key={item.name} className="relative group">
                                {item.submenu ? (
                                    <div className="flex items-center gap-1 font-inter font-semibold text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary cursor-pointer">
                                        {item.name}
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                ) : (
                                    <NavLink
                                        to={item.path}
                                        end
                                        className={({ isActive }) =>
                                            [
                                                "flex items-center gap-1 font-inter font-semibold text-sm transition-colors",
                                                isActive
                                                    ? "text-primary"
                                                    : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary",
                                            ].join(" ")
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                )}

                                {item.submenu && (
                                    <ul className="absolute left-0 top-5 z-40 min-w-[180px] rounded-lg bg-white px-4 py-2 shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-200 dark:bg-gray-800 dark:text-gray-200">
                                        {item.submenu.map(sub => (
                                            <li key={sub.name}>
                                                <NavLink
                                                    to={sub.path}
                                                    target="_blank"
                                                    className={({ isActive }) =>
                                                        [
                                                            "block py-1 text-sm leading-relaxed transition-colors",
                                                            isActive
                                                                ? "text-primary"
                                                                : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary",
                                                        ].join(" ")
                                                    }
                                                >
                                                    {sub.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}

                        <li>
                            <button onClick={handleDarkMode} className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center gap-2" aria-label="Cambiar tema">
                                {onDarkMode ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
                                <span className="text-sm hidden lg:block">{onDarkMode ? 'Light' : 'Dark'}</span>
                            </button>
                        </li>
                        <li ref={languageMenuRef} className="relative">
                            <button onClick={() => setOpenLanguageMenu(prev => !prev)} className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center gap-2" aria-label="Cambiar idioma">
                                <img src={i18n.language === 'es' ? '/icons/flags/spain-flag-icon.svg' : '/icons/flags/united-states-flag-icon.svg'} width="16" height="16" alt="flag" />
                                <span className="text-sm uppercase">{i18n.language}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {/* Submenu */}
                            {openLanguageMenu && (
                                <ul className="absolute right-0 top-8 z-40 w-44 rounded-lg bg-white px-2 py-2 shadow-lg opacity-100 visible transition-opacity duration-200 dark:bg-gray-800 dark:text-gray-200">
                                    <li>
                                        <button
                                            onClick={() => changeLanguage('es')}
                                            className="flex items-center gap-2 w-full text-left px-2 py-2 text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                                        >
                                            <img src="/icons/flags/spain-flag-icon.svg" width="15" height="15" alt="Spain flag" className="inline-block" />
                                            Español
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => changeLanguage('en')}
                                            className="flex items-center gap-2 w-full text-left px-2 py-2 text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                                        >
                                            <img src="/icons/flags/united-states-flag-icon.svg" width="15" height="15" alt="USA flag" className="inline-block" />
                                            English
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => changeLanguage('de')}
                                            className="flex items-center gap-2 w-full text-left px-2 py-2 text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                                        >
                                            <img src="/icons/flags/deutsch-flag-icon.png" width="15" height="15" alt="Deutsch flag" className="inline-block" />
                                            Deutsch
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => changeLanguage('pt')}
                                            className="flex items-center gap-2 w-full text-left px-2 py-2 text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                                        >
                                            <img src="/icons/flags/brazil-flag-icon.svg" width="15" height="15" alt="Brazil flag" className="inline-block" />
                                            Português
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => changeLanguage('zh')}
                                            className="flex items-center gap-2 w-full text-left px-2 py-2 text-sm text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                                        >
                                            <img src="/icons/flags/china-flag-icon.svg" width="15" height="15" alt="Brazil flag" className="inline-block" />
                                            中文
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>

                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-foreground hover:text-primary transition-colors dark:text-white dark:hover:text-primary"
                    onClick={() => setMobileMenuOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile backdrop */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMobileMenu} />
            )}

            {/* Mobile Panel */}
            <div
                className={`md:hidden fixed top-0 right-0 bottom-0 w-2/3 bg-white p-6 shadow-lg transform transition-transform z-50 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    } dark:bg-gray-900 dark:text-white`}
            >
                <div className="flex flex-col space-y-6">
                    {MENU_ITEMS.map(item => (
                        <div key={item.name} className="w-full">
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => {
                                    if (item.submenu) toggleSubmenu(item.name);
                                    else closeMobileMenu();
                                }}
                            >
                                {item.submenu ? (
                                    <span className="text-xl font-medium text-gray-900 hover:text-primary dark:text-gray-200 dark:hover:text-primary">
                                        {item.name}
                                    </span>
                                ) : (
                                    <NavLink
                                        to={item.path}
                                        end
                                        className={({ isActive }) =>
                                            [
                                                "text-xl font-medium transition-colors",
                                                isActive
                                                    ? "text-primary"
                                                    : "text-foreground hover:text-primary dark:text-gray-300 dark:hover:text-primary",
                                            ].join(" ")
                                        }
                                        onClick={closeMobileMenu}
                                    >
                                        {item.name}
                                    </NavLink>
                                )}
                                {item.submenu && <ChevronDown className={`w-5 h-5 transition-transform ${openMobileSubmenus[item.name] ? "rotate-180" : ""}`} />}
                            </div>
                            {item.submenu && openMobileSubmenus[item.name] && (
                                <ul className="ml-4 mt-2 space-y-2">
                                    {item.submenu.map(sub => (
                                        <li key={sub.name}>
                                            <NavLink
                                                to={sub.path}
                                                className={({ isActive }) =>
                                                    [
                                                        "block text-base transition-colors",
                                                        isActive
                                                            ? "text-primary"
                                                            : "text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary",
                                                    ].join(" ")
                                                }
                                                onClick={closeMobileMenu}
                                            >
                                                {sub.name}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                    <div className="pt-6 flex items-center space-x-4 border-t border-gray-200 dark:border-gray-700">
                        <button onClick={handleDarkMode} className="btn-icon bg-gray-100 dark:bg-gray-700 p-1.5 rounded-full">
                            {onDarkMode ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
                        </button>
                        <div ref={mobileLanguageRef} className="relative">
                            <button
                                onClick={() => setOpenMobileLanguageMenu(prev => !prev)}
                                className="btn-icon bg-gray-100 dark:bg-gray-700 p-1.5 rounded-full"
                                aria-label="Cambiar idioma"
                            >
                                <Languages className="w-5 h-5 text-primary" />
                            </button>

                            {openMobileLanguageMenu && (
                                <ul className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:text-gray-200 z-50">
                                    <li>
                                        <button
                                            onClick={() => changeLanguage('es')}
                                            className="w-full text-left px-4 py-2 text-sm hover:text-primary dark:hover:text-primary"
                                        >
                                            <img src="/icons/flags/spain-flag-icon.svg" width="15" height="15" alt="Spain flag" className="inline-block mr-1" />
                                            Español

                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => changeLanguage('en')}
                                            className="w-full text-left px-4 py-2 text-sm hover:text-primary dark:hover:text-primary"
                                        >
                                            <img src="/icons/flags/united-states-flag-icon.svg" width="15" height="15" alt="USA flag" className="inline-block mr-1" />
                                            English

                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => changeLanguage('de')}
                                            className="w-full text-left px-4 py-2 text-sm hover:text-primary dark:hover:text-primary"
                                        >
                                            <img src="/icons/flags/deutsch-flag-icon.png" width="15" height="15" alt="Deutsch flag" className="inline-block mr-1" />
                                            Deutsch
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => changeLanguage('pt')}
                                            className="w-full text-left px-4 py-2 text-sm hover:text-primary dark:hover:text-primary"
                                        >
                                            <img src="/icons/flags/brazil-flag-icon.svg" width="15" height="15" alt="Brazil flag" className="inline-block mr-1" />
                                            Português
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => changeLanguage('zh')}
                                            className="w-full text-left px-4 py-2 text-sm hover:text-primary dark:hover:text-primary"
                                        >
                                            <img src="/icons/flags/china-flag-icon.svg" width="15" height="15" alt="Brazil flag" className="inline-block mr-1" />
                                            中文
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>



                </div>
            </div>
        </header>
    );
};
