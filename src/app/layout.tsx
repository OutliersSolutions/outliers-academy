import '@/styles/globals.css';
import type {Metadata} from 'next';
import {Inter, Manrope, Source_Code_Pro, JetBrains_Mono, Fira_Code} from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/components/AuthProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap'
});

// Google Sans Code alternatives (Google doesn't have Google Sans Code, using best alternatives)
const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code-primary',
  display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-code-secondary',
  display: 'swap'
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-code-tertiary',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Outliers Academy',
  description: 'Aprende habilidades en demanda con cursos interactivos.',
  icons: {
    icon: '/logo.ico',
    shortcut: '/logo.ico',
    apple: '/logo.ico'
  }
};
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html suppressHydrationWarning className={`${inter.variable} ${manrope.variable} ${sourceCodePro.variable} ${jetbrainsMono.variable} ${firaCode.variable}`}>
      <body>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
