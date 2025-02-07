'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Routes } from '@/lib/routes';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false },
);

export const Header = () => {
  return (
    <div className='flex items-center justify-between h-[52px] gap-[44px]'>
      <Link
        href={Routes.MAIN}
        className='flex items-center text-lg leading-6 font-semibold w-[32%]'
      >
        Kaja AGENT
      </Link>
      <div className='flex items-center justify-between flex-1'>
        <div>Navigation</div>
        <WalletMultiButtonDynamic />
      </div>
    </div>
  );
};
