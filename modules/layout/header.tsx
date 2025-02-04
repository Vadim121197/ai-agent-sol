import Link from 'next/link';

import { Routes } from '@/lib/routes';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { BorderWrapper } from '../../components/border-wrapper';

export const Header = () => {
  return (
    <BorderWrapper className='px-5 py-3 h-[62px] flex items-center justify-between'>
      <Link href={Routes.MAIN} className='flex items-center text-sm font-semibold'>
        AGENT PLATFORM
      </Link>
      <ConnectButton />
    </BorderWrapper>
  );
};
