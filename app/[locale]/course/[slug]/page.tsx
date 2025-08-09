import {notFound} from 'next/navigation';
import Link from 'next/link';
import {CheckoutButton} from '@/components/CheckoutButton';
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

async function getCourse(slug: string): Promise<Course | null> {
  try {
    const courses = await fetchCourses();
    return courses.find((c: Course) => c.slug === slug) || null;
  } catch (e) {
    console.error('Error fetching course:', e);
    return null;
  }
}

export default async function CoursePage({
  params
}: {
  params: {slug: string; locale: string}
}) {
  const course = await getCourse(params.slug);
  const locale = params.locale || 'es';
  
  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg to-surface/30">
      <div className="container py-8">
        <nav className="flex items-center gap-2 text-sm text-neutral-600 mb-8">
          <Link href={`/${locale}`} className="hover:text-primary">Inicio</Link>
          <span>›</span>
          <Link href={`/${locale}/catalog`} className="hover:text-primary">Catálogo</Link>
          <span>›</span>
          <span className="text-neutral-900">{course.title}</span>
        </nav>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="mb-8">
              <h1 className="h1-hero mb-4">{course.title}</h1>
              <p className="p-lead text-xl mb-6">{course.description}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                    Disponible
                  </span>
                </div>

                <div className="absolute bottom-6 right-6">
                  <button className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105">
                    <svg className="w-6 h-6 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Acerca de este curso</h3>
                  <p className="text-neutral-700 leading-relaxed">{course.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">¿Qué incluye este curso?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-neutral-700">Acceso completo al contenido</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-neutral-700">Certificado de finalización</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-neutral-700">Soporte del instructor</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-neutral-700">Acceso de por vida</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="text-center mb-6">
                  {course.price && course.price > 0 ? (
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-primary">${course.price}</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-green-600 mb-2">Gratis</div>
                  )}
                  <p className="text-sm text-neutral-600">Acceso completo al curso</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-neutral-700">Contenido estructurado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-neutral-700">Material descargable</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-neutral-700">Acceso de por vida</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {course.product_id ? (
                    <CheckoutButton 
                      priceId={course.product_id.toString()}
                      courseId={course.id}
                      successUrl={`${process.env.NEXT_PUBLIC_APP_URL || ''}/${locale}/course/${params.slug}/success`}
                      cancelUrl={`${process.env.NEXT_PUBLIC_APP_URL || ''}/${locale}/course/${params.slug}`}
                      className="w-full btn-primary btn-lg justify-center"
                    >
                      {course.price && course.price > 0 ? 'Comprar curso' : 'Inscribirse gratis'}
                    </CheckoutButton>
                  ) : (
                    <div className="w-full btn-secondary btn-lg justify-center opacity-50 cursor-not-allowed">
                      No disponible
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
                  <p className="text-sm text-neutral-600 mb-2">💰 Garantía de devolución de 30 días</p>
                  <p className="text-sm text-neutral-600">🎓 Únete a nuestra comunidad de aprendizaje</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 