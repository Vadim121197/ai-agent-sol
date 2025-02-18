import { ReactElement } from 'react';

export interface Route {
  href: Routes;
  title: string;
  active: boolean;
  subLinks?: Routes[];
  icon?: ReactElement;
}

export enum Routes {
  MAIN = '/',
  CHAT = '/chat',
  DASHBOARD = '/dashboard',
  ABOUT = '/about',
  FAQ = '/faq',
  TERMS = '/terms',
}
