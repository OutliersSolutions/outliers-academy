import {CourseGrid} from '@/components/CourseGrid';

export const dynamic = 'force-dynamic';

export default function CatalogPage() {
  return (
    <div className="container py-16">
      <h1 className="h2-section">Catálogo</h1>
      <div className="mt-8">
        <CourseGrid />
      </div>
    </div>
  );
} 