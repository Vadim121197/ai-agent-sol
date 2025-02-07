'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Route, Routes } from '@/lib/routes';
import { cn } from '@/lib/utils';

export const NavigationLink = ({ route }: { route: Route }) => {
  const pathname = usePathname() as Routes;

  const selected = pathname === route.href;

  if (route.active) {
    return (
      <Link
        key={route.href}
        href={route.href}
        className={cn(
          'flex items-center gap-[10px] rounded-[20px] text-[#A8A1A7] px-3 py-1 text-base font-medium',
          selected && 'bg-[#3B2839] font-semibold text-[#FFF] backdrop-blur-[2px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]',
        )}
      >
        <div>{route.icon}</div>
        <p className='text-base font-semibold capitalize'>{route.title}</p>
      </Link>
    );
  }

  return (
    <button
      key={route.href}
      className='flex items-center gap-2 p-3 disabled:cursor-not-allowed opacity-50'
      disabled
    >
      <div>{route.icon}</div>
      <p className='text-base font-medium capitalize'>{route.title}</p>
    </button>
  );
};
