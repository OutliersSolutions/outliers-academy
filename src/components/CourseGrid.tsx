import { getTranslations } from 'next-intl/server';
import { CheckoutButton } from './CheckoutButton';
interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  duration?: number;
  level?: string;
  rating?: number;
  students?: number;
}
export async function CourseGrid() {
  const tCommon = await getTranslations('common');
  let courses: Course[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/courses`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      courses = data.courses || [];
    }
  } catch (error) {
    // Fallback data for development
    courses = [
      {
        id: 1,
        name: "Python para Principiantes",
        description: "Aprende los fundamentos de Python desde cero",
        price: 49.99,
        image: "/images/python-course.jpg",
        slug: "python-basics",
        duration: 8,
        level: "Principiante",
        rating: 4.8,
        students: 1250
      },
      {
        id: 2,
        name: "React.js Completo",
        description: "Desarrollo de aplicaciones web modernas con React",
        price: 79.99,
        image: "/images/react-course.jpg",
        slug: "react-complete",
        duration: 12,
        level: "Intermedio",
        rating: 4.9,
        students: 890
      },
      {
        id: 3,
        name: "Machine Learning Básico",
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
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((c) => (
        <div key={c.id} className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Course Image */}
          <div className="relative h-48 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-4xl font-heading font-bold text-primary/50">
                {c.name.charAt(0)}
              </div>
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            {/* Price Badge */}
            <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg">
              <span className="font-sans font-bold text-primary">${c.price}</span>
            </div>
          </div>
          {/* Course Content */}
          <div className="p-6">
            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
              {c.name}
              </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 font-sans">{c.description || tCommon('learnNewSkills')}
            </p>
            {/* Course Meta */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-4">
                {c.duration && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {c.duration}h
                  </span>
                )}
                {c.level && (
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    {c.level}
                  </span>
                )}
              </div>
              {c.rating && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{c.rating}</span>
                </div>
                  )}
                </div>
            {/* Students Count */}
            {c.students && (
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {c.students.toLocaleString()} estudiantes inscritos
              </div>
            )}
            {/* CTA Button */}
            <CheckoutButton 
              courseId={c.id} 
              className="w-full"
            >
              Inscribirse
            </CheckoutButton>
          </div>
        </div>
      ))}
      {/* Spacer to push footer to bottom */}
      <div className="h-8" />
    </div>
  );
}
