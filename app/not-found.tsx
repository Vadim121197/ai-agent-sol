import { redirect } from 'next/navigation';

import { Routes } from '@/lib/routes';

export default function Custom404() {
  redirect(Routes.MAIN);
}
