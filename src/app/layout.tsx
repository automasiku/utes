import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QuizProvider } from '@/context/QuizContext';
import { LayoutProvider } from '@/context/LayoutContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UTES latihan soal interaktif',
  description: 'Utes dengan latihan soal interaktif',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <LayoutProvider>
          <QuizProvider>
            {children}
          </QuizProvider>
        </LayoutProvider>
      </body>
    </html>
  );
}
