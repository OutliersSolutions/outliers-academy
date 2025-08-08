import {notFound} from 'next/navigation';
import {fetchCourses} from '@/lib/odooClient';

export const dynamic = 'force-dynamic';

async function getCourse(slug: string) {
  try {
    const list = await fetchCourses({slug});
    return Array.isArray(list) ? list[0] : list;
  } catch (e) {
    return null;
  }
}

export default async function CoursePage({params}: {params: {slug: string}}) {
  const course = await getCourse(params.slug);
  if (!course) return notFound();

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-extrabold">{course.title}</h1>
          <p className="p-lead mt-4">{course.description}</p>
          <div className="mt-8 card p-6">
            <h2 className="font-bold text-lg">Contenido</h2>
            <ul className="mt-4 list-disc pl-5 text-neutral-700">
              {(course.sections || []).map((s: any, i: number) => (
                <li key={i}>{s.title}</li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="card p-6 h-fit">
          <div className="text-2xl font-extrabold">{course.price ? `$${course.price}` : 'Gratis'}</div>
          <button className="btn-primary mt-4 w-full">Comenzar</button>
          <p className="text-sm text-neutral-600 mt-4">Acceso de por vida. Certificado de finalización.</p>
        </aside>
      </div>
    </div>
  );
} 