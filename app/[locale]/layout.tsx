import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import {Inter, Manrope} from 'next/font/google';
import {Navbar} from '@/components/Navbar';
import {Footer} from '@/components/Footer';
import {WhatsAppButton} from '@/components/ui/WhatsAppButton';
import { ThemeProvider } from 'next-themes';

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

  let messages: any;
  try {
    messages = await getMessages();
  } catch {
    const m = await import(`../../messages/${params.locale}.json`);
    messages = m.default;
  }

  return (
    <html lang={params.locale} className={`${inter.className} ${manrope.className}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <NextIntlClientProvider messages={messages} locale={params.locale} timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}>
            <div className="min-h-dvh flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <WhatsAppButton />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 