import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import { getTranslations } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const tCommon = await getTranslations('common');
  
  return {
    title: 'Outliers Academy - Aprende habilidades en demanda',
    description: tCommon('metaDescription'),
    keywords: 'cursos, programación, desarrollo web, inteligencia artificial, tecnología, educación online',
    authors: [{ name: 'Outliers Academy' }],
    creator: 'Outliers Academy',
    publisher: 'Outliers Academy',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'Outliers Academy - Aprende habilidades en demanda',
      description: tCommon('metaDescription'),
      url: '/',
      siteName: 'Outliers Academy',
      images: [
        {
          url: '/icons/logo.png',
          width: 1200,
          height: 630,
          alt: 'Outliers Academy',
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Outliers Academy - Aprende habilidades en demanda',
      description: tCommon('metaDescription'),
      images: ['/icons/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
