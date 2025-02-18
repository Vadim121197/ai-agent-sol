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

  await queryClient.prefetchQuery({
    ...infoApi.getDashboardInfo(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex overflow-y-hidden gap-[44px] flex-1'>
        <Stats />
        <Chat />
      </div>
    </HydrationBoundary>
  );
}
