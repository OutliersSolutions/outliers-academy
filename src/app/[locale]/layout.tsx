import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Layouts/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { getTranslations } from 'next-intl/server';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const tCommon = await getTranslations('common');
  
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    console.warn('Failed to load messages, using fallback');
    messages = {};
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="description" content={tCommon('metaDescription')} />
        <meta name="keywords" content="cursos, programación, desarrollo web, inteligencia artificial, tecnología, educación online" />
        <meta name="author" content="Outliers Academy" />
        <meta property="og:title" content="Outliers Academy - Aprende habilidades en demanda" />
        <meta property="og:description" content={tCommon('metaDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'} />
        <meta property="og:image" content="/icons/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Outliers Academy - Aprende habilidades en demanda" />
        <meta name="twitter:description" content={tCommon('metaDescription')} />
        <meta name="twitter:image" content="/icons/logo.png" />
        <link rel="icon" href="/logo.ico" />
        <link rel="apple-touch-icon" href="/logo.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer locale={locale} />
              <WhatsAppButton />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 