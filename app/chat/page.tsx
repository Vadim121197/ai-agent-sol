import { AgentBalanceChart } from '@/components/charts/agent-balance';
import { TradeChart } from '@/components/charts/trade';
import { Chat } from '@/components/chat';
import { Info } from '@/components/info';

export default function ChatPage() {
  return (
    <div className='flex overflow-y-hidden gap-[44px] flex-1'>
      <div className='flex flex-col max-h-screen w-[29rem]'>
        <div className='flex flex-col gap-[14px] max-h-screen overflow-y-auto scrollbar-thumb-black scrollbar-thumb-rounded scrollbar-w-2 scrolling-touch'>
          <AgentBalanceChart className='h-[167px]' />
          <TradeChart className='h-[167px]' />
          <Info label={<p className='text-base font-medium mb-1'>Information</p>} />
        </div>
      </div>
      <Chat />
    </div>
  );
}
