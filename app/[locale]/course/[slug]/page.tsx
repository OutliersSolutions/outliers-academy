'use client';

import {useState} from 'react';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import {CheckoutButton} from '@/components/CheckoutButton';

// Mock course data for better showcase - in production this would come from Odoo API
const mockCourseData = {
  'python-fundamentals': {
    id: 1,
    title: 'Python Fundamentals',
    subtitle: 'Aprende los fundamentos de Python desde cero',
    description: 'Este curso completo te llevará desde los conceptos básicos de Python hasta proyectos prácticos. Perfecto para principiantes que quieren entrar al mundo de la programación.',
    instructor: {
      name: 'Dr. Ana García',
      title: 'Senior Python Developer',
      experience: '8+ años',
      students: 12500,
      rating: 4.9,
      image: '/images/instructors/ana-garcia.jpg'
    },
    level: 'Principiante',
    duration: '8 semanas',
    totalHours: 40,
    students: 1420,
    rating: 4.8,
    reviews: 324,
    price: 49,
    originalPrice: 79,
    image: '/icons/technologies/systems/python.svg',
    skills: ['Variables y tipos de datos', 'Estructuras de control', 'Funciones', 'POO', 'Manejo de archivos', 'APIs'],
    modules: [
      {
        id: 1,
        title: 'Introducción a Python',
        lessons: 5,
        duration: '2 horas',
        description: 'Configuración del entorno y primeros pasos'
      },
      {
        id: 2,
        title: 'Variables y Tipos de Datos',
        lessons: 8,
        duration: '3 horas',
        description: 'Manejo de diferentes tipos de datos en Python'
      },
      {
        id: 3,
        title: 'Estructuras de Control',
        lessons: 7,
        duration: '4 horas',
        description: 'If/else, loops y control de flujo'
      },
      {
        id: 4,
        title: 'Funciones y Módulos',
        lessons: 6,
        duration: '5 horas',
        description: 'Crear y usar funciones, importar módulos'
      },
      {
        id: 5,
        title: 'Programación Orientada a Objetos',
        lessons: 9,
        duration: '6 horas',
        description: 'Clases, objetos, herencia y polimorfismo'
      },
      {
        id: 6,
        title: 'Proyecto Final',
        lessons: 4,
        duration: '8 horas',
        description: 'Aplicación completa integrando todos los conceptos'
      }
    ]
  },
  'react-development': {
    id: 2,
    title: 'React Development',
    subtitle: 'Domina React.js y construye aplicaciones modernas',
    description: 'Aprende React desde cero hasta conceptos avanzados. Incluye hooks, context, routing y mejores prácticas para desarrollo profesional.',
    instructor: {
      name: 'Carlos Mendoza',
      title: 'Frontend Architect',
      experience: '6+ años',
      students: 8900,
      rating: 4.9,
      image: '/images/instructors/carlos-mendoza.jpg'
    },
    level: 'Intermedio',
    duration: '10 semanas',
    totalHours: 55,
    students: 892,
    rating: 4.9,
    reviews: 156,
    price: 79,
    originalPrice: 129,
    image: '/icons/technologies/systems/reactjs.svg',
    skills: ['Componentes y JSX', 'Hooks', 'Context API', 'React Router', 'Testing', 'Deployment'],
    modules: [
      {
        id: 1,
        title: 'Introducción a React',
        lessons: 6,
        duration: '3 horas',
        description: 'JSX, componentes y props'
      },
      {
        id: 2,
        title: 'State y Lifecycle',
        lessons: 8,
        duration: '5 horas',
        description: 'Manejo del estado y ciclo de vida'
      },
      {
        id: 3,
        title: 'Hooks Avanzados',
        lessons: 10,
        duration: '7 horas',
        description: 'useState, useEffect, useContext y hooks personalizados'
      },
      {
        id: 4,
        title: 'Routing y Navegación',
        lessons: 5,
        duration: '4 horas',
        description: 'React Router para aplicaciones SPA'
      },
      {
        id: 5,
        title: 'Testing en React',
        lessons: 7,
        duration: '6 horas',
        description: 'Jest, React Testing Library'
      }
    ]
  }
};

export default function CoursePage({
  params
}: {
  params: {slug: string}
}) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const course = mockCourseData[params.slug as keyof typeof mockCourseData];
  
  if (!course) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg to-surface/30">
      <div className="container py-8">
        <nav className="flex items-center gap-2 text-sm text-neutral-600 mb-8">
          <Link href="/es" className="hover:text-primary">Inicio</Link>
          <span>›</span>
          <Link href="/es/catalog" className="hover:text-primary">Catálogo</Link>
          <span>›</span>
          <span className="text-neutral-900">{course.title}</span>
        </nav>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="mb-8">
              <h1 className="h1-hero mb-4">{course.title}</h1>
              <p className="p-lead text-xl mb-6">{course.subtitle}</p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-neutral-600">({course.reviews} reseñas)</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-neutral-600">{course.students.toLocaleString()} estudiantes</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 p-6 bg-white rounded-3xl shadow-lg">
                    <img src={course.image} alt={course.title} className="w-full h-full object-contain" />
                  </div>
                </div>
                
                <div className="absolute top-6 left-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    course.level === 'Principiante' ? 'bg-green-100 text-green-700' :
                    course.level === 'Intermedio' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {course.level}
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
              <div className="flex border-b border-neutral-200 mb-8">
                <button
                  className={`px-6 py-3 font-semibold transition-colors ${
                    activeTab === 'overview' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  Descripción
                </button>
                <button
                  className={`px-6 py-3 font-semibold transition-colors ${
                    activeTab === 'curriculum' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  onClick={() => setActiveTab('curriculum')}
                >
                  Temario
                </button>
                <button
                  className={`px-6 py-3 font-semibold transition-colors ${
                    activeTab === 'instructor' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  onClick={() => setActiveTab('instructor')}
                >
                  Instructor
                </button>
                <button
                  className={`px-6 py-3 font-semibold transition-colors ${
                    activeTab === 'reviews' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reseñas
                </button>
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Acerca de este curso</h3>
                    <p className="text-neutral-700 leading-relaxed">{course.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">¿Qué aprenderás?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-neutral-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Contenido del curso</h3>
                    <p className="text-sm text-neutral-600">
                      {course.modules.length} módulos • {course.modules.reduce((acc, m) => acc + m.lessons, 0)} lecciones • {course.totalHours}h total
                    </p>
                  </div>

                  {course.modules.map((module, index) => (
                    <div key={module.id} className="border border-neutral-200 rounded-xl overflow-hidden">
                      <div className="bg-neutral-50 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold">{module.title}</h4>
                            <p className="text-sm text-neutral-600">{module.lessons} lecciones • {module.duration}</p>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <div className="p-4">
                        <p className="text-neutral-600 text-sm">{module.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                      {course.instructor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{course.instructor.name}</h3>
                      <p className="text-accent font-semibold mb-3">{course.instructor.title}</p>
                      
                      <div className="grid grid-cols-3 gap-6 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{course.instructor.rating}</div>
                          <div className="text-sm text-neutral-600">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{course.instructor.students.toLocaleString()}</div>
                          <div className="text-sm text-neutral-600">Estudiantes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{course.instructor.experience}</div>
                          <div className="text-sm text-neutral-600">Experiencia</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-neutral-700 leading-relaxed">
                    Desarrollador senior con amplia experiencia en la industria tecnológica. 
                    Ha trabajado en empresas líderes y ahora se dedica a la enseñanza online 
                    para ayudar a la próxima generación de programadores.
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Reseñas de estudiantes</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-bold text-lg">{course.rating}</span>
                      <span className="text-neutral-600">({course.reviews} reseñas)</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { name: 'Juan Pérez', rating: 5, comment: 'Excelente curso para empezar. La explicación es muy clara y los ejercicios son muy prácticos.', time: 'hace 2 semanas' },
                      { name: 'María González', rating: 5, comment: 'Me encantó el enfoque práctico del curso. Ahora me siento preparada para seguir aprendiendo.', time: 'hace 1 mes' },
                      { name: 'Carlos López', rating: 4, comment: 'Muy buen contenido, aunque me hubiera gustado más ejercicios avanzados.', time: 'hace 1 mes' }
                    ].map((review, index) => (
                      <div key={index} className="border-b border-neutral-200 pb-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                            {review.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold">{review.name}</span>
                              <div className="flex text-yellow-400">
                                {[...Array(review.rating)].map((_, i) => (
                                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-neutral-500">{review.time}</span>
                            </div>
                            <p className="text-neutral-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">${course.price}</span>
                    <span className="text-lg text-neutral-500 line-through">${course.originalPrice}</span>
                  </div>
                  <p className="text-sm text-green-600 font-semibold">¡Ahorra ${course.originalPrice - course.price}!</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-neutral-700">{course.duration} de contenido</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-neutral-700">{course.totalHours} horas de video</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-neutral-700">Certificado de finalización</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-neutral-700">Acceso de por vida</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <CheckoutButton 
                    priceId="price_example" 
                    successUrl={`${process.env.NEXT_PUBLIC_APP_URL || ''}/es`}
                    cancelUrl={`${process.env.NEXT_PUBLIC_APP_URL || ''}/es/course/${params.slug}`}
                    className="w-full btn-primary btn-lg justify-center"
                  >
                    Inscribirse ahora
                  </CheckoutButton>
                  
                  <button className="w-full btn-outline justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Añadir a favoritos
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
                  <p className="text-sm text-neutral-600 mb-2">💰 Garantía de devolución de 30 días</p>
                  <p className="text-sm text-neutral-600">🎓 {course.students.toLocaleString()} estudiantes ya inscritos</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="font-bold text-lg mb-4">Cursos relacionados</h4>
                <div className="space-y-4">
                  {Object.entries(mockCourseData).filter(([slug]) => slug !== params.slug).slice(0, 2).map(([slug, relatedCourse]) => (
                    <Link key={slug} href={`/es/course/${slug}`} className="flex items-center gap-3 group">
                      <div className="w-16 h-12 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img src={relatedCourse.image} alt={relatedCourse.title} className="w-6 h-6 object-contain" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {relatedCourse.title}
                        </h5>
                        <p className="text-xs text-neutral-500">${relatedCourse.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 