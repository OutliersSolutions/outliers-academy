'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  type: 'course' | 'path' | 'article' | 'project';
  title: string;
  description: string;
  url: string;
  icon?: string;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const t = useTranslations('search');
  const tCommon = useTranslations('common');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search results would come from Odoo in real implementation
  const searchResults: SearchResult[] = [];

  // Show message when Odoo is not configured
  const isOdooConfigured = Boolean(
    process.env.ODOO_URL && 
    process.env.ODOO_DB && 
    process.env.ODOO_USERNAME && 
    process.env.ODOO_PASSWORD
  );

  if (!isOdooConfigured && query.trim()) {
    // Return error state when trying to search without Odoo
    searchResults.push({
      id: 'error',
      type: 'course',
      title: '🤦‍♂️ ¡Ups! No configuraste Odoo, cuy',
      description: 'La búsqueda necesita conexión real con Odoo. Configura las variables de entorno.',
      url: '#',
      icon: '❌'
    });
  }

  // Popular searches from translations t.raw('popularTerms') || 
  const popularSearches = ['Python', 'React', 'JavaScript', 'Machine Learning', 'Web Development'];

  useEffect(() => {
    if (isOpen) {
      // Focus input when overlay opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
      // Load recent searches from localStorage
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Filter search results based on query (would be API call in real implementation)
    const filtered = searchResults.filter(result =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setResults(filtered);
    setIsLoading(false);
    
    // Save to recent searches
    if (searchQuery.trim()) {
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleRecentSearch = (search: string) => {
    setQuery(search);
    handleSearch(search);
  };

  const handlePopularSearch = (search: string) => {
    setQuery(search);
    handleSearch(search);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex items-start justify-center pt-20 px-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={t('placeholder')}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {!query && (
              <div className="p-6 space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {t('recentSearches')}
                    </h3>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentSearch(search)}
                          className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {t('popularSearches')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => handlePopularSearch(search)}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            {query && (
              <div className="p-6">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">{t('loading')}</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-4">
                    {results.map((result) => (
                      <Link
                        key={result.id}
                        href={result.url}
                        onClick={onClose}
                        className="block p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{result.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {result.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {result.description}
                            </p>
                            <div className="mt-2">
                              <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                {t(`types.${result.type}`)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t('noResults')}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {t('noResultsDescription')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 