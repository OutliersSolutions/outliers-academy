export default function AboutPage() {
  return (
    <div className="container py-16">
      <h1 className="h2-section">Sobre Outliers Academy</h1>
      <p className="p-lead mt-4 max-w-3xl">
        Enseñamos habilidades en demanda con cursos prácticos y rutas de aprendizaje. Nuestra misión es
        ayudarte a pasar de cero a productivo con proyectos reales y feedback.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="font-bold">Metodología</h3>
          <p className="mt-2 text-neutral-700">Aprende haciendo, con ejercicios y desafíos.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-bold">Comunidad</h3>
          <p className="mt-2 text-neutral-700">Acompañamiento entre pares y mentores.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-bold">Certificados</h3>
          <p className="mt-2 text-neutral-700">Valida tu progreso con certificados al completar.</p>
        </div>
      </div>
    </div>
  );
} 