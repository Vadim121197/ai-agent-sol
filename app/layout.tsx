import type { Metadata } from 'next';

import { urbanistFont } from '@/lib/font';
import { AuthProvider } from '@/modules/layout/auth-provider';
import { Header } from '@/modules/layout/header';
import { PrefetchProvider } from '@/modules/layout/prefetch-provider';
import { Providers } from '@/modules/layout/providers';
import '@solana/wallet-adapter-react-ui/styles.css';

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
        <AuthProvider>
          <Providers>
            <PrefetchProvider>
              <div className='lg:hidden h-screen w-full flex flex-col gap-2 items-center justify-center'>
                <h1 className='text-5xl'>Kaja not available for mobile!</h1>
                <p className='text-xl text-muted-foreground'>We are working on it</p>
              </div>
              <div className='h-screen w-full flex-col bg-background pt-4  gap-4 pl-6 pr-10 pb-3 hidden lg:flex'>
                <Header />
                <div className='flex flex-1'>
                  <div className='mx-auto flex flex-1 flex-col justify-between px-0'>
                    {/* 52px - header, 16px - gap, 16px - pt, 12px - pb */}
                    <div className='flex flex-1 max-h-[calc(100vh-52px-16px-16px-12px)]'>
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </PrefetchProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
