import { Chat } from '@/components/chat';
import { Charts } from '@/modules/main/charts';
import { MainInfo } from '@/modules/main/info';
import { Transactions } from '@/modules/main/transactions';
import { Challenges } from '@/types/chat';

export default function Home() {
  return (
    <div className='scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-1 overflow-y-auto'>
      <div className='flex-1 px-6 flex flex-col gap-3 justify-between'>
        <Charts />
        <MainInfo />
        <Transactions />
      </div>
      <Chat type={Challenges.SWAP} />
    </div>
  );
}
