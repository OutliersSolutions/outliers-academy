import '@/styles/globals.css';
import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import {Inter, Manrope} from 'next/font/google';
import {Navbar} from '@/components/Navbar';
import {Footer} from '@/components/Footer';

const inter = Inter({subsets: ['latin']});
const manrope = Manrope({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Outliers Academy',
  description: 'Aprende habilidades en demanda con cursos interactivos.'
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  unstable_setRequestLocale(params.locale);
  const messages = await getMessages();

  return (
    <html lang={params.locale} className={`${inter.className} ${manrope.className}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 