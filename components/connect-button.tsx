'use client';

import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import { Button } from './ui/button';

function firstAndLastFour(s: string): string {
  return s.length >= 4 ? s.slice(0, 4) + '...' + s.slice(-4) : s;
}

export const ConnectButton = () => {
  const { setVisible } = useWalletModal();

  const { publicKey } = useWalletMultiButton({
    onSelectWallet() {
      setVisible(true);
    },
  });

  return (
    <Button
      className='w-[114px]'
      onClick={() => {
        if (!publicKey) {
          setVisible(true);
        }
      }}
    >
      {publicKey ? firstAndLastFour(publicKey.toBase58()) : 'Connect wallet'}
    </Button>
  );
};
