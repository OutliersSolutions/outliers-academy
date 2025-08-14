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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      {/* Gradientes de fondo que cambian con el tema */}
      <div className="absolute inset-0">
        {/* Gradiente principal */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-50/30 to-pink-50/20 dark:from-blue-600/30 dark:via-purple-600/20 dark:to-pink-600/10"></div>
        
        {/* Elementos decorativos con gradientes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/60 via-purple-200/40 to-transparent dark:from-blue-400/40 dark:via-purple-500/30 dark:to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-pink-200/50 via-purple-200/30 to-transparent dark:from-pink-400/30 dark:via-purple-400/20 dark:to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-indigo-200/40 via-blue-200/25 to-transparent dark:from-indigo-400/25 dark:via-blue-400/15 dark:to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Patrón de puntos decorativo */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute top-32 left-20 w-2 h-2 bg-gray-600 dark:bg-white rounded-full animate-ping"></div>
          <div className="absolute top-64 right-32 w-1 h-1 bg-blue-500 dark:bg-blue-300 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-500 dark:bg-purple-300 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-80 left-3/4 w-1 h-1 bg-pink-500 dark:bg-pink-300 rounded-full animate-ping" style={{animationDelay: '5s'}}></div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Header mejorado */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-600 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
              <span className="font-mono">CATÁLOGO</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-100 dark:to-purple-200 bg-clip-text text-transparent">
                {t('title') || 'Catálogo de Cursos'}
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              {t('description') || 'Descubre el curso perfecto para llevar tus habilidades al siguiente nivel'}
            </p>
          </div>

          {/* Panel de filtros mejorado */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-white/20 p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2">
                <label htmlFor="search" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">
                  {t('search.label') || 'Buscar cursos'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl leading-5 bg-white/80 dark:bg-gray-700/80 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300 text-gray-800 dark:text-gray-200 font-medium"
                    placeholder={t('search.placeholder') || 'Buscar por título, tecnología o instructor...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">
                  {t('filters.category') || 'Categoría'}
                </label>
                <select
                  id="category"
                  className="w-full py-4 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300 bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 font-medium"
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
                <label htmlFor="level" className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">
                  {t('filters.level') || 'Nivel'}
                </label>
                <select
                  id="level"
                  className="w-full py-4 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300 bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 font-medium"
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

            <div className="flex flex-wrap items-center justify-between mt-8 pt-8 border-t-2 border-gray-200/50 dark:border-gray-600/50">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  {t('sort.label') || 'Ordenar por:'}
                </span>
                <select
                  className="py-3 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300 bg-white/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 text-sm font-medium"
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
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  {t('view.label') || 'Ver como:'}
                </span>
                <div className="flex border-2 border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                  <button className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button className="p-3 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filtros activos mejorados */}
          {(searchTerm || selectedLevel !== 'all' || selectedCategory !== 'all') && (
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <span className="text-sm font-bold text-gray-800 dark:text-white/90">
                {t('activeFilters') || 'Filtros activos:'}
              </span>
              
              {searchTerm && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                  {t('searchFilter') || 'Búsqueda'}: &quot;{searchTerm}&quot;
                  <button
                    onClick={() => setSearchTerm('')}
                    className="hover:bg-white/20 rounded-full p-1 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/90 to-purple-600/90 text-white rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="hover:bg-white/20 rounded-full p-1 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              
              {selectedLevel !== 'all' && (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/90 to-pink-600/90 text-white rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                  {levels.find(l => l.id === selectedLevel)?.name}
                  <button
                    onClick={() => setSelectedLevel('all')}
                    className="hover:bg-white/20 rounded-full p-1 transition-colors"
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
                className="text-sm text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white underline font-medium transition-colors"
              >
                {t('clearFilters') || 'Limpiar filtros'}
              </button>
            </div>
          )}

          {/* Contador de resultados mejorado */}
          <div className="mb-8">
            <p className="text-gray-700 dark:text-white/90 font-medium text-lg">
              {t('results.showing') || 'Mostrando'} <span className="font-bold text-blue-600 dark:text-blue-300">2</span> {t('results.of') || 'cursos de'} <span className="font-bold text-blue-600 dark:text-blue-300">2</span> {t('results.available') || 'disponibles'}
            </p>
          </div>

          {/* Grid de cursos */}
          <CourseGridClient />

          {/* Paginación mejorada */}
          <div className="mt-20 flex justify-center">
            <nav className="flex items-center space-x-4">
              <button 
                className="group px-8 py-4 text-sm font-bold bg-gradient-to-r from-gray-400/80 to-gray-500/80 dark:from-gray-600/80 dark:to-gray-700/80 text-gray-700 dark:text-white/60 rounded-2xl shadow-lg border border-gray-300/30 dark:border-white/10 cursor-not-allowed backdrop-blur-sm" 
                disabled
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t('pagination.previous') || 'Anterior'}
                </div>
              </button>
              
              <button className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-white/30 backdrop-blur-sm">
                1
              </button>
              
              <button className="group px-8 py-4 text-sm font-bold bg-gradient-to-r from-gray-100/90 to-gray-200/90 dark:from-white/90 dark:to-white/80 text-gray-800 dark:text-gray-800 hover:from-blue-500 hover:to-purple-500 hover:text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-300/30 dark:border-white/30 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  {t('pagination.next') || 'Siguiente'}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
} 