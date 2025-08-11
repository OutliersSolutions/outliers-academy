import '@/styles/globals.css';
import type {Metadata} from 'next';
import {Inter, Manrope} from 'next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({subsets: ['latin']});
const manrope = Manrope({subsets: ['latin']});

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
    <html suppressHydrationWarning className={`${inter.className} ${manrope.className}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
