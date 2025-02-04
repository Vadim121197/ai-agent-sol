import { Button } from '@/components/ui/button';
import { sidebarRoutes } from '@/lib/routes';
import { LogOut } from 'lucide-react';

import { BorderWrapper } from '../../../components/border-wrapper';
import { SidebarLink } from './sidebar-link';

export const Sidebar = () => {
  return (
    <BorderWrapper className='w-[280px]  flex-col justify-between overflow-y-auto hidden lg:flex'>
      <div className='flex flex-col gap-1 p-3 rounded'>
        {sidebarRoutes.map(route => (
          <SidebarLink key={route.href} route={route} />
        ))}
      </div>
      <div className='p-3 border-t flex justify-end'>
        <Button variant='icon' className='rotate-180'>
          <LogOut className='size-5' />
        </Button>
      </div>
    </BorderWrapper>
  );
};
