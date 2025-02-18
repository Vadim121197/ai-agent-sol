'use client';

import { Chat } from '@/components/chat';
import { infoApi } from '@/lib/api/info';
import { queryClient } from '@/lib/query-client';
import { Stats } from '@/modules/main/stats';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function Home() {
  await queryClient.prefetchQuery({
    ...infoApi.getAgentBalance({}),
  });

  await queryClient.prefetchQuery({
    ...infoApi.getTrades({}),
  });

  return (
    <div className='flex overflow-y-hidden gap-[44px] flex-1'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Stats />
      </HydrationBoundary>
      <Chat />
    </div>
  );
}
