import { Route, Routes } from '@/lib/routes';
import {
  Info,
  LayoutDashboard,
  MessageCircle,
  MessageCircleQuestion,
  ReceiptText,
} from 'lucide-react';

export const routes: Route[] = [
  {
    title: 'dashboard',
    href: Routes.DASHBOARD,
    active: true,
    icon: <LayoutDashboard className='size-[18px]' />,
  },
  {
    title: 'chat',
    href: Routes.CHAT,
    active: true,
    icon: <MessageCircle className='size-[18px]' />,
  },
  {
    title: 'about me',
    href: Routes.ABOUT,
    active: false,
    icon: <Info className='size-[18px]' />,
  },
  {
    title: 'FAQ',
    href: Routes.FAQ,
    active: false,
    icon: <MessageCircleQuestion className='size-[18px]' />,
  },
  {
    title: 'terms',
    href: Routes.TERMS,
    active: false,
    icon: <ReceiptText className='size-[18px]' />,
  },
];
