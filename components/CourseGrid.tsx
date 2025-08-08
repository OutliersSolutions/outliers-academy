import Link from 'next/link';
import {fetchCourses} from '@/lib/odooClient';

export async function CourseGrid() {
  let courses: Array<{id: number; slug: string; title: string; description: string}> = [];
  try {
    const data = await fetchCourses();
    courses = data;
  } catch (e) {
    courses = [];
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((c) => (
        <Link key={c.id} href={`course/${c.slug}`} className="card p-6 hover:shadow-md transition">
          <h3 className="font-bold text-lg">{c.title}</h3>
          <p className="mt-2 text-neutral-700 line-clamp-3">{c.description}</p>
          <div className="mt-4 text-sm font-semibold" style={{color: 'var(--color-primary)'}}>Ver curso →</div>
        </Link>
      ))}
      {courses.length === 0 && (
        <div className="col-span-full text-neutral-600">No hay cursos disponibles todavía.</div>
      )}
    </div>
  );
} 