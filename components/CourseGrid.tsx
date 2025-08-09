import Link from 'next/link';
import {fetchCourses} from '@/lib/odooClient';

interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  level?: string;
  duration?: string;
  students?: number;
  rating?: number;
  price?: number;
  image?: string;
}

export async function CourseGrid() {
  let courses: Course[] = [];
  try {
    const data = await fetchCourses();
    courses = data;
  } catch (e) {
    courses = [];
  }

  // Mock data with more details for better design showcase
  const mockCourses = [
    {
      id: 1,
      slug: 'python-fundamentals',
      title: 'Python Fundamentals',
      description: 'Aprende los fundamentos de Python desde cero con proyectos prácticos y ejercicios interactivos.',
      level: 'Principiante',
      duration: '8 semanas',
      students: 1420,
      rating: 4.8,
      price: 49,
      image: '/icons/technologies/systems/python.svg'
    },
    {
      id: 2,
      slug: 'react-development',
      title: 'React Development',
      description: 'Domina React.js y construye aplicaciones web modernas con hooks, context y mejores prácticas.',
      level: 'Intermedio',
      duration: '12 semanas',
      students: 892,
      rating: 4.9,
      price: 79,
      image: '/icons/technologies/systems/reactjs.svg'
    },
    {
      id: 3,
      slug: 'node-backend',
      title: 'Node.js Backend',
      description: 'Crea APIs robustas y escalables con Node.js, Express y bases de datos modernas.',
      level: 'Intermedio',
      duration: '10 semanas',
      students: 654,
      rating: 4.7,
      price: 69,
      image: '/icons/technologies/systems/nodejs.svg'
    }
  ];

  const displayCourses = courses.length > 0 ? courses : mockCourses;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayCourses.map((c) => (
        <Link key={c.id} href={`course/${c.slug}`} className="group">
          <div className="card overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
              {c.image && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 p-4 bg-white rounded-2xl shadow-lg">
                    <img src={c.image} alt={c.title} className="w-full h-full object-contain" />
                  </div>
                </div>
              )}
              {!c.image && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              )}
              
              {c.level && (
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    c.level === 'Principiante' ? 'bg-green-100 text-green-700' :
                    c.level === 'Intermedio' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {c.level}
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">{c.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-2">{c.description}</p>
              
              <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                {c.duration && <span>{c.duration}</span>}
                {c.students && <span>{c.students.toLocaleString()} estudiantes</span>}
              </div>
              
              {c.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(c.rating || 0) ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium">{c.rating}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="text-primary font-bold group-hover:text-accent transition-colors">
                  Ver curso
                  <svg className="w-4 h-4 inline ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                {c.price && (
                  <div className="text-lg font-bold text-neutral-900">
                    ${c.price}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
      
      {displayCourses.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-700 mb-2">No hay cursos disponibles</h3>
          <p className="text-neutral-500">Pronto tendremos contenido increíble para ti</p>
        </div>
      )}
    </div>
  );
} 