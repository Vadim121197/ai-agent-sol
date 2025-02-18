import { Chat } from '@/components/chat';
import { Stats } from '@/modules/main/stats';

export default function Home() {
  return (
    <div className='flex overflow-y-hidden gap-[44px] flex-1'>
      <Stats />
      <Chat />
    </div>
  );
}
