import Link from 'next/link';

import { ConnectButton } from '@/components/connect-button';
import { Routes } from '@/lib/routes';

import { Balance } from './balance';
import { Navigation } from './navigation';

const TwitterIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='17' height='16' viewBox='0 0 17 16' fill='none'>
    <g clipPath='url(#clip0_125_3551)'>
      <path
        d='M13.1009 0.768768H15.5542L10.1943 6.89502L16.5 15.2312H11.5626L7.69566 10.1752L3.27091 15.2312H0.815906L6.54887 8.67864L0.5 0.768768H5.56247L9.05797 5.39002L13.1009 0.768768ZM12.2398 13.7627H13.5993L4.82384 2.16024H3.36509L12.2398 13.7627Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_125_3551'>
        <rect width='16' height='14.4625' fill='white' transform='translate(0.5 0.768768)' />
      </clipPath>
    </defs>
  </svg>
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
        <Navigation />
        <div className='flex items-center'>
          <Balance />
          <div className='px-[10px] py-2 border border-border rounded-[20px] bg-card mr-[10px] ml-[26px]'>
            <TwitterIcon />
          </div>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};
