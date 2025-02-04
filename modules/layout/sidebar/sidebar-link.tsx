'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Route, Routes } from '@/lib/routes';
import { cn } from '@/lib/utils';

export const SidebarLink = ({ route }: { route: Route }) => {
  const pathname = usePathname() as Routes;

  const selected = pathname === route.href;

  if (route.active) {
    return (
      <Link
        key={route.href}
        href={route.href}
        className={cn(
          'flex items-center gap-2 p-3 rounded-sm',
          selected && 'bg-link-selected font-semibold border-l border-link-border',
        )}
      >
        <div className='size-5'>{route.icon}</div>
        <p className='text-base font-medium capitalize'>{route.title}</p>
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
