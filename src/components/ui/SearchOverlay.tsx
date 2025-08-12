'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, BookOpen, Code, Database, Globe, Shield, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'course' | 'path' | 'article' | 'project';
  description: string;
  duration?: string;
  level?: string;
  icon: React.ReactNode;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const t = useTranslations('search');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Mock search results - in real app, this would be an API call
  const mockSearchResults: SearchResult[] = [
    {
      id: '1',
      title: 'Python Fundamentals',
      type: 'course',
      description: 'Learn the basics of Python programming language',
      duration: '8 hours',
      level: 'Beginner',
      icon: <Code className="w-5 h-5" />
    },
    {
      id: '2',
      title: 'Web Development Path',
      type: 'path',
      description: 'Complete path to become a full-stack web developer',
      duration: '40 hours',
      level: 'Intermediate',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: '3',
      title: 'Data Science Essentials',
      type: 'course',
      description: 'Master data analysis and visualization',
      duration: '12 hours',
      level: 'Advanced',
      icon: <Database className="w-5 h-5" />
    },
    {
      id: '4',
      title: 'Cybersecurity Basics',
      type: 'course',
      description: 'Learn about network security and ethical hacking',
      duration: '10 hours',
      level: 'Intermediate',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: '5',
      title: 'AI and Machine Learning',
      type: 'path',
      description: 'Complete guide to artificial intelligence',
      duration: '50 hours',
      level: 'Advanced',
      icon: <Zap className="w-5 h-5" />
    }
  ];

  // Popular searches
  const popularSearches = [
    'Python', 'JavaScript', 'React', 'Data Science', 'Web Development', 'Machine Learning'
  ];

  // Recent searches (mock)
  const recentSearches = [
    'Python Basics', 'React Components', 'SQL Fundamentals'
  ];

  // Search function with debounce
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const filteredResults = mockSearchResults.filter(result =>
        result.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setResults(filteredResults);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on escape key
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

  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-4 h-4" />;
      case 'path':
        return <TrendingUp className="w-4 h-4" />;
      case 'article':
        return <BookOpen className="w-4 h-4" />;
      case 'project':
        return <Code className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'course':
        return t('types.course');
      case 'path':
        return t('types.path');
      case 'article':
        return t('types.article');
      case 'project':
        return t('types.project');
      default:
        return type;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="/icons/logo.png" alt="Outliers Academy" className="w-8 h-8 object-contain" />
                <span className="font-extrabold text-xl">
                  <span className="text-text">Outliers</span>{' '}
                  <span style={{color: 'var(--color-primary)'}}>Academy</span>
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="container mx-auto px-4 py-6">
          <div className="relative max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={inputRef}
                type="text"
                placeholder={t('placeholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:border-primary focus:outline-none transition-colors"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            {!query && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Popular Searches */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    {t('popularSearches')}
                  </h3>
                  <div className="space-y-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(search)}
                        className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                      >
                        <Search className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                        <span className="text-gray-700 dark:text-gray-300">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Searches */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    {t('recentSearches')}
                  </h3>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(search)}
                        className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                      >
                        <Clock className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                        <span className="text-gray-700 dark:text-gray-300">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            {query && (
              <div>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map((result) => (
                      <Link
                        key={result.id}
                        href={`/${locale}/course/${result.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                          {result.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                              {result.title}
                            </h4>
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                              {getTypeIcon(result.type)}
                              {getTypeLabel(result.type)}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">
                            {result.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            {result.duration && (
                              <span>{result.duration}</span>
                            )}
                            {result.level && (
                              <span>{result.level}</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t('noResults')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
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