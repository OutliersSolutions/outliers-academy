'use client';
import { useTranslations } from 'next-intl';
import { CheckoutButton } from './CheckoutButton';
import { AddToCartButton } from './AddToCartButton';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CourseGridSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { BookOpen } from 'lucide-react';
interface Course {
  id: number;
  title?: string; // From Odoo API
  name?: string;  // For fallback compatibility
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
}
export function CourseGridClient() {
  const tCommon = useTranslations('common');
  const tCourse = useTranslations('course');
  const tDefaults = useTranslations('courses.defaults');
  const tStats = useTranslations('courses.stats');
  const tCatalog = useTranslations('catalog');
  const tEmptyStates = useTranslations('emptyStates');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  // Function to get level colors based on difficulty
  const getLevelColor = (level: string) => {
    const normalizedLevel = level.toLowerCase();
    if (normalizedLevel.includes('principiante') || normalizedLevel.includes('beginner') || normalizedLevel.includes('básico') || normalizedLevel.includes('basic')) {
      return 'bg-green-500'; // Verde para principiante
    } else if (normalizedLevel.includes('intermedio') || normalizedLevel.includes('intermediate')) {
      return 'bg-yellow-500'; // Amarillo para intermedio
    } else if (normalizedLevel.includes('avanzado') || normalizedLevel.includes('advanced')) {
      return 'bg-red-500'; // Rojo para avanzado
    }
    return 'bg-blue-500'; // Azul por defecto
  };

  // Function to format duration with proper units
  const formatDuration = (duration: number) => {
    if (duration === 0) return tStats('notAvailable');
    if (duration < 1) {
      const minutes = Math.round(duration * 60);
      return `${minutes} ${tStats('minutes')}`;
    }
    const hours = Math.round(duration);
    return `${hours} ${hours === 1 ? tStats('hour') : tStats('hours')}`;
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch only top 6 courses ordered by popularity (members_count)
        const res = await fetch(`/api/courses/top`, {
          cache: 'no-store'
        });
        if (res.ok) {
          const data = await res.json();
          // Handle both array and object responses
          const coursesArray = Array.isArray(data) ? data : (data.courses || []);
          // Map the courses to add missing fields and normalize data
          const mappedCourses = coursesArray.map((course: any) => ({
            ...course,
            name: course.title || course.name || tDefaults('untitledCourse'),
            // Clean HTML tags from description
            description: (course.description || tDefaults('courseDescription'))
              .replace(/<[^>]*>/g, '') // Remove HTML tags
              .replace(/&nbsp;/g, ' ') // Replace &nbsp; with spaces
              .trim(),
            // Use only real Odoo image URL - no fallback to avoid broken images
            image: course.image,
            // Use only real data from Odoo - no mock data
            duration: course.duration || 0,
            level: course.level || tDefaults('defaultLevel'),
            rating: course.rating || 0,
            students: course.students || 0,
            // Fix price precision issues
            price: Math.round((course.price || 0) * 100) / 100
          }));
          setCourses(mappedCourses);
        } else {
          console.warn('No courses data received from API');
          setCourses([]);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [locale, tDefaults, tStats, tCatalog]);
  if (loading) {
    return <CourseGridSkeleton count={6} />;
  }
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((c) => {
        const courseName = c.name || c.title || tDefaults('untitledCourse');
        return (
          <div key={c.id} className="group relative bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transform hover:scale-[1.02] hover:-translate-y-1 flex flex-col min-h-[520px]">
          {/* Course Image */}
            <Link href={`/${locale}/course/${c.slug}/overview`}>
              <div className="relative h-48 overflow-hidden cursor-pointer">
                {/* Course Image with improved error handling */}
                {c.image ? (
                  <img 
                    src={c.image} 
                    alt={courseName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback to gradient design if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                        fallback.classList.remove('hidden');
                      }
                    }}
                    onLoad={(e) => {
                      // Hide fallback if image loads successfully
                      const target = e.target as HTMLImageElement;
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'none';
                        fallback.classList.add('hidden');
                      }
                    }}
                  />
                ) : null}
                {/* Fallback gradient design */}
                <div className={`w-full h-full bg-gradient-to-br from-blue-400/30 via-purple-400/25 to-amber-400/20 flex items-center justify-center relative ${c.image ? 'hidden' : 'flex'}`}>
                  {/* Tech pattern background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-white/10"></div>
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 right-8 w-4 h-4 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                  {/* Tech-style course icon */}
                  <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                    <span className="text-2xl font-bold text-white drop-shadow-lg font-mono">
                      {courseName.charAt(0)}
                    </span>
                  </div>
                  {/* Grid pattern overlay */}
                  <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500" />
                {/* Price Badge tech style */}
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 backdrop-blur-sm px-3 py-1 rounded-xl shadow-lg border border-blue-200 dark:border-blue-500">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-sm font-mono">${c.price.toFixed(2)}</span>
                </div>
                {/* Level badge with appropriate colors - Always visible */}
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
              {/* Course Meta - Improved layout for missing data */}
              <div className="flex items-center justify-between mb-4 text-xs gap-2">
                {/* Duration Badge */}
                <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg border border-blue-200 dark:border-blue-700 flex-shrink-0">
                  <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 font-mono">
                    {formatDuration(c.duration ?? 0)}
                  </span>
                </span>
                
                {/* Rating Badge */}
                <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-700 flex-shrink-0">
                  <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
                    {(c.rating ?? 0) > 0 ? (c.rating ?? 0).toFixed(1) : tStats('notAvailable')}
                  </span>
                </span>
              </div>
              {/* Students Count - Always visible with consistent styling */}
              <div className="text-xs mb-4 bg-purple-50 dark:bg-purple-900/30 px-3 py-2 rounded-xl border border-purple-200 dark:border-purple-700">
                <span className="font-semibold text-purple-600 dark:text-purple-400 font-mono">
                  {(c.students ?? 0) > 0 
                    ? `${(c.students ?? 0).toLocaleString()} ${tStats('students')}`
                    : `0 ${tStats('students')}`
                  }
                </span>
              </div>
              {/* Action Buttons tech style */}
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
                  {/* Efecto de brillo en hover */}
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
            {/* Tech hover effect */}
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
