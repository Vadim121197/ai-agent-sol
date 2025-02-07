import { ReactElement } from 'react';

import { ArrowLeftRight, MessageCircle, MessageCircleQuestion, ReceiptText } from 'lucide-react';

export interface Route {
  href: Routes;
  title: string;
  active: boolean;
  subLinks?: Routes[];
  icon?: ReactElement;
}

export enum Routes {
  MAIN = '/',
  TRANSACTIONS = '/txs',
  FAQ = '/faq',
  TERMS = '/terms',
}

export const routes: Route[] = [
  {
    title: 'chat',
    href: Routes.MAIN,
    active: true,
    icon: <MessageCircle className='size-[18px]' />,
  },
  {
    title: 'transactions',
    href: Routes.TRANSACTIONS,
    active: false,
    icon: <ArrowLeftRight className='size-[18px]' />,
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
