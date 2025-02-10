'use client';

import Link from 'next/link';

import { ConnectButton } from '@/components/connect-button';
import { Routes } from '@/lib/routes';

import { Balance } from './balance';
import { Navigation } from './navigation';

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
        <Navigation />
        <div className='flex items-center gap-7'>
          <Balance />
          <ConnectButton />
          {/* <WalletMultiButton /> */}
        </div>
      </div>
    </div>
  );
};
