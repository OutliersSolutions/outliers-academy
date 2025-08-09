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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((c) => (
        <Link key={c.id} href={`course/${c.slug}`} className="group">
          <div className="card overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">{c.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-2">{c.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-primary font-bold group-hover:text-accent transition-colors">
                  Ver curso
                  <svg className="w-4 h-4 inline ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                {c.price && c.price > 0 && (
                  <div className="text-lg font-bold text-neutral-900">
                    ${c.price}
                  </div>
                )}
                {(!c.price || c.price === 0) && (
                  <div className="text-lg font-bold text-green-600">
                    Gratis
                  </div>
                )}
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