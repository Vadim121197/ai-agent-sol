'use client';

import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
};
