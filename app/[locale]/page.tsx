import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {CourseGrid} from '@/components/CourseGrid';
import type {Route} from 'next';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div>
      <section className="hero-gradient relative overflow-hidden">
        <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-text mb-6">
                <span className="h-2 w-2 rounded-full animate-pulse" style={{background: 'var(--color-yellow)'}} /> 
                {t('badge')}
              </span>
              
              <h1 className="h1-hero mb-6">
                {t('headline.part1')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('headline.highlight')}</span> {t('headline.part2')}
              </h1>
              
              <p className="p-lead mb-8 max-w-xl">{t('subhead')}</p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <Link href={"/es/catalog" as Route} className="btn-primary btn-lg group">
                  {t('cta.primary')}
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href={"/es/about" as Route} className="btn-secondary group">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6" />
                  </svg>
                  {t('cta.secondary')}
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-red-400 border-2 border-white"></div>
                  </div>
                  <span className="font-medium">+10,000 estudiantes</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="font-medium">4.8 (2,340 reseñas)</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  
                  <div className="flex items-center justify-center h-48 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg mb-4 relative overflow-hidden">
                    <div className="w-32 h-32 relative">
                      <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 text-xs text-neutral-500 bg-white px-2 py-1 rounded-full">
                      AI Assistant
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded"></div>
                    <div className="bg-gray-200 h-3 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-accent text-white rounded-lg px-3 py-2 text-sm font-semibold shadow-lg">
                IA Interactiva
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-accent/10 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-primary/10 to-transparent rounded-full translate-y-20 -translate-x-20"></div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="h2-section mb-4">{t('topCourses')}</h2>
            <p className="p-lead max-w-2xl mx-auto">{t('topCoursesDesc')}</p>
          </div>
          <CourseGrid />
          
          <div className="text-center mt-12">
            <Link href={"/es/catalog" as Route} className="btn-outline">
              Ver todos los cursos
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-br from-surface to-secondary/20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="h2-section mb-4">{t('platform.title')}</h2>
            <p className="p-lead max-w-2xl mx-auto">Una experiencia de aprendizaje diseñada para llevarte del concepto a la práctica</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="card p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">{t('platform.guidance.title')}</h3>
                <p className="p-lead text-neutral-600">{t('platform.guidance.desc')}</p>
              </div>
            </div>
            
            <div className="group">
              <div className="card p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">{t('platform.editor.title')}</h3>
                <p className="p-lead text-neutral-600">{t('platform.editor.desc')}</p>
              </div>
            </div>
            
            <div className="group">
              <div className="card p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">{t('platform.live.title')}</h3>
                <p className="p-lead text-neutral-600">{t('platform.live.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container">
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para transformar tu carrera?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">Únete a miles de profesionales que ya están construyendo su futuro en tecnología</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={"/es/catalog" as Route} className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Comenzar ahora
                </Link>
                <Link href={"/es/pricing" as Route} className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors">
                  Ver precios
                </Link>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          </div>
        </div>
      </section>
    </div>
  );
} 