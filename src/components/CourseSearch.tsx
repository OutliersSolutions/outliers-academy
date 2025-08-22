'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { CourseGridSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search, BookOpen, Filter } from 'lucide-react';
import { CheckoutButton } from './CheckoutButton';
import { AddToCartButton } from './AddToCartButton';
import Link from 'next/link';

interface Course {
  id: number;
  title?: string;
  name?: string;
  description: string;
  price: number;
  image?: string;
  slug: string;
  duration?: number;
  level?: string;
  rating?: number;
  students?: number;
  product_id?: number;
  published?: boolean;
  category?: string;
}

interface CourseSearchProps {
  searchTerm: string;
  selectedCategory: string;
  selectedLevel: string;
  sortBy: string;
  viewMode?: 'grid' | 'list';
  onResultsChange?: (total: number, filtered: number) => void;
  onClearSearch?: () => void;
  onClearFilters?: () => void;
}

export function CourseSearch({ 
  searchTerm, 
  selectedCategory, 
  selectedLevel, 
  sortBy,
  viewMode = 'grid',
  onResultsChange,
  onClearSearch,
  onClearFilters
}: CourseSearchProps) {
  const tCommon = useTranslations('common');
  const tCourse = useTranslations('course');
  const tDefaults = useTranslations('courses.defaults');
  const tStats = useTranslations('courses.stats');
  const tEmptyStates = useTranslations('emptyStates');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  // Fetch all courses
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/courses', {
        cache: 'no-store'
      });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      
      const data = await res.json();
      const coursesArray = Array.isArray(data) ? data : (data.courses || []);
      
      const mappedCourses = coursesArray.map((course: any) => ({
        ...course,
        name: course.title || course.name || tDefaults('untitledCourse'),
        description: (course.description || tDefaults('courseDescription'))
          .replace(/<[^>]*>/g, '') // Remove ALL HTML tags including spans
          .replace(/&nbsp;/g, ' ') // Replace &nbsp; with spaces
          .replace(/&lt;/g, '<') // Replace HTML entities
          .replace(/&gt;/g, '>') 
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .trim(),
        image: course.image,
        duration: course.duration || 0,
        level: course.level || tDefaults('defaultLevel'),
        rating: course.rating || 0,
        students: course.students || 0,
        price: Math.round((course.price || 0) * 100) / 100
      }));
      
      setCourses(mappedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to load courses');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [tDefaults]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = courses;

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(course => 
        (course.name || '').toLowerCase().includes(search) ||
        (course.description || '').toLowerCase().includes(search) ||
        (course.level || '').toLowerCase().includes(search)
      );
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(course => 
        (course.category || '').toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply level filter
    if (selectedLevel && selectedLevel !== 'all') {
      filtered = filtered.filter(course => 
        (course.level || '').toLowerCase().includes(selectedLevel.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered = filtered.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'price-low':
        filtered = filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'popular':
      default:
        filtered = filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
        break;
    }

    return filtered;
  }, [courses, searchTerm, selectedCategory, selectedLevel, sortBy]);

  // Notify parent of results change
  const notifyResultsChange = useCallback(() => {
    if (onResultsChange) {
      onResultsChange(courses.length, filteredCourses.length);
    }
  }, [onResultsChange, courses.length, filteredCourses.length]);

  useEffect(() => {
    notifyResultsChange();
  }, [notifyResultsChange]);

  // Function to get level colors
  const getLevelColor = useCallback((level: string) => {
    const normalizedLevel = level.toLowerCase();
    if (normalizedLevel.includes('principiante') || normalizedLevel.includes('beginner') || normalizedLevel.includes('básico') || normalizedLevel.includes('basic')) {
      return 'bg-green-500';
    } else if (normalizedLevel.includes('intermedio') || normalizedLevel.includes('intermediate')) {
      return 'bg-yellow-500';
    } else if (normalizedLevel.includes('avanzado') || normalizedLevel.includes('advanced')) {
      return 'bg-red-500';
    }
    return 'bg-blue-500';
  }, []);

  const formatDuration = useCallback((duration: number) => {
    if (duration === 0) return tStats('notAvailable');
    if (duration < 1) {
      const minutes = Math.round(duration * 60);
      return `${minutes} ${tStats('minutes')}`;
    }
    const hours = Math.round(duration);
    return `${hours} ${hours === 1 ? tStats('hour') : tStats('hours')}`;
  }, [tStats]);

  if (loading) {
    return <CourseGridSkeleton count={6} />;
  }

  if (error) {
    return (
      <EmptyState
        icon={BookOpen}
        title={tEmptyStates('error.title')}
        description={tEmptyStates('error.description')}
        actionLabel={tEmptyStates('error.action')}
        onAction={() => window.location.reload()}
        variant="error"
      />
    );
  }

  // Show search empty state if searching and no results
  if (searchTerm.trim() && filteredCourses.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title={tEmptyStates('search.title')}
        description={tEmptyStates('search.description')}
        actionLabel={tEmptyStates('search.action')}
        onAction={onClearSearch}
        variant="search"
      />
    );
  }

  // Show filter empty state if filtering and no results
  if ((selectedCategory !== 'all' || selectedLevel !== 'all') && filteredCourses.length === 0) {
    return (
      <EmptyState
        icon={Filter}
        title={tEmptyStates('search.title')}
        description="No encontramos cursos con estos filtros. Prueba con otros criterios."
        actionLabel="Limpiar filtros"
        onAction={onClearFilters}
        variant="search"
      />
    );
  }

  // Show general empty state if no courses at all
  if (courses.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title={tEmptyStates('courses.title')}
        description={tEmptyStates('courses.description')}
        actionLabel={tEmptyStates('courses.action')}
        actionHref={`/${locale}/catalog`}
        variant="courses"
      />
    );
  }

  return (
    <div 
      key={viewMode} // Fuerza el re-render con animación cuando cambia el viewMode
      className={`transition-all duration-500 ease-in-out ${viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
        : "space-y-6"
      }`}
    >
      {filteredCourses.map((c) => {
        const courseName = c.name || c.title || tDefaults('untitledCourse');
        
        if (viewMode === 'list') {
          // Vista de lista
          return (
            <div key={c.id} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Imagen del curso */}
                <Link href={`/${locale}/course/${c.slug}/overview`} className="block md:w-64 flex-shrink-0">
                  <div className="relative h-48 md:h-full overflow-hidden">
                    {c.image ? (
                      <img 
                        src={c.image} 
                        alt={courseName}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400/30 via-purple-400/25 to-amber-400/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white drop-shadow-lg">
                          {courseName.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-md">
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">${c.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
                
                {/* Contenido del curso */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <Link href={`/${locale}/course/${c.slug}/overview`}>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer">
                        {courseName}
                      </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {c.description || tCommon('learnNewSkills')}
                    </p>
                    
                    {/* Metadatos en lista */}
                    <div className="flex flex-wrap gap-3 mb-4 text-sm">
                      <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDuration(c.duration ?? 0)}
                      </span>
                      <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                        <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {(c.rating ?? 0) > 0 ? (c.rating ?? 0).toFixed(1) : tStats('notAvailable')}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getLevelColor(c.level || tDefaults('defaultLevel'))}`}>
                        {c.level || tDefaults('defaultLevel')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Botones de acción en lista */}
                  <div className="flex gap-3">
                    <Link
                      href={`/${locale}/course/${c.slug}/overview`}
                      className="flex-1 text-center px-4 py-2 border border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-500 hover:text-white rounded-lg font-semibold transition-all duration-300 text-sm"
                    >
                      {tCourse('viewDetails')}
                    </Link>
                    <AddToCartButton
                      courseId={c.id}
                      productId={c.product_id}
                      courseName={courseName}
                      variant="outline"
                      className="text-sm px-4 py-2"
                    />
                    <CheckoutButton courseId={c.id} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                      {tCourse('enroll')}
                    </CheckoutButton>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        // Vista de grid (existente)
        return (
          <div key={c.id} className="group relative bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transform hover:scale-[1.02] hover:-translate-y-1 flex flex-col min-h-[520px]">
            {/* Course Image */}
            <Link href={`/${locale}/course/${c.slug}/overview`}>
              <div className="relative h-48 overflow-hidden cursor-pointer">
                {c.image ? (
                  <img 
                    src={c.image} 
                    alt={courseName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                        fallback.classList.remove('hidden');
                      }
                    }}
                    onLoad={(e) => {
                      const target = e.target as HTMLImageElement;
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'none';
                        fallback.classList.add('hidden');
                      }
                    }}
                  />
                ) : null}
                <div className={`w-full h-full bg-gradient-to-br from-blue-400/30 via-purple-400/25 to-amber-400/20 flex items-center justify-center relative ${c.image ? 'hidden' : 'flex'}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-white/10"></div>
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 right-8 w-4 h-4 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                  <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                    <span className="text-2xl font-bold text-white drop-shadow-lg font-mono">
                      {courseName.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500" />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 backdrop-blur-sm px-3 py-1 rounded-xl shadow-lg border border-blue-200 dark:border-blue-500">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-sm font-mono">${c.price.toFixed(2)}</span>
                </div>
                <div className={`absolute bottom-4 left-4 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30 ${getLevelColor(c.level || tDefaults('defaultLevel'))}`}>
                  <span className="text-white text-xs font-semibold font-mono">
                    {c.level || tDefaults('defaultLevel')}
                  </span>
                </div>
              </div>
            </Link>
            {/* Course Content */}
            <div className="p-6 flex-1 flex flex-col">
              <Link href={`/${locale}/course/${c.slug}/overview`}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer leading-tight line-clamp-2 min-h-[3.5rem]">
                  {courseName}
                </h3>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed text-sm flex-1 min-h-[4rem]">
                {c.description || tCommon('learnNewSkills')}
              </p>
              <div className="flex items-center justify-between mb-4 text-xs gap-2">
                <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg border border-blue-200 dark:border-blue-700 flex-shrink-0">
                  <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 font-mono">
                    {formatDuration(c.duration ?? 0)}
                  </span>
                </span>
                
                <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-700 flex-shrink-0">
                  <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
                    {(c.rating ?? 0) > 0 ? (c.rating ?? 0).toFixed(1) : tStats('notAvailable')}
                  </span>
                </span>
              </div>
              <div className="text-xs mb-4 bg-purple-50 dark:bg-purple-900/30 px-3 py-2 rounded-xl border border-purple-200 dark:border-purple-700">
                <span className="font-semibold text-purple-600 dark:text-purple-400 font-mono">
                  {(c.students ?? 0) > 0 
                    ? `${(c.students ?? 0).toLocaleString()} ${tStats('students')}`
                    : `0 ${tStats('students')}`
                  }
                </span>
              </div>
              <div className="space-y-2">
                <Link
                  href={`/${locale}/course/${c.slug}/overview`}
                  className="group/cta w-full inline-flex items-center justify-center px-4 py-2 border border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white rounded-xl font-semibold transition-all duration-300 text-sm relative overflow-hidden"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    {tCourse('viewDetails')}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700"></div>
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <AddToCartButton
                    courseId={c.id}
                    productId={c.product_id}
                    courseName={courseName}
                    variant="outline"
                    className="text-xs py-2"
                  />
                  <CheckoutButton courseId={c.id} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 text-xs">
                    {tCourse('enroll')}
                  </CheckoutButton>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-amber-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-amber-500/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
            
            {/* Call to action overlay - se muestra en hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
              <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-lg transform scale-95 group-hover:scale-100 transition-all duration-300">
                <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Haz clic para más información
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}