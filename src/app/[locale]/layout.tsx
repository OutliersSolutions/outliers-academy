// External libraries
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

// Internal components
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Layouts/Footer";
import { ConditionalWhatsAppButton } from "@/components/ui/ConditionalWhatsAppButton";
import { ConditionalFloatingCartButton } from "@/components/ui/ConditionalFloatingCartButton";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GlobalLoader } from "@/components/GlobalLoader";
import { CookieProvider } from "@/components/CookieProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
// System font variables for CSS custom properties
const systemFontVariables = {
  '--font-inter': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  '--font-manrope': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  '--font-code-primary': 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
};
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
      </head>
      <body 
        className="font-sans"
        style={systemFontVariables as React.CSSProperties}
      >
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
                    <ConditionalWhatsAppButton />
                    <ConditionalFloatingCartButton />
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
