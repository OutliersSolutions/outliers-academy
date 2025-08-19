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
    // Fetch all courses from Odoo
    const courses = await fetchCourses();
    // Find course by slug or generate slug and match
    let course = courses.find((c: Course) => {
      const courseSlug = c.slug || generateSlug(c.name);
      return courseSlug === slug;
    });
    // If no course found, create a demo course for testing
    if (!course) {
      // Create a demo course based on the slug
      const demoTitle = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      course = {
        id: Math.floor(Math.random() * 1000000), // Random ID for demo
        name: demoTitle,
        slug: slug,
        description: `Este es un curso completo de ${demoTitle.toLowerCase()}. Aprende desde los conceptos básicos hasta técnicas avanzadas con ejercicios prácticos y proyectos reales.`,
        published: true,
        website_published: true,
        price: Math.random() > 0.5 ? Math.floor(Math.random() * 200) + 50 : 0,
        product_id: Math.floor(Math.random() * 1000) + 1,
        create_date: new Date().toISOString()
      };
    }
    // Ensure course has a slug
    if (!course.slug) {
      course.slug = generateSlug(course.name);
    }
    // Add mock data for better demo experience
    const enhancedCourse = {
      ...course,
      instructor: course.instructor || 'Dr. María González',
      duration: course.duration || Math.floor(Math.random() * 20) + 5,
      students_count: course.students_count || Math.floor(Math.random() * 1000) + 100,
      rating: course.rating || (4 + Math.random()),
      reviews_count: Math.floor(Math.random() * 200) + 50,
      difficulty: course.difficulty || ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)],
      category: course.category || ['Inteligencia Artificial', 'Desarrollo Web', 'Data Science', 'Machine Learning'][Math.floor(Math.random() * 4)],
      tags: ['Python', 'JavaScript', 'React', 'Node.js', 'AI'].slice(0, Math.floor(Math.random() * 3) + 2),
      last_updated: course.create_date || new Date().toISOString(),
      image: course.image || `https://picsum.photos/800/400?random=${course.id}`,
      instructor_image: `https://i.pravatar.cc/150?img=${course.id}`,
      // Default enrollment status for demo
      is_enrolled: false,
      completion_percentage: 0
    };
    return NextResponse.json(enhancedCourse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
