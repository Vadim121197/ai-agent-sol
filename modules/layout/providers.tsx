'use client';

import React, { useMemo, useState } from 'react';

import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/query-client';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  WalletConnectWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { HydrationBoundary, QueryClientProvider, dehydrate } from '@tanstack/react-query';

export const defaultNetWork = WalletAdapterNetwork.Mainnet;

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [network] = useState<WalletAdapterNetwork>(defaultNetWork);

  const endpoint = useMemo(() => {
    if (network === WalletAdapterNetwork.Devnet) {
      return clusterApiUrl(network);
    }
    return `https://mainnet.helius-rpc.com/?api-key=${process.env['NEXT_PUBLIC_SOLANA_RPC_KEY']}`;
  }, [network]);

  const _walletConnect = useMemo(() => {
    const connectWallet: WalletConnectWalletAdapter[] = [];
    try {
      connectWallet.push(
        new WalletConnectWalletAdapter({
          network: network as WalletAdapterNetwork.Mainnet,
          options: {
            projectId: process.env['NEXT_PUBLIC_WALLET_CONNECT'],
            metadata: {
              name: 'Kaja AI',
              description: 'Kaja AI',
              url: 'http:/localhost:3000',
              // icons: ['https://raydium.io/logo/logo-only-icon.svg'],
            },
          },
        }),
      );
    } catch {
      //
    }
    return connectWallet;
  }, [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), ..._walletConnect],
    [_walletConnect],
  );

  return (
    <ConnectionProvider endpoint={endpoint} config={{ disableRetryOnRateLimit: true }}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              {children}
              <Toaster />
            </HydrationBoundary>
          </QueryClientProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
