'use client';

import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/query-client';
import { wagmiConfig } from '@/lib/wagmi';
import { RainbowKitProvider, Theme, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClientProvider } from '@tanstack/react-query';
import merge from 'lodash.merge';
import { WagmiProvider } from 'wagmi';

export const rainbowTheme: Theme = merge(
  darkTheme({
    borderRadius: 'large',
  }),
  {
    colors: {
      accentColor: '#D8CCC3',
      accentColorForeground: '#000',
      modalBackground: '#111',
      modalBorder: '#412614',
      modalText: '#D8CCC3',
      modalTextSecondary: '#B5A295',
    },
  } as Theme,
);

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={rainbowTheme}>
          {children}
          <Toaster />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
