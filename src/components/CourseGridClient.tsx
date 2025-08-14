'use client';

import { useTranslations } from 'next-intl';
import { CheckoutButton } from './CheckoutButton';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

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
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/courses`, {
          cache: 'no-store'
        });
        
        if (res.ok) {
          const data = await res.json();
          
          // Handle both array and object responses
          const coursesArray = Array.isArray(data) ? data : (data.courses || []);
          
          // Map the courses to add missing fields and normalize data
          const mappedCourses = coursesArray.map((course: any) => ({
            ...course,
            name: course.title || course.name || 'Curso sin título',
            description: course.description || 'Descripción del curso',
            image: course.image || `/images/course-${course.id}.jpg`,
            duration: course.duration || Math.floor(Math.random() * 20) + 5,
            level: course.level || (locale === 'es' ? 'Intermedio' : 'Intermediate'),
            rating: course.rating || (4 + Math.random()),
            students: course.students || Math.floor(Math.random() * 1000) + 100
          }));
          
          setCourses(mappedCourses);
        } else {
          // Fallback data for development
          const fallbackCourses = [
            {
              id: 1,
              name: "Docker para D",
              title: "Docker para D",
              description: "Aprende los fundamentos de Docker desde cero",
              price: 99.99,
              image: "/images/docker-course.jpg",
              slug: "docker-para-d-1",
              duration: 8,
              level: "Principiante",
              rating: 4.8,
              students: 1250
            },
            {
              id: 2,
              name: "Crea tu primera Waifu: Hipoteticamente",
              title: "Crea tu primera Waifu: Hipoteticamente",
              description: "Desarrollo de aplicaciones con IA generativa",
              price: 99.99,
              image: "/images/waifu-course.jpg",
              slug: "crea-tu-primera-waifu-hipoteticamente-2",
              duration: 12,
              level: "Intermedio",
              rating: 4.9,
              students: 890
            },
            {
              id: 3,
              name: "Machine Learning Básico",
              title: "Machine Learning Básico",
              description: "Introducción a la inteligencia artificial y ML",
              price: 99.99,
              image: "/images/ml-course.jpg",
              slug: "machine-learning-basics",
              duration: 10,
              level: "Intermedio",
              rating: 4.7,
              students: 650
            }
          ];
          setCourses(fallbackCourses);
        }
      } catch (error) {
        // Fallback data for development
        const errorFallbackCourses = [
          {
            id: 1,
            name: "Docker para D",
            title: "Docker para D",
            description: "Aprende los fundamentos de Docker desde cero",
            price: 99.99,
            image: "/images/docker-course.jpg",
            slug: "docker-para-d-1",
            duration: 8,
            level: "Principiante",
            rating: 4.8,
            students: 1250
          },
          {
            id: 2,
            name: "Crea tu primera Waifu: Hipoteticamente",
            title: "Crea tu primera Waifu: Hipoteticamente",
            description: "Desarrollo de aplicaciones con IA generativa",
            price: 99.99,
            image: "/images/waifu-course.jpg",
            slug: "crea-tu-primera-waifu-hipoteticamente-2",
            duration: 12,
            level: "Intermedio",
            rating: 4.9,
            students: 890
          },
          {
            id: 3,
            name: "Machine Learning Básico",
            title: "Machine Learning Básico",
            description: "Introducción a la inteligencia artificial y ML",
            price: 99.99,
            image: "/images/ml-course.jpg",
            slug: "machine-learning-basics",
            duration: 10,
            level: "Intermedio",
            rating: 4.7,
            students: 650
          }
        ];
        setCourses(errorFallbackCourses);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [locale]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No hay cursos disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((c) => {
        const courseName = c.name || c.title || 'Curso sin título';
        
        return (
          <div key={c.id} className="group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-200/50 dark:border-white/20 hover:border-gray-300/70 dark:hover:border-white/30 transform hover:scale-105">
          {/* Course Image */}
            <Link href={`/${locale}/course/${c.slug}/overview`}>
              <div className="relative h-56 overflow-hidden cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-blue-500/80 via-purple-500/70 to-pink-500/60 flex items-center justify-center relative">
                  {/* Patrón decorativo de fondo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 right-8 w-4 h-4 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                  
                  {/* Letra del curso con efecto glassmorphism */}
                  <div className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                    <span className="text-3xl font-bold text-white drop-shadow-lg">
                      {courseName.charAt(0)}
                    </span>
              </div>
            </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500" />
            
                {/* Price Badge mejorado */}
                <div className="absolute top-6 right-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-xl border border-gray-200/50 dark:border-white/30">
                  <span className="font-bold text-gray-800 dark:text-gray-200 text-lg">${c.price}</span>
          </div>

                {/* Nivel badge */}
                {c.level && (
                  <div className="absolute bottom-6 left-6 bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                    <span className="text-white text-sm font-semibold">{c.level}</span>
                  </div>
                )}
              </div>
            </Link>

          {/* Course Content */}
            <div className="p-8">
              <Link href={`/${locale}/course/${c.slug}/overview`}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer leading-tight">
                  {courseName}
            </h3>
              </Link>
            
              <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-2 leading-relaxed">
              {c.description || tCommon('learnNewSkills')}
            </p>

              {/* Course Meta mejorado */}
              <div className="flex items-center justify-between mb-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-6">
                {c.duration && (
                    <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{c.duration}h</span>
                  </span>
                )}
                </div>
                {c.rating && (
                  <span className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{c.rating.toFixed(1)}</span>
                  </span>
                )}
              </div>

              {/* Students Count mejorado */}
              {c.students && (
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 bg-blue-50 dark:bg-blue-900/30 px-3 py-2 rounded-xl">
                  <span className="font-semibold text-blue-700 dark:text-blue-300">
                    {c.students.toLocaleString()} {tCourse('students')} inscritos
                </span>
                </div>
              )}

              {/* Action Buttons mejorados */}
              <div className="space-y-3">
                <Link
                  href={`/${locale}/course/${c.slug}/overview`}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {tCourse('viewDetails')}
                </Link>
                <CheckoutButton courseId={c.id} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  {tCourse('enroll')}
                </CheckoutButton>
              </div>
            </div>

            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/5 group-hover:to-pink-400/10 transition-all duration-500 rounded-3xl pointer-events-none"></div>
          </div>
        );
      })}
    </div>
  );
} 