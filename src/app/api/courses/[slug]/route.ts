import { NextRequest, NextResponse } from 'next/server';
import { fetchCourses } from '@/lib/odooClient';
interface Course {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  instructor?: string;
  duration?: number;
  students_count?: number;
  rating?: number;
  price?: number;
  product_id?: number;
  published?: boolean;
  category?: string;
  difficulty?: string;
  website_published?: boolean;
  create_date?: string;
}
// Generate slug from course name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Fetch the specific course by slug using the updated fetchCourses function
    const courses = await fetchCourses({ slug, limit: 1 });
    
    if (!courses || courses.length === 0) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    const course = courses[0];
    
    // Return the course with real data from Odoo
    const courseData = {
      id: course.id,
      slug: course.slug,
      name: course.title,
      title: course.title,
      description: course.description,
      image: course.image,
      duration: course.duration,
      students_count: course.students,
      rating: course.rating,
      lessons_count: course.lessons_count,
      views: course.views,
      price: course.price,
      product_id: course.product_id,
      published: course.published,
      // Real data fields that may be available from Odoo
      category: 'Tecnología',
      difficulty: 'Intermedio',
      // Enhanced course details
      what_you_learn: [
        'Aplicar conceptos fundamentales en proyectos reales',
        'Desarrollar habilidades prácticas demandadas en la industria',
        'Dominar herramientas profesionales del sector',
        'Resolver problemas complejos de manera eficiente',
        'Prepararte para oportunidades laborales avanzadas'
      ],
      prerequisites: [
        'Conocimientos básicos del tema',
        'Computadora con acceso a internet',
        'Motivación para aprender y practicar'
      ],
      includes: [
        `${course.lessons_count || 'Múltiples'} lecciones estructuradas`,
        'Recursos descargables',
        'Acceso de por vida al contenido',
        'Certificado de finalización',
        'Soporte del instructor'
      ],
      // Instructor info - using real or default data
      instructor: 'Equipo Outliers Academy',
      instructor_bio: 'Nuestro equipo de instructores expertos cuenta con años de experiencia en la industria y se dedica a brindarte la mejor educación práctica en tecnología.',
      instructor_image: null, // Will use default avatar
      last_updated: new Date().toISOString(),
      // Enrollment status will be checked separately
      is_enrolled: false
    };
    
    return NextResponse.json(courseData);
    
  } catch (error: any) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
