import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';


import { Header } from '@/components/layout/header';
import { Providers } from '@/components/providers';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuizMaster - Test Your Knowledge',
  description: 'Practice and master multiple-choice questions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <Providers>
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}