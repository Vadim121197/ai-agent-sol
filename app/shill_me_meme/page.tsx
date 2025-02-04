import { Chat } from '@/components/chat';
import { Challenges } from '@/types/chat';

export default function PrizePool() {
  return (
    <div className='scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-1 overflow-y-auto'>
      <div className='flex-1 px-6 flex flex-col gap-3 justify-between'></div>
      <Chat type={Challenges.SHILLING} />
    </div>
  );
}
