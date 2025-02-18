import React from 'react';

import { infoApi } from '@/lib/api/info';
import { queryClient } from '@/lib/query-client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export const PrefetchProvider = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  await queryClient.prefetchQuery({
    ...infoApi.getAgentBalance({}),
  });

  await queryClient.prefetchQuery({
    ...infoApi.getTrades({}),
  });

  await queryClient.prefetchQuery({
    ...infoApi.getDashboardInfo(),
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};
