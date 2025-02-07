'use client';

import { Chat } from '@/components/chat';
import { Stats } from '@/modules/main/stats';

export default function Home() {
  return (
    <div className='scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex overflow-y-auto gap-[44px] flex-1'>
      <Stats />
      <Chat />
    </div>
  );
}
