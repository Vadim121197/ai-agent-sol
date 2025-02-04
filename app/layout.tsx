import type { Metadata } from 'next';

import { urbanistFont } from '@/lib/font';
import { Header } from '@/modules/layout/header';
import { Providers } from '@/modules/layout/providers';
import { Sidebar } from '@/modules/layout/sidebar';

import './globals.css';

export const metadata: Metadata = {
  title: 'Kaja AI',
  description: 'Kaja AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${urbanistFont.variable} antialiased`}>
        <Providers>
          <div className='flex h-screen w-full flex-col bg-background pt-3 pb-5 gap-4 px-6'>
            <Header />
            <div className='flex flex-1'>
              <Sidebar />
              <div className='mx-auto flex flex-1 flex-col justify-between px-0'>
                {/* 62px - header, 16px - gap, 12px - pt, 20px - pb */}
                <div className='flex max-h-[calc(100vh-62px-16px-12px-20px)] flex-1'>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
