'use client';

import { firstAndLastFour } from '@/lib/first-last-four';
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import { Button } from './ui/button';

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
