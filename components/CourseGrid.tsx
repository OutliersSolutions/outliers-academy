import Link from 'next/link';

function apiUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL || '';
  return base ? `${base}${path}` : path;
}

async function getCourses() {
  const res = await fetch(apiUrl('/api/courses'), {
    // Ensure runtime fetch, not during static build
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}

export async function CourseGrid() {
  const courses: Array<{id: number; slug: string; title: string; description: string}> = await getCourses();

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