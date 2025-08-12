import Link from 'next/link';
import {fetchCourses} from '@/lib/odooClient';

interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  price?: number;
  product_id?: number;
  published?: boolean;
}

export async function CourseGrid() {
  let courses: Course[] = [];
  let error: string | null = null;
  
  try {
    const data = await fetchCourses();
    courses = data;
  } catch (e) {
    error = e instanceof Error ? e.message : 'Error loading courses';
    console.error('CourseGrid error:', e);
  }

  if (error) {
    return (
      <div className="col-span-full text-center py-12">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-neutral-700 mb-2">Error cargando cursos</h3>
        <p className="text-neutral-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((c) => (
        <Link key={c.id} href={`course/${c.slug}`} className="group">
          <div className="card overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-[400px] flex flex-col">
            {/* Header Image - Fixed Height */}
            <div className="h-48 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="absolute bottom-6 left-4 w-1.5 h-1.5 bg-white/20 rounded-full"></div>
              </div>
            </div>
            
            {/* Content - Flexible Height */}
            <div className="p-5 flex flex-col flex-1">
              {/* Title - Fixed 2 lines max */}
              <h3 className="font-bold text-lg leading-tight mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2 min-h-[3.5rem]">
                {c.title}
              </h3>
              
              {/* Description - Fixed 2 lines */}
              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
                {c.description || 'Aprende nuevas habilidades con este curso interactivo.'}
              </p>
              
              {/* Spacer to push footer to bottom */}
              <div className="flex-1"></div>
              
              {/* Footer - Fixed Height */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center text-primary font-semibold text-sm group-hover:text-accent transition-colors duration-200">
                  <span>Ver curso</span>
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                
                {/* Price Badge */}
                <div className="flex items-center">
                  {c.price && c.price > 0 ? (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                      ${c.price}
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                      Gratis
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      
      {courses.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-700 mb-2">No hay cursos disponibles</h3>
          <p className="text-neutral-500">Los cursos aparecerán aquí cuando estén publicados en Odoo</p>
        </div>
      )}
    </div>
  );
} 