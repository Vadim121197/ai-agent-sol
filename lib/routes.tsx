import { ReactElement } from 'react';

import { LayoutDashboard, MessageCircleQuestion, ReceiptText, Trophy } from 'lucide-react';

export interface Route {
  href: Routes;
  title: string;
  active: boolean;
  subLinks?: Routes[];
  icon?: ReactElement;
}

export enum Routes {
  MAIN = '/',
  CHALLENGES = '/challenges',
  FAQ = '/faq',
  TERMS = '/terms',
  SHILL_ME_MEME = '/shill_me_meme',
}

export const sidebarRoutes: Route[] = [
  {
    title: 'home',
    href: Routes.MAIN,
    active: true,
    icon: <LayoutDashboard className='size-inherit' />,
  },
  {
    // title: 'challenges',
    title: 'Explorer Prize Pool',
    href: Routes.CHALLENGES,
    active: true,
    icon: <Trophy className='size-inherit' />,
  },

  {
    title: 'Shill me MEME',
    href: Routes.SHILL_ME_MEME,
    active: true,
    icon: <Trophy className='size-inherit' />,
  },
  {
    title: 'FAQ',
    href: Routes.FAQ,
    active: false,
    icon: <MessageCircleQuestion className='size-inherit' />,
  },
  {
    title: 'terms',
    href: Routes.TERMS,
    active: false,
    icon: <ReceiptText className='size-inherit' />,
  },
];
