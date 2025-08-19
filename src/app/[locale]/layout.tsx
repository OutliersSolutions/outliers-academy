import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Layouts/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { getTranslations } from 'next-intl/server';
import { ThemeProvider } from '@/components/ThemeProvider';
import { GlobalLoader } from '@/components/GlobalLoader';
import { CookieProvider } from '@/components/CookieProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { Inter, Manrope, JetBrains_Mono } from 'next/font/google';
// Font configurations with preload and fallback
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
});
const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial', 'sans-serif'],
});
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-code-primary',
  display: 'swap',
  preload: true,
  fallback: ['Consolas', 'Monaco', 'monospace'],
});
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
    messages = {};
  }
  return (
    <>
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
        {/* Preload critical resources */}
        <link rel="preload" href="/models/chatbot.glb" as="object" type="model/gltf-binary" />
        <link rel="preload" href="/icons/logo.png" as="image" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        {/* Resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable} font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <ToastProvider />
              <CookieProvider>
                <GlobalLoader>
                  <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-1">
                      {children}
                    </main>
                    <Footer locale={locale} />
                    <WhatsAppButton />
                  </div>
                </GlobalLoader>
              </CookieProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </>
  );
}
