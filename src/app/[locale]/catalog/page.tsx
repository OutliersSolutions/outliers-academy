'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CourseGridClient } from '@/components/CourseGridClient';

interface CatalogPageProps {
  params: { locale: string }
}

export default function CatalogPage({ params }: CatalogPageProps) {
  const t = useTranslations('catalog');
  const tCommon = useTranslations('common');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: t('categories.all') || 'Todos los cursos' },
    { id: 'web', name: t('categories.web') || 'Desarrollo Web' },
    { id: 'data', name: t('categories.data') || 'Data Science' },
    { id: 'mobile', name: t('categories.mobile') || 'Desarrollo Móvil' },
    { id: 'ai', name: t('categories.ai') || 'Inteligencia Artificial' },
    { id: 'devops', name: t('categories.devops') || 'DevOps' },
    { id: 'design', name: t('categories.design') || 'Diseño UX/UI' }
  ];

  const levels = [
    { id: 'all', name: t('levels.all') || 'Todos los niveles' },
    { id: 'beginner', name: t('levels.beginner') || 'Principiante' },
    { id: 'intermediate', name: t('levels.intermediate') || 'Intermedio' },
    { id: 'advanced', name: t('levels.advanced') || 'Avanzado' }
  ];

  const sortOptions = [
    { id: 'popular', name: t('sort.popular') || 'Más populares' },
    { id: 'newest', name: t('sort.newest') || 'Más recientes' },
    { id: 'rating', name: t('sort.rating') || 'Mejor valorados' },
    { id: 'price-low', name: t('sort.priceLow') || 'Precio: menor a mayor' },
    { id: 'price-high', name: t('sort.priceHigh') || 'Precio: mayor a menor' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg to-surface/30">
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="h1-hero mb-6">{t('title') || 'Catálogo de Cursos'}</h1>
          <p className="p-lead max-w-2xl mx-auto">
            {t('description') || 'Descubre el curso perfecto para llevar tus habilidades al siguiente nivel'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-semibold text-neutral-700 mb-2">
                {t('search.label') || 'Buscar cursos'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-xl leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder={t('search.placeholder') || 'Buscar por título, tecnología o instructor...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-neutral-700 mb-2">
                {t('filters.category') || 'Categoría'}
              </label>
              <select
                id="category"
                className="w-full py-3 px-4 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-semibold text-neutral-700 mb-2">
                {t('filters.level') || 'Nivel'}
              </label>
              <select
                id="level"
                className="w-full py-3 px-4 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between mt-6 pt-6 border-t border-neutral-200">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-neutral-600">
                {t('sort.label') || 'Ordenar por:'}
              </span>
              <select
                className="py-2 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <span className="text-sm text-neutral-600">
                {t('view.label') || 'Ver como:'}
              </span>
              <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                <button className="p-2 bg-primary text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className="p-2 bg-white text-neutral-600 hover:bg-neutral-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {(searchTerm || selectedLevel !== 'all' || selectedCategory !== 'all') && (
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="text-sm font-medium text-neutral-600">
              {t('activeFilters') || 'Filtros activos:'}
            </span>
            
            {searchTerm && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {t('searchFilter') || 'Búsqueda'}: &quot;{searchTerm}&quot;
                <button
                  onClick={() => setSearchTerm('')}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                {categories.find(c => c.id === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="hover:bg-accent/20 rounded-full p-0.5"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            
            {selectedLevel !== 'all' && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold rounded-full text-sm">
                {levels.find(l => l.id === selectedLevel)?.name}
                <button
                  onClick={() => setSelectedLevel('all')}
                  className="hover:bg-gold/20 rounded-full p-0.5"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}
              className="text-sm text-neutral-500 hover:text-neutral-700 underline"
            >
              {t('clearFilters') || 'Limpiar filtros'}
            </button>
          </div>
        )}

        <div className="mb-6">
          <p className="text-neutral-600">
            {t('results.showing') || 'Mostrando'} <span className="font-semibold">2</span> {t('results.of') || 'cursos de'} <span className="font-semibold">2</span> {t('results.available') || 'disponibles'}
          </p>
        </div>

        <CourseGridClient />

        <div className="mt-16 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-700 disabled:opacity-50" disabled>
              {t('pagination.previous') || 'Anterior'}
            </button>
            
            <button className="px-3 py-2 text-sm font-medium bg-primary text-white rounded-lg">1</button>
            
            <button className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900">
              {t('pagination.next') || 'Siguiente'}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
} 