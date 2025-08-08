import '@/styles/globals.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Outliers Academy',
  description: 'Aprende habilidades en demanda con cursos interactivos.'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
} 